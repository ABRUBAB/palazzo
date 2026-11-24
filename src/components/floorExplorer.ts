import { DICTIONARY } from '../data/i18n';
import {
  FLOORS,
  ROOM_BADGE_TEMPLATES,
  ROOM_IMAGE_META,
  ROOMS,
  type AmenityFilter,
  type FloorId,
  type RoomData,
} from '../data/rooms';
import {
  calculateStayPricing,
  diffNights,
  getNextAvailableRange,
  getSelectedRoom,
  getState,
  isRoomAvailable,
  roomMatchesFilter,
  selectRoom,
  setActiveFloor,
  setDates,
  setFilter,
} from '../state/store';
import { formatCompactDate, formatEur, tText } from '../utils/format';
import { renderPictureMarkup, wireImageSkeletons } from '../utils/media';
import { attachCardTilt } from '../utils/motion';

let lastRenderedFloor: FloorId = getState().activeFloorId;
let lastRenderedImageKey = '';
let tooltipEl: HTMLElement | null = null;
let stickyTooltipRoomId: string | null = null;
let openDrawerCallback: (() => void) | null = null;

const FLOOR_ORDER: FloorId[] = ['03', '02', '01', '00'];

export function initFloorExplorer(onReserveRoom: () => void): void {
  openDrawerCallback = onReserveRoom;
  tooltipEl = document.getElementById('bp-tooltip');

  tooltipEl?.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  document.addEventListener('click', (e) => {
    if (!stickyTooltipRoomId || !tooltipEl?.classList.contains('is-visible')) return;
    const target = e.target as Element | null;
    if (target && (tooltipEl.contains(target) || target.closest?.('[data-room-id]'))) return;
    hideTooltip();
  });

  document.querySelectorAll<HTMLButtonElement>('[data-filter-pill]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const f = btn.dataset.filterPill as AmenityFilter | undefined;
      if (f) setFilter(f);
    });
  });

  document.getElementById('suite-compare-btn')?.addEventListener('click', () => {
    document.getElementById('comparer')?.scrollIntoView({ behavior: 'smooth' });
  });

  document.getElementById('suite-reserve-btn')?.addEventListener('click', () => {
    openDrawerCallback?.();
  });

  attachCardTilt(document.getElementById('suite-showcase-card'));
  renderFloorExplorer();
}

export function renderFloorExplorer(): void {
  const state = getState();
  const dict = DICTIONARY[state.lang].explorer;
  const currentFloor = FLOORS.find((f) => f.id === state.activeFloorId) ?? FLOORS[0]!;
  const selectedRoom = getSelectedRoom(state);

  const textMap: Record<string, string> = {
    'explorer-eyebrow': dict.eyebrow,
    'explorer-title': dict.title,
    'explorer-subtitle': dict.subtitle,
    'legend-available': dict.legendAvailable,
    'legend-selected': dict.legendSelected,
    'legend-last': dict.legendLast,
    'legend-reserved': dict.legendReserved,
    'elev-title': dict.elevTitle,
    'floor-suites-heading': `${dict.floorSuitesHeading} · ${dict.floorPrefix} ${currentFloor.code}`,
  };
  for (const [id, val] of Object.entries(textMap)) {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  }

  document.querySelectorAll<HTMLButtonElement>('[data-filter-pill]').forEach((btn) => {
    const key = btn.dataset.filterPill as AmenityFilter;
    btn.setAttribute('aria-pressed', String(key === state.activeFilter));
    btn.textContent = dict.filters[key];
  });

  renderElevationSvg(currentFloor.id);
  renderFloorList();

  const lightEl = document.getElementById('floor-light-banner');
  if (lightEl) {
    lightEl.innerHTML = `
      <span>☀ ${tText(currentFloor.lightNote, state.lang)}</span>
      <strong>${currentFloor.ceilingHeight}</strong>
    `;
  }

  const bpLayer = document.getElementById('blueprint-layer');
  if (bpLayer) {
    const prevIdx = FLOOR_ORDER.indexOf(lastRenderedFloor);
    const nextIdx = FLOOR_ORDER.indexOf(currentFloor.id);
    if (prevIdx !== nextIdx) {
      bpLayer.classList.remove('is-entering-up', 'is-entering-down');
      void bpLayer.offsetWidth;
      bpLayer.classList.add(nextIdx < prevIdx ? 'is-entering-down' : 'is-entering-up');
      lastRenderedFloor = currentFloor.id;
    }
    bpLayer.innerHTML = buildFloorplanSvg(currentFloor.id, state.activeFilter);
    wireFloorplanInteractions(bpLayer);
  }

  renderFloorSuitesStrip(currentFloor.id);
  renderSuiteShowcase(selectedRoom);
}

