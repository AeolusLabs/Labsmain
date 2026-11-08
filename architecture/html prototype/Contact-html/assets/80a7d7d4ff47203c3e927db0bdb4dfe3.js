/* AeolusLabs showcase effects — one signature interaction per page.
   Lens (Work) · System map (Solutions) · Live brief (Contact).
   Same dark/mint language as the rest of the site. */
(function () {
  'use strict';
  var TAU = Math.PI * 2;
  var reduce = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function damp(a, b, rate, dt) { return a + (b - a) * (1 - Math.exp(-rate * dt)); }
  function hexRgb(s, fb) { var m = /^#([0-9a-f]{6})$/i.exec((s || '').trim()); if (!m) return fb; var n = parseInt(m[1], 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }

  function create(doc, root) {
    var win = doc.defaultView || window, tasks = [], cleanups = [], raf = 0, last = 0, alive = true;
    var P = { x: -9999, y: -9999, active: false, last: 0 };
    function listen(t, type, fn, o) { t.addEventListener(type, fn, o); cleanups.push(function () { t.removeEventListener(type, fn, o); }); }
    function observe(el, cb, opts) {
      if (!win.IntersectionObserver) { cb({ isIntersecting: true }); return; }
      var io = new win.IntersectionObserver(function (es) { es.forEach(cb); }, opts || { threshold: 0 });
      io.observe(el); cleanups.push(function () { io.disconnect(); });
    }
    function accent() { return hexRgb(win.getComputedStyle(root).getPropertyValue('--accent'), [123, 232, 203]); }
    listen(win, 'pointermove', function (e) { P.x = e.clientX; P.y = e.clientY; P.active = true; P.last = performance.now(); }, { passive: true });
    listen(doc.documentElement, 'pointerleave', function () { P.active = false; });
    tasks.push(function () { if (P.active && performance.now() - P.last > 4000) P.active = false; });

    /* ===== WORK: inspect lens over the real capture ===== */
    function lens() {
      var box = root.querySelector('[data-lens]'); if (!box) return;
      var img = box.querySelector('[data-lens-src]'), ring = box.querySelector('[data-lens-ring]'), hint = box.querySelector('[data-lens-hint]');
      var Z = 2.4, S = 220, x = 0, y = 0, s = 0, hov = false, tx = 0, ty = 0, hintO = 1, ready = false;
      function setBg() { if (!img.currentSrc && !img.src) return; ring.style.backgroundImage = 'url("' + (img.currentSrc || img.src) + '")'; ring.style.backgroundRepeat = 'no-repeat'; ready = true; }
      setBg(); if (!img.complete) listen(img, 'load', setBg);
      function move(e) {
        var r = img.getBoundingClientRect(); tx = e.clientX - r.left; ty = e.clientY - r.top;
        if (!hov) { x = tx; y = ty; } hov = true;
      }
      listen(box, 'pointermove', move); listen(box, 'pointerdown', move);
      listen(box, 'pointerleave', function () { hov = false; });
      if (reduce) { ring.style.display = 'none'; return; }
      tasks.push(function (dt) {
        S = Math.round(clamp(box.getBoundingClientRect().width * 0.26, 140, 230));
        var r = img.getBoundingClientRect(); if (!ready || r.width < 1) return;
        x = damp(x, tx, 16, dt); y = damp(y, ty, 16, dt); s = damp(s, hov ? 1 : 0, 12, dt); hintO = damp(hintO, hov ? 0 : 1, 6, dt);
        ring.style.width = S + 'px'; ring.style.height = S + 'px';
        ring.style.opacity = clamp(s * 1.4, 0, 1).toFixed(3);
        ring.style.transform = 'translate3d(' + (x - S / 2).toFixed(1) + 'px,' + (y - S / 2).toFixed(1) + 'px,0) scale(' + (0.55 + 0.45 * s).toFixed(3) + ')';
        ring.style.backgroundSize = (r.width * Z).toFixed(1) + 'px ' + (r.height * Z).toFixed(1) + 'px';
        ring.style.backgroundPosition = (-(x * Z - S / 2)).toFixed(1) + 'px ' + (-(y * Z - S / 2)).toFixed(1) + 'px';
        if (hint) hint.style.opacity = hintO.toFixed(3);
      });
    }

    /* ===== SOLUTIONS: live system map ===== */
    function network() {
      var cv = root.querySelector('[data-network]'); if (!cv) return;
      var g = cv.getContext('2d'), host = cv.parentElement, W = 1, H = 1, dpr = 1, visible = true, rgb = accent(), frame = 0, first = true;
      var defs = [
        ['hub', 'Your business', 0.5, 0.5, 10], ['api', 'APIs', 0.34, 0.36, 7], ['db', 'Databases', 0.66, 0.64, 7],
        ['web', 'Websites', 0.12, 0.17, 6], ['mob', 'Mobile apps', 0.09, 0.62, 6], ['por', 'Customer portals', 0.25, 0.89, 6],
        ['bt', 'Business tools', 0.8, 0.14, 6], ['ai', 'AI workflows', 0.9, 0.5, 6]
      ];
      var eDefs = [['hub', 'api'], ['hub', 'db'], ['api', 'web'], ['api', 'mob'], ['api', 'por'], ['api', 'bt'], ['db', 'ai'], ['api', 'ai'], ['db', 'bt']];
      var nodes = {}, list = [], edges = [], packets = [];
      defs.forEach(function (d, i) { var n = { id: d[0], label: d[1], fx: d[2], fy: d[3], r: d[4], x: 0, y: 0, vx: 0, vy: 0, hl: 0, dim: 1, ph: i * 1.7 }; nodes[d[0]] = n; list.push(n); });
      eDefs.forEach(function (e) { edges.push({ a: nodes[e[0]], b: nodes[e[1]], hl: 0 }); });
      function size() {
        var r = host.getBoundingClientRect(); W = Math.max(1, r.width); H = Math.max(1, r.height);
        dpr = Math.min(2, win.devicePixelRatio || 1); cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); g.setTransform(dpr, 0, 0, dpr, 0, 0);
        list.forEach(function (n) { n.hx = n.fx * W; n.hy = n.fy * H; if (first) { n.x = n.hx; n.y = n.hy; } });
        first = false;
      }
      size();
      if (win.ResizeObserver) { var ro = new win.ResizeObserver(size); ro.observe(host); cleanups.push(function () { ro.disconnect(); }); }
      observe(host, function (e) { visible = e.isIntersecting; });
      function spawn(pref) {
        var e = pref && pref.length ? pref[Math.floor(Math.random() * pref.length)] : edges[Math.floor(Math.random() * edges.length)];
        packets.push({ e: e, t: 0, dur: 1.4 + Math.random() * 1.6, dir: Math.random() < 0.5 ? 1 : -1 });
      }
      function draw(dt, t) {
        var r = cv.getBoundingClientRect(), px = P.x - r.left, py = P.y - r.top, hov = null, best = 44;
        if (P.active) list.forEach(function (n) { var d = Math.hypot(n.x - px, n.y - py); if (d < best) { best = d; hov = n; } });
        var neigh = {}; if (hov) { neigh[hov.id] = 1; edges.forEach(function (e) { if (e.a === hov) neigh[e.b.id] = 1; if (e.b === hov) neigh[e.a.id] = 1; }); }
        list.forEach(function (n) {
          var ax = (n.hx - n.x) * 7 + Math.sin(t * 0.6 + n.ph) * 14, ay = (n.hy - n.y) * 7 + Math.cos(t * 0.5 + n.ph) * 14;
          if (P.active) { var dx = n.x - px, dy = n.y - py, d = Math.hypot(dx, dy); if (d < 150 && d > 0.1) { var f = (1 - d / 150); ax += (dx / d) * f * f * 900; ay += (dy / d) * f * f * 900; } }
          n.vx = (n.vx + ax * dt) * Math.pow(0.0009, dt); n.vy = (n.vy + ay * dt) * Math.pow(0.0009, dt);
          n.x += n.vx * dt; n.y += n.vy * dt;
          n.hl = damp(n.hl, hov && neigh[n.id] ? 1 : 0, 10, dt); n.dim = damp(n.dim, hov ? (neigh[n.id] ? 1 : 0.28) : 1, 8, dt);
        });
        edges.forEach(function (e) { e.hl = damp(e.hl, hov && (e.a === hov || e.b === hov) ? 1 : 0, 10, dt); });
        g.clearRect(0, 0, W, H);
        var c = rgb[0] + ',' + rgb[1] + ',' + rgb[2], hotEdges = edges.filter(function (e) { return e.hl > 0.5; });
        edges.forEach(function (e) {
          var dim = hov ? (e.hl > 0.5 ? 1 : 0.35) : 1;
          g.strokeStyle = 'rgba(' + c + ',' + ((0.16 + 0.7 * e.hl) * dim).toFixed(3) + ')'; g.lineWidth = 1 + e.hl;
          g.beginPath(); g.moveTo(e.a.x, e.a.y); g.lineTo(e.b.x, e.b.y); g.stroke();
        });
        if (!reduce) {
          if (packets.length < (hov ? 16 : 9) && Math.random() < dt * 5) spawn(hov && hotEdges.length && Math.random() < 0.7 ? hotEdges : null);
          for (var i = packets.length - 1; i >= 0; i--) {
            var p = packets[i]; p.t += dt / p.dur * (1 + p.e.hl * 1.4); if (p.t >= 1) { packets.splice(i, 1); continue; }
            var u = p.dir > 0 ? p.t : 1 - p.t, dim2 = hov ? (p.e.hl > 0.5 ? 1 : 0.3) : 1;
            for (var k = 0; k < 5; k++) {
              var uu = clamp(u - p.dir * k * 0.018, 0, 1), xx = lerp(p.e.a.x, p.e.b.x, uu), yy = lerp(p.e.a.y, p.e.b.y, uu);
              g.fillStyle = 'rgba(' + c + ',' + ((0.95 - k * 0.18) * dim2 * Math.sin(Math.PI * p.t)).toFixed(3) + ')';
              g.beginPath(); g.arc(xx, yy, 2.8 - k * 0.35, 0, TAU); g.fill();
            }
          }
        }
        g.font = '500 15px "Instrument Sans", system-ui, sans-serif'; g.textBaseline = 'middle';
        list.forEach(function (n) {
          if (n.hl > 0.02) { var gr = g.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 5); gr.addColorStop(0, 'rgba(' + c + ',' + (0.35 * n.hl).toFixed(3) + ')'); gr.addColorStop(1, 'rgba(' + c + ',0)'); g.fillStyle = gr; g.beginPath(); g.arc(n.x, n.y, n.r * 5, 0, TAU); g.fill(); }
          g.globalAlpha = n.dim; g.fillStyle = '#0A1116'; g.strokeStyle = 'rgba(' + c + ',' + (0.6 + 0.4 * n.hl).toFixed(3) + ')'; g.lineWidth = 1.5 + n.hl;
          g.beginPath(); g.arc(n.x, n.y, n.r + n.hl * 2, 0, TAU); g.fill(); g.stroke();
          if (n.id === 'hub') { g.fillStyle = 'rgba(' + c + ',0.9)'; g.beginPath(); g.arc(n.x, n.y, 3.5, 0, TAU); g.fill(); }
          var left = n.fx > 0.72, tx = n.x + (left ? -(n.r + 12) : n.r + 12);
          g.textAlign = left ? 'right' : 'left'; g.fillStyle = hov && neigh[n.id] ? '#FFFFFF' : '#C5D1CD'; g.fillText(n.label, tx, n.y);
          g.globalAlpha = 1;
        });
      }
      if (reduce) { draw(1 / 60, 0); return; }
      tasks.push(function (dt, t) { if (!visible) return; if ((frame++ & 63) === 0) rgb = accent(); draw(dt, t); });
    }

    /* ===== CONTACT: the brief builds itself as you type ===== */
    function liveBrief() {
      var card = root.querySelector('[data-brief]'); if (!card) return;
      var inName = root.querySelector('#f-name'), inEmail = root.querySelector('#f-email'), inNeed = root.querySelector('#f-need'), inCh = root.querySelector('#f-challenge');
      if (!inName || !inEmail || !inNeed || !inCh) return;
      var ring = card.querySelector('[data-brief-ring]'), pct = card.querySelector('[data-brief-pct]'), send = root.querySelector('[data-brief-send]');
      var CIRC = 2 * Math.PI * 26, needTouched = false, p = 0;
      var spec = [['name', inName, 'Your name'], ['email', inEmail, 'Your email'], ['need', inNeed, 'What you need'], ['brief', inCh, 'What you want to improve or build']];
      var rows = spec.map(function (s) {
        var el = card.querySelector('[data-brief-field="' + s[0] + '"]'), dot = card.querySelector('[data-brief-dot="' + s[0] + '"]');
        return { key: s[0], input: s[1], ph: s[2], el: el, dot: dot, shown: '', done: 0 };
      });
      listen(inNeed, 'change', function () { needTouched = true; });
      function target(r) { var v = (r.input.value || '').trim(); if (r.key === 'need' && !needTouched) return ''; return v; }
      function isDone(r) {
        var v = target(r);
        if (r.key === 'email') return /^\S+@\S+\.\S+$/.test(v);
        if (r.key === 'brief') return v.length >= 10;
        return v.length > 0;
      }
      var caretOn = true, caretT = 0, activeInput = null;
      rows.forEach(function (r) { listen(r.input, 'focus', function () { activeInput = r; }); listen(r.input, 'blur', function () { if (activeInput === r) activeInput = null; }); });
      tasks.push(function (dt) {
        caretT += dt; if (caretT > 0.5) { caretT = 0; caretOn = !caretOn; }
        var doneCount = 0;
        rows.forEach(function (r) {
          var tgt = target(r), cur = r.shown;
          if (cur !== tgt) {
            if (reduce) cur = tgt;
            else if (tgt.indexOf(cur) === 0) cur = tgt.slice(0, Math.min(tgt.length, cur.length + Math.max(1, Math.ceil((tgt.length - cur.length) * 0.35))));
            else cur = cur.slice(0, Math.max(0, cur.length - Math.max(2, Math.ceil(cur.length * 0.3))));
            r.shown = cur;
          }
          var empty = cur.length === 0, caret = (activeInput === r && caretOn) ? '▏' : '';
          r.el.textContent = (empty ? r.ph : cur) + caret;
          r.el.style.color = empty ? '#8A9C96' : '#EAF0EC';
          var d = isDone(r); if (d) doneCount++;
          r.done = damp(r.done, d ? 1 : 0, 10, dt);
          r.dot.style.transform = 'scale(' + (0.6 + 0.4 * r.done).toFixed(3) + ')';
          r.dot.style.opacity = (0.35 + 0.65 * r.done).toFixed(3);
          r.dot.style.background = r.done > 0.5 ? 'var(--accent)' : 'transparent';
        });
        p = damp(p, doneCount / rows.length, 7, dt);
        ring.style.strokeDasharray = CIRC.toFixed(2); ring.style.strokeDashoffset = (CIRC * (1 - p)).toFixed(2);
        pct.textContent = Math.round(p * 100) + '%';
        if (send) { var ready = doneCount === rows.length; send.style.boxShadow = ready ? '0 0 0 6px rgba(123,232,203,0.18), 0 14px 40px rgba(123,232,203,0.28)' : 'none'; send.style.opacity = ready ? '1' : '0.72'; }
      });
    }

    [lens, network, liveBrief].forEach(function (fn) { try { fn(); } catch (e) { if (win.console) win.console.warn('[Showcase]', fn.name, e); } });
    function loop(now) {
      if (!alive) return;
      var dt = Math.min(0.033, Math.max(0.001, (now - (last || now)) / 1000)); last = now;
      for (var i = 0; i < tasks.length; i++) tasks[i](dt, now / 1000);
      raf = win.requestAnimationFrame(loop);
    }
    raf = win.requestAnimationFrame(loop);
    return { root: root, sentinel: root.querySelector('[data-lens],[data-network],[data-brief]'), destroy: function () { alive = false; win.cancelAnimationFrame(raf); cleanups.forEach(function (c) { try { c(); } catch (e) {} }); root.__sm = null; } };
  }

  window.ShowcaseMotion = {
    init: function (doc) {
      doc = doc || document; var tries = 0, api = null;
      function boot() {
        var root = doc.querySelector('[data-aeolus-root]');
        if (!root) { if (tries++ < 40) setTimeout(boot, 120); return; }
        if (root.__sm) return; api = create(doc, root); root.__sm = api;
      }
      boot();
      var watch = setInterval(function () {
        var root = doc.querySelector('[data-aeolus-root]');
        if (api && (!root || root !== api.root || root.querySelector('[data-lens],[data-network],[data-brief]') !== api.sentinel)) { api.destroy(); api = null; boot(); }
        else if (!api && root) boot();
      }, 1200);
      return { destroy: function () { clearInterval(watch); if (api) api.destroy(); } };
    }
  };
})();
