/*
  app-settings.js
  Page 4, प्रगतिः, and the settings overlay.

  The progress grids are drawn from VB.MODULES, so a module with a different
  number of members or cells (pronouns, later verbs) needs no new code here.
*/
(function () {
  "use strict";
  var VB = window.VB, S = VB.Store, U = VB.UI;
  var h = U.h, add = U.add, show = U.show, bi = U.bi, icon = U.icon, N = VB.num;

  // ---------- one progress grid for any module ----------
  function moduleGrid(mod, opts) {
    opts = opts || {};
    var cols = mod.cols, rows = mod.members;
    var grid = h("div", { class: "grid" + (opts.wide ? " wide" : ""), style: "grid-template-columns: " + (opts.wide ? "76px" : "52px") + " repeat(" + cols.length + ", 1fr)",
      "aria-label": opts.label || "Progress" },
      h("span"), cols.map(function (c) { return h("span", { class: "h", text: mod.colLabel(c) }); }));
    rows.forEach(function (m) {
      var rowOpen = mod.rowOpen ? mod.rowOpen(m) : true;
      add(grid, h("span", { class: "rowlab" + (opts.wide ? " small" : "") + (rowOpen ? "" : " locked"), text: mod.rowLabel(m) }));
      cols.forEach(function (c) {
        var cells = mod.cellsFor(c), open = rowOpen && (mod.isOpen ? mod.isOpen(c) : true);
        var levels = cells.map(function (cell) { return S.level(m + ":" + cell); });
        var lv = Math.min.apply(null, levels), lvMax = Math.max.apply(null, levels);
        var shown = lv || (lvMax ? 1 : 0);
        add(grid, h("span", { class: "dot" + (open ? " l" + shown : " locked"),
          title: mod.rowLabel(m) + ", " + mod.colLabel(c) }));
      });
    });
    return grid;
  }
  function legend() {
    return h("div", { class: "legend" },
      h("span", {}, h("i", { style: "background:#6E5236" }), "started"),
      h("span", {}, h("i", { style: "background:#9C7A45" }), "practising"),
      h("span", {}, h("i", { style: "background:#C9A55C" }), "strong"),
      h("span", {}, h("i", { style: "background:#F0E0B6" }), "mastered"));
  }

  // the noun module as a grid definition: classes down, vibhaktis across
  function nounGrid() {
    var open = S.unlockedVibs();
    return moduleGrid({
      members: VB.CLASSES,
      cols: VB.VIBS,
      rowLabel: function (cls) { return VB.MODEL[cls]; },
      colLabel: function (v) { return VB.VIB_SHORT[v]; },
      cellsFor: function (v) { return (VB.SHOWN_VACS || VB.VACS).map(function (n) { return v + "." + n; }); },
      isOpen: function (v) { return open.indexOf(v) >= 0; }
    }, { label: "Progress for every class and vibhakti" });
  }

  // the pronoun module: seventeen paradigms down, seven vibhaktis across
  function pronGrid() {
    var M = VB.MODULES.pron; if (!M) return null;
    var open = S.pronOpen(), short = { m: "पुं", f: "स्त्री", n: "नपुं" };
    return moduleGrid({
      members: M.members, cols: M.vibs,
      rowLabel: function (id) { var p = VB.PRON_BY_ID[id]; return p.linga ? p.base + " " + short[p.linga] : p.base; },
      colLabel: function (v) { return VB.VIB_SHORT[v]; },
      cellsFor: function (v) { return M.vacs.map(function (n) { return v + "." + n; }); },
      rowOpen: function (id) { return open.indexOf(id) >= 0; }
    }, { label: "Progress for every pronoun", wide: true });
  }

  // ---------- the script grid, drawn only when the lipi module is present ----------
  function lipiGrid() {
    if (!VB.AKSHARAS) return null;
    var chars = VB.AKSHARAS.filter(function (a) { return !a.rare; });
    var wrap = h("div", { class: "lipigrid", "aria-label": "Progress for every letter" });
    chars.forEach(function (a) {
      var lv = S.level("lipi:" + a.ch, S.state.lipi.skills);
      add(wrap, h("span", { class: "ldot l" + lv, title: a.ch + " " + a.tr, text: a.ch }));
    });
    return wrap;
  }

  // =====================================================================
  // PAGE: प्रगतिः
  // =====================================================================
  function progress() {
    var st = S.state, vibs = S.unlockedVibs();
    var next = st.unlocked < VB.CLUSTERS.length && !st.settings.all
      ? "The next vibhakti opens once every box here has been practised and about 3 in 4 answers are right."
      : "All vibhaktis are open.";
    var read = VB.STORIES_L1 ? VB.STORIES_L1.stories.length : 0;
    var readDone = Object.keys(st.read && st.read.done || {}).length;

    show(
      h("div", { class: "topline" },
        h("h1", { class: "title small", text: "प्रगतिः" }),
        h("button", { class: "iconbtn", "aria-label": "Settings", onclick: open }, icon("gear"))),
      U.lampsRow(),
      h("h3", { class: "section", text: "विभक्तयः" }),
      h("p", { class: "progress-note" }, "Practising now: ",
        h("span", { class: "sa", text: vibs.map(function (v) { return VB.VIB_SA[v]; }).join(", ") }), ". " + next),
      nounGrid(),
      legend(),
      VB.MODULES.pron ? h("h3", { class: "section", style: "margin-top:26px", text: "सर्वनामानि" }) : null,
      VB.MODULES.pron ? h("p", { class: "progress-note", text: "Pronouns open in groups: तद्, then एतद्, किम्, अहम् and त्वम्, इदम्, यद्." }) : null,
      pronGrid(),
      VB.AKSHARAS ? h("h3", { class: "section", style: "margin-top:26px", text: "लिपिः" }) : null,
      VB.AKSHARAS ? h("p", { class: "progress-note", text: "Letters you have practised on the script page." }) : null,
      lipiGrid(),
      h("h3", { class: "section", style: "margin-top:26px", text: "सङ्ख्याः" }),
      h("div", { class: "stats" },
        stat("उत्तराणि", N(st.total.c) + " / " + N(st.total.q), "answers correct"),
        st.lipi && st.lipi.total.q ? stat("लिपि-उत्तराणि", N(st.lipi.total.c) + " / " + N(st.lipi.total.q), "letters correct") : null,
        stat("वेगः", N(st.best.speed || 0), "best speed round"),
        st.best.lipi ? stat("लिपि-वेगः", N(st.best.lipi), "best letter round") : null,
        read ? stat("पठनम्", N(readDone) + " / " + N(read), "stories finished") : null)
    );
  }
  function stat(sa, value, en) {
    return h("div", { class: "stat" },
      h("b", { class: "sa", text: sa }),
      h("span", { class: "sa num", text: value }),
      h("small", { text: en }));
  }

  // =====================================================================
  // SETTINGS OVERLAY
  // =====================================================================
  function open() {
    var st = S.state;
    var sizes = h("div", { class: "sizes", role: "group", "aria-label": "Text size" },
      [1, 1.15, 1.3].map(function (s, i) {
        return h("button", { "aria-pressed": st.settings.scale === s ? "true" : "false", style: "font-size:" + (16 + i * 5) + "px",
          onclick: function () { st.settings.scale = s; S.save(); U.applyScale(); ov.remove(); open(); } }, "अ");
      }));
    var sw = h("button", { class: "switch", role: "switch", "aria-checked": st.settings.all ? "true" : "false", "aria-label": "Practise all vibhaktis",
      onclick: function () { st.settings.all = !st.settings.all; S.save(); sw.setAttribute("aria-checked", st.settings.all ? "true" : "false"); } });

    var ov = h("div", { class: "overlay", onclick: function (e) { if (e.target === ov) close(); } },
      h("div", { class: "panel", role: "dialog", "aria-label": "Settings" },
        h("h3", { text: "विन्यासः" }),
        row("अक्षराणां परिमाणम्", "Text size", sizes),
        row("सर्वाः विभक्तयः", "Open all vibhaktis now, for those who already know the basics.", sw),
        row("रक्षणम्", "Save a copy of your progress, or move it to another phone.",
          h("div", { class: "twobtn" },
            h("button", { class: "linkbtn", onclick: exportState }, "निर्यातः", h("small", { text: "Export" })),
            h("button", { class: "linkbtn", onclick: function () { importState(ov); } }, "आयातः", h("small", { text: "Import" })))),
        row("पुनरारम्भः", "Erase all progress on this device: vibhaktis, script and reading together.",
          h("button", { class: "danger", onclick: function () {
            if (confirm("Erase all progress? This erases vibhakti, script and reading progress together, and cannot be undone.")) {
              S.reset(); U.applyScale(); close();
            }
          } }, "Reset")),
        h("p", { class: "fineprint", text: "Progress is saved only on this phone or computer, in this browser. Nothing is sent anywhere." }),
        h("button", { class: "primary", style: "margin-top:14px", onclick: close }, bi("सम्पन्नम्", "Done"))));
    document.body.appendChild(ov);
    function close() { ov.remove(); U.render(); }
  }
  function row(sa, en, control) {
    return h("div", { class: "setrow" }, h("div", { class: "lbl" }, h("b", { text: sa }), h("span", { text: en })), control);
  }

  // ---------- export and import ----------
  function exportState() {
    var text = JSON.stringify(S.state), name = "vibhakti-progress-" + S.today() + ".json";
    var ok = false;
    try {
      var blob = new Blob([text], { type: "application/json" });
      var a = h("a", { href: URL.createObjectURL(blob), download: name });
      document.body.appendChild(a); a.click();
      setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
      ok = true;
    } catch (e) { /* older browsers: fall through to the clipboard */ }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        alert(ok ? "Saved as a file, and copied to the clipboard as well."
                 : "Copied to the clipboard. Paste it somewhere safe.");
      }, function () { if (!ok) prompt("Copy this text and keep it safe:", text); });
    } else if (!ok) prompt("Copy this text and keep it safe:", text);
  }

  function importState(ov) {
    var text = prompt("Paste the progress text you exported earlier.");
    if (!text) return;
    var data;
    try { data = JSON.parse(text); } catch (e) { alert("That is not valid progress text. Nothing was changed."); return; }
    if (!S.looksValid(data)) { alert("That text does not look like progress from this app. Nothing was changed."); return; }
    if (!confirm("Replace the progress on this device with the pasted progress?")) return;
    S.load(data);
    U.applyScale();
    if (ov) ov.remove();
    U.render();
    alert("Progress restored.");
  }

  VB.Settings = { open: open, progress: progress };
  U.page("pragati", progress);
})();
