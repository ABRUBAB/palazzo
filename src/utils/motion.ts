const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const isFinePointer = () =>
  window.matchMedia('(pointer: fine) and (hover: hover)').matches;

export function initScrollReveals(): void {
  const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
  if (!targets.length) return;

  if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-revealed'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          const delay = Number(el.dataset.revealDelay ?? 0);
          if (delay > 0) {
            el.style.transitionDelay = `${delay}ms`;
          }
          el.classList.add('is-revealed');
          observer.unobserve(el);
        }
      }
    },
    { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
  );

  targets.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.96) {
      el.classList.add('is-revealed');
    } else {
      observer.observe(el);
    }
  });
}

export function initScrollAtmosphere(): void {
  const progressBar = document.getElementById('scroll-progress-bar');
  const heroBg = document.getElementById('hero-media-frame');
  const reduced = prefersReducedMotion();

  let ticking = false;
  const onFrame = () => {
    ticking = false;
    const scrollTop = window.scrollY;
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);

    if (progressBar) {
      const pct = Math.min(100, Math.max(0, (scrollTop / maxScroll) * 100));
      progressBar.style.transform = `scaleX(${(pct / 100).toFixed(4)})`;
    }

    if (heroBg && !reduced && scrollTop < window.innerHeight * 1.2) {
      const shift = Math.min(90, scrollTop * 0.22);
      heroBg.style.transform = `translate3d(0, ${shift.toFixed(1)}px, 0)`;
    }
  };

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(onFrame);
      }
    },
    { passive: true }
  );
  onFrame();
}

export function attachMagneticButtons(root: ParentNode = document): void {
  if (prefersReducedMotion() || !isFinePointer()) return;
  const buttons = root.querySelectorAll<HTMLElement>('[data-magnetic]');
  buttons.forEach((btn) => {
    if (btn.dataset.magneticBound) return;
    btn.dataset.magneticBound = '1';

    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.16;
      const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.2;
      btn.style.transform = `translate3d(${dx.toFixed(1)}px, ${dy.toFixed(1)}px, 0)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}

export function attachCardTilt(el: HTMLElement | null): void {
  if (!el || el.dataset.tiltBound || prefersReducedMotion() || !isFinePointer()) return;
  el.dataset.tiltBound = '1';

  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const rx = (e.clientX - rect.left) / rect.width;
    const ry = (e.clientY - rect.top) / rect.height;
    const rotY = ((rx - 0.5) * 5).toFixed(2);
    const rotX = (-(ry - 0.5) * 4.5).toFixed(2);
    el.style.setProperty('--mx', `${(rx * 100).toFixed(1)}%`);
    el.style.setProperty('--my', `${(ry * 100).toFixed(1)}%`);
    el.style.transform = `perspective(1100px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  });

  el.addEventListener('mouseleave', () => {
    el.style.transform = '';
  });
}
