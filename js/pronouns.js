/* pronouns.js — सर्वनामानि.
 *
 * The one declared exception to "every form is generated": pronouns are
 * irregular, so they ship as literal tables and are held to a stricter check
 * in tools/check.js instead (every cell present, no सम्बोधनम्, the known
 * syncretisms asserted, and agreement with VB.KIM in grammar.js).
 *
 * Every paradigm carries all 21 cells, ekavacana, dvivacana and bahuvacana.
 * The UI shows eka and bahu only until the dvivacana phase flips
 * VB.PRON_SHOW_DVA. Writing dvivacana now means these tables never need
 * rewriting.
 *
 * Cell keys are "vibhakti.vacana". द्विवचनम् is "dva", never "dvi", because
 * "dvi" already means द्वितीया in the first half of the key.
 *
 * Enclitic forms (मा, नौ, नः, त्वा, वाम्, वः, ते, मे) and the anvādeśa forms
 * of एतद् and इदम् (एनम्, एनाम् ...) are left out deliberately. They are
 * real, but they are a level beyond what this module drills.
 */

(function (VB) {
  "use strict";

  VB.PRON_VIBS = ["pra", "dvi", "tri", "cat", "pan", "sha", "sap"];   // no सम्बोधनम्
  VB.PRON_VACS = ["eka", "dva", "bahu"];
  VB.PRON_SHOW_DVA = false;

  /* Each table is seven rows, प्रथमा to सप्तमी, of "eka dva bahu". */
  function P(id, base, linga, label, group, rows) {
    var F = {};
    rows.trim().split("\n").forEach(function (row, i) {
      var f = row.trim().split(/\s+/);
      VB.PRON_VACS.forEach(function (v, j) { F[VB.PRON_VIBS[i] + "." + v] = f[j]; });
    });
    return { id: id, base: base, linga: linga, label: label, group: group, F: F };
  }

  VB.PRONOUNS = [

    /* ---------------- तद् : that, he, she, it ---------------- */
    P("tad-m", "तद्", "m", "तद् (पुंलिङ्गम्)", "demonstrative", `
      सः      तौ       ते
      तम्     तौ       तान्
      तेन     ताभ्याम्  तैः
      तस्मै   ताभ्याम्  तेभ्यः
      तस्मात्  ताभ्याम्  तेभ्यः
      तस्य    तयोः     तेषाम्
      तस्मिन्  तयोः     तेषु`),

    P("tad-f", "तद्", "f", "तद् (स्त्रीलिङ्गम्)", "demonstrative", `
      सा      ते       ताः
      ताम्    ते       ताः
      तया     ताभ्याम्  ताभिः
      तस्यै   ताभ्याम्  ताभ्यः
      तस्याः  ताभ्याम्  ताभ्यः
      तस्याः  तयोः     तासाम्
      तस्याम्  तयोः     तासु`),

    P("tad-n", "तद्", "n", "तद् (नपुंसकलिङ्गम्)", "demonstrative", `
      तत्     ते       तानि
      तत्     ते       तानि
      तेन     ताभ्याम्  तैः
      तस्मै   ताभ्याम्  तेभ्यः
      तस्मात्  ताभ्याम्  तेभ्यः
      तस्य    तयोः     तेषाम्
      तस्मिन्  तयोः     तेषु`),

    /* ---------------- एतद् : this (near, just pointed at) ---------------- */
    P("etad-m", "एतद्", "m", "एतद् (पुंलिङ्गम्)", "demonstrative", `
      एषः      एतौ       एते
      एतम्     एतौ       एतान्
      एतेन     एताभ्याम्  एतैः
      एतस्मै   एताभ्याम्  एतेभ्यः
      एतस्मात्  एताभ्याम्  एतेभ्यः
      एतस्य    एतयोः     एतेषाम्
      एतस्मिन्  एतयोः     एतेषु`),

    P("etad-f", "एतद्", "f", "एतद् (स्त्रीलिङ्गम्)", "demonstrative", `
      एषा      एते       एताः
      एताम्    एते       एताः
      एतया     एताभ्याम्  एताभिः
      एतस्यै   एताभ्याम्  एताभ्यः
      एतस्याः  एताभ्याम्  एताभ्यः
      एतस्याः  एतयोः     एतासाम्
      एतस्याम्  एतयोः     एतासु`),

    P("etad-n", "एतद्", "n", "एतद् (नपुंसकलिङ्गम्)", "demonstrative", `
      एतत्     एते       एतानि
      एतत्     एते       एतानि
      एतेन     एताभ्याम्  एतैः
      एतस्मै   एताभ्याम्  एतेभ्यः
      एतस्मात्  एताभ्याम्  एतेभ्यः
      एतस्य    एतयोः     एतेषाम्
      एतस्मिन्  एतयोः     एतेषु`),

    /* ---------------- किम् : who, what, which ---------------- */
    P("kim-m", "किम्", "m", "किम् (पुंलिङ्गम्)", "interrogative", `
      कः      कौ       के
      कम्     कौ       कान्
      केन     काभ्याम्  कैः
      कस्मै   काभ्याम्  केभ्यः
      कस्मात्  काभ्याम्  केभ्यः
      कस्य    कयोः     केषाम्
      कस्मिन्  कयोः     केषु`),

    P("kim-f", "किम्", "f", "किम् (स्त्रीलिङ्गम्)", "interrogative", `
      का      के       काः
      काम्    के       काः
      कया     काभ्याम्  काभिः
      कस्यै   काभ्याम्  काभ्यः
      कस्याः  काभ्याम्  काभ्यः
      कस्याः  कयोः     कासाम्
      कस्याम्  कयोः     कासु`),

    P("kim-n", "किम्", "n", "किम् (नपुंसकलिङ्गम्)", "interrogative", `
      किम्    के       कानि
      किम्    के       कानि
      केन     काभ्याम्  कैः
      कस्मै   काभ्याम्  केभ्यः
      कस्मात्  काभ्याम्  केभ्यः
      कस्य    कयोः     केषाम्
      कस्मिन्  कयोः     केषु`),

    /* ---------------- अस्मद् : I, we ---------------- */
    P("asmad", "अस्मद्", null, "अस्मद् (अहम्)", "personal", `
      अहम्    आवाम्     वयम्
      माम्    आवाम्     अस्मान्
      मया     आवाभ्याम्  अस्माभिः
      मह्यम्   आवाभ्याम्  अस्मभ्यम्
      मत्     आवाभ्याम्  अस्मत्
      मम     आवयोः     अस्माकम्
      मयि     आवयोः     अस्मासु`),

    /* ---------------- युष्मद् : you ---------------- */
    P("yushmad", "युष्मद्", null, "युष्मद् (त्वम्)", "personal", `
      त्वम्    युवाम्     यूयम्
      त्वाम्   युवाम्     युष्मान्
      त्वया    युवाभ्याम्  युष्माभिः
      तुभ्यम्  युवाभ्याम्  युष्मभ्यम्
      त्वत्    युवाभ्याम्  युष्मत्
      तव     युवयोः     युष्माकम्
      त्वयि    युवयोः     युष्मासु`),

    /* ---------------- इदम् : this (tier 2, recommended) ---------------- */
    P("idam-m", "इदम्", "m", "इदम् (पुंलिङ्गम्)", "demonstrative", `
      अयम्    इमौ      इमे
      इमम्    इमौ      इमान्
      अनेन    आभ्याम्   एभिः
      अस्मै   आभ्याम्   एभ्यः
      अस्मात्  आभ्याम्   एभ्यः
      अस्य    अनयोः    एषाम्
      अस्मिन्  अनयोः    एषु`),

    P("idam-f", "इदम्", "f", "इदम् (स्त्रीलिङ्गम्)", "demonstrative", `
      इयम्    इमे      इमाः
      इमाम्   इमे      इमाः
      अनया    आभ्याम्   आभिः
      अस्यै   आभ्याम्   आभ्यः
      अस्याः  आभ्याम्   आभ्यः
      अस्याः  अनयोः    आसाम्
      अस्याम्  अनयोः    आसु`),

    P("idam-n", "इदम्", "n", "इदम् (नपुंसकलिङ्गम्)", "demonstrative", `
      इदम्    इमे      इमानि
      इदम्    इमे      इमानि
      अनेन    आभ्याम्   एभिः
      अस्मै   आभ्याम्   एभ्यः
      अस्मात्  आभ्याम्   एभ्यः
      अस्य    अनयोः    एषाम्
      अस्मिन्  अनयोः    एषु`),

    /* ---------------- यद् : who, which (relative, tier 2) ---------------- */
    P("yad-m", "यद्", "m", "यद् (पुंलिङ्गम्)", "relative", `
      यः      यौ       ये
      यम्     यौ       यान्
      येन     याभ्याम्  यैः
      यस्मै   याभ्याम्  येभ्यः
      यस्मात्  याभ्याम्  येभ्यः
      यस्य    ययोः     येषाम्
      यस्मिन्  ययोः     येषु`),

    P("yad-f", "यद्", "f", "यद् (स्त्रीलिङ्गम्)", "relative", `
      या      ये       याः
      याम्    ये       याः
      यया     याभ्याम्  याभिः
      यस्यै   याभ्याम्  याभ्यः
      यस्याः  याभ्याम्  याभ्यः
      यस्याः  ययोः     यासाम्
      यस्याम्  ययोः     यासु`),

    P("yad-n", "यद्", "n", "यद् (नपुंसकलिङ्गम्)", "relative", `
      यत्     ये       यानि
      यत्     ये       यानि
      येन     याभ्याम्  यैः
      यस्मै   याभ्याम्  येभ्यः
      यस्मात्  याभ्याम्  येभ्यः
      यस्य    ययोः     येषाम्
      यस्मिन्  ययोः     येषु`)
  ];

  /* Unlock order within the pronoun track (architecture doc 5.5.7).
     Each step unlocks every paradigm in it together. */
  VB.PRON_ORDER = [
    ["tad-m", "tad-f", "tad-n"],
    ["etad-m", "etad-f", "etad-n"],
    ["kim-m", "kim-f", "kim-n"],
    ["asmad", "yushmad"],
    ["idam-m", "idam-f", "idam-n"],
    ["yad-m", "yad-f", "yad-n"]
  ];

  VB.PRON_BY_ID = {};
  VB.PRONOUNS.forEach(function (p) { VB.PRON_BY_ID[p.id] = p; });

  /* Reverse index: surface form -> every [paradigm, cell] that produces it.
     Syncretism is heavy (ते alone is six cells), so this is always a list. */
  VB.PRON_BY_FORM = {};
  VB.PRONOUNS.forEach(function (p) {
    Object.keys(p.F).forEach(function (cell) {
      (VB.PRON_BY_FORM[p.F[cell]] = VB.PRON_BY_FORM[p.F[cell]] || []).push([p.id, cell]);
    });
  });

})(window.VB = window.VB || {});
