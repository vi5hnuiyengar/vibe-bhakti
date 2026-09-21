/*
  store.js  (schema v2)

  Progress, the memory model, and session planning.
  Everything is saved in this browser only (localStorage). No account, no server.

  Memory model, per skill:
    h  = half-life in hours. Chance you still remember = 2 ^ (-hours since last seen / h)
    right answer  -> h grows (more for harder question types, less if a hint was used)
    wrong answer  -> h halves (never below 4 hours)
  Skills that are fading, weak or new are practised first.

  A skill key is "module-member : cell", for example "a:sap.eka" for nouns,
  "tad-m:sha.bahu" for pronouns, "lipi:भ" for letters. Nothing below assumes
  four classes, eight vibhaktis or two vacanas: those come from VB.MODULES.
*/
var VB = window.VB = window.VB || {};

(function (VB) {
  "use strict";
  var KEY = "vibhakti-abhyasa-v2", KEY_V1 = "vibhakti-abhyasa-v1";
  var HOUR = 3600 * 1000;
  VB.CLUSTERS = [["pra", "dvi"], ["tri"], ["cat", "pan"], ["sha", "sap"], ["sam"]];

  // Which vacanas the interface shows. The data may carry more (pronouns ship
  // with dvivacana); flipping this is what turns them on.
  VB.SHOWN_VACS = VB.SHOWN_VACS || VB.VACS.slice();

  function blank() {
    return {
      v: 2,
      skills: {}, words: {}, days: {},
      unlocked: 1, introduced: 0,
      recent: [],
      total: { q: 0, c: 0 },
      best: { speed: 0, lipi: 0 },
      settings: { scale: 1, all: false, tab: "abhyasa", focus: { vibs: [], classes: [] } },
      lipi: { skills: {}, days: {}, total: { q: 0, c: 0 }, unlocked: 1, recent: [] },
      read: { level: 1, done: {} },
      pron: { unlocked: 1, introduced: 0, recent: [] }
    };
  }

  // fill in anything a saved blob is missing, without discarding what it has
  function graft(saved, base) {
    var out = base || blank();
    if (!saved || typeof saved !== "object") return out;
    Object.keys(out).forEach(function (k) {
      var v = saved[k];
      if (v === undefined || v === null) return;
      var structured = typeof out[k] === "object" && !Array.isArray(out[k]) && Object.keys(out[k]).length > 0;
      // structured sections (settings, total, lipi ...) are merged field by field;
      // free-form maps (skills, words, days) are taken whole, keys and all
      if (structured && typeof v === "object" && !Array.isArray(v)) out[k] = graft(v, out[k]);
      else out[k] = v;
    });
    return out;
  }
  VB.__graft = graft;   // used by tools/check.js

  var S;
  function load() {
    var raw = null;
    try { raw = localStorage.getItem(KEY); } catch (e) { /* private mode */ }
    if (raw) { try { S = graft(JSON.parse(raw)); } catch (e) { S = blank(); } return; }
    // no v2 yet: carry v1 over and leave the v1 key where it is
    var old = null;
    try { old = localStorage.getItem(KEY_V1); } catch (e) { /* ignore */ }
    if (old) { try { S = graft(JSON.parse(old)); S.v = 2; save(); return; } catch (e) { /* fall through */ } }
    S = blank();
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* keep going without saving */ } }
  load();

  function today(d) {
    d = d || new Date();
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }

  // ---------- module registry ----------
  // Every module is a set of members and a set of cells. Adding pronouns or
  // verbs later is a data drop, not a scheduler change.
  function buildModules() {
    var M = {
      noun: {
        id: "noun", members: VB.CLASSES, cells: VB.CELLS, vibs: VB.VIBS, vacs: VB.VACS,
        label: function (m) { return VB.MODEL[m]; },
        forms: function (m, stem) { return VB.decline(stem, m); },
        grid: [VB.CLASSES.length, VB.VIBS.length]
      }
    };
    if (VB.PRON_ORDER && VB.PRONOUNS) {
      var cells = [];
      VB.PRON_VIBS.forEach(function (v) { VB.VACS.forEach(function (n) { cells.push(v + "." + n); }); });
      M.pron = {
        id: "pron", members: VB.PRON_ORDER, cells: cells, vibs: VB.PRON_VIBS, vacs: VB.VACS,
        label: function (m) { return VB.PRONOUNS[m] ? VB.PRONOUNS[m].label : m; },
        forms: function (m) { return VB.PRONOUNS[m].F; },
        grid: [VB.PRON_ORDER.length, VB.PRON_VIBS.length]
      };
    }
    VB.MODULES = M;
    return M;
  }
  buildModules();

  // ---------- skill maps ----------
  // Vibhakti, pronoun and reading answers share S.skills; letters have their
  // own map so the two progress views stay apart.
  function mapFor(opts) {
    if (opts && opts.map) return opts.map;
    if (opts && opts.store === "lipi") return S.lipi.skills;
    return S.skills;
  }
  function totalFor(opts) {
    return (opts && opts.store === "lipi") ? S.lipi.total : S.total;
  }

  // Rank a flat list of skill keys by the same need / weak / fresh score.
  // Used by the script page, whose keys are single characters, not member:cell.
  function planKeys(count, keys, map) {
    var now = Date.now();
    var list = keys.map(function (k) {
      var r = map[k];
      var need = 1 - Store.recall(r, now), weak = r ? 1 - Store.acc(r) : 0.6, fresh = (!r || r.n < 2) ? 0.35 : 0;
      return { skill: k, score: 0.5 * need + 0.3 * weak + fresh + Math.random() * 0.3 };
    });
    var out = [], used = {};
    for (var i = 0; i < count && list.length; i++) {
      list.sort(function (a, b) { return (b.score - (used[b.skill] || 0)) - (a.score - (used[a.skill] || 0)); });
      var prev = out[out.length - 1];
      var choice = list.find(function (x) { return !prev || x.skill !== prev.skill; }) || list[0];
      out.push(choice); used[choice.skill] = (used[choice.skill] || 0) + 0.6;
    }
    return out;
  }

  var Store = VB.Store = {
    get state() { return S; },
    save: save,
    reset: function () { S = blank(); save(); },
    today: today,
    KEY: KEY,

    // replace the whole state, used by settings import
    load: function (data) { S = graft(data); S.v = 2; save(); return S; },
    looksValid: function (data) {
      return !!data && typeof data === "object"
        && data.skills && typeof data.skills === "object"
        && data.settings && typeof data.settings === "object"
        && data.total && typeof data.total.q === "number";
    },
    blank: blank,
    modules: function () { return VB.MODULES; },

    wordSeen: function (stem) { return S.words[stem] || 0; },
    seeWord: function (stem) { S.words[stem] = Date.now(); },

    unlockedVibs: function () {
      if (S.settings.all) return VB.VIBS.slice();
      var out = []; VB.CLUSTERS.slice(0, S.unlocked).forEach(function (c) { out = out.concat(c); });
      return out;
    },
    unlockedCells: function () {
      var v = Store.unlockedVibs();
      return VB.CELLS.filter(function (c) { return v.indexOf(c.split(".")[0]) >= 0; });
    },

    rec: function (skill, map) { return (map || S.skills)[skill]; },
    recall: function (r, now) { return r && r.t ? Math.pow(2, -((now || Date.now()) - r.t) / HOUR / r.h) : 0; },
    acc: function (r) { if (!r || !r.r.length) return 0; return r.r.reduce(function (a, b) { return a + b; }, 0) / r.r.length; },
    level: function (skill, map) {
      var r = (map || S.skills)[skill];
      if (!r || !r.n) return 0;
      if (r.c < 2) return 1;
      if (r.c < 5 || Store.acc(r) < 0.7) return 2;
      if (r.h < 72) return 3;
      return 4;
    },

    /*
      opts:
        hint   the learner used a hint (half credit, slower growth)
        hard   one of the harder exercise types (faster growth)
        massed single-skill drilling: it still updates the memory model, but it
               must not count toward the unlock gate, which exists to require
               mixed retrieval
        store  "lipi" records into the script map instead
        map    an explicit skill map, for anything else
    */
    record: function (skill, correct, opts) {
      opts = opts || {};
      var map = mapFor(opts), tot = totalFor(opts);
      var r = map[skill] || (map[skill] = { n: 0, c: 0, h: 12, t: 0, r: [] });
      r.n++;
      var credit = correct ? (opts.hint ? 0.5 : 1) : 0;
      r.c += credit;
      if (correct) r.h = Math.min(24 * 90, r.h * (opts.hint ? 1.2 : opts.hard ? 2.0 : 1.6));
      else r.h = Math.max(4, r.h * 0.5);
      r.t = Date.now();
      r.r.push(credit >= 1 ? 1 : 0); if (r.r.length > 8) r.r.shift();
      if (!opts.massed) {
        var recent = opts.store === "lipi" ? S.lipi.recent : S.recent;
        recent.push(correct ? 1 : 0); if (recent.length > 40) recent.shift();
      }
      tot.q++; if (correct) tot.c++;
    },

    /*
      Pick the skills a session should practise, most needed first.
      filter: { vibs: ["dvi"], classes: ["a"], vacs: ["eka"], module: "noun" } or null.
    */
    planSkills: function (count, filter) {
      filter = filter || {};
      if (filter.keys) return planKeys(count, filter.keys, filter.map || S.skills);
      var mod = VB.MODULES[filter.module || "noun"];
      var cells = (filter.module && filter.module !== "noun" ? mod.cells : Store.unlockedCells()).slice();
      var members = mod.members.slice();
      if (filter.vibs && filter.vibs.length) cells = cells.filter(function (c) { return filter.vibs.indexOf(c.split(".")[0]) >= 0; });
      if (filter.vacs && filter.vacs.length) cells = cells.filter(function (c) { return filter.vacs.indexOf(c.split(".")[1]) >= 0; });
      if (filter.classes && filter.classes.length) members = members.filter(function (m) { return filter.classes.indexOf(m) >= 0; });
      if (!cells.length) cells = Store.unlockedCells();
      if (!members.length) members = mod.members.slice();

      var now = Date.now(), list = [];
      members.forEach(function (m) {
        cells.forEach(function (c) {
          var sk = m + ":" + c, r = S.skills[sk];
          var need = 1 - Store.recall(r, now), weak = r ? 1 - Store.acc(r) : 0.6, fresh = (!r || r.n < 2) ? 0.35 : 0;
          list.push({ skill: sk, cls: m, member: m, cell: c, module: mod.id, score: 0.5 * need + 0.3 * weak + fresh + Math.random() * 0.3 });
        });
      });
      var out = [], used = {};
      for (var i = 0; i < count; i++) {
        list.sort(function (a, b) { return (b.score - (used[b.skill] || 0)) - (a.score - (used[a.skill] || 0)); });
        var prev = out[out.length - 1];
        var choice = list.find(function (x) { return !prev || (x.cls !== prev.cls && x.cell !== prev.cell); }) || list[0];
        out.push(choice); used[choice.skill] = (used[choice.skill] || 0) + 0.6;
      }
      return out;
    },

    // weakest class, for choosing which table to practise
    weakClass: function () {
      var cells = Store.unlockedCells(), best = null, bestScore = -1;
      VB.CLASSES.forEach(function (cls) {
        var s = 0; cells.forEach(function (c) { var r = S.skills[cls + ":" + c]; s += r ? 1 - Store.recall(r) * Store.acc(r) : 1; });
        s += Math.random() * 2;
        if (s > bestScore) { bestScore = s; best = cls; }
      });
      return best;
    },

    overallLevel: function () {
      var cells = Store.unlockedCells(), sum = 0, n = 0;
      VB.CLASSES.forEach(function (cls) { cells.forEach(function (c) { sum += Store.level(cls + ":" + c); n++; }); });
      return n ? sum / n : 0;
    },

    // after a session: can the next group of vibhaktis open?
    tryUnlock: function () {
      if (S.settings.all || S.unlocked >= VB.CLUSTERS.length) return null;
      var cells = Store.unlockedCells(), ok = true;
      VB.CLASSES.forEach(function (cls) { cells.forEach(function (c) { var r = S.skills[cls + ":" + c]; if (!r || r.c < 1) ok = false; }); });
      var rec = S.recent.slice(-30);
      var acc = rec.length ? rec.reduce(function (a, b) { return a + b; }, 0) / rec.length : 0;
      if (ok && rec.length >= 20 && acc >= 0.75) { S.unlocked++; save(); return VB.CLUSTERS[S.unlocked - 1]; }
      return null;
    },

    // Script stages open with the same rule as vibhaktis: everything open has
    // been answered right at least once, and about 3 in 4 recent answers are right.
    tryUnlockLipi: function (openKeys, stages) {
      if (S.lipi.unlocked >= stages) return null;
      var ok = openKeys.every(function (k) { var r = S.lipi.skills[k]; return r && r.c >= 1; });
      var rec = S.lipi.recent.slice(-30);
      var acc = rec.length ? rec.reduce(function (a, b) { return a + b; }, 0) / rec.length : 0;
      if (ok && rec.length >= 20 && acc >= 0.75) { S.lipi.unlocked++; save(); return S.lipi.unlocked; }
      return null;
    },

    /*
      Mark a day as practised. `which` is undefined for vibhakti and reading
      work, "lipi" for the script page, which keeps its own lamps.
    */
    finishDay: function (q, c, which) {
      var map = which === "lipi" ? S.lipi.days : S.days;
      var d = today();
      var day = map[d] || (map[d] = { s: 0, q: 0, c: 0 });
      day.s++; day.q += q; day.c += c;
      save();
    },
    streak: function (which) {
      var map = which === "lipi" ? S.lipi.days : S.days;
      var n = 0, d = new Date();
      if (!map[today(d)]) d.setDate(d.getDate() - 1);
      while (map[today(d)]) { n++; d.setDate(d.getDate() - 1); }
      return n;
    },
    lastDays: function (k, which) {
      var map = which === "lipi" ? S.lipi.days : S.days;
      var out = [], d = new Date();
      d.setDate(d.getDate() - (k - 1));
      for (var i = 0; i < k; i++) { out.push({ date: today(d), done: !!map[today(d)], dow: d.getDay() }); d.setDate(d.getDate() + 1); }
      return out;
    },
    doneToday: function (which) { return which === "lipi" ? !!S.lipi.days[today()] : !!S.days[today()]; }
  };
})(VB);
