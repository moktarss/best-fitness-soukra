/* ============================================================
   FITOVA — animations
   Moteur : Motion (motion.dev), la bibliothèque d'animation
   utilisée par Framer — donc le même ressenti que le site de
   référence : mêmes courbes, mêmes cascades, et surtout un
   scroll réellement « lié » (scrub) et non simulé.

   - inView()  → apparitions déclenchées à l'entrée dans l'écran
   - animate() → keyframes (opacity / filter / transform)
   - stagger() → cascades
   - scroll()  → animations pilotées par la position de scroll
   ============================================================ */
(function () {
  'use strict';

  var M = window.Motion;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Sécurité : sans la bibliothèque (ou en mouvement réduit),
     on révèle tout immédiatement plutôt que de laisser la page vide. */
  if (!M || reduced) {
    document.documentElement.classList.add('no-motion');
  }

  var EASE = [0.44, 0, 0.06, 1];   // courbe d'accélération Framer
  var DUR = 0.8;

  /* ---------- 1. Découpage des titres en mots ---------- */
  function splitWords(el) {
    if (el.dataset.split === 'done') return;
    var tmp = document.createElement('div');
    tmp.innerHTML = el.innerHTML;
    var out = '';

    function walk(node, color) {
      Array.prototype.forEach.call(node.childNodes, function (n) {
        if (n.nodeType === 3) {
          n.textContent.split(/(\s+)/).forEach(function (w) {
            if (!w.trim()) { out += w; return; }
            out += '<span class="split-word"' + (color ? ' style="color:' + color + '"' : '') +
              '><i>' + w + '</i></span>';
          });
        } else if (n.nodeName === 'BR') {
          out += '<br>';
        } else if (n.nodeName === 'IMG' || n.nodeName === 'SVG') {
          out += n.outerHTML;
        } else if (n.nodeType === 1) {
          var c = n.classList && n.classList.contains('green') ? 'var(--green)'
            : n.classList && n.classList.contains('muted-title') ? 'var(--muted)'
              : n.classList && n.classList.contains('dim') ? '#c4c4c4' : color;
          walk(n, c);
        }
      });
    }
    walk(tmp, null);
    el.innerHTML = out;
    el.dataset.split = 'done';
  }

  /* ---------- 2. Apparitions de blocs ---------- */
  var KEYFRAMES = {
    'up':    { opacity: [0, 1], y: [80, 0] },
    'down':  { opacity: [0, 1], y: [-80, 0] },
    'up-sm': { opacity: [0, 1], y: [28, 0] },
    'fade':  { opacity: [0, 1] },
    'blur':  { opacity: [0, 1], filter: ['blur(10px)', 'blur(0px)'], y: [10, 0] },
    'img':   {
      opacity: [0, 1],
      clipPath: ['inset(12% 6% 12% 6% round 12px)', 'inset(0% 0% 0% 0% round 12px)'],
      scale: [1.06, 1]
    }
  };

  function framesFor(el) {
    var kind = el.getAttribute('data-anim');
    var kf = KEYFRAMES[kind];
    if (!kf) return null;
    // le lettrage fantôme ne monte qu'à 4 % d'opacité
    if (el.classList.contains('ghost-text')) {
      kf = Object.assign({}, kf, { opacity: [0, 0.04] });
    }
    return kf;
  }

  function reveal(els, step, instant) {
    var list = [].slice.call(els).filter(framesFor);
    if (!list.length) return;
    // on regroupe par type d'animation pour garder une cascade propre
    var groups = {};
    list.forEach(function (el) {
      var k = el.getAttribute('data-anim') + (el.classList.contains('ghost-text') ? '-ghost' : '');
      (groups[k] = groups[k] || []).push(el);
    });
    Object.keys(groups).forEach(function (k) {
      var g = groups[k];
      M.animate(g, framesFor(g[0]), {
        duration: instant ? 0 : DUR,
        easing: EASE,
        delay: instant ? 0 : (step ? M.stagger(step) : 0)
      });
    });
  }

  /* Filet de sécurité : un saut de défilement brutal (barre de défilement,
     Ctrl+Fin, ancre) peut faire « sauter » un élément sans qu'il n'entre
     jamais dans le champ de l'observateur. On le révèle alors directement. */
  var pending = [];
  function done(entry) {
    var i = pending.indexOf(entry);
    if (i > -1) pending.splice(i, 1);
  }
  function sweep() {
    for (var i = pending.length - 1; i >= 0; i--) {
      var e = pending[i];
      if (e.el.getBoundingClientRect().bottom < 0) { e.run(true); done(e); }
    }
  }
  var sweeping = false;
  window.addEventListener('scroll', function () {
    if (sweeping || !pending.length) return;
    sweeping = true;
    requestAnimationFrame(function () { sweep(); sweeping = false; });
  }, { passive: true });

  function watch(el, run, opts) {
    var entry = { el: el, run: run };
    pending.push(entry);
    M.inView(el, function () { run(false); done(entry); }, opts);
  }

  /* titres : blur-in mot par mot */
  if (M && !reduced) {
    document.querySelectorAll('[data-split]').forEach(function (el) {
      splitWords(el);
      var words = el.querySelectorAll('.split-word i');
      if (!words.length) return;
      watch(el, function (instant) {
        M.animate(
          words,
          { opacity: [0, 1], filter: ['blur(10px)', 'blur(0px)'], y: [10, 0] },
          {
            duration: instant ? 0 : DUR,
            delay: instant ? 0 : M.stagger(0.06),
            easing: EASE
          }
        );
      }, { amount: 0.2, margin: '0px 0px -8% 0px' });
    });
  } else {
    document.querySelectorAll('[data-split]').forEach(splitWords);
  }

  if (M && !reduced) {
    // grilles en cascade
    document.querySelectorAll('[data-stagger]').forEach(function (grid) {
      var step = parseFloat(grid.getAttribute('data-stagger')) || 0.09;
      var kids = [].slice.call(grid.children).filter(function (c) {
        return c.hasAttribute('data-anim');
      });
      if (!kids.length) return;
      kids.forEach(function (k) { k.dataset.grouped = '1'; });
      watch(grid, function (instant) { reveal(kids, instant ? 0 : step, instant); },
        { amount: 0.1, margin: '0px 0px -6% 0px' });
    });

    // éléments isolés
    document.querySelectorAll('[data-anim]').forEach(function (el) {
      if (el.dataset.grouped) return;
      watch(el, function (instant) { reveal([el], 0, instant); },
        { amount: 0.15, margin: '0px 0px -8% 0px' });
    });
  }

  /* ---------- 3. Scroll-scrub (animations liées au défilement) ----------
     scroll() de Motion relie la progression de l'animation à la position
     de scroll — c'est le mécanisme utilisé par le site de référence
     (useScroll + useTransform côté Framer). La courbe est donc linéaire :
     l'élément suit le doigt, il ne « rejoue » pas une transition.
  --------------------------------------------------------------------- */
  if (M && !reduced) {
    var amp = Math.min(1, window.innerWidth / 1200);
    document.querySelectorAll('[data-scrub]').forEach(function (el) {
      var cfg = {};
      el.getAttribute('data-scrub').split(';').forEach(function (part) {
        var kv = part.split(':');
        if (kv.length === 2) cfg[kv[0].trim()] = parseFloat(kv[1]);
      });

      var from = '', to = '';
      if (cfg.s) { from += 'scale(' + cfg.s + ') '; to += 'scale(1) '; }
      if (cfg.x) { from += 'translateX(' + (cfg.x * amp) + 'px) '; to += 'translateX(0px) '; }
      if (cfg.y) { from += 'translateY(' + cfg.y + 'px) '; to += 'translateY(0px) '; }
      if (!from) return;

      M.scroll(
        M.animate(el, { transform: [from.trim(), to.trim()] }, { easing: 'linear' }),
        { target: el, offset: ['start end', 'start 0.15'] }
      );
    });
  }

  /* ---------- 4. Menu ---------- */
  var menuBtn = document.querySelector('[data-menu-btn]');
  var menuPanel = document.querySelector('[data-menu-panel]');
  if (menuBtn && menuPanel) {
    var label = menuBtn.querySelector('.mlabel') || menuBtn;
    var close = function () {
      menuPanel.classList.remove('is-open');
      label.textContent = 'MENU';
      menuBtn.setAttribute('aria-expanded', 'false');
    };
    menuBtn.addEventListener('click', function (ev) {
      ev.stopPropagation();
      var open = menuPanel.classList.toggle('is-open');
      label.textContent = open ? 'CLOSE' : 'MENU';
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('click', function (ev) {
      if (!menuPanel.classList.contains('is-open')) return;
      if (menuPanel.contains(ev.target) || menuBtn.contains(ev.target)) return;
      close();
    });
    document.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape' && menuPanel.classList.contains('is-open')) close();
    });
  }

  /* ---------- 5. Header au scroll ---------- */
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- 6. Accordéon programmes ---------- */
  var progItems = document.querySelectorAll('.prog-item');
  progItems.forEach(function (item) {
    item.addEventListener('click', function () {
      var active = item.classList.contains('is-active');
      progItems.forEach(function (i) { i.classList.remove('is-active'); });
      if (!active) item.classList.add('is-active');
    });
  });

  /* ---------- 7. FAQ ---------- */
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    var q = item.querySelector('.faq-q');
    if (!q) return;
    q.addEventListener('click', function () {
      var open = item.classList.contains('is-open');
      faqItems.forEach(function (i) { i.classList.remove('is-open'); });
      if (!open) item.classList.add('is-open');
    });
  });

  /* ---------- 8. « Load more » ---------- */
  document.querySelectorAll('[data-loadmore]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var sel = btn.getAttribute('data-loadmore');
      var hidden = document.querySelectorAll(sel + ' .is-hidden');
      if (!hidden.length) { btn.style.display = 'none'; return; }
      var batch = [].slice.call(hidden, 0, 3);
      batch.forEach(function (el) { el.classList.remove('is-hidden'); });
      if (M && !reduced) reveal(batch, 0.09);
      if (!document.querySelectorAll(sel + ' .is-hidden').length) btn.style.display = 'none';
    });
  });

  /* ---------- 9. Compteurs ---------- */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var prefix = el.getAttribute('data-prefix') || '';
    var suffix = el.getAttribute('data-suffix') || '';
    var t0 = null, dur = 1600;
    function frame(t) {
      if (!t0) t0 = t;
      var p = Math.min((t - t0) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + Math.round(target * eased).toLocaleString('en-US') + suffix;
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
  document.querySelectorAll('[data-count]').forEach(function (el) {
    if (M && !reduced) {
      M.inView(el, function () { animateCount(el); }, { amount: 0.6 });
    } else {
      var v = parseFloat(el.getAttribute('data-count'));
      el.textContent = (el.getAttribute('data-prefix') || '') +
        v.toLocaleString('en-US') + (el.getAttribute('data-suffix') || '');
    }
  });

  /* ---------- 10. Marquees ---------- */
  document.querySelectorAll('[data-marquee]').forEach(function (track) {
    track.innerHTML += track.innerHTML;
  });

  /* ---------- 11. Formulaires (démo) ---------- */
  document.querySelectorAll('form[data-demo]').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var b = f.querySelector('.btn span');
      if (!b) return;
      var old = b.textContent;
      b.textContent = 'MESSAGE ENVOYÉ';
      setTimeout(function () { b.textContent = old; f.reset(); }, 2200);
    });
  });

  /* ---------- 12. Année courante ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
