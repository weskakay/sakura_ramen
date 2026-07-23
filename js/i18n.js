const STORAGE_KEY = 'sakura-lang';

const TEXTS = {
  de: {
    pageTitle: 'Sakura Ramen - Das beste Ramen der Stadt',
    metaDescription: 'Sakura Ramen in München: Tonkotsu, Spicy Miso und Shio aus frischer Brühe. Kapuzinerstraße 31, täglich frisch gekocht.',
    skipLink: 'Zum Inhalt springen',
    brandAria: 'Sakura Ramen, zurück nach oben',
    menuToggle: 'Menü öffnen',
    navMenu: 'MENÜ',
    navLocations: 'ORT',
    navAbout: 'ÜBER UNS',
    callAria: 'Anrufen unter 0176 54564534',
    switchToDe: 'Auf Deutsch umschalten',
    switchToEn: 'Auf Englisch umschalten',
    heroSubtitle: 'DAS BESTE RAMEN IN DER STADT',
    orderTitle: 'WIE WIRD BESTELLT',
    orderNoodle: 'Wähle deine\nNudeln',
    orderBroth: 'Wähle deine\nBrühe',
    orderToppings: 'Toppings\nhinzufügen',
    altNoodle: 'Schale mit Nudeln und Essstäbchen',
    altBroth: 'Dampfende Schale Brühe',
    altEgg: 'Halbiertes gekochtes Ei',
    menuTitle: 'UNSER MENÜ',
    choiceChicken: 'HÜHNCHEN',
    choiceBeef: 'RIND',
    choiceShrimp: 'GARNELE',
    altTonkotsu: 'Tonkotsu Ramen mit Ei, Nori und Frühlingszwiebeln',
    altMiso: 'Spicy Miso Ramen mit Chashu und eingelegtem Ingwer',
    altShio: 'Shio Ramen mit Bambus, Wakame und Schweinebauch',
    findUsTitle: 'FINDE UNS',
    mapNotice: 'Die Karte wird erst nach dem Klick von Google geladen. Dabei werden Daten an Google übertragen.',
    mapButton: 'Karte laden',
    mapTitle: 'Karte mit dem Standort Kapuzinerstraße 31, München',
  },
  en: {
    pageTitle: 'Sakura Ramen - The best ramen in town',
    metaDescription: 'Sakura Ramen in Munich: tonkotsu, spicy miso and shio made from fresh broth. Kapuzinerstrasse 31, cooked fresh every day.',
    skipLink: 'Skip to content',
    brandAria: 'Sakura Ramen, back to top',
    menuToggle: 'Open menu',
    navMenu: 'MENU',
    navLocations: 'LOCATIONS',
    navAbout: 'ABOUT',
    callAria: 'Call 0176 54564534',
    switchToDe: 'Switch to German',
    switchToEn: 'Switch to English',
    heroSubtitle: 'THE BEST RAMEN IN THE TOWN',
    orderTitle: 'HOW TO ORDER',
    orderNoodle: 'Pick your\nnoodle',
    orderBroth: 'Pick your\nbroth',
    orderToppings: 'Add your\ntoppings',
    altNoodle: 'Bowl of noodles with chopsticks',
    altBroth: 'Steaming bowl of broth',
    altEgg: 'Halved boiled egg',
    menuTitle: 'OUR MENU',
    choiceChicken: 'CHICKEN',
    choiceBeef: 'BEEF',
    choiceShrimp: 'SHRIMP',
    altTonkotsu: 'Tonkotsu ramen with egg, nori and spring onions',
    altMiso: 'Spicy miso ramen with chashu and pickled ginger',
    altShio: 'Shio ramen with bamboo, wakame and pork belly',
    findUsTitle: 'FIND US AT',
    mapNotice: 'The map is loaded from Google only after you click. Data will be sent to Google.',
    mapButton: 'Load map',
    mapTitle: 'Map showing Kapuzinerstrasse 31, Munich',
  },
};

const TARGETS = [
  ['i18n', (node, text) => { node.textContent = text; }],
  ['i18nAria', (node, text) => node.setAttribute('aria-label', text)],
  ['i18nAlt', (node, text) => node.setAttribute('alt', text)],
  ['i18nContent', (node, text) => node.setAttribute('content', text)],
];

/**
 * Writes one group of tagged nodes.
 * @param {Object} texts
 * @param {string} key dataset key, e.g. "i18nAria"
 * @param {Function} apply
 */
function applyTargets(texts, key, apply) {
  const attribute = key.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`);
  document.querySelectorAll(`[data-${attribute}]`).forEach((node) => {
    const text = texts[node.dataset[key]];
    if (text) apply(node, text);
  });
}

/**
 * Applies the given language to the whole document.
 * @param {string} lang
 */
function applyLanguage(lang) {
  const texts = TEXTS[lang];
  document.documentElement.lang = lang;
  TARGETS.forEach(([key, apply]) => applyTargets(texts, key, apply));
}

/**
 * Marks the button of the active language.
 * @param {string} lang
 */
function markActiveButton(lang) {
  document.querySelectorAll('.lang-switch__button').forEach((button) => {
    const isActive = button.dataset.lang === lang;
    button.setAttribute('aria-pressed', String(isActive));
    button.classList.toggle('is-active', isActive);
  });
}

/**
 * Returns the stored language, or the browser language as fallback.
 * @returns {string}
 */
function initialLanguage() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && TEXTS[stored]) return stored;
  return navigator.language.startsWith('de') ? 'de' : 'en';
}

/**
 * Applies a language and remembers the choice.
 * @param {string} lang
 */
function selectLanguage(lang) {
  if (!TEXTS[lang]) return;
  localStorage.setItem(STORAGE_KEY, lang);
  applyLanguage(lang);
  markActiveButton(lang);
}

/** Wires the language buttons and applies the start language. */
function initLanguage() {
  document.querySelectorAll('.lang-switch__button').forEach((button) => {
    button.addEventListener('click', () => selectLanguage(button.dataset.lang));
  });
  const lang = initialLanguage();
  applyLanguage(lang);
  markActiveButton(lang);
}

document.addEventListener('DOMContentLoaded', initLanguage);
