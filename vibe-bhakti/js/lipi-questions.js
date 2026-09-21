/*
  lipi-questions.js
  The six script exercises for the लिपिः page.

  Wrong options always come from the character's confusion set (`conf` in
  lipi.js) first, so a wrong answer is a mistake learners really make.
  Random picks only fill the gaps.

  Every question drills one character and records against "lipi:" + that
  character in S.lipi.skills.
*/
var VB = window.VB = window.VB || {};

(function (VB) {
  "use strict";
  var shuffle = VB.shuffle, pick = VB.pick;
  function rnd(n) { return Math.floor(Math.random() * n); }

  var BY = VB.BY_CHAR;
  var CONS = VB.AKSHARAS.filter(function (a) { return a.type === "cons"; });
  var VIRAMA = "्";

  // ---------- transliteration (IAST) ----------
  // Sanskrit has no schwa deletion, so reading is mechanical: a consonant
  // carries "a" unless a matra or virama follows it.
  function translit(str) {
    var out = "";
    for (var i = 0; i < str.length; i++) {
      var ch = str.charAt(i), e = BY[ch], next = str.charAt(i + 1);
      if (!e) continue;
      if (e.type === "cons") {
        var base = e.tr.slice(0, -1);
        if (next === VIRAMA) { out += base; i++; }
        else if (BY[next] && BY[next].vowel) { out += base + BY[next].tr; i++; }
        else out += e.tr;
      } else out += e.tr;
    }
    return out;
  }
  VB.translit = translit;

  // ---------- which characters are open ----------
  function stageChars(n) {
    var chars = [];
    VB.LIPI_STAGES.slice(0, n).forEach(function (st) {
      if (st.add === "*") {
        VB.AKSHARAS.concat(VB.MATRAS, VB.CONJUNCTS).forEach(function (e) { if (!e.rare) chars.push(e.ch); });
      } else st.add.split(" ").forEach(function (c) { if (c) chars.push(c); });
    });
    var seen = {};
    return chars.filter(function (c) { if (seen[c] || !BY[c]) return false; seen[c] = 1; return true; });
  }
  VB.lipiOpen = function () { return stageChars(VB.Store.state.lipi.unlocked || 1); };
  VB.lipiStageChars = stageChars;

  function kind(ch) {
    var e = BY[ch];
    if (!e) return null;
    if (e.parts) return "conj";
    if (e.vowel) return "matra";
    return e.type;   // vowel, cons, mark
  }

  // decoys: confusion set first, then random characters of the same kind
  function decoys(ch, n, sameKind) {
    var e = BY[ch], out = [];
    (e.conf || "").split(" ").forEach(function (c) {
      if (c && c !== ch && BY[c] && out.indexOf(c) < 0 && (!sameKind || kind(c) === kind(ch))) out.push(c);
    });
    var pool = (kind(ch) === "conj" ? VB.CONJUNCTS : kind(ch) === "matra" ? VB.MATRAS
      : VB.AKSHARAS.filter(function (a) { return a.type === e.type; }));
    shuffle(pool).forEach(function (x) {
      if (out.length < n + 2 && x.ch !== ch && !x.rare && out.indexOf(x.ch) < 0) out.push(x.ch);
    });
    return out.slice(0, n);
  }

  // build an option list, dropping any decoy that reads the same as the answer
  function options(right, wrongs) {
    var seen = {}; seen[right] = 1;
    var opts = [{ text: right, correct: true }];
    wrongs.forEach(function (w) { if (w && !seen[w] && opts.length < 4) { seen[w] = 1; opts.push({ text: w, correct: false }); } });
    return shuffle(opts);
  }

  function carrier() {
    var open = VB.lipiOpen().filter(function (c) { return kind(c) === "cons"; });
    return pick(open.length ? open : ["क", "म", "न"]);
  }

  var FORM_NOTE = {
    ligature: "A new shape. It has to be learned by sight.",
    halfform: "The first letter loses its upright stroke and joins the second.",
    stacked: "The second letter sits under the first.",
    rakara: "The small stroke below is र. It is read after the letter.",
    repha: "The hook above is र. It is read before the letter it sits on."
  };
  var POS_NOTE = { before: "Written before the letter, read after it.", after: "Written after the letter.",
    below: "Written below the letter.", above: "Written above the letter.", around: "Written after the letter, with a stroke above." };
  var VARGA_NOTE = { ka: "कवर्गः: made at the back of the throat.", ca: "चवर्गः: made at the palate.",
    ta1: "टवर्गः: tongue curled back.", ta2: "तवर्गः: tongue at the teeth.", pa: "पवर्गः: made with the lips." };

  function hintFor(ch) {
    var e = BY[ch] || {};
    if (e.note) return e.note;
    if (e.form) return FORM_NOTE[e.form];
    if (e.pos) return POS_NOTE[e.pos];
    if (e.varga) return VARGA_NOTE[e.varga];
    return null;
  }

  function base(type, ch, instr) {
    return { type: type, ui: "mcq", ch: ch, skill: "lipi:" + ch, instr: instr, hint: { rule: hintFor(ch) }, prompt: {} };
  }

  // ======================================================
  // 1. Letter to sound
  // ======================================================
  VB.genLipiRead = function (ch) {
    var k = kind(ch); if (!k) return null;
    // vowel signs and marks cannot stand alone, so they are shown on a letter
    var shown = (k === "matra" || k === "mark") ? carrier() + ch : ch;
    var right = translit(shown);
    if (!right) return null;
    var wrongs = decoys(ch, 5, true).map(function (d) {
      if (k === "matra" || k === "mark") return translit(shown.slice(0, -1) + d);
      return translit(d);
    });
    var q = base("read", ch, "How is this read?");
    q.prompt.big = shown;
    q.options = options(right, wrongs);
    q.answerText = right; q.why = shown + " = " + right;
    return q.options.length >= 3 ? q : null;
  };

  // ======================================================
  // 2. Sound to letter (harder, comes later)
  // ======================================================
  VB.genLipiWrite = function (ch) {
    var k = kind(ch);
    if (k !== "cons" && k !== "vowel" && k !== "conj") return null;
    var q = base("write", ch, "Which letter makes this sound?");
    q.prompt.latin = translit(ch);
    q.options = options(ch, decoys(ch, 5, true));
    q.answerText = ch; q.why = ch + " = " + translit(ch);
    return q.options.length >= 3 ? q : null;
  };

  // ======================================================
  // 3. Matra attachment
  // ======================================================
  VB.genLipiMatra = function (ch) {
    if (kind(ch) !== "matra") return null;
    var c = carrier(), right = c + ch;
    var q = base("matra", ch, "Join the letter and the vowel sign.");
    q.prompt.big = c + "  +  ◌" + ch;
    var wrongs = decoys(ch, 5, true).map(function (d) { return c + d; });
    wrongs.push(c + BY[ch].vowel);   // writing the full vowel after the letter, a real beginner mistake
    q.options = options(right, wrongs);
    q.answerText = right; q.why = c + " + " + BY[ch].vowel + " = " + right + " (" + translit(right) + ")";
    return q.options.length >= 3 ? q : null;
  };

  // ======================================================
  // 4. Conjunct decoding
  // ======================================================
  VB.genLipiConj = function (ch) {
    var e = BY[ch]; if (!e || !e.parts) return null;
    var show = function (p) { return p[0] + " + " + p[1]; };
    var right = show(e.parts);
    var wrongs = [show([e.parts[1], e.parts[0]])];   // the reading-order trap, worst for रेफ
    decoys(ch, 4, true).forEach(function (d) { if (BY[d] && BY[d].parts) wrongs.push(show(BY[d].parts)); });
    (BY[e.parts[1]].conf || "").split(" ").forEach(function (c) { if (BY[c] && kind(c) === "cons") wrongs.push(show([e.parts[0], c])); });
    var q = base("conj", ch, "Which two letters make this?");
    q.prompt.big = ch;
    q.options = options(right, [wrongs[0]].concat(shuffle(wrongs.slice(1))));   // the reversed pair always stays in
    q.answerText = right; q.why = ch + " = " + right + " (" + e.tr + ")";
    return q.options.length >= 3 ? q : null;
  };

  // ======================================================
  // words the learner can already read
  // ======================================================
  // Split a word into the characters it needs: consonants, vowels, matras,
  // marks, and any conjunct cluster that lipi.js names.
  function needs(word) {
    var out = [];
    VB.aksharas(word).forEach(function (a) {
      var cluster = a.replace(/[ािीुूृॄेैोौंः]+$/, "");
      if (cluster.indexOf(VIRAMA) >= 0 && cluster.slice(-1) !== VIRAMA) {
        if (!BY[cluster]) out.push("*" + cluster);   // a cluster the tables do not teach
        else out.push(cluster);
      }
      for (var i = 0; i < a.length; i++) { var c = a.charAt(i); if (BY[c] && c !== VIRAMA) out.push(c); }
      if (a.slice(-1) === VIRAMA) out.push(VIRAMA);
    });
    return out;
  }
  VB.lipiNeeds = needs;

  // Words the learner can read with the characters open so far. Early on,
  // few citation forms qualify (they end in ः or म्), so the bare stem is
  // offered too: राम, नदी, फल are real forms and good reading practice.
  function readableWords(open) {
    var o = {}; open.forEach(function (c) { o[c] = 1; });
    var out = [];
    VB.WORDS.forEach(function (w) {
      [w.P["pra.eka"], w.stem].forEach(function (form, i) {
        if (i === 1 && form === w.P["pra.eka"]) return;
        if (needs(form).every(function (c) { return o[c]; })) out.push({ w: w, form: form });
      });
    });
    return out;
  }

  // a plausible misreading: swap one character for a confusable one
  function misread(word, target) {
    var outs = [];
    for (var i = 0; i < word.length; i++) {
      var c = word.charAt(i), e = BY[c];
      if (!e || !e.conf || e.type === "mark") continue;   // swapping ् or ं gives nonsense, not a misreading
      e.conf.split(" ").forEach(function (d) {
        if (!BY[d] || kind(d) !== kind(c) || BY[d].parts) return;
        var alt = word.slice(0, i) + d + word.slice(i + 1);
        var weight = c === target ? 3 : 1;
        for (var k = 0; k < weight; k++) outs.push(alt);
      });
    }
    return shuffle(outs);
  }

  // ======================================================
  // 5. Word reading
  // ======================================================
  VB.genLipiWord = function (ch) {
    var open = VB.lipiOpen(), words = readableWords(open);
    var withCh = words.filter(function (x) { return x.form.indexOf(ch) >= 0; });
    var list = withCh.length ? withCh : words;
    if (!list.length) return null;
    var hit = pick(list), w = hit.w, word = hit.form, right = translit(word);
    var wrongs = misread(word, ch).map(translit).filter(function (t) { return t !== right; });
    var q = base("word", withCh.length ? ch : (needs(word).filter(function (c) { return c.charAt(0) !== "*"; })[0] || ch), "How is this word read?");
    q.skill = "lipi:" + q.ch;
    q.prompt.big = word;
    q.options = options(right, wrongs);
    q.answerText = right; q.why = word + " = " + right;
    q.hint = { rule: "Read one syllable at a time, left to right. Every consonant carries a, unless a vowel sign or ् follows it." };
    q.meaning = w.en1;
    return q.options.length >= 3 ? q : null;
  };

  // ======================================================
  // 6. Find the letter
  // ======================================================
  VB.genLipiFind = function (ch) {
    var open = VB.lipiOpen(), words = readableWords(open);
    var k = kind(ch);
    if (k !== "cons" && k !== "vowel") return null;
    var hits = [];
    words.forEach(function (x) {
      var parts = VB.aksharas(x.form);
      if (parts.length < 2) return;
      parts.forEach(function (a, i) { if (a.charAt(0) === ch && a.indexOf(VIRAMA) !== 1) hits.push({ w: x.w, parts: parts, i: i }); });
    });
    if (!hits.length) return null;
    var hit = pick(hits);
    var q = base("find", ch, "Which letter begins the marked syllable?");
    q.prompt.parts = hit.parts; q.prompt.mark = hit.i;
    q.options = options(ch, decoys(ch, 5, true));
    q.answerText = ch; q.why = hit.parts[hit.i] + " begins with " + ch + " (" + translit(ch) + ")";
    return q.options.length >= 3 ? q : null;
  };

  // ======================================================
  // choosing an exercise for a character
  // ======================================================
  VB.LIPI_GEN = { read: VB.genLipiRead, write: VB.genLipiWrite, matra: VB.genLipiMatra,
                  conj: VB.genLipiConj, word: VB.genLipiWord, find: VB.genLipiFind };

  // New characters are recognised first; producing them and finding them in
  // words comes once they are familiar.
  VB.lipiTypesFor = function (ch, level) {
    var k = kind(ch);
    if (k === "matra") return level <= 1 ? { matra: 3, read: 2 } : { matra: 2, read: 1, word: 2 };
    if (k === "conj") return level <= 1 ? { conj: 3, read: 2 } : { conj: 2, read: 1, write: 1, word: 2 };
    if (k === "mark") return { read: 3, word: 1 };
    return level <= 1 ? { read: 4, find: 1 } : level === 2 ? { read: 2, write: 2, find: 2, word: 1 } : { write: 3, find: 2, word: 3, read: 1 };
  };

  VB.makeLipiQuestion = function (ch, level, avoid) {
    var W = VB.lipiTypesFor(ch, level);
    var names = Object.keys(W).filter(function (t) { return t !== avoid; });
    if (!names.length) names = Object.keys(W);
    for (var tries = 0; tries < 6 && names.length; tries++) {
      var total = names.reduce(function (a, t) { return a + W[t]; }, 0), r = Math.random() * total, t = names[0];
      for (var i = 0; i < names.length; i++) { r -= W[names[i]]; if (r <= 0) { t = names[i]; break; } }
      var q = VB.LIPI_GEN[t](ch);
      if (q) { q.kindName = t; return q; }
      names = names.filter(function (x) { return x !== t; });
    }
    var q2 = VB.genLipiRead(ch);
    if (q2) q2.kindName = "read";
    return q2;
  };
  VB.lipiKind = kind;
})(VB);
