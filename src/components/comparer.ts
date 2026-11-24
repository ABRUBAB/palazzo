import { DICTIONARY } from '../data/i18n';
import { getState } from '../state/store';
import { renderPictureMarkup, wireImageSkeletons } from '../utils/media';

let splitPercent = 52;

export function initComparer(): void {
  const dayLayer = document.getElementById('comparer-day-layer');
  const eveningLayer = document.getElementById('comparer-evening-layer');
  const stage = document.getElementById('comparer-stage');
  const divider = document.getElementById('comparer-divider');
  const handle = document.getElementById('comparer-handle');

  if (dayLayer) {
    dayLayer.innerHTML = `<div class="media-frame">${renderPictureMarkup({
      stem: 'comparer-daylight',
      alt: 'Palazzo Verena vaulted suite bathed in crisp 08:30 morning Florentine daylight',
      width: 1440,
      height: 900,
      sizes: '(min-width: 1200px) 1280px, 94vw',
      widths: [480, 960, 1440],
    })}</div>`;
    wireImageSkeletons(dayLayer);
  }

  if (eveningLayer) {
    eveningLayer.innerHTML = `<div class="media-frame">${renderPictureMarkup({
      stem: 'comparer-evening',
      alt: 'Palazzo Verena vaulted suite in warm 21:00 twilight candlelit evening turndown',
      width: 1440,
      height: 900,
      sizes: '(min-width: 1200px) 1280px, 94vw',
      widths: [480, 960, 1440],
    })}</div>`;
    wireImageSkeletons(eveningLayer);
  }

  const updatePosition = (pct: number) => {
    splitPercent = Math.max(4, Math.min(96, pct));
    if (eveningLayer) {
      eveningLayer.style.clipPath = `inset(0 0 0 ${splitPercent}%)`;
    }
    if (divider) {
      divider.style.left = `${splitPercent}%`;
    }
    if (handle) {
      handle.setAttribute('aria-valuenow', String(Math.round(splitPercent)));
    }
  };

  if (stage) {
    let dragging = false;

    const updateFromClientX = (clientX: number) => {
      const rect = stage.getBoundingClientRect();
      if (!rect.width) return;
      const pct = ((clientX - rect.left) / rect.width) * 100;
      updatePosition(pct);
    };

    stage.addEventListener('pointerdown', (e) => {
      dragging = true;
      stage.setPointerCapture?.(e.pointerId);
      updateFromClientX(e.clientX);
    });

    stage.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      updateFromClientX(e.clientX);
    });

    const stop = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      stage.releasePointerCapture?.(e.pointerId);
    };
    stage.addEventListener('pointerup', stop);
    stage.addEventListener('pointercancel', stop);
  }

  handle?.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      updatePosition(splitPercent - 6);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      updatePosition(splitPercent + 6);
    }
  });

  document.querySelectorAll<HTMLButtonElement>('[data-comparer-preset]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = Number(btn.dataset.comparerPreset ?? 50);
      updatePosition(target);
    });
  });

  updatePosition(52);
  renderComparer();
}

export function renderComparer(): void {
  const state = getState();
  const c = DICTIONARY[state.lang].comparer;

  const map: Record<string, string> = {
    'comparer-eyebrow': c.eyebrow,
    'comparer-title': c.title,
    'comparer-subtitle': c.subtitle,
    'comparer-day-label': c.dayLabel,
    'comparer-day-sub': c.daySub,
    'comparer-evening-label': c.eveningLabel,
    'comparer-evening-sub': c.eveningSub,
    'comparer-preset-morning': c.presetMorning,
    'comparer-preset-split': c.presetSplit,
    'comparer-preset-evening': c.presetEvening,
    'comparer-hint': c.dragHint,
  };

  for (const [id, val] of Object.entries(map)) {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  }
}
