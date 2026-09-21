/*
  pron-questions.js
  Question generators for सर्वनामाभ्यासः.

  Pronoun forms are read from VB.PRON_BY_ID[id].F, never generated (they are
  irregular; see pronouns.js). Every question comes back in the same shape as
  the noun questions, so the drill screens render it without knowing the
  difference. A pronoun paradigm travels as a small word-like object
  { stem, cls, P, sub, vibs } where cls is the paradigm id ("tad-f").

  Skill keys are "paradigm:cell", for example "tad-f:cat.eka".
*/
var VB = window.VB = window.VB || {};

(function (VB) {
  "use strict";
  if (!VB.PRON_BY_ID) return;
  var shuffle = VB.shuffle, pick = VB.pick;
  var LINGA_SA = { m: "पुंलिङ्गम्", f: "स्त्रीलिङ्गम्", n: "नपुंसकलिङ्गम्" };
  var NOUN_CLASSES = { m: ["a"], f: ["aa", "ii"], n: ["n"] };

  function P(id) { return VB.PRON_BY_ID[id]; }
  function cells() { return VB.MODULES.pron.cells; }
  function vacsShown() { return VB.MODULES.pron.vacs; }
  function other(vac) { var v = vacsShown(); return v[(v.indexOf(vac) + 1) % v.length]; }
  function vibOf(c) { return c.split(".")[0]; }
  function vacOf(c) { return c.split(".")[1]; }

  // the word-like object the drill screens expect
  function pw(id) {
    var p = P(id);
    return { stem: p.base, cls: id, P: p.F, sub: p.linga ? LINGA_SA[p.linga] : "सर्वनाम", label: p.label, vibs: VB.PRON_VIBS, pron: true };
  }
  VB.pronWord = pw;

  // paradigms sharing a base (the three liṅgas of तद्), and the parallel
  // paradigms of other bases in the same liṅga (तद् m beside एतद् m, यद् m)
  function siblings(id) {
    var p = P(id);
    return VB.PRONOUNS.filter(function (q) { return q.id !== id && (q.base === p.base || (p.linga && q.linga === p.linga)); });
  }

  /*
    The mistakes pronoun learners make, each tagged so feedback can explain it:
      P1 another liṅga of the same pronoun (तस्यै for तस्मै)
      P2 the same place in a different pronoun (एतस्मै for तस्मै)
      M8 right vibhakti, other number
      M9 a neighbouring vibhakti
  */
  function mistakes(id, cell) {
    var p = P(id), right = p.F[cell], out = [];
    VB.PRONOUNS.forEach(function (q) {
      if (q.id === id) return;
      if (q.base === p.base) out.push([q.F[cell], "P1"]);
      else if (p.linga && q.linga === p.linga) out.push([q.F[cell], "P2"]);
    });
    vacsShown().forEach(function (n) { if (n !== vacOf(cell)) out.push([p.F[vibOf(cell) + "." + n], "M8"]); });
    var i = VB.PRON_VIBS.indexOf(vibOf(cell));
    [i - 1, i + 1].forEach(function (j) { if (j >= 0 && j < VB.PRON_VIBS.length) out.push([p.F[VB.PRON_VIBS[j] + "." + vacOf(cell)], "M9"]); });
    var seen = {}; seen[right] = 1;
    return out.filter(function (x) { if (!x[0] || seen[x[0]]) return false; seen[x[0]] = 1; return true; });
  }
  VB.pronMistakes = mistakes;

  VB.MISTAKE_NOTE.P1 = "That is the form for another liṅga. Match the gender of the word it stands for.";
  VB.MISTAKE_NOTE.P2 = "Right ending, but a different pronoun.";

  // options with the wrong answers spread across different kinds of mistake
  function mkOptions(right, wrongs, k) {
    k = k || 4;
    var byTag = {}, chosen = [], used = {}; used[right] = 1;
    shuffle(wrongs).forEach(function (x) { (byTag[x[1]] = byTag[x[1]] || []).push(x); });
    var tags = shuffle(Object.keys(byTag));
    for (var round = 0; chosen.length < k - 1 && round < 6; round++) {
      tags.forEach(function (t) { var x = byTag[t][round]; if (x && chosen.length < k - 1 && !used[x[0]]) { chosen.push(x); used[x[0]] = 1; } });
    }
    return shuffle([{ text: right, correct: true }].concat(chosen.map(function (x) { return { text: x[0], correct: false, tag: x[1] }; })));
  }

  function base(type, id, cell) {
    return { type: type, w: pw(id), cell: cell, skill: id + ":" + cell, hint: {}, pron: true };
  }
  function patternHint(id, cell) {
    var sib = siblings(id).filter(function (q) { return q.base !== P(id).base; })[0];
    return sib ? "Compare " + sib.label + ":  " + VB.cellLabel(cell) + " = " + sib.F[cell] : null;
  }
  function chipsFor(id, cell) { return [VB.VIB_SA[vibOf(cell)], VB.VAC_SA[vacOf(cell)]]; }

  // ======================================================
  // choose the form / build it from tiles
  // ======================================================
  VB.pGenForm = function (id, cell, ctx, tiles) {
    var p = P(id), f = p.F[cell], wr = mistakes(id, cell);
    var q = base(tiles ? "tiles" : "form", id, cell);
    q.instr = tiles ? "Build the correct form. Tap the pieces in order." : "Choose the correct form.";
    q.prompt = { big: p.base, sub: q.w.sub, chips: chipsFor(id, cell) };
    if (tiles) {
      var have = VB.aksharas(f), decoy = [];
      if (have.length < 2) return null;
      shuffle(wr).forEach(function (x) { VB.aksharas(x[0]).forEach(function (a) { if (have.indexOf(a) < 0 && decoy.indexOf(a) < 0) decoy.push(a); }); });
      q.ui = "tiles"; q.answer = f; q.tiles = shuffle(have.concat(decoy.slice(0, 3)));
      q.diagnose = {}; wr.forEach(function (x) { q.diagnose[x[0]] = x[1]; });
    } else {
      q.ui = "mcq"; q.options = mkOptions(f, wr);
      if (q.options.length < 3) return null;
    }
    q.hint.pattern = patternHint(id, cell);
    q.answerText = f;
    return q;
  };

  // ======================================================
  // which vibhakti and vacana (syncretism makes this multi-select often)
  // ======================================================
  VB.pGenIdentify = function (id, cell) {
    var p = P(id), f = p.F[cell];
    var right = cells().filter(function (c) { return p.F[c] === f; });
    var others = shuffle(cells().filter(function (c) { return right.indexOf(c) < 0; }));
    var multi = right.length > 1;
    var pool = shuffle(right.concat(others.slice(0, multi ? Math.max(2, 5 - right.length) : 3)));
    var q = base("identify", id, cell);
    q.ui = multi ? "multi" : "mcq";
    q.instr = multi ? "Which vibhakti and vacana? Choose every answer that fits." : "Which vibhakti and vacana is this?";
    q.prompt = { big: f, sub: p.label };
    q.options = pool.map(function (c) { return { text: VB.cellLabel(c), correct: right.indexOf(c) >= 0, cell: c }; });
    q.skills = right.map(function (c) { return id + ":" + c; });
    q.answerText = right.map(VB.cellLabel).join(",  ");
    q.hint.rule = "Pronoun forms collide a lot. Check every place in the table this form could sit.";
    return q;
  };

  // ======================================================
  // change the number
  // ======================================================
  VB.pGenFlip = function (id, cell) {
    var p = P(id), from = vibOf(cell) + "." + other(vacOf(cell)), f = p.F[cell];
    if (p.F[from] === f) return null;
    var q = base("flip", id, cell);
    q.ui = "mcq";
    q.instr = "Change to " + (vacOf(cell) === "eka" ? "one (एकवचनम्)" : "many (बहुवचनम्)") + ". Keep the same vibhakti.";
    q.prompt = { big: p.F[from], sub: p.label, chips: [VB.VIB_SA[vibOf(cell)], VB.VAC_SA[vacOf(from)] + "  >  " + VB.VAC_SA[vacOf(cell)]] };
    var wr = mistakes(id, cell).filter(function (x) { return x[0] !== p.F[from]; });
    wr.push([p.F[from], "M8"]);
    q.options = mkOptions(f, wr);
    q.answerText = f;
    return q.options.length >= 3 ? q : null;
  };

  // ======================================================
  // true or false
  // ======================================================
  VB.pGenTF = function (id, cell) {
    var p = P(id), f = p.F[cell], truth = Math.random() < 0.5, claim = cell;
    if (!truth) {
      var c = cells().filter(function (x) { return p.F[x] !== f && (vibOf(x) === vibOf(cell) || vacOf(x) === vacOf(cell)); });
      if (!c.length) return null;
      claim = pick(c);
    }
    var q = base("tf", id, cell);
    q.ui = "tf"; q.instr = "True or false?";
    q.prompt = { big: f, sub: p.label, claim: VB.cellLabel(claim) };
    q.truth = truth;
    q.answerText = truth ? "सत्यम्" : "असत्यम्  (" + cells().filter(function (x) { return p.F[x] === f; }).map(VB.cellLabel).join(", ") + ")";
    return q;
  };

  // ======================================================
  // which pronoun is this? (a form can belong to several: तेन is तद् m and n)
  // ======================================================
  VB.pGenLemma = function (id, cell) {
    var f = P(id).F[cell];
    var owners = VB.PRONOUNS.filter(function (q) { return cells().some(function (c) { return q.F[c] === f; }); });
    var decoys = shuffle(siblings(id).filter(function (q) { return owners.indexOf(q) < 0; }));
    if (decoys.length < 2) return null;
    var pool = shuffle(owners.concat(decoys.slice(0, Math.max(2, 4 - owners.length))));
    var q = base("lemma", id, cell);
    var multi = owners.length > 1;
    q.ui = multi ? "multi" : "mcq";
    q.instr = multi ? "Which pronoun could this be? Choose every answer that fits." : "Which pronoun is this form of?";
    q.prompt = { big: f };
    q.options = pool.map(function (x) { return { text: x.label, correct: owners.indexOf(x) >= 0 }; });
    q.skills = [id + ":" + cell];
    q.answerText = owners.map(function (x) { return x.label; }).join(",  ");
    return q;
  };

  // ======================================================
  // odd one out: three forms share a place in the table, one does not
  // ======================================================
  VB.pGenOdd = function (id, cell) {
    var pool = VB.Store.pronOpen().filter(function (m) { return m !== id; });
    var same = shuffle(pool).map(function (m) { return P(m).F[cell]; })
      .filter(function (f, i, a) { return a.indexOf(f) === i && f !== P(id).F[cell]; }).slice(0, 3);
    if (same.length < 3) return null;
    var cand = cells().filter(function (c) {
      var f = P(id).F[c];
      return c !== cell && (vibOf(c) === vibOf(cell) || vacOf(c) === vacOf(cell))
        && !VB.PRONOUNS.some(function (q) { return q.F[cell] === f; });
    });
    if (!cand.length) return null;
    var oc = pick(cand), odd = P(id).F[oc];
    var q = base("odd", id, oc);
    q.ui = "mcq"; q.instr = "Three of these share one vibhakti and vacana. Which one does not?";
    q.prompt = { big: VB.cellLabel(cell), sub: "Which one is NOT this?" };
    q.options = shuffle(same.map(function (f) { return { text: f, correct: false }; }).concat([{ text: odd, correct: true }]));
    q.answerText = odd;
    q.oddNote = odd + " = " + VB.cellLabel(oc) + " (" + P(id).label + ")";
    return q;
  };

  // ======================================================
  // follow the pattern of a parallel pronoun: तेन > तस्मै, एतेन > ?
  // ======================================================
  VB.pGenAnalogy = function (id, cell) {
    var p = P(id);
    var models = VB.PRONOUNS.filter(function (q) { return q.id !== id && q.linga === p.linga && q.base !== p.base && p.linga; });
    if (!models.length) return null;
    var m = pick(models);
    var froms = cells().filter(function (c) { return c !== cell && p.F[c] !== p.F[cell] && m.F[c] !== m.F[cell]; });
    if (!froms.length) return null;
    var cA = pick(froms);
    var q = base("analogy", id, cell);
    q.ui = "mcq"; q.instr = "Follow the pattern.";
    q.prompt = { pairs: [[m.F[cA], m.F[cell]], [p.F[cA], "?"]], sub: VB.cellLabel(cA) + "  →  " + VB.cellLabel(cell) };
    q.options = mkOptions(p.F[cell], mistakes(id, cell));
    q.answerText = p.F[cell];
    return q.options.length >= 3 ? q : null;
  };

  // nouns whose every reading in this form points to the same pronoun form,
  // so the agreement question has exactly one right answer
  function nounFor(id, cell) {
    var p = P(id);
    if (!p.linga) return null;
    var classes = NOUN_CLASSES[p.linga], bahu = vacOf(cell) !== "eka";
    var list = [];
    classes.forEach(function (cls) {
      VB.BY_CLASS[cls].forEach(function (w) { if (!(bahu && w.solo)) list.push(w); });
    });
    list = shuffle(list);
    for (var i = 0; i < list.length && i < 40; i++) {
      var w = list[i], form = w.P[cell];
      var readings = VB.CELLS.filter(function (c) { return w.P[c] === form && VB.PRON_VIBS.indexOf(vibOf(c)) >= 0 && cells().indexOf(c) >= 0; });
      if (readings.every(function (c) { return p.F[c] === p.F[cell]; })) return w;
    }
    return null;
  }

  // ======================================================
  // लिङ्गसामञ्जस्यम् (agreement): बालकाय > तस्मै
  // ======================================================
  VB.pGenAgree = function (id, cell) {
    var w = nounFor(id, cell); if (!w) return null;
    var p = P(id), f = p.F[cell];
    var q = base("agree", id, cell);
    q.ui = "mcq";
    q.instr = "Which form of " + p.base + " agrees with this word?";
    q.prompt = { big: w.P[cell], sub: w.stem + " (" + VB.CLASS_SA[w.cls] + ")" };
    q.options = mkOptions(f, mistakes(id, cell).filter(function (x) { return x[1] !== "P2"; }).concat(mistakes(id, cell).filter(function (x) { return x[1] === "P2"; }).slice(0, 1)));
    q.answerText = f;
    q.noun = w;
    q.hint.rule = "A pronoun takes the gender, vibhakti and number of the noun it stands for. " + w.P[cell] + " is " + LINGA_SA[p.linga] + ", " + VB.cellLabel(cell) + ".";
    return q.options.length >= 3 ? q : null;
  };

  // ======================================================
  // प्रतिस्थापनम् (substitution): रामेण सह गच्छति > तेन सह गच्छति
  // ======================================================
  VB.pGenSubst = function (id, cell, ctx) {
    var p = P(id);
    if (!p.linga || p.base !== "तद्") return null;   // replacing a noun is what तद् is for
    var cls = pick(NOUN_CLASSES[p.linga]);
    var s = VB.genSentence(cls, cell, { cells: VB.CELLS.slice(), level: (ctx && ctx.level) || 1 }, false);
    if (!s || s.prompt.sentence.indexOf("____") < 0) return null;
    var form = s.w.P[cell], f = p.F[cell];
    var q = base("subst", id, cell);
    q.ui = "mcq";
    q.instr = "Replace the marked word with the right form of तद्.";
    q.prompt = { sentence: VB.sbText(s.prompt.sentence.replace("____", "〔" + form + "〕")), mark: true };
    q.options = mkOptions(f, mistakes(id, cell));
    q.answerText = f;
    q.filled = VB.sbText(s.prompt.sentence.replace("____", f));
    q.meaning = s.meaning;
    q.hint.meaning = s.meaning;
    q.hint.rule = "Keep the vibhakti and number of the marked word, and take its gender: " + LINGA_SA[p.linga] + ".";
    return q.options.length >= 3 ? q : null;
  };

  // ======================================================
  // sentences from pronoun-frames.js
  // ======================================================
  /*
    Wrong answers for sentences must be wrong in every reading, not just
    unexpected. A different pronoun is often still good Sanskrit (एषः वृक्षः
    उन्नतः is as correct as अयम् वृक्षः उन्नतः), and with अहम्/त्वम् the other
    number usually is too (माता अस्मान् आह्वयति). So those never appear here.
  */
  function sentenceMistakes(id, cell) {
    var personal = !P(id).linga;
    return mistakes(id, cell).filter(function (x) { return x[1] !== "P2" && !(personal && x[1] === "M8"); });
  }

  function framesFor(id, cell) {
    return (VB.PFRAMES || []).filter(function (t) { return t.pron === id && t.cell === cell; });
  }
  VB.pGenSentence = function (id, cell, ctx, tiles) {
    var list = framesFor(id, cell); if (!list.length) return null;
    var t = pick(list), f = P(id).F[cell];
    var q = base("sentence", id, cell);
    q.instr = "Fill in the blank.";
    q.prompt = { sentence: t.sa.replace("{P}", "____"), setup: t.setup ? t.setup.sa : null };
    q.filled = VB.sbText(t.sa.replace("{P}", f));   // इदं फलं, not इदम् फलं
    q.meaning = (t.setup ? t.setup.en + " " : "") + t.en;
    q.hint.meaning = q.meaning;
    q.hint.rule = "Find the word the pronoun stands for, or the noun it describes. Match its gender, vibhakti and number.";
    var wr = sentenceMistakes(id, cell);
    if (tiles) {
      var have = VB.aksharas(f), decoy = [];
      shuffle(wr).forEach(function (x) { VB.aksharas(x[0]).forEach(function (a) { if (have.indexOf(a) < 0 && decoy.indexOf(a) < 0) decoy.push(a); }); });
      q.ui = "tiles"; q.answer = f; q.tiles = shuffle(have.concat(decoy.slice(0, 3)));
      q.diagnose = {}; wr.forEach(function (x) { q.diagnose[x[0]] = x[1]; });
    } else {
      q.ui = "mcq"; q.options = mkOptions(f, wr);
      if (q.options.length < 3) return null;
    }
    q.answerText = f;
    q.level = t.d;
    return q;
  };

  // ======================================================
  // find the mistake in a pronoun sentence
  // ======================================================
  VB.pGenError = function (id, cell) {
    var list = framesFor(id, cell); if (!list.length) return null;
    var t = pick(list), f = P(id).F[cell];
    var wr = sentenceMistakes(id, cell), wrong = Math.random() < 0.7 && wr.length ? pick(wr) : null;
    var shown = wrong ? wrong[0] : f;
    var raw = t.sa.replace("{P}", shown), disp = VB.sbText(raw);
    var rawT = raw.split(" "), dispT = disp.split(" ");
    var strip = function (x) { return x.replace(/[।?,!]/g, ""); };
    var q = base("error", id, cell);
    q.ui = "tokens"; q.instr = "Is there a mistake? Tap the wrong word, or choose ‘all correct’.";
    q.prompt = { setup: t.setup ? t.setup.sa : null };
    var marked = false;
    q.tokens = dispT.map(function (tok, i) {
      var isP = !marked && strip(rawT[i]) === shown;
      if (isP) marked = true;
      return { text: tok, cand: isP, wrong: isP && !!wrong };
    });
    if (!marked) return null;
    q.allCorrect = !wrong;
    q.answerText = wrong ? shown : "सर्वं सम्यक्";
    q.corrected = VB.sbText(t.sa.replace("{P}", f));
    q.tag = wrong ? wrong[1] : null;
    q.meaning = (t.setup ? t.setup.en + " " : "") + t.en;
    q.hint.meaning = q.meaning;
    return q;
  };

  // ======================================================
  // fill in a pronoun table
  // ======================================================
  VB.pGenTable = function (id, size) {
    var w = pw(id), rows = VB.PRON_VIBS.slice(), all = cells().slice(), blanks;
    if (size === "small") blanks = shuffle(all.filter(function (c) { return c !== "pra.eka"; })).slice(0, 4);
    else if (size === "large") blanks = shuffle(all.filter(function (c) { return c !== "pra.eka"; })).slice(0, Math.ceil(all.length * 0.6));
    else blanks = all.filter(function (c) { return c !== "pra.eka"; });
    var chips = blanks.map(function (c) { return w.P[c]; });
    var own = {}; all.forEach(function (c) { own[w.P[c]] = 1; });
    var decoys = [];
    blanks.forEach(function (c) { mistakes(id, c).forEach(function (x) { if (!own[x[0]] && decoys.indexOf(x[0]) < 0) decoys.push(x[0]); }); });
    chips = shuffle(chips.concat(shuffle(decoys).slice(0, blanks.length <= 4 ? 3 : 4)));
    return { type: "table", ui: "table", w: w, rows: rows, vacs: vacsShown(), blanks: blanks, chips: chips, mode: size,
      instr: "Complete the table. Tap an empty box, then tap the right form.",
      hint: { pattern: patternHint(id, blanks[0]) || "Say the table aloud row by row before you start." } };
  };

  // the generator map the drill uses when a step is a pronoun
  VB.PGEN = {
    form: function (id, c, x) { return VB.pGenForm(id, c, x, false); },
    tiles: function (id, c, x) { return VB.pGenForm(id, c, x, true); },
    identify: VB.pGenIdentify, flip: VB.pGenFlip, tf: VB.pGenTF, lemma: VB.pGenLemma,
    odd: VB.pGenOdd, analogy: VB.pGenAnalogy, agree: VB.pGenAgree, subst: VB.pGenSubst,
    sentence: function (id, c, x) { return VB.pGenSentence(id, c, x, false); },
    stiles: function (id, c, x) { return VB.pGenSentence(id, c, x, true); },
    error: VB.pGenError
  };
  VB.PTYPES = {
    low: { form: 3, identify: 2, agree: 3, sentence: 3, lemma: 1, tf: 1 },
    mid: { form: 2, tiles: 2, agree: 3, subst: 3, sentence: 3, flip: 2, identify: 1, odd: 1, analogy: 1 },
    high: { tiles: 3, stiles: 2, subst: 3, agree: 2, sentence: 3, error: 2, odd: 1, flip: 1, analogy: 1, lemma: 1 }
  };
  VB.PRON_MASSED_TYPES = ["form", "tiles", "identify", "flip", "agree"];
})(VB);
