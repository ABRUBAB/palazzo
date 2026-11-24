import { DICTIONARY } from '../data/i18n';
import type { LegalDocKey } from '../data/legal';
import { ADDONS, FLOORS } from '../data/rooms';
import {
  calculateStayPricing,
  getSelectedRoom,
  getState,
  setGuests,
  toggleAddon,
} from '../state/store';
import {
  downloadIcsEvent,
  escapeHtml,
  formatCompactDate,
  formatEur,
  generateBookingRef,
  tText,
} from '../utils/format';

type DrawerStep = 1 | 2 | 3;

let currentStep: DrawerStep = 1;
let isOpen = false;
let confirmedRef = '';
let guestForm = {
  fullName: '',
  email: '',
  phone: '',
  arrivalTime: '15:00 – 17:00',
  requests: '',
  acceptedTerms: true,
};
let formErrors: Partial<Record<'fullName' | 'email' | 'phone' | 'terms', string>> = {};

let openDatesCb: ((anchor: HTMLElement) => void) | null = null;
let openLegalCb: ((key: LegalDocKey) => void) | null = null;

export function initBookingDrawer(
  onOpenDatePicker: (anchor: HTMLElement) => void,
  onOpenLegal: (key: LegalDocKey) => void
): void {
  openDatesCb = onOpenDatePicker;
  openLegalCb = onOpenLegal;

  const backdrop = document.getElementById('drawer-backdrop');
  const closeBtn = document.getElementById('drawer-close-btn');

  backdrop?.addEventListener('click', closeBookingDrawer);
  closeBtn?.addEventListener('click', closeBookingDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) {
      closeBookingDrawer();
    }
  });
}

export function openBookingDrawer(step: DrawerStep = 1): void {
  currentStep = step;
  isOpen = true;
  formErrors = {};
  document.getElementById('drawer-backdrop')?.classList.add('is-open');
  const drawer = document.getElementById('reservation-drawer');
  drawer?.classList.add('is-open');
  drawer?.setAttribute('aria-hidden', 'false');
  renderBookingDrawer();
}

export function closeBookingDrawer(): void {
  isOpen = false;
  document.getElementById('drawer-backdrop')?.classList.remove('is-open');
  const drawer = document.getElementById('reservation-drawer');
  drawer?.classList.remove('is-open');
  drawer?.setAttribute('aria-hidden', 'true');
}

