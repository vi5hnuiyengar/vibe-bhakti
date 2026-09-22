/*
  app-read.js
  Page 2, पठनम्: reading a story line by line.

  The learner reads a short passage as plain text, then names the liṅga,
  vacana and vibhakti of its marked words, one at a time, with chips.
  Answering moves the story on; being right does not have to, so reading
  never turns into a test that stops the learner.

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
  //
  // Read first, answer second. A story comes in short passages of a few lines,
  // shown as plain text with nothing marked. After reading a passage the
  // learner taps once, and the app walks through that passage's marked words
  // one by one: only the current word is highlighted, and a compact panel of
  // chips asks for liṅga, vacana and vibhakti. Right answers move straight on.
  // =====================================================================

  // group lines into passages: at most four lines and about 220 characters
  function passagesOf(st) {
    var out = [], cur = [], len = 0;
    st.lines.forEach(function (l, i) {
      if (cur.length && (cur.length >= 4 || len + l.sa.length > 220)) { out.push(cur); cur = []; len = 0; }
      cur.push(i); len += l.sa.length;
    });
    if (cur.length) out.push(cur);
    return out;
  }

  var LINGA_SHORT = { m: "पुं.", f: "स्त्री.", n: "नपुं." };
  var VAC_SHORT = { eka: "एक.", dva: "द्वि.", bahu: "बहु." };

  function reader(st) {
    var parts = passagesOf(st);
    var ses = { pi: 0, right: 0, total: 0 };
    var head = h("div", {}), col = h("div", { class: "reader" }), dockBox = h("div", { class: "dock solid" }, h("div", { class: "dock-inner" }));
    var dockInner = dockBox.firstChild;

    function quit() {
      if (ses.total > 0 && !confirm("Leave this story? Your answers so far are saved.")) return;
      U.leave();
    }
    function drawHead() { head.innerHTML = ""; add(head, U.topBar(ses.pi, parts.length, quit)); }
    function setDock() {
      dockInner.innerHTML = "";
      add(dockInner, Array.prototype.slice.call(arguments));
      U.spaceBelow();
    }

    show(head,
      h("div", { class: "rtitle" }, h("h1", { class: "sa", text: st.title }), h("p", { text: st.source || "" })),
      col, dockBox);
    drawHead();
    addPassage(0);

    // ---------- one passage, as plain flowing text ----------
    function addPassage(pi) {
      var idx = parts[pi], words = [], glosses = [];
      var text = h("p", { class: "rtext sa" + (reduceMotion() ? "" : " enter") });
      idx.forEach(function (li) {
        var line = st.lines[li], marks = {};
        (line.marks || []).forEach(function (m) { marks[m.tok] = m; });
        line.sa.split(" ").forEach(function (t, k) {
          var span = h("span", { class: "rw", text: t });
          if (marks[k]) words.push({ el: span, m: marks[k] });
          add(text, [span, " "]);
        });
        glosses.push(line.en);
      });
      var mean = h("div", { class: "rmean", hidden: true }, glosses.map(function (g) { return h("p", { text: g }); }));
      var card = h("section", { class: "rpass" }, text,
        h("button", { class: "linkbtn small", onclick: function () { mean.hidden = !mean.hidden; } }, "अर्थः", h("small", { text: "Meaning" })),
        mean);
      col.appendChild(card);
      if (pi > 0) U.keepInView(card);

      if (words.length) {
        setDock(h("button", { class: "primary", onclick: function () { answer(card, words, 0, 0); } },
          bi("प्रश्नाः  " + N(words.length), words.length === 1 ? "Name 1 word" : "Name " + words.length + " words")));
      } else finishPassage(card, 0, 0);
    }

    // ---------- answering: one marked word at a time ----------
    function answer(card, words, i, right) {
      if (i >= words.length) return finishPassage(card, right, words.length);
      var wd = words[i], m = wd.m, pick = { g: null, n: null, v: null };
      card.querySelectorAll(".rw.cur").forEach(function (e) { e.classList.remove("cur"); });
      wd.el.classList.add("cur");
      wd.el.setAttribute("aria-current", "true");

      var check = h("button", { class: "primary", disabled: true, onclick: function () { judge(false); } }, bi("परीक्षताम्", "Check"));
      function chip(label, key, val) {
        return h("button", { class: "achip", "aria-pressed": "false", "data-k": key, "data-v": val, onclick: function (e) {
          pick[key] = val;
          panel.querySelectorAll('.achip[data-k="' + key + '"]').forEach(function (b) { b.setAttribute("aria-pressed", b === e.currentTarget ? "true" : "false"); });
          check.disabled = !(pick.g && pick.n && pick.v);
        } }, label);
      }
      var vacs = VB.SHOWN_VACS || VB.VACS;
      var panel = h("div", { class: "apanel", role: "group", "aria-label": "Name the marked word" },
        h("div", { class: "arow top" },
          h("div", { class: "agroup" }, ["m", "f", "n"].map(function (g) { return chip(LINGA_SHORT[g], "g", g); })),
          h("div", { class: "agroup" }, vacs.map(function (n) { return chip(VAC_SHORT[n], "n", n); }))),
        h("div", { class: "arow vibs" }, VB.VIBS.map(function (v) { return chip(VB.VIB_SA[v], "v", v); })),
        h("div", { class: "aact" },
          h("button", { class: "linkbtn small", onclick: function () { judge(true); } }, "न जानामि", h("small", { text: "Show me" })),
          h("span", { class: "acount", text: N(i + 1) + " / " + N(words.length) })),
        check);
      setDock(panel);
      U.keepInView(wd.el);   // after the panel is in place, so the word sits above it

      function judge(gaveUp) {
        var cell = m.cell.split("."), g = VB.GENDER[m.cls];
        var ok = !gaveUp && pick.g === g && pick.v === cell[0] && pick.n === cell[1];
        ses.total++; if (ok) { ses.right++; right++; }
        S.record(m.cls + ":" + m.cell, ok, { hard: true });
        S.save();
        wd.el.removeAttribute("aria-current");
        var correct = LINGA_SA[g] + ",  " + VB.cellLabel(m.cell);
        if (ok) {
          // a quiet confirmation, then straight on
          setDock(h("div", { class: "apanel done" }, h("p", { class: "averdict ok" }, icon("ok"), "साधु  ", h("span", { class: "sa", text: wd.el.textContent }))));
          setTimeout(function () { wd.el.classList.remove("cur"); answer(card, words, i + 1, right); }, reduceMotion() ? 250 : 650);
          return;
        }
        var w = VB.BY_STEM[m.stem], tbl = h("div", { class: "peek", hidden: true }, U.fullTable(w, [m.cell]));
        setDock(h("div", { class: "apanel done" },
          h("p", { class: "averdict bad" }, icon("no"), h("span", { class: "sa", text: wd.el.textContent })),
          h("p", { class: "ans sa", text: correct }),
          h("p", { class: "why", text: m.stem + " (" + VB.CLASS_SA[m.cls] + ")" }),
          h("button", { class: "linkbtn small", onclick: function () { tbl.hidden = !tbl.hidden; U.spaceBelow(); } }, "सारणी", h("small", { text: "Table" })),
          tbl,
          h("button", { class: "primary", onclick: function () { wd.el.classList.remove("cur"); answer(card, words, i + 1, right); } }, bi("अग्रे", "Next"))));
      }
    }

    // ---------- after a passage ----------
    function finishPassage(card, right, total) {
      card.querySelectorAll(".rw.cur").forEach(function (e) { e.classList.remove("cur"); });
      var last = ses.pi >= parts.length - 1;
      setDock(
        total ? h("p", { class: "ascore sa", text: N(right) + " / " + N(total) + "  सम्यक्" }) : null,
        h("button", { class: "primary", onclick: function () {
          if (last) return finish();
          card.classList.add("past");
          ses.pi++;
          drawHead();
          addPassage(ses.pi);
        } }, bi(last ? "समाप्तम्" : "अग्रिमः भागः", last ? "Finish" : "Next passage")));
    }

    function finish() {
      R().done[st.id] = { at: Date.now(), right: ses.right, total: ses.total };
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
