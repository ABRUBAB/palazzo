import { LANDMARKS } from '../data/experiences';
import { DICTIONARY } from '../data/i18n';
import { getState } from '../state/store';
import { tText } from '../utils/format';

let activeLandmarkId = LANDMARKS[1]!.id;

export function initLocationMap(onOpenConcierge: () => void): void {
  document.getElementById('location-concierge-btn')?.addEventListener('click', onOpenConcierge);
  renderLocationMap();
}

export function renderLocationMap(): void {
  const state = getState();
  const loc = DICTIONARY[state.lang].location;

  const textMap: Record<string, string> = {
    'loc-eyebrow': loc.eyebrow,
    'loc-title': loc.title,
    'loc-subtitle': loc.subtitle,
    'loc-address-label': loc.addressLabel,
    'loc-address-val': loc.addressValue,
    'loc-hours-label': loc.hoursLabel,
    'loc-hours-val': loc.hoursValue,
    'loc-maps-btn': loc.mapsBtn,
    'location-concierge-btn': loc.conciergeBtn,
  };
  for (const [id, val] of Object.entries(textMap)) {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  }

  const svgHost = document.getElementById('florence-map-host');
  if (svgHost) {
    const pins = LANDMARKS.map((lm, i) => {
      const active = lm.id === activeLandmarkId;
      return `
        <g
          class="map-pin ${active ? 'is-active' : ''}"
          data-landmark-id="${lm.id}"
          role="button"
          tabindex="0"
          aria-label="${lm.name} — ${lm.walkMins} ${loc.walkMinutes}"
        >
          <line x1="242" y1="168" x2="${lm.cx}" y2="${lm.cy}" stroke="${active ? '#B8935A' : 'rgba(26,23,21,0.16)'}" stroke-width="${active ? '2' : '1'}" stroke-dasharray="4 3"/>
          <circle cx="${lm.cx}" cy="${lm.cy}" r="${active ? 15 : 12}" fill="${active ? '#1F3028' : '#FAF7F2'}" stroke="#B8935A" stroke-width="2"/>
          <text x="${lm.cx}" y="${lm.cy + 4}" text-anchor="middle" font-size="10" font-weight="700" fill="${active ? '#F7F3EC' : '#1A1715'}">${i + 1}</text>
        </g>
      `;
    }).join('');

    svgHost.innerHTML = `
      <svg class="map-svg" viewBox="0 0 560 380" role="img" aria-label="Stylized walking map of historic Florence around Via della Spada 14">
        <!-- Historic City Blocks -->
        <g fill="#EBE3D4" stroke="rgba(26,23,21,0.08)" stroke-width="1">
          <rect x="34" y="34" width="110" height="82" rx="4"/>
          <rect x="162" y="38" width="136" height="92" rx="4"/>
          <rect x="318" y="32" width="196" height="106" rx="4"/>
          <rect x="38" y="138" width="118" height="108" rx="4"/>
          <rect x="176" y="148" width="116" height="98" rx="4"/>
          <rect x="316" y="156" width="186" height="92" rx="4"/>
        </g>

        <!-- Via della Spada & Via de' Tornabuoni -->
        <path d="M90,152 L292,152 L292,292" fill="none" stroke="#FAF7F2" stroke-width="10" stroke-linecap="round"/>
        <path d="M168,84 L168,268 L446,268" fill="none" stroke="#FAF7F2" stroke-width="8" stroke-linecap="round"/>
        <text x="206" y="142" font-size="8.5" font-weight="700" letter-spacing="1.4" fill="#7D5D2B">VIA DELLA SPADA</text>
        <text x="303" y="216" font-size="8" font-weight="600" letter-spacing="1.2" fill="#575049" transform="rotate(90 303 216)">VIA TORNABUONI</text>

        <!-- Arno River -->
        <path d="M0,294 Q170,272 340,296 T560,286 L560,342 Q370,350 200,334 T0,346 Z" fill="#D7E0DF" stroke="rgba(31,48,40,0.2)" stroke-width="1.2"/>
        <text x="120" y="322" font-size="10" font-style="italic" letter-spacing="3" fill="#1F3028" fill-opacity="0.72">FIUME ARNO</text>

        <!-- Ponte Vecchio Span -->
        <rect x="306" y="282" width="24" height="58" rx="2" fill="#E8DEC9" stroke="#B8935A" stroke-width="1.5"/>

        ${pins}

        <!-- Palazzo Verena Flagship Pin -->
        <g transform="translate(242, 168)">
          <circle cx="0" cy="0" r="24" fill="rgba(184,147,90,0.2)"/>
          <circle cx="0" cy="0" r="15" fill="#9E543D" stroke="#FAF7F2" stroke-width="2.5"/>
          <circle cx="0" cy="0" r="4.5" fill="#FAF7F2"/>
          <rect x="-56" y="-36" width="112" height="20" rx="10" fill="#1A1715"/>
          <text x="0" y="-23" text-anchor="middle" font-size="9" font-weight="700" letter-spacing="0.8" fill="#F7F3EC">PALAZZO VERENA</text>
        </g>
      </svg>
    `;

    svgHost.querySelectorAll<SVGGElement>('[data-landmark-id]').forEach((pin) => {
      const activate = () => {
        const id = pin.dataset.landmarkId;
        if (id) {
          activeLandmarkId = id;
          renderLocationMap();
        }
      };
      pin.addEventListener('click', activate);
      pin.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          activate();
        }
      });
    });
  }

  const listHost = document.getElementById('landmark-list');
  if (listHost) {
    listHost.innerHTML = LANDMARKS.map((lm, i) => {
      const active = lm.id === activeLandmarkId;
      return `
        <button type="button" class="landmark-btn ${active ? 'is-active' : ''}" data-landmark-btn="${lm.id}">
          <div>
            <div style="font-weight:700;font-size:0.93rem;color:var(--ink)">${i + 1}. ${lm.name}</div>
            <div style="margin-top:0.2rem;font-size:0.8rem;color:var(--umber)">${tText(lm.detail, state.lang)}</div>
          </div>
          <span class="landmark-walk">${lm.walkMins} ${loc.walkMinutes}</span>
        </button>
      `;
    }).join('');

    listHost.querySelectorAll<HTMLButtonElement>('[data-landmark-btn]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.landmarkBtn;
        if (id) {
          activeLandmarkId = id;
          renderLocationMap();
        }
      });
    });
  }
}