function renderElevationSvg(activeFloorId: FloorId): void {
  const host = document.getElementById('elevation-svg-host');
  if (!host) return;
  const active = FLOORS.find((f) => f.id === activeFloorId) ?? FLOORS[0]!;

  const bands = FLOORS.map((f) => {
    const isAct = f.id === activeFloorId;
    const winFill = isAct ? '#F3D8A0' : 'rgba(26,23,21,0.18)';
    const yMid = f.elevationY + f.elevationH / 2;
    return `
      <g>
        <rect
          x="14"
          y="${f.elevationY}"
          width="84"
          height="${f.elevationH}"
          rx="3"
          fill="${isAct ? '#1F3028' : '#FAF7F2'}"
          stroke="${isAct ? '#D9B87E' : 'rgba(26,23,21,0.16)'}"
          stroke-width="${isAct ? '1.8' : '1'}"
        />
        <text
          x="21"
          y="${yMid + 3.5}"
          font-size="9.5"
          font-weight="700"
          fill="${isAct ? '#FAF7F2' : '#575049'}"
        >${f.code}</text>
        <!-- Arched Florentine Window Silhouettes -->
        <rect x="42" y="${f.elevationY + 11}" width="8" height="16" rx="4" fill="${winFill}"/>
        <rect x="55" y="${f.elevationY + 11}" width="8" height="16" rx="4" fill="${winFill}"/>
        <rect x="68" y="${f.elevationY + 11}" width="8" height="16" rx="4" fill="${winFill}"/>
      </g>
    `;
  }).join('');

  const liftIndicatorY = active.elevationY + active.elevationH / 2;

  host.innerHTML = `
    <svg class="elevation-svg" viewBox="0 0 112 246" aria-hidden="true">
      <polygon points="8,24 56,5 104,24" fill="#9E543D" stroke="#1A1715" stroke-opacity="0.28" stroke-width="1"/>
      <rect x="10" y="24" width="92" height="214" rx="4" fill="#EDE6DA" stroke="rgba(26,23,21,0.22)" stroke-width="1.2"/>
      ${bands}
      <line x1="90" y1="28" x2="90" y2="232" stroke="rgba(184,147,90,0.45)" stroke-width="1.5"/>
      <circle cx="90" cy="${liftIndicatorY}" r="4.5" fill="#D9B87E" stroke="#1F3028" stroke-width="1.5"/>
    </svg>
  `;
}

function renderFloorList(): void {
  const listEl = document.getElementById('floor-list');
  if (!listEl) return;
  const state = getState();
  const dict = DICTIONARY[state.lang].explorer;

  listEl.innerHTML = FLOORS.map((f) => {
    const roomsOnFloor = ROOMS.filter((r) => r.floorId === f.id);
    const matchingOpen = roomsOnFloor.filter(
      (r) =>
        isRoomAvailable(r, state.checkIn, state.checkOut) &&
        roomMatchesFilter(r, state.activeFilter)
    ).length;
    const isActive = f.id === state.activeFloorId;

    return `
      <button
        type="button"
        class="neu-control floor-btn"
        data-floor-id="${f.id}"
        aria-pressed="${isActive}"
      >
        <span class="floor-btn-top">
          <span class="floor-code">${dict.floorPrefix} ${f.code}</span>
          <span class="floor-match-count">${matchingOpen} ${dict.matchingSuffix}</span>
        </span>
        <span class="floor-name">${tText(f.name, state.lang)}</span>
        <span class="floor-sub">${tText(f.subtitle, state.lang)}</span>
      </button>
    `;
  }).join('');

  listEl.querySelectorAll<HTMLButtonElement>('[data-floor-id]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const fId = btn.dataset.floorId as FloorId | undefined;
      if (fId) {
        hideTooltip();
        setActiveFloor(fId);
      }
    });
  });
}

