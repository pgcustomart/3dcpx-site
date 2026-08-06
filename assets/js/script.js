/* ═══════════════════════════════════════════════
   3DCPX — script.js
═══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── NAV: scroll state ────────────────────── */
  const nav = document.getElementById('nav');
  function updateNav() {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  /* ── NAV: mobile hamburger ─────────────────── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';

    const spans = hamburger.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });

  /* ── SCROLL REVEAL ────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        // Stagger siblings
        const siblings = entry.target.parentElement.querySelectorAll('.reveal');
        let delay = 0;
        siblings.forEach((sib, i) => {
          if (sib === entry.target) delay = i * 80;
        });
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ── USE CASE TABS ────────────────────────── */
  const tabBtns   = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const panel = document.getElementById(`tab-${target}`);
      if (panel) panel.classList.add('active');
    });
  });

  /* ── FAQ ACCORDION ────────────────────────── */
  const faqItems = document.querySelectorAll('.faq-item__q');

  faqItems.forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      const answer   = btn.nextElementSibling;

      // Close all
      faqItems.forEach(b => {
        b.setAttribute('aria-expanded', 'false');
        b.nextElementSibling.classList.remove('open');
      });

      // Toggle current
      if (!expanded) {
        btn.setAttribute('aria-expanded', 'true');
        answer.classList.add('open');
      }
    });
  });

  /* ── BACK TO TOP ──────────────────────────── */
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 600);
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ── CONTACT FORM ─────────────────────────── */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;

      btn.textContent = 'Enviando...';
      btn.disabled = true;

      // Simulate async send — replace with real API call
      setTimeout(() => {
        btn.textContent = 'Mensagem enviada!';
        btn.style.background = '#3a9c6a';
        btn.style.borderColor = '#3a9c6a';

        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.style.borderColor = '';
          btn.disabled = false;
          form.reset();
        }, 3000);
      }, 1200);
    });
  }

  /* ── SMOOTH ANCHOR SCROLL (offset for fixed nav) ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      const navHeight = nav.offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ── PROGRESS BARS: animate on view ─────── */
  const progressBars = document.querySelectorAll('.progress-bar__fill');
  const barObserver  = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.style.getPropertyValue('--pct') || '0%';
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  progressBars.forEach(bar => {
    const pct = getComputedStyle(bar).getPropertyValue('--pct').trim();
    bar.style.setProperty('--pct', pct);
    bar.style.width = '0%';
    barObserver.observe(bar);
  });

  /* ── NUMBER COUNTER ANIMATION ─────────────── */
  function animateCount(el, from, to, duration, suffix) {
    const start = performance.now();
    const isDecimal = String(to).includes('.');
    function step(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      const current  = from + (to - from) * eased;
      el.textContent = (isDecimal ? current.toFixed(1) : Math.round(current)) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const statNums = document.querySelectorAll('.stat__num');
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el   = entry.target;
        const text = el.textContent.trim();

        if (text.startsWith('+')) {
          const num = parseInt(text.replace(/\D/g, ''));
          animateCount(el, 0, num, 1600, '+');
        } else if (text.endsWith('anos')) {
          animateCount(el, 0, parseInt(text), 1400, ' anos');
        } else if (text.endsWith('+')) {
          animateCount(el, 0, parseInt(text), 1400, '+');
        }

        statObserver.unobserve(el);
      }
    });
  }, { threshold: 0.8 });

  statNums.forEach(el => statObserver.observe(el));

});
