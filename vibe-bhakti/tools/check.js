/*
  Self-check for the word list, sentence frames and question generators.
  Run it after you add or change words or sentences:

      node tools/check.js

  It needs Node.js (free, nodejs.org). Nothing is installed or changed.
*/
var path = require("path"), root = path.join(__dirname, "..", "js");
global.window = {}; var mem = {};
global.localStorage = { getItem: function (k) { return mem[k] || null; }, setItem: function (k, v) { mem[k] = v; } };
var fs = require("fs");
["grammar", "words", "frames", "pronouns", "pronoun-frames", "lipi", "stories-l1", "store", "questions", "lipi-questions"]
  .forEach(function (f) { var file = path.join(root, f + ".js"); if (fs.existsSync(file)) require(file); });
var VB = window.VB, problems = [];
function bad(msg) { problems.push(msg); }

// 1. Known forms, including the ण cases that are easy to get wrong
var KNOWN = {
  "राम a": "रामः रामाः रामम् रामान् रामेण रामैः रामाय रामेभ्यः रामात् रामेभ्यः रामस्य रामाणाम् रामे रामेषु राम रामाः",
  "कृष्ण a": "कृष्णः कृष्णाः कृष्णम् कृष्णान् कृष्णेन कृष्णैः कृष्णाय कृष्णेभ्यः कृष्णात् कृष्णेभ्यः कृष्णस्य कृष्णानाम् कृष्णे कृष्णेषु कृष्ण कृष्णाः",
  "रमा aa": "रमा रमाः रमाम् रमाः रमया रमाभिः रमायै रमाभ्यः रमायाः रमाभ्यः रमायाः रमाणाम् रमायाम् रमासु रमे रमाः",
  "नदी ii": "नदी नद्यः नदीम् नदीः नद्या नदीभिः नद्यै नदीभ्यः नद्याः नदीभ्यः नद्याः नदीनाम् नद्याम् नदीषु नदि नद्यः",
  "फल n": "फलम् फलानि फलम् फलानि फलेन फलैः फलाय फलेभ्यः फलात् फलेभ्यः फलस्य फलानाम् फले फलेषु फल फलानि",
  "पुष्प n": "पुष्पम् पुष्पाणि पुष्पम् पुष्पाणि पुष्पेण पुष्पैः पुष्पाय पुष्पेभ्यः पुष्पात् पुष्पेभ्यः पुष्पस्य पुष्पाणाम् पुष्पे पुष्पेषु पुष्प पुष्पाणि"
};
Object.keys(KNOWN).forEach(function (k) {
  var p = k.split(" "), P = VB.decline(p[0], p[1]), got = VB.CELLS.map(function (c) { return P[c]; }).join(" ");
  if (got !== KNOWN[k]) bad("Declension of " + p[0] + " is wrong:\n   got  " + got + "\n   want " + KNOWN[k]);
});
[["अग्रज", "a", "tri.eka", "अग्रजेन"], ["भाषण", "n", "tri.eka", "भाषणेन"], ["कुमारी", "ii", "sha.bahu", "कुमारीणाम्"],
 ["परीक्षा", "aa", "sha.bahu", "परीक्षाणाम्"], ["शृगाल", "a", "tri.eka", "शृगालेन"], ["आरक्षक", "a", "tri.eka", "आरक्षकेण"]]
  .forEach(function (t) { var f = VB.decline(t[0], t[1])[t[2]]; if (f !== t[3]) bad("ण rule: " + t[0] + " " + t[2] + " gave " + f + ", expected " + t[3]); });

