// Code Alchemist: menu, active section, reveal, contact form. No dependencies.
(function () {
  'use strict';
  document.documentElement.classList.add('js');

  // Footer year
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  // Mobile menu: real button, aria-expanded, Escape closes and returns focus.
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    var iOpen = toggle.querySelector('.i-open');
    var iClose = toggle.querySelector('.i-close');
    var setOpen = function (open) {
      nav.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      if (iOpen && iClose) { iOpen.toggleAttribute('hidden', open); iClose.toggleAttribute('hidden', !open); }
    };
    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });
    window.matchMedia('(min-width: 861px)').addEventListener('change', function (m) {
      if (m.matches) setOpen(false);
    });
  }

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Highlight the section in view.
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav-list a[href^="#"]'));
  if ('IntersectionObserver' in window && links.length) {
    var byId = {};
    links.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var a = byId[en.target.id];
        if (!a || !en.isIntersecting) return;
        links.forEach(function (l) { l.classList.remove('is-current'); });
        a.classList.add('is-current');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(byId).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) spy.observe(el);
    });
  }

  // Reveal on scroll (skipped for reduced motion or old browsers).
  var items = document.querySelectorAll('.reveal');
  if (reduced || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el) { io.observe(el); });
  }

  // Contact form: Netlify Forms via fetch, with an announced status.
  var form = document.querySelector('form[name="contact"]');
  if (form) {
    form.noValidate = true; // JS shows its own message; without JS the browser validates.
    var status = form.querySelector('.form-status');
    var button = form.querySelector('button[type="submit"]');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      status.className = 'form-status';
      if (!form.checkValidity()) {
        status.textContent = 'Please fill in your name, a valid email and a message.';
        status.classList.add('err');
        var bad = form.querySelector(':invalid');
        if (bad) bad.focus();
        return;
      }
      button.disabled = true;
      status.textContent = 'Sending…';
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form)).toString()
      }).then(function (res) {
        if (!res.ok) throw new Error(String(res.status));
        form.reset();
        status.textContent = 'Thank you. Your message is on its way, and I’ll reply by email.';
        status.classList.add('ok');
      }).catch(function () {
        status.textContent = 'Sorry, that didn’t send. Please try again, or message me on LinkedIn.';
        status.classList.add('err');
      }).finally(function () {
        button.disabled = false;
      });
    });
  }
})();
