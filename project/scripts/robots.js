/* ROBOVERSE — robots.js 
   Robot gallery page functionality
   - Robot data (array of objects)
   - renderCards() using template literals
   - filterRobots() using Array.filter()
   - localStorage: persist last selected filter
 */

// ── Robot data ────
const robots = [
  {
    id: 1,
    name: 'KUKA KR AGILUS',
    category: 'industrial',
    description: 'A high-speed, 6-axis robot arm used in automotive assembly, welding, and precision manufacturing. Capable of sub-millimeter accuracy at up to 7,200 cycles per hour.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/KUKA_Industrial_Robots_IR.jpg/480px-KUKA_Industrial_Robots_IR.jpg',
    alt: 'KUKA industrial robot arms in a manufacturing facility',
    year: 1973,
    origin: 'Germany'
  },
  {
    id: 2,
    name: 'FANUC ARC Mate',
    category: 'industrial',
    description: 'A welding robot engineered for arc welding in high-volume manufacturing. Its compact design and precise repeatability make it a staple of automotive and metal fabrication plants globally.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/FANUC_6-axis_welding_robots.jpg/480px-FANUC_6-axis_welding_robots.jpg',
    alt: 'FANUC welding robots on an industrial factory floor',
    year: 1974,
    origin: 'Japan'
  },
  {
    id: 3,
    name: 'da Vinci Surgical System',
    category: 'medical',
    description: 'A robotic surgical platform that gives surgeons enhanced precision and control during minimally invasive procedures. FDA-approved in 2000, it has assisted in over 10 million surgeries worldwide.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Laproscopic_Surgery_Robot.jpg/480px-Laproscopic_Surgery_Robot.jpg',
    alt: 'Da Vinci robotic surgical system arms in an operating room',
    year: 2000,
    origin: 'USA'
  },
  {
    id: 4,
    name: 'TUG Autonomous Hospital Robot',
    category: 'medical',
    description: 'An autonomous mobile robot that navigates hospital corridors to deliver medications, lab specimens, and supplies. TUG reduces staff workload and lowers contamination risk in clinical environments.',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Aethon_TUG_autonomous_mobile_robot.jpg?width=480',
    alt: 'TUG autonomous delivery robot in a hospital hallway',
    year: 2004,
    origin: 'USA'
  },
  {
    id: 5,
    name: 'iRobot Roomba',
    category: 'service',
    description: 'The world\'s best-selling robotic vacuum cleaner. The Roomba uses onboard sensors and AI mapping to navigate and clean home floors autonomously, adapting its route around obstacles.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Roomba_Discovery.jpg/480px-Roomba_Discovery.jpg',
    alt: 'iRobot Roomba robotic vacuum cleaner on a hardwood floor',
    year: 2002,
    origin: 'USA'
  },
  {
    id: 6,
    name: 'Boston Dynamics Spot',
    category: 'service',
    description: 'A four-legged agile robot built for inspection, data collection, and complex terrain navigation. Spot is deployed in construction sites, oil refineries, emergency response, and research labs worldwide.',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Spot_(Boston_Dynamics)_at_CES_2020.jpg?width=480',
    alt: 'Boston Dynamics Spot quadruped robot walking on a flat surface',
    year: 2019,
    origin: 'USA'
  },
  {
    id: 7,
    name: 'Mars Curiosity Rover',
    category: 'space',
    description: 'A car-sized NASA rover that has been exploring Gale Crater since August 2012. Curiosity carries 17 cameras and a suite of scientific instruments to study Mars geology and assess habitability.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Curiosity_Self-Portrait_at_%27Big_Sky%27_Drilling_Site.jpg/480px-Curiosity_Self-Portrait_at_%27Big_Sky%27_Drilling_Site.jpg',
    alt: 'NASA Curiosity rover self-portrait on the Martian surface',
    year: 2012,
    origin: 'USA'
  },
  {
    id: 8,
    name: 'Canadarm2',
    category: 'space',
    description: 'A 17-metre robotic arm on the International Space Station used to capture visiting spacecraft, move equipment, and support spacewalking astronauts. It can crawl across the exterior of the station.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/STS-118_Steve_Swanson_-_Canadarm2.jpg/480px-STS-118_Steve_Swanson_-_Canadarm2.jpg',
    alt: 'Canadarm2 robotic arm extended from the International Space Station',
    year: 2001,
    origin: 'Canada'
  }
];

// ── Update live filter count label ────────────
function updateCountLabel(count) {
  const label = document.querySelector('#filter-count');
  if (label) {
    label.textContent = `Showing ${count} robot${count !== 1 ? 's' : ''}`;
  }
}

// ── Render robot cards ────────────────────────
function renderCards(data) {
  const grid = document.querySelector('#robot-grid');
  if (!grid) return;

  // Always update the count label when cards are rendered
  updateCountLabel(data.length);

  if (data.length === 0) {
    grid.innerHTML = `<p class="no-results">No robots found in this category.</p>`;
    return;
  }

  grid.innerHTML = data.map(robot => `
    <article class="robot-card reveal">
      <img
        src="${robot.image}"
        alt="${robot.alt}"
        loading="lazy"
        width="480"
        height="200"
      >
      <div class="card-body">
        <span class="tag tag-${robot.category}">${robot.category}</span>
        <h3>${robot.name}</h3>
        <p>${robot.description}</p>
        <div class="card-meta">
          <span>Since ${robot.year}</span>
          <span>${robot.origin}</span>
        </div>
      </div>
    </article>
  `).join('');

  // Reveal cards already in the viewport
  document.querySelectorAll('.robot-card.reveal').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.classList.add('revealed');
    }
  });

  // Observe the rest for scroll reveal
  initScrollReveal();
}

// ── Filter robots by category ─────────────────
function filterRobots(category) {
  const filtered = category === 'all'
    ? robots
    : robots.filter(robot => robot.category === category);

  renderCards(filtered);
  localStorage.setItem('roboverse_last_filter', category);
}

// ── Update active filter button ───────────────
function setActiveFilter(category) {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.category === category);
  });
}

// ── Initialise filter buttons ─────────────────
function initFilters() {
  const buttons = document.querySelectorAll('.filter-btn');
  if (!buttons.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.category;
      setActiveFilter(category);
      filterRobots(category);
    });
  });

  // Restore the last category the user browsed
  const saved = localStorage.getItem('roboverse_last_filter') || 'all';
  setActiveFilter(saved);
  filterRobots(saved);
}

// ── Init ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initFilters();
});