export function renderBookingDrawer(): void {
  const state = getState();
  const dict = DICTIONARY[state.lang];
  const d = dict.drawer;

  const titleEl = document.getElementById('drawer-title');
  if (titleEl) titleEl.textContent = d.title;

  const stepsEl = document.getElementById('drawer-steps');
  if (stepsEl) {
    stepsEl.innerHTML = d.steps
      .map(
        (label, idx) =>
          `<span class="drawer-step-pill ${idx + 1 === currentStep ? 'is-active' : ''}">${label}</span>`
      )
      .join('');
  }

  const body = document.getElementById('drawer-body');
  if (!body) return;

  const room = getSelectedRoom(state);
  const floor = FLOORS.find((f) => f.id === room.floorId) ?? FLOORS[0]!;
  const pricing = calculateStayPricing(state);

  if (currentStep === 1) {
    body.innerHTML = `
      <div style="font-size:0.75rem;text-transform:uppercase;letter-spacing:0.14em;font-weight:700;color:var(--brass-accessible);margin-bottom:0.6rem">${d.selectedSuite}</div>
      <div class="drawer-room-card">
        <img class="drawer-room-thumb" src="/images/${room.imageKey}-480.webp" alt="${room.name}" width="92" height="76" />
        <div>
          <div style="font-size:0.74rem;font-weight:700;color:var(--cypress)">${d.floorLabel} ${floor.code} · ${tText(floor.name, state.lang)}</div>
          <div style="font-family:var(--font-display);font-size:1.18rem;line-height:1.15">${room.number} ${room.name}</div>
          <div style="font-size:0.8rem;color:var(--umber);margin-top:0.2rem">${room.areaSqm} m² · ${formatEur(room.nightlyRateEur, state.lang)} ${dict.explorer.perNight}</div>
        </div>
      </div>

      <div style="margin-top:1.15rem;display:grid;grid-template-columns:1fr auto;gap:0.75rem;align-items:center;padding:0.85rem 1rem;border-radius:var(--radius-md);background:var(--surface-elevated);border:1px solid var(--divider)">
        <div>
          <div style="font-size:0.72rem;text-transform:uppercase;letter-spacing:0.12em;color:var(--umber);font-weight:700">${dict.calculator.datesLabel}</div>
          <div style="font-weight:600;margin-top:0.15rem">${formatCompactDate(state.checkIn, state.lang)} → ${formatCompactDate(state.checkOut, state.lang)} (${pricing.nights}N)</div>
        </div>
        <button type="button" class="btn-outline" id="drawer-edit-dates" data-date-trigger style="min-height:36px;padding:0.35rem 0.85rem;font-size:0.78rem">${d.modifyDatesBtn}</button>
      </div>

      <div style="margin-top:0.8rem;display:flex;align-items:center;justify-content:space-between;padding:0.85rem 1rem;border-radius:var(--radius-md);background:var(--surface-elevated);border:1px solid var(--divider)">
        <div>
          <div style="font-size:0.72rem;text-transform:uppercase;letter-spacing:0.12em;color:var(--umber);font-weight:700">${dict.calculator.guestsLabel}</div>
          <div style="font-weight:600;margin-top:0.15rem">${state.guests} ${state.guests === 1 ? dict.hero.guestSingular : dict.hero.guestPlural}</div>
        </div>
        <div class="guest-stepper">
          <button type="button" class="stepper-btn" id="drawer-g-minus" ${state.guests <= 1 ? 'disabled' : ''}>−</button>
          <button type="button" class="stepper-btn" id="drawer-g-plus" ${state.guests >= 4 ? 'disabled' : ''}>+</button>
        </div>
      </div>

      <div style="margin-top:1.25rem;font-size:0.78rem;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:var(--umber)">${dict.calculator.addonsHeading}</div>
      <div style="margin-top:0.65rem;display:flex;flex-direction:column;gap:0.55rem">
        ${ADDONS.map(
          (item) => `
          <div class="addon-row" style="padding:0.75rem 0.9rem">
            <div>
              <div style="font-weight:600;font-size:0.88rem">${tText(item.name, state.lang)}</div>
              <div style="font-size:0.76rem;color:var(--brass-accessible);font-weight:700">+${formatEur(item.priceEur, state.lang)}</div>
            </div>
            <button type="button" class="neu-switch" role="switch" aria-checked="${state.addons[item.id]}" aria-label="${tText(item.name, state.lang)}" data-drawer-addon="${item.id}"></button>
          </div>
        `
        ).join('')}
      </div>

      <div style="margin-top:1.35rem;padding:1.1rem;border-radius:var(--radius-md);background:var(--cypress);color:var(--canvas)">
        <div style="display:flex;justify-content:space-between;align-items:baseline">
          <span style="font-size:0.86rem;opacity:0.86">${dict.calculator.totalLabel}</span>
          <strong style="font-family:var(--font-display);font-size:1.7rem">${formatEur(pricing.grandTotal, state.lang, 2)}</strong>
        </div>
        <div style="font-size:0.74rem;opacity:0.72;margin-top:0.2rem">${dict.calculator.vatNote} · ${dict.calculator.cityTaxLabel}</div>
      </div>

      <button type="button" class="btn-liquid" id="drawer-to-step2" style="width:100%;margin-top:1.15rem">
        ${d.continueStep2} →
      </button>
    `;

    const dateBtn = body.querySelector<HTMLElement>('#drawer-edit-dates');
    dateBtn?.addEventListener('click', () => openDatesCb?.(dateBtn));
    body.querySelector('#drawer-g-minus')?.addEventListener('click', () => setGuests(getState().guests - 1));
    body.querySelector('#drawer-g-plus')?.addEventListener('click', () => setGuests(getState().guests + 1));
    body.querySelectorAll<HTMLButtonElement>('[data-drawer-addon]').forEach((sw) => {
      sw.addEventListener('click', () => {
        toggleAddon(sw.dataset.drawerAddon as (typeof ADDONS)[number]['id']);
      });
    });
    body.querySelector('#drawer-to-step2')?.addEventListener('click', () => {
      currentStep = 2;
      renderBookingDrawer();
    });
    return;
  }

  if (currentStep === 2) {
    body.innerHTML = `
      <form id="drawer-guest-form" class="form-grid" novalidate>
        <div>
          <label class="field-label" for="guest-fullname">${d.fullNameLabel} *</label>
          <input class="field-input" id="guest-fullname" type="text" required autocomplete="name" value="${escapeHtml(guestForm.fullName)}" placeholder="Elena Conti" />
          ${formErrors.fullName ? `<div class="field-error">${formErrors.fullName}</div>` : ''}
        </div>
        <div>
          <label class="field-label" for="guest-email">${d.emailLabel} *</label>
          <input class="field-input" id="guest-email" type="email" required autocomplete="email" value="${escapeHtml(guestForm.email)}" placeholder="elena.conti@example.eu" />
          ${formErrors.email ? `<div class="field-error">${formErrors.email}</div>` : ''}
        </div>
        <div>
          <label class="field-label" for="guest-phone">${d.phoneLabel} *</label>
          <input class="field-input" id="guest-phone" type="tel" required autocomplete="tel" value="${escapeHtml(guestForm.phone)}" placeholder="+39 340 555 0194" />
          ${formErrors.phone ? `<div class="field-error">${formErrors.phone}</div>` : ''}
        </div>
        <div>
          <label class="field-label" for="guest-arrival">${d.arrivalLabel}</label>
          <select class="field-select" id="guest-arrival">
            ${['15:00 – 17:00', '17:00 – 19:00', '19:00 – 21:00', '21:00+ (Keyless Late Arrival)']
              .map(
                (slot) =>
                  `<option value="${slot}" ${guestForm.arrivalTime === slot ? 'selected' : ''}>${slot}</option>`
              )
              .join('')}
          </select>
        </div>
        <div>
          <label class="field-label" for="guest-requests">${d.requestsLabel}</label>
          <textarea class="field-textarea" id="guest-requests" rows="3" placeholder="${escapeHtml(d.requestsPlaceholder)}">${escapeHtml(guestForm.requests)}</textarea>
        </div>
        <label style="display:flex;align-items:flex-start;gap:0.65rem;font-size:0.8rem;color:var(--umber);cursor:pointer">
          <input type="checkbox" id="guest-terms" ${guestForm.acceptedTerms ? 'checked' : ''} style="margin-top:0.2rem;accent-color:var(--cypress)" />
          <span>
            ${d.termsAgree}
            <button type="button" id="drawer-open-privacy" style="text-decoration:underline;color:var(--cypress);font-weight:600;margin-left:0.25rem">${dict.footer.privacy}</button>
          </span>
        </label>
        ${formErrors.terms ? `<div class="field-error">${formErrors.terms}</div>` : ''}

        <div style="padding:0.85rem 1rem;border-radius:var(--radius-md);background:var(--surface);border:1px solid var(--divider);display:flex;justify-content:space-between;align-items:center">
          <span style="font-size:0.85rem;font-weight:600">${room.number} ${room.name} (${pricing.nights}N)</span>
          <strong style="font-family:var(--font-display);font-size:1.25rem;color:var(--cypress)">${formatEur(pricing.grandTotal, state.lang, 2)}</strong>
        </div>

        <div style="display:flex;gap:0.75rem;margin-top:0.4rem">
          <button type="button" class="btn-outline" id="drawer-back-1" style="flex:1">${d.backStep1}</button>
          <button type="submit" class="btn-liquid" id="drawer-confirm-submit" style="flex:1.6">${d.confirmBtn}</button>
        </div>
      </form>
    `;

    const form = body.querySelector<HTMLFormElement>('#drawer-guest-form');
    const syncFields = () => {
      guestForm.fullName =
        (body.querySelector<HTMLInputElement>('#guest-fullname')?.value ?? '').trim();
      guestForm.email = (body.querySelector<HTMLInputElement>('#guest-email')?.value ?? '').trim();
      guestForm.phone = (body.querySelector<HTMLInputElement>('#guest-phone')?.value ?? '').trim();
      guestForm.arrivalTime =
        body.querySelector<HTMLSelectElement>('#guest-arrival')?.value ?? '15:00 – 17:00';
      guestForm.requests =
        body.querySelector<HTMLTextAreaElement>('#guest-requests')?.value ?? '';
      guestForm.acceptedTerms =
        Boolean(body.querySelector<HTMLInputElement>('#guest-terms')?.checked);
    };

    body.querySelector('#drawer-back-1')?.addEventListener('click', () => {
      syncFields();
      currentStep = 1;
      renderBookingDrawer();
    });

    body.querySelector('#drawer-open-privacy')?.addEventListener('click', (e) => {
      e.preventDefault();
      openLegalCb?.('privacy');
    });

    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      syncFields();
      formErrors = {};
      if (guestForm.fullName.length < 2) formErrors.fullName = d.errName;
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guestForm.email)) formErrors.email = d.errEmail;
      if (guestForm.phone.replace(/\D/g, '').length < 6) formErrors.phone = d.errPhone;
      if (!guestForm.acceptedTerms) formErrors.terms = d.errTerms;

      if (Object.keys(formErrors).length > 0) {
        renderBookingDrawer();
        return;
      }

      confirmedRef = generateBookingRef();
      currentStep = 3;
      renderBookingDrawer();
    });
    return;
  }

  // Step 3 — Booking Confirmation
  body.innerHTML = `
    <div class="confirm-box">
      <div style="font-size:0.74rem;text-transform:uppercase;letter-spacing:0.18em;color:#E7C996;font-weight:700">${d.confirmedEyebrow}</div>
      <h3 style="margin:0.4rem 0 0;font-family:var(--font-display);font-size:1.7rem;font-weight:400">${d.confirmedTitle}</h3>
      <p style="margin:0.6rem 0 0;font-size:0.86rem;opacity:0.85">${d.confirmedSubtitle}</p>
      <div style="margin-top:1rem;font-size:0.72rem;text-transform:uppercase;letter-spacing:0.14em;opacity:0.78">${d.refLabel}</div>
      <div class="confirm-ref" id="confirm-ref-code">${confirmedRef}</div>
    </div>

    <div style="margin-top:1.25rem;padding:1.1rem;border-radius:var(--radius-md);background:var(--surface-elevated);border:1px solid var(--divider);display:flex;flex-direction:column;gap:0.65rem;font-size:0.88rem">
      <div style="display:flex;justify-content:space-between;gap:1rem">
        <span style="color:var(--umber)">${d.fullNameLabel}</span>
        <strong>${escapeHtml(guestForm.fullName)}</strong>
      </div>
      <div style="display:flex;justify-content:space-between;gap:1rem">
        <span style="color:var(--umber)">${d.selectedSuite}</span>
        <strong>${d.floorLabel} ${floor.code} · ${room.number} ${room.name}</strong>
      </div>
      <div style="display:flex;justify-content:space-between;gap:1rem">
        <span style="color:var(--umber)">${dict.calculator.datesLabel}</span>
        <strong>${formatCompactDate(state.checkIn, state.lang)} → ${formatCompactDate(state.checkOut, state.lang)} (${pricing.nights}N)</strong>
      </div>
      <div style="display:flex;justify-content:space-between;gap:1rem">
        <span style="color:var(--umber)">${d.arrivalLabel}</span>
        <strong>${escapeHtml(guestForm.arrivalTime)}</strong>
      </div>
      <div style="display:flex;justify-content:space-between;gap:1rem;padding-top:0.55rem;border-top:1px solid var(--divider)">
        <span style="font-weight:700">${dict.calculator.totalLabel}</span>
        <strong style="font-family:var(--font-display);font-size:1.25rem;color:var(--cypress)">${formatEur(pricing.grandTotal, state.lang, 2)}</strong>
      </div>
    </div>

    <div style="margin-top:1.15rem;display:grid;grid-template-columns:1fr 1fr;gap:0.65rem">
      <button type="button" class="btn-outline" id="confirm-print-btn">${d.printBtn}</button>
      <button type="button" class="btn-outline" id="confirm-ics-btn">${d.calendarBtn}</button>
    </div>
    <button type="button" class="btn-liquid" id="confirm-done-btn" style="width:100%;margin-top:0.75rem">${d.newSearchBtn}</button>
  `;

  body.querySelector('#confirm-print-btn')?.addEventListener('click', () => window.print());
  body.querySelector('#confirm-ics-btn')?.addEventListener('click', () => {
    downloadIcsEvent({
      refCode: confirmedRef,
      suiteName: `${room.number} ${room.name}`,
      floorName: `${d.floorLabel} ${floor.code} — ${tText(floor.name, state.lang)}`,
      checkIn: state.checkIn,
      checkOut: state.checkOut,
      guestName: guestForm.fullName,
    });
  });
  body.querySelector('#confirm-done-btn')?.addEventListener('click', closeBookingDrawer);
}
