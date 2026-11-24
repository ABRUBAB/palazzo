import { DICTIONARY } from '../data/i18n';
import { LEGAL_DOCUMENTS, type LegalDocKey } from '../data/legal';
import { getState, reopenGdprBanner, saveGdpr } from '../state/store';

let activeLegalKey: LegalDocKey | null = null;
let draftAnalytics = false;
let draftMarketing = false;

export function initOverlays(): void {
  // GDPR Banner actions
  document.getElementById('gdpr-necessary-btn')?.addEventListener('click', () => {
    saveGdpr({ analytics: false, marketing: false });
  });
  document.getElementById('gdpr-accept-btn')?.addEventListener('click', () => {
    saveGdpr({ analytics: true, marketing: true });
  });
  document.getElementById('gdpr-settings-btn')?.addEventListener('click', openGdprModal);

  // GDPR Settings Modal
  const gdprModal = document.getElementById('gdpr-modal');
  document.getElementById('gdpr-modal-close')?.addEventListener('click', closeGdprModal);
  gdprModal?.addEventListener('click', (e) => {
    if (e.target === gdprModal) closeGdprModal();
  });

  document.getElementById('gdpr-toggle-analytics')?.addEventListener('click', () => {
    draftAnalytics = !draftAnalytics;
    updateGdprSwitchUI();
  });
  document.getElementById('gdpr-toggle-marketing')?.addEventListener('click', () => {
    draftMarketing = !draftMarketing;
    updateGdprSwitchUI();
  });
  document.getElementById('gdpr-save-btn')?.addEventListener('click', () => {
    saveGdpr({ analytics: draftAnalytics, marketing: draftMarketing });
    closeGdprModal();
  });

  // Legal Modals (Impressum, Privacy, Terms)
  const legalModal = document.getElementById('legal-modal');
  document.getElementById('legal-modal-close')?.addEventListener('click', closeLegalModal);
  legalModal?.addEventListener('click', (e) => {
    if (e.target === legalModal) closeLegalModal();
  });

  document.querySelectorAll<HTMLButtonElement>('[data-legal-open]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const k = btn.dataset.legalOpen as LegalDocKey | undefined;
      if (k) openLegalModal(k);
    });
  });

  document.getElementById('footer-cookie-btn')?.addEventListener('click', reopenGdprBanner);

  // Private Concierge Contact Modal
  const contactModal = document.getElementById('contact-modal');
  document.getElementById('contact-modal-close')?.addEventListener('click', closeContactModal);
  contactModal?.addEventListener('click', (e) => {
    if (e.target === contactModal) closeContactModal();
  });

  document.getElementById('contact-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const nameIn = form.querySelector<HTMLInputElement>('#contact-name');
    const emailIn = form.querySelector<HTMLInputElement>('#contact-email');
    const msgIn = form.querySelector<HTMLTextAreaElement>('#contact-message');
    const errEl = document.getElementById('contact-error');

    const name = nameIn?.value.trim() ?? '';
    const email = emailIn?.value.trim() ?? '';
    const msg = msgIn?.value.trim() ?? '';

    if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || msg.length < 4) {
      if (errEl) {
        errEl.hidden = false;
        errEl.textContent = DICTIONARY[getState().lang].drawer.errEmail;
      }
      return;
    }

    if (errEl) errEl.hidden = true;
    const sentState = document.getElementById('contact-sent-state');
    form.hidden = true;
    if (sentState) sentState.hidden = false;
  });

  document.getElementById('contact-reset-btn')?.addEventListener('click', () => {
    const form = document.getElementById('contact-form') as HTMLFormElement | null;
    const sentState = document.getElementById('contact-sent-state');
    form?.reset();
    if (form) form.hidden = false;
    if (sentState) sentState.hidden = true;
    closeContactModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeGdprModal();
      closeLegalModal();
      closeContactModal();
    }
  });

  renderOverlays();
}

export function openLegalModal(key: LegalDocKey): void {
  activeLegalKey = key;
  renderLegalContent();
  const modal = document.getElementById('legal-modal');
  modal?.classList.add('is-open');
  modal?.setAttribute('aria-hidden', 'false');
}

export function closeLegalModal(): void {
  activeLegalKey = null;
  const modal = document.getElementById('legal-modal');
  modal?.classList.remove('is-open');
  modal?.setAttribute('aria-hidden', 'true');
}

export function openContactModal(): void {
  const modal = document.getElementById('contact-modal');
  modal?.classList.add('is-open');
  modal?.setAttribute('aria-hidden', 'false');
}