function buildFloorplanSvg(floorId: FloorId, filter: AmenityFilter): string {
  const state = getState();
  const dict = DICTIONARY[state.lang].explorer;
  const floor = FLOORS.find((f) => f.id === floorId) ?? FLOORS[0]!;
  const floorRooms = ROOMS.filter((r) => r.floorId === floorId);

  const featureMarkup = floor.specialFeature
    ? buildSpecialFeatureSvg(floor.specialFeature, state.lang)
    : '';

  const roomElements = floorRooms
    .map((room) => buildRoomSvg(room, state.selectedRoomId, filter))
    .join('');

  return `
    <svg class="blueprint-svg" viewBox="0 0 760 500" role="img" aria-label="${tText(floor.name, state.lang)} floorplan">
      <defs>
        <pattern id="reserved-hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="8" height="8" fill="#E4DDD0"/>
          <line x1="0" y1="0" x2="0" y2="8" stroke="rgba(26,23,21,0.22)" stroke-width="2.2"/>
        </pattern>
        <pattern id="terrace-tile" width="14" height="14" patternUnits="userSpaceOnUse">
          <rect width="14" height="14" fill="#F2E4D9"/>
          <path d="M14 0H0V14" fill="none" stroke="rgba(158,84,61,0.26)" stroke-width="0.7"/>
        </pattern>
      </defs>

      <text x="380" y="28" text-anchor="middle" font-size="10" font-weight="700" letter-spacing="2.4" fill="#9E543D">${dict.streetLabel}</text>
      <text x="380" y="482" text-anchor="middle" font-size="10" font-weight="700" letter-spacing="2.4" fill="#1F3028">${dict.courtyardLabel}</text>

      <rect x="52" y="54" width="656" height="392" rx="8" fill="#EAE2D4" stroke="#1F3028" stroke-opacity="0.34" stroke-width="3"/>

      <rect x="62" y="216" width="636" height="64" fill="#E1D8C8"/>
      <line x1="72" y1="248" x2="328" y2="248" stroke="rgba(26,23,21,0.14)" stroke-dasharray="4 5"/>
      <line x1="436" y1="248" x2="688" y2="248" stroke="rgba(26,23,21,0.14)" stroke-dasharray="4 5"/>
      <text x="195" y="252" text-anchor="middle" font-size="9.5" letter-spacing="2" fill="#575049">GALLERIA WEST</text>
      <text x="562" y="252" text-anchor="middle" font-size="9.5" letter-spacing="2" fill="#575049">GALLERIA EAST</text>

      <rect x="342" y="222" width="34" height="52" rx="3" fill="#FAF7F2" stroke="#B8935A" stroke-width="1.4"/>
      <line x1="342" y1="222" x2="376" y2="274" stroke="#B8935A" stroke-opacity="0.45" stroke-width="1"/>
      <line x1="376" y1="222" x2="342" y2="274" stroke="#B8935A" stroke-opacity="0.45" stroke-width="1"/>
      <text x="359" y="251" text-anchor="middle" font-size="7.5" font-weight="700" fill="#7D5D2B">LIFT</text>

      <rect x="384" y="220" width="46" height="56" rx="2" fill="#FAF7F2" stroke="rgba(26,23,21,0.3)" stroke-width="1.2"/>
      ${[0, 1, 2, 3, 4, 5, 6]
        .map(
          (i) =>
            `<line x1="${388 + i * 6}" y1="223" x2="${388 + i * 6}" y2="273" stroke="rgba(26,23,21,0.22)" stroke-width="1"/>`
        )
        .join('')}

      <g transform="translate(716, 46)" aria-hidden="true">
        <circle cx="0" cy="0" r="14" fill="#FAF7F2" stroke="#B8935A" stroke-width="1.2"/>
        <polygon points="0,-10 3.5,2 0,0 -3.5,2" fill="#1F3028"/>
        <text x="0" y="10" text-anchor="middle" font-size="7" font-weight="700" fill="#9E543D">N</text>
      </g>

      ${featureMarkup}
      ${roomElements}
    </svg>
  `;
}

