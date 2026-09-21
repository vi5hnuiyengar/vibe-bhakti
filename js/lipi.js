/* lipi.js — Devanagari script data for the लिपिः page.
 *
 * Three tables: VB.AKSHARAS (50), VB.MATRAS (11), VB.CONJUNCTS (44).
 *
 * Every entry carries a `conf` string: a space-separated confusion set,
 * ordered most-confusable first. Distractors are drawn from here before
 * falling back to random. A conf entry may name a character from any of
 * the three tables.
 *
 * Transliteration is IAST. Sanskrit has no schwa deletion, so surface
 * pronunciation is fully derivable from these tables: walk the string,
 * emit each consonant's `tr` minus its trailing "a" plus the attached
 * matra's `tr`, or plus "a" when no matra and no virama follows.
 * This is why exercise 5 (word reading) needs no extra data.
 */

(function (VB) {
  "use strict";

  /* ---------------------------------------------------------------
   * 1. AKSHARAS
   *    type:  "vowel" | "cons" | "mark"
   *    varga: the row of the varnamala, null for non-varga letters
   *    rare:  true means excluded from drills by default
   * --------------------------------------------------------------- */

  VB.AKSHARAS = [

    /* स्वराः — vowels */
    { ch: "अ",  tr: "a",   type: "vowel", varga: null, conf: "आ ओ" },
    { ch: "आ",  tr: "ā",   type: "vowel", varga: null, conf: "अ ओ" },
    { ch: "इ",  tr: "i",   type: "vowel", varga: null, conf: "ई उ" },
    { ch: "ई",  tr: "ī",   type: "vowel", varga: null, conf: "इ ऊ" },
    { ch: "उ",  tr: "u",   type: "vowel", varga: null, conf: "ऊ ऋ" },
    { ch: "ऊ",  tr: "ū",   type: "vowel", varga: null, conf: "उ ऋ" },
    { ch: "ऋ",  tr: "ṛ",   type: "vowel", varga: null, conf: "र ॠ",
      note: "A vowel, not a consonant. Never confuse with र." },
    { ch: "ॠ",  tr: "ṝ",   type: "vowel", varga: null, conf: "ऋ र", rare: true },
    { ch: "ऌ",  tr: "ḷ",   type: "vowel", varga: null, conf: "ऋ ल", rare: true,
      note: "Appears in क्ऌप्त and almost nowhere else." },
    { ch: "ए",  tr: "e",   type: "vowel", varga: null, conf: "ऐ ओ" },
    { ch: "ऐ",  tr: "ai",  type: "vowel", varga: null, conf: "ए ओ" },
    { ch: "ओ",  tr: "o",   type: "vowel", varga: null, conf: "औ अ" },
    { ch: "औ",  tr: "au",  type: "vowel", varga: null, conf: "ओ ऐ" },

    /* कवर्गः — velars */
    { ch: "क",  tr: "ka",  type: "cons", varga: "ka", conf: "फ ख" },
    { ch: "ख",  tr: "kha", type: "cons", varga: "ka", conf: "घ ध" },
    { ch: "ग",  tr: "ga",  type: "cons", varga: "ka", conf: "न म" },
    { ch: "घ",  tr: "gha", type: "cons", varga: "ka", conf: "ध ख" },
    { ch: "ङ",  tr: "ṅa",  type: "cons", varga: "ka", conf: "ड ढ",
      note: "Only ever appears before a velar, as in अङ्गम्." },

    /* चवर्गः — palatals */
    { ch: "च",  tr: "ca",  type: "cons", varga: "ca", conf: "व ज" },
    { ch: "छ",  tr: "cha", type: "cons", varga: "ca", conf: "ठ ड" },
    { ch: "ज",  tr: "ja",  type: "cons", varga: "ca", conf: "ञ झ" },
    { ch: "झ",  tr: "jha", type: "cons", varga: "ca", conf: "भ ङ" },
    { ch: "ञ",  tr: "ña",  type: "cons", varga: "ca", conf: "ज झ",
      note: "Only ever appears before a palatal, as in पञ्च." },

    /* टवर्गः — retroflexes */
    { ch: "ट",  tr: "ṭa",  type: "cons", varga: "ta1", conf: "ठ ढ" },
    { ch: "ठ",  tr: "ṭha", type: "cons", varga: "ta1", conf: "ट छ" },
    { ch: "ड",  tr: "ḍa",  type: "cons", varga: "ta1", conf: "ङ ढ" },
    { ch: "ढ",  tr: "ḍha", type: "cons", varga: "ta1", conf: "ड ट" },
    { ch: "ण",  tr: "ṇa",  type: "cons", varga: "ta1", conf: "ग ङ" },

    /* तवर्गः — dentals */
    { ch: "त",  tr: "ta",  type: "cons", varga: "ta2", conf: "न ल" },
    { ch: "थ",  tr: "tha", type: "cons", varga: "ta2", conf: "य घ" },
    { ch: "द",  tr: "da",  type: "cons", varga: "ta2", conf: "ढ ट" },
    { ch: "ध",  tr: "dha", type: "cons", varga: "ta2", conf: "घ ख",
      note: "The single most confused pair in the script is ध and घ." },
    { ch: "न",  tr: "na",  type: "cons", varga: "ta2", conf: "त ग" },

    /* पवर्गः — labials */
    { ch: "प",  tr: "pa",  type: "cons", varga: "pa", conf: "ष य" },
    { ch: "फ",  tr: "pha", type: "cons", varga: "pa", conf: "क प" },
    { ch: "ब",  tr: "ba",  type: "cons", varga: "pa", conf: "व भ" },
    { ch: "भ",  tr: "bha", type: "cons", varga: "pa", conf: "म ब" },
    { ch: "म",  tr: "ma",  type: "cons", varga: "pa", conf: "भ स" },

    /* अन्तःस्थाः — semivowels */
    { ch: "य",  tr: "ya",  type: "cons", varga: null, conf: "थ प" },
    { ch: "र",  tr: "ra",  type: "cons", varga: null, conf: "ऋ त" },
    { ch: "ल",  tr: "la",  type: "cons", varga: null, conf: "ज त" },
    { ch: "व",  tr: "va",  type: "cons", varga: null, conf: "ब च" },

    /* ऊष्माणः — sibilants and ह */
    { ch: "श",  tr: "śa",  type: "cons", varga: null, conf: "स ष",
      note: "Palatal. श ष स are three different sounds, not one." },
    { ch: "ष",  tr: "ṣa",  type: "cons", varga: null, conf: "प श" },
    { ch: "स",  tr: "sa",  type: "cons", varga: null, conf: "म श" },
    { ch: "ह",  tr: "ha",  type: "cons", varga: null, conf: "भ म" },

    /* चिह्नानि — marks */
    { ch: "ं",  tr: "ṃ",   type: "mark", varga: null, conf: "ः ्",
      note: "अनुस्वारः. Sits above the line." },
    { ch: "ः",  tr: "ḥ",   type: "mark", varga: null, conf: "ं ऽ",
      note: "विसर्गः. Two dots after the letter." },
    { ch: "्",  tr: "",    type: "mark", varga: null, conf: "ऽ ं",
      note: "विरामः / हलन्तः. Cancels the inherent a." },
    { ch: "ऽ",  tr: "'",   type: "mark", varga: null, conf: "ः ्", rare: true,
      note: "अवग्रहः. Marks an elided अ after ए or ओ." }
  ];

  /* ---------------------------------------------------------------
   * 2. MATRAS
   *    pos: where the sign is drawn relative to the consonant.
   *         "before" | "after" | "above" | "below" | "around"
   *
   *    `pos` is not decoration. The ि sign is drawn BEFORE the
   *    consonant and read AFTER it, and that single fact is the
   *    largest obstacle a beginner hits. Exercise 3 should quiz it
   *    directly rather than treating all matras alike.
   * --------------------------------------------------------------- */

  VB.MATRAS = [
    { ch: "ा", tr: "ā",  vowel: "आ", pos: "after",  conf: "ो ौ" },
    { ch: "ि", tr: "i",  vowel: "इ", pos: "before", conf: "ी े",
      note: "Written before, read after. कि is ki, never ik." },
    { ch: "ी", tr: "ī",  vowel: "ई", pos: "after",  conf: "ि ौ" },
    { ch: "ु", tr: "u",  vowel: "उ", pos: "below",  conf: "ू ृ" },
    { ch: "ू", tr: "ū",  vowel: "ऊ", pos: "below",  conf: "ु ृ" },
    { ch: "ृ", tr: "ṛ",  vowel: "ऋ", pos: "below",  conf: "ु ू",
      note: "कृ is kṛ. The hook below is a vowel." },
    { ch: "ॄ", tr: "ṝ",  vowel: "ॠ", pos: "below",  conf: "ृ ू", rare: true },
    { ch: "े", tr: "e",  vowel: "ए", pos: "above",  conf: "ै ि" },
    { ch: "ै", tr: "ai", vowel: "ऐ", pos: "above",  conf: "े ो" },
    { ch: "ो", tr: "o",  vowel: "ओ", pos: "around", conf: "ौ ा" },
    { ch: "ौ", tr: "au", vowel: "औ", pos: "around", conf: "ो ै" }
  ];

  /* ---------------------------------------------------------------
   * 3. CONJUNCTS
   *    form: how the cluster is drawn, which decides how it is taught.
   *
   *      "ligature" — a new shape. क + ष does not look like either.
   *                   Must be memorised. Drill hardest.
   *      "halfform" — the first consonant drops its vertical stroke
   *                   and joins. Decodable once the rule is known.
   *      "stacked"  — the second sits under the first.
   *      "rakara"   — र as the SECOND member, drawn as a stroke below.
   *                   Read second, written below. A reading trap.
   *      "repha"    — र as the FIRST member, drawn as a hook ABOVE
   *                   the following consonant. Read first, written
   *                   after. The other reading trap, and the worse one.
   * --------------------------------------------------------------- */

  VB.CONJUNCTS = [

    /* ligatures — opaque, memorise */
    { ch: "क्ष", parts: ["क", "ष"], tr: "kṣa", form: "ligature", conf: "ज्ञ श्र",
      note: "Often taught as a letter. It is क + ष." },
    { ch: "ज्ञ", parts: ["ज", "ञ"], tr: "jña", form: "ligature", conf: "क्ष श्र",
      note: "Two palatals. ज + ञ." },
    { ch: "क्त", parts: ["क", "त"], tr: "kta", form: "ligature", conf: "क्ष क्र" },
    { ch: "द्ध", parts: ["द", "ध"], tr: "ddha", form: "ligature", conf: "द्घ द्व" },
    { ch: "द्य", parts: ["द", "य"], tr: "dya", form: "ligature", conf: "द्व द्ध" },
    { ch: "द्व", parts: ["द", "व"], tr: "dva", form: "ligature", conf: "द्य द्ध" },
    { ch: "ट्ट", parts: ["ट", "ट"], tr: "ṭṭa", form: "ligature", conf: "ष्ट ण्ड" },
    { ch: "द्घ", parts: ["द", "घ"], tr: "dgha", form: "ligature", conf: "द्ध द्व" },

    /* stacked */
    { ch: "ह्म", parts: ["ह", "म"], tr: "hma", form: "stacked", conf: "ह्य ह्व" },
    { ch: "ह्य", parts: ["ह", "य"], tr: "hya", form: "stacked", conf: "ह्म ह्व" },
    { ch: "ह्व", parts: ["ह", "व"], tr: "hva", form: "stacked", conf: "ह्य ह्म" },
    { ch: "ष्ट", parts: ["ष", "ट"], tr: "ṣṭa", form: "stacked", conf: "ष्ठ ष्ण" },
    { ch: "ष्ठ", parts: ["ष", "ठ"], tr: "ṣṭha", form: "stacked", conf: "ष्ट ष्ण" },
    { ch: "ष्ण", parts: ["ष", "ण"], tr: "ṣṇa", form: "stacked", conf: "ष्ट ष्ठ" },
    { ch: "ङ्क", parts: ["ङ", "क"], tr: "ṅka", form: "stacked", conf: "ङ्ग ञ्च" },
    { ch: "ङ्ग", parts: ["ङ", "ग"], tr: "ṅga", form: "stacked", conf: "ङ्क ञ्ज" },
    { ch: "ञ्च", parts: ["ञ", "च"], tr: "ñca", form: "stacked", conf: "ञ्ज ङ्क" },
    { ch: "ञ्ज", parts: ["ञ", "ज"], tr: "ñja", form: "stacked", conf: "ञ्च ङ्ग" },
    { ch: "ण्ड", parts: ["ण", "ड"], tr: "ṇḍa", form: "stacked", conf: "ण्ठ ट्ट" },
    { ch: "ण्ठ", parts: ["ण", "ठ"], tr: "ṇṭha", form: "stacked", conf: "ण्ड ष्ठ" },
    { ch: "ण्य", parts: ["ण", "य"], tr: "ṇya", form: "stacked", conf: "न्य ध्य" },

    /* half-forms — decodable */
    { ch: "न्त", parts: ["न", "त"], tr: "nta", form: "halfform", conf: "न्द न्ध" },
    { ch: "न्द", parts: ["न", "द"], tr: "nda", form: "halfform", conf: "न्त न्ध" },
    { ch: "न्ध", parts: ["न", "ध"], tr: "ndha", form: "halfform", conf: "न्द न्त" },
    { ch: "न्न", parts: ["न", "न"], tr: "nna", form: "halfform", conf: "न्त न्य" },
    { ch: "न्य", parts: ["न", "य"], tr: "nya", form: "halfform", conf: "न्न ण्य" },
    { ch: "म्प", parts: ["म", "प"], tr: "mpa", form: "halfform", conf: "म्ब म्भ" },
    { ch: "म्ब", parts: ["म", "ब"], tr: "mba", form: "halfform", conf: "म्प म्भ" },
    { ch: "म्भ", parts: ["म", "भ"], tr: "mbha", form: "halfform", conf: "म्ब म्प" },
    { ch: "स्त", parts: ["स", "त"], tr: "sta", form: "halfform", conf: "स्थ स्म" },
    { ch: "स्थ", parts: ["स", "थ"], tr: "stha", form: "halfform", conf: "स्त स्व" },
    { ch: "स्व", parts: ["स", "व"], tr: "sva", form: "halfform", conf: "स्म स्य" },
    { ch: "स्म", parts: ["स", "म"], tr: "sma", form: "halfform", conf: "स्व स्य" },
    { ch: "स्य", parts: ["स", "य"], tr: "sya", form: "halfform", conf: "स्म स्व" },
    { ch: "श्च", parts: ["श", "च"], tr: "śca", form: "halfform", conf: "श्व श्य" },
    { ch: "श्व", parts: ["श", "व"], tr: "śva", form: "halfform", conf: "श्च श्य" },
    { ch: "श्य", parts: ["श", "य"], tr: "śya", form: "halfform", conf: "श्च स्य" },
    { ch: "त्त", parts: ["त", "त"], tr: "tta", form: "halfform", conf: "त्म त्व" },
    { ch: "त्म", parts: ["त", "म"], tr: "tma", form: "halfform", conf: "त्त त्व" },
    { ch: "त्य", parts: ["त", "य"], tr: "tya", form: "halfform", conf: "त्व त्म" },
    { ch: "त्व", parts: ["त", "व"], tr: "tva", form: "halfform", conf: "त्य त्म" },
    { ch: "प्त", parts: ["प", "त"], tr: "pta", form: "halfform", conf: "प्र ल्प" },
    { ch: "ध्य", parts: ["ध", "य"], tr: "dhya", form: "halfform", conf: "न्य त्य" },
    { ch: "व्य", parts: ["व", "य"], tr: "vya", form: "halfform", conf: "त्य ध्य" },
    { ch: "ल्ल", parts: ["ल", "ल"], tr: "lla", form: "halfform", conf: "ल्प न्न" },
    { ch: "ल्प", parts: ["ल", "प"], tr: "lpa", form: "halfform", conf: "ल्ल प्त" },
    { ch: "ग्न", parts: ["ग", "न"], tr: "gna", form: "halfform", conf: "ग्र न्न" },

    /* रकारः — र written BELOW, read SECOND */
    { ch: "प्र", parts: ["प", "र"], tr: "pra", form: "rakara", conf: "क्र ग्र",
      note: "The stroke below is र, and it is read after प." },
    { ch: "क्र", parts: ["क", "र"], tr: "kra", form: "rakara", conf: "क्त प्र" },
    { ch: "ग्र", parts: ["ग", "र"], tr: "gra", form: "rakara", conf: "ग्न प्र" },
    { ch: "ब्र", parts: ["ब", "र"], tr: "bra", form: "rakara", conf: "भ्र प्र" },
    { ch: "भ्र", parts: ["भ", "र"], tr: "bhra", form: "rakara", conf: "ब्र प्र" },
    { ch: "द्र", parts: ["द", "र"], tr: "dra", form: "rakara", conf: "द्व ध्र" },
    { ch: "ध्र", parts: ["ध", "र"], tr: "dhra", form: "rakara", conf: "द्र भ्र" },
    { ch: "त्र", parts: ["त", "र"], tr: "tra", form: "rakara", conf: "क्ष त्व",
      note: "Often taught as a letter. It is त + र." },
    { ch: "श्र", parts: ["श", "र"], tr: "śra", form: "rakara", conf: "ज्ञ श्व",
      note: "Often taught as a letter. It is श + र." },
    { ch: "स्र", parts: ["स", "र"], tr: "sra", form: "rakara", conf: "स्त श्र" },
    { ch: "व्र", parts: ["व", "र"], tr: "vra", form: "rakara", conf: "व्य ब्र" },

    /* रेफः — र written ABOVE the NEXT letter, read FIRST */
    { ch: "र्क", parts: ["र", "क"], tr: "rka", form: "repha", conf: "र्ग क्र",
      note: "The hook sits over क but is read before it." },
    { ch: "र्म", parts: ["र", "म"], tr: "rma", form: "repha", conf: "र्व र्य",
      note: "धर्म is dha-r-ma. The hook over म belongs before it." },
    { ch: "र्य", parts: ["र", "य"], tr: "rya", form: "repha", conf: "र्व र्म" },
    { ch: "र्व", parts: ["र", "व"], tr: "rva", form: "repha", conf: "र्म र्य" },
    { ch: "र्ण", parts: ["र", "ण"], tr: "rṇa", form: "repha", conf: "र्म र्ग" },
    { ch: "र्थ", parts: ["र", "थ"], tr: "rtha", form: "repha", conf: "र्ध र्ग" },
    { ch: "र्ग", parts: ["र", "ग"], tr: "rga", form: "repha", conf: "र्क र्ध" },
    { ch: "र्ध", parts: ["र", "ध"], tr: "rdha", form: "repha", conf: "र्थ र्ग" }
  ];

  /* ---------------------------------------------------------------
   * 4. Teaching order
   *
   * Unlock stages for the लिपिः page. Each stage adds characters to
   * the drillable pool. Same gate arithmetic as the vibhakti page.
   *
   * Stage 1 is deliberately tiny and deliberately not the varnamala
   * order. It front-loads the letters that appear most often in the
   * words the learner will meet on the vibhakti page, so the script
   * page starts paying off within a few days.
   * --------------------------------------------------------------- */

  VB.LIPI_STAGES = [
    { n: 1, label: "स्वराः",        add: "अ आ इ ई उ ऊ ए ओ" },
    { n: 2, label: "प्रथमव्यञ्जनानि", add: "क ग त द न प ब म" },
    { n: 3, label: "मात्राः",        add: "ा ि ी ु ू े ो" },
    { n: 4, label: "अधिकव्यञ्जनानि", add: "य र ल व श ष स ह" },
    { n: 5, label: "महाप्राणाः",     add: "ख घ छ झ थ ध फ भ" },
    { n: 6, label: "मूर्धन्याः",      add: "ट ठ ड ढ ण ङ ञ च ज" },
    { n: 7, label: "शेषमात्राः",     add: "ृ ै ौ ं ः ्" },
    { n: 8, label: "सरलसंयुक्ताक्षराणि", add: "क्ष त्र ज्ञ श्र न्त न्द स्त स्थ म्प ष्ट" },
    { n: 9, label: "रकाररेफौ",       add: "प्र क्र ग्र ब्र द्र र्म र्य र्व र्ण" },
    { n: 10, label: "सर्वाणि",       add: "*" }
  ];

  /* Varnamala order, for the reference table on the प्रगतिः page. */
  VB.VARNAMALA = [
    { row: "स्वराः",   chars: "अ आ इ ई उ ऊ ऋ ॠ ऌ ए ऐ ओ औ" },
    { row: "अयोगवाहौ", chars: "ं ः" },
    { row: "कवर्गः",   chars: "क ख ग घ ङ" },
    { row: "चवर्गः",   chars: "च छ ज झ ञ" },
    { row: "टवर्गः",   chars: "ट ठ ड ढ ण" },
    { row: "तवर्गः",   chars: "त थ द ध न" },
    { row: "पवर्गः",   chars: "प फ ब भ म" },
    { row: "अन्तःस्थाः", chars: "य र ल व" },
    { row: "ऊष्माणः",  chars: "श ष स ह" }
  ];

  /* Lookup maps, built once. */
  VB.BY_CHAR = {};
  [VB.AKSHARAS, VB.MATRAS, VB.CONJUNCTS].forEach(function (list) {
    list.forEach(function (e) { VB.BY_CHAR[e.ch] = e; });
  });

})(window.VB = window.VB || {});
