/*
  Progress, memory model and session planning.
  Everything is saved in this browser only (localStorage). No account, no server.

  Memory model, per skill (class + vibhakti + vacana, 64 in total):
    h  = half-life in hours. Chance you still remember = 2 ^ (-hours since last seen / h)
    right answer  -> h grows (more for harder question types, less if a hint was used)
    wrong answer  -> h halves (never below 4 hours)
  Skills that are fading, weak or new are practised first.
*/
var VB = window.VB = window.VB || {};

(function (VB) {
  var KEY = "vibhakti-abhyasa-v1";
  var HOUR = 3600 * 1000;
  VB.CLUSTERS = [["pra", "dvi"], ["tri"], ["cat", "pan"], ["sha", "sap"], ["sam"]];

  function blank() {
    return { skills: {}, words: {}, days: {}, unlocked: 1, introduced: 0,
             settings: { scale: 1, all: false }, recent: [], total: { q: 0, c: 0 }, best: { speed: 0 } };
  }
  var S;
  function load() {
    try { S = JSON.parse(localStorage.getItem(KEY)) || blank(); } catch (e) { S = blank(); }
    var b = blank(); for (var k in b) if (S[k] === undefined) S[k] = b[k];
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* private mode: keep going without saving */ } }
  load();

  function today(d) {
    d = d || new Date();
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }

  var Store = VB.Store = {
    get state() { return S; },
    save: save,
    reset: function () { S = blank(); save(); },
    today: today,

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

    rec: function (skill) { return S.skills[skill]; },
    recall: function (r, now) { return r && r.t ? Math.pow(2, -((now || Date.now()) - r.t) / HOUR / r.h) : 0; },
    acc: function (r) { if (!r || !r.r.length) return 0; return r.r.reduce(function (a, b) { return a + b; }, 0) / r.r.length; },
    level: function (skill) {
      var r = S.skills[skill];
      if (!r || !r.n) return 0;
      if (r.c < 2) return 1;
      if (r.c < 5 || Store.acc(r) < 0.7) return 2;
      if (r.h < 72) return 3;
      return 4;
    },

    record: function (skill, correct, opts) {
      opts = opts || {};
      var r = S.skills[skill] || (S.skills[skill] = { n: 0, c: 0, h: 12, t: 0, r: [] });
      r.n++;
      var credit = correct ? (opts.hint ? 0.5 : 1) : 0;
      r.c += credit;
      if (correct) r.h = Math.min(24 * 90, r.h * (opts.hint ? 1.2 : opts.hard ? 2.0 : 1.6));
      else r.h = Math.max(4, r.h * 0.5);
      r.t = Date.now();
      r.r.push(credit >= 1 ? 1 : 0); if (r.r.length > 8) r.r.shift();
      S.recent.push(correct ? 1 : 0); if (S.recent.length > 40) S.recent.shift();
      S.total.q++; if (correct) S.total.c++;
    },

    // pick the skills a session should practise, most needed first
    planSkills: function (count) {
      var cells = Store.unlockedCells(), now = Date.now(), list = [];
      VB.CLASSES.forEach(function (cls) {
        cells.forEach(function (c) {
          var sk = cls + ":" + c, r = S.skills[sk];
          var need = 1 - Store.recall(r, now), weak = r ? 1 - Store.acc(r) : 0.6, fresh = (!r || r.n < 2) ? 0.35 : 0;
          list.push({ skill: sk, cls: cls, cell: c, score: 0.5 * need + 0.3 * weak + fresh + Math.random() * 0.3 });
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

    finishDay: function (q, c) {
      var d = today();
      var day = S.days[d] || (S.days[d] = { s: 0, q: 0, c: 0 });
      day.s++; day.q += q; day.c += c;
      save();
    },
    streak: function () {
      var n = 0, d = new Date();
      if (!S.days[today(d)]) d.setDate(d.getDate() - 1);
      while (S.days[today(d)]) { n++; d.setDate(d.getDate() - 1); }
      return n;
    },
    lastDays: function (k) {
      var out = [], d = new Date();
      d.setDate(d.getDate() - (k - 1));
      for (var i = 0; i < k; i++) { out.push({ date: today(d), done: !!S.days[today(d)], dow: d.getDay() }); d.setDate(d.getDate() + 1); }
      return out;
    },
    doneToday: function () { return !!S.days[today()]; }
  };
})(VB);
