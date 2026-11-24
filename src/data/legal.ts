import type { Locale } from './rooms';

export type LegalDocKey = 'impressum' | 'privacy' | 'terms';

export interface LegalDocument {
  title: string;
  subtitle: string;
  sections: { heading: string; body: string[] }[];
}

export const LEGAL_DOCUMENTS: Record<LegalDocKey, Record<Locale, LegalDocument>> = {
  impressum: {
    en: {
      title: 'Impressum & Legal Imprint',
      subtitle: 'Statutory disclosures pursuant to EU Directive 2000/31/EC, § 5 DDG (Germany/Austria/Switzerland alignment), and Italian D.Lgs. 70/2003.',
      sections: [
        {
          heading: 'Operating Entity & Registered Seat',
          body: [
            'Palazzo Verena Ospitalità Storica S.r.l.',
            'Via della Spada 14, 50123 Firenze (FI), Tuscany, Italy',
            'Managing Director (Amministratore Delegato): Lorenzo Bellini',
          ],
        },
        {
          heading: 'Direct Contact',
          body: [
            'Telephone (24h Concierge Desk): +39 055 289 4120',
            'Electronic Mail: concierge@palazzoverena.it',
            'Certified PEC: palazzoverena@pec.firenze.it',
          ],
        },
        {
          heading: 'Commercial Register & Fiscal Identification',
          body: [
            'VAT / Partita IVA: IT07482910482',
            'Chamber of Commerce Register (CCIAA Firenze): REA FI-692410',
            'Regional Accommodation Code (CIR / CIN): IT048017A1PV98241',
          ],
        },
        {
          heading: 'Digital Flagship Architecture & Dispute Resolution',
          body: [
            'Web Engineering & Hospitality Showcase Architecture: Abdulla Rubab (European Boutique Web Demos Collection).',
            'European Commission Online Dispute Resolution Platform: https://ec.europa.eu/consumers/odr',
          ],
        },
      ],
    },
    it: {
      title: 'Impressum & Note Societarie',
      subtitle: 'Informazioni legali obbligatorie ai sensi della Direttiva UE 2000/31/CE e del D.Lgs. 70/2003.',
      sections: [
        {
          heading: 'Società Gestore & Sede Legale',
          body: [
            'Palazzo Verena Ospitalità Storica S.r.l.',
            'Via della Spada 14, 50123 Firenze (FI), Italia',
            'Amministratore Delegato: Lorenzo Bellini',
          ],
        },
        {
          heading: 'Contatti Diretti',
          body: [
            'Telefono Concierge 24/7: +39 055 289 4120',
            'Email: concierge@palazzoverena.it · PEC: palazzoverena@pec.firenze.it',
          ],
        },
        {
          heading: 'Registro Imprese & Identificativi Fiscali',
          body: [
            'Partita IVA / C.F.: IT07482910482 · REA Firenze: FI-692410',
            'Codice Identificativo Nazionale (CIN): IT048017A1PV98241',
          ],
        },
        {
          heading: 'Architettura Digitale',
          body: [
            'Piattaforma web e design interattivo a cura di Abdulla Rubab.',
            'Piattaforma ODR Commissione Europea: https://ec.europa.eu/consumers/odr',
          ],
        },
      ],
    },
    fr: {
      title: 'Impressum & Mentions Légales',
      subtitle: 'Mentions obligatoires conformément à la Directive européenne 2000/31/CE et au droit italien.',
      sections: [
        {
          heading: 'Exploitant & Siège Social',
          body: [
            'Palazzo Verena Ospitalità Storica S.r.l.',
            'Via della Spada 14, 50123 Firenze (FI), Italie',
            'Directeur Général : Lorenzo Bellini',
          ],
        },
        {
          heading: 'Coordonnées & Immatriculation',
          body: [
            'Téléphone : +39 055 289 4120 · Email : concierge@palazzoverena.it',
            'TVA intracommunautaire : IT07482910482 · REA : FI-692410 · CIN : IT048017A1PV98241',
          ],
        },
        {
          heading: 'Architecture Numérique',
          body: [
            'Conception et ingénierie digitale : Abdulla Rubab.',
            'Règlement européen des litiges en ligne : https://ec.europa.eu/consumers/odr',
          ],
        },
      ],
    },
    de: {
      title: 'Impressum & Anbieterkennzeichnung',
      subtitle: 'Pflichtangaben gemäß EU-Richtlinie 2000/31/EG, § 5 DDG (DACH-Standard) und italienischem Recht (D.Lgs. 70/2003).',
      sections: [
        {
          heading: 'Betreibergesellschaft & Sitz',
          body: [
            'Palazzo Verena Ospitalità Storica S.r.l.',
            'Via della Spada 14, 50123 Firenze (FI), Toskana, Italien',
            'Vertretungsberechtigter Geschäftsführer: Lorenzo Bellini',
          ],
        },
        {
          heading: 'Kontakt',
          body: [
            'Telefon (24h Concierge): +39 055 289 4120',
            'E-Mail: concierge@palazzoverena.it · PEC: palazzoverena@pec.firenze.it',
          ],
        },
        {
          heading: 'Registereintrag & Umsatzsteuer',
          body: [
            'USt-IdNr. (Partita IVA): IT07482910482 · Handelsregister Florenz: REA FI-692410',
            'Nationaler Beherbergungscode (CIN): IT048017A1PV98241',
          ],
        },
        {
          heading: 'Digitale Flaggschiff-Architektur & OS-Plattform',
          body: [
            'Web-Architektur & Showcase-Umsetzung: Abdulla Rubab.',
            'Online-Streitbeilegung der EU-Kommission: https://ec.europa.eu/consumers/odr',
          ],
        },
      ],
    },
  },

  privacy: {
    en: {
      title: 'Privacy Policy (GDPR)',
      subtitle: 'Data processing notice in strict accordance with EU Regulation 2016/679 (GDPR).',
      sections: [
        {
          heading: '1. Data Controller',
          body: [
            'Palazzo Verena Ospitalità Storica S.r.l., Via della Spada 14, 50123 Firenze, is the Controller responsible for personal details submitted via stay inquiries or concierge messages.',
          ],
        },
        {
          heading: '2. Purpose & Legal Basis (Art. 6 GDPR)',
          body: [
            'Reservation details (name, contact phone/email, arrival preferences) are processed solely to fulfill pre-contractual and hospitality obligations (Art. 6(1)(b) GDPR) and statutory guest registration under Italian Public Security Law (Art. 6(1)(c) GDPR).',
          ],
        },
        {
          heading: '3. Local Browser Storage & Consent',
          body: [
            'Your selected room, stay dates, preferred language, and cookie preferences are stored locally in your browser. Optional analytics or seasonal invitations remain inactive unless explicitly enabled.',
          ],
        },
        {
          heading: '4. Your Rights',
          body: [
            'Under Articles 15–22 GDPR, you retain full rights of access, rectification, erasure, portability, and withdrawal of consent by writing to privacy@palazzoverena.it.',
          ],
        },
      ],
    },
    it: {
      title: 'Informativa Privacy (GDPR)',
      subtitle: 'Trattamento dei dati personali ai sensi del Regolamento Europeo UE 2016/679.',
      sections: [
        {
          heading: '1. Titolare del Trattamento',
          body: [
            'Palazzo Verena Ospitalità Storica S.r.l., Via della Spada 14, 50123 Firenze (privacy@palazzoverena.it).',
          ],
        },
        {
          heading: '2. Finalità e Base Giuridica',
          body: [
            'I dati inseriti nel modulo di prenotazione sono utilizzati esclusivamente per gestire il soggiorno e gli obblighi di legge (Art. 6(1)(b)-(c) GDPR).',
          ],
        },
        {
          heading: '3. Diritti dell’Interessato',
          body: [
            'È sempre possibile esercitare i diritti di accesso, rettifica, cancellazione e portabilità dei dati (Artt. 15–22 GDPR).',
          ],
        },
      ],
    },
    fr: {
      title: 'Politique de Confidentialité (RGPD)',
      subtitle: 'Notice conforme au Règlement Général sur la Protection des Données (UE 2016/679).',
      sections: [
        {
          heading: '1. Responsable du Traitement',
          body: [
            'Palazzo Verena Ospitalità Storica S.r.l., Via della Spada 14, 50123 Firenze (privacy@palazzoverena.it).',
          ],
        },
        {
          heading: '2. Finalités & Conservation',
          body: [
            'Vos coordonnées servent uniquement à préparer votre accueil, votre séjour et les obligations légales d’hébergement en Italie (Art. 6 RGPD).',
          ],
        },
        {
          heading: '3. Droits des Hôtes',
          body: [
            'Conformément aux articles 15 à 22 du RGPD, vous disposez d’un droit d’accès, de rectification et d’effacement à tout moment.',
          ],
        },
      ],
    },
    de: {
      title: 'Datenschutzerklärung (DSGVO)',
      subtitle: 'Informationen zur Datenverarbeitung gemäß Datenschutz-Grundverordnung (EU 2016/679).',
      sections: [
        {
          heading: '1. Verantwortliche Stelle',
          body: [
            'Palazzo Verena Ospitalità Storica S.r.l., Via della Spada 14, 50123 Firenze (privacy@palazzoverena.it).',
          ],
        },
        {
          heading: '2. Zweck & Rechtsgrundlage (Art. 6 DSGVO)',
          body: [
            'Reservierungsdaten werden ausschließlich zur Vertragsanbahnung und Erfüllung behördlicher Meldepflichten in Italien verarbeitet.',
          ],
        },
        {
          heading: '3. Betroffenenrechte',
          body: [
            'Sie haben jederzeit das Recht auf Auskunft, Berichtigung, Löschung und Widerruf Ihrer Einwilligung gemäß Art. 15–22 DSGVO.',
          ],
        },
      ],
    },
  },

  terms: {
    en: {
      title: 'Terms of Stay & Direct Booking',
      subtitle: 'Transparent hospitality terms governing direct suite reservations at Palazzo Verena, Florence.',
      sections: [
        {
          heading: '1. Check-In, Check-Out & Quiet Hours',
          body: [
            'Suites are prepared from 15:00 onwards; standard departure is 11:00 (extendable to 14:00 via the Late Checkout option). Digital keyless access ensures seamless late-evening arrivals.',
          ],
        },
        {
          heading: '2. Flexible 72-Hour Cancellation',
          body: [
            'Direct reservations may be modified or cancelled without penalty up to 72 hours prior to 15:00 CET on the scheduled arrival date. Within 72 hours, the first night applies.',
          ],
        },
        {
          heading: '3. Florentine Tourist Tax & VAT',
          body: [
            'Nightly suite estimates include 10% Italian Hospitality VAT (IVA). The City of Florence Imposta di Soggiorno (€5.50 per guest per night, up to 7 consecutive nights) is clearly itemized in your folio.',
          ],
        },
      ],
    },
    it: {
      title: 'Condizioni Generali di Soggiorno',
      subtitle: 'Condizioni trasparenti per le prenotazioni dirette presso Palazzo Verena Firenze.',
      sections: [
        {
          heading: '1. Check-in, Check-out e Accesso',
          body: [
            'Le suite sono disponibili dalle 15:00; partenza entro le 11:00 (prolungabile alle 14:00 con Late Check-out). Accesso digitale garantito 24 ore su 24.',
          ],
        },
        {
          heading: '2. Cancellazione Flessibile 72 Ore',
          body: [
            'Le prenotazioni dirette possono essere modificate o annullate gratuitamente fino a 72 ore prima delle 15:00 del giorno di arrivo.',
          ],
        },
        {
          heading: '3. IVA e Imposta di Soggiorno',
          body: [
            'Le tariffe includono IVA al 10%. L’Imposta di Soggiorno del Comune di Firenze (€5,50 a persona per notte) è dettagliata separatamente nel preventivo.',
          ],
        },
      ],
    },
    fr: {
      title: 'Conditions Générales de Séjour',
      subtitle: 'Conditions applicables aux réservations directes au Palazzo Verena, Florence.',
      sections: [
        {
          heading: '1. Arrivée & Départ',
          body: [
            'Suites accessibles dès 15h00, départ jusqu’à 11h00 (ou 14h00 avec l’option Départ Tardif). Conciergerie digitale 24h/24.',
          ],
        },
        {
          heading: '2. Annulation Souple 72 Heures',
          body: [
            'Modification ou annulation sans frais jusqu’à 72 heures avant 15h00 le jour d’arrivée.',
          ],
        },
        {
          heading: '3. TVA & Taxe de Séjour',
          body: [
            'Les tarifs comprennent 10 % de TVA italienne. La taxe de séjour de Florence (5,50 € par adulte et par nuit) est affichée en toute transparence.',
          ],
        },
      ],
    },
    de: {
      title: 'Allgemeine Buchungsbedingungen',
      subtitle: 'Transparente Gastfreundschaftsbedingungen für Direktbuchungen im Palazzo Verena Florenz.',
      sections: [
        {
          heading: '1. Check-in & Check-out',
          body: [
            'Ihre Suite steht ab 15:00 Uhr bereit; Abreise bis 11:00 Uhr (mit spätem Check-out bis 14:00 Uhr). Kontaktloser 24/7-Zugang für späte Ankünfte.',
          ],
        },
        {
          heading: '2. Flexible 72-Stunden-Stornierung',
          body: [
            'Direktbuchungen können bis 72 Stunden vor 15:00 Uhr am Anreisetag kostenfrei geändert oder storniert werden.',
          ],
        },
        {
          heading: '3. Mehrwertsteuer & Ortstaxe Florenz',
          body: [
            'Alle Suitenpreise enthalten 10 % italienische MwSt. Die Florentiner Ortstaxe (€5,50 pro Gast und Nacht) wird transparent ausgewiesen.',
          ],
        },
      ],
    },
  },
};
