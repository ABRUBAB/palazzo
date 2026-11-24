import type { Locale } from './rooms';

export interface TranslationSchema {
  nav: {
    palazzo: string;
    explorer: string;
    experiences: string;
    gallery: string;
    location: string;
    bookCta: string;
    menuLabel: string;
  };
  hero: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    checkIn: string;
    checkOut: string;
    guests: string;
    guestSingular: string;
    guestPlural: string;
    exploreBtn: string;
    statSuites: string;
    statSuitesLabel: string;
    statHistory: string;
    statHistoryLabel: string;
    statWalk: string;
    statWalkLabel: string;
    caption: string;
    credentialPill: string;
    scrollCue: string;
  };
  datePicker: {
    title: string;
    presets: { label: string; nights: number }[];
    apply: string;
    reset: string;
    selectedNights: string;
    monthNames: string[];
    weekdays: string[];
  };
  explorer: {
    eyebrow: string;
    title: string;
    subtitle: string;
    filtersLabel: string;
    filters: {
      all: string;
      terrace: string;
      tub: string;
      garden: string;
      king: string;
    };
    legendAvailable: string;
    legendSelected: string;
    legendLast: string;
    legendReserved: string;
    elevTitle: string;
    floorPrefix: string;
    matchingSuffix: string;
    streetLabel: string;
    courtyardLabel: string;
    reservedTooltipPrefix: string;
    reservedJumpBtn: string;
    capacityLabel: string;
    areaLabel: string;
    perNight: string;
    compareLightBtn: string;
    reserveExactBtn: string;
    highDemandBadge: string;
    lastRoomBadge: string;
    terraceBadge: string;
    tubBadge: string;
    gardenBadge: string;
    guestCapacityWarning: string;
    floorSuitesHeading: string;
    stayPreviewLabel: string;
  };
  comparer: {
    eyebrow: string;
    title: string;
    subtitle: string;
    dayLabel: string;
    daySub: string;
    eveningLabel: string;
    eveningSub: string;
    presetMorning: string;
    presetSplit: string;
    presetEvening: string;
    dragHint: string;
  };
  calculator: {
    eyebrow: string;
    title: string;
    subtitle: string;
    suiteLabel: string;
    changeSuiteBtn: string;
    datesLabel: string;
    guestsLabel: string;
    addonsHeading: string;
    folioHeading: string;
    roomRateLine: string;
    discount10Label: string;
    discount15Label: string;
    discountNudge: string;
    addonsSubtotalLabel: string;
    cityTaxLabel: string;
    vatNote: string;
    totalLabel: string;
    proceedBtn: string;
    bestRateNote: string;
  };
  experiences: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  gallery: {
    eyebrow: string;
    title: string;
    subtitle: string;
    closeLightbox: string;
  };
  location: {
    eyebrow: string;
    title: string;
    subtitle: string;
    addressLabel: string;
    addressValue: string;
    hoursLabel: string;
    hoursValue: string;
    mapsBtn: string;
    conciergeBtn: string;
    walkMinutes: string;
  };
  drawer: {
    title: string;
    steps: [string, string, string];
    selectedSuite: string;
    floorLabel: string;
    modifyDatesBtn: string;
    continueStep2: string;
    backStep1: string;
    confirmBtn: string;
    fullNameLabel: string;
    emailLabel: string;
    phoneLabel: string;
    arrivalLabel: string;
    requestsLabel: string;
    requestsPlaceholder: string;
    termsAgree: string;
    confirmedEyebrow: string;
    confirmedTitle: string;
    confirmedSubtitle: string;
    refLabel: string;
    printBtn: string;
    calendarBtn: string;
    newSearchBtn: string;
    errName: string;
    errEmail: string;
    errPhone: string;
    errTerms: string;
  };
  overlays: {
    callLabel: string;
    whatsappLabel: string;
    mapsLabel: string;
    gdprTitle: string;
    gdprBody: string;
    gdprNecessary: string;
    gdprSettings: string;
    gdprAcceptAll: string;
    gdprModalTitle: string;
    gdprSave: string;
    gdprEssentialTitle: string;
    gdprEssentialDesc: string;
    gdprAnalyticsTitle: string;
    gdprAnalyticsDesc: string;
    gdprMarketingTitle: string;
    gdprMarketingDesc: string;
    contactTitle: string;
    contactSubtitle: string;
    contactSend: string;
    contactSentTitle: string;
    contactSentBody: string;
  };
  footer: {
    tagline: string;
    colExplore: string;
    colPalazzo: string;
    colLegal: string;
    impressum: string;
    privacy: string;
    terms: string;
    cookiePrefs: string;
    copyright: string;
    craftCredit: string;
  };
}

