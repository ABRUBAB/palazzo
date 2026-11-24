export interface PictureOptions {
  stem: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  widths?: number[];
  priority?: boolean;
  className?: string;
}

export function renderPictureMarkup(opts: PictureOptions): string {
  const widths = opts.widths ?? [480, 960, 1440];
  const avifSrcset = widths.map((w) => `/images/${opts.stem}-${w}.avif ${w}w`).join(', ');
  const webpSrcset = widths.map((w) => `/images/${opts.stem}-${w}.webp ${w}w`).join(', ');
  const maxW = widths[widths.length - 1] ?? 960;
  const fetchPriority = opts.priority ? ' fetchpriority="high"' : '';
  const loading = opts.priority ? 'eager' : 'lazy';

  return `
    <picture>
      <source type="image/avif" srcset="${avifSrcset}" sizes="${opts.sizes}" />
      <source type="image/webp" srcset="${webpSrcset}" sizes="${opts.sizes}" />
      <img
        src="/images/${opts.stem}-${maxW}.webp"
        alt="${opts.alt.replaceAll('"', '&quot;')}"
        width="${opts.width}"
        height="${opts.height}"
        loading="${loading}"
        decoding="async"${fetchPriority}
        class="${opts.className ?? ''}"
      />
    </picture>
  `;
}

export function wireImageSkeletons(root: ParentNode = document): void {
  const frames: HTMLElement[] = [];
  if (root instanceof HTMLElement && root.classList.contains('media-frame')) {
    frames.push(root);
  }
  frames.push(...Array.from(root.querySelectorAll<HTMLElement>('.media-frame')));

  frames.forEach((frame) => {
    const img = frame.querySelector('img');
    if (!img) {
      frame.classList.add('is-loaded');
      return;
    }

    const markLoaded = () => {
      frame.classList.add('is-loaded');
    };

    if (img.complete && img.naturalWidth > 0) {
      markLoaded();
      return;
    }

    frame.classList.remove('is-loaded');
    img.addEventListener('load', markLoaded, { once: true });
    img.addEventListener('error', markLoaded, { once: true });

    if (typeof img.decode === 'function') {
      img.decode().then(markLoaded).catch(() => {
        if (img.complete && img.naturalWidth > 0) markLoaded();
      });
    }

    window.setTimeout(() => {
      if (img.complete) markLoaded();
    }, 1600);
  });
}
