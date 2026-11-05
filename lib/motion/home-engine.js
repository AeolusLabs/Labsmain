import tokens from '@/design-system/tokens.json'

// Adapted from the owner-supplied HTML's native motion engine; export runtime removed.
const winFine = doc => doc.defaultView.matchMedia('(hover: hover) and (pointer: fine)').matches
  var TAU = Math.PI * 2;
  var productRgb = parseHex(tokens.color['product-ink'], [0, 0, 0]);
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function damp(a, b, rate, dt) { return a + (b - a) * (1 - Math.exp(-rate * dt)); }

  /* ---------- noise ---------- */
  function rng(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  var perm = (function () {
    var p = [], i, r = rng(11);
    for (i = 0; i < 256; i++) p[i] = i;
    for (i = 255; i > 0; i--) { var j = Math.floor(r() * (i + 1)), t = p[i]; p[i] = p[j]; p[j] = t; }
    var q = new Uint8Array(512);
    for (i = 0; i < 512; i++) q[i] = p[i & 255];
    return q;
  })();
  function fade(t) { return t * t * t * (t * (t * 6 - 15) + 10); }
  function grad(h, x, y, z) {
    h &= 15;
    var u = h < 8 ? x : y, v = h < 4 ? y : (h === 12 || h === 14 ? x : z);
    return ((h & 1) ? -u : u) + ((h & 2) ? -v : v);
  }
  function noise3(x, y, z) {
    var X = Math.floor(x) & 255, Y = Math.floor(y) & 255, Z = Math.floor(z) & 255;
    x -= Math.floor(x); y -= Math.floor(y); z -= Math.floor(z);
    var u = fade(x), v = fade(y), w = fade(z);
    var A = perm[X] + Y, AA = perm[A] + Z, AB = perm[A + 1] + Z;
    var B = perm[X + 1] + Y, BA = perm[B] + Z, BB = perm[B + 1] + Z;
    return lerp(
      lerp(lerp(grad(perm[AA], x, y, z), grad(perm[BA], x - 1, y, z), u),
           lerp(grad(perm[AB], x, y - 1, z), grad(perm[BB], x - 1, y - 1, z), u), v),
      lerp(lerp(grad(perm[AA + 1], x, y, z - 1), grad(perm[BA + 1], x - 1, y, z - 1), u),
           lerp(grad(perm[AB + 1], x, y - 1, z - 1), grad(perm[BB + 1], x - 1, y - 1, z - 1), u), v), w);
  }

  /* ---------- spring ---------- */
  function Spring(x, k, c) { this.x = x || 0; this.v = 0; this.t = x || 0; this.k = k || 120; this.c = c || 16; }
  Spring.prototype.step = function (dt) {
    var a = this.k * (this.t - this.x) - this.c * this.v;
    this.v += a * dt; this.x += this.v * dt;
    return this.x;
  };
  Spring.prototype.rest = function () { return Math.abs(this.v) < 0.002 && Math.abs(this.t - this.x) < 0.0005; };

  function parseHex(s, fb) {
    s = (s || '').trim();
    var m = /^#([0-9a-f]{6})$/i.exec(s);
    if (!m) return fb;
    var n = parseInt(m[1], 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }

  /* ---------- core ---------- */
  function create(doc, root, reduce) {
    const fine = winFine(doc);
    var win = doc.defaultView || window;
    var tasks = [], cleanups = [], timers = [], raf = 0, last = 0, T = 0, alive = true;

    var P = { x: -9999, y: -9999, px: 0, py: 0, vx: 0, vy: 0, active: false, last: 0, has: false };
    function listen(target, type, fn, opts) {
      target.addEventListener(type, fn, opts);
      cleanups.push(function () { target.removeEventListener(type, fn, opts); });
    }
    function observe(el, cb, opts) {
      if (!win.IntersectionObserver) { cb({ isIntersecting: true, target: el }); return; }
      var io = new win.IntersectionObserver(function (es) { es.forEach(cb); }, opts || { threshold: tokens.motion['intersection-threshold'] });
      io.observe(el);
      cleanups.push(function () { io.disconnect(); });
    }
    function after(ms, fn) { var id = setTimeout(function () { if (alive) fn(); }, ms); timers.push(id); }
    function accent() {
      return parseHex(win.getComputedStyle(root).getPropertyValue('--accent'), parseHex(tokens.color.accent, [0, 0, 0]));
    }

    listen(win, 'pointermove', function (e) {
      if (P.has) { P.vx = lerp(P.vx, (e.clientX - P.px) * 60, 0.35); P.vy = lerp(P.vy, (e.clientY - P.py) * 60, 0.35); }
      P.x = e.clientX; P.y = e.clientY; P.px = e.clientX; P.py = e.clientY;
      P.active = true; P.has = true; P.last = performance.now();
    }, { passive: true });
    listen(doc.documentElement, 'pointerleave', function () { P.active = false; });
    tasks.push(function (dt) {
      if (P.active && performance.now() - P.last > 3200) P.active = false;
      P.vx *= Math.exp(-dt * 4); P.vy *= Math.exp(-dt * 4);
    });

    /* ===== 1. Wind: curl-ish flow field, bends around the pointer ===== */
    function wind() {
      var cv = root.querySelector('[data-wind]'); if (!cv) return;
      var host = cv.parentElement, g = cv.getContext('2d');
      var W = 1, H = 1, dpr = 1, parts = [], visible = true, rgb = accent(), frame = 0;
      var hx = 0, hy = 0, gvx = 0, gvy = 0, segs = [[], [], [], []];
      function spawn(p) {
        p.x = Math.random() * W; p.y = Math.random() * H; p.px = p.x; p.py = p.y;
        p.life = 0; p.max = 110 + Math.random() * 240; p.s = 0.55 + Math.random() * 0.95; return p;
      }
      function size() {
        var r = host.getBoundingClientRect();
        W = Math.max(1, r.width); H = Math.max(1, r.height);
        dpr = Math.min(tokens.wind['dpr-max'], win.devicePixelRatio || 1);
        cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
        g.setTransform(dpr, 0, 0, dpr, 0, 0);
        var n = Math.round(clamp(W * H / tokens.wind['area-per-particle'], tokens.wind['particles-min'], fine ? tokens.wind['particles-max'] : tokens.wind['particles-min']));
        parts = []; for (var i = 0; i < n; i++) parts.push(spawn({}));
        hx = W * 0.5; hy = H * 0.4;
      }
      size();
      if (win.ResizeObserver) {
        var ro = new win.ResizeObserver(function () { size(); }); ro.observe(host);
        cleanups.push(function () { ro.disconnect(); });
      } else listen(win, 'resize', size);
      observe(host, function (e) { visible = e.isIntersecting; }, { threshold: 0 });

      function advance(dt, t, withFade) {
        var r = host.getBoundingClientRect(), tx, ty;
        if (P.active) { tx = P.x - r.left; ty = P.y - r.top; gvx = damp(gvx, P.vx, 6, dt); gvy = damp(gvy, P.vy, 6, dt); }
        else {
          tx = W * (0.5 + 0.40 * Math.sin(t * 0.52)); ty = H * (0.42 + 0.28 * Math.sin(t * 0.77 + 1.3));
          gvx = damp(gvx, Math.cos(t * 0.52) * W * 0.22, 3, dt); gvy = damp(gvy, Math.cos(t * 0.77 + 1.3) * H * 0.2, 3, dt);
        }
        hx = damp(hx, tx, 9, dt); hy = damp(hy, ty, 9, dt);
        if (withFade) {
          g.globalCompositeOperation = 'destination-out';
          g.fillStyle = 'rgba(0,0,0,' + tokens.wind['fade-alpha'] + ')'; g.fillRect(0, 0, W, H);
          g.globalCompositeOperation = 'source-over';
        }
        for (var l = 0; l < 4; l++) segs[l].length = 0;
        var R = tokens.wind['pointer-radius'], R2 = R * R;
        for (var i = 0; i < parts.length; i++) {
          var p = parts[i];
          var a = noise3(p.x * 0.0013, p.y * 0.0013, t * 0.06) * TAU * 2.1;
          var vx = Math.cos(a) * p.s * 58 + 26, vy = Math.sin(a) * p.s * 58;
          var dx = p.x - hx, dy = p.y - hy, d2 = dx * dx + dy * dy;
          if (d2 < R2) {
            var d = Math.sqrt(d2) + 0.001, f = 1 - d / R; f *= f;
            vx += (-dy / d) * 300 * f + (dx / d) * 110 * f + gvx * 0.55 * f;
            vy += (dx / d) * 300 * f + (dy / d) * 110 * f + gvy * 0.55 * f;
          }
          p.px = p.x; p.py = p.y; p.x += vx * dt; p.y += vy * dt; p.life++;
          var al = Math.sin(Math.PI * p.life / p.max);
          var lv = al > 0.75 ? 3 : al > 0.5 ? 2 : al > 0.25 ? 1 : 0;
          var s = segs[lv]; s.push(p.px, p.py, p.x, p.y);
          if (p.life >= p.max || p.x < -20 || p.x > W + 20 || p.y < -20 || p.y > H + 20) spawn(p);
        }
        var alphas = [tokens.wind['alpha-low'], tokens.wind['alpha-mid'], tokens.wind['alpha-high'], tokens.wind['alpha-peak']];
        g.lineWidth = tokens.wind['line-width']; g.lineCap = 'round';
        for (var q = 0; q < 4; q++) {
          var s2 = segs[q]; if (!s2.length) continue;
          g.strokeStyle = 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',' + alphas[q] + ')';
          g.beginPath();
          for (var k = 0; k < s2.length; k += 4) { g.moveTo(s2[k], s2[k + 1]); g.lineTo(s2[k + 2], s2[k + 3]); }
          g.stroke();
        }
      }
      if (reduce) { for (var w = 0; w < 24; w++) advance(1 / 60, w / 60, true); return; }
      tasks.push(function (dt, t) {
        if (!visible) return;
        if ((frame++ & 63) === 0) rgb = accent();
        advance(dt, t, true);
      });
    }

    /* ===== 2. Headline: words rise on springs ===== */
    function headline() {
      var ws = [].slice.call(root.querySelectorAll('[data-hw]')); if (!ws.length) return;
      if (reduce) return;
      var el0 = 0;
      ws.forEach(function (el, i) {
        el._s = new Spring(0, tokens.spring['headline-stiffness'], tokens.spring['headline-damping']); el._d = tokens.motion['headline-delay'] + i * tokens.motion['headline-stagger'];
        el.style.transformOrigin = '0 100%'; el.style.willChange = 'transform';
        el.style.transform = 'translate3d(0,118%,0) rotate(8deg)';
      });
      var done = false;
      tasks.push(function (dt) {
        if (done) return; el0 += dt; var all = true;
        ws.forEach(function (el) {
          if (el0 > el._d) el._s.t = 1;
          var p = el._s.step(dt);
          el.style.transform = 'translate3d(0,' + ((1 - p) * parseFloat(tokens.motion['headline-offset'])).toFixed(2) + '%,0) rotate(' + ((1 - p) * parseFloat(tokens.motion['headline-rotation'])).toFixed(2) + 'deg)';
          if (!el._s.rest()) all = false;
        });
        if (all && el0 > 2) { done = true; ws.forEach(function (el) { el.style.transform = 'none'; el.style.willChange = 'auto'; }); }
      });
    }

    /* ===== 3. Scroll reveals on springs (+ clip reveals for imagery) ===== */
    function reveals() {
      var els = [].slice.call(root.querySelectorAll('[data-reveal],[data-clip]')); if (!els.length || reduce || !fine) return;
      function apply(el, p) {
        if (el.hasAttribute('data-clip')) {
          var c = clamp(p, 0, 1);
          el.style.clipPath = 'inset(' + ((1 - c) * 100).toFixed(2) + '% 0 0 0 round ' + tokens.radius.media + ')';
          var im = el.querySelector('[data-clip-img]');
          if (im) im.style.transform = 'scale(' + (1 + (1 - clamp(p, 0, 1.1)) * (tokens.motion['image-reveal-scale'] - 1)).toFixed(4) + ')';
        } else {
          el.style.opacity = clamp(p * 1.5, 0, 1).toFixed(3);
          el.style.transform = 'translate3d(0,' + ((1 - p) * parseFloat(tokens.motion['reveal-reference-distance'])).toFixed(2) + 'px,0)';
        }
      }
      listen(root, 'focusin', function (event) {
        var el = event.target.closest('[data-reveal],[data-clip]');
        if (el) { el._on = true; el._s.x = el._s.t = 1; apply(el, 1); }
        event.target.closest('.home-project-stage')?.querySelectorAll('[data-clip]').forEach(frame => {
          frame._on = true; frame._s.x = frame._s.t = 1; frame._s.v = 0; apply(frame, 1);
        });
      });
      var live = [];
      els.forEach(function (el) {
        el._s = new Spring(0, el.hasAttribute('data-clip') ? tokens.spring['clip-stiffness'] : tokens.spring['reveal-stiffness'], el.hasAttribute('data-clip') ? tokens.spring['clip-damping'] : tokens.spring['reveal-damping']);
        el._on = false; apply(el, 0);
        observe(el, function (e) {
          if (!e.isIntersecting || el._on) return; el._on = true;
          after(parseFloat(el.getAttribute('data-delay')) || 0, function () { el._s.t = 1; live.push(el); });
        }, { threshold: tokens.motion['intersection-threshold'] });
      });
      tasks.push(function (dt) {
        for (var i = live.length - 1; i >= 0; i--) {
          var el = live[i], p = el._s.step(dt); apply(el, p);
          if (el._s.rest()) { el._s.x = 1; apply(el, 1); if (!el.hasAttribute('data-clip')) el.style.transform = 'none'; live.splice(i, 1); }
        }
      });
    }

    /* ===== 4. Parallax + scroll progress ===== */
    function scrollFx() {
      var pars = [].slice.call(root.querySelectorAll('[data-par]'));
      pars.forEach(function (el) { el._y = 0; });
      var bar = root.querySelector('[data-progress]');
      var bs = new Spring(0, tokens.spring['progress-stiffness'], tokens.spring['progress-damping']), lastY = win.scrollY || 0;
      ctx.sv = 0;
      tasks.push(function (dt) {
        var y = win.scrollY || win.pageYOffset || 0;
        ctx.sv = damp(ctx.sv, (y - lastY) / Math.max(dt, 0.001), 10, dt); lastY = y;
        if (reduce) return;
        pars.forEach(function (el) {
          var pr = (el.parentElement || el).getBoundingClientRect(), f = parseFloat(el.getAttribute('data-par')) || 0;
          var c = pr.top + pr.height / 2 - win.innerHeight / 2;
          el._y = damp(el._y, -c * f, 6, dt);
          el.style.transform = 'translate3d(0,' + el._y.toFixed(2) + 'px,0)';
        });
        if (bar) {
          var max = Math.max(1, doc.documentElement.scrollHeight - win.innerHeight);
          bs.t = clamp(y / max, 0, 1); bar.style.transform = 'scaleX(' + clamp(bs.step(dt), 0, 1).toFixed(4) + ')';
        }
      });
    }

    /* ===== 5. 3D tilt stage with depth layers ===== */
    function tilt() {
      var stage = root.querySelector('[data-tilt]'); if (!stage || reduce || !fine) return;
      var layers = [].slice.call(stage.querySelectorAll('[data-depth]')), nx = 0, ny = 0, visible = true;
      stage.style.transformStyle = 'preserve-3d'; stage.style.willChange = 'transform';
      observe(stage, function (e) { visible = e.isIntersecting; }, { threshold: 0 });
      tasks.push(function (dt, t) {
        if (!visible) return;
        var r = stage.getBoundingClientRect(), tx, ty;
        var inside = P.active && P.x >= r.left && P.x <= r.right && P.y >= r.top && P.y <= r.bottom;
        if (inside) { tx = clamp((P.x - (r.left + r.width / 2)) / (win.innerWidth * 0.5), -1, 1); ty = clamp((P.y - (r.top + r.height / 2)) / (win.innerHeight * 0.5), -1, 1); }
        else { tx = 0; ty = 0; }
        nx = damp(nx, tx, 4, dt); ny = damp(ny, ty, 4, dt);
        if (Math.abs(nx - tx) < 0.0001) nx = tx;
        if (Math.abs(ny - ty) < 0.0001) ny = ty;
        stage.style.transform = 'perspective(' + tokens.tilt.perspective + ') rotateX(' + (-ny * parseFloat(tokens.tilt['x-max'])).toFixed(3) + 'deg) rotateY(' + (nx * parseFloat(tokens.tilt['y-max'])).toFixed(3) + 'deg)';
        layers.forEach(function (l, i) {
          var d = parseFloat(l.getAttribute('data-depth')) || 0;
          var targetFloat = inside && performance.now() - P.last < 180 && l.hasAttribute('data-float') ? Math.sin(t * 1.25 + i) * tokens.tilt['float-amplitude'] : 0;
          l._float = damp(l._float || 0, targetFloat, 6, dt);
          if (Math.abs(l._float - targetFloat) < 0.001) l._float = targetFloat;
          var fl = l._float;
          l.style.transform = 'translate3d(' + (nx * d).toFixed(2) + 'px,' + (ny * d * 0.7 + fl).toFixed(2) + 'px,' + (d * 2).toFixed(1) + 'px)';
        });
      });
    }

    /* ===== 6. Magnetic buttons ===== */
    function magnet() {
      var els = [].slice.call(root.querySelectorAll('[data-magnet]')); if (!els.length || reduce || !fine) return;
      els.forEach(function (el) { el._visual = el.querySelector('.button') || el; listen(el, 'click', event => { if (event.target === el) el.querySelector('a')?.click(); }); el._sx = new Spring(0, tokens.spring['magnet-stiffness'], tokens.spring['magnet-damping']); el._sy = new Spring(0, tokens.spring['magnet-stiffness'], tokens.spring['magnet-damping']); });
      tasks.push(function (dt) {
        els.forEach(function (el) {
          var r = el.getBoundingClientRect(), cx = r.left + r.width / 2 - el._sx.x, cy = r.top + r.height / 2 - el._sy.x;
          var dx = P.x - cx, dy = P.y - cy, d = Math.sqrt(dx * dx + dy * dy), R = tokens.magnet.radius;
          if (P.active && d < R && !el._visual.matches(':focus-visible')) { el._sx.t = clamp(dx * tokens.magnet.displacement, -tokens.magnet['max-offset'], tokens.magnet['max-offset']); el._sy.t = clamp(dy * tokens.magnet.displacement, -tokens.magnet['max-offset'], tokens.magnet['max-offset']); } else { el._sx.t = 0; el._sy.t = 0; }
          if (el._sx.rest() && el._sy.rest() && el._sx.t === 0) return;
          el._visual.style.transform = 'translate3d(' + el._sx.step(dt).toFixed(2) + 'px,' + el._sy.step(dt).toFixed(2) + 'px,0)';
        });
      });
    }

    /* ===== 7. Scroll-velocity marquees ===== */
    function marquee() {
      var rows = [].slice.call(root.querySelectorAll('[data-marquee]')); if (!rows.length) return;
      rows.forEach(function (row) {
        var track = row.firstElementChild; row._tr = track; row._pos = 0; row._sk = 0;
        row._visible = true; observe(row, e => { row._visible = e.isIntersecting; }, { threshold: 0 });
        row._dir = parseFloat(row.getAttribute('data-dir')) || -1; row._sp = parseFloat(row.getAttribute('data-speed')) || tokens.marquee['primary-speed'];
        row._half = 1;
        function m() { row._half = Math.max(1, track.scrollWidth / 2); }
        m(); if (win.ResizeObserver) { var ro = new win.ResizeObserver(m); ro.observe(track); cleanups.push(function () { ro.disconnect(); }); }
        track.style.willChange = 'transform';
      });
      if (reduce) return;
      tasks.push(function (dt) {
        var boost = clamp(ctx.sv * tokens.marquee['velocity-gain'], -tokens.marquee['boost-max'], tokens.marquee['boost-max']);
        rows.forEach(function (row) {
          if (!row._visible) return;
          var vel = row._dir * row._sp + boost * -row._dir * -1; /* follows scroll direction */
          row._pos += vel * dt;
          if (row._pos <= -row._half) row._pos += row._half;
          if (row._pos > 0) row._pos -= row._half;
          row._sk = damp(row._sk, clamp(-boost * 0.012, -14, 14), 8, dt);
          row._tr.style.transform = 'translate3d(' + row._pos.toFixed(2) + 'px,0,0) skewX(' + row._sk.toFixed(2) + 'deg)';
        });
      });
    }

    /* ===== 8. Gliding highlight for list rows ===== */
    function highlight() {
      var box = root.querySelector('[data-hl]'); if (!box) return;
      var bar = box.querySelector('[data-hl-bar]'), rows = [].slice.call(box.querySelectorAll('[data-hl-row]'));
      var sy = new Spring(0, tokens.spring['highlight-stiffness'], tokens.spring['highlight-damping']), sh = new Spring(80, tokens.spring['highlight-stiffness'], tokens.spring['highlight-damping']), so = new Spring(0, tokens.spring['highlight-opacity-stiffness'], tokens.spring['highlight-opacity-damping']), active = null;
      rows.forEach(function (row) {
        row._in = row.querySelector('[data-hl-inner]'); row._ar = row.querySelector('[data-hl-arrow]');
        row._x = new Spring(0, tokens.spring['row-stiffness'], tokens.spring['row-damping']); row._a = new Spring(0, tokens.spring['row-arrow-stiffness'], tokens.spring['row-arrow-damping']);
        function on() { active = row; sy.t = row.offsetTop; sh.t = row.offsetHeight; if (so.t === 0) { sy.x = row.offsetTop; sh.x = row.offsetHeight; } so.t = 1; }
        listen(row, 'pointerenter', on); listen(row, 'focus', on);
      });
      listen(box, 'pointerleave', function () { if (!box.contains(doc.activeElement)) { active = null; so.t = 0; } });
      listen(box, 'focusout', event => { if (!box.contains(event.relatedTarget)) { active = null; so.t = 0; } });
      if (reduce) return;
      tasks.push(function (dt) {
        bar.style.opacity = clamp(so.step(dt), 0, 1).toFixed(3);
        bar.style.transform = 'translate3d(0,' + sy.step(dt).toFixed(2) + 'px,0)';
        bar.style.height = Math.max(0, sh.step(dt)).toFixed(2) + 'px';
        rows.forEach(function (row) {
          row._x.t = row === active ? Number.parseFloat(tokens.motion['row-shift']) : 0; row._a.t = row === active ? 1 : 0;
          if (row._in) row._in.style.transform = 'translate3d(' + row._x.step(dt).toFixed(2) + 'px,0,0)';
          if (row._ar) { var a = row._a.step(dt); row._ar.style.opacity = clamp(a, 0, 1).toFixed(3); row._ar.style.transform = 'translate3d(' + ((1 - a) * -14).toFixed(2) + 'px,0,0)'; }
        });
      });
    }

    /* ===== 9. Vib3Pulse: pulse rings + equaliser ===== */
    function pulse() {
      var cv = root.querySelector('[data-pulse]'); if (!cv) return;
      var host = cv.parentElement, g = cv.getContext('2d'), W = 1, H = 1, dpr = 1, rings = [], nextRing = 0, lastPtr = 0, visible = true;
      var BARS = tokens.pulse.bars, bars = [];
      for (var b = 0; b < BARS; b++) bars.push(0);
      function size() {
        var r = host.getBoundingClientRect(); W = Math.max(1, r.width); H = Math.max(1, r.height);
        dpr = Math.min(tokens.wind['dpr-max'], win.devicePixelRatio || 1); cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); g.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      size();
      if (win.ResizeObserver) { var ro = new win.ResizeObserver(size); ro.observe(host); cleanups.push(function () { ro.disconnect(); }); }
      observe(host, function (e) { visible = e.isIntersecting; }, { threshold: 0 });
      if (reduce) { g.strokeStyle = 'rgba(' + productRgb.join(',') + ',' + tokens.pulse['static-alpha'] + ')'; for (var s = 1; s < 6; s++) { g.beginPath(); g.arc(W, H, s * 150, 0, TAU); g.stroke(); } return; }
      tasks.push(function (dt, t) {
        if (!visible) return;
        g.clearRect(0, 0, W, H);
        var r = host.getBoundingClientRect(), inside = P.active && P.x > r.left && P.x < r.right && P.y > r.top && P.y < r.bottom;
        if (t > nextRing) { rings.push({ x: W, y: H, t0: t, dur: tokens.pulse['ring-duration'], R: Math.max(W, H) * 1.15, a: tokens.pulse['ring-alpha'] }); nextRing = t + tokens.pulse.interval; }
        if (inside && t - lastPtr > tokens.pulse['pointer-interval']) { rings.push({ x: P.x - r.left, y: P.y - r.top, t0: t, dur: tokens.pulse['pointer-duration'], R: tokens.pulse['pointer-radius'], a: tokens.pulse['pointer-alpha'] }); lastPtr = t; }
        g.lineWidth = tokens.pulse['line-width'];
        for (var i = rings.length - 1; i >= 0; i--) {
          var o = rings[i], k = (t - o.t0) / o.dur;
          if (k >= 1) { rings.splice(i, 1); continue; }
          var e = 1 - Math.pow(1 - k, 3);
          g.strokeStyle = 'rgba(' + productRgb.join(',') + ',' + (o.a * (1 - k)).toFixed(3) + ')';
          g.beginPath(); g.arc(o.x, o.y, o.R * e, 0, TAU); g.stroke();
        }
        var bw = W / BARS;
        g.fillStyle = 'rgba(' + productRgb.join(',') + ',' + tokens.pulse['bar-alpha'] + ')';
        for (var j = 0; j < BARS; j++) {
          var x = j * bw + bw * 0.5, base = 0.18 + 0.82 * (0.5 + 0.5 * noise3(j * 0.31, t * 0.9, 3.7));
          var boost = 0; if (inside) { var dx = (P.x - r.left) - x; boost = Math.exp(-dx * dx / (2 * 90 * 90)) * 0.9; }
          bars[j] = damp(bars[j], clamp(base * 0.5 + boost, 0.04, 1), 14, dt);
          var h = bars[j] * tokens.pulse['equaliser-height'];
          g.fillRect(x - bw * (tokens.motion['image-reveal-scale'] - 1), H - tokens.pulse['equaliser-bottom'] - h, bw * 0.56, h);
        }
      });
    }

    /* ===== 10. Variable-font weight field ===== */
    function weightField() {
      var box = root.querySelector('[data-wl]'); if (!box) return;
      var ls = [].slice.call(box.querySelectorAll('[data-l]')), visible = true;
      ls.forEach(function (l) { l._w = tokens.letterfield['weight-rest']; });
      observe(box, function (e) { visible = e.isIntersecting; }, { threshold: 0 });
      if (reduce) return;
      tasks.push(function (dt, t) {
        if (!visible) return;
        for (var i = 0; i < ls.length; i++) {
          var l = ls[i], r = l.getBoundingClientRect(), prox = 0;
          if (P.active) { var dx = P.x - (r.left + r.width / 2), dy = P.y - (r.top + r.height / 2); prox = Math.exp(-(dx * dx + dy * dy) / (2 * tokens.letterfield['pointer-radius'] ** 2)); }
          var wave = 0.5 + 0.5 * Math.sin(t * 1.5 - i * 0.5);
          var target = tokens.letterfield['weight-min'] + (tokens.letterfield['weight-max'] - tokens.letterfield['weight-min']) * prox + tokens.letterfield['wave-amplitude'] * wave * (1 - prox);
          l._w = damp(l._w, target, 9, dt);
          l.style.fontVariationSettings = "'wght' " + l._w.toFixed(0) + ", 'opsz' 96";
        }
      });
    }

    /* ===== 11. Pointer spotlight ===== */
    function spotlight() {
      var el = root.querySelector('[data-spot]'); if (!el || reduce || !fine) return;
      var host = el.parentElement, x = 0, y = 0, o = 0, init = false;
      tasks.push(function (dt) {
        var r = host.getBoundingClientRect(), inside = P.active && P.y > r.top && P.y < r.bottom;
        if (inside) { if (!init) { x = P.x - r.left; y = P.y - r.top; init = true; } x = damp(x, P.x - r.left, 7, dt); y = damp(y, P.y - r.top, 7, dt); }
        o = damp(o, inside ? 1 : 0, 4, dt);
        el.style.opacity = o.toFixed(3);
        el.style.transform = 'translate3d(' + (x - parseFloat(tokens.size.spotlight) / 2).toFixed(1) + 'px,' + (y - parseFloat(tokens.size.spotlight) / 2).toFixed(1) + 'px,0)';
      });
    }

    var ctx = { sv: 0 };
    [scrollFx, wind, headline, reveals, tilt, magnet, marquee, highlight, pulse, weightField, spotlight].forEach(function (fn) {
      try { fn(); } catch (err) { if (win.console) win.console.warn('[AeolusMotion]', fn.name, err); }
    });

    function loop(now) {
      if (!alive || doc.hidden) return;
      var dt = Math.min(0.033, Math.max(0.001, (now - (last || now)) / 1000)); last = now; T += dt;
      for (var i = 0; i < tasks.length; i++) tasks[i](dt, T);
      raf = win.requestAnimationFrame(loop);
    }
    if (!reduce && !doc.hidden) raf = win.requestAnimationFrame(loop);
    listen(doc, 'visibilitychange', function () {
      win.cancelAnimationFrame(raf); last = 0;
      if (!doc.hidden && !reduce) raf = win.requestAnimationFrame(loop);
    });

    var sentinel = root.querySelector('[data-wind]');
    return {
      root: root, sentinel: sentinel,
      destroy: function () {
        alive = false; win.cancelAnimationFrame(raf);
        cleanups.forEach(function (c) { try { c(); } catch (e) {} });
        timers.forEach(clearTimeout);
        root.querySelectorAll('[data-marquee]').forEach(el => el.firstElementChild?.style.removeProperty('transform'));
        root.querySelector('[data-hl-bar]')?.style.removeProperty('opacity');
        root.querySelectorAll('[data-hw],[data-reveal],[data-clip],[data-clip-img],[data-par],[data-tilt],[data-depth],[data-magnet],.button,[data-l],[data-hl-inner],[data-hl-arrow]').forEach(el => {
          ['transform','opacity','clip-path','will-change','font-variation-settings'].forEach(key => el.style.removeProperty(key));
        }); 
      }
    };
  }


/** @param {HTMLElement} root @param {boolean} reduced */
export function createHomeMotion(root, reduced = false) {
  return create(root.ownerDocument, root, reduced)
}
