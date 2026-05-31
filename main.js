/* ============================================================
   PORTFOLIO — main.js
   Typing effect · Scroll reveal · Skill bars · Navbar · Mobile
   ============================================================ */

'use strict';

/* ── Typing Effect ──────────────────────────────────────────── */
(function initTyping() {
  const el     = document.getElementById('typed-text');
  if (!el) return;

  const roles  = [
    'Web Developer',
    'UI/UX Enthusiast',
    'React Developer',
    'Frontend Engineer',
    'Problem Solver',
  ];

  let roleIdx  = 0;
  let charIdx  = 0;
  let deleting = false;
  let paused   = false;

  const TYPING_SPEED   = 80;   // ms per character (typing)
  const DELETE_SPEED   = 45;   // ms per character (deleting)
  const PAUSE_AFTER    = 1800; // ms pause at full word
  const PAUSE_BEFORE   = 350;  // ms pause before deleting

  function tick() {
    const current = roles[roleIdx];

    if (paused) { paused = false; }

    if (!deleting) {
      el.textContent = current.slice(0, ++charIdx);
      if (charIdx === current.length) {
        paused = true;
        setTimeout(() => { deleting = true; tick(); }, PAUSE_AFTER);
        return;
      }
    } else {
      el.textContent = current.slice(0, --charIdx);
      if (charIdx === 0) {
        deleting = false;
        roleIdx  = (roleIdx + 1) % roles.length;
        setTimeout(tick, PAUSE_BEFORE);
        return;
      }
    }

    setTimeout(tick, deleting ? DELETE_SPEED : TYPING_SPEED);
  }

  setTimeout(tick, 600);
})();


/* ── Navbar: scroll class + hide/show on direction ─────────── */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentY = window.scrollY;

    // Glassmorphism background after scrolling down 20px
    navbar.classList.toggle('scrolled', currentY > 20);

    lastScrollY = currentY;
  }, { passive: true });
})();


/* ── Mobile hamburger ───────────────────────────────────────── */
(function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  if (!hamburger || !mobileNav) return;

  function closeMenu() {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on link click
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
      closeMenu();
    }
  });
})();


/* ── Scroll Reveal (IntersectionObserver) ───────────────────── */
(function initReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // fire once
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
})();


/* ── Skill bar animation ────────────────────────────────────── */
(function initSkillBars() {
  const fills = document.querySelectorAll('.skill-fill');
  if (!fills.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill  = entry.target;
        const width = fill.getAttribute('data-width') || '0';
        // Short delay so the section reveal animation plays first
        setTimeout(() => { fill.style.width = width + '%'; }, 300);
        observer.unobserve(fill);
      }
    });
  }, { threshold: 0.5 });

  fills.forEach(fill => observer.observe(fill));
})();


/* ── Active nav link highlight on scroll ───────────────────── */
(function initActiveLinks() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a:not(.btn)');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === '#' + entry.target.id
          );
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
})();


/* ── Footer year ────────────────────────────────────────────── */
(function initYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
})();


/* ── Smooth reveal for hero on load ────────────────────────── */
(function initHeroEntrance() {
  const hero = document.querySelector('.hero-content');
  if (!hero) return;
  hero.style.opacity = '0';
  hero.style.transform = 'translateY(20px)';
  hero.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      hero.style.opacity  = '1';
      hero.style.transform = 'translateY(0)';
    });
  });
})();


/* ── ExploreLK Project Detail Modal ────────────────────────── */
function openExploreLKModal() {
  const backdrop = document.getElementById('explorelk-modal');
  if (!backdrop) return;
  backdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
  setTimeout(() => backdrop.focus(), 50);
}

function closeExploreLKModal() {
  const backdrop = document.getElementById('explorelk-modal');
  if (!backdrop) return;
  backdrop.classList.remove('open');
  document.body.style.overflow = '';
}

/* ── Elephant Pulse Project Detail Modal ────────────────────────── */
function openElephantPulseModal() {
  const backdrop = document.getElementById('elephantpulse-modal');
  if (!backdrop) return;
  backdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
  setTimeout(() => backdrop.focus(), 50);
}

function closeElephantPulseModal() {
  const backdrop = document.getElementById('elephantpulse-modal');
  if (!backdrop) return;
  backdrop.classList.remove('open');
  document.body.style.overflow = '';
}

(function initModal() {
  const exploreBackdrop  = document.getElementById('explorelk-modal');
  const exploreCloseBtn  = document.getElementById('modal-close');
  const epBackdrop = document.getElementById('elephantpulse-modal');
  const epCloseBtn = document.getElementById('modal-close-ep');

  // Close buttons
  if (exploreCloseBtn) exploreCloseBtn.addEventListener('click', closeExploreLKModal);
  if (epCloseBtn) epCloseBtn.addEventListener('click', closeElephantPulseModal);

  // Click outside modal panel to close
  if (exploreBackdrop) {
    exploreBackdrop.addEventListener('click', (e) => {
      if (e.target === exploreBackdrop) closeExploreLKModal();
    });
  }
  if (epBackdrop) {
    epBackdrop.addEventListener('click', (e) => {
      if (e.target === epBackdrop) closeElephantPulseModal();
    });
  }

  // Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (exploreBackdrop && exploreBackdrop.classList.contains('open')) closeExploreLKModal();
      if (epBackdrop && epBackdrop.classList.contains('open')) closeElephantPulseModal();
    }
  });
})();