// 2. Word list and frames fit together
var stems = {};
VB.WORDS.forEach(function (w) {
  if (stems[w.stem]) bad("Word listed twice: " + w.stem); stems[w.stem] = 1;
  if (w.cls === "aa" && !w.stem.endsWith("ा")) bad("आकारान्त word does not end in ा: " + w.stem);
  if (w.cls === "ii" && !w.stem.endsWith("ी")) bad("ईकारान्त word does not end in ी: " + w.stem);
  if ((w.cls === "a" || w.cls === "n") && /[ािीुूृेैोौ्ंः]$/.test(w.stem)) bad("अकारान्त word should end in a plain consonant: " + w.stem);
  if (!Object.keys(w.cats).length) bad("Word has no categories: " + w.stem);
});
VB.FRAMES.forEach(function (t) {
  (t.only || []).concat(t.ex).forEach(function (s) { if (!VB.BY_STEM[s]) bad("Frame " + t.id + " names a word not in the list: " + s); });
  var any = VB.WORDS.some(function (w) { return t.only ? t.only.indexOf(w.stem) >= 0 : t.ex.indexOf(w.stem) < 0 && (!t.cats.length || t.cats.some(function (c) { return w.cats[c]; })); });
  if (!any) bad("Frame " + t.id + " has no word that fits its categories");
  if (!VB.RULES[t.kind]) bad("Frame " + t.id + " has an unknown kind: " + t.kind);
});

