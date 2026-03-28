// ===== Temple Data Array =====
const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  {
    templeName: "Salt Lake",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 253015,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/salt-lake-city-utah/400x250/salt-lake-temple-37762.jpg"
  },
  {
    templeName: "Nauvoo Illinois",
    location: "Nauvoo, Illinois, United States",
    dedicated: "2002, June, 27",
    area: 54000,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/nauvoo-illinois/400x250/nauvoo-illinois-temple-2005-512259-wallpaper.jpg"
  },
  {
    templeName: "Tokyo Japan",
    location: "Tokyo, Japan",
    dedicated: "1980, October, 27",
    area: 52770,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/tokyo-japan/400x250/tokyo-japan-temple-exterior-768454-wallpaper.jpg"
  }
];

// ===== Helper: Parse the dedication year from "YYYY, Month, DD" =====
function getDedicationYear(dedicated) {
  return parseInt(dedicated.split(',')[0].trim(), 10);
}

// ===== Build Temple Cards =====
function createTempleCard(temple) {
  const fig = document.createElement('figure');

  // --- Caption (top: name + details) ---
  const caption = document.createElement('figcaption');

  const heading = document.createElement('h3');
  heading.textContent = temple.templeName;

  const fields = [
    { label: 'Location', value: temple.location },
    { label: 'Dedicated', value: temple.dedicated },
    { label: 'Size', value: `${temple.area.toLocaleString()} sq ft` }
  ];

  const ul = document.createElement('ul');
  fields.forEach(({ label, value }) => {
    const li = document.createElement('li');
    const strong = document.createElement('strong');
    strong.textContent = `${label}: `;
    li.appendChild(strong);
    li.appendChild(document.createTextNode(value));
    ul.appendChild(li);
  });

  caption.appendChild(heading);
  caption.appendChild(ul);

  // --- Image (bottom) ---
  const img = document.createElement('img');
  img.src = temple.imageUrl;
  img.alt = `${temple.templeName} Temple`;
  img.loading = 'lazy';
  img.width = 400;
  img.height = 250;

  fig.appendChild(caption);
  fig.appendChild(img);

  return fig;
}

// ===== Render Temples into the Gallery =====
function renderTemples(list) {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = '';

  if (list.length === 0) {
    const msg = document.createElement('p');
    msg.className = 'no-results';
    msg.textContent = 'No temples match this filter.';
    gallery.appendChild(msg);
    return;
  }

  list.forEach(temple => {
    gallery.appendChild(createTempleCard(temple));
  });
}

// ===== Filter Logic =====
function getFilteredTemples(filter) {
  switch (filter) {
    case 'old':
      return temples.filter(t => getDedicationYear(t.dedicated) < 1900);
    case 'new':
      return temples.filter(t => getDedicationYear(t.dedicated) > 2000);
    case 'large':
      return temples.filter(t => t.area > 90000);
    case 'small':
      return temples.filter(t => t.area < 10000);
    case 'home':
    default:
      return temples;
  }
}

// ===== Navigation Filtering =====
const navLinks = document.querySelectorAll('#main-nav a');
const pageHeading = document.getElementById('page-heading');

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const filter = link.dataset.filter;

    // Update active state
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');

    // Update heading
    pageHeading.textContent = link.textContent;

    // Render filtered temples
    renderTemples(getFilteredTemples(filter));

    // Close mobile menu
    const nav = document.getElementById('main-nav');
    const hamburger = document.getElementById('hamburger');
    nav.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.innerHTML = '&#9776;';
  });
});

// ===== Hamburger / Nav Toggle =====
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('main-nav');

if (hamburger && nav) {
  hamburger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen.toString());
    hamburger.innerHTML = isOpen ? '&#x2715;' : '&#9776;';
  });
}

// ===== Footer: copyright year & last modified =====
const yearSpan = document.getElementById('year');
const lastModSpan = document.getElementById('lastModified');

if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}
if (lastModSpan) {
  lastModSpan.textContent = document.lastModified;
}

// ===== Initial Render (Home = all temples) =====
renderTemples(temples);
