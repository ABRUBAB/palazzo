import { DICTIONARY } from '../data/i18n';
import { diffNights, getState, setGuests } from '../state/store';
import { formatCompactDate } from '../utils/format';
import { renderPictureMarkup, wireImageSkeletons } from '../utils/media';

export function initHero(
  onOpenDatePicker: (anchor: HTMLElement) => void,
  onJumpExplorer: () => void
): void {
  const heroMedia = document.getElementById('hero-media-frame');
  if (heroMedia) {
    heroMedia.innerHTML = renderPictureMarkup({
      stem: 'hero-palazzo',
      alt: 'Palazzo Verena Florentine limestone courtyard facade and arched loggia in morning sunlight',
      width: 1440,
      height: 900,
      sizes: '100vw',
      widths: [480, 960, 1440],
      priority: true,
    });
    wireImageSkeletons(heroMedia);
  }

  const dateTrigger = document.getElementById('hero-date-trigger');
  dateTrigger?.addEventListener('click', () => onOpenDatePicker(dateTrigger));

  const minusBtn = document.getElementById('hero-guest-minus');
  const plusBtn = document.getElementById('hero-guest-plus');
  minusBtn?.addEventListener('click', () => setGuests(getState().guests - 1));
  plusBtn?.addEventListener('click', () => setGuests(getState().guests + 1));

  document.getElementById('hero-explore-btn')?.addEventListener('click', onJumpExplorer);

  renderHero();
}

export function renderHero(): void {
  const state = getState();
  const dict = DICTIONARY[state.lang];
  const nights = diffNights(state.checkIn, state.checkOut);

  const textMap: Record<string, string> = {
    'hero-eyebrow': dict.hero.eyebrow,
    'hero-title-1': dict.hero.titleLine1,
    'hero-title-2': dict.hero.titleLine2,
    'hero-subtitle': dict.hero.subtitle,
    'hero-dates-label': `${dict.hero.checkIn} — ${dict.hero.checkOut}`,
    'hero-guests-label': dict.hero.guests,
    'hero-explore-label': dict.hero.exploreBtn,
    'hero-stat-suites': dict.hero.statSuites,
    'hero-stat-suites-label': dict.hero.statSuitesLabel,
    'hero-stat-history': dict.hero.statHistory,
    'hero-stat-history-label': dict.hero.statHistoryLabel,
    'hero-stat-walk': dict.hero.statWalk,
    'hero-stat-walk-label': dict.hero.statWalkLabel,
    'hero-credential-pill': dict.hero.credentialPill,
    'hero-scroll-cue': dict.hero.scrollCue,
  };

  for (const [id, value] of Object.entries(textMap)) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  const datesValue = document.getElementById('hero-dates-value');
  if (datesValue) {
    datesValue.textContent = `${formatCompactDate(state.checkIn, state.lang)} → ${formatCompactDate(state.checkOut, state.lang)} (${nights}N)`;
  }

  const guestValue = document.getElementById('hero-guests-value');
  if (guestValue) {
    const unit = state.guests === 1 ? dict.hero.guestSingular : dict.hero.guestPlural;
    guestValue.textContent = `${state.guests} ${unit}`;
  }

  const minusBtn = document.getElementById('hero-guest-minus') as HTMLButtonElement | null;
  const plusBtn = document.getElementById('hero-guest-plus') as HTMLButtonElement | null;
  if (minusBtn) minusBtn.disabled = state.guests <= 1;
  if (plusBtn) plusBtn.disabled = state.guests >= 4;
}