function buildSpecialFeatureSvg(
  feat: NonNullable<(typeof FLOORS)[number]['specialFeature']>,
  lang: ReturnType<typeof getState>['lang']
): string {
  const cx = feat.x + feat.w / 2;
  const cy = feat.y + feat.h / 2;

  if (feat.kind === 'cortile') {
    return `
      <g>
        <rect x="${feat.x}" y="${feat.y}" width="${feat.w}" height="${feat.h}" rx="6" fill="#DCE4DF" stroke="#1F3028" stroke-opacity="0.4" stroke-width="1.4" stroke-dasharray="5 3"/>
        <circle cx="${cx}" cy="${cy - 8}" r="22" fill="#FAF7F2" stroke="#B8935A" stroke-width="1.4"/>
        <circle cx="${cx}" cy="${cy - 8}" r="11" fill="#C6D6D3" stroke="#1F3028" stroke-opacity="0.4" stroke-width="1"/>
        <circle cx="${feat.x + 36}" cy="${feat.y + 34}" r="13" fill="#1F3028" fill-opacity="0.28"/>
        <circle cx="${feat.x + feat.w - 36}" cy="${feat.y + 34}" r="13" fill="#1F3028" fill-opacity="0.28"/>
        <circle cx="${feat.x + 36}" cy="${feat.y + feat.h - 30}" r="13" fill="#1F3028" fill-opacity="0.28"/>
        <circle cx="${feat.x + feat.w - 36}" cy="${feat.y + feat.h - 30}" r="13" fill="#1F3028" fill-opacity="0.28"/>
        <text x="${cx}" y="${feat.y + feat.h - 14}" text-anchor="middle" font-size="10.5" font-weight="700" fill="#1F3028">${tText(feat.label, lang)}</text>
      </g>
    `;
  }

  return `
    <g>
      <rect x="${feat.x}" y="${feat.y}" width="${feat.w}" height="${feat.h}" rx="6" fill="url(#terrace-tile)" stroke="#9E543D" stroke-opacity="0.55" stroke-width="1.4" stroke-dasharray="5 3"/>
      <circle cx="${cx - 38}" cy="${cy - 8}" r="12" fill="none" stroke="#9E543D" stroke-width="1.2"/>
      <circle cx="${cx + 38}" cy="${cy - 8}" r="12" fill="none" stroke="#9E543D" stroke-width="1.2"/>
      <circle cx="${feat.x + 22}" cy="${feat.y + 22}" r="7" fill="#1F3028" fill-opacity="0.35"/>
      <circle cx="${feat.x + feat.w - 22}" cy="${feat.y + 22}" r="7" fill="#1F3028" fill-opacity="0.35"/>
      <text x="${cx}" y="${cy + 34}" text-anchor="middle" font-size="10.5" font-weight="700" fill="#9E543D">${tText(feat.label, lang)}</text>
    </g>
  `;
}

