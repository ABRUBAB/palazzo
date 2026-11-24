import { DICTIONARY } from '../data/i18n';
import { addDays, diffNights, getState, setDates, startOfDay } from '../state/store';
import { formatCompactDate } from '../utils/format';

let popoverEl: HTMLElement | null = null;
let viewYear = new Date().getFullYear();
let viewMonth = new Date().getMonth();
let draftStart: Date = getState().checkIn;
let draftEnd: Date = getState().checkOut;
let selectingEnd = false;

export function initDatePicker(): void {
  popoverEl = document.getElementById('date-popover');
  if (!popoverEl) return;

  popoverEl.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  document.addEventListener('click', (e) => {
    if (!popoverEl?.classList.contains('is-open')) return;
    const path = typeof e.composedPath === 'function' ? e.composedPath() : [];
    if (path.includes(popoverEl)) return;
    const target = e.target as HTMLElement | null;
    if (target && popoverEl.contains(target)) return;
    if (target?.closest?.('[data-date-trigger]')) return;
    closeDatePicker();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && popoverEl?.classList.contains('is-open')) {
      closeDatePicker();
    }
  });
}

export function openDatePicker(anchor: HTMLElement): void {
  if (!popoverEl) return;
  const state = getState();
  draftStart = startOfDay(state.checkIn);
  draftEnd = startOfDay(state.checkOut);
  viewYear = draftStart.getFullYear();
  viewMonth = draftStart.getMonth();
  selectingEnd = false;

  renderCalendar();

  const rect = anchor.getBoundingClientRect();
  const popW = Math.min(window.innerWidth - 24, 380);
  const popH = 420;
  const left = Math.max(12, Math.min(rect.left, window.innerWidth - popW - 12));

  let top = rect.bottom + 10;
  if (top + popH > window.innerHeight - 12) {
    top = rect.top - popH - 10;
  }
  if (top < 72) {
    top = Math.max(72, Math.min(window.innerHeight - popH - 12, (window.innerHeight - popH) / 2));
  }

  popoverEl.style.left = `${left}px`;
  popoverEl.style.top = `${top}px`;
  popoverEl.classList.add('is-open');
  popoverEl.setAttribute('aria-hidden', 'false');
}

export function closeDatePicker(): void {
  if (!popoverEl) return;
  popoverEl.classList.remove('is-open');
  popoverEl.setAttribute('aria-hidden', 'true');
}

function renderCalendar(): void {
  if (!popoverEl) return;
  const state = getState();
  const dp = DICTIONARY[state.lang].datePicker;
  const today = startOfDay(new Date());

  const firstOfMonth = new Date(viewYear, viewMonth, 1);
  const mondayStartOffset = (firstOfMonth.getDay() + 6) % 7;
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const nights = diffNights(draftStart, draftEnd);

  const cells: string[] = [];
  for (const wd of dp.weekdays) {
    cells.push(`<span class="dp-weekday">${wd}</span>`);
  }
  for (let i = 0; i < mondayStartOffset; i++) {
    cells.push(`<span></span>`);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const cellDate = new Date(viewYear, viewMonth, day);
    const ts = cellDate.getTime();
    const isPast = ts < today.getTime();
    const sTs = draftStart.getTime();
    const eTs = draftEnd.getTime();
    const isStart = ts === sTs;
    const isEnd = ts === eTs;
    const inRange = ts > sTs && ts < eTs;

    const classes = ['dp-day'];
    if (isStart || isEnd) classes.push('is-edge');
    else if (inRange) classes.push('is-in-range');

    cells.push(
      `<button type="button" class="${classes.join(' ')}" data-day="${viewYear}-${viewMonth + 1}-${day}" ${isPast ? 'disabled' : ''}>${day}</button>`
    );
  }

  const minMonth = today.getFullYear() * 12 + today.getMonth();
  const currMonth = viewYear * 12 + viewMonth;

  popoverEl.innerHTML = `
    <div class="dp-head">
      <button type="button" class="dp-nav-btn neu-control" id="dp-prev" aria-label="Previous month" ${currMonth <= minMonth ? 'disabled' : ''}>&#8592;</button>
      <div class="dp-month-label">${dp.monthNames[viewMonth]} ${viewYear}</div>
      <button type="button" class="dp-nav-btn neu-control" id="dp-next" aria-label="Next month">&#8594;</button>
    </div>
    <div class="dp-presets">
      ${dp.presets
        .map(
          (p) =>
            `<button type="button" class="dp-preset-btn ${nights === p.nights ? 'is-active' : ''}" data-preset-nights="${p.nights}">${p.label}</button>`
        )
        .join('')}
    </div>
    <div class="dp-grid">${cells.join('')}</div>
    <div class="dp-foot">
      <div>
        <div style="font-size:0.76rem;color:var(--umber)">${formatCompactDate(draftStart, state.lang)} → ${formatCompactDate(draftEnd, state.lang)}</div>
        <div style="font-size:0.84rem;font-weight:700;color:var(--cypress)">${nights} ${dp.selectedNights}</div>
      </div>
      <button type="button" class="btn-liquid" style="min-height:38px;padding:0.45rem 1.05rem" id="dp-apply">${dp.apply}</button>
    </div>
  `;

  popoverEl.querySelector('#dp-prev')?.addEventListener('click', (e) => {
    e.stopPropagation();
    viewMonth -= 1;
    if (viewMonth < 0) {
      viewMonth = 11;
      viewYear -= 1;
    }
    renderCalendar();
  });

  popoverEl.querySelector('#dp-next')?.addEventListener('click', (e) => {
    e.stopPropagation();
    viewMonth += 1;
    if (viewMonth > 11) {
      viewMonth = 0;
      viewYear += 1;
    }
    renderCalendar();
  });

  popoverEl.querySelectorAll<HTMLButtonElement>('[data-preset-nights]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const n = Number(btn.dataset.presetNights ?? 2);
      draftEnd = addDays(draftStart, n);
      selectingEnd = false;
      renderCalendar();
    });
  });

  popoverEl.querySelectorAll<HTMLButtonElement>('[data-day]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const parts = (btn.dataset.day ?? '').split('-').map(Number);
      if (parts.length !== 3) return;
      const clicked = new Date(parts[0]!, parts[1]! - 1, parts[2]!);
      if (!selectingEnd || clicked <= draftStart) {
        draftStart = clicked;
        draftEnd = addDays(clicked, Math.max(1, diffNights(draftStart, draftEnd)));
        selectingEnd = true;
      } else {
        draftEnd = clicked;
        selectingEnd = false;
      }
      renderCalendar();
    });
  });

  popoverEl.querySelector('#dp-apply')?.addEventListener('click', (e) => {
    e.stopPropagation();
    setDates(draftStart, draftEnd);
    closeDatePicker();
  });
}
