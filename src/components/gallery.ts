import { EXPERIENCES, GALLERY_PHOTOS } from '../data/experiences';
import { DICTIONARY } from '../data/i18n';
import { getState } from '../state/store';
import { tText } from '../utils/format';
import { renderPictureMarkup, wireImageSkeletons } from '../utils/media';
import { attachCardTilt } from '../utils/motion';

let lightboxIdx = -1;

export function initGalleryAndExperiences(): void {
  const modal = document.getElementById('lightbox-modal');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');

  closeBtn?.addEventListener('click', closeLightbox);
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeLightbox();
  });

  prevBtn?.addEventListener('click', () => stepLightbox(-1));
  nextBtn?.addEventListener('click', () => stepLightbox(1));

  document.addEventListener('keydown', (e) => {
    if (lightboxIdx < 0) return;
    if (e.key === 'Escape') closeLightbox();
    else if (e.key === 'ArrowLeft') stepLightbox(-1);
    else if (e.key === 'ArrowRight') stepLightbox(1);
  });

  renderGalleryAndExperiences();
}

export function renderGalleryAndExperiences(): void {
  const state = getState();
  const dict = DICTIONARY[state.lang];

  const expEyebrow = document.getElementById('exp-eyebrow');
  const expTitle = document.getElementById('exp-title');
  const expSub = document.getElementById('exp-subtitle');
  if (expEyebrow) expEyebrow.textContent = dict.experiences.eyebrow;
  if (expTitle) expTitle.textContent = dict.experiences.title;
  if (expSub) expSub.textContent = dict.experiences.subtitle;

  const expList = document.getElementById('experiences-list');
  if (expList) {
    expList.innerHTML = EXPERIENCES.map(
      (item, idx) => `
      <article class="exp-card" data-tilt-exp="${idx}">
        <div class="media-frame exp-media">
          ${renderPictureMarkup({
            stem: item.imageKey,
            alt: tText(item.title, state.lang),
            width: 960,
            height: 1200,
            sizes: '(min-width: 820px) 44vw, 94vw',
            widths: [480, 960],
          })}
        </div>
        <div class="exp-body">
          <div>
            <span class="eyebrow">${tText(item.tag, state.lang)}</span>
            <h3 class="exp-title">${tText(item.title, state.lang)}</h3>
            <p class="exp-text">${tText(item.body, state.lang)}</p>
          </div>
          <div class="exp-timing">${tText(item.timing, state.lang)}</div>
        </div>
      </article>
    `
    ).join('');
    wireImageSkeletons(expList);
    expList.querySelectorAll<HTMLElement>('[data-tilt-exp]').forEach((el) => attachCardTilt(el));
  }

  const galEyebrow = document.getElementById('gallery-eyebrow');
  const galTitle = document.getElementById('gallery-title');
  const galSub = document.getElementById('gallery-subtitle');
  if (galEyebrow) galEyebrow.textContent = dict.gallery.eyebrow;
  if (galTitle) galTitle.textContent = dict.gallery.title;
  if (galSub) galSub.textContent = dict.gallery.subtitle;

  const mosaic = document.getElementById('gallery-mosaic');
  if (mosaic) {
    mosaic.innerHTML = GALLERY_PHOTOS.map((photo, idx) => {
      const widths = photo.aspect === 'landscape' ? [480, 960, 1440] : [480, 960];
      return `
        <button
          type="button"
          class="gallery-tile gallery-tile--${photo.aspect}"
          data-lightbox-idx="${idx}"
          aria-label="${tText(photo.title, state.lang)}"
        >
          <div class="media-frame">
            ${renderPictureMarkup({
              stem: photo.stem,
              alt: tText(photo.title, state.lang),
              width: photo.w,
              height: photo.h,
              sizes: '(min-width: 768px) 50vw, 94vw',
              widths,
            })}
          </div>
          <div class="gallery-caption">
            <div>
              <div class="gallery-caption-title">${tText(photo.title, state.lang)}</div>
              <div class="gallery-caption-sub">${tText(photo.caption, state.lang)}</div>
            </div>
            <span aria-hidden="true" style="color:var(--brass-accessible);font-weight:700">↗</span>
          </div>
        </button>
      `;
    }).join('');
    wireImageSkeletons(mosaic);
    mosaic.querySelectorAll<HTMLButtonElement>('[data-lightbox-idx]').forEach((btn) => {
      btn.addEventListener('click', () => {
        openLightbox(Number(btn.dataset.lightboxIdx ?? 0));
      });
    });
  }

  if (lightboxIdx >= 0) renderLightboxSlide();
}

function openLightbox(idx: number): void {
  lightboxIdx = Math.max(0, Math.min(GALLERY_PHOTOS.length - 1, idx));
  const modal = document.getElementById('lightbox-modal');
  renderLightboxSlide();
  modal?.classList.add('is-open');
  modal?.setAttribute('aria-hidden', 'false');
}

function closeLightbox(): void {
  lightboxIdx = -1;
  const modal = document.getElementById('lightbox-modal');
  modal?.classList.remove('is-open');
  modal?.setAttribute('aria-hidden', 'true');
}

function stepLightbox(delta: number): void {
  if (lightboxIdx < 0) return;
  lightboxIdx = (lightboxIdx + delta + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length;
  renderLightboxSlide();
}

function renderLightboxSlide(): void {
  const photo = GALLERY_PHOTOS[lightboxIdx];
  if (!photo) return;
  const state = getState();
  const imgHost = document.getElementById('lightbox-img-host');
  const titleEl = document.getElementById('lightbox-title');
  const capEl = document.getElementById('lightbox-caption');
  const countEl = document.getElementById('lightbox-counter');

  if (imgHost) {
    const widths = photo.aspect === 'landscape' ? [480, 960, 1440] : [480, 960];
    imgHost.innerHTML = renderPictureMarkup({
      stem: photo.stem,
      alt: tText(photo.title, state.lang),
      width: photo.w,
      height: photo.h,
      sizes: '92vw',
      widths,
      priority: true,
      className: 'lightbox-img',
    });
  }
  if (titleEl) titleEl.textContent = tText(photo.title, state.lang);
  if (capEl) capEl.textContent = tText(photo.caption, state.lang);
  if (countEl) countEl.textContent = `${lightboxIdx + 1} / ${GALLERY_PHOTOS.length}`;
}
