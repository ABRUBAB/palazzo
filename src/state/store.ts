import { ADDONS, ROOMS, type AmenityFilter, type FloorId, type Locale, type RoomData } from '../data/rooms';

export interface AddonSelection {
  breakfast: boolean;
  chauffeur: boolean;
  wine: boolean;
  lateCheckout: boolean;
}

export interface GdprPreferences {
  decided: boolean;
  essential: true;
  analytics: boolean;
  marketing: boolean;
}

export interface AppState {
  lang: Locale;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  activeFloorId: FloorId;
  selectedRoomId: string;
  activeFilter: AmenityFilter;
  addons: AddonSelection;
  gdpr: GdprPreferences;
}

export interface StayPricing {
  nights: number;
  nightlyRate: number;
  roomSubtotal: number;
  discountRate: number;
  discountAmount: number;
  discountedRoomTotal: number;
  addonsTotal: number;
  cityTaxTotal: number;
  vatIncluded: number;
  grandTotal: number;
  addonBreakdown: { id: keyof AddonSelection; amount: number }[];
}

const GDPR_STORAGE_KEY = 'palazzo_verena_gdpr_v1';
const LANG_STORAGE_KEY = 'palazzo_verena_lang_v1';

export function startOfDay(d: Date): Date {
  const copy = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  copy.setHours(0, 0, 0, 0);
  return copy;
}

export function addDays(d: Date, days: number): Date {
  const copy = startOfDay(d);
  copy.setDate(copy.getDate() + days);
  return copy;
}

export function diffNights(checkIn: Date, checkOut: Date): number {
  const ms = startOfDay(checkOut).getTime() - startOfDay(checkIn).getTime();
  return Math.max(1, Math.round(ms / 86_400_000));
}

function loadInitialGdpr(): GdprPreferences {
  try {
    const raw = localStorage.getItem(GDPR_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<GdprPreferences>;
      return {
        decided: Boolean(parsed.decided),
        essential: true,
        analytics: Boolean(parsed.analytics),
        marketing: Boolean(parsed.marketing),
      };
    }
  } catch {
    // Storage unavailable
  }
  return { decided: false, essential: true, analytics: false, marketing: false };
}

function loadInitialLang(): Locale {
  try {
    const raw = localStorage.getItem(LANG_STORAGE_KEY);
    if (raw === 'en' || raw === 'it' || raw === 'fr' || raw === 'de') {
      return raw;
    }
  } catch {
    // Ignore
  }
  return 'en';
}

const TODAY = startOfDay(new Date());

const initialState: AppState = {
  lang: loadInitialLang(),
  checkIn: addDays(TODAY, 7),
  checkOut: addDays(TODAY, 10),
  guests: 2,
  activeFloorId: '03',
  selectedRoomId: '301',
  activeFilter: 'all',
  addons: {
    breakfast: true,
    chauffeur: false,
    wine: false,
    lateCheckout: false,
  },
  gdpr: loadInitialGdpr(),
};

type Listener = (state: AppState) => void;
const listeners = new Set<Listener>();
let currentState: AppState = initialState;

export function getState(): AppState {
  return currentState;
}

export function subscribe(fn: Listener): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function emit(): void {
  for (const fn of listeners) {
    fn(currentState);
  }
}

