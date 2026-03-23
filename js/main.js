/**
 * CRAZY GAME ONLINE — Main JS
 * Fixed: search, nav filter links, rendering
 */

'use strict';

// ── DOM REFS ──────────────────────────────────
const gamesGrid   = document.getElementById('games-grid');
const gamesCount  = document.getElementById('games-count');
const filtersWrap = document.getElementById('filters-wrap');
const searchInput = document.getElementById('search-input');
const noResults   = document.getElementById('no-results');
const backToTop   = document.getElementById('back-to-top');
const hamburger   = document.getElementById('hamburger');
const mobileNav   = document.getElementById('mobile-nav');

// ── STATE ─────────────────────────────────────
let activeFilter = 'all';
let searchQuery  = '';

// ── INIT ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderFilters();
  renderGames();
  setupSearch();
  setupBackToTop();
  setupHamburger();
  setupNavLinks();   // ← fixes nav bar filter buttons
  animateStats();
});

// ── RENDER FILTERS ────────────────────────────
function renderFilters() {
  if (!filtersWrap) return;
  filtersWrap.innerHTML = FILTERS.map(f => `
    <button
      class="filter-btn${f.id === activeFilter ? ' active' : ''}"
      data-filter="${f.id}"
      aria-pressed="${f.id === activeFilter}"
    >${f.label}</button>
  `).join('');

  filtersWrap.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activeFilter = btn.dataset.filter;
      filtersWrap.querySelectorAll('.filter-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.filter === activeFilter);
        b.setAttribute('aria-pressed', b.dataset.filter === activeFilter);
      });
      renderGames();
    });
  });
}

// ── SETUP NAV LINKS — fixes header nav buttons ─
function setupNavLinks() {
  // Map anchor hrefs to filter IDs
  const NAV_MAP = {
    '#all-games':  'all',
    '#single':     'single',
    '#two-player': 'two',
    '#trivia':     'trivia',
  };

  // Desktop nav links
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (NAV_MAP[href] !== undefined) {
        e.preventDefault();
        setFilter(NAV_MAP[href]);
        // Scroll to games section
        const el = document.getElementById('all-games');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Mobile nav links
  document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (NAV_MAP[href] !== undefined) {
        e.preventDefault();
        setFilter(NAV_MAP[href]);
        mobileNav && mobileNav.classList.remove('open');
        const el = document.getElementById('all-games');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// ── SET FILTER (shared helper) ─────────────────
function setFilter(filterId) {
  activeFilter = filterId;
  // Sync filter buttons
  if (filtersWrap) {
    filtersWrap.querySelectorAll('.filter-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.filter === activeFilter);
      b.setAttribute('aria-pressed', b.dataset.filter === activeFilter);
    });
  }
  // Sync nav links
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(a => {
    a.classList.remove('active');
  });
  renderGames();
}

// ── RENDER GAMES ──────────────────────────────
function renderGames() {
  const filtered = GAMES.filter(g => {
    const matchFilter = activeFilter === 'all' || g.tags.includes(activeFilter);
    const q = searchQuery.toLowerCase().trim();
    const matchSearch = !q ||
      g.title.toLowerCase().includes(q) ||
      g.description.toLowerCase().includes(q) ||
      g.tags.some(t => t.includes(q));
    return matchFilter && matchSearch;
  });

  if (!gamesGrid) return;

  if (filtered.length === 0) {
    gamesGrid.innerHTML = '';
    if (noResults) noResults.style.display = 'block';
    if (gamesCount) gamesCount.textContent = '0 games';
    return;
  }

  if (noResults) noResults.style.display = 'none';
  if (gamesCount) gamesCount.textContent = `${filtered.length} game${filtered.length !== 1 ? 's' : ''}`;

  gamesGrid.innerHTML = filtered.map((game, i) => buildCard(game, i)).join('');
}

// ── BUILD CARD HTML ───────────────────────────
function buildCard(game, index) {
  const tagsHtml = game.tags.slice(0, 3).map(t => {
    const cfg = TAG_CONFIG[t] || { label: t, cls: 'tag-classic' };
    return `<span class="tag ${cfg.cls}">${cfg.label}</span>`;
  }).join('');

  const delay = Math.min(index * 40, 400);

  return `
    <a
      class="game-card"
      href="${game.file}"
      title="Play ${game.title}"
      aria-label="Play ${game.title}"
      style="animation-delay:${delay}ms"
    >
      <div class="card-thumb" style="background:linear-gradient(135deg,${game.color}18,${game.color}38)">
        <span style="position:relative;z-index:1;filter:drop-shadow(0 4px 8px rgba(0,0,0,0.15))">${game.emoji}</span>
      </div>
      <div class="card-body">
        <div class="card-title">${game.title}</div>
        <div class="card-desc">${game.description}</div>
        <div class="card-footer">
          <div class="card-tags">${tagsHtml}</div>
          <button class="play-btn" onclick="event.preventDefault();window.location.href='${game.file}'">
            ▶ Play
          </button>
        </div>
      </div>
    </a>
  `;
}

// ── SEARCH — FIXED ────────────────────────────
function setupSearch() {
  if (!searchInput) return;
  let debounceTimer;

  searchInput.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      searchQuery = searchInput.value.trim();
      // When searching, reset filter to 'all' so results appear
      if (searchQuery && activeFilter !== 'all') {
        activeFilter = 'all';
        if (filtersWrap) {
          filtersWrap.querySelectorAll('.filter-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.filter === 'all');
          });
        }
      }
      renderGames();
    }, 200);
  });

  // Clear search on Escape
  searchInput.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      searchInput.value = '';
      searchQuery = '';
      renderGames();
    }
  });
}

// ── BACK TO TOP ───────────────────────────────
function setupBackToTop() {
  if (!backToTop) return;
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 400);
  });
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ── HAMBURGER ─────────────────────────────────
function setupHamburger() {
  if (!hamburger || !mobileNav) return;
  hamburger.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', mobileNav.classList.contains('open'));
  });
}

// ── ANIMATE STATS ─────────────────────────────
function animateStats() {
  document.querySelectorAll('.stat-num[data-target]').forEach(el => {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    let current = 0;
    const step = Math.ceil(target / 50);
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current + suffix;
      if (current >= target) clearInterval(timer);
    }, 20);
  });
}

// ── HIGH SCORE UTILS ──────────────────────────
function saveHighScore(gameId, score) {
  try {
    const key = `cgo_hs_${gameId}`;
    const existing = parseInt(localStorage.getItem(key) || '0', 10);
    if (score > existing) localStorage.setItem(key, score);
  } catch(e) {}
}

function getHighScore(gameId) {
  try {
    return parseInt(localStorage.getItem(`cgo_hs_${gameId}`) || '0', 10);
  } catch(e) { return 0; }
}

window.CGO = { saveHighScore, getHighScore };
