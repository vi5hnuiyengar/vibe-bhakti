/*
  Self-check for the word list, sentence frames and question generators.
  Run it after you add or change words or sentences:

      node tools/check.js

  It needs Node.js (free, nodejs.org). Nothing is installed or changed.
*/
var path = require("path"), root = path.join(__dirname, "..", "js");
global.window = {}; var mem = {};
global.localStorage = { getItem: function (k) { return mem[k] || null; }, setItem: function (k, v) { mem[k] = v; } };
["grammar", "words", "frames", "store", "questions"].forEach(function (f) { require(path.join(root, f + ".js")); });
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
  var any = VB.WORDS.some(function (w) { return t.only ? t.only.indexOf(w.stem) >= 0 : t.ex.indexOf(w.stem) < 0 && t.cats.some(function (c) { return w.cats[c]; }); });
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
if (problems.length) { console.log("\n" + problems.length + " problem(s):\n- " + problems.slice(0, 40).join("\n- ")); process.exit(1); }
console.log("All checks passed.");