function buildRoomSvg(room: RoomData, selectedId: string, filter: AmenityFilter): string {
  const state = getState();
  const { x, y, w, h, terrace, windowSide, doorPos, bedPos, tubPos } = room.blueprint;
  const available = isRoomAvailable(room, state.checkIn, state.checkOut);
  const selected = room.id === selectedId && available;
  const matches = roomMatchesFilter(room, filter);

  const classes = ['bp-room'];
  if (!available) classes.push('is-reserved');
  else classes.push('is-available');
  if (selected) classes.push('is-selected');
  if (!matches) classes.push('is-dimmed');

  let wx1 = x + 22,
    wy1 = y,
    wx2 = x + w - 22,
    wy2 = y;
  if (windowSide === 'bottom') {
    wy1 = y + h;
    wy2 = y + h;
  } else if (windowSide === 'left') {
    wx1 = x;
    wx2 = x;
    wy1 = y + 20;
    wy2 = y + h - 20;
  } else if (windowSide === 'right') {
    wx1 = x + w;
    wx2 = x + w;
    wy1 = y + 20;
    wy2 = y + h - 20;
  }

  const doorSvg =
    doorPos.side === 'bottom'
      ? `<path d="M${doorPos.x},${doorPos.y} L${doorPos.x},${doorPos.y - 18} A18,18 0 0 1 ${doorPos.x + 18},${doorPos.y}" fill="none" stroke="${selected ? 'rgba(247,243,236,0.45)' : 'rgba(26,23,21,0.28)'}" stroke-width="1"/>`
      : `<path d="M${doorPos.x},${doorPos.y} L${doorPos.x},${doorPos.y + 18} A18,18 0 0 0 ${doorPos.x + 18},${doorPos.y}" fill="none" stroke="${selected ? 'rgba(247,243,236,0.45)' : 'rgba(26,23,21,0.28)'}" stroke-width="1"/>`;

  const terraceSvg = terrace
    ? `
      <rect x="${terrace.x}" y="${terrace.y}" width="${terrace.w}" height="${terrace.h}" rx="3" fill="url(#terrace-tile)" stroke="#9E543D" stroke-width="1.2" stroke-dasharray="4 2"/>
      ${
        terrace.w > 50
          ? `<text x="${terrace.x + terrace.w / 2}" y="${terrace.y + terrace.h / 2 + 3}" text-anchor="middle" font-size="8.5" font-weight="600" fill="#9E543D">${tText(terrace.label, state.lang)}</text>`
          : ''
      }
    `
    : '';

  const tubSvg = tubPos
    ? `<ellipse cx="${tubPos.cx}" cy="${tubPos.cy}" rx="${tubPos.rx}" ry="${tubPos.ry}" fill="none" stroke="${selected ? 'rgba(247,243,236,0.42)' : 'rgba(26,23,21,0.26)'}" stroke-width="1.2"/>
       <ellipse cx="${tubPos.cx}" cy="${tubPos.cy}" rx="${tubPos.rx - 5}" ry="${tubPos.ry - 4}" fill="none" stroke="${selected ? 'rgba(247,243,236,0.28)' : 'rgba(26,23,21,0.16)'}" stroke-width="0.9"/>`
    : '';

  const centerX = x + w / 2;
  const centerY = y + h / 2;

  return `
    <g
      class="${classes.join(' ')}"
      data-room-id="${room.id}"
      role="button"
      tabindex="0"
      aria-pressed="${selected}"
      aria-label="Suite ${room.number} ${room.name}, ${room.areaSqm} square meters, ${formatEur(room.nightlyRateEur, state.lang)}"
    >
      ${terraceSvg}
      <rect class="bp-room-fill" x="${x}" y="${y}" width="${w}" height="${h}" rx="4" />

      <rect x="${bedPos.x}" y="${bedPos.y}" width="${bedPos.w}" height="${bedPos.h}" rx="3" fill="none" stroke="${selected ? 'rgba(247,243,236,0.28)' : 'rgba(26,23,21,0.16)'}" stroke-width="1.1"/>
      <rect x="${bedPos.x + 6}" y="${bedPos.y + 5}" width="${bedPos.w / 2 - 8}" height="12" rx="2" fill="none" stroke="${selected ? 'rgba(247,243,236,0.26)' : 'rgba(26,23,21,0.15)'}" stroke-width="0.9"/>
      <rect x="${bedPos.x + bedPos.w / 2 + 2}" y="${bedPos.y + 5}" width="${bedPos.w / 2 - 8}" height="12" rx="2" fill="none" stroke="${selected ? 'rgba(247,243,236,0.26)' : 'rgba(26,23,21,0.15)'}" stroke-width="0.9"/>
      ${tubSvg}
      ${doorSvg}
      <line class="bp-window-glow" x1="${wx1}" y1="${wy1}" x2="${wx2}" y2="${wy2}" />

      <text class="bp-room-subtext" x="${centerX}" y="${centerY - 14}" text-anchor="middle" font-size="9.5" font-weight="700" letter-spacing="1.4">${room.number}</text>
      <text class="bp-room-text" x="${centerX}" y="${centerY + 4}" text-anchor="middle" font-family="Fraunces Variable, Georgia, serif" font-size="13.5" font-weight="500">${room.name}</text>
      <text class="bp-room-subtext" x="${centerX}" y="${centerY + 22}" text-anchor="middle" font-size="10.5" font-weight="600">${room.areaSqm} m² · ${formatEur(room.nightlyRateEur, state.lang)}</text>

      ${
        room.highDemand && available
          ? `<circle cx="${x + w - 16}" cy="${y + 16}" r="5.5" fill="#9E543D"/>`
          : available
            ? `<circle class="bp-pulse-dot" cx="${x + w - 16}" cy="${y + 16}" r="4.5" fill="#B8935A"/>`
            : `<text x="${x + w - 14}" y="${y + 18}" text-anchor="end" font-size="9.5" font-weight="700" fill="#575049">✕</text>`
      }
    </g>
  `;
}

