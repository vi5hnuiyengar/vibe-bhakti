/*
  Grammar engine. Works directly on Devanagari strings.
  Classes: a = अकारान्त पुं, aa = आकारान्त स्त्री, ii = ईकारान्त स्त्री, n = अकारान्त नपुं
*/
var VB = (typeof window !== "undefined") ? (window.VB = window.VB || {}) : {};

(function (VB) {
  var VIBS = ["pra", "dvi", "tri", "cat", "pan", "sha", "sap", "sam"];
  var VACS = ["eka", "bahu"];
  var CLASSES = ["a", "aa", "ii", "n"];

  VB.VIBS = VIBS; VB.VACS = VACS; VB.CLASSES = CLASSES;
  VB.CELLS = [];
  VIBS.forEach(function (v) { VACS.forEach(function (n) { VB.CELLS.push(v + "." + n); }); });

  VB.VIB_SA = { pra: "प्रथमा", dvi: "द्वितीया", tri: "तृतीया", cat: "चतुर्थी",
                pan: "पञ्चमी", sha: "षष्ठी", sap: "सप्तमी", sam: "सम्बोधनम्" };
  VB.VIB_SHORT = { pra: "प्र", dvi: "द्वि", tri: "तृ", cat: "च", pan: "प", sha: "ष", sap: "स", sam: "सं" };
  VB.VAC_SA = { eka: "एकवचनम्", bahu: "बहुवचनम्" };
  VB.CLASS_SA = { a: "अकारान्तः पुंलिङ्गः", aa: "आकारान्तः स्त्रीलिङ्गः",
                  ii: "ईकारान्तः स्त्रीलिङ्गः", n: "अकारान्तः नपुंसकलिङ्गः" };
  VB.CLASS_SHORT = { a: "पुं.", aa: "स्त्री.", ii: "स्त्री.", n: "नपुं." };
  VB.GENDER = { a: "m", aa: "f", ii: "f", n: "n" };
  VB.MODEL = { a: "राम", aa: "रमा", ii: "नदी", n: "फल" };

  VB.cellLabel = function (cell) {
    var p = cell.split(".");
    return VB.VIB_SA[p[0]] + " " + VB.VAC_SA[p[1]];
  };

  // ---------- ण rule ----------
  var ALLOWED = "अआइईउऊऋॠऌएऐओऔािीुूृॄेैोौ्ंहयवरकखगघङपफबभम";
  var TRIGGER = "रषऋॠृॄ";

  // w = full word, i = index of the न to test
  function natvaAt(w, i) {
    if (w.charAt(i) !== "न") return w;
    if (w.charAt(i + 1) === "्" && i + 2 >= w.length) return w;   // word-final न्
    for (var j = i - 1; j >= 0; j--) {
      var ch = w.charAt(j);
      if (TRIGGER.indexOf(ch) >= 0) return w.slice(0, i) + "ण" + w.slice(i + 1);
      if (ALLOWED.indexOf(ch) < 0) return w;
    }
    return w;
  }
  // join base + suffix, testing the first न of the suffix
  function nj(base, suffix) {
    var w = base + suffix, k = suffix.indexOf("न");
    return k >= 0 ? natvaAt(w, base.length + k) : w;
  }
  VB.natvaJoin = nj;

  VB.decline = function (stem, cls) {
    var P = {}, b;
    if (cls === "a" || cls === "n") {
      b = stem;
      P["tri.eka"] = nj(b, "ेन");   P["tri.bahu"] = b + "ैः";
      P["cat.eka"] = b + "ाय";      P["cat.bahu"] = b + "ेभ्यः";
      P["pan.eka"] = b + "ात्";     P["pan.bahu"] = b + "ेभ्यः";
      P["sha.eka"] = b + "स्य";     P["sha.bahu"] = nj(b, "ानाम्");
      P["sap.eka"] = b + "े";       P["sap.bahu"] = b + "ेषु";
      P["sam.eka"] = b;
      if (cls === "a") {
        P["pra.eka"] = b + "ः";  P["pra.bahu"] = b + "ाः";
        P["dvi.eka"] = b + "म्"; P["dvi.bahu"] = b + "ान्";
        P["sam.bahu"] = b + "ाः";
      } else {
        P["pra.eka"] = b + "म्"; P["pra.bahu"] = nj(b, "ानि");
        P["dvi.eka"] = b + "म्"; P["dvi.bahu"] = nj(b, "ानि");
        P["sam.bahu"] = nj(b, "ानि");
      }
    } else if (cls === "aa") {
      b = stem.slice(0, -1);
      P["pra.eka"] = stem;          P["pra.bahu"] = stem + "ः";
      P["dvi.eka"] = stem + "म्";   P["dvi.bahu"] = stem + "ः";
      P["tri.eka"] = b + "या";      P["tri.bahu"] = stem + "भिः";
      P["cat.eka"] = stem + "यै";   P["cat.bahu"] = stem + "भ्यः";
      P["pan.eka"] = stem + "याः";  P["pan.bahu"] = stem + "भ्यः";
      P["sha.eka"] = stem + "याः";  P["sha.bahu"] = nj(stem, "नाम्");
      P["sap.eka"] = stem + "याम्"; P["sap.bahu"] = stem + "सु";
      P["sam.eka"] = b + "े";       P["sam.bahu"] = stem + "ः";
    } else if (cls === "ii") {
      b = stem.slice(0, -1);
      P["pra.eka"] = stem;          P["pra.bahu"] = b + "्यः";
      P["dvi.eka"] = stem + "म्";   P["dvi.bahu"] = stem + "ः";
      P["tri.eka"] = b + "्या";     P["tri.bahu"] = stem + "भिः";
      P["cat.eka"] = b + "्यै";     P["cat.bahu"] = stem + "भ्यः";
      P["pan.eka"] = b + "्याः";    P["pan.bahu"] = stem + "भ्यः";
      P["sha.eka"] = b + "्याः";    P["sha.bahu"] = nj(stem, "नाम्");
      P["sap.eka"] = b + "्याम्";   P["sap.bahu"] = stem + "षु";
      P["sam.eka"] = b + "ि";       P["sam.bahu"] = b + "्यः";
    }
    return P;
  };

  // which cells of this word carry a suffix न that could become ण
  VB.natvaInfo = function (stem, cls) {
    var out = {};
    function chk(base, suf) { return nj(base, suf).slice(base.length).indexOf("ण") >= 0; }
    if (cls === "a" || cls === "n") {
      out["tri.eka"] = chk(stem, "ेन");
      out["sha.bahu"] = chk(stem, "ानाम्");
      if (cls === "n") ["pra.bahu", "dvi.bahu", "sam.bahu"].forEach(function (c) { out[c] = chk(stem, "ानि"); });
    } else {
      out["sha.bahu"] = chk(stem, "नाम्");
    }
    return out;
  };

  VB.rootOf = function (stem, cls) { return (cls === "aa" || cls === "ii") ? stem.slice(0, -1) : stem; };
  VB.stemFor = function (root, cls) { return cls === "aa" ? root + "ा" : cls === "ii" ? root + "ी" : root; };

  // swap न and ण only inside the ending, never in the stem
  var NATVA_PAIRS = [["ेण", "ेन"], ["ाणाम्", "ानाम्"], ["ाणि", "ानि"], ["णाम्", "नाम्"]];
  VB.flipNatva = function (form) {
    for (var i = 0; i < NATVA_PAIRS.length; i++) {
      var p = NATVA_PAIRS[i];
      if (form.endsWith(p[0])) return form.slice(0, -p[0].length) + p[1];
      if (form.endsWith(p[1])) return form.slice(0, -p[1].length) + p[0];
    }
    return null;
  };

  function other(c) { return c === "eka" ? "bahu" : "eka"; }

  /*
    Wrong forms a learner really produces, each with a tag.
    Returns [[form, tag], ...] without the right answer and without repeats.
  */
  VB.mistakes = function (stem, cls, cell) {
    var P = VB.decline(stem, cls), right = P[cell];
    var vib = cell.split(".")[0], vac = cell.split(".")[1];
    var root = VB.rootOf(stem, cls), out = [];
    var fem = function (c) { return c === "aa" || c === "ii"; };
    // named traps first so they keep their specific tag
    if (cls === "a" && cell === "dvi.bahu") out.push([stem + "ाः", "M10"]);
    if (cls === "ii" && cell === "pra.bahu") out.push([stem + "ः", "M11"]);
    if (cls === "ii" && cell === "dvi.bahu") out.push([root + "्यः", "M11"]);
    if (cls === "ii" && cell === "pra.eka") out.push([stem + "ः", "M11"]);
    if (cls === "n" && (vib === "pra" || vib === "dvi") && vac === "bahu") out.push([stem + "ाः", "M3"]);
    // the same ending from another class
    CLASSES.forEach(function (oc) {
      if (oc === cls) return;
      var f = VB.decline(VB.stemFor(root, oc), oc)[cell];
      var tag = (fem(cls) && fem(oc)) ? "M2" : (fem(cls) !== fem(oc)) ? "M1" : "M3";
      out.push([f, tag]);
    });
    out.push([P[vib + "." + other(vac)], "M8"]);
    var i = VIBS.indexOf(vib);
    [i - 1, i + 1].forEach(function (j) { if (j >= 0 && j < VIBS.length) out.push([P[VIBS[j] + "." + vac], "M9"]); });
    var nf = VB.flipNatva(right); if (nf) out.push([nf, "M4"]);
    if (right.endsWith("षु")) out.push([right.slice(0, -2) + "सु", "M5"]);
    if (vib === "sam") {
      out.push([P["pra." + vac], "M7"]);
      if ((cls === "aa" || cls === "ii") && vac === "eka") out.push([stem, "M7"]);
    }
    var seen = {}; seen[right] = 1;
    return out.filter(function (x) { if (!x[0] || seen[x[0]]) return false; seen[x[0]] = 1; return true; });
  };

  VB.MISTAKE_NOTE = {
    M1: "This is the ending of the other gender.",
    M2: "This mixes the आकारान्त and ईकारान्त patterns.",
    M3: "This mixes the पुंलिङ्ग and नपुंसकलिङ्ग patterns.",
    M4: "Check न and ण. Look for र, ष or ऋ earlier in the word, and for letters that block it.",
    M5: "After ए or ई the स of सु becomes ष (षु).",
    M7: "Calling someone uses सम्बोधनम्, which is different from प्रथमा.",
    M8: "Right vibhakti, but the number is wrong.",
    M9: "That is the ending of a neighbouring vibhakti.",
    M10: "पुंलिङ्ग द्वितीया बहुवचनम् ends in ान्, not ाः.",
    M11: "ईकारान्त: प्रथमा बहु is ्यः, द्वितीया बहु is ीः.",
    M12: "The word next to the blank decides the vibhakti.",
    M13: "Match the gender, vibhakti and number of the marked word.",
    M14: "The doer must be प्रथमा, and its number must match the verb."
  };

  // ---------- forms of किम् ----------
  VB.KIM = {
    m: { pra: ["कः", "के"], dvi: ["कम्", "कान्"], tri: ["केन", "कैः"], cat: ["कस्मै", "केभ्यः"],
         pan: ["कस्मात्", "केभ्यः"], sha: ["कस्य", "केषाम्"], sap: ["कस्मिन्", "केषु"] },
    f: { pra: ["का", "काः"], dvi: ["काम्", "काः"], tri: ["कया", "काभिः"], cat: ["कस्यै", "काभ्यः"],
         pan: ["कस्याः", "काभ्यः"], sha: ["कस्याः", "कासाम्"], sap: ["कस्याम्", "कासु"] },
    n: { pra: ["किम्", "कानि"], dvi: ["किम्", "कानि"], tri: ["केन", "कैः"], cat: ["कस्मै", "केभ्यः"],
         pan: ["कस्मात्", "केभ्यः"], sha: ["कस्य", "केषाम्"], sap: ["कस्मिन्", "केषु"] }
  };
  VB.kim = function (g, cell) {
    var p = cell.split(".");
    return VB.KIM[g][p[0]][p[1] === "eka" ? 0 : 1];
  };

  // ---------- split a word into akshara tiles ----------
  var CONS = /[\u0915-\u0939\u0958-\u095F]/;
  var IND_VOWEL = /[\u0904-\u0914\u0960\u0961]/;
  VB.aksharas = function (word) {
    var out = [], cur = "";
    for (var i = 0; i < word.length; i++) {
      var ch = word.charAt(i), prev = cur.charAt(cur.length - 1);
      var starts = (CONS.test(ch) && prev !== "्") || IND_VOWEL.test(ch);
      if (starts && cur) { out.push(cur); cur = ""; }
      cur += ch;
    }
    if (cur) out.push(cur);
    // a lone final consonant with virama joins as its own tile (रामात् -> रा मा त्)
    return out;
  };

  // ---------- Devanagari digits ----------
  VB.num = function (n) {
    return String(n).replace(/[0-9]/g, function (d) { return "०१२३४५६७८९".charAt(+d); });
  };

  // ---------- anusvara in running text: म् before a consonant becomes ं ----------
  VB.sbText = function (t) { return t.replace(/\u092E\u094D(\s+)(?=[\u0915-\u0939])/g, "\u0902$1"); };

  if (typeof module !== "undefined") module.exports = VB;
})(VB);
