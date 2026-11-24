import { DICTIONARY } from '../data/i18n';
import { ADDONS, FLOORS, ROOMS } from '../data/rooms';
import {
  calculateStayPricing,
  getSelectedRoom,
  getState,
  isRoomAvailable,
  selectRoom,
  setGuests,
  toggleAddon,
} from '../state/store';
import { formatCompactDate, formatEur, tText } from '../utils/format';

let openDatesCb: ((anchor: HTMLElement) => void) | null = null;
let openBookingCb: (() => void) | null = null;

export function initCalculator(
  onOpenDatePicker: (anchor: HTMLElement) => void,
  onProceedReservation: () => void
): void {
  openDatesCb = onOpenDatePicker;
  openBookingCb = onProceedReservation;

  const suiteSelect = document.getElementById('calc-suite-select') as HTMLSelectElement | null;
  suiteSelect?.addEventListener('change', () => {
    selectRoom(suiteSelect.value);
  });

  const dateBtn = document.getElementById('calc-date-trigger');
  dateBtn?.addEventListener('click', () => openDatesCb?.(dateBtn));

  document.getElementById('calc-guest-minus')?.addEventListener('click', () => {
    setGuests(getState().guests - 1);
  });
  document.getElementById('calc-guest-plus')?.addEventListener('click', () => {
    setGuests(getState().guests + 1);
  });

  document.getElementById('calc-proceed-btn')?.addEventListener('click', () => {
    openBookingCb?.();
  });

  renderCalculator();
}

export function renderCalculator(): void {
  const state = getState();
  const dict = DICTIONARY[state.lang];
  const calc = dict.calculator;
  const room = getSelectedRoom(state);
  const floor = FLOORS.find((f) => f.id === room.floorId) ?? FLOORS[0]!;
  const pricing = calculateStayPricing(state);

  const staticMap: Record<string, string> = {
    'calc-eyebrow': calc.eyebrow,
    'calc-title': calc.title,
    'calc-subtitle': calc.subtitle,
    'calc-suite-label': calc.suiteLabel,
    'calc-dates-label': calc.datesLabel,
    'calc-guests-label': calc.guestsLabel,
    'calc-addons-heading': calc.addonsHeading,
    'calc-folio-heading': calc.folioHeading,
    'calc-total-label': calc.totalLabel,
    'calc-vat-note': calc.vatNote,
    'calc-proceed-btn': calc.proceedBtn,
    'calc-best-rate': calc.bestRateNote,
  };
  for (const [id, val] of Object.entries(staticMap)) {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  }

  // Suite selector synchronized with floorplan
  const suiteSelect = document.getElementById('calc-suite-select') as HTMLSelectElement | null;
  if (suiteSelect) {
    suiteSelect.innerHTML = ROOMS.map((r) => {
      const avail = isRoomAvailable(r, state.checkIn, state.checkOut);
      return `<option value="${r.id}" ${!avail ? 'disabled' : ''} ${r.id === room.id ? 'selected' : ''}>
        ${dict.explorer.floorPrefix} ${r.floorId} · ${r.number} ${r.name} (${formatEur(r.nightlyRateEur, state.lang)}/N)${avail ? '' : ` — ${dict.explorer.legendReserved}`}
      </option>`;
    }).join('');
  }

  const datesVal = document.getElementById('calc-dates-value');
  if (datesVal) {
    datesVal.textContent = `${formatCompactDate(state.checkIn, state.lang)} → ${formatCompactDate(state.checkOut, state.lang)} (${pricing.nights}N)`;
  }

  const guestVal = document.getElementById('calc-guests-value');
  if (guestVal) {
    const unit = state.guests === 1 ? dict.hero.guestSingular : dict.hero.guestPlural;
    guestVal.textContent = `${state.guests} ${unit}`;
  }

  const minusBtn = document.getElementById('calc-guest-minus') as HTMLButtonElement | null;
  const plusBtn = document.getElementById('calc-guest-plus') as HTMLButtonElement | null;
  if (minusBtn) minusBtn.disabled = state.guests <= 1;
  if (plusBtn) plusBtn.disabled = state.guests >= 4;

  // Tactile Neomorphic Add-on Switches
  const addonsHost = document.getElementById('calc-addons-list');
  if (addonsHost) {
    addonsHost.innerHTML = ADDONS.map((item) => {
      const checked = state.addons[item.id];
      const unitSuffix =
        item.pricingMode === 'per-night'
          ? dict.explorer.perNight
          : item.pricingMode === 'per-guest'
            ? `/ ${dict.hero.guestSingular.toLowerCase()}`
            : '';

      return `
        <div class="addon-row">
          <div>
            <div class="addon-title">${tText(item.name, state.lang)}</div>
            <div class="addon-desc">${tText(item.description, state.lang)}</div>
            <div class="addon-price">+${formatEur(item.priceEur, state.lang)} ${unitSuffix}</div>
          </div>
          <button
            type="button"
            class="neu-switch"
            role="switch"
            aria-checked="${checked}"
            aria-label="${tText(item.name, state.lang)}"
            data-addon-toggle="${item.id}"
          ></button>
        </div>
      `;
    }).join('');

    addonsHost.querySelectorAll<HTMLButtonElement>('[data-addon-toggle]').forEach((sw) => {
      sw.addEventListener('click', () => {
        const id = sw.dataset.addonToggle as (typeof ADDONS)[number]['id'];
        toggleAddon(id);
      });
    });
  }

  // Folio Breakdown
  const linesHost = document.getElementById('calc-folio-lines');
  if (linesHost) {
    const discountLabel =
      pricing.discountRate >= 0.15 ? calc.discount15Label : calc.discount10Label;

    const addonLines = pricing.addonBreakdown
      .map((b) => {
        const item = ADDONS.find((a) => a.id === b.id)!;
        return `
          <div class="folio-line">
            <span>${tText(item.name, state.lang)}</span>
            <strong>${formatEur(b.amount, state.lang)}</strong>
          </div>
        `;
      })
      .join('');

    linesHost.innerHTML = `
      <div class="folio-line">
        <span>${room.number} ${room.name} (${dict.explorer.floorPrefix} ${floor.code}) × ${pricing.nights}N</span>
        <strong>${formatEur(pricing.roomSubtotal, state.lang)}</strong>
      </div>
      ${
        pricing.discountAmount > 0
          ? `<div class="folio-line folio-line--discount">
              <span>${discountLabel}</span>
              <strong>−${formatEur(pricing.discountAmount, state.lang)}</strong>
            </div>`
          : ''
      }
      ${addonLines}
      <div class="folio-line">
        <span>${calc.cityTaxLabel}</span>
        <strong>${formatEur(pricing.cityTaxTotal, state.lang, 2)}</strong>
      </div>
    `;
  }

  const nudgeEl = document.getElementById('calc-discount-nudge');
  if (nudgeEl) {
    nudgeEl.hidden = pricing.nights >= 3;
    nudgeEl.textContent = calc.discountNudge;
  }

  const totalEl = document.getElementById('calc-total-num');
  if (totalEl) {
    totalEl.textContent = formatEur(pricing.grandTotal, state.lang, 2);
  }
}
