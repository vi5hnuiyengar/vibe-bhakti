/*
  app-read.js
  Page 2, पठनम्: reading a story line by line.

  The learner reads a line, taps each marked word, and names its liṅga,
  vibhakti and vacana. Answering unlocks the next line; being right does not,
  so reading never turns into a test that stops the learner.

  Marked words are stored as {tok, stem, cls, cell}. The checker proves each
  one equals VB.decline(stem, cls)[cell], so the corpus cannot teach a wrong form.
  Answers go into the main skill store, the same as drill answers.
*/
(function () {
  "use strict";
  var VB = window.VB, S = VB.Store, U = VB.UI;
  var h = U.h, add = U.add, show = U.show, bi = U.bi, icon = U.icon, dock = U.dock, N = VB.num;

  var LINGA_SA = { m: "पुंलिङ्गम्", f: "स्त्रीलिङ्गम्", n: "नपुंसकलिङ्गम्" };
  var DIFF_SA = { 1: "सरलम्", 2: "मध्यमम्", 3: "कठिनम्" };
  var LEVELS = [
    { n: 1, en: "अकारान्त, आकारान्त, ईकारान्त nouns. All eight vibhaktis." },
    { n: 2, en: "इकारान्त and उकारान्त stems" },
    { n: 3, en: "ऋकारान्त and consonant stems" },
    { n: 4, en: "Pronouns and द्विवचनम्" }
  ];

  function R() { return S.state.read; }
  function reduceMotion() { return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches; }

  // =====================================================================
  // STORY LIST
  // =====================================================================
  function list() {
    var stories = VB.STORIES_L1 ? VB.STORIES_L1.stories : [];
    var done = R().done || {};
    var nDone = stories.filter(function (s) { return done[s.id]; }).length;
    show(
      h("h1", { class: "title small", text: "पठनम्" }),
      h("p", { class: "tagline", text: "Read a story line by line, and name the vibhakti of each marked word." }),
      h("div", { class: "levelhead" },
        h("b", { class: "sa", text: "स्तरः " + N(1) }),
        h("span", { text: N(nDone) + " / " + N(stories.length) + " read" })),
      h("div", { class: "storylist" }, stories.map(function (st) {
        var d = done[st.id];
        return h("button", { class: "story" + (d ? " read" : ""), onclick: function () { U.enter(function () { reader(st); }); } },
          h("span", { class: "stitle sa", text: st.title }),
          h("span", { class: "ssource", text: st.source || "" }),
          h("span", { class: "smeta" },
            h("span", { class: "diff d" + st.difficulty, text: DIFF_SA[st.difficulty] || "" }),
            d ? h("span", { class: "sdone", text: "पठितम्  " + N(d.right) + "/" + N(d.total) }) : null));
      })),
      LEVELS.slice(1).map(function (lv) {
        return h("div", { class: "story locked", "aria-disabled": "true" },
          h("span", { class: "stitle sa", text: "स्तरः " + N(lv.n) }),
          h("span", { class: "ssource", text: lv.en }),
          h("span", { class: "smeta" }, h("span", { class: "diff", text: "Work in progress" })));
      })
    );
  }

  // =====================================================================
  // READER
  // =====================================================================
  function reader(st) {
    var ses = { st: st, li: 0, right: 0, total: 0, answered: {} };
    var col = h("div", { class: "reader" });
    var nextBtn = h("button", { class: "primary", onclick: advance });
    var head = h("div", {});

    function quit() {
      if (ses.total > 0 && !confirm("Leave this story? Your answers so far are saved.")) return;
      U.leave();
    }
    function drawHead() {
      head.innerHTML = "";
      add(head, U.topBar(ses.li, st.lines.length, quit));
    }

    show(head,
      h("div", { class: "rtitle" }, h("h1", { class: "sa", text: st.title }), h("p", { text: st.source || "" })),
      col,
      dock(nextBtn));
    drawHead();
    addLine(0);

    // one line of the story, with its marked words as buttons
    function addLine(i) {
      var line = st.lines[i], toks = line.sa.split(" ");
      var marks = {};
      (line.marks || []).forEach(function (m) { marks[m.tok] = m; });
      var p = h("p", { class: "rline sa" + (reduceMotion() ? "" : " enter") });
      toks.forEach(function (t, k) {
        if (marks[k]) {
          var btn = h("button", { class: "rmark", "aria-label": t + ", marked word. Tap to answer." }, t);
          btn.addEventListener("click", function () { if (ses.li === i && !ses.answered[i + ":" + k]) ask(i, k, marks[k], btn); });
          add(p, btn);
        } else add(p, h("span", { text: t }));
        add(p, " ");
      });
      var mean = h("p", { class: "rmean", hidden: true, text: line.en });
      var wrap = h("div", { class: "rwrap" }, p,
        h("button", { class: "linkbtn small", onclick: function () { mean.hidden = !mean.hidden; } }, "अर्थः", h("small", { text: "Meaning" })),
        mean);
      col.appendChild(wrap);
      updateNext();
      if (i > 0) U.keepInView(wrap);
    }

    function lineMarks(i) { return (st.lines[i].marks || []); }
    function lineDone(i) { return lineMarks(i).every(function (m) { return ses.answered[i + ":" + m.tok]; }); }

    function updateNext() {
      var last = ses.li >= st.lines.length - 1, ready = lineDone(ses.li);
      nextBtn.innerHTML = "";
      add(nextBtn, bi(last ? "समाप्तम्" : "अग्रिमा पङ्क्तिः", last ? "Finish" : "Next line"));
      nextBtn.disabled = !ready;
      var left = lineMarks(ses.li).filter(function (m) { return !ses.answered[ses.li + ":" + m.tok]; }).length;
      nextBtn.setAttribute("aria-label", ready ? "Next line" : left + " marked word(s) still to answer");
    }

    function advance() {
      if (!lineDone(ses.li)) return;
      if (ses.li >= st.lines.length - 1) return finish();
      var cur = col.lastChild; if (cur) cur.classList.add("past");
      ses.li++;
      drawHead();
      addLine(ses.li);
    }

    // ---------- the three-dropdown question ----------
    function ask(i, k, m, btn) {
      var w = VB.BY_STEM[m.stem];
      function sel(label, en, opts) {
        var s = h("select", { class: "rsel", "aria-label": en },
          h("option", { value: "", text: "चिनुत" }),
          opts.map(function (o) { return h("option", { value: o[0], text: o[1] }); }));
        s.addEventListener("change", check);
        return h("label", { class: "rfield" }, h("span", { class: "sa", text: label }), h("small", { text: en }), s);
      }
      var fL = sel("लिङ्गम्", "Gender", ["m", "f", "n"].map(function (g) { return [g, LINGA_SA[g]]; }));
      var fV = sel("विभक्तिः", "Vibhakti", VB.VIBS.map(function (v) { return [v, VB.VIB_SA[v]]; }));
      var fN = sel("वचनम्", "Number", (VB.SHOWN_VACS || VB.VACS).map(function (n) { return [n, VB.VAC_SA[n]]; }));
      var submit = h("button", { class: "primary", disabled: true, onclick: judge }, bi("परीक्षताम्", "Check"));
      var body = h("div", {}, fL, fV, fN, submit);
      var panel = h("div", { class: "panel", role: "dialog", "aria-label": "Name this word" },
        h("p", { class: "big", style: "margin:0 0 6px", text: btn.textContent }),
        body);
      var ov = h("div", { class: "overlay", onclick: function (e) { if (e.target === ov) ov.remove(); } }, panel);
      document.body.appendChild(ov);
      fL.querySelector("select").focus();

      function val(f) { return f.querySelector("select").value; }
      function check() { submit.disabled = !(val(fL) && val(fV) && val(fN)); }

      function judge() {
        var cell = m.cell.split("."), g = VB.GENDER[m.cls];
        var ok = val(fL) === g && val(fV) === cell[0] && val(fN) === cell[1];
        ses.answered[i + ":" + k] = true;
        ses.total++; if (ok) ses.right++;
        S.record(m.cls + ":" + m.cell, ok, { hard: true });
        S.save();
        btn.classList.add(ok ? "ok" : "bad");
        btn.setAttribute("aria-label", btn.textContent + (ok ? ", answered correctly" : ", answered, see the correction"));
        updateNext();
        if (ok) { ov.remove(); return; }     // right: a quiet mark on the word, nothing more
        // wrong: show the answer and the full table, then carry on reading
        body.innerHTML = "";
        add(body, [
          h("p", { class: "verdict", style: "color:var(--kumkum)" }, icon("no"), "सम्यक् उत्तरम्"),
          h("p", { class: "ans", text: LINGA_SA[g] + ",  " + VB.cellLabel(m.cell) }),
          h("p", { class: "why", text: m.stem + " (" + VB.CLASS_SA[m.cls] + ")" }),
          h("div", { class: "peek" }, U.fullTable(w, [m.cell])),
          h("button", { class: "primary", onclick: function () { ov.remove(); } }, bi("अग्रे", "Carry on reading"))
        ]);
      }
    }

    function finish() {
      var at = Date.now();
      R().done[st.id] = { at: at, right: ses.right, total: ses.total };
      if (ses.total) S.finishDay(ses.total, ses.right); else S.save();
      show(
        h("div", { style: "height:30px" }),
        h("section", { class: "leaf center" },
          h("h2", { class: "sa", style: "font-weight:400;font-size:2.2rem;margin:0", text: "कथा समाप्ता।" }),
          h("p", { class: "sa", style: "font-size:1.4rem;margin:6px 0 0", text: st.title }),
          ses.total ? h("p", { class: "done-num", text: N(ses.right) + " / " + N(ses.total) }) : null,
          ses.total ? h("p", { class: "center", text: "marked words named correctly" }) : null),
        h("div", { style: "margin-top:20px" }, U.lampsRow()),
        h("div", { class: "stack" },
          h("button", { class: "primary", onclick: U.leave }, bi("कथाः", "All stories")),
          h("button", { class: "ghost", onclick: function () { reader(st); } }, "पुनः पठतु", h("small", { text: "Read again" }))));
    }
  }

  U.page("pathana", list);
})();
