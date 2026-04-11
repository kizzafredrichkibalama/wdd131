/* === ROBOVERSE — main.js ===
   Shared functionality across all pages
   - Navigation toggle (mobile hamburger)
   - Active link highlight
   - Visit counter stored in localStorage
   - Scroll reveal via IntersectionObserver
   - Rotating facts (home page only)
========================================== */

// ── Navigation toggle ────────────────────────
function initNav() {
  const toggle   = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close the mobile menu when a link is tapped
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Highlight the link that matches the current page
  const path = window.location.pathname;

  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href') || '';
    const isHome = href === 'index.html' &&
      (path.endsWith('/') || path.endsWith('/project') || path.endsWith('/project/'));

    if (path.endsWith(href) || isHome) {
      link.classList.add('active');
    }
  });
}

// ── Visit counter (localStorage) ─────────────
function updateVisitCount() {
  const KEY    = 'roboverse_visits';
  const visits = parseInt(localStorage.getItem(KEY) || '0') + 1;
  localStorage.setItem(KEY, String(visits));

  const el = document.querySelector('.visit-count');
  if (el) {
    el.textContent = `Site visits: ${visits}`;
  }
}

// ── Scroll reveal (IntersectionObserver) ─────
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  elements.forEach(el => observer.observe(el));
}

// ── Rotating facts (home page only) ──────────
function initFactRotator() {
  const display = document.querySelector('.fact-display');
  if (!display) return;

  const facts = [
    `The word "robot" was coined in 1920 by Czech playwright Karel Čapek from "robota," meaning forced labor.`,
    `Over 3.5 million industrial robots are currently in operation worldwide, with numbers rising every year.`,
    `The first industrial robot, Unimate, began working on a General Motors assembly line in 1961.`,
    `NASA's Curiosity rover has traveled more than 28 kilometers across the surface of Mars since 2012.`,
    `The da Vinci Surgical System has assisted in over 10 million procedures since its FDA approval in 2000.`,
    `Boston Dynamics' Atlas robot can run, jump, and perform backflips using dynamic balance algorithms.`,
    `Isaac Asimov's Three Laws of Robotics were first published in his 1942 short story "Runaround."`,
    `Japan employs more industrial robots per worker than any other country in the world.`
  ];

  let index = 0;
  display.textContent = facts[0];

  setInterval(() => {
    display.classList.add('fade-out');

    setTimeout(() => {
      index = (index + 1) % facts.length;
      display.textContent = facts[index];
      display.classList.remove('fade-out');
    }, 300);
  }, 5000);
}

// ── Init ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  updateVisitCount();
  initScrollReveal();
  initFactRotator();
});
