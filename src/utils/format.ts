import type { Locale, LocalizedText } from '../data/rooms';

const LOCALE_MAP: Record<Locale, string> = {
  en: 'en-GB',
  it: 'it-IT',
  fr: 'fr-FR',
  de: 'de-DE',
};

export function tText(text: LocalizedText, lang: Locale): string {
  return text[lang];
}

export function formatEur(amount: number, lang: Locale, decimals = 0): string {
  return new Intl.NumberFormat(LOCALE_MAP[lang], {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);
}

export function formatShortDate(d: Date, lang: Locale): string {
  return new Intl.DateTimeFormat(LOCALE_MAP[lang], {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(d);
}

export function formatCompactDate(d: Date, lang: Locale): string {
  return new Intl.DateTimeFormat(LOCALE_MAP[lang], {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  }).format(d);
}

export function generateBookingRef(): string {
  const digits = Math.floor(1000 + Math.random() * 9000);
  return `PV-FLR-2026-${digits}`;
}

export function downloadIcsEvent(opts: {
  refCode: string;
  suiteName: string;
  floorName: string;
  checkIn: Date;
  checkOut: Date;
  guestName: string;
}): void {
  const toYmd = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}${m}${day}`;
  };

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Palazzo Verena Firenze//Direct Booking//EN',
    'BEGIN:VEVENT',
    `UID:${opts.refCode}@palazzoverena.it`,
    `DTSTART;VALUE=DATE:${toYmd(opts.checkIn)}`,
    `DTEND;VALUE=DATE:${toYmd(opts.checkOut)}`,
    `SUMMARY:Palazzo Verena Firenze — ${opts.suiteName} (${opts.refCode})`,
    `DESCRIPTION:Guest: ${opts.guestName}\\nFloor: ${opts.floorName}\\nCheck-in from 15:00 · Concierge +39 055 289 4120`,
    'LOCATION:Via della Spada 14\\, 50123 Firenze FI\\, Italy',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([lines], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Palazzo-Verena-${opts.refCode}.ics`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function escapeHtml(str: string): string {
  return str
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}
