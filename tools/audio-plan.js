/*
  tools/audio-plan.js  -  writes audio/takes.csv, the list of every recording to make.

      node tools/audio-plan.js

  Run it again whenever you change audio/words-to-record.txt. The forms come
  from the site's own grammar engine, so what you read aloud is exactly what
  the app teaches.

  A "take" is one recording: a short list of forms read in order with a clear
  pause between them. tools/audio.py later cuts each take into one clip per form.

  Parts:
    A  letters, one varga per take
    B  full tables for the words in words-to-record.txt: one take per word
       per vacana, all eight in table order (प्रथमा ... सप्तमी, सम्बोधनम्)
    C  the प्रथमा एकवचनम् of every other word, eight words per take
    D  द्विवचनम् tables for the Part B words. Record any time; the app uses
       them once dvivacana is switched on.
*/
var fs = require("fs"), path = require("path");
var ROOT = path.join(__dirname, "..");
global.window = {}; global.localStorage = { getItem: function () { return null; }, setItem: function () {} };
["grammar", "words"].forEach(function (f) { require(path.join(ROOT, "js", f + ".js")); });
var VB = window.VB;
VB.WORDS = []; VB.BY_STEM = {};
VB.CLASSES.forEach(function (cls) {
  VB.RAW_WORDS[cls].trim().split("\n").forEach(function (line) {
    line = line.trim(); if (!line) return;
    var p = line.split("|"), flags = (p[4] || "").split(" ");
    var w = { stem: p[0].trim(), cls: cls, en1: p[1], en2: p[2] || p[1],
              solo: flags.indexOf("proper") >= 0 || flags.indexOf("mass") >= 0 || flags.indexOf("sg") >= 0 };
    w.P = VB.decline(w.stem, cls);
    VB.WORDS.push(w); VB.BY_STEM[w.stem] = w;
  });
});

// ---------- file-name slugs (same scheme as tools/images.py) ----------
var VOW = { "अ": "a", "आ": "aa", "इ": "i", "ई": "ii", "उ": "u", "ऊ": "uu", "ऋ": "ri", "ए": "e", "ऐ": "ai", "ओ": "o", "औ": "au" };
var MAT = { "ा": "aa", "ि": "i", "ी": "ii", "ु": "u", "ू": "uu", "ृ": "ri", "े": "e", "ै": "ai", "ो": "o", "ौ": "au" };
var CON = { "क": "k", "ख": "kh", "ग": "g", "घ": "gh", "ङ": "ng", "च": "c", "छ": "ch", "ज": "j", "झ": "jh", "ञ": "ny",
  "ट": "t", "ठ": "th", "ड": "d", "ढ": "dh", "ण": "n", "त": "t", "थ": "th", "द": "d", "ध": "dh", "न": "n",
  "प": "p", "फ": "ph", "ब": "b", "भ": "bh", "म": "m", "य": "y", "र": "r", "ल": "l", "व": "v", "श": "sh", "ष": "sh", "स": "s", "ह": "h" };
function slug(w) {
  var out = "";
  for (var i = 0; i < w.length; i++) {
    var ch = w[i], nx = w[i + 1] || "";
    if (CON[ch]) { out += CON[ch]; if (nx === "्") i++; else if (MAT[nx]) { out += MAT[nx]; i++; } else out += "a"; }
    else if (VOW[ch]) out += VOW[ch];
    else if (ch === "ं") out += "m";
    else if (ch === "ः") out += "h";
  }
  return out;
}

/*
  द्विवचनम् forms for the reading script. The engine does not make these yet;
  when dvivacana is built into grammar.js, tools/check.js compares these with
  the engine and flags any difference before a single clip is used.
*/
function dual(stem, cls) {
  var b = stem, f = {};
  if (cls === "a") { f.a = b + "ौ"; f.b = b + "ाभ्याम्"; f.c = b + "योः"; }
  else if (cls === "n") { f.a = b + "े"; f.b = b + "ाभ्याम्"; f.c = b + "योः"; }
  else if (cls === "aa") { var r = stem.slice(0, -1); f.a = r + "े"; f.b = stem + "भ्याम्"; f.c = r + "योः"; }
  else if (cls === "ii") { var q = stem.slice(0, -1); f.a = q + "्यौ"; f.b = stem + "भ्याम्"; f.c = q + "्योः"; }
  // प्रथमा द्वितीया | तृतीया चतुर्थी पञ्चमी | षष्ठी सप्तमी | सम्बोधनम्
  return [f.a, f.a, f.b, f.b, f.b, f.c, f.c, f.a];
}

var LINGA = { a: "पुंलिङ्गम्", aa: "स्त्रीलिङ्गम्", ii: "स्त्रीलिङ्गम्", n: "नपुंसकलिङ्गम्" };
var LINGA_ORDER = { a: 0, aa: 1, ii: 1, n: 2 };
var VAC = { eka: "एकवचनम्", bahu: "बहुवचनम्", dva: "द्विवचनम्" };
var ORDER = ["pra", "dvi", "tri", "cat", "pan", "sha", "sap", "sam"];

