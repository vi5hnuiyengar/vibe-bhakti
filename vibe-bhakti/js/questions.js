/*
  Question generators. Every question is built fresh from the grammar engine,
  the word list and the sentence frames, so the same screen rarely appears twice.
*/
var VB = window.VB = window.VB || {};

(function (VB) {
  // ---------- small helpers ----------
  function rnd(n) { return Math.floor(Math.random() * n); }
  function pick(a) { return a[rnd(a.length)]; }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = rnd(i + 1), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function other(v) { return v === "eka" ? "bahu" : "eka"; }
  function cap(s) { return s.replace(/[A-Za-z]/, function (c) { return c.toUpperCase(); }); }
  VB.shuffle = shuffle; VB.pick = pick;

  // ---------- load words ----------
  VB.WORDS = []; VB.BY_CLASS = { a: [], aa: [], ii: [], n: [] }; VB.BY_STEM = {};
  VB.CLASSES.forEach(function (cls) {
    VB.RAW_WORDS[cls].trim().split("\n").forEach(function (line) {
      line = line.trim(); if (!line) return;
      var p = line.split("|");
      var w = { stem: p[0].trim(), cls: cls, en1: p[1], en2: p[2] || p[1], cats: {}, flags: {} };
      (p[3] || "").split(" ").forEach(function (c) { if (c) w.cats[c] = 1; });
      (p[4] || "").split(" ").forEach(function (f) { if (f) w.flags[f] = 1; });
      w.P = VB.decline(w.stem, cls);
      w.natva = VB.natvaInfo(w.stem, cls);
      w.solo = !!(w.flags.proper || w.flags.mass || w.flags.sg);   // never drilled in bahuvacana
      VB.WORDS.push(w); VB.BY_CLASS[cls].push(w); VB.BY_STEM[w.stem] = w;
    });
  });
  VB.SUBJECTS = VB.WORDS.filter(function (w) { return w.cats.person && w.cls !== "n" && w.stem !== "सेना"; });

  function cellsOf(w, form, allowed) {
    return VB.CELLS.filter(function (c) { return w.P[c] === form && (!allowed || allowed.indexOf(c) >= 0); });
  }
  VB.cellsOf = cellsOf;
  function modelFor(w) {
    var m = VB.MODEL[w.cls];
    if (m === w.stem) m = { a: "बालक", aa: "लता", ii: "नारी", n: "पुस्तक" }[w.cls];
    return VB.BY_STEM[m];
  }
  VB.modelFor = modelFor;

  // ---------- English for hints ----------
  function enNoun(w, vac, mode) {
    var base = vac === "bahu" ? w.en2 : w.en1;
    if (mode === "voc") return "O " + base;
    if (w.flags.proper || w.flags.mass) return base;
    return "the " + base;
  }
  function enPoss(w, vac) {
    var n = enNoun(w, vac);
    return /s$/.test(n) && vac === "bahu" ? n + "'" : n + "'s";
  }
  function fillEn(t, x, vac, s) {
    var e = t.en;
    e = e.replace(/\{v:([^|}]*)\|([^}]*)\}/g, function (_, a, b) { return vac === "eka" ? a : b; });
    e = e.replace("{X's}", "[" + enPoss(x, vac) + "]").replace("{Xv}", "[" + enNoun(x, vac, "voc") + "]").replace("{X}", "[" + enNoun(x, vac) + "]");
    if (s) e = e.replace("{S}", enNoun(s, "eka"));
    return cap(e);
  }

  // ---------- Sanskrit sentence ----------
  var BHAVAN = { m: { eka: "भवान्", bahu: "भवन्तः" }, f: { eka: "भवती", bahu: "भवत्यः" } };
  function gOf(w) { return (w.cls === "aa" || w.cls === "ii") ? "f" : "m"; }
  function fillSa(t, x, vac, xForm, s, sForm) {
    var e = t.sa;
    e = e.replace(/\{v:([^|}]*)\|([^}]*)\}/g, function (_, a, b) { return vac === "eka" ? a : b; });
    if (s) e = e.replace(/\{g:([^|}]*)\|([^}]*)\}/g, function (_, a, b) { return gOf(s) === "m" ? a : b; });
    e = e.replace("{B}", BHAVAN[gOf(x)][vac]);
    e = e.replace("{X}", xForm);
    if (s) e = e.replace("{S}", sForm);
    return e;
  }

  // ---------- word choice: least recently seen, never the same word twice in a row ----------
  VB.recentWords = []; VB.recentFrames = [];
  function noteWord(w) {
    VB.recentWords.push(w.stem); if (VB.recentWords.length > 8) VB.recentWords.shift();
    if (VB.Store) VB.Store.seeWord(w.stem);
  }
  function chooseWord(list) {
    if (!list.length) return null;
    var fresh = list.filter(function (w) { return VB.recentWords.indexOf(w.stem) < 0; });
    if (fresh.length) list = fresh;
    var seen = VB.Store ? VB.Store.wordSeen : function () { return 0; };
    list = shuffle(list).sort(function (a, b) { return seen(a.stem) - seen(b.stem); });
    var w = list[rnd(Math.max(1, Math.ceil(list.length * 0.3)))];
    noteWord(w); return w;
  }
  function wordFor(cls, cell, filter) {
    var bahu = cell && cell.split(".")[1] === "bahu";
    return chooseWord(VB.BY_CLASS[cls].filter(function (w) {
      return !(bahu && w.solo) && (!filter || filter(w));
    }));
  }
  VB.wordFor = wordFor;

  // ---------- options ----------
  function mkOptions(right, wrongs, k) {
    k = k || 4;
    var byTag = {}, chosen = [], used = {};
    used[right] = 1;
    shuffle(wrongs).forEach(function (x) { (byTag[x[1]] = byTag[x[1]] || []).push(x); });
    var tags = shuffle(Object.keys(byTag));
    for (var round = 0; chosen.length < k - 1 && round < 6; round++) {
      tags.forEach(function (t) {
        var x = byTag[t][round];
        if (x && chosen.length < k - 1 && !used[x[0]]) { chosen.push(x); used[x[0]] = 1; }
      });
    }
    var opts = [{ text: right, correct: true }].concat(chosen.map(function (x) { return { text: x[0], correct: false, tag: x[1] }; }));
    return shuffle(opts);
  }

  function base(type, w, cell) {
    return { type: type, w: w, cell: cell, skill: w ? w.cls + ":" + cell : null, hint: {} };
  }
  function patternHint(w, cell) {
    var m = modelFor(w);
    return "Pattern word: " + m.stem + ". In the same place of its table: " + m.P[cell];
  }

  // ======================================================
  // 1. Identify the vibhakti and vacana of a form
  // ======================================================
  VB.genIdentify = function (cls, cell, ctx) {
    var w = wordFor(cls, cell); if (!w) return null;
    var f = w.P[cell];
    var right = cellsOf(w, f, ctx.cells);
    var others = shuffle(ctx.cells.filter(function (c) { return right.indexOf(c) < 0; }))
      .sort(function (a, b) {
        var pa = a.split("."), pb = b.split("."), pc = cell.split(".");
        return ((pa[0] !== pc[0]) + (pa[1] !== pc[1])) - ((pb[0] !== pc[0]) + (pb[1] !== pc[1]));
      });
    var multi = right.length > 1;
    var pool = shuffle(right.concat(others.slice(0, multi ? Math.max(2, 5 - right.length) : 3)));
    var q = base("identify", w, cell);
    q.ui = multi ? "multi" : "mcq";
    q.instr = multi ? "Which vibhakti and vacana? Choose every answer that fits." : "Which vibhakti and vacana is this?";
    q.prompt = { big: f, sub: "मूलशब्दः  " + w.stem + " (" + VB.CLASS_SHORT[w.cls] + ")" };
    q.options = pool.map(function (c) { return { text: VB.cellLabel(c), correct: right.indexOf(c) >= 0, cell: c }; });
    q.answerText = right.map(VB.cellLabel).join(",  ");
    var m = modelFor(w);
    q.hint.pattern = "Compare with " + m.stem + ":  " + pool.map(function (c) { return VB.cellLabel(c) + " = " + m.P[c]; }).join(";  ");
    q.skills = right.map(function (c) { return w.cls + ":" + c; });
    return q;
  };

  // ======================================================
  // 2. Pick the form  /  3. Build the form from akshara tiles
  // ======================================================
  VB.genForm = function (cls, cell, ctx, tiles) {
    var w = wordFor(cls, cell); if (!w) return null;
    var f = w.P[cell], wr = VB.mistakes(w.stem, cls, cell);
    var q = base(tiles ? "tiles" : "form", w, cell);
    q.instr = tiles ? "Build the correct form. Tap the pieces in order." : "Choose the correct form.";
    q.prompt = { big: w.stem, sub: VB.CLASS_SA[w.cls], chips: [VB.VIB_SA[cell.split(".")[0]], VB.VAC_SA[cell.split(".")[1]]] };
    if (tiles) {
      q.ui = "tiles"; q.answer = f;
      var have = VB.aksharas(f), decoy = [];
      shuffle(wr).forEach(function (x) {
        VB.aksharas(x[0]).forEach(function (a) { if (have.indexOf(a) < 0 && decoy.indexOf(a) < 0) decoy.push(a); });
      });
      q.tiles = shuffle(have.concat(decoy.slice(0, Math.min(3, Math.max(2, 6 - have.length)))));
      q.diagnose = {}; wr.forEach(function (x) { q.diagnose[x[0]] = x[1]; });
    } else {
      q.ui = "mcq"; q.options = mkOptions(f, wr);
    }
    q.hint.pattern = patternHint(w, cell);
    q.answerText = f;
    return q;
  };

  // ======================================================
  // 4. Analogy: follow the pattern of another word
  // ======================================================
  VB.genAnalogy = function (cls, cell, ctx) {
    var w = wordFor(cls, cell); if (!w) return null;
    var models = VB.BY_CLASS[cls].filter(function (x) { return x.stem !== w.stem && !x.solo; });
    var m = pick(models), trap = false;
    if (w.natva[cell] !== undefined && Math.random() < 0.6) {
      var diff = models.filter(function (x) { return x.natva[cell] !== w.natva[cell]; });
      if (diff.length) { m = pick(diff); trap = true; }
    }
    var froms = ctx.cells.filter(function (c) { return c !== cell && w.P[c] !== w.P[cell] && !(c.split(".")[1] === "bahu" && w.solo); });
    if (!froms.length) return null;
    var cA = pick(froms), f = w.P[cell];
    var q = base("analogy", w, cell);
    q.ui = "mcq"; q.instr = "Follow the pattern.";
    q.prompt = { pairs: [[m.P[cA], m.P[cell]], [w.P[cA], "?"]], sub: VB.cellLabel(cA) + "  →  " + VB.cellLabel(cell) };
    var wr = VB.mistakes(w.stem, cls, cell);
    if (trap) { var nf = VB.flipNatva(f); if (nf) wr.unshift([nf, "M4"]); }
    q.options = mkOptions(f, wr);
    q.hint.pattern = trap ? "Careful: न or ण? Look for र, ष or ऋ earlier in " + w.stem + ", and whether something blocks it." : "Both words belong to the same class, so they change in the same way.";
    q.answerText = f; q.trap = trap;
    return q;
  };

  // ======================================================
  // sentence helpers
  // ======================================================
  function fits(t, w) {
    if (t.only) return t.only.indexOf(w.stem) >= 0;
    if (t.ex.indexOf(w.stem) >= 0) return false;
    if (!t.cats.length) return true;
    for (var i = 0; i < t.cats.length; i++) if (w.cats[t.cats[i]]) return true;
    return false;
  }
  function numsFor(t, w) { return w.solo ? t.nums.filter(function (n) { return n === "eka"; }) : t.nums; }
  function hasS(t) { return t.sa.indexOf("{S}") >= 0; }
  function subjectFor(xStem) {
    var s = pick(VB.SUBJECTS.filter(function (x) { return x.stem !== xStem; }));
    return s;
  }
  function frameAndWord(cls, cell, level) {
    var vib = cell.split(".")[0], vac = cell.split(".")[1];
    var want = level <= 1 ? [1] : level === 2 ? [1, 2] : [2, 3];
    var tries = [want, [1, 2, 3]];
    for (var k = 0; k < tries.length; k++) {
      var pairs = [];
      VB.FRAMES.forEach(function (t) {
        if (t.vib !== vib || tries[k].indexOf(t.d) < 0) return;
        VB.BY_CLASS[cls].forEach(function (w) {
          if (vib === "sam" && !t.anyword && t.id !== "sam03" && t.id !== "sam07" && !w.cats.person) return;
          if (fits(t, w) && numsFor(t, w).indexOf(vac) >= 0) pairs.push([t, w]);
        });
      });
      if (pairs.length) {
        // choose a frame first (so small frames get their turn), then the least recently seen word for it
        var byFrame = {};
        pairs.forEach(function (p) { (byFrame[p[0].id] = byFrame[p[0].id] || []).push(p); });
        var ids = Object.keys(byFrame);
        var freshIds = ids.filter(function (id) { return VB.recentFrames.indexOf(id) < 0; });
        if (freshIds.length) ids = freshIds;
        var weights = ids.map(function (id) { return Math.min(byFrame[id].length, 4); });
        var total = weights.reduce(function (a, b) { return a + b; }, 0), r = Math.random() * total, fid = ids[0];
        for (var i = 0; i < ids.length; i++) { r -= weights[i]; if (r <= 0) { fid = ids[i]; break; } }
        var list = byFrame[fid];
        var fresh = list.filter(function (p) { return VB.recentWords.indexOf(p[1].stem) < 0; });
        if (fresh.length) list = fresh;
        var seen = VB.Store ? VB.Store.wordSeen : function () { return 0; };
        list = shuffle(list).sort(function (a, b) { return seen(a[1].stem) - seen(b[1].stem); });
        var p = list[rnd(Math.max(1, Math.ceil(list.length * 0.3)))];
        noteWord(p[1]);
        VB.recentFrames.push(fid); if (VB.recentFrames.length > 12) VB.recentFrames.shift();
        return p;
      }
    }
    return null;
  }
  function sentenceWrongs(t, w, cell) {
    var ws = VB.mistakes(w.stem, w.cls, cell), vac = cell.split(".")[1], vib = cell.split(".")[0];
    if (t.strict) {
      ws = ws.filter(function (x) {
        if (x[1] !== "M9") return true;
        var src = cellsOf(w, x[0]);
        if (t.kind === "karta") return src.some(function (c) { return c.indexOf("dvi") === 0 || c.indexOf("tri") === 0; });
        if (t.kind === "ruc") return !src.some(function (c) { return c.indexOf("sha") === 0; });
        return true;
      });
      if (vib !== "pra" && vib !== "sam") ws.push([w.P["pra." + vac], "M12"]);
    } else {
      ws = ws.filter(function (x) { return x[1] !== "M9"; });
    }
    return ws.filter(function (x) { return x[0] !== w.P[cell]; });
  }

  function sentenceBase(type, cls, cell, level) {
    var fw = frameAndWord(cls, cell, level); if (!fw) return null;
    var t = fw[0], w = fw[1], vac = cell.split(".")[1];
    var s = hasS(t) ? subjectFor(w.stem) : null;
    var q = base(type, w, cell);
    q.frame = t; q.s = s; q.vac = vac;
    q.sForm = s ? s.P["pra.eka"] : null;
    q.meaning = fillEn(t, w, vac, s);
    q.hint.meaning = q.meaning;
    q.hint.rule = VB.RULES[t.kind];
    q.filled = VB.sbText(fillSa(t, w, vac, w.P[cell], s, q.sForm));
    q.level = t.d;
    return q;
  }

  // ======================================================
  // 5. Sentence: fill in the blank
  // ======================================================
  VB.genSentence = function (cls, cell, ctx, tiles) {
    var q = sentenceBase("sentence", cls, cell, ctx.level); if (!q) return null;
    var w = q.w, t = q.frame, f = w.P[cell];
    q.instr = "Fill in the blank.";
    q.prompt = { sentence: fillSa(t, w, q.vac, "____", q.s, q.sForm), sub: t.cue ? w.stem : w.stem + ",  " + VB.VAC_SA[q.vac] };
    var wr = sentenceWrongs(t, w, cell);
    if (tiles) {
      q.ui = "tiles"; q.answer = f;
      var have = VB.aksharas(f), decoy = [];
      shuffle(wr).forEach(function (x) { VB.aksharas(x[0]).forEach(function (a) { if (have.indexOf(a) < 0 && decoy.indexOf(a) < 0) decoy.push(a); }); });
      q.tiles = shuffle(have.concat(decoy.slice(0, 3)));
      q.diagnose = {}; wr.forEach(function (x) { q.diagnose[x[0]] = x[1]; });
    } else {
      q.ui = "mcq"; q.options = mkOptions(f, wr);
      if (q.options.length < 3) return null;
    }
    q.answerText = f;
    return q;
  };

  // ======================================================
  // 6. Which question word (किम्) asks about the marked word?
  // ======================================================
  VB.genKim = function (cls, cell, ctx) {
    if (cell.indexOf("sam") === 0) return null;
    var q = sentenceBase("kim", cls, cell, ctx.level); if (!q) return null;
    var w = q.w, g = VB.GENDER[cls], ans = VB.kim(g, cell), vib = cell.split(".")[0], vac = q.vac;
    var pool = [];
    ["m", "f", "n"].forEach(function (og) { pool.push([VB.kim(og, cell), "M13"]); });
    VB.VIBS.slice(0, 7).forEach(function (ov) { if (ov !== vib) pool.push([VB.kim(g, ov + "." + vac), "M13"]); });
    pool.push([VB.kim(g, vib + "." + other(vac)), "M13"]);
    q.ui = "mcq"; q.instr = "Which question word asks about the marked word?";
    q.prompt = { sentence: VB.sbText(fillSa(q.frame, w, vac, "〔" + w.P[cell] + "〕", q.s, q.sForm)), mark: true };
    q.options = mkOptions(ans, pool.filter(function (x) { return x[0] !== ans; }));
    q.answerText = ans;
    q.hint.rule = "The marked word is " + VB.CLASS_SA[w.cls] + ". Find its vibhakti and number, then take the matching form of किम्.";
    return q;
  };

  // ======================================================
  // 7. Error spotting in a sentence
  // ======================================================
  VB.genError = function (cls, cell, ctx) {
    var q = sentenceBase("error", cls, cell, ctx.level); if (!q) return null;
    var w = q.w, t = q.frame, s = q.s, right = w.P[cell];
    var where = null, bad = null, tag = null, roll = Math.random();
    if (roll < 0.25) { /* all correct */ }
    else if (s && roll < 0.5) {
      var sw = [[s.P["pra.bahu"], "M14"], [s.P["dvi.eka"], "M14"], [s.P["tri.eka"], "M14"]];
      var x = pick(sw); where = "S"; bad = x[0]; tag = x[1];
    } else {
      var wr = sentenceWrongs(t, w, cell).filter(function (x) { return x[1] !== "M8" || t.cue; });
      if (w.cats.person || w.cats.animal || w.cats.deity || w.cats.bird)
        wr = wr.filter(function (x) { return ["M1", "M2", "M3"].indexOf(x[1]) < 0; });
      if (!wr.length) return null;
      var y = pick(wr); where = "X"; bad = y[0]; tag = y[1];
    }
    var xF = where === "X" ? bad : right, sF = where === "S" ? bad : q.sForm;
    var raw = fillSa(t, w, q.vac, xF, s, sF), shown = VB.sbText(raw);
    var rawT = raw.split(" "), shT = shown.split(" ");
    var strip = function (x) { return x.replace(/[।?,!]/g, ""); };
    var cand = []; if (s) cand.push(sF); cand.push(xF);
    q.ui = "tokens"; q.instr = "Is there a mistake? Tap the wrong word, or choose ‘all correct’.";
    q.tokens = shT.map(function (tok, i) {
      var c = cand.indexOf(strip(rawT[i])) >= 0;
      return { text: tok, cand: c, wrong: c && where !== null && strip(rawT[i]) === bad };
    });
    q.allCorrect = where === null;
    q.answerText = where ? strip(shT[rawT.map(strip).indexOf(bad)]) : "सर्वं सम्यक्";
    q.corrected = q.filled;
    q.tag = tag;
    if (where === "S") q.hint.rule = "Check the doer too: it must be प्रथमा, and one or many must match the verb.";
    return q;
  };

  // ======================================================
  // 8. Change the number
  // ======================================================
  VB.genFlip = function (cls, cell, ctx) {
    var vib = cell.split(".")[0], tv = cell.split(".")[1], fv = other(tv);
    var w = wordFor(cls, vib + ".bahu"); if (!w) return null;
    var from = vib + "." + fv, f = w.P[cell];
    var q = base("flip", w, cell);
    q.ui = "mcq"; q.instr = "Change to " + (tv === "eka" ? "one (एकवचनम्)" : "many (बहुवचनम्)") + ". Keep the same vibhakti.";
    q.prompt = { big: w.P[from], chips: [VB.VIB_SA[vib], VB.VAC_SA[fv] + "  >  " + VB.VAC_SA[tv]] };
    var wr = VB.mistakes(w.stem, cls, cell).filter(function (x) { return x[0] !== w.P[from]; });
    wr.push([w.P[from], "M8"]);
    q.options = mkOptions(f, wr);
    q.hint.pattern = patternHint(w, cell);
    q.answerText = f;
    return q;
  };

  // ======================================================
  // 9. Odd one out across classes
  // ======================================================
  VB.genOdd = function (cls, cell, ctx) {
    var classes = shuffle(VB.CLASSES).slice(0, 3);
    var same = classes.map(function (c) { return wordFor(c, cell); });
    if (same.some(function (x) { return !x; })) return null;
    var ow = wordFor(cls, "pra.bahu"); if (!ow) return null;
    var p = cell.split(".");
    var cand = ctx.cells.filter(function (c) {
      var q = c.split(".");
      return c !== cell && (q[0] === p[0] || q[1] === p[1]) && ow.P[c] !== ow.P[cell] && cellsOf(ow, ow.P[c]).indexOf(cell) < 0;
    });
    if (!cand.length) return null;
    var oc = pick(cand), forms = same.map(function (w) { return w.P[cell]; }).concat([ow.P[oc]]);
    if (new Set(forms).size < 4) return null;
    var q = base("odd", ow, oc);
    q.ui = "mcq"; q.instr = "Three of these share one vibhakti and vacana. Which one does not?";
    q.prompt = { big: VB.cellLabel(cell), sub: "Which one is NOT this?" };
    q.options = shuffle(forms.map(function (f, i) { return { text: f, correct: i === 3 }; }));
    q.answerText = ow.P[oc];
    q.oddNote = ow.P[oc] + " = " + VB.cellLabel(oc) + " (" + ow.stem + ")";
    q.hint.rule = "The four words come from different classes. Look at each ending, not at the word.";
    return q;
  };

  // ======================================================
  // 10. Which base word does this form come from?
  // ======================================================
  VB.genLemma = function (cls, cell, ctx) {
    var w = wordFor(cls, cell); if (!w) return null;
    var f = w.P[cell], root = VB.rootOf(w.stem, cls);
    var opts = [{ text: w.stem + "  (" + VB.CLASS_SA[cls] + ")", correct: true }];
    VB.CLASSES.forEach(function (oc) {
      if (oc === cls) return;
      var ps = VB.stemFor(root, oc), P = VB.decline(ps, oc);
      if (Object.keys(P).some(function (k) { return P[k] === f; })) return;
      opts.push({ text: ps + "  (" + VB.CLASS_SA[oc] + ")", correct: false, tag: "M1" });
    });
    if (opts.length < 3) return null;
    var q = base("lemma", w, cell);
    q.ui = "mcq"; q.instr = "Which base word does this form come from?";
    q.prompt = { big: f };
    q.options = shuffle(opts);
    q.answerText = opts[0].text;
    q.hint.pattern = "Only one class has this ending. Think of राम, रमा, नदी and फल.";
    return q;
  };

  // ======================================================
  // 11. Match pairs
  // ======================================================
  VB.genMatch = function (ctx) {
    var cells = shuffle(ctx.cells), pairs = [], used = {};
    for (var i = 0; i < cells.length && pairs.length < 4; i++) {
      var cls = pick(VB.CLASSES), w = wordFor(cls, cells[i]); if (!w) continue;
      var f = w.P[cells[i]];
      if (cellsOf(w, f).length > 1 || used[f]) continue;
      used[f] = 1; pairs.push({ left: f, right: VB.cellLabel(cells[i]), skill: cls + ":" + cells[i] });
    }
    if (pairs.length < 4) return null;
    return { type: "match", ui: "match", instr: "Match each form with its vibhakti and vacana.", pairs: pairs, hint: { rule: "Each of these forms has only one possible answer." } };
  };

  // ======================================================
  // 12. True or false (also used in the speed round)
  // ======================================================
  VB.genTF = function (cls, cell, ctx) {
    var w = wordFor(cls, cell); if (!w) return null;
    var f = w.P[cell], truth = Math.random() < 0.5, claim = cell;
    if (!truth) {
      var c = ctx.cells.filter(function (x) { var a = x.split("."), b = cell.split("."); return cellsOf(w, f).indexOf(x) < 0 && (a[0] === b[0] || a[1] === b[1]); });
      if (!c.length) return null;
      claim = pick(c);
    }
    var q = base("tf", w, cell);
    q.ui = "tf"; q.instr = "True or false?";
    q.prompt = { big: f, sub: w.stem + " (" + VB.CLASS_SHORT[w.cls] + ")", claim: VB.cellLabel(claim) };
    q.truth = truth;
    q.answerText = truth ? "सत्यम्" : "असत्यम्  (" + cellsOf(w, f, ctx.cells).map(VB.cellLabel).join(", ") + ")";
    q.hint.pattern = patternHint(w, cell);
    return q;
  };

  // ======================================================
  // 13. Fill in the declension table
  // ======================================================
  VB.genTable = function (cls, ctx, size) {
    var w = wordFor(cls, "pra.bahu"); if (!w) return null;
    var cells = ctx.cells.slice(), blanks;
    var rows = VB.VIBS.filter(function (v) { return cells.indexOf(v + ".eka") >= 0; });
    var mode = size || "small";
    if (mode === "small") blanks = shuffle(cells.filter(function (c) { return c !== "pra.eka"; })).slice(0, Math.min(4, cells.length - 1));
    else if (mode === "rows") {
      var rs = shuffle(rows.filter(function (r) { return r !== "pra"; })).slice(0, Math.min(2, rows.length - 1));
      blanks = []; rs.forEach(function (r) { blanks.push(r + ".eka", r + ".bahu"); });
      var extra = shuffle(cells.filter(function (c) { return blanks.indexOf(c) < 0 && c !== "pra.eka"; }))[0];
      if (extra) blanks.push(extra);
    }
    else if (mode === "column") { var col = pick(["eka", "bahu"]); blanks = cells.filter(function (c) { return c.split(".")[1] === col && c !== "pra.eka"; }); }
    else if (mode === "large") blanks = shuffle(cells.filter(function (c) { return c !== "pra.eka"; })).slice(0, Math.ceil(cells.length * 0.6));
    else blanks = cells.filter(function (c) { return c !== "pra.eka"; });   // full
    if (!blanks.length) return null;
    var chips = blanks.map(function (c) { return w.P[c]; });
    var all = {}; VB.CELLS.forEach(function (c) { all[w.P[c]] = 1; });
    var decoys = [];
    shuffle(blanks).forEach(function (c) {
      VB.mistakes(w.stem, cls, c).forEach(function (x) { if (!all[x[0]] && decoys.indexOf(x[0]) < 0) decoys.push(x[0]); });
    });
    var nDecoy = blanks.length <= 4 ? 3 : 4;
    chips = shuffle(chips.concat(shuffle(decoys).slice(0, nDecoy)));
    return { type: "table", ui: "table", w: w, instr: "Complete the table. Tap an empty box, then tap the right form.",
             rows: rows, blanks: blanks, chips: chips, mode: mode,
             hint: { pattern: "Pattern word " + modelFor(w).stem + ":  " + blanks.slice(0, 3).map(function (c) { return VB.cellLabel(c) + " = " + modelFor(w).P[c]; }).join(";  ") } };
  };
})(VB);
