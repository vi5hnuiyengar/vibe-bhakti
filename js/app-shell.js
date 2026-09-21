/*
  app-shell.js
  The parts every page shares: the DOM helper, icons, the palm-leaf widgets,
  the four-tab bar and the hash router.

  Everything here is exposed on VB.UI. No other app file may redefine these.
  Pages register themselves with VB.UI.page(name, renderFunction) and are
  rendered by the router, never called directly by another page.
*/
(function () {
  "use strict";
  var VB = window.VB, S = VB.Store, $app = document.getElementById("app");

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
    spaceBelow();
  }
  // keep the last line of a page clear of whatever is fixed to the bottom
  function spaceBelow() {
    var d = $app.querySelector(".dock");
    if (d) { $app.style.paddingBottom = (d.offsetHeight + 24) + "px"; return; }
    $app.style.paddingBottom = (inSession ? 24 : (bar ? bar.offsetHeight + 24 : 150)) + "px";
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

  function lampsRow(days, streak) {
    days = days || S.lastDays(7);
    streak = streak == null ? S.streak() : streak;
    return h("div", { class: "lamps" },
      days.map(function (d) {
        return h("div", { class: "lamp" + (d.done ? "" : " off"), title: d.date },
          h("span", { html: lampSvg(d.done) }), h("span", { class: "sa", text: DOW[d.dow] }));
      }),
      h("div", { class: "streak" }, h("b", { text: N(streak) }), h("span", { class: "sa", text: streak === 1 ? "दिनम्" : "दिनानि" }),
        h("div", { style: "font-size:.78rem", text: "in a row" })));
  }

  function modeBtn(glyph, sa, en, fn) {
    return h("button", { class: "mode", onclick: fn },
      h("span", { class: "glyph", "aria-hidden": "true", text: glyph }),
      h("span", {}, h("b", { text: sa }), h("span", { text: en })));
  }

  function dock(btn, above, solid) {
    return h("div", { class: "dock" + (solid ? " solid" : "") }, h("div", { class: "dock-inner" }, above || null, btn));
  }

  var PRAISE = ["साधु!", "उत्तमम्!", "सम्यक्!", "शोभनम्!", "अति उत्तमम्!"];

  // the feedback panel. onNext is what the "अग्रे" button does, so the panel
  // itself knows nothing about sessions.
  function sheet(ok, body, links, peek, verdictText, onNext) {
    var nextBtn = h("button", { class: "primary", onclick: function () { s.remove(); if (onNext) onNext(); } }, bi("अग्रे", "Next"));
    var s = h("div", { class: "sheet" + (ok ? "" : " bad"), role: "status", "aria-live": "polite" },
      h("div", { class: "sheet-inner" },
        h("p", { class: "verdict" }, icon(ok ? "ok" : "no"), verdictText || (ok ? VB.pick(PRAISE) : "पुनः पश्यतु")),
        body, links && links.childNodes.length ? links : null, peek || null, nextBtn));
    var d = $app.querySelector(".dock"); if (d) d.remove();
    $app.appendChild(s);
    nextBtn.focus({ preventScroll: true });
    return s;
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

  // A declension table. Columns come from VB.VACS, so a third vacana needs no
  // change here. `forms` is any cell map; `vibs` lets pronouns pass seven rows.
  function fullTable(source, hl, vibs, vacs) {
    var forms = source && source.P ? source.P : source;
    vibs = vibs || VB.VIBS;
    vacs = vacs || VB.SHOWN_VACS || VB.VACS;
    return h("table", { class: "dtable" + (vacs.length > 2 ? " wide" : "") },
      h("thead", {}, h("tr", {}, h("th", { class: "rh", text: "" }),
        vacs.map(function (n) { return h("th", { text: VB.VAC_SA[n] }); }))),
      h("tbody", {}, vibs.map(function (v) {
        return h("tr", {}, h("th", { class: "rh", text: VB.VIB_SA[v] }),
          vacs.map(function (n) {
            var c = v + "." + n, f = forms[c];
            return h("td", { class: (hl && hl.indexOf(c) >= 0 ? "hl" : "") + (f ? "" : " empty"), text: f || "" });
          }));
      })));
  }

  // The bar at the top of a session: close button, progress, count.
  function topBar(i, n, onClose, title) {
    return h("div", { class: "bar" },
      h("button", { class: "iconbtn", "aria-label": "Leave practice", onclick: onClose }, icon("close")),
      title ? h("h1", { class: "sa", style: "font-weight:400;font-size:1.6rem;margin:0;flex:1", text: title })
        : h("div", { class: "track", role: "progressbar", "aria-valuemin": 0, "aria-valuemax": n, "aria-valuenow": i },
          h("i", { style: "width:" + Math.round(100 * i / Math.max(1, n)) + "%" })),
      title ? null : h("span", { class: "count", text: N(Math.min(i + 1, n)) + "/" + N(n) }));
  }

  // =====================================================================
  // ROUTER AND TAB BAR
  // =====================================================================
  var TABS = [
    { id: "abhyasa", sa: "अभ्यासः", glyph: "अ", en: "Practise" },
    { id: "pathana", sa: "पठनम्", glyph: "प", en: "Read" },
    { id: "lipi", sa: "लिपिः", glyph: "लि", en: "Script" },
    { id: "pragati", sa: "प्रगतिः", glyph: "प्र", en: "Progress" }
  ];
  var ROUTES = {}, bar = null, inSession = false, lastTab = null;

  function page(id, fn) { ROUTES[id] = fn; }

  function currentTab() {
    var m = /^#\/([a-z]+)/.exec(location.hash || "");
    return m && ROUTES[m[1]] ? m[1] : "abhyasa";
  }

  function buildBar() {
    bar = h("nav", { class: "tabbar", "aria-label": "Sections" },
      h("div", { class: "tabbar-inner" }, TABS.map(function (t) {
        return h("button", { class: "tabbtn", "aria-pressed": "false", "data-tab": t.id, "aria-label": t.en,
          onclick: function () { go(t.id); } },
          h("span", { class: "glyph sa", "aria-hidden": "true", text: t.glyph }),
          h("span", { class: "sa", text: t.sa }));
      })));
    document.body.appendChild(bar);
  }
  function markBar(tab) {
    if (!bar) return;
    bar.querySelectorAll(".tabbtn").forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-tab") === tab ? "true" : "false");
    });
  }
  function showBar(on) { if (bar) bar.hidden = !on; }

  function render() {
    var tab = currentTab();
    inSession = false;
    lastTab = tab;
    S.state.settings.tab = tab; S.save();
    showBar(true);
    markBar(tab);
    ROUTES[tab]();
    spaceBelow();
  }

  /*
    History is kept exactly one entry deep for tabs. Leaving अभ्यासः pushes an
    entry; every other tab switch replaces it. So back inside a session exits
    the session, back on any other tab returns to अभ्यासः, and back on अभ्यासः
    leaves the site, which is what Section 4.2 asks for.
  */
  function go(tab) {
    if (!ROUTES[tab]) tab = "abhyasa";
    var cur = currentTab(), url = "#/" + tab;
    if (tab === cur && !inSession) { render(); return; }
    if (cur === "abhyasa" && tab !== "abhyasa" && !inSession) history.pushState({ vb: "tab" }, "", url);
    else history.replaceState({ vb: "tab" }, "", url);
    render();
  }

  // Entering a session: full screen, no tab bar, back exits the session.
  function enter(fn) {
    inSession = true;
    showBar(false);
    history.pushState({ vb: 1 }, "");
    fn();
  }
  function leave() {
    if (history.state && history.state.vb) history.back();
    else render();
  }

  window.addEventListener("popstate", function () { render(); });
  window.addEventListener("hashchange", function () { if (currentTab() !== lastTab || inSession) render(); });
  window.addEventListener("resize", spaceBelow);

  // Enter key checks or moves on, for people using a keyboard
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Enter" || e.target.tagName === "BUTTON" || e.target.tagName === "SELECT") return;
    var b = document.querySelector(".sheet .primary") || document.querySelector(".dock .primary");
    if (b && !b.disabled) b.click();
  });

  VB.UI = {
    h: h, add: add, show: show, bi: bi, N: N, ICON: ICON, icon: icon, lampSvg: lampSvg, DOW: DOW,
    applyScale: applyScale, lampsRow: lampsRow, modeBtn: modeBtn, dock: dock, sheet: sheet,
    keepInView: keepInView, fullTable: fullTable, topBar: topBar, spaceBelow: spaceBelow,
    page: page, go: go, enter: enter, leave: leave, render: render, tabs: TABS,
    inSession: function () { return inSession; },
    app: $app
  };

  // ---------- boot ----------
  function boot() {
    applyScale();
    buildBar();
    if (!location.hash) location.replace("#/" + (S.state.settings.tab || "abhyasa"));
    render();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else setTimeout(boot, 0);
})();