// 3. Generate thousands of questions and check each one
var ctxAll = { cells: VB.CELLS.slice(), level: 1 }, made = 0;
var gens = {
  identify: function (c, x, k) { return VB.genIdentify(c, x, k); }, form: function (c, x, k) { return VB.genForm(c, x, k, false); },
  tiles: function (c, x, k) { return VB.genForm(c, x, k, true); }, analogy: function (c, x, k) { return VB.genAnalogy(c, x, k); },
  sentence: function (c, x, k) { return VB.genSentence(c, x, k, false); }, stiles: function (c, x, k) { return VB.genSentence(c, x, k, true); },
  kim: function (c, x, k) { return VB.genKim(c, x, k); }, error: function (c, x, k) { return VB.genError(c, x, k); },
  flip: function (c, x, k) { return VB.genFlip(c, x, k); }, odd: function (c, x, k) { return VB.genOdd(c, x, k); },
  lemma: function (c, x, k) { return VB.genLemma(c, x, k); }, tf: function (c, x, k) { return VB.genTF(c, x, k); }
};
for (var rep = 0; rep < 6; rep++) for (var lvl = 1; lvl <= 3; lvl++) {
  var ctx = { cells: ctxAll.cells, level: lvl };
  VB.CLASSES.forEach(function (cls) { VB.CELLS.forEach(function (cell) { Object.keys(gens).forEach(function (g) {
    var q = gens[g](cls, cell, ctx); if (!q) return; made++;
    var where = g + " " + cls + ":" + cell + " (" + (q.w ? q.w.stem : "") + ")";
    if (/\{[A-Za-z]/.test([q.filled, q.meaning, q.prompt && q.prompt.sentence].join(" "))) bad("Unfilled placeholder in " + where + ": " + q.filled);
    if (q.ui === "mcq") {
      var texts = q.options.map(function (o) { return o.text; });
      if (new Set(texts).size !== texts.length) bad("Duplicate options in " + where);
      if (q.options.filter(function (o) { return o.correct; }).length !== 1) bad("Not exactly one right option in " + where);
    }
    if (q.ui === "tiles") {
      var pool = q.tiles.slice();
      VB.aksharas(q.answer).forEach(function (a) { var i = pool.indexOf(a); if (i < 0) bad("Tile missing in " + where); else pool.splice(i, 1); });
    }
    if (q.ui === "tokens" && !q.allCorrect && q.tokens.filter(function (t) { return t.wrong; }).length !== 1) bad("Mistake question broken in " + where);
  }); }); });
}
["small", "rows", "column", "large", "full"].forEach(function (size) { VB.CLASSES.forEach(function (cls) {
  for (var i = 0; i < 10; i++) {
    var t = VB.genTable(cls, ctxAll, size); if (!t) { bad("Table could not be made: " + cls + " " + size); continue; }
    var pool = t.chips.slice();
    t.blanks.forEach(function (c) { var k = pool.indexOf(t.w.P[c]); if (k < 0) bad("Table chip missing for " + t.w.stem + " " + c); else pool.splice(k, 1); });
  }
}); });

console.log("Words: " + VB.WORDS.length + "   Frames: " + VB.FRAMES.length + "   Questions checked: " + made);

// 4. Store: a v1 blob must survive the migration to v2 with every field intact
(function () {
  var v1 = {
    skills: { "a:sap.eka": { n: 7, c: 5, h: 41.2, t: 1758000000000, r: [1, 0, 1, 1] } },
    words: { "राम": 1758000000000 },
    days: { "2026-09-19": { s: 1, q: 14, c: 12 } },
    unlocked: 3, introduced: 2,
    recent: [1, 1, 0, 1],
    total: { q: 410, c: 352 },
    best: { speed: 21 },
    settings: { scale: 1.15, all: false }
  };
  var out = VB.__graft(JSON.parse(JSON.stringify(v1)));
  function same(a, b) { return JSON.stringify(a) === JSON.stringify(b); }
  Object.keys(v1).forEach(function (k) {
    if (k === "best" || k === "settings") return;   // these gain new fields
    if (!same(out[k], v1[k])) bad("Store migration lost or changed " + k);
  });
  if (out.best.speed !== 21) bad("Store migration lost the speed best");
  if (out.settings.scale !== 1.15) bad("Store migration lost the text size");
  if (out.settings.tab !== "abhyasa") bad("Store migration did not add settings.tab");
  if (!out.lipi || !out.lipi.skills || !out.read || !out.pron) bad("Store migration did not add the v2 sections");
  if (out.v !== 2) bad("Store migration did not stamp the schema version");
  // a partial or foreign blob must not throw and must not be accepted
  VB.__graft({});
  VB.__graft({ skills: null, total: 5 });
  if (VB.Store.looksValid({ hello: 1 })) bad("looksValid accepted a foreign blob");
  if (!VB.Store.looksValid(out)) bad("looksValid rejected a valid state");
  console.log("Store migration: v1 blob upgraded with every field intact.");
})();
// 5. Script tables: every confusion entry is a real character, nothing is listed twice
if (VB.AKSHARAS) (function () {
  var all = VB.AKSHARAS.concat(VB.MATRAS, VB.CONJUNCTS), seen = {};
  all.forEach(function (e) {
    if (seen[e.ch]) bad("Script character listed twice: " + e.ch); seen[e.ch] = 1;
    if (e.tr === undefined) bad("Script character has no transliteration: " + e.ch);
    (e.conf || "").split(" ").forEach(function (c) { if (c && !VB.BY_CHAR[c]) bad("Confusion set of " + e.ch + " names an unknown character: " + c); });
  });
  var akshara = {}; VB.AKSHARAS.forEach(function (a) { akshara[a.ch] = 1; });
  VB.CONJUNCTS.forEach(function (c) {
    (c.parts || []).forEach(function (p) { if (!akshara[p]) bad("Conjunct " + c.ch + " has a part that is not a letter: " + p); });
    if (c.parts && c.parts.join("्") !== c.ch) bad("Conjunct " + c.ch + " is not its parts joined by virama");
    if (VB.translit(c.ch) !== c.tr) bad("Conjunct " + c.ch + " reads as " + VB.translit(c.ch) + " but is listed as " + c.tr);
  });
  VB.AKSHARAS.forEach(function (a) { if (a.type !== "mark" && VB.translit(a.ch) !== a.tr) bad("Letter " + a.ch + " reads as " + VB.translit(a.ch) + ", listed as " + a.tr); });
  VB.LIPI_STAGES.forEach(function (st) {
    if (st.add !== "*") st.add.split(" ").forEach(function (c) { if (c && !VB.BY_CHAR[c]) bad("Script stage " + st.n + " names an unknown character: " + c); });
  });
  console.log("Script tables: " + VB.AKSHARAS.length + " letters, " + VB.MATRAS.length + " vowel signs, " + VB.CONJUNCTS.length + " conjuncts, " + VB.LIPI_STAGES.length + " stages.");
})();

// 6. Script questions: generate thousands at every stage and check each one
if (VB.makeLipiQuestion) (function () {
  var made = 0, st = VB.Store.state.lipi;
  for (var stage = 1; stage <= VB.LIPI_STAGES.length; stage++) {
    st.unlocked = stage;
    VB.lipiOpen().forEach(function (ch) {
      Object.keys(VB.LIPI_GEN).forEach(function (t) {
        for (var k = 0; k < 3; k++) {
          var q = VB.LIPI_GEN[t](ch); if (!q) continue; made++;
          var texts = q.options.map(function (o) { return o.text; });
          var where = "script " + t + " " + ch + " at stage " + stage;
          if (new Set(texts).size !== texts.length) bad("Duplicate options in " + where + ": " + texts.join(" "));
          if (q.options.filter(function (o) { return o.correct; }).length !== 1) bad("Not exactly one right option in " + where);
          if (q.options.length < 3) bad("Fewer than three options in " + where);
          if (q.options.filter(function (o) { return o.correct; })[0].text !== q.answerText) bad("Answer text does not match the right option in " + where);
          if (q.skill.indexOf("lipi:") !== 0 || !VB.BY_CHAR[q.skill.slice(5)]) bad("Bad skill key in " + where + ": " + q.skill);
        }
      });
    });
  }
  st.unlocked = 1;
  console.log("Script questions checked: " + made);
})();

// 7. Story corpus: regenerate every marked word and assert it is the token as written.
// Punctuation is stripped. The one normalisation is word-final म् written as
// anusvara before a consonant, which is how running Sanskrit is spelled and how
// the app already displays sentences (sbText). No other sandhi is handled.
if (VB.STORIES_L1) (function () {
  var PUNCT = /[\u0964\u0965,?!"'\u201c\u201d]/g, marks = 0, cov = {}, ids = {};
  var anu = function (t) { return t.replace(/\u092E\u094D$/, "\u0902"); };
  VB.STORIES_L1.stories.forEach(function (st) {
    if (ids[st.id]) bad("Story id used twice: " + st.id); ids[st.id] = 1;
    if (["verbatim", "adapted", "retelling"].indexOf(st.provenance) < 0) bad("Story " + st.id + " has an unknown provenance");
    if (st.provenance !== "retelling" && !st.source) bad("Story " + st.id + " needs a source citation");
    if (!(st.difficulty >= 1 && st.difficulty <= 3)) bad("Story " + st.id + " has a difficulty outside 1 to 3");
    if (!st.lines || !st.lines.length) bad("Story " + st.id + " has no lines");
    (st.lines || []).forEach(function (line, li) {
      var toks = line.sa.split(" ").map(function (t) { return t.replace(PUNCT, "").trim(); });
      if (!line.en) bad("Story " + st.id + " line " + li + " has no English gloss");
      (line.marks || []).forEach(function (m) {
        var w = VB.BY_STEM[m.stem];
        if (!w) { bad("Story " + st.id + ": marked stem not in the word list: " + m.stem); return; }
        if (VB.CLASSES.indexOf(m.cls) < 0) { bad("Story " + st.id + ": unknown class " + m.cls); return; }
        if (w.cls !== m.cls) { bad("Story " + st.id + ": wrong class for " + m.stem); return; }
        if (VB.CELLS.indexOf(m.cell) < 0) { bad("Story " + st.id + ": bad cell " + m.cell); return; }
        if (!(m.tok >= 0 && m.tok < toks.length)) { bad("Story " + st.id + " line " + li + ": tok out of range for " + m.stem); return; }
        var form = VB.decline(m.stem, m.cls)[m.cell];
        if (anu(toks[m.tok]) !== anu(form))
          bad("Story " + st.id + " line " + li + ": " + m.stem + " " + m.cell + " should be " + form + " but the line has " + toks[m.tok]);
        marks++; cov[m.cls + ":" + m.cell] = (cov[m.cls + ":" + m.cell] || 0) + 1;
      });
    });
  });
  var none = [], thin = [];
  VB.CLASSES.forEach(function (c) { VB.CELLS.forEach(function (x) {
    var n = cov[c + ":" + x] || 0;
    if (!n) none.push(c + ":" + x); else if (n < 3) thin.push(c + ":" + x + "=" + n);
  }); });
  console.log("Stories: " + VB.STORIES_L1.stories.length + "   Marks verified: " + marks);
  if (none.length) console.log("  (warning) cells with no marks yet: " + none.join(" "));
  if (thin.length) console.log("  (warning) cells with fewer than 3 marks: " + thin.join(" "));
})();

if (problems.length) { console.log("\n" + problems.length + " problem(s):\n- " + problems.slice(0, 40).join("\n- ")); process.exit(1); }
console.log("All checks passed.");