function wireFloorplanInteractions(container: HTMLElement): void {
  const roomEls = container.querySelectorAll<SVGGElement>('.bp-room');
  roomEls.forEach((g) => {
    const roomId = g.dataset.roomId ?? '';
    const room = ROOMS.find((r) => r.id === roomId);
    if (!room) return;

    g.addEventListener('mouseenter', () => {
      if (!stickyTooltipRoomId) {
        showRoomTooltip(room, g, false);
      }
    });

    g.addEventListener('mouseleave', () => {
      if (!stickyTooltipRoomId) {
        hideTooltip();
      }
    });

    const handleActivate = (e: Event) => {
      e.stopPropagation();
      const state = getState();
      if (isRoomAvailable(room, state.checkIn, state.checkOut)) {
        hideTooltip();
        selectRoom(room.id);
      } else {
        showRoomTooltip(room, g, true);
      }
    };

    g.addEventListener('click', handleActivate);
    g.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleActivate(e);
      }
    });
  });
}

function showRoomTooltip(room: RoomData, target: Element, sticky: boolean): void {
  if (!tooltipEl) return;
  const viewport = document.getElementById('blueprint-viewport');
  if (!viewport) return;

  const state = getState();
  const dict = DICTIONARY[state.lang].explorer;
  const available = isRoomAvailable(room, state.checkIn, state.checkOut);
  const vpRect = viewport.getBoundingClientRect();
  const elRect = target.getBoundingClientRect();

  const rawLeft = elRect.left - vpRect.left + elRect.width / 2;
  const clampedLeft = Math.max(115, Math.min(vpRect.width - 115, rawLeft));
  const rawTop = elRect.top - vpRect.top - 10;
  const placeBelow = rawTop < 105;
  const topPx = placeBelow
    ? Math.min(vpRect.height - 115, elRect.bottom - vpRect.top + 8)
    : Math.max(8, rawTop - 96);

  if (available) {
    stickyTooltipRoomId = null;
    tooltipEl.classList.remove('is-interactive');
    tooltipEl.innerHTML = `
      <div class="bp-tooltip-title">${room.number} · ${room.name}</div>
      <div class="bp-tooltip-meta">${room.areaSqm} m² · ${room.maxGuests} ${DICTIONARY[state.lang].hero.guestPlural} · ${tText(room.orientation, state.lang)}</div>
      <div class="bp-tooltip-price">${formatEur(room.nightlyRateEur, state.lang)} ${dict.perNight}</div>
    `;
  } else {
    stickyTooltipRoomId = sticky ? room.id : null;
    const nights = diffNights(state.checkIn, state.checkOut);
    const nextRange = getNextAvailableRange(room, nights);
    tooltipEl.classList.add('is-interactive');
    tooltipEl.innerHTML = `
      <div class="bp-tooltip-title">${room.number} · ${room.name}</div>
      <div class="bp-tooltip-meta" style="color:var(--terracotta);font-weight:600">
        ${dict.reservedTooltipPrefix} ${formatCompactDate(nextRange.checkIn, state.lang)}
      </div>
      <button type="button" class="btn-outline" id="bp-jump-dates" style="margin-top:0.55rem;min-height:32px;padding:0.25rem 0.7rem;font-size:0.74rem">
        ${dict.reservedJumpBtn}
      </button>
    `;
    tooltipEl.querySelector('#bp-jump-dates')?.addEventListener('click', (e) => {
      e.stopPropagation();
      hideTooltip();
      setDates(nextRange.checkIn, nextRange.checkOut);
      selectRoom(room.id);
    });
  }

  tooltipEl.style.left = `${clampedLeft}px`;
  tooltipEl.style.top = `${topPx}px`;
  tooltipEl.classList.add('is-visible');
}

