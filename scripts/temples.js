// ===== Footer: copyright year & last modified =====
const yearSpan = document.getElementById('year');
const lastModSpan = document.getElementById('lastModified');

if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

if (lastModSpan) {
  lastModSpan.textContent = document.lastModified;
}

// ===== Hamburger / Nav Toggle =====
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('main-nav');

if (hamburger && nav) {
  hamburger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    // Update aria attribute for accessibility
    hamburger.setAttribute('aria-expanded', isOpen.toString());
    // Toggle symbol: 
    hamburger.innerHTML = isOpen ? '&#x2715;' : '&#9776;';
  });

  // Close menu when a nav link is clicked (mobile UX)
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.innerHTML = '&#9776;';
    });
  });
}