// ---------- the words that get full tables ----------
var listed = fs.readFileSync(path.join(ROOT, "audio", "words-to-record.txt"), "utf8").split("\n")
  .map(function (l) { return l.replace(/#.*/, "").trim(); }).filter(Boolean);
var unknown = listed.filter(function (s) { return !VB.BY_STEM[s]; });
if (unknown.length) { console.log("Not in js/words.js, skipped: " + unknown.join(" ")); }
var full = listed.filter(function (s) { return VB.BY_STEM[s]; }).map(function (s) { return VB.BY_STEM[s]; });
var fullSet = {}; full.forEach(function (w) { fullSet[w.stem] = 1; });

var rows = [];
function take(id, alt, part, group, word, en, forms, notes) {
  rows.push({ id: id, alt: alt, part: part, group: group, word: word, en: en, forms: forms, notes: notes || "" });
}
function pad(n, k) { return String(n).padStart(k, "0"); }

// Part A: letters
var LETTERS = [
  ["vowels", "स्वराः", "अ आ इ ई उ ऊ ऋ ए ऐ ओ औ"],
  ["ka-varga", "कवर्गः", "क ख ग घ ङ"], ["ca-varga", "चवर्गः", "च छ ज झ ञ"],
  ["tta-varga", "टवर्गः", "ट ठ ड ढ ण"], ["ta-varga", "तवर्गः", "त थ द ध न"],
  ["pa-varga", "पवर्गः", "प फ ब भ म"], ["antastha", "अन्तस्थाः", "य र ल व"], ["ushma", "ऊष्माणः", "श ष स ह"]
];
LETTERS.forEach(function (l, i) {
  take("A" + pad(i + 1, 2), "letters-" + l[0], "A letters", l[1], "", "", l[2].split(" "),
       i === 0 ? "vowels alone" : "each consonant with its a: ka, kha, ga ...");
});

// Part B: full tables, grouped by vacana, then liṅga
var n = 0;
["eka", "bahu"].forEach(function (vac) {
  full.slice().sort(function (x, y) { return LINGA_ORDER[x.cls] - LINGA_ORDER[y.cls]; }).forEach(function (w) {
    if (vac !== "eka" && w.solo) return;
    n++;
    take("B" + pad(n, 3), slug(w.stem) + "-" + vac, "B tables", VAC[vac] + ", " + LINGA[w.cls], w.stem,
         vac === "eka" ? w.en1 : w.en2, ORDER.map(function (v) { return w.P[v + "." + vac]; }), "");
  });
});

// Part C: citation forms of every other word, eight to a take, by class
var rest = VB.WORDS.filter(function (w) { return !fullSet[w.stem]; })
  .sort(function (x, y) { return LINGA_ORDER[x.cls] - LINGA_ORDER[y.cls]; });
for (var i = 0, c = 0; i < rest.length; i += 8) {
  var chunk = rest.slice(i, i + 8); c++;
  take("C" + pad(c, 2), "citation-" + pad(c, 2), "C one form each", "प्रथमा एकवचनम्", "", "",
       chunk.map(function (w) { return w.P["pra.eka"]; }), chunk.map(function (w) { return w.stem; }).join(" "));
}

// Part D: dvivacana tables for the Part B words
var d = 0;
full.slice().sort(function (x, y) { return LINGA_ORDER[x.cls] - LINGA_ORDER[y.cls]; }).forEach(function (w) {
  if (w.solo) return;
  d++;
  take("D" + pad(d, 3), slug(w.stem) + "-dva", "D dual tables", VAC.dva + ", " + LINGA[w.cls], w.stem,
       "two " + w.en2, dual(w.stem, w.cls), "used once dvivacana is switched on");
});

// ---------- write the CSV. tools/audio.py fills the status column from the clips that exist ----------
var file = path.join(ROOT, "audio", "takes.csv");
function q(s) { s = String(s); return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; }
var out = ["id,or name it,part,group,word,meaning,how many,read these in order,notes,status"];
rows.forEach(function (r) {
  out.push([r.id, r.alt, r.part, r.group, r.word, r.en, r.forms.length, r.forms.join("   "), r.notes, ""].map(q).join(","));
});
fs.writeFileSync(file, "\uFEFF" + out.join("\r\n") + "\r\n");   // BOM so Excel and Numbers show Devanagari

var parts = {}; rows.forEach(function (r) { parts[r.part] = (parts[r.part] || 0) + 1; });
var forms = rows.reduce(function (a, r) { return a + r.forms.length; }, 0);
console.log("audio/takes.csv: " + rows.length + " takes, " + forms + " forms to read");
Object.keys(parts).forEach(function (p) { console.log("  " + p + ": " + parts[p] + " takes"); });