function hideTooltip(): void {
  stickyTooltipRoomId = null;
  tooltipEl?.classList.remove('is-visible', 'is-interactive');
}

function renderFloorSuitesStrip(floorId: FloorId): void {
  const host = document.getElementById('floor-suites-grid');
  if (!host) return;
  const state = getState();
  const dict = DICTIONARY[state.lang].explorer;
  const roomsOnFloor = ROOMS.filter((r) => r.floorId === floorId);

  host.innerHTML = roomsOnFloor
    .map((r) => {
      const avail = isRoomAvailable(r, state.checkIn, state.checkOut);
      const isSel = r.id === state.selectedRoomId && avail;
      const matches = roomMatchesFilter(r, state.activeFilter);
      const dotClass = !avail
        ? 'status-dot--booked'
        : r.highDemand
          ? 'status-dot--last'
          : '';
      const statusText = !avail
        ? dict.legendReserved
        : r.highDemand
          ? dict.lastRoomBadge
          : formatEur(r.nightlyRateEur, state.lang);

      return `
        <button
          type="button"
          class="floor-suite-card ${isSel ? 'is-selected' : ''} ${!avail ? 'is-reserved' : ''}"
          style="${!matches ? 'opacity:0.38' : ''}"
          data-suite-card-id="${r.id}"
        >
          <span class="floor-suite-card-top">
            <span>Suite ${r.number}</span>
            <span style="display:inline-flex;align-items:center;gap:0.35rem">
              <span class="status-dot ${dotClass}"></span>
              <span>${statusText}</span>
            </span>
          </span>
          <span class="floor-suite-card-name">${r.name}</span>
          <span class="floor-suite-card-meta">${r.areaSqm} m² · ${r.maxGuests} ${DICTIONARY[state.lang].hero.guestPlural}</span>
        </button>
      `;
    })
    .join('');

  host.querySelectorAll<HTMLButtonElement>('[data-suite-card-id]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.suiteCardId ?? '';
      const room = ROOMS.find((r) => r.id === id);
      if (!room) return;
      if (isRoomAvailable(room, getState().checkIn, getState().checkOut)) {
        hideTooltip();
        selectRoom(room.id);
      } else {
        const svgTarget = document.querySelector(`#blueprint-layer [data-room-id="${room.id}"]`);
        if (svgTarget) showRoomTooltip(room, svgTarget, true);
      }
    });
  });
}

