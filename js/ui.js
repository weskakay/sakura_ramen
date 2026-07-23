/**
 * Switches the header into its solid state once the hero sentinel is gone.
 */
function initStickyHeader() {
  const header = document.getElementById('site-header');
  const sentinel = document.querySelector('.hero__sentinel');
  if (!header || !sentinel) return;
  const observer = new IntersectionObserver(([entry]) => {
    header.classList.toggle('is-scrolled', !entry.isIntersecting);
  });
  observer.observe(sentinel);
}

/**
 * Applies the open state to the mobile navigation.
 * @param {HTMLElement} toggle
 * @param {HTMLElement} nav
 * @param {boolean} open
 */
function setNavOpen(toggle, nav, open) {
  toggle.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('is-open', open);
}

/** Wires the burger button and closes the menu after a jump. */
function initNavToggle() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    setNavOpen(toggle, nav, toggle.getAttribute('aria-expanded') === 'false');
  });
  nav.addEventListener('click', (event) => {
    if (event.target.closest('.site-nav__link')) setNavOpen(toggle, nav, false);
  });
}

/** Fades elements in as soon as they enter the viewport. */
function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach((item) => observer.observe(item));
}

/**
 * Replaces the map placeholder with the embedded frame.
 * @param {HTMLElement} map
 */
function showMap(map) {
  const frame = document.createElement('iframe');
  frame.className = 'map__frame';
  frame.src = map.dataset.mapSrc;
  frame.title = mapTitle();
  frame.loading = 'lazy';
  frame.referrerPolicy = 'no-referrer-when-downgrade';
  frame.allowFullscreen = true;
  map.replaceChildren(frame);
  map.classList.add('is-loaded');
}

/**
 * Reads the map title in the active language.
 * @returns {string}
 */
function mapTitle() {
  const lang = document.documentElement.lang;
  return TEXTS[lang]?.mapTitle ?? TEXTS.de.mapTitle;
}

/** Loads the map only after an explicit click. */
function initMap() {
  const map = document.querySelector('.map');
  const button = map && map.querySelector('.map__button');
  if (!button) return;
  button.addEventListener('click', () => showMap(map));
}

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initNavToggle();
  initReveal();
  initMap();
});