export const DICTIONARY: Record<Locale, TranslationSchema> = {
  en: {
    nav: {
      palazzo: 'The Palazzo',
      explorer: 'Floors & Suites',
      experiences: 'Experiences',
      gallery: 'Gallery',
      location: 'Location',
      bookCta: 'Book a Stay',
      menuLabel: 'Open navigation menu',
    },
    hero: {
      eyebrow: 'Via della Spada 14 · Florence, Italy',
      titleLine1: 'Palazzo Verena',
      titleLine2: 'A Florentine Sanctuary of Stone & Light.',
      subtitle:
        'Fourteen individually vaulted suites inside a restored 1548 Medici-era palazzo, three minutes from Il Duomo.',
      checkIn: 'Check-In',
      checkOut: 'Check-Out',
      guests: 'Guests',
      guestSingular: 'Guest',
      guestPlural: 'Guests',
      exploreBtn: 'Find Your Suite',
      statSuites: '14 Suites',
      statSuitesLabel: 'Across 4 Historic Palazzo Floors',
      statHistory: 'Est. 1548',
      statHistoryLabel: 'Restored Renaissance Limestone & Timber',
      statWalk: '3–5 Min',
      statWalkLabel: 'On Foot to Il Duomo & Ponte Vecchio',
      caption: 'Cortile Loggia · Via della Spada',
      credentialPill: '★ 4.96 Direct Guests · 14 Suites · Est. 1548',
      scrollCue: 'Explore Suites',
    },
    datePicker: {
      title: 'Select Stay Dates',
      presets: [
        { label: '2 Nights', nights: 2 },
        { label: '3 Nights (-10%)', nights: 3 },
        { label: '5 Nights (-15%)', nights: 5 },
      ],
      apply: 'Apply Dates',
      reset: 'Reset',
      selectedNights: 'nights selected',
      monthNames: [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December',
      ],
      weekdays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    },
    explorer: {
      eyebrow: 'Interactive Floorplan',
      title: 'Choose Your Floor & Exact Suite',
      subtitle:
        'Move between all four stories, filter by terrace or soaking tub, and select your preferred suite on the blueprint.',
      filtersLabel: 'Filter suites by feature',
      filters: {
        all: 'All Suites',
        terrace: 'Private Terrace',
        tub: 'Soaking Tub',
        garden: 'Garden View',
        king: 'King Bed',
      },
      legendAvailable: 'Available',
      legendSelected: 'Selected',
      legendLast: 'Last Suite',
      legendReserved: 'Booked',
      elevTitle: 'Palazzo Elevation',
      floorPrefix: 'Floor',
      matchingSuffix: 'open',
      streetLabel: 'VIA DELLA SPADA · PIAZZA SIDE',
      courtyardLabel: 'PRIVATE CYPRESS CLOISTER',
      reservedTooltipPrefix: 'Booked for these dates · Free from:',
      reservedJumpBtn: 'View Open Dates',
      capacityLabel: 'Guests',
      areaLabel: 'Space',
      perNight: '/ night',
      compareLightBtn: 'Compare Day & Evening Light',
      reserveExactBtn: 'Reserve This Suite',
      highDemandBadge: 'Last Suite Left',
      lastRoomBadge: 'Last Suite',
      terraceBadge: 'Private Terrace',
      tubBadge: 'Soaking Tub',
      gardenBadge: 'Garden View',
      guestCapacityWarning: 'Up to {max} guests in this suite; see Floor 01 or 03 for {guests} guests.',
      floorSuitesHeading: 'Suites on This Floor',
      stayPreviewLabel: 'Stay Estimate',
    },
    comparer: {
      eyebrow: 'Daylight to Evening',
      title: 'Morning Sun to Candlelit Calm',
      subtitle:
        'Slide the brass handle to compare crisp 08:30 Florentine sunlight against our warm 21:00 evening turndown.',
      dayLabel: '08:30 Morning Sun',
      daySub: 'Sunlit travertine & Duomo view',
      eveningLabel: '21:00 Evening Calm',
      eveningSub: 'Warm brass sconces & candlelight',
      presetMorning: 'Morning 08:30',
      presetSplit: 'Split 50 / 50',
      presetEvening: 'Evening 21:00',
      dragHint: 'Drag brass handle or press arrow keys',
    },
    calculator: {
      eyebrow: 'Direct Stay Estimator',
      title: 'Plan Your Stay & Rate',
      subtitle:
        'Live EUR pricing synced with your selected suite, dates, multi-night privileges, and bespoke hotel services.',
      suiteLabel: 'Selected Suite',
      changeSuiteBtn: 'Change Suite',
      datesLabel: 'Stay Dates',
      guestsLabel: 'Guests',
      addonsHeading: 'Optional Hotel Privileges',
      folioHeading: 'Your Direct Stay Summary',
      roomRateLine: 'Suite Rate',
      discount10Label: 'Extended Stay (-10% · 3+ nights)',
      discount15Label: 'Long Sojourn (-15% · 5+ nights)',
      discountNudge: 'Add 1 night to unlock 10% Extended Stay savings.',
      addonsSubtotalLabel: 'Selected Privileges',
      cityTaxLabel: 'Florence City Tax (€5.50 / guest / night)',
      vatNote: 'Includes 10% Italian Hospitality VAT (IVA)',
      totalLabel: 'Estimated Total',
      proceedBtn: 'Continue to Reservation',
      bestRateNote: 'Best Direct Rate · Flexible 72h cancellation',
    },
    experiences: {
      eyebrow: 'Palazzo Life',
      title: 'Slow Mornings & Florentine Craft',
      subtitle:
        'Cloister courtyard breakfasts, rooftop dusk aperitivi, and quiet travertine baths steps from Santa Maria Novella.',
    },
    gallery: {
      eyebrow: 'Editorial Gallery',
      title: 'Travertine, Cypress & Twilight',
      subtitle: 'Click any frame to open full-screen view.',
      closeLightbox: 'Close gallery view',
    },
    location: {
      eyebrow: 'Centro Storico · Florence',
      title: 'Minutes From Every Masterpiece',
      subtitle:
        'Set on calm Via della Spada in Santa Maria Novella—steps from the Duomo, tucked away from crowded streets.',
      addressLabel: 'Address',
      addressValue: 'Via della Spada 14, 50123 Firenze FI, Italy',
      hoursLabel: 'Concierge & Check-In',
      hoursValue: '24/7 Keyless Access & Concierge · Check-in 15:00 · Check-out 11:00',
      mapsBtn: 'Open Google Maps',
      conciergeBtn: 'Message Concierge',
      walkMinutes: 'min walk',
    },
    drawer: {
      title: 'Direct Suite Reservation',
      steps: ['01 · Stay Summary', '02 · Guest Details', '03 · Confirmed'],
      selectedSuite: 'Your Chosen Suite',
      floorLabel: 'Floor',
      modifyDatesBtn: 'Edit Dates',
      continueStep2: 'Continue to Guest Details',
      backStep1: 'Back to Summary',
      confirmBtn: 'Confirm Booking Request',
      fullNameLabel: 'Full Name',
      emailLabel: 'Email Address',
      phoneLabel: 'Phone / WhatsApp',
      arrivalLabel: 'Estimated Arrival Time',
      requestsLabel: 'Special Requests',
      requestsPlaceholder: 'Pillow preference, airport pickup, or celebration note...',
      termsAgree: 'I accept the Privacy Policy (GDPR) and flexible 72h cancellation terms.',
      confirmedEyebrow: 'Reservation Confirmed',
      confirmedTitle: 'We Look Forward to Welcoming You.',
      confirmedSubtitle:
        'Your exact floor and suite selection has been registered with our Florence concierge.',
      refLabel: 'Booking Reference',
      printBtn: 'Print / Save Summary',
      calendarBtn: 'Add to Calendar (.ics)',
      newSearchBtn: 'Return to Palazzo',
      errName: 'Please enter your full name.',
      errEmail: 'Please enter a valid email address.',
      errPhone: 'Please provide a phone or WhatsApp number.',
      errTerms: 'Please accept the GDPR privacy and booking terms.',
    },
    overlays: {
      callLabel: 'Call Hotel',
      whatsappLabel: 'WhatsApp',
      mapsLabel: 'Maps',
      gdprTitle: 'Cookie & Privacy Preferences',
      gdprBody:
        'We use essential storage for your suite selection and optional analytics under EU GDPR 2016/679.',
      gdprNecessary: 'Necessary Only',
      gdprSettings: 'Settings',
      gdprAcceptAll: 'Accept All',
      gdprModalTitle: 'Privacy Settings',
      gdprSave: 'Save Preferences',
      gdprEssentialTitle: 'Strictly Necessary',
      gdprEssentialDesc: 'Keeps your chosen suite, dates, and language active.',
      gdprAnalyticsTitle: 'Anonymous Performance',
      gdprAnalyticsDesc: 'Measures page loading speed on mobile networks.',
      gdprMarketingTitle: 'Seasonal Invitations',
      gdprMarketingDesc: 'Occasional Florentine exhibition invitations (opt-in).',
      contactTitle: 'Palazzo Concierge',
      contactSubtitle: 'Direct line to Via della Spada 14, Florence.',
      contactSend: 'Send Message',
      contactSentTitle: 'Message Received',
      contactSentBody: 'Our Florence concierge replies personally within 20 minutes.',
    },
    footer: {
      tagline:
        'A fourteen-suite Renaissance hotel in historic Florence pairing quiet stone architecture with personal hospitality.',
      colExplore: 'Explore',
      colPalazzo: 'Hospitality',
      colLegal: 'European Legal',
      impressum: 'Impressum',
      privacy: 'Privacy Policy (GDPR)',
      terms: 'Terms of Service',
      cookiePrefs: 'Cookie Settings',
      copyright: '© 2026 Palazzo Verena S.r.l. · Via della Spada 14, 50123 Firenze.',
      craftCredit: 'Crafted by Abdulla Rubab',
    },
  },

  it: {
    nav: {
      palazzo: 'Il Palazzo',
      explorer: 'Piani e Suite',
      experiences: 'Esperienze',
      gallery: 'Galleria',
      location: 'Posizione',
      bookCta: 'Prenota',
      menuLabel: 'Apri menu',
    },
    hero: {
      eyebrow: 'Via della Spada 14 · Firenze',
      titleLine1: 'Palazzo Verena',
      titleLine2: 'Dimora Fiorentina di Pietra e Luce.',
      subtitle:
        'Quattordici suite a volta in un palazzo del 1548 restaurato, a tre minuti a piedi dal Duomo.',
      checkIn: 'Arrivo',
      checkOut: 'Partenza',
      guests: 'Ospiti',
      guestSingular: 'Ospite',
      guestPlural: 'Ospiti',
      exploreBtn: 'Trova Suite',
      statSuites: '14 Suite',
      statSuitesLabel: 'Distribuite su 4 Piani Storici',
      statHistory: 'Dal 1548',
      statHistoryLabel: 'Pietra Serena e Restauro Storico',
      statWalk: '3–5 Min',
      statWalkLabel: 'A Piedi dal Duomo e Ponte Vecchio',
      caption: 'Loggia del Cortile · Via della Spada',
      credentialPill: '★ 4.96 Ospiti Diretti · 14 Suite · Dal 1548',
      scrollCue: 'Scopri le Suite',
    },
    datePicker: {
      title: 'Seleziona Date',
      presets: [
        { label: '2 Notti', nights: 2 },
        { label: '3 Notti (-10%)', nights: 3 },
        { label: '5 Notti (-15%)', nights: 5 },
      ],
      apply: 'Applica Date',
      reset: 'Reimposta',
      selectedNights: 'notti scelte',
      monthNames: [
        'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
        'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre',
      ],
      weekdays: ['Lu', 'Ma', 'Me', 'Gi', 'Ve', 'Sa', 'Do'],
    },
    explorer: {
      eyebrow: 'Mappa Interattiva',
      title: 'Scegli Piano e Suite Esatta',
      subtitle:
        'Esplora tutti e quattro i piani, filtra terrazze o vasche e seleziona la tua camera direttamente sulla pianta.',
      filtersLabel: 'Filtra le suite',
      filters: {
        all: 'Tutte',
        terrace: 'Terrazza Privata',
        tub: 'Vasca',
        garden: 'Vista Giardino',
        king: 'Letto King',
      },
      legendAvailable: 'Libera',
      legendSelected: 'Scelta',
      legendLast: 'Ultima Suite',
      legendReserved: 'Occupata',
      elevTitle: 'Sezione Palazzo',
      floorPrefix: 'Piano',
      matchingSuffix: 'libere',
      streetLabel: 'VIA DELLA SPADA · LATO PIAZZA',
      courtyardLabel: 'CHIOSTRO PRIVATO DEI CIPRESSI',
      reservedTooltipPrefix: 'Occupata per queste date · Libera dal:',
      reservedJumpBtn: 'Vedi Date Libere',
      capacityLabel: 'Ospiti',
      areaLabel: 'Superficie',
      perNight: '/ notte',
      compareLightBtn: 'Confronta Luce Giorno / Sera',
      reserveExactBtn: 'Prenota Questa Suite',
      highDemandBadge: 'Ultima Disponibile',
      lastRoomBadge: 'Ultima',
      terraceBadge: 'Terrazza Privata',
      tubBadge: 'Vasca in Pietra',
      gardenBadge: 'Vista Chiostro',
      guestCapacityWarning: 'Max {max} ospiti; scegli Piano 01 o 03 per {guests} ospiti.',
      floorSuitesHeading: 'Suite su Questo Piano',
      stayPreviewLabel: 'Totale Soggiorno',
    },
    comparer: {
      eyebrow: 'Giorno e Sera',
      title: 'Dalla Luce del Mattino alle Candele',
      subtitle:
        'Trascina il cursore per confrontare il sole delle 08:30 con l’atmosfera serale delle 21:00.',
      dayLabel: '08:30 Luce del Mattino',
      daySub: 'Travertino chiaro e vista Duomo',
      eveningLabel: '21:00 Atmosfera Serale',
      eveningSub: 'Appliques in ottone e candele',
      presetMorning: 'Mattino 08:30',
      presetSplit: '50 / 50',
      presetEvening: 'Sera 21:00',
      dragHint: 'Trascina il cursore o usa le frecce',
    },
    calculator: {
      eyebrow: 'Preventivo Diretto',
      title: 'Calcola Soggiorno e Tariffa',
      subtitle:
        'Tariffe in EUR aggiornate in tempo reale con sconti soggiorno lungo e servizi curati.',
      suiteLabel: 'Suite Selezionata',
      changeSuiteBtn: 'Cambia Suite',
      datesLabel: 'Date',
      guestsLabel: 'Ospiti',
      addonsHeading: 'Servizi Aggiuntivi',
      folioHeading: 'Riepilogo Diretto (EUR)',
      roomRateLine: 'Tariffa Suite',
      discount10Label: 'Soggiorno Lungo (-10% · 3+ notti)',
      discount15Label: 'Grande Soggiorno (-15% · 5+ notti)',
      discountNudge: 'Aggiungi 1 notte per lo sconto -10%.',
      addonsSubtotalLabel: 'Servizi Scelti',
      cityTaxLabel: 'Imposta di Soggiorno (€5,50 / ospite / notte)',
      vatNote: 'IVA italiana 10% inclusa',
      totalLabel: 'Totale Stimato',
      proceedBtn: 'Procedi alla Prenotazione',
      bestRateNote: 'Miglior Tariffa Diretta · Cancellazione 72h',
    },
    experiences: {
      eyebrow: 'Vita nel Palazzo',
      title: 'Mattine Lente e Artigiani',
      subtitle:
        'Colazioni nel chiostro fiorito, aperitivi sui tetti e bagni in travertino vicino a Santa Maria Novella.',
    },
    gallery: {
      eyebrow: 'Galleria Editoriale',
      title: 'Travertino, Cipresso e Sera',
      subtitle: 'Clicca su qualsiasi immagine per ingrandire.',
      closeLightbox: 'Chiudi galleria',
    },
    location: {
      eyebrow: 'Centro Storico · Firenze',
      title: 'A Pochi Passi da Ogni Capolavoro',
      subtitle:
        'Nella tranquilla Via della Spada, quartiere Santa Maria Novella: vicino al Duomo, lontano dal rumore.',
      addressLabel: 'Indirizzo',
      addressValue: 'Via della Spada 14, 50123 Firenze FI, Italia',
      hoursLabel: 'Concierge & Orari',
      hoursValue: 'Accesso Keyless 24/7 · Check-in 15:00 · Check-out 11:00',
      mapsBtn: 'Apri Google Maps',
      conciergeBtn: 'Scrivi al Concierge',
      walkMinutes: 'min a piedi',
    },
    drawer: {
      title: 'Prenotazione Diretta',
      steps: ['01 · Riepilogo', '02 · Dati Ospite', '03 · Confermata'],
      selectedSuite: 'Suite Scelta',
      floorLabel: 'Piano',
      modifyDatesBtn: 'Modifica',
      continueStep2: 'Vai ai Dati Ospite',
      backStep1: 'Torna al Riepilogo',
      confirmBtn: 'Conferma Richiesta',
      fullNameLabel: 'Nome Completo',
      emailLabel: 'Email',
      phoneLabel: 'Telefono / WhatsApp',
      arrivalLabel: 'Orario di Arrivo',
      requestsLabel: 'Richieste Speciali',
      requestsPlaceholder: 'Preferenze cuscini, transfer o note...',
      termsAgree: 'Accetto la Privacy Policy (GDPR) e cancellazione flessibile 72h.',
      confirmedEyebrow: 'Prenotazione Confermata',
      confirmedTitle: 'Vi Attendiamo a Firenze.',
      confirmedSubtitle:
        'Piano e suite esatta sono stati registrati dal nostro Concierge di Via della Spada.',
      refLabel: 'Codice Riferimento',
      printBtn: 'Stampa Riepilogo',
      calendarBtn: 'Aggiungi al Calendario (.ics)',
      newSearchBtn: 'Torna al Palazzo',
      errName: 'Inserisci il nome completo.',
      errEmail: 'Inserisci un indirizzo email valido.',
      errPhone: 'Inserisci un numero valido.',
      errTerms: 'Accetta Privacy Policy e condizioni.',
    },
    overlays: {
      callLabel: 'Chiama',
      whatsappLabel: 'WhatsApp',
      mapsLabel: 'Mappa',
      gdprTitle: 'Preferenze Cookie & Privacy',
      gdprBody:
        'Memoria essenziale per la suite selezionata e statistiche opzionali secondo GDPR UE 2016/679.',
      gdprNecessary: 'Solo Necessari',
      gdprSettings: 'Impostazioni',
      gdprAcceptAll: 'Accetta Tutti',
      gdprModalTitle: 'Impostazioni Privacy',
      gdprSave: 'Salva Scelte',
      gdprEssentialTitle: 'Strettamente Necessari',
      gdprEssentialDesc: 'Mantiene attivi suite, date e lingua.',
      gdprAnalyticsTitle: 'Prestazioni Anonime',
      gdprAnalyticsDesc: 'Aiuta la velocità su reti mobili europee.',
      gdprMarketingTitle: 'Inviti Stagionali',
      gdprMarketingDesc: 'Mostre d’arte e serate degustazione (opzionale).',
      contactTitle: 'Concierge Privato',
      contactSubtitle: 'Via della Spada 14, Firenze.',
      contactSend: 'Invia Messaggio',
      contactSentTitle: 'Messaggio Ricevuto',
      contactSentBody: 'Il Concierge risponde entro 20 minuti.',
    },
    footer: {
      tagline:
        'Hotel boutique di quattordici suite nella Firenze storica tra pietra rinascimentale e ospitalità personale.',
      colExplore: 'Esplora',
      colPalazzo: 'Ospitalità',
      colLegal: 'Note Legali UE',
      impressum: 'Impressum',
      privacy: 'Privacy Policy (GDPR)',
      terms: 'Termini di Servizio',
      cookiePrefs: 'Impostazioni Cookie',
      copyright: '© 2026 Palazzo Verena S.r.l. · Via della Spada 14, 50123 Firenze.',
      craftCredit: 'Realizzato da Abdulla Rubab',
    },
  },

  fr: {
    nav: {
      palazzo: 'Le Palazzo',
      explorer: 'Étages & Suites',
      experiences: 'Expériences',
      gallery: 'Galerie',
      location: 'Adresse',
      bookCta: 'Réserver',
      menuLabel: 'Ouvrir le menu',
    },
    hero: {
      eyebrow: 'Via della Spada 14 · Florence, Italie',
      titleLine1: 'Palazzo Verena',
      titleLine2: 'Un Sanctuaire Florentin de Pierre et Lumière.',
      subtitle:
        'Quatorze suites voûtées dans un palazzo de 1548 restauré, à trois minutes à pied du Duomo.',
      checkIn: 'Arrivée',
      checkOut: 'Départ',
      guests: 'Hôtes',
      guestSingular: 'Hôte',
      guestPlural: 'Hôtes',
      exploreBtn: 'Trouver Votre Suite',
      statSuites: '14 Suites',
      statSuitesLabel: 'Réparties sur 4 Étages Historiques',
      statHistory: 'Depuis 1548',
      statHistoryLabel: 'Architecture Renaissance Restaurée',
      statWalk: '3–5 Min',
      statWalkLabel: 'À Pied du Duomo & Ponte Vecchio',
      caption: 'Loggia du Cloître · Via della Spada',
      credentialPill: '★ 4.96 Hôtes Directs · 14 Suites · Depuis 1548',
      scrollCue: 'Voir les Suites',
    },
    datePicker: {
      title: 'Choisir les Dates',
      presets: [
        { label: '2 Nuits', nights: 2 },
        { label: '3 Nuits (-10%)', nights: 3 },
        { label: '5 Nuits (-15%)', nights: 5 },
      ],
      apply: 'Appliquer',
      reset: 'Réinitialiser',
      selectedNights: 'nuits choisies',
      monthNames: [
        'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
        'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
      ],
      weekdays: ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'],
    },
    explorer: {
      eyebrow: 'Plan Interactif',
      title: 'Choisissez Étage et Suite Exacte',
      subtitle:
        'Changez de niveau, filtrez selon vos envies et sélectionnez directement votre suite sur le plan.',
      filtersLabel: 'Filtrer les suites',
      filters: {
        all: 'Toutes',
        terrace: 'Terrasse Privée',
        tub: 'Baignoire Îlot',
        garden: 'Vue Jardin',
        king: 'Lit King',
      },
      legendAvailable: 'Libre',
      legendSelected: 'Choisie',
      legendLast: 'Dernière Suite',
      legendReserved: 'Réservée',
      elevTitle: 'Coupe du Palais',
      floorPrefix: 'Étage',
      matchingSuffix: 'libres',
      streetLabel: 'VIA DELLA SPADA · CÔTÉ PLACE',
      courtyardLabel: 'CLOÎTRE PRIVÉ DES CYPRÈS',
      reservedTooltipPrefix: 'Réservée à ces dates · Libre dès le :',
      reservedJumpBtn: 'Dates Libres',
      capacityLabel: 'Hôtes',
      areaLabel: 'Surface',
      perNight: '/ nuit',
      compareLightBtn: 'Comparer Jour & Soir',
      reserveExactBtn: 'Réserver Cette Suite',
      highDemandBadge: 'Dernière Suite',
      lastRoomBadge: 'Dernière',
      terraceBadge: 'Terrasse Privée',
      tubBadge: 'Baignoire Pierre',
      gardenBadge: 'Vue Cloître',
      guestCapacityWarning: 'Max {max} hôtes ; voir Étage 01 ou 03 pour {guests} hôtes.',
      floorSuitesHeading: 'Suites à Cet Étage',
      stayPreviewLabel: 'Estimation Séjour',
    },
    comparer: {
      eyebrow: 'Lumière du Jour au Soir',
      title: 'Clarté Matinale & Lueur des Bougies',
      subtitle:
        'Glissez le curseur en laiton pour passer de la lumière de 08h30 à la douceur nocturne de 21h00.',
      dayLabel: '08h30 Soleil Matinal',
      daySub: 'Travertin lumineux & vue Duomo',
      eveningLabel: '21h00 Soirée Paisible',
      eveningSub: 'Appliques en laiton & bougies',
      presetMorning: 'Matin 08h30',
      presetSplit: '50 / 50',
      presetEvening: 'Soir 21h00',
      dragHint: 'Glissez le curseur ou utilisez les flèches',
    },
    calculator: {
      eyebrow: 'Tarif en Direct',
      title: 'Planifiez Séjour & Privilèges',
      subtitle:
        'Tarification EUR en direct selon votre suite, vos nuits et vos attentions sur mesure.',
      suiteLabel: 'Suite Choisie',
      changeSuiteBtn: 'Changer',
      datesLabel: 'Dates',
      guestsLabel: 'Hôtes',
      addonsHeading: 'Privilèges Optionnels',
      folioHeading: 'Estimation Directe (EUR)',
      roomRateLine: 'Tarif Suite',
      discount10Label: 'Long Séjour (-10% · 3+ nuits)',
      discount15Label: 'Grand Séjour (-15% · 5+ nuits)',
      discountNudge: 'Ajoutez 1 nuit pour obtenir -10% de remise.',
      addonsSubtotalLabel: 'Options Choisies',
      cityTaxLabel: 'Taxe de Séjour (5,50 € / pers. / nuit)',
      vatNote: 'TVA italienne 10 % incluse',
      totalLabel: 'Total Estimé',
      proceedBtn: 'Poursuivre la Réservation',
      bestRateNote: 'Tarif Direct Garanti · Annulation 72h',
    },
    experiences: {
      eyebrow: 'Vie au Palazzo',
      title: 'Matins Doux & Artisans',
      subtitle:
        'Petits-déjeuners au cloître, apéritifs sur les toits et bains de travertin près de Santa Maria Novella.',
    },
    gallery: {
      eyebrow: 'Galerie Éditoriale',
      title: 'Travertin, Cyprès & Crépuscule',
      subtitle: 'Cliquez sur une image pour l’agrandir.',
      closeLightbox: 'Fermer',
    },
    location: {
      eyebrow: 'Centro Storico · Florence',
      title: 'À Deux Pas de Chaque Chef-d’Œuvre',
      subtitle:
        'Dans la paisible Via della Spada, quartier Santa Maria Novella : près du Duomo, loin de la foule.',
      addressLabel: 'Adresse',
      addressValue: 'Via della Spada 14, 50123 Firenze FI, Italie',
      hoursLabel: 'Conciergerie',
      hoursValue: 'Accès sans clé 24/7 · Arrivée 15h00 · Départ 11h00',
      mapsBtn: 'Ouvrir Google Maps',
      conciergeBtn: 'Contacter Concierge',
      walkMinutes: 'min à pied',
    },
    drawer: {
      title: 'Réservation Directe',
      steps: ['01 · Résumé', '02 · Coordonnées', '03 · Confirmée'],
      selectedSuite: 'Suite Choisie',
      floorLabel: 'Étage',
      modifyDatesBtn: 'Modifier',
      continueStep2: 'Saisir Vos Coordonnées',
      backStep1: 'Retour',
      confirmBtn: 'Confirmer la Demande',
      fullNameLabel: 'Nom Complet',
      emailLabel: 'Email',
      phoneLabel: 'Téléphone / WhatsApp',
      arrivalLabel: 'Heure d’Arrivée',
      requestsLabel: 'Demandes Spéciales',
      requestsPlaceholder: 'Choix d’oreillers, transfert privé...',
      termsAgree: 'J’accepte la Politique RGPD et l’annulation souple 72h.',
      confirmedEyebrow: 'Réservation Confirmée',
      confirmedTitle: 'Nous Vous Attendons à Florence.',
      confirmedSubtitle:
        'Votre étage et suite exacte sont enregistrés auprès de notre conciergerie.',
      refLabel: 'Référence',
      printBtn: 'Imprimer / Sauver',
      calendarBtn: 'Calendrier (.ics)',
      newSearchBtn: 'Fermer',
      errName: 'Veuillez saisir votre nom.',
      errEmail: 'Adresse email invalide.',
      errPhone: 'Numéro requis.',
      errTerms: 'Veuillez accepter les conditions RGPD.',
    },
    overlays: {
      callLabel: 'Appeler',
      whatsappLabel: 'WhatsApp',
      mapsLabel: 'Carte',
      gdprTitle: 'Cookies & Confidentialité',
      gdprBody:
        'Stockage essentiel pour votre suite et mesures anonymes optionnelles conformes RGPD UE 2016/679.',
      gdprNecessary: 'Essentiels',
      gdprSettings: 'Paramètres',
      gdprAcceptAll: 'Tout Accepter',
      gdprModalTitle: 'Confidentialité',
      gdprSave: 'Enregistrer',
      gdprEssentialTitle: 'Nécessaires',
      gdprEssentialDesc: 'Conserve votre suite, vos dates et votre langue.',
      gdprAnalyticsTitle: 'Performance Anonyme',
      gdprAnalyticsDesc: 'Vérifie la rapidité d’affichage mobile.',
      gdprMarketingTitle: 'Invitations Saisonnières',
      gdprMarketingDesc: 'Expositions privées et dégustations (sur choix).',
      contactTitle: 'Conciergerie Privée',
      contactSubtitle: 'Via della Spada 14, Florence.',
      contactSend: 'Envoyer',
      contactSentTitle: 'Demande Reçue',
      contactSentBody: 'Réponse personnelle sous 20 minutes.',
    },
    footer: {
      tagline:
        'Hôtel-boutique Renaissance de quatorze suites au cœur de Florence alliant pierre historique et accueil attentif.',
      colExplore: 'Explorer',
      colPalazzo: 'Hospitalité',
      colLegal: 'Mentions UE',
      impressum: 'Impressum',
      privacy: 'Confidentialité (RGPD)',
      terms: 'Conditions',
      cookiePrefs: 'Cookies',
      copyright: '© 2026 Palazzo Verena S.r.l. · Via della Spada 14, 50123 Firenze.',
      craftCredit: 'Conçu par Abdulla Rubab',
    },
  },

  de: {
    nav: {
      palazzo: 'Der Palazzo',
      explorer: 'Etagen & Suiten',
      experiences: 'Erlebnisse',
      gallery: 'Galerie',
      location: 'Lage',
      bookCta: 'Buchen',
      menuLabel: 'Menü öffnen',
    },
    hero: {
      eyebrow: 'Via della Spada 14 · Florenz, Italien',
      titleLine1: 'Palazzo Verena',
      titleLine2: 'Florentiner Refugium aus Stein & Licht.',
      subtitle:
        'Vierzehn gewölbte Suiten in einem restaurierten Palazzo von 1548, drei Gehminuten vom Dom entfernt.',
      checkIn: 'Anreise',
      checkOut: 'Abreise',
      guests: 'Gäste',
      guestSingular: 'Gast',
      guestPlural: 'Gäste',
      exploreBtn: 'Suite Finden',
      statSuites: '14 Suiten',
      statSuitesLabel: 'Auf 4 Historischen Etagen',
      statHistory: 'Seit 1548',
      statHistoryLabel: 'Restaurierter Renaissance-Palazzo',
      statWalk: '3–5 Min',
      statWalkLabel: 'Zu Fuß zu Dom & Ponte Vecchio',
      caption: 'Cortile Loggia · Via della Spada',
      credentialPill: '★ 4.96 Direktgäste · 14 Suiten · Seit 1548',
      scrollCue: 'Suiten Entdecken',
    },
    datePicker: {
      title: 'Reisedaten Wählen',
      presets: [
        { label: '2 Nächte', nights: 2 },
        { label: '3 Nächte (-10%)', nights: 3 },
        { label: '5 Nächte (-15%)', nights: 5 },
      ],
      apply: 'Übernehmen',
      reset: 'Zurücksetzen',
      selectedNights: 'Nächte gewählt',
      monthNames: [
        'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
        'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember',
      ],
      weekdays: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
    },
    explorer: {
      eyebrow: 'Interaktiver Grundriss',
      title: 'Etage & Exakte Suite Wählen',
      subtitle:
        'Wechseln Sie zwischen den vier Stockwerken, filtern Sie Merkmale und wählen Sie Ihre Suite direkt im Plan.',
      filtersLabel: 'Suiten filtern',
      filters: {
        all: 'Alle Suiten',
        terrace: 'Privatterrasse',
        tub: 'Badewanne',
        garden: 'Gartenblick',
        king: 'Kingsize',
      },
      legendAvailable: 'Frei',
      legendSelected: 'Gewählt',
      legendLast: 'Letzte Suite',
      legendReserved: 'Belegt',
      elevTitle: 'Palazzo-Schnitt',
      floorPrefix: 'Etage',
      matchingSuffix: 'frei',
      streetLabel: 'VIA DELLA SPADA · PIAZZA-SEITE',
      courtyardLabel: 'PRIVATER ZYPRESSEN-KLOSTERHOF',
      reservedTooltipPrefix: 'An diesen Daten belegt · Frei ab:',
      reservedJumpBtn: 'Freie Daten',
      capacityLabel: 'Gäste',
      areaLabel: 'Fläche',
      perNight: '/ Nacht',
      compareLightBtn: 'Tages- & Abendlicht Vergleichen',
      reserveExactBtn: 'Diese Suite Reservieren',
      highDemandBadge: 'Letzte Suite',
      lastRoomBadge: 'Letzte',
      terraceBadge: 'Privatterrasse',
      tubBadge: 'Steinwanne',
      gardenBadge: 'Gartenblick',
      guestCapacityWarning: 'Max. {max} Gäste; Etage 01 oder 03 für {guests} Gäste wählen.',
      floorSuitesHeading: 'Suiten Auf Dieser Etage',
      stayPreviewLabel: 'Aufenthaltspreis',
    },
    comparer: {
      eyebrow: 'Tageslicht bis Abend',
      title: 'Morgensonne bis Kerzenschein',
      subtitle:
        'Ziehen Sie den Regler, um 08:30-Tageslicht mit unserer warmen 21:00-Abendstimmung zu vergleichen.',
      dayLabel: '08:30 Morgensonne',
      daySub: 'Heller Travertin & Domblick',
      eveningLabel: '21:00 Abendruhe',
      eveningSub: 'Messingleuchten & Kerzenschein',
      presetMorning: 'Morgen 08:30',
      presetSplit: '50 / 50',
      presetEvening: 'Abend 21:00',
      dragHint: 'Messing-Regler ziehen oder Pfeiltasten nutzen',
    },
    calculator: {
      eyebrow: 'Direktpreis-Rechner',
      title: 'Aufenthalt & Rate Planen',
      subtitle:
        'Live-EUR-Preise synchronisiert mit Ihrer Suite, Reisedaten, Langzeitrabatten und Extras.',
      suiteLabel: 'Gewählte Suite',
      changeSuiteBtn: 'Ändern',
      datesLabel: 'Daten',
      guestsLabel: 'Gäste',
      addonsHeading: 'Optionale Extras',
      folioHeading: 'Direktbuchungs-Übersicht',
      roomRateLine: 'Suitenpreis',
      discount10Label: 'Langzeitvorteil (-10% · 3+ Nächte)',
      discount15Label: 'Grand Sojourn (-15% · 5+ Nächte)',
      discountNudge: '1 weitere Nacht für 10% Rabatt hinzufügen.',
      addonsSubtotalLabel: 'Gewählte Extras',
      cityTaxLabel: 'Ortstaxe Florenz (€5,50 / Gast / Nacht)',
      vatNote: 'Inkl. 10% italienische MwSt. (IVA)',
      totalLabel: 'Gesamtsumme',
      proceedBtn: 'Weiter zur Reservierung',
      bestRateNote: 'Bester Direktpreis · 72h flexibel stornierbar',
    },
    experiences: {
      eyebrow: 'Palazzo-Leben',
      title: 'Ruhige Morgen & Handwerk',
      subtitle:
        'Frühstück im Zypressenhof, Aperitivo auf der Dachterrasse und Travertin-Bäder nahe Santa Maria Novella.',
    },
    gallery: {
      eyebrow: 'Bildergalerie',
      title: 'Travertin, Zypresse & Abendlicht',
      subtitle: 'Klicken Sie für die Vollbildansicht.',
      closeLightbox: 'Schließen',
    },
    location: {
      eyebrow: 'Centro Storico · Florenz',
      title: 'Minuten zu Jedem Meisterwerk',
      subtitle:
        'Ruhig gelegen in der Via della Spada in Santa Maria Novella – nah am Dom, abseits der Massen.',
      addressLabel: 'Adresse',
      addressValue: 'Via della Spada 14, 50123 Firenze FI, Italien',
      hoursLabel: 'Concierge & Zeiten',
      hoursValue: '24/7 Keyless Zugang · Check-in 15:00 · Check-out 11:00',
      mapsBtn: 'Google Maps Öffnen',
      conciergeBtn: 'Concierge Schreiben',
      walkMinutes: 'Min. zu Fuß',
    },
    drawer: {
      title: 'Direkte Suiten-Reservierung',
      steps: ['01 · Übersicht', '02 · Gästedaten', '03 · Bestätigt'],
      selectedSuite: 'Ihre Suite',
      floorLabel: 'Etage',
      modifyDatesBtn: 'Ändern',
      continueStep2: 'Weiter zu Gästedaten',
      backStep1: 'Zurück',
      confirmBtn: 'Buchungsanfrage Bestätigen',
      fullNameLabel: 'Vollständiger Name',
      emailLabel: 'E-Mail',
      phoneLabel: 'Telefon / WhatsApp',
      arrivalLabel: 'Ankunftszeit',
      requestsLabel: 'Wünsche',
      requestsPlaceholder: 'Kissenwunsch, Flughafentransfer...',
      termsAgree: 'Ich akzeptiere DSGVO-Datenschutz und 72h-Stornobedingungen.',
      confirmedEyebrow: 'Reservierung Bestätigt',
      confirmedTitle: 'Wir Freuen Uns auf Sie.',
      confirmedSubtitle:
        'Ihre exakte Etage und Suite wurde direkt bei unserem Concierge hinterlegt.',
      refLabel: 'Referenzcode',
      printBtn: 'Drucken / Speichern',
      calendarBtn: 'Kalender (.ics)',
      newSearchBtn: 'Schließen',
      errName: 'Bitte vollständigen Namen eingeben.',
      errEmail: 'Bitte gültige E-Mail eingeben.',
      errPhone: 'Bitte Telefonnummer eingeben.',
      errTerms: 'Bitte DSGVO-Bedingungen bestätigen.',
    },
    overlays: {
      callLabel: 'Anrufen',
      whatsappLabel: 'WhatsApp',
      mapsLabel: 'Karte',
      gdprTitle: 'Datenschutz & Cookies',
      gdprBody:
        'Essenzielle Speicherung für Ihre Suitenwahl sowie optionale Analyse gemäß EU-DSGVO 2016/679.',
      gdprNecessary: 'Nur Essenzielle',
      gdprSettings: 'Einstellungen',
      gdprAcceptAll: 'Alle Akzeptieren',
      gdprModalTitle: 'Datenschutz-Einstellungen',
      gdprSave: 'Speichern',
      gdprEssentialTitle: 'Technisch Notwendig',
      gdprEssentialDesc: 'Speichert gewählte Suite, Daten und Sprache.',
      gdprAnalyticsTitle: 'Anonyme Leistung',
      gdprAnalyticsDesc: 'Sichert schnelle Ladezeiten mobil.',
      gdprMarketingTitle: 'Saison-Einladungen',
      gdprMarketingDesc: 'Ausstellungen & Weinproben (Opt-in).',
      contactTitle: 'Privater Concierge',
      contactSubtitle: 'Via della Spada 14, Florenz.',
      contactSend: 'Senden',
      contactSentTitle: 'Nachricht Erhalten',
      contactSentBody: 'Unser Concierge antwortet binnen 20 Minuten.',
    },
    footer: {
      tagline:
        'Vierzehn-Suiten-Boutique-Hotel im historischen Florenz – gelebte Renaissance-Architektur und persönliche Gastfreundschaft.',
      colExplore: 'Entdecken',
      colPalazzo: 'Service',
      colLegal: 'Rechtliches (EU)',
      impressum: 'Impressum',
      privacy: 'Datenschutz (DSGVO)',
      terms: 'AGB',
      cookiePrefs: 'Cookie-Einstellungen',
      copyright: '© 2026 Palazzo Verena S.r.l. · Via della Spada 14, 50123 Firenze.',
      craftCredit: 'Gestaltet von Abdulla Rubab',
    },
  },
};