function renderSuiteShowcase(room: RoomData): void {
  const state = getState();
  const dict = DICTIONARY[state.lang].explorer;
  const floor = FLOORS.find((f) => f.id === room.floorId) ?? FLOORS[0]!;
  const pricing = calculateStayPricing(state);

  const mediaHost = document.getElementById('suite-media-frame');
  if (mediaHost && lastRenderedImageKey !== room.imageKey) {
    lastRenderedImageKey = room.imageKey;
    const meta = ROOM_IMAGE_META[room.imageKey];
    mediaHost.innerHTML = renderPictureMarkup({
      stem: room.imageKey,
      alt: `${room.name} — ${tText(meta.label, state.lang)}`,
      width: meta.w,
      height: meta.h,
      sizes: '(min-width: 1080px) 440px, 92vw',
      widths: [480, 960, 1440],
    });
    wireImageSkeletons(mediaHost);
  }

  const floorChip = document.getElementById('suite-floor-chip');
  if (floorChip) {
    floorChip.textContent = `${dict.floorPrefix} ${floor.code} · ${room.number}`;
  }

  const demandChip = document.getElementById('suite-demand-chip');
  if (demandChip) {
    demandChip.hidden = !room.highDemand;
    demandChip.textContent = dict.highDemandBadge;
  }

  const textMap: Record<string, string> = {
    'suite-category': tText(room.category, state.lang),
    'suite-name': room.name,
    'suite-price-num': formatEur(room.nightlyRateEur, state.lang),
    'suite-price-unit': dict.perNight,
    'suite-tagline': tText(room.tagline, state.lang),
    'suite-desc': tText(room.description, state.lang),
    'spec-area-label': dict.areaLabel,
    'spec-area-val': `${room.areaSqm} m²`,
    'spec-guests-label': dict.capacityLabel,
    'spec-guests-val': `${room.maxGuests} ${DICTIONARY[state.lang].hero.guestPlural}`,
    'spec-view-label': tText(room.orientation, state.lang),
    'spec-view-val': tText(room.sunNote, state.lang),
    'suite-compare-btn': dict.compareLightBtn,
    'suite-reserve-btn': `${dict.reserveExactBtn} (${room.number}) →`,
  };

  for (const [id, val] of Object.entries(textMap)) {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  }

  const badgesHost = document.getElementById('suite-badges');
  if (badgesHost) {
    const dynamicTags: string[] = [];
    if (room.filters.includes('terrace')) dynamicTags.push(dict.terraceBadge);
    if (room.filters.includes('tub')) dynamicTags.push(dict.tubBadge);
    if (room.filters.includes('garden')) dynamicTags.push(dict.gardenBadge);
    for (const tpl of ROOM_BADGE_TEMPLATES) {
      dynamicTags.push(tText(tpl.label, state.lang));
    }

    badgesHost.innerHTML = dynamicTags
      .slice(0, 5)
      .map((label) => `<span class="amenity-badge">✦ ${label}</span>`)
      .join('');
  }

  const stayPreviewEl = document.getElementById('suite-stay-preview');
  if (stayPreviewEl) {
    const discountNote =
      pricing.discountRate > 0 ? ` (−${Math.round(pricing.discountRate * 100)}%)` : '';
    stayPreviewEl.innerHTML = `
      <span>${dict.stayPreviewLabel} · <strong>${pricing.nights}N</strong>${discountNote}</span>
      <strong>${formatEur(pricing.discountedRoomTotal, state.lang)}</strong>
    `;
  }

  const warnEl = document.getElementById('suite-capacity-warning');
  if (warnEl) {
    if (state.guests > room.maxGuests) {
      warnEl.hidden = false;
      warnEl.textContent = dict.guestCapacityWarning
        .replace('{max}', String(room.maxGuests))
        .replace('{guests}', String(state.guests));
    } else {
      warnEl.hidden = true;
    }
  }
}