export function closeContactModal(): void {
  const modal = document.getElementById('contact-modal');
  modal?.classList.remove('is-open');
  modal?.setAttribute('aria-hidden', 'true');
}

function openGdprModal(): void {
  const state = getState();
  draftAnalytics = state.gdpr.analytics;
  draftMarketing = state.gdpr.marketing;
  updateGdprSwitchUI();
  const modal = document.getElementById('gdpr-modal');
  modal?.classList.add('is-open');
  modal?.setAttribute('aria-hidden', 'false');
}

function closeGdprModal(): void {
  const modal = document.getElementById('gdpr-modal');
  modal?.classList.remove('is-open');
  modal?.setAttribute('aria-hidden', 'true');
}

function updateGdprSwitchUI(): void {
  document
    .getElementById('gdpr-toggle-analytics')
    ?.setAttribute('aria-checked', String(draftAnalytics));
  document
    .getElementById('gdpr-toggle-marketing')
    ?.setAttribute('aria-checked', String(draftMarketing));
}

function renderLegalContent(): void {
  if (!activeLegalKey) return;
  const lang = getState().lang;
  const doc = LEGAL_DOCUMENTS[activeLegalKey][lang];
  const host = document.getElementById('legal-modal-content');
  if (!host) return;

  host.innerHTML = `
    <h3 style="margin:0;font-family:var(--font-display);font-size:1.6rem;font-weight:400">${doc.title}</h3>
    <p style="margin:0.45rem 0 0;font-size:0.85rem;color:var(--umber)">${doc.subtitle}</p>
    <div style="margin-top:1.35rem;display:flex;flex-direction:column;gap:1.1rem">
      ${doc.sections
        .map(
          (sec) => `
        <section style="padding-top:0.85rem;border-top:1px solid var(--divider)">
          <h4 style="margin:0 0 0.35rem;font-size:0.9rem;color:var(--cypress)">${sec.heading}</h4>
          ${sec.body.map((p) => `<p style="margin:0.25rem 0 0;font-size:0.86rem;color:var(--ink-soft)">${p}</p>`).join('')}
        </section>
      `
        )
        .join('')}
    </div>
  `;
}

export function renderOverlays(): void {
  const state = getState();
  const dict = DICTIONARY[state.lang];
  const ov = dict.overlays;
  const ft = dict.footer;

  const banner = document.getElementById('gdpr-banner');
  const showBanner = !state.gdpr.decided;
  banner?.classList.toggle('is-visible', showBanner);
  banner?.setAttribute('aria-hidden', String(!showBanner));
  document.body.classList.toggle('gdpr-visible', showBanner);

  const textMap: Record<string, string> = {
    'qa-call-label': ov.callLabel,
    'qa-whatsapp-label': ov.whatsappLabel,
    'qa-maps-label': ov.mapsLabel,
    'gdpr-title': ov.gdprTitle,
    'gdpr-body': ov.gdprBody,
    'gdpr-necessary-btn': ov.gdprNecessary,
    'gdpr-settings-btn': ov.gdprSettings,
    'gdpr-accept-btn': ov.gdprAcceptAll,
    'gdpr-modal-title': ov.gdprModalTitle,
    'gdpr-save-btn': ov.gdprSave,
    'gdpr-essential-title': ov.gdprEssentialTitle,
    'gdpr-essential-desc': ov.gdprEssentialDesc,
    'gdpr-analytics-title': ov.gdprAnalyticsTitle,
    'gdpr-analytics-desc': ov.gdprAnalyticsDesc,
    'gdpr-marketing-title': ov.gdprMarketingTitle,
    'gdpr-marketing-desc': ov.gdprMarketingDesc,
    'contact-title': ov.contactTitle,
    'contact-subtitle': ov.contactSubtitle,
    'contact-send-btn': ov.contactSend,
    'contact-sent-title': ov.contactSentTitle,
    'contact-sent-body': ov.contactSentBody,
    'footer-tagline': ft.tagline,
    'footer-col-explore': ft.colExplore,
    'footer-col-palazzo': ft.colPalazzo,
    'footer-col-legal': ft.colLegal,
    'footer-impressum': ft.impressum,
    'footer-privacy': ft.privacy,
    'footer-terms': ft.terms,
    'footer-cookie-btn': ft.cookiePrefs,
    'footer-copyright': ft.copyright,
    'footer-craft-credit': ft.craftCredit,
  };

  for (const [id, val] of Object.entries(textMap)) {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  }

  if (activeLegalKey) renderLegalContent();
}
