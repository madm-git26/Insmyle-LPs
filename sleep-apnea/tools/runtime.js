/**
 * Standalone runtime — the same behaviour as the React build, in vanilla JS.
 * No framework, no dependencies. Everything degrades to a readable page if
 * this script fails to run.
 */
(function () {
  'use strict';

  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var CONFIG = window.__LP_CONFIG__ || {};

  /* ---------------- attribution (UTM / GCLID) ---------------- */
  var KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
              'gclid', 'gbraid', 'wbraid', 'msclkid', 'variant'];
  var STORE = 'sa_lp_attribution';

  function attribution() {
    try { return JSON.parse(sessionStorage.getItem(STORE) || '{}'); } catch (e) { return {}; }
  }
  (function capture() {
    var params = new URLSearchParams(window.location.search);
    var found = attribution();
    KEYS.forEach(function (k) { if (params.get(k)) found[k] = params.get(k); });
    try { sessionStorage.setItem(STORE, JSON.stringify(found)); } catch (e) { /* private mode */ }
  })();

  /* ---------------- ad-group message match ----------------
     Swaps the hero to mirror the intent that paid for the click. Resolution:
     ?variant= → utm_content / utm_term keyword sniff → default. Everything
     below the hero is shared. */
  (function messageMatch() {
    var variants = CONFIG.variants;
    if (!variants) return;
    var params = new URLSearchParams(window.location.search);
    var key = params.get('variant');

    if (!key || !variants[key]) {
      var hay = [params.get('utm_content'), params.get('utm_term'), params.get('kw')]
        .filter(Boolean).join(' ');
      key = /oral[\s_-]?appliance|mouth[\s_-]?(guard|piece)/i.test(hay) ? 'oral_appliance'
          : /snor/i.test(hay) ? 'snoring'
          : /cpap/i.test(hay) ? 'cpap_alternative'
          : 'default';
    }
    var v = variants[key];
    if (!v || key === 'default') return;

    var copy = document.querySelector('.hero__copy');
    if (!copy) return;
    copy.querySelector('.eyebrow').textContent = v.eyebrow;
    copy.querySelector('h1').innerHTML = v.headlineLines
      .map(function (line) {
        var span = document.createElement('span');
        span.style.display = 'block';
        span.textContent = line;
        return span.outerHTML;
      }).join('');
    var lede = copy.querySelector('.hero__lede');
    lede.innerHTML = '';
    v.paragraphs.forEach(function (text, i) {
      var p = document.createElement('p');
      if (i === 0) p.className = 'lede';
      p.textContent = text;
      lede.appendChild(p);
    });
    var primary = copy.querySelector('[data-book]');
    if (primary) primary.textContent = v.primaryCta;
  })();

  /* ---------------- analytics ---------------- */
  function device() {
    var w = window.innerWidth;
    return w < 768 ? 'mobile' : w < 1024 ? 'tablet' : 'desktop';
  }
  function track(event, payload) {
    var data = Object.assign({ event: event, device: device() }, attribution(), payload || {});
    if (Array.isArray(window.dataLayer)) window.dataLayer.push(data);
    else if (typeof window.gtag === 'function') window.gtag('event', event, data);
  }

  /** Keep campaign parameters on outbound links (never on tel:). */
  function decorateLinks() {
    var attr = attribution();
    if (!Object.keys(attr).length) return;
    document.querySelectorAll('a[href]').forEach(function (a) {
      var href = a.getAttribute('href');
      if (!href || /^(tel:|mailto:|#)/.test(href)) return;
      try {
        var url = new URL(href, window.location.origin);
        Object.keys(attr).forEach(function (k) {
          if (!url.searchParams.has(k)) url.searchParams.set(k, attr[k]);
        });
        a.setAttribute('href', url.origin === window.location.origin
          ? url.pathname + url.search + url.hash : url.toString());
      } catch (e) { /* leave the link alone */ }
    });
  }
  decorateLinks();

  document.addEventListener('click', function (e) {
    var call = e.target.closest('[data-call]');
    if (call) track('sleep_apnea_call_click', { cta_location: call.dataset.call });
    var cta = e.target.closest('[data-cta]');
    if (cta) track('sleep_apnea_cta_click', { cta_location: cta.dataset.cta });
  });

  /* ---------------- scroll depth ---------------- */
  (function scrollDepth() {
    var marks = [[50, 'scroll_50'], [75, 'scroll_75'], [90, 'scroll_90']];
    var fired = {}, ticking = false;
    function measure() {
      ticking = false;
      var max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      var pct = (window.scrollY / max) * 100;
      marks.forEach(function (m) {
        if (pct >= m[0] && !fired[m[1]]) { fired[m[1]] = true; track(m[1], { depth: m[0] }); }
      });
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(measure); }
    }, { passive: true });
  })();

  /* ---------------- sticky header ---------------- */
  (function header() {
    var el = document.getElementById('site-header');
    if (!el) return;
    var ticking = false;
    function measure() { ticking = false; el.classList.toggle('is-stuck', window.scrollY > 80); }
    measure();
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(measure); }
    }, { passive: true });
  })();

  /* ---------------- mobile menu ---------------- */
  (function menu() {
    var menuEl = document.getElementById('mobile-menu');
    var burger = document.querySelector('[data-menu-open]');
    if (!menuEl || !burger) return;
    function open(state) {
      menuEl.hidden = !state;
      burger.setAttribute('aria-expanded', String(state));
      document.body.style.overflow = state ? 'hidden' : '';
      if (state) menuEl.querySelector('a, button').focus();
    }
    burger.addEventListener('click', function () { open(true); });
    menuEl.addEventListener('click', function (e) {
      if (e.target.closest('[data-menu-close]')) open(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !menuEl.hidden) open(false);
    });
  })();

  /* ---------------- reveal on scroll ---------------- */
  (function reveals() {
    var nodes = document.querySelectorAll('.reveal');
    if (reduced || !('IntersectionObserver' in window)) {
      nodes.forEach(function (n) { n.classList.add('is-visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    nodes.forEach(function (n) { io.observe(n); });
  })();

  /* ---------------- breathing hero loop ---------------- */
  (function breathingHero() {
    var el = document.getElementById('breathing-hero');
    if (!el || reduced || !('IntersectionObserver' in window)) return;
    // Pause the loop whenever it is off-screen, to keep it off the CPU.
    new IntersectionObserver(function (entries) {
      el.classList.toggle('is-animating', entries[0].isIntersecting);
    }, { threshold: 0.25 }).observe(el);
  })();

  /* ---------------- breathing timeline draw ---------------- */
  (function timeline() {
    var el = document.getElementById('timeline-chart');
    if (!el) return;
    if (reduced || !('IntersectionObserver' in window)) { el.classList.add('is-visible'); return; }
    var io = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) { el.classList.add('is-visible'); io.disconnect(); }
    }, { threshold: 0.4 });
    io.observe(el);
  })();

  /* ---------------- airway state machine ---------------- */
  (function airway() {
    var viz = document.getElementById('airway-viz');
    if (!viz) return;
    var readout = viz.querySelector('.airway__readout');
    var label = readout && readout.querySelector('span');
    var figures = viz.querySelectorAll('.airway-state');
    var LABELS = CONFIG.airwayStates || {};
    var ORDER = ['NORMAL', 'RESTRICTED', 'INTERRUPTED', 'RECOVERING'];

    function apply(state) {
      if (readout) readout.setAttribute('data-state', state);
      if (label && LABELS[state]) label.textContent = LABELS[state];
      var active = (state === 'NORMAL' || state === 'RECOVERING') ? 'NORMAL' : 'INTERRUPTED';
      figures.forEach(function (f) { f.classList.toggle('is-active', f.dataset.state === active); });
    }
    apply('NORMAL');
    if (reduced) return;

    var desktop = window.matchMedia('(min-width: 1024px)').matches;
    if (desktop) {
      // Scroll drives the sequence, rAF-throttled.
      var ticking = false;
      function measure() {
        ticking = false;
        var r = viz.getBoundingClientRect();
        var p = Math.min(1, Math.max(0, (window.innerHeight - r.top) / (r.height + window.innerHeight)));
        apply(p < 0.25 ? 'NORMAL' : p < 0.5 ? 'RESTRICTED' : p < 0.85 ? 'INTERRUPTED' : 'RECOVERING');
      }
      window.addEventListener('scroll', function () {
        if (!ticking) { ticking = true; requestAnimationFrame(measure); }
      }, { passive: true });
      measure();
    } else if ('IntersectionObserver' in window) {
      // Mobile gets a cheap timed loop instead of scroll-linked work.
      var i = 0, timer = null;
      new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting && !timer) {
          timer = setInterval(function () { i = (i + 1) % ORDER.length; apply(ORDER[i]); }, 2200);
        } else if (!entries[0].isIntersecting && timer) {
          clearInterval(timer); timer = null;
        }
      }, { threshold: 0.2 }).observe(viz);
    }
  })();

  /* ---------------- step activation ---------------- */
  (function stepLists() {
    var steps = document.querySelectorAll('[data-step]');
    if (!steps.length) return;
    if (reduced || !('IntersectionObserver' in window)) {
      steps.forEach(function (s) { s.classList.add('is-active'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('is-active'); io.unobserve(entry.target); }
      });
    }, { threshold: 0.4, rootMargin: '0px 0px -10% 0px' });
    steps.forEach(function (s) { io.observe(s); });
  })();

  /* ---------------- FAQ accordion ---------------- */
  (function accordion() {
    var items = document.querySelectorAll('.accordion__item');
    items.forEach(function (item) {
      var trigger = item.querySelector('.accordion__trigger');
      var panel = item.querySelector('.accordion__panel');
      trigger.addEventListener('click', function () {
        var isOpen = item.dataset.state === 'open';
        // One panel at a time on mobile; desktop allows several.
        if (!isOpen && window.matchMedia('(max-width: 1023px)').matches) {
          items.forEach(function (other) { if (other !== item) close(other); });
        }
        if (isOpen) close(item);
        else {
          item.dataset.state = 'open';
          trigger.setAttribute('aria-expanded', 'true');
          panel.style.height = panel.scrollHeight + 'px';
          panel.style.opacity = '1';
          track('faq_open', { faq_question: trigger.textContent.trim() });
        }
      });
    });
    function close(item) {
      item.dataset.state = 'closed';
      item.querySelector('.accordion__trigger').setAttribute('aria-expanded', 'false');
      var panel = item.querySelector('.accordion__panel');
      panel.style.height = '0px';
      panel.style.opacity = '0';
    }
  })();

  /* ---------------- mobile sticky CTA ---------------- */
  (function stickyCta() {
    var bar = document.getElementById('sticky-cta');
    var heroEl = document.getElementById('top');
    var finalEl = document.getElementById('final-cta');
    if (!bar || !heroEl || !finalEl || !('IntersectionObserver' in window)) return;

    var state = { hero: true, final: false };
    function apply() {
      var show = !state.hero && !state.final;
      bar.classList.toggle('is-visible', show);
      bar.setAttribute('aria-hidden', String(!show));
      bar.querySelectorAll('.btn').forEach(function (b) { b.tabIndex = show ? 0 : -1; });
    }
    function watch(el, key) {
      new IntersectionObserver(function (entries) {
        state[key] = entries[0].isIntersecting; apply();
      }, { threshold: 0.15 }).observe(el);
    }
    watch(heroEl, 'hero');
    watch(finalEl, 'final');
    apply();
  })();

  /* ---------------- booking dialog + form ---------------- */
  (function booking() {
    var backdrop = document.getElementById('booking-backdrop');
    var modal = document.getElementById('booking-modal');
    var form = document.getElementById('booking-form');
    var success = document.getElementById('booking-success');
    var submit = document.getElementById('booking-submit');
    var formError = document.getElementById('form-error');
    if (!backdrop || !form) return;

    var lastFocus = null;
    var started = false;
    var SUBMITTING = CONFIG.submitting || 'Scheduling…';
    var SUBMIT_LABEL = submit.textContent;

    var RULES = {
      firstName: function (v) { return v.trim() ? '' : MSG.required; },
      lastName: function (v) { return v.trim() ? '' : MSG.required; },
      phone: function (v) {
        if (!v.trim()) return MSG.required;
        return v.replace(/\D/g, '').length >= 10 ? '' : MSG.phone;
      },
      email: function (v) {
        if (!v.trim()) return MSG.required;
        return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : MSG.email;
      }
    };
    var MSG = CONFIG.validation || {
      required: 'This field is required.',
      phone: 'Please enter a valid phone number.',
      email: 'Please enter a valid email address.'
    };

    function open(location) {
      lastFocus = document.activeElement;
      backdrop.hidden = false;
      document.body.style.overflow = 'hidden';
      (modal.querySelector('input') || modal).focus();
      track('sleep_apnea_booking_start', { cta_location: location });
    }
    function close() {
      backdrop.hidden = true;
      document.body.style.overflow = '';
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    document.addEventListener('click', function (e) {
      var opener = e.target.closest('[data-book]');
      if (opener) {
        track('sleep_apnea_cta_click', { cta_location: opener.dataset.book, cta_label: opener.textContent.trim() });
        open(opener.dataset.book);
        return;
      }
      if (e.target.closest('[data-book-close]') || e.target === backdrop) close();
    });

    document.addEventListener('keydown', function (e) {
      if (backdrop.hidden) return;
      if (e.key === 'Escape') { close(); return; }
      if (e.key !== 'Tab') return;
      var f = modal.querySelectorAll('a[href], button:not([disabled]), input, select, textarea');
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });

    function setError(name, message) {
      var input = form.querySelector('[data-validate="' + name + '"]');
      if (!input) return;
      var wrap = input.closest('.field');
      var out = document.getElementById('error-' + name);
      wrap.dataset.invalid = message ? 'true' : 'false';
      out.textContent = message;
      out.hidden = !message;
      if (message) input.setAttribute('aria-invalid', 'true');
      else input.removeAttribute('aria-invalid');
    }

    form.addEventListener('input', function (e) {
      if (!started) { started = true; track('sleep_apnea_form_start', {}); }
      var name = e.target.dataset.validate;
      // Clear an error once the value becomes valid — never introduce one while typing.
      if (name && RULES[name] && !RULES[name](e.target.value)) setError(name, '');
    });
    form.addEventListener('blur', function (e) {
      var name = e.target.dataset.validate;
      if (name && RULES[name]) setError(name, RULES[name](e.target.value));
    }, true);

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var firstInvalid = null;
      Object.keys(RULES).forEach(function (name) {
        var input = form.querySelector('[data-validate="' + name + '"]');
        var msg = RULES[name](input.value);
        setError(name, msg);
        if (msg && !firstInvalid) firstInvalid = input;
      });
      if (firstInvalid) { firstInvalid.focus(); return; }

      formError.hidden = true;
      submit.disabled = true;
      submit.textContent = SUBMITTING;
      track('sleep_apnea_form_submit', {});

      // Demo build: no endpoint is wired up. Replace this block with a POST to
      // the practice's CRM / scheduler and keep the same success handling.
      var payload = Object.assign({}, attribution());
      new FormData(form).forEach(function (v, k) { payload[k] = v; });
      if (window.SLEEP_APNEA_LEAD_ENDPOINT) {
        fetch(window.SLEEP_APNEA_LEAD_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }).then(function (r) { if (!r.ok) throw new Error('failed'); showSuccess(); })
          .catch(function () {
            formError.hidden = false;
            submit.disabled = false;
            submit.textContent = SUBMIT_LABEL;
          });
      } else {
        setTimeout(showSuccess, 600);
      }

      function showSuccess() {
        form.hidden = true;
        success.hidden = false;
        submit.disabled = false;
        submit.textContent = SUBMIT_LABEL;
        track('sleep_apnea_booking_complete', {});
      }
    });
  })();
})();
