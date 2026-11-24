import { DICTIONARY } from '../data/i18n';
import type { Locale } from '../data/rooms';
import { getState, setLang } from '../state/store';

export function initHeader(onBookClick: () => void): void {
  const header = document.getElementById('site-header');
  const bookBtn = document.getElementById('header-book-btn');
  const mobileBookBtn = document.getElementById('mobile-book-btn');
  const menuBtn = document.getElementById('mobile-menu-btn');
  const backdrop = document.getElementById('mobile-nav-backdrop');
  const drawer = document.getElementById('mobile-nav-drawer');
  const closeMenuBtn = document.getElementById('mobile-nav-close');
  const compactLangBtn = document.getElementById('mobile-compact-lang');

  const updateScroll = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 48);
  };
  window.addEventListener('scroll', updateScroll, { passive: true });
  updateScroll();

  bookBtn?.addEventListener('click', onBookClick);
  mobileBookBtn?.addEventListener('click', () => {
    closeMobileNav();
    onBookClick();
  });

  const openMobileNav = () => {
    backdrop?.classList.add('is-open');
    drawer?.classList.add('is-open');
    drawer?.setAttribute('aria-hidden', 'false');
    menuBtn?.setAttribute('aria-expanded', 'true');
  };

  const closeMobileNav = () => {
    backdrop?.classList.remove('is-open');
    drawer?.classList.remove('is-open');
    drawer?.setAttribute('aria-hidden', 'true');
    menuBtn?.setAttribute('aria-expanded', 'false');
  };

  menuBtn?.addEventListener('click', openMobileNav);
  closeMenuBtn?.addEventListener('click', closeMobileNav);
  backdrop?.addEventListener('click', closeMobileNav);

  drawer?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMobileNav);
  });

  document.querySelectorAll<HTMLButtonElement>('[data-lang-btn]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const next = btn.dataset.langBtn as Locale | undefined;
      if (next) setLang(next);
    });
  });

  compactLangBtn?.addEventListener('click', () => {
    const order: Locale[] = ['en', 'it', 'fr', 'de'];
    const idx = order.indexOf(getState().lang);
    setLang(order[(idx + 1) % order.length]!);
  });

  renderHeader();
}

export function renderHeader(): void {
  const state = getState();
  const dict = DICTIONARY[state.lang];

  document.querySelectorAll<HTMLButtonElement>('[data-lang-btn]').forEach((btn) => {
    const isActive = btn.dataset.langBtn === state.lang;
    btn.setAttribute('aria-pressed', String(isActive));
  });

  const compactLang = document.getElementById('mobile-compact-lang');
  if (compactLang) {
    compactLang.textContent = state.lang.toUpperCase();
  }

  const map: Record<string, string> = {
    '[data-i18n="nav.palazzo"]': dict.nav.palazzo,
    '[data-i18n="nav.explorer"]': dict.nav.explorer,
    '[data-i18n="nav.experiences"]': dict.nav.experiences,
    '[data-i18n="nav.gallery"]': dict.nav.gallery,
    '[data-i18n="nav.location"]': dict.nav.location,
    '[data-i18n="nav.bookCta"]': dict.nav.bookCta,
  };

  for (const [selector, text] of Object.entries(map)) {
    document.querySelectorAll(selector).forEach((el) => {
      el.textContent = text;
    });
  }
}