export function setLang(lang: Locale): void {
  if (currentState.lang === lang) return;
  currentState = { ...currentState, lang };
  document.documentElement.lang = lang;
  try {
    localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch {
    // Ignore
  }
  emit();
}

export function setDates(checkIn: Date, checkOut: Date): void {
  const cleanIn = startOfDay(checkIn) < TODAY ? TODAY : startOfDay(checkIn);
  const cleanOut = startOfDay(checkOut) <= cleanIn ? addDays(cleanIn, 1) : startOfDay(checkOut);
  let nextSelectedId = currentState.selectedRoomId;
  let nextFloorId = currentState.activeFloorId;

  const activeRoom = ROOMS.find((r) => r.id === nextSelectedId);
  if (activeRoom && !isRoomAvailable(activeRoom, cleanIn, cleanOut)) {
    const fallback =
      ROOMS.find((r) => r.floorId === nextFloorId && isRoomAvailable(r, cleanIn, cleanOut)) ??
      ROOMS.find((r) => isRoomAvailable(r, cleanIn, cleanOut));
    if (fallback) {
      nextSelectedId = fallback.id;
      nextFloorId = fallback.floorId;
    }
  }

  currentState = {
    ...currentState,
    checkIn: cleanIn,
    checkOut: cleanOut,
    selectedRoomId: nextSelectedId,
    activeFloorId: nextFloorId,
  };
  emit();
}

export function setGuests(guests: number): void {
  const clamped = Math.max(1, Math.min(4, guests));
  if (currentState.guests === clamped) return;
  currentState = { ...currentState, guests: clamped };
  emit();
}

export function setActiveFloor(floorId: FloorId): void {
  const currentRoom = ROOMS.find((r) => r.id === currentState.selectedRoomId);
  let nextRoomId = currentState.selectedRoomId;

  if (!currentRoom || currentRoom.floorId !== floorId) {
    const candidate =
      ROOMS.find(
        (r) =>
          r.floorId === floorId &&
          isRoomAvailable(r, currentState.checkIn, currentState.checkOut) &&
          roomMatchesFilter(r, currentState.activeFilter)
      ) ??
      ROOMS.find(
        (r) => r.floorId === floorId && isRoomAvailable(r, currentState.checkIn, currentState.checkOut)
      ) ??
      ROOMS.find((r) => r.floorId === floorId);

    if (candidate) {
      nextRoomId = candidate.id;
    }
  }

  currentState = {
    ...currentState,
    activeFloorId: floorId,
    selectedRoomId: nextRoomId,
  };
  emit();
}

export function selectRoom(roomId: string): void {
  const room = ROOMS.find((r) => r.id === roomId);
  if (!room) return;
  if (!isRoomAvailable(room, currentState.checkIn, currentState.checkOut)) return;

  currentState = {
    ...currentState,
    activeFloorId: room.floorId,
    selectedRoomId: room.id,
  };
  emit();
}

export function setFilter(filter: AmenityFilter): void {
  if (currentState.activeFilter === filter) return;
  currentState = { ...currentState, activeFilter: filter };
  emit();
}

export function toggleAddon(id: keyof AddonSelection): void {
  currentState = {
    ...currentState,
    addons: {
      ...currentState.addons,
      [id]: !currentState.addons[id],
    },
  };
  emit();
}

export function saveGdpr(prefs: { analytics: boolean; marketing: boolean }): void {
  const next: GdprPreferences = {
    decided: true,
    essential: true,
    analytics: prefs.analytics,
    marketing: prefs.marketing,
  };
  currentState = { ...currentState, gdpr: next };
  try {
    localStorage.setItem(GDPR_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Ignore
  }
  emit();
}

export function reopenGdprBanner(): void {
  currentState = {
    ...currentState,
    gdpr: { ...currentState.gdpr, decided: false },
  };
  emit();
}

export function isRoomAvailable(room: RoomData, checkIn: Date, checkOut: Date): boolean {
  const reqStart = startOfDay(checkIn).getTime();
  const reqEnd = startOfDay(checkOut).getTime();
  for (const [startOff, endOff] of room.bookedOffsets) {
    const bStart = addDays(TODAY, startOff).getTime();
    const bEnd = addDays(TODAY, endOff).getTime();
    if (reqStart < bEnd && reqEnd > bStart) {
      return false;
    }
  }
  return true;
}

export function getNextAvailableRange(room: RoomData, desiredNights: number): { checkIn: Date; checkOut: Date } {
  const nights = Math.max(1, desiredNights);
  let probe = addDays(TODAY, 1);
  for (let i = 0; i < 60; i++) {
    const candidateIn = addDays(probe, i);
    const candidateOut = addDays(candidateIn, nights);
    if (isRoomAvailable(room, candidateIn, candidateOut)) {
      return { checkIn: candidateIn, checkOut: candidateOut };
    }
  }
  return { checkIn: addDays(TODAY, 15), checkOut: addDays(TODAY, 15 + nights) };
}

export function roomMatchesFilter(room: RoomData, filter: AmenityFilter): boolean {
  if (filter === 'all') return true;
  return room.filters.includes(filter);
}

export function getSelectedRoom(state: AppState = currentState): RoomData {
  return ROOMS.find((r) => r.id === state.selectedRoomId) ?? ROOMS[0]!;
}

export function calculateStayPricing(state: AppState = currentState): StayPricing {
  const room = getSelectedRoom(state);
  const nights = diffNights(state.checkIn, state.checkOut);
  const roomSubtotal = room.nightlyRateEur * nights;

  let discountRate = 0;
  if (nights >= 5) discountRate = 0.15;
  else if (nights >= 3) discountRate = 0.1;

  const discountAmount = Math.round(roomSubtotal * discountRate);
  const discountedRoomTotal = roomSubtotal - discountAmount;

  const addonBreakdown: { id: keyof AddonSelection; amount: number }[] = [];
  let addonsTotal = 0;
  for (const item of ADDONS) {
    if (!state.addons[item.id]) continue;
    let amount = item.priceEur;
    if (item.pricingMode === 'per-night') amount = item.priceEur * nights;
    else if (item.pricingMode === 'per-guest') amount = item.priceEur * state.guests;
    addonsTotal += amount;
    addonBreakdown.push({ id: item.id, amount });
  }

  const cityTaxNights = Math.min(nights, 7);
  const cityTaxTotal = Number((5.5 * state.guests * cityTaxNights).toFixed(2));
  const taxableSum = discountedRoomTotal + addonsTotal;
  // Transparent 10% Italian IVA breakdown already included in taxableSum
  const vatIncluded = Number((taxableSum - taxableSum / 1.1).toFixed(2));
  const grandTotal = Number((taxableSum + cityTaxTotal).toFixed(2));

  return {
    nights,
    nightlyRate: room.nightlyRateEur,
    roomSubtotal,
    discountRate,
    discountAmount,
    discountedRoomTotal,
    addonsTotal,
    cityTaxTotal,
    vatIncluded,
    grandTotal,
    addonBreakdown,
  };
}
