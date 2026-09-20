/*
  Screens and session flow.
  Home -> daily practice (12 questions + 2 tables, about five minutes)
       -> table practice, speed round, all forms (reference), settings
*/
(function () {
  var VB = window.VB, S = VB.Store, $app = document.getElementById("app");
  var sess = null, timer = null;

  // ---------- tiny DOM helper ----------
  function h(tag, a) {
    var el = document.createElement(tag);
    if (a) for (var k in a) {
      var v = a[k];
      if (v == null || v === false) continue;
      if (k === "class") el.className = v;
      else if (k === "text") el.textContent = v;
      else if (k === "html") el.innerHTML = v;
      else if (k.indexOf("on") === 0) el.addEventListener(k.slice(2), v);
      else el.setAttribute(k, v === true ? "" : v);
    }
    for (var i = 2; i < arguments.length; i++) add(el, arguments[i]);
    return el;
  }
  function add(el, c) {
    if (c == null || c === false) return;
    if (Array.isArray(c)) { c.forEach(function (x) { add(el, x); }); return; }
    el.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
  }
  function show() {
    $app.innerHTML = ""; add($app, Array.prototype.slice.call(arguments)); window.scrollTo(0, 0);
    var d = $app.querySelector(".dock");
    $app.style.paddingBottom = d ? (d.offsetHeight + 24) + "px" : "";
  }
  function bi(sa, en) { return [h("span", { class: "sa", text: sa }), en ? h("small", { text: en }) : null]; }
  var N = VB.num;

  var ICON = {
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>',
    gear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3.2"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1"/></svg>',
    ok: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M7 12.5l3.2 3.2L17 9"/></svg>',
    no: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M8.5 8.5l7 7M15.5 8.5l-7 7"/></svg>'
  };
  function icon(name) { return h("span", { html: ICON[name], "aria-hidden": "true", style: "display:grid" }); }
  function lampSvg(on) {
    return '<svg viewBox="0 0 30 36" aria-hidden="true">' +
      '<path class="flame" d="M15 3c3.2 4.6 4.4 8.2 0 12.6C10.6 11.2 11.8 7.6 15 3z" ' + (on ? "" : 'stroke="#7A5A3C" stroke-width="1.3"') + '/>' +
      '<path class="bowl" d="M2.5 19h25c-.8 7-5.9 11.5-12.5 11.5S3.3 26 2.5 19z"/>' +
      '<rect class="bowl" x="10" y="31" width="10" height="3" rx="1.5"/></svg>';
  }
  var DOW = ["र", "सो", "मं", "बु", "गु", "शु", "श"];

  function applyScale() { document.documentElement.style.setProperty("--scale", S.state.settings.scale || 1); }
  applyScale();

  // ---------- navigation (the phone's back button returns home) ----------
  function enter(fn) { history.pushState({ vb: 1 }, ""); fn(); }
  function leave() { if (history.state && history.state.vb) history.back(); else home(); }
  window.addEventListener("popstate", function () { home(); });

  function lampsRow(dark) {
    var days = S.lastDays(7), st = S.streak();
    return h("div", { class: "lamps" },
      days.map(function (d) {
        return h("div", { class: "lamp" + (d.done ? "" : " off"), title: d.date },
          h("span", { html: lampSvg(d.done) }), h("span", { class: "sa", text: DOW[d.dow] }));
      }),
      h("div", { class: "streak" }, h("b", { text: N(st) }), h("span", { class: "sa", text: st === 1 ? "दिनम्" : "दिनानि" }),
        h("div", { style: "font-size:.78rem", text: "in a row" })));
  }

  // =====================================================================
  // HOME
  // =====================================================================
  function home() {
    stopTimer(); sess = null;
    var st = S.state, done = S.doneToday(), vibs = S.unlockedVibs();
    var grid = h("div", { class: "grid", "aria-label": "Progress for every class and vibhakti" },
      h("span"), VB.VIBS.map(function (v) { return h("span", { class: "h", text: VB.VIB_SHORT[v] }); }));
    VB.CLASSES.forEach(function (cls) {
      add(grid, h("span", { class: "rowlab", text: VB.MODEL[cls] }));
      VB.VIBS.forEach(function (v) {
        var open = vibs.indexOf(v) >= 0;
        var lv = Math.min(S.level(cls + ":" + v + ".eka"), S.level(cls + ":" + v + ".bahu"));
        var lvMax = Math.max(S.level(cls + ":" + v + ".eka"), S.level(cls + ":" + v + ".bahu"));
        var shown = lv || (lvMax ? 1 : 0);
        add(grid, h("span", { class: "dot" + (open ? " l" + shown : " locked"), title: VB.VIB_SA[v] + ", " + VB.MODEL[cls] }));
      });
    });
    var next = S.state.unlocked < VB.CLUSTERS.length && !st.settings.all
      ? "The next vibhakti opens once every box here has been practised and about 3 in 4 answers are right." : "All vibhaktis are open.";

    show(
      h("div", { class: "topline" }, h("span"),
        h("button", { class: "iconbtn", "aria-label": "Settings", onclick: settings }, icon("gear"))),
      h("h1", { class: "title", text: "विभक्तिः" }),
      h("p", { class: "tagline", text: "A few minutes of practice every day." }),
      lampsRow(),
      h("section", { class: "leaf today" },
        h("h2", { text: done ? "अद्य अभ्यासः समाप्तः" : "अद्यतनः अभ्यासः" }),
        h("p", { text: done ? "Today's practice is done. Come back tomorrow, or practise a little more now." : "About five minutes. Twelve questions and two tables." }),
        h("button", { class: "primary", onclick: function () { enter(startDaily); } }, bi(done ? "पुनः अभ्यासः" : "आरभताम्", done ? "Practise again" : "Start"))),
      h("div", { class: "modes" },
        modeBtn("सा", "सारणी-अभ्यासः", "Fill in whole tables from memory", function () { enter(startTables); }),
        modeBtn("वे", "वेग-अभ्यासः", "60 seconds. True or false, as fast as you can", function () { enter(startSpeed); }),
        modeBtn("रू", "रूपावलिः", "See every form of every word", function () { enter(reference); })),
      h("h3", { class: "section", text: "प्रगतिः" }),
      h("p", { class: "progress-note" }, "Practising now: ", h("span", { class: "sa", text: vibs.map(function (v) { return VB.VIB_SA[v]; }).join(", ") }), ". " + next),
      grid,
      h("div", { class: "legend" },
        h("span", {}, h("i", { style: "background:#6E5236" }), "started"),
        h("span", {}, h("i", { style: "background:#9C7A45" }), "practising"),
        h("span", {}, h("i", { style: "background:#C9A55C" }), "strong"),
        h("span", {}, h("i", { style: "background:#F0E0B6" }), "mastered")),
      st.total.q ? h("p", { class: "progress-note", style: "margin-top:16px" }, "Answers so far: ",
        h("span", { class: "sa", text: N(st.total.c) + " / " + N(st.total.q) }), " correct.") : null
    );
  }
  function modeBtn(glyph, sa, en, fn) {
    return h("button", { class: "mode", onclick: fn },
      h("span", { class: "glyph", "aria-hidden": "true", text: glyph }),
      h("span", {}, h("b", { text: sa }), h("span", { text: en })));
  }

  // =====================================================================
  // SESSION SET-UP
  // =====================================================================
  function ctx(level) { return { cells: S.unlockedCells(), level: level || 1 }; }

  function pendingIntro() {
    var st = S.state;
    if (st.settings.all || st.introduced >= st.unlocked) return null;
    var v = []; VB.CLUSTERS.slice(st.introduced, st.unlocked).forEach(function (c) { v = v.concat(c); });
    return v;
  }
  function tableSize(which) {
    var lv = S.overallLevel();
    if (which === 0) return lv < 1.5 ? "small" : lv < 2.5 ? "rows" : "column";
    return lv < 1 ? "small" : lv < 2 ? "rows" : lv < 3 ? "large" : "full";
  }

  function startDaily() {
    var plan = S.planSkills(12), steps = [];
    var iv = pendingIntro();
    if (iv) steps.push({ kind: "intro", vibs: iv });
    plan.forEach(function (p, i) {
      steps.push({ kind: "q", p: p });
      if (i === 3) steps.push({ kind: "table", size: tableSize(0) });
    });
    steps.splice(steps.length - 2, 0, { kind: "table", size: tableSize(1) });
    sess = { mode: "daily", steps: steps, i: 0, right: 0, total: 0, missed: [], lastType: null, retried: false };
    nextStep();
  }
  function startTables() {
    var sizes = ["small", "rows", "column", "large", "full"], order = VB.shuffle(VB.CLASSES);
    var steps = sizes.map(function (s, i) { return { kind: "table", size: s, cls: order[i % 4] }; });
    sess = { mode: "tables", steps: steps, i: 0, right: 0, total: 0, cellsRight: 0, cellsTotal: 0, missed: [] };
    nextStep();
  }

  // weighted choice of question type by how well the skill is known
  var TYPES = {
    low: { identify: 2, form: 3, analogy: 2, sentence: 3, lemma: 1, tf: 1 },
    mid: { form: 2, sentence: 4, tiles: 2, flip: 2, kim: 2, analogy: 1, identify: 1, error: 1, odd: 1, match: 1 },
    high: { sentence: 4, stiles: 2, tiles: 3, error: 3, kim: 2, odd: 1, flip: 1, match: 1, analogy: 1, lemma: 1 }
  };
  var GEN = {
    identify: function (c, cell, x) { return VB.genIdentify(c, cell, x); },
    form: function (c, cell, x) { return VB.genForm(c, cell, x, false); },
    tiles: function (c, cell, x) { return VB.genForm(c, cell, x, true); },
    analogy: function (c, cell, x) { return VB.genAnalogy(c, cell, x); },
    sentence: function (c, cell, x) { return VB.genSentence(c, cell, x, false); },
    stiles: function (c, cell, x) { return VB.genSentence(c, cell, x, true); },
    kim: function (c, cell, x) { return VB.genKim(c, cell, x); },
    error: function (c, cell, x) { return VB.genError(c, cell, x); },
    flip: function (c, cell, x) { return VB.genFlip(c, cell, x); },
    odd: function (c, cell, x) { return VB.genOdd(c, cell, x); },
    lemma: function (c, cell, x) { return VB.genLemma(c, cell, x); },
    match: function (c, cell, x) { return VB.genMatch(x); },
    tf: function (c, cell, x) { return VB.genTF(c, cell, x); }
  };
  var HARD = { tiles: 1, stiles: 1, error: 1, kim: 1, table: 1 };

  function makeQuestion(p, avoid) {
    var lv = S.level(p.skill);
    var W = lv <= 1 ? TYPES.low : lv === 2 ? TYPES.mid : TYPES.high;
    var c = ctx(lv <= 1 ? 1 : lv === 2 ? 2 : 3);
    var names = Object.keys(W).filter(function (t) { return t !== sess.lastType && t !== avoid; });
    for (var tries = 0; tries < 8 && names.length; tries++) {
      var total = names.reduce(function (a, t) { return a + W[t]; }, 0), r = Math.random() * total, t = names[0];
      for (var i = 0; i < names.length; i++) { r -= W[names[i]]; if (r <= 0) { t = names[i]; break; } }
      var q = GEN[t](p.cls, p.cell, c);
      if (q) { q.kindName = t; return q; }
      names = names.filter(function (x) { return x !== t; });
    }
    var fall = ["sentence", "form", "identify", "tf"];
    for (var j = 0; j < fall.length; j++) { var f = GEN[fall[j]](p.cls, p.cell, c); if (f) { f.kindName = fall[j]; return f; } }
    return null;
  }

  function stepCount() { return sess.steps.filter(function (s) { return s.kind !== "intro"; }).length; }
  function stepIndex() { return sess.steps.slice(0, sess.i).filter(function (s) { return s.kind !== "intro"; }).length; }

  function nextStep() {
    if (!sess) return home();
    if (sess.i >= sess.steps.length) {
      // one more look at what went wrong, in a new form and with a new word
      if (sess.mode === "daily" && !sess.retried && sess.missed.length) {
        sess.retried = true;
        var seen = {};
        sess.missed.forEach(function (m) {
          if (seen[m.skill] || Object.keys(seen).length >= 3) return;
          seen[m.skill] = 1;
          sess.steps.push({ kind: "q", p: { skill: m.skill, cls: m.skill.split(":")[0], cell: m.skill.split(":")[1] }, avoid: m.type, retry: true });
        });
        return nextStep();
      }
      return finish();
    }
    var st = sess.steps[sess.i];
    if (st.kind === "intro") return showIntro(st.vibs);
    if (st.kind === "table") {
      var tq = VB.genTable(st.cls || S.weakClass(), ctx(), st.size);
      if (!tq) { sess.i++; return nextStep(); }
      return showTable(tq);
    }
    var q = makeQuestion(st.p, st.avoid);
    if (!q) { sess.i++; return nextStep(); }
    q.retry = st.retry;
    sess.lastType = q.kindName;
    showQuestion(q);
  }

  function topBar() {
    var n = stepCount(), i = stepIndex();
    return h("div", { class: "bar" },
      h("button", { class: "iconbtn", "aria-label": "Leave practice", onclick: quit }, icon("close")),
      h("div", { class: "track", role: "progressbar", "aria-valuemin": 0, "aria-valuemax": n, "aria-valuenow": i },
        h("i", { style: "width:" + Math.round(100 * i / Math.max(1, n)) + "%" })),
      h("span", { class: "count", text: N(Math.min(i + 1, n)) + "/" + N(n) }));
  }
  function quit() {
    if (sess && sess.total > 0 && !confirm("Leave this practice? Answers so far are saved.")) return;
    leave();
  }

  // =====================================================================
  // INTRO (shown when a new vibhakti opens)
  // =====================================================================
  function showIntro(vibs) {
    var blocks = vibs.map(function (v) {
      var tbl = h("table", { class: "dtable" },
        h("thead", {}, h("tr", {}, h("th", { class: "rh", text: "" }), h("th", { text: "एकवचनम्" }), h("th", { text: "बहुवचनम्" }))),
        h("tbody", {}, VB.CLASSES.map(function (cls) {
          var P = VB.decline(VB.MODEL[cls], cls);
          return h("tr", {}, h("th", { class: "rh", text: VB.MODEL[cls] }), h("td", { text: P[v + ".eka"] }), h("td", { text: P[v + ".bahu"] }));
        })));
      return h("div", { style: "margin-bottom:22px" },
        h("div", { class: "wordhead", style: "text-align:left" }, h("b", { text: VB.VIB_SA[v] })),
        h("p", { class: "intro-use", text: VB.INTRO[v].use }),
        h("p", { class: "intro-ex", text: VB.INTRO[v].ex }),
        tbl);
    });
    show(
      h("div", { class: "bar" },
        h("button", { class: "iconbtn", "aria-label": "Leave practice", onclick: quit }, icon("close")),
        h("span", { class: "muted", text: "New in your practice" })),
      h("section", { class: "leaf" },
        h("p", { class: "instr", text: "Read these once. The practice will teach the rest." }),
        blocks),
      dock(h("button", { class: "primary", onclick: function () { S.state.introduced = S.state.unlocked; S.save(); sess.i++; nextStep(); } }, bi("अवगतम्", "Got it")))
    );
  }

  function dock(btn, above, solid) { return h("div", { class: "dock" + (solid ? " solid" : "") }, h("div", { class: "dock-inner" }, above || null, btn)); }

  // =====================================================================
  // QUESTION SCREEN
  // =====================================================================
  function showQuestion(q) {
    var chosen = null, picks = {}, built = [], checkBtn, area, answered = false;

    // hint: meaning or pattern first, rule second
    var hints = [q.hint.meaning || q.hint.pattern, q.hint.rule].filter(Boolean);
    var hintBox = h("div", { class: "hint", hidden: true }), hintN = 0;
    var hintBtn = hints.length ? h("button", { class: "hintbtn", onclick: function () {
      if (hintN >= hints.length) return;
      if (hintN === 0) hintBox.hidden = false;
      add(hintBox, h("p", { text: hints[hintN] }));
      hintN++; q.hintUsed = true;
      if (hintN >= hints.length) hintBtn.disabled = true;
    } }, "सङ्केतः", h("small", { text: "Hint" })) : null;

    var card = h("section", { class: "leaf" },
      h("div", { class: "qhead" }, h("p", { class: "instr", text: q.instr }), hintBtn),
      promptView(q), hintBox);

    checkBtn = h("button", { class: "primary", disabled: true, onclick: check }, bi("परीक्षताम्", "Check"));
    function ready(on) { checkBtn.disabled = !on; }

    // ---- interaction area by kind ----
    if (q.ui === "mcq" || q.ui === "tf" || q.ui === "multi") {
      var opts = q.ui === "tf" ? [{ text: "सत्यम्", correct: q.truth }, { text: "असत्यम्", correct: !q.truth }] : q.options;
      q._opts = opts;
      var long = opts.some(function (o) { return o.text.length > 14; });
      area = h("div", { class: "options" + (q.ui === "tf" ? " tfrow" : (!long && opts.length === 4 ? " two" : "")) },
        opts.map(function (o, i) {
          return h("button", { class: "opt" + (q.ui === "multi" ? " multi" : "") + (o.text.length > 18 ? " small" : ""), "aria-pressed": "false",
            onclick: function (e) {
              if (answered) return;
              if (q.ui === "multi") { picks[i] = !picks[i]; e.currentTarget.setAttribute("aria-pressed", picks[i] ? "true" : "false"); ready(Object.keys(picks).some(function (k) { return picks[k]; })); }
              else { chosen = i; area.querySelectorAll(".opt").forEach(function (b, j) { b.setAttribute("aria-pressed", j === i ? "true" : "false"); }); ready(true); }
            } }, o.text);
        }));
    } else if (q.ui === "tiles") {
      var line = h("div", { class: "answer-line", "aria-label": "Your answer" });
      var tiles = h("div", { class: "tiles" });
      q.tiles.forEach(function (t, i) {
        var tb = h("button", { class: "tile", onclick: function () {
          if (answered) return;
          tb.classList.add("used");
          var placed = h("button", { class: "tile", onclick: function () {
            if (answered) return;
            placed.remove(); tb.classList.remove("used");
            built = built.filter(function (b) { return b.el !== placed; }); ready(built.length > 0);
          } }, t);
          built.push({ t: t, el: placed }); line.appendChild(placed); ready(true);
        } }, t);
        tiles.appendChild(tb);
      });
      area = h("div", {}, line, tiles);
    } else if (q.ui === "tokens") {
      var sent = h("p", { class: "sentence" }), allBtn;
      var choose = function (i, el) {
        chosen = i;
        card.querySelectorAll(".tok").forEach(function (b) { b.setAttribute("aria-pressed", "false"); });
        allBtn.setAttribute("aria-pressed", "false");
        el.setAttribute("aria-pressed", "true"); ready(true);
      };
      q.tokens.forEach(function (tok, i) {
        if (tok.cand) {
          add(sent, h("button", { class: "tok", "aria-pressed": "false", onclick: function (e) { if (answered) return; choose(i, e.currentTarget); } }, tok.text));
        } else add(sent, h("span", { text: tok.text }));
        add(sent, " ");
      });
      card.insertBefore(sent, hintBox);
      allBtn = h("button", { class: "opt", "aria-pressed": "false", onclick: function (e) { if (answered) return; choose("all", e.currentTarget); } }, "सर्वं सम्यक्");
      area = h("div", { class: "options" }, allBtn);
    } else if (q.ui === "match") {
      return showMatch(q, card);
    }

    show(topBar(), card, area, dock(checkBtn));

    function check() {
      if (answered) return; answered = true;
      var ok = false, chosenTag = null, extra = null;
      if (q.ui === "mcq" || q.ui === "tf") {
        var o = q._opts[chosen]; ok = !!o.correct; chosenTag = o.tag;
        area.querySelectorAll(".opt").forEach(function (b, j) {
          if (q._opts[j].correct) b.classList.add("right"); else if (j === chosen) b.classList.add("wrong");
        });
      } else if (q.ui === "multi") {
        ok = q._opts.every(function (o, j) { return !!o.correct === !!picks[j]; });
        area.querySelectorAll(".opt").forEach(function (b, j) {
          if (q._opts[j].correct) b.classList.add("right"); else if (picks[j]) b.classList.add("wrong");
        });
      } else if (q.ui === "tiles") {
        var got = built.map(function (b) { return b.t; }).join("");
        ok = got === q.answer; chosenTag = q.diagnose[got];
        if (!ok) extra = got;
        built.forEach(function (b) { b.el.style.borderColor = ok ? "var(--green)" : "var(--kumkum)"; });
      } else if (q.ui === "tokens") {
        ok = chosen === "all" ? q.allCorrect : !!q.tokens[chosen].wrong;
        chosenTag = q.tag;
        card.querySelectorAll(".tok").forEach(function (b) {
          var t = q.tokens.filter(function (x) { return x.cand; })[Array.prototype.indexOf.call(card.querySelectorAll(".tok"), b)];
          if (t.wrong) b.classList.add("wrong");
        });
        if (q.allCorrect) area.querySelector(".opt").classList.add("right");
      }
      var skills = q.skills || [q.skill];
      skills.forEach(function (sk) { if (sk) S.record(sk, ok, { hint: q.hintUsed, hard: HARD[q.kindName] }); });
      S.save();
      tally(ok, q);
      feedback(q, ok, chosenTag, extra);
    }
  }

  function promptView(q) {
    var p = q.prompt || {}, out = [];
    if (p.pairs) {
      out.push(h("div", { class: "analogy" },
        h("span", { text: p.pairs[0][0] }), h("span", { class: "arrow", text: "→" }), h("span", { text: p.pairs[0][1] }),
        h("span", { text: p.pairs[1][0] }), h("span", { class: "arrow", text: "→" }), h("span", { class: "q", text: "?" })));
      if (p.sub) out.push(h("p", { class: "sub", text: p.sub }));
      return out;
    }
    if (p.sentence) {
      var sp = h("p", { class: "sentence" });
      if (p.mark) {
        var parts = p.sentence.split(/〔|〕/);
        sp.appendChild(document.createTextNode(parts[0]));
        sp.appendChild(h("span", { class: "mark", text: parts[1] }));
        sp.appendChild(document.createTextNode(parts[2] || ""));
      } else {
        var bits = p.sentence.split("____");
        sp.appendChild(document.createTextNode(bits[0]));
        q._blank = h("span", { class: "blank", "aria-label": "blank" });
        sp.appendChild(q._blank);
        sp.appendChild(document.createTextNode(bits[1] || ""));
      }
      out.push(sp);
      if (p.sub) out.push(h("p", { class: "sub", text: "( " + p.sub + " )" }));
      return out;
    }
    if (p.big) out.push(h("p", { class: "big", text: p.big }));
    if (p.sub) out.push(h("p", { class: "sub", text: p.sub }));
    if (p.chips) out.push(h("div", { class: "chips" }, p.chips.map(function (c) { return h("span", { class: "chip", text: c }); })));
    if (p.claim) out.push(h("p", { class: "claim", text: p.claim }));
    return out;
  }

  function tally(ok, q) {
    sess.total++; if (ok) sess.right++;
    else if (q.skill) sess.missed.push({ skill: q.skill, type: q.kindName });
  }

  // ---------- feedback sheet ----------
  var PRAISE = ["साधु!", "उत्तमम्!", "सम्यक्!", "शोभनम्!", "अति उत्तमम्!"];
  var GENDER_SA = { m: "पुंलिङ्गम्", f: "स्त्रीलिङ्गम्", n: "नपुंसकलिङ्गम्" };

  function feedback(q, ok, tag, built) {
    var body = [];
    if (!ok) body.push(h("p", { class: "ans" }, h("small", { text: "सम्यक् उत्तरम्" }), q.answerText));
    if (q.type === "sentence" || q.type === "kim") body.push(h("p", { class: "filled-sent", text: q.filled }));
    if (q.type === "error") body.push(h("p", { class: "filled-sent", text: q.corrected }));
    if (q._blank && q.ui !== "tiles") { q._blank.textContent = q.w.P[q.cell]; q._blank.className = "blank filled"; }

    // why this is the answer, in Sanskrit
    var why = null;
    if (q.type === "kim") why = q.w.P[q.cell] + " : " + VB.cellLabel(q.cell) + ", " + GENDER_SA[VB.GENDER[q.w.cls]] + "  >  " + q.answerText;
    else if (q.type === "odd") why = q.oddNote;
    else if (q.type === "match") why = null;
    else if (q.w && q.cell) why = q.w.stem + " (" + VB.CLASS_SA[q.w.cls] + ")\n" + VB.cellLabel(q.cell) + " : " + q.w.P[q.cell];
    if (why) body.push(h("p", { class: "why", style: "white-space:pre-line", text: why }));
    if (!ok && tag && VB.MISTAKE_NOTE[tag]) body.push(h("p", { class: "note", text: VB.MISTAKE_NOTE[tag] }));
    if (!ok && q.hint.rule && !tag) body.push(h("p", { class: "note", text: q.hint.rule }));
    if (!ok && built) body.push(h("p", { class: "note" }, "You built: ", h("span", { class: "sa", text: built })));

    var links = h("div", { class: "links" }), peek = h("div", { class: "peek", hidden: true });
    if (q.w) add(links, h("button", { class: "linkbtn", onclick: function () {
      if (!peek.firstChild) add(peek, fullTable(q.w, q.skills ? q.skills.map(function (s) { return s.split(":")[1]; }) : [q.cell]));
      peek.hidden = !peek.hidden;
    } }, "सर्वाणि रूपाणि", h("small", { text: "Full table" })));
    if (q.meaning) {
      var mean = h("p", { class: "note", hidden: true, text: q.meaning });
      add(links, h("button", { class: "linkbtn", onclick: function () { mean.hidden = !mean.hidden; } }, "अर्थः", h("small", { text: "Meaning" })));
      body.push(mean);
    }
    sheet(ok, body, links, peek);
  }

  function sheet(ok, body, links, peek, verdictText) {
    var nextBtn = h("button", { class: "primary", onclick: function () { s.remove(); sess.i++; nextStep(); } }, bi("अग्रे", "Next"));
    var s = h("div", { class: "sheet" + (ok ? "" : " bad"), role: "status" },
      h("div", { class: "sheet-inner" },
        h("p", { class: "verdict" }, icon(ok ? "ok" : "no"), verdictText || (ok ? VB.pick(PRAISE) : "पुनः पश्यतु")),
        body, links && links.childNodes.length ? links : null, peek || null, nextBtn));
    var d = $app.querySelector(".dock"); if (d) d.remove();
    $app.appendChild(s);
    nextBtn.focus({ preventScroll: true });
  }

  // scroll so that el sits in the middle of the part of the screen not covered by the dock
  function keepInView(el) {
    var d = $app.querySelector(".dock"), dh = d ? d.offsetHeight : 0;
    var r = el.getBoundingClientRect(), room = window.innerHeight - dh;
    if (r.top < 70 || r.bottom > room - 12) {
      var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollBy({ top: r.top - (room / 2 - r.height / 2), behavior: reduce ? "auto" : "smooth" });
    }
  }

  function fullTable(w, hl) {
    return h("table", { class: "dtable" },
      h("thead", {}, h("tr", {}, h("th", { class: "rh", text: "" }), h("th", { text: "एकवचनम्" }), h("th", { text: "बहुवचनम्" }))),
      h("tbody", {}, VB.VIBS.map(function (v) {
        return h("tr", {}, h("th", { class: "rh", text: VB.VIB_SA[v] }),
          ["eka", "bahu"].map(function (n) { var c = v + "." + n; return h("td", { class: hl && hl.indexOf(c) >= 0 ? "hl" : null, text: w.P[c] }); }));
      })));
  }

  // ---------- match pairs ----------
  function showMatch(q, card) {
    var left = q.pairs.map(function (p, i) { return { i: i, t: p.left }; });
    var right = VB.shuffle(q.pairs.map(function (p, i) { return { i: i, t: p.right }; }));
    var sel = null, done = 0, missed = {};
    var L = h("div", { class: "col" }), R = h("div", { class: "col" });
    left.forEach(function (x) {
      var b = h("button", { class: "opt", "aria-pressed": "false", onclick: function () {
        if (b.classList.contains("done")) return;
        L.querySelectorAll(".opt").forEach(function (o) { o.setAttribute("aria-pressed", "false"); });
        b.setAttribute("aria-pressed", "true"); sel = { i: x.i, el: b };
      } }, x.t);
      L.appendChild(b);
    });
    right.forEach(function (x) {
      var b = h("button", { class: "opt lab", onclick: function () {
        if (!sel || b.classList.contains("done")) return;
        if (sel.i === x.i) {
          b.classList.add("done"); sel.el.classList.add("done"); sel.el.setAttribute("aria-pressed", "false"); sel = null; done++;
          if (done === q.pairs.length) finishMatch();
        } else {
          missed[sel.i] = 1; b.classList.add("shake"); setTimeout(function () { b.classList.remove("shake"); }, 320);
        }
      } }, x.t);
      R.appendChild(b);
    });
    show(topBar(), card, h("div", { class: "match" }, L, R));
    function finishMatch() {
      var ok = Object.keys(missed).length === 0;
      q.pairs.forEach(function (p, i) { S.record(p.skill, !missed[i], { hint: q.hintUsed }); });
      S.save(); sess.total++; if (ok) sess.right++;
      sheet(ok, [h("p", { class: "note", text: ok ? "Every pair on the first try." : "Done. The pairs you missed will come back soon." })], null, null, ok ? null : "समाप्तम्");
    }
  }

  // =====================================================================
  // TABLE EXERCISE
  // =====================================================================
  function showTable(q) {
    var w = q.w, order = [], filled = {}, sel = null, answered = false;
    VB.VIBS.forEach(function (v) { ["eka", "bahu"].forEach(function (n) { var c = v + "." + n; if (q.blanks.indexOf(c) >= 0) order.push(c); }); });
    var slots = {}, chipEls = [];

    var hintBox = h("div", { class: "hint", hidden: true });
    var hintBtn = h("button", { class: "hintbtn", onclick: function () { hintBox.hidden = false; add(hintBox, h("p", { text: q.hint.pattern })); hintBtn.disabled = true; q.hintUsed = true; } }, "सङ्केतः", h("small", { text: "Hint" }));

    var tbody = h("tbody");
    q.rows.forEach(function (v) {
      var tr = h("tr", {}, h("th", { class: "rh", text: VB.VIB_SA[v] }));
      ["eka", "bahu"].forEach(function (n) {
        var c = v + "." + n;
        if (q.blanks.indexOf(c) >= 0) {
          var b = h("button", { class: "slotbtn", "aria-label": VB.cellLabel(c) + ", empty", onclick: function () { tapSlot(c); } });
          slots[c] = b; tr.appendChild(h("td", { class: "slot" }, b));
        } else tr.appendChild(h("td", { text: w.P[c] }));
      });
      tbody.appendChild(tr);
    });
    var table = h("table", { class: "dtable" },
      h("thead", {}, h("tr", {}, h("th", { class: "rh", text: "" }), h("th", { text: "एकवचनम्" }), h("th", { text: "बहुवचनम्" }))), tbody);

    var bank = h("div", { class: "bank" });
    q.chips.forEach(function (t, i) {
      var b = h("button", { class: "tile", onclick: function () { tapChip(i); } }, t);
      chipEls.push(b); bank.appendChild(b);
    });

    var checkBtn = h("button", { class: "primary", disabled: true, onclick: check }, bi("परीक्षताम्", "Check"));
    var card = h("section", { class: "leaf" },
      h("div", { class: "qhead" }, h("p", { class: "instr", text: q.instr }), hintBtn),
      h("div", { class: "wordhead" }, h("b", { text: w.stem }), h("span", { text: VB.CLASS_SA[w.cls] })),
      table, hintBox);
    show(topBar(), card, dock(checkBtn, bank, true));
    select(order[0]);

    function select(c) {
      sel = c;
      Object.keys(slots).forEach(function (k) { slots[k].classList.toggle("sel", k === c); });
      if (c) keepInView(slots[c]);
    }
    function tapSlot(c) {
      if (answered) return;
      if (filled[c] !== undefined) {
        chipEls[filled[c]].classList.remove("used"); delete filled[c];
        slots[c].textContent = ""; slots[c].classList.remove("full");
      }
      select(c); update();
    }
    function tapChip(i) {
      if (answered || chipEls[i].classList.contains("used")) return;
      var target = sel && filled[sel] === undefined ? sel : order.find(function (c) { return filled[c] === undefined; });
      if (!target) return;
      filled[target] = i; chipEls[i].classList.add("used");
      slots[target].textContent = q.chips[i]; slots[target].classList.add("full");
      var after = order.slice(order.indexOf(target) + 1).concat(order).find(function (c) { return filled[c] === undefined; });
      select(after || null); update();
    }
    function update() { checkBtn.disabled = order.some(function (c) { return filled[c] === undefined; }); }

    function check() {
      answered = true; var n = 0;
      order.forEach(function (c) {
        var ok = q.chips[filled[c]] === w.P[c];
        if (ok) n++;
        slots[c].classList.remove("sel", "full");
        slots[c].classList.add(ok ? "right" : "wrong");
        if (!ok) slots[c].appendChild(h("span", { class: "fix", text: w.P[c] }));
        S.record(w.cls + ":" + c, ok, { hint: q.hintUsed, hard: true });
        if (!ok && sess.missed) sess.missed.push({ skill: w.cls + ":" + c, type: "table" });
      });
      S.save();
      var all = n === order.length;
      sess.total++; if (all) sess.right++;
      if (sess.cellsTotal !== undefined) { sess.cellsTotal += order.length; sess.cellsRight += n; }
      sheet(all, [h("p", { class: "ans", text: N(n) + " / " + N(order.length) }),
        h("p", { class: "note", text: all ? "The whole table is right." : "The right forms are shown in green under your answers. Say the full row aloud once." })],
        null, null, all ? null : n / order.length >= 0.75 ? "प्रायः सम्यक्" : "पुनः पश्यतु");
    }
  }

  // =====================================================================
  // FINISH
  // =====================================================================
  function finish() {
    var st = S.state, unlocked = null, mode = sess.mode;
    if (sess.mode === "daily") { S.finishDay(sess.total, sess.right); unlocked = S.tryUnlock(); }
    if (sess.mode === "tables") S.finishDay(sess.total, sess.right);
    var ratio = sess.total ? sess.right / sess.total : 0;
    var head = ratio >= 0.9 ? "अति उत्तमम्!" : ratio >= 0.7 ? "साधु!" : "प्रयत्नः फलति।";
    var sub = sess.mode === "tables"
      ? [h("p", { class: "done-num", text: N(sess.cellsRight) + " / " + N(sess.cellsTotal) }), h("p", { class: "center", text: "boxes filled correctly" })]
      : [h("p", { class: "done-num", text: N(sess.right) + " / " + N(sess.total) }), h("p", { class: "center", text: "questions right" })];
    show(
      h("div", { style: "height:30px" }),
      h("section", { class: "leaf center" },
        h("h2", { class: "sa", style: "font-weight:400;font-size:2.2rem;margin:0", text: head }),
        sub,
        unlocked ? h("div", { class: "hint", style: "text-align:left" },
          h("p", { class: "sa", style: "font-size:1.3rem", text: "नूतनम्: " + unlocked.map(function (v) { return VB.VIB_SA[v]; }).join(", ") }),
          h("p", { text: "A new vibhakti opens. It will be introduced at the start of your next practice." })) : null,
        h("p", { class: "sa", style: "font-size:1.4rem;margin:18px 0 0", text: "श्वः पुनः मिलामः।" }),
        h("p", { class: "instr", style: "text-align:center", text: "See you tomorrow." })),
      h("div", { style: "margin-top:20px" }, lampsRow()),
      h("div", { class: "stack" },
        h("button", { class: "primary", onclick: leave }, bi("मुखपृष्ठम्", "Home")),
        h("button", { class: "ghost", onclick: function () { if (mode === "tables") startTables(); else startDaily(); } }, "पुनः अभ्यासः", h("small", { text: "Practise again" })))
    );
    sess = null;
  }

  // =====================================================================
  // SPEED ROUND
  // =====================================================================
  function stopTimer() { if (timer) { clearInterval(timer); timer = null; } }
  function startSpeed() {
    var left = 60, score = 0, tries = 0, cur = null;
    sess = { mode: "speed" };
    var bar = h("i", { style: "width:100%" });
    var card = h("section", { class: "leaf" });
    var scoreEl = h("span", { class: "count", text: N(0) });
    var btns = h("div", { class: "options tfrow" },
      h("button", { class: "opt", onclick: function () { answer(true); } }, "सत्यम्"),
      h("button", { class: "opt", onclick: function () { answer(false); } }, "असत्यम्"));
    show(
      h("div", { class: "bar" },
        h("button", { class: "iconbtn", "aria-label": "Leave", onclick: function () { stopTimer(); leave(); } }, icon("close")),
        h("div", { class: "track" }, bar), scoreEl),
      card, btns,
      h("p", { class: "center muted", style: "margin-top:16px", text: "Is the form really this vibhakti and vacana? Tap as fast as you can." }));
    nextItem();
    timer = setInterval(function () {
      left--; bar.style.width = (left / 60 * 100) + "%";
      if (left <= 0) { stopTimer(); end(); }
    }, 1000);
    function nextItem() {
      var cells = S.unlockedCells(), q = null;
      for (var k = 0; k < 10 && !q; k++) q = VB.genTF(VB.pick(VB.CLASSES), VB.pick(cells), { cells: cells });
      cur = q;
      card.innerHTML = "";
      add(card, [h("p", { class: "big", style: "margin-top:4px", text: q.prompt.big }), h("p", { class: "sub", text: q.prompt.sub }), h("p", { class: "claim", text: q.prompt.claim })]);
    }
    function answer(v) {
      if (!cur || left <= 0) return;
      tries++;
      var ok = v === cur.truth; if (ok) score++;
      scoreEl.textContent = N(score);
      card.classList.remove("flash-right", "flash-wrong"); void card.offsetWidth;
      card.classList.add(ok ? "flash-right" : "flash-wrong");
      nextItem();
    }
    function end() {
      var best = S.state.best.speed || 0, isBest = score > best;
      if (isBest) { S.state.best.speed = score; S.save(); }
      show(
        h("div", { style: "height:30px" }),
        h("section", { class: "leaf center" },
          h("h2", { class: "sa", style: "font-weight:400;font-size:2.2rem;margin:0", text: isBest ? "नूतनः विक्रमः!" : "समयः समाप्तः" }),
          h("p", { class: "done-num", text: N(score) }),
          h("p", { class: "center", text: "right out of " + tries + (isBest ? ". A new personal best." : ". Your best is " + best + ".") })),
        h("div", { class: "stack" },
          h("button", { class: "primary", onclick: startSpeed }, bi("पुनः", "Play again")),
          h("button", { class: "ghost", onclick: leave }, "मुखपृष्ठम्", h("small", { text: "Home" }))));
    }
  }

  // =====================================================================
  // REFERENCE: every form of every word
  // =====================================================================
  function reference(cls, stem) {
    cls = cls || "a"; stem = stem || VB.MODEL[cls];
    var w = VB.BY_STEM[stem];
    var tabs = h("div", { class: "tabs", role: "group", "aria-label": "Word class" },
      VB.CLASSES.map(function (c) {
        return h("button", { class: "tab", "aria-pressed": c === cls ? "true" : "false", onclick: function () { reference(c); } },
          VB.MODEL[c], h("small", { text: { a: "अ पुं.", aa: "आ स्त्री.", ii: "ई स्त्री.", n: "अ नपुं." }[c] }));
      }));
    var sel = h("select", { class: "words", "aria-label": "Choose a word", onchange: function (e) { reference(cls, e.target.value); } },
      VB.BY_CLASS[cls].map(function (x) { var o = h("option", { value: x.stem, text: x.stem }); if (x.stem === stem) o.selected = true; return o; }));
    show(
      h("div", { class: "bar" },
        h("button", { class: "iconbtn", "aria-label": "Back", onclick: leave }, icon("back")),
        h("h1", { class: "sa", style: "font-weight:400;font-size:1.9rem;margin:0", text: "रूपावलिः" })),
      tabs, sel,
      h("section", { class: "leaf" },
        h("div", { class: "wordhead" }, h("b", { text: w.stem }), h("span", { text: VB.CLASS_SA[w.cls] })),
        fullTable(w)),
      h("p", { class: "center muted", style: "margin-top:14px", text: "Every word in a class follows its pattern word: " + VB.MODEL[cls] + "." })
    );
  }

  // =====================================================================
  // SETTINGS
  // =====================================================================
  function settings() {
    var st = S.state;
    var sizes = h("div", { class: "sizes", role: "group", "aria-label": "Text size" },
      [1, 1.15, 1.3].map(function (s, i) {
        return h("button", { "aria-pressed": st.settings.scale === s ? "true" : "false", style: "font-size:" + (16 + i * 5) + "px",
          onclick: function () { st.settings.scale = s; S.save(); applyScale(); ov.remove(); settings(); } }, "अ");
      }));
    var sw = h("button", { class: "switch", role: "switch", "aria-checked": st.settings.all ? "true" : "false", "aria-label": "Practise all vibhaktis",
      onclick: function () { st.settings.all = !st.settings.all; S.save(); sw.setAttribute("aria-checked", st.settings.all ? "true" : "false"); } });
    var ov = h("div", { class: "overlay", onclick: function (e) { if (e.target === ov) { ov.remove(); home(); } } },
      h("div", { class: "panel", role: "dialog", "aria-label": "Settings" },
        h("h3", { text: "विन्यासः" }),
        h("div", { class: "setrow" }, h("div", { class: "lbl" }, h("b", { text: "अक्षराणां परिमाणम्" }), h("span", { text: "Text size" })), sizes),
        h("div", { class: "setrow" }, h("div", { class: "lbl" }, h("b", { text: "सर्वाः विभक्तयः" }), h("span", { text: "Open all vibhaktis now, for those who already know the basics." })), sw),
        h("div", { class: "setrow" }, h("div", { class: "lbl" }, h("b", { text: "पुनरारम्भः" }), h("span", { text: "Erase all progress on this device." })),
          h("button", { class: "danger", onclick: function () { if (confirm("Erase all progress? This cannot be undone.")) { S.reset(); applyScale(); ov.remove(); home(); } } }, "Reset")),
        h("p", { class: "fineprint", text: "Progress is saved only on this phone or computer, in this browser. Nothing is sent anywhere." }),
        h("button", { class: "primary", style: "margin-top:14px", onclick: function () { ov.remove(); home(); } }, bi("सम्पन्नम्", "Done"))));
    document.body.appendChild(ov);
  }

  // Enter key checks or moves on, for people using a keyboard
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Enter" || e.target.tagName === "BUTTON" || e.target.tagName === "SELECT") return;
    var b = document.querySelector(".sheet .primary") || document.querySelector(".dock .primary");
    if (b && !b.disabled) b.click();
  });

  home();
})();
