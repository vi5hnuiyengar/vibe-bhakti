/*
  app-script.js
  Page 3, लिपिः: learning to read Devanagari.

  Same shape as the daily drill so there is one interaction model to learn:
  twelve questions, a hint button, the feedback panel, "अग्रे". Letters have
  their own lamps and their own skill map (S.lipi), and open in the stages
  set out in lipi.js.
*/
(function () {
  "use strict";
  var VB = window.VB, S = VB.Store, U = VB.UI;
  var h = U.h, add = U.add, show = U.show, bi = U.bi, icon = U.icon, dock = U.dock, N = VB.num;
  var sess = null, timer = null;
  var HARD = { write: 1, word: 1, find: 1 };

  function L() { return S.state.lipi; }
  function stop() { if (timer) { clearInterval(timer); timer = null; } }
  function openKeys() { return VB.lipiOpen().map(function (c) { return "lipi:" + c; }); }

  // =====================================================================
  // PAGE ROOT
  // =====================================================================
  function page() {
    stop(); sess = null;
    var stage = L().unlocked || 1, stages = VB.LIPI_STAGES.length, cur = VB.LIPI_STAGES[stage - 1];
    var done = S.doneToday("lipi");
    var inPlay = h("div", { class: "chiprow" });
    VB.lipiOpen().filter(function (c) { return !VB.BY_CHAR[c].parts || cur.add.indexOf(c) >= 0; }).forEach(function (c) {
      var lv = S.level("lipi:" + c, L().skills);
      add(inPlay, h("span", { class: "ldot l" + lv, title: VB.translit(VB.lipiKind(c) === "matra" || VB.lipiKind(c) === "mark" ? "क" + c : c), text: VB.lipiKind(c) === "matra" ? "◌" + c : c }));
    });
    show(
      h("div", { class: "topline" }, h("span"),
        h("button", { class: "iconbtn", "aria-label": "Settings", onclick: function () { VB.Settings.open(); } }, icon("gear"))),
      h("h1", { class: "title", text: "लिपिः" }),
      h("p", { class: "tagline", text: "Learn to read Devanagari, a few minutes a day." }),
      U.lampsRow(S.lastDays(7, "lipi"), S.streak("lipi")),
      h("section", { class: "leaf today" },
        h("h2", { text: done ? "अद्य समाप्तम्" : "अद्यतनः लिपि-अभ्यासः" }),
        h("p", { text: done ? "Today's script practice is done. Practise more if you like." : "Twelve questions on letters, vowel signs and conjuncts." }),
        h("button", { class: "primary", onclick: function () { U.enter(start); } }, bi(done ? "पुनः अभ्यासः" : "आरभताम्", done ? "Practise again" : "Start"))),
      h("section", { class: "leaf pickcard" },
        h("h2", { text: "सोपानम् " + N(stage) + " / " + N(stages) }),
        h("p", { class: "sa", style: "font-size:1.25rem;color:var(--ink)", text: cur.label }),
        h("p", { text: stage < stages ? "Letters in play. The next set opens when these are steady." : "Every letter, vowel sign and conjunct is open." }),
        inPlay),
      h("div", { class: "modes" },
        U.modeBtn("वे", "वेग-अभ्यासः", "60 seconds. Is this letter read like this?", function () { U.enter(startSpeed); }))
    );
  }

  // =====================================================================
  // SESSION
  // =====================================================================
  function start() {
    var plan = S.planSkills(12, { keys: openKeys(), map: L().skills });
    sess = { plan: plan, i: 0, right: 0, total: 0, last: null };
    next();
  }
  function quit() {
    if (sess && sess.total > 0 && !confirm("Leave this practice? Answers so far are saved.")) return;
    U.leave();
  }
  function next() {
    if (sess.i >= sess.plan.length) return finish();
    var key = sess.plan[sess.i].skill, ch = key.slice(5);
    var q = VB.makeLipiQuestion(ch, S.level(key, L().skills), sess.last);
    if (!q) { sess.i++; return next(); }
    sess.last = q.kindName;
    ask(q);
  }

  function promptView(q) {
    var p = q.prompt;
    if (p.latin) return h("p", { class: "big latin", text: p.latin });
    if (p.parts) return h("p", { class: "big" }, p.parts.map(function (a, i) { return h("span", { class: i === p.mark ? "mark" : null, text: a }); }));
    return h("p", { class: "big", text: p.big });
  }

  function ask(q) {
    var chosen = null, answered = false;
    var hintBox = h("div", { class: "hint", hidden: true });
    var hintBtn = q.hint && q.hint.rule ? h("button", { class: "hintbtn", onclick: function () {
      hintBox.hidden = false; add(hintBox, h("p", { text: q.hint.rule })); hintBtn.disabled = true; q.hintUsed = true;
    } }, "सङ्केतः", h("small", { text: "Hint" })) : null;
    var card = h("section", { class: "leaf" },
      h("div", { class: "qhead" }, h("p", { class: "instr", text: q.instr }), hintBtn),
      promptView(q), hintBox);
    var latin = q.kindName === "read" || q.kindName === "word";
    var check = h("button", { class: "primary", disabled: true, onclick: judge }, bi("परीक्षताम्", "Check"));
    var area = h("div", { class: "options two" }, q.options.map(function (o, i) {
      return h("button", { class: "opt" + (latin ? " latin" : ""), "aria-pressed": "false", onclick: function () {
        if (answered) return;
        chosen = i;
        area.querySelectorAll(".opt").forEach(function (b, j) { b.setAttribute("aria-pressed", j === i ? "true" : "false"); });
        check.disabled = false;
      } }, o.text);
    }));
    show(U.topBar(sess.i, sess.plan.length, quit), card, area, dock(check));

    function judge() {
      if (answered) return; answered = true;
      var ok = !!q.options[chosen].correct;
      area.querySelectorAll(".opt").forEach(function (b, j) {
        if (q.options[j].correct) b.classList.add("right"); else if (j === chosen) b.classList.add("wrong");
      });
      S.record(q.skill, ok, { store: "lipi", hint: q.hintUsed, hard: HARD[q.kindName] });
      S.save();
      sess.total++; if (ok) sess.right++;
      var body = [];
      if (!ok) body.push(h("p", { class: "ans" + (latin ? " latin" : "") }, h("small", { text: "सम्यक् उत्तरम्" }), q.answerText));
      body.push(h("p", { class: "why", text: q.why }));
      var note = VB.BY_CHAR[q.ch] && VB.BY_CHAR[q.ch].note;
      if (note) body.push(h("p", { class: "note", text: note }));
      if (q.meaning) body.push(h("p", { class: "note", text: "Meaning: " + q.meaning }));
      U.sheet(ok, body, null, null, null, function () { sess.i++; next(); });
    }
  }

  function finish() {
    var total = sess.total, right = sess.right;
    S.finishDay(total, right, "lipi");
    var opened = S.tryUnlockLipi(openKeys(), VB.LIPI_STAGES.length);
    show(
      h("div", { style: "height:30px" }),
      h("section", { class: "leaf center" },
        h("h2", { class: "sa", style: "font-weight:400;font-size:2.2rem;margin:0", text: right / Math.max(1, total) >= 0.8 ? "साधु!" : "प्रयत्नः फलति।" }),
        h("p", { class: "done-num", text: N(right) + " / " + N(total) }),
        h("p", { class: "center", text: "questions right" }),
        opened ? h("div", { class: "hint", style: "text-align:left" },
          h("p", { class: "sa", style: "font-size:1.3rem", text: "नूतनम्: " + VB.LIPI_STAGES[opened - 1].label }),
          h("p", { text: "New letters are open. They will appear in your next practice." })) : null),
      h("div", { style: "margin-top:20px" }, U.lampsRow(S.lastDays(7, "lipi"), S.streak("lipi"))),
      h("div", { class: "stack" },
        h("button", { class: "primary", onclick: U.leave }, bi("लिपिः", "Back")),
        h("button", { class: "ghost", onclick: start }, "पुनः अभ्यासः", h("small", { text: "Practise again" }))));
    sess = null;
  }

  // =====================================================================
  // SPEED ROUND: is this letter read like this?
  // =====================================================================
  function startSpeed() {
    var left = 60, score = 0, tries = 0, cur = null;
    var bar = h("i", { style: "width:100%" }), card = h("section", { class: "leaf" }), scoreEl = h("span", { class: "count", text: N(0) });
    var chars = VB.lipiOpen().filter(function (c) { var k = VB.lipiKind(c); return k === "cons" || k === "vowel" || k === "conj"; });
    show(
      h("div", { class: "bar" },
        h("button", { class: "iconbtn", "aria-label": "Leave", onclick: function () { stop(); U.leave(); } }, icon("close")),
        h("div", { class: "track" }, bar), scoreEl),
      card,
      h("div", { class: "options tfrow" },
        h("button", { class: "opt", onclick: function () { answer(true); } }, "सत्यम्"),
        h("button", { class: "opt", onclick: function () { answer(false); } }, "असत्यम्")),
      h("p", { class: "center muted", style: "margin-top:16px", text: "Is the letter read the way it says? Tap as fast as you can." }));
    item();
    timer = setInterval(function () { left--; bar.style.width = (left / 60 * 100) + "%"; if (left <= 0) { stop(); end(); } }, 1000);
    function item() {
      var ch = VB.pick(chars), truth = Math.random() < 0.5, claim = VB.translit(ch);
      if (!truth) {
        var conf = (VB.BY_CHAR[ch].conf || "").split(" ").filter(function (c) { return VB.BY_CHAR[c] && VB.translit(c) && VB.translit(c) !== claim; });
        if (conf.length) claim = VB.translit(VB.pick(conf)); else truth = true;
      }
      cur = { truth: truth };
      card.innerHTML = "";
      add(card, [h("p", { class: "big", style: "margin-top:4px", text: ch }), h("p", { class: "claim latin", text: claim })]);
    }
    function answer(v) {
      if (!cur || left <= 0) return;
      tries++; if (v === cur.truth) score++;
      scoreEl.textContent = N(score);
      card.classList.remove("flash-right", "flash-wrong"); void card.offsetWidth;
      card.classList.add(v === cur.truth ? "flash-right" : "flash-wrong");
      item();
    }
    function end() {
      var best = S.state.best.lipi || 0, isBest = score > best;
      if (isBest) { S.state.best.lipi = score; S.save(); }
      show(
        h("div", { style: "height:30px" }),
        h("section", { class: "leaf center" },
          h("h2", { class: "sa", style: "font-weight:400;font-size:2.2rem;margin:0", text: isBest ? "नूतनः विक्रमः!" : "समयः समाप्तः" }),
          h("p", { class: "done-num", text: N(score) }),
          h("p", { class: "center", text: "right out of " + tries + (isBest ? ". A new personal best." : ". Your best is " + best + ".") })),
        h("div", { class: "stack" },
          h("button", { class: "primary", onclick: startSpeed }, bi("पुनः", "Play again")),
          h("button", { class: "ghost", onclick: U.leave }, "लिपिः", h("small", { text: "Back" }))));
    }
  }

  U.page("lipi", page);
})();
