export type FloorId = '03' | '02' | '01' | '00';
export type AmenityFilter = 'all' | 'terrace' | 'tub' | 'garden' | 'king';
export type Locale = 'en' | 'it' | 'fr' | 'de';

export interface LocalizedText {
  en: string;
  it: string;
  fr: string;
  de: string;
}

export interface RoomBlueprint {
  x: number;
  y: number;
  w: number;
  h: number;
  terrace?: { x: number; y: number; w: number; h: number; label: LocalizedText };
  windowSide: 'top' | 'bottom' | 'left' | 'right';
  doorPos: { x: number; y: number; side: 'top' | 'bottom' };
  bedPos: { x: number; y: number; w: number; h: number; vertical?: boolean };
  tubPos?: { cx: number; cy: number; rx: number; ry: number };
}

export interface RoomData {
  id: string;
  number: string;
  floorId: FloorId;
  name: string;
  category: LocalizedText;
  tagline: LocalizedText;
  description: LocalizedText;
  areaSqm: number;
  maxGuests: number;
  bedType: LocalizedText;
  nightlyRateEur: number;
  orientation: LocalizedText;
  sunNote: LocalizedText;
  imageKey: 'suite-terrazza' | 'suite-loggia' | 'suite-piano-nobile' | 'suite-cortile';
  filters: Exclude<AmenityFilter, 'all'>[];
  badges?: LocalizedText[];
  highDemand?: boolean;
  /** Inclusive-start, exclusive-end day offsets relative to today when this suite is already booked */
  bookedOffsets: [number, number][];
  blueprint: RoomBlueprint;
}

export interface FloorData {
  id: FloorId;
  code: string;
  name: LocalizedText;
  subtitle: LocalizedText;
  lightNote: LocalizedText;
  ceilingHeight: string;
  elevationY: number;
  elevationH: number;
  specialFeature?: {
    x: number;
    y: number;
    w: number;
    h: number;
    label: LocalizedText;
    kind: 'aperitivo' | 'cortile';
  };
}

export interface AddonItem {
  id: 'breakfast' | 'chauffeur' | 'wine' | 'lateCheckout';
  name: LocalizedText;
  description: LocalizedText;
  priceEur: number;
  pricingMode: 'per-night' | 'flat' | 'per-guest';
}

export const FLOORS: FloorData[] = [
  {
    id: '03',
    code: '03',
    name: {
      en: 'Rooftop Suites',
      it: 'Attico & Terrazze',
      fr: 'Suites sur Toits',
      de: 'Dachsuiten',
    },
    subtitle: {
      en: 'Duomo & Skyline Terraces',
      it: 'Terrazze sul Duomo',
      fr: 'Terrasses Vue Duomo',
      de: 'Dom- & Skyline-Terrassen',
    },
    lightNote: {
      en: '360° Rooftop Horizon · Golden Sunset',
      it: 'Orizzonte a 360° · Tramonto Dorato',
      fr: 'Horizon 360° · Soleil Couchant',
      de: '360°-Dachhorizont · Abendgold',
    },
    ceilingHeight: '3.4 m',
    elevationY: 26,
    elevationH: 48,
    specialFeature: {
      x: 492,
      y: 286,
      w: 204,
      h: 138,
      kind: 'aperitivo',
      label: {
        en: 'Aperitivo Belvedere',
        it: 'Belvedere Aperitivo',
        fr: 'Belvédère Apéritif',
        de: 'Aperitivo-Belvedere',
      },
    },
  },
  {
    id: '02',
    code: '02',
    name: {
      en: 'Loggia Floor',
      it: 'Piano della Loggia',
      fr: 'Étage Loggia',
      de: 'Loggia-Etage',
    },
    subtitle: {
      en: 'Vaulted Balcony Suites',
      it: 'Suite con Volte e Balcone',
      fr: 'Suites Voûtées à Balcon',
      de: 'Gewölbe-Suiten mit Balkon',
    },
    lightNote: {
      en: 'Soft West Loggia Light · Vaulted Breezes',
      it: 'Luce Morbida a Ovest · Brezza della Loggia',
      fr: 'Lumière Douce Ouest · Brise de Loggia',
      de: 'Sanftes Westlicht · Gewölbebrise',
    },
    ceilingHeight: '3.9 m',
    elevationY: 78,
    elevationH: 48,
  },
  {
    id: '01',
    code: '01',
    name: {
      en: 'Noble Floor',
      it: 'Piano Nobile',
      fr: 'Étage Noble',
      de: 'Beletage',
    },
    subtitle: {
      en: 'Historic Fresco Suites',
      it: 'Suite Storiche Affrescate',
      fr: 'Suites Patrimoine à Fresques',
      de: 'Historische Fresken-Suiten',
    },
    lightNote: {
      en: 'Morning East Sun · 4.6 m Fresco Ceilings',
      it: 'Sole del Mattino · Soffitti Affrescati 4,6 m',
      fr: 'Soleil Matinal · Plafonds à Fresques 4,6 m',
      de: 'Morgensonne · 4,6 m Freskendecken',
    },
    ceilingHeight: '4.6 m',
    elevationY: 130,
    elevationH: 50,
  },
  {
    id: '00',
    code: '00',
    name: {
      en: 'Garden Cloister',
      it: 'Chiostro Giardino',
      fr: 'Jardin du Cloître',
      de: 'Garten-Kreuzgang',
    },
    subtitle: {
      en: 'Courtyard & Breakfast Suites',
      it: 'Suite su Cortile & Bistrot',
      fr: 'Suites Cour & Petit-Déjeuner',
      de: 'Hofgarten- & Bistro-Suiten',
    },
    lightNote: {
      en: 'Dappled Cypress Shade · Cloister Quiet',
      it: 'Ombra di Cipressi · Quiete del Chiostro',
      fr: 'Ombre des Cyprès · Calme du Cloître',
      de: 'Zypressenschatten · Hofstille',
    },
    ceilingHeight: '4.1 m',
    elevationY: 184,
    elevationH: 50,
    specialFeature: {
      x: 388,
      y: 64,
      w: 308,
      h: 146,
      kind: 'cortile',
      label: {
        en: 'Cloister Garden & Bistro',
        it: 'Chiostro Fiorito & Bistrot',
        fr: 'Jardin du Cloître & Bistrot',
        de: 'Klosterhof & Morgenbistro',
      },
    },
  },
];

export const ROOMS: RoomData[] = [
  // FLOOR 03 — TERRAZZA ROOFTOP
  {
    id: '301',
    number: '301',
    floorId: '03',
    name: 'Terrazza Brunelleschi',
    category: {
      en: 'Signature Penthouse',
      it: 'Attico Principale',
      fr: 'Penthouse Signature',
      de: 'Signatur-Penthouse',
    },
    tagline: {
      en: 'Wrap-around travertine terrace framing Brunelleschi’s Dome',
      it: 'Terrazza privata in travertino affacciata sulla Cupola del Brunelleschi',
      fr: 'Terrasse en travertin panoramique face au Dôme de Brunelleschi',
      de: 'Umlaufende Travertin-Terrasse mit Blick auf die Domkuppel',
    },
    description: {
      en: 'Crowning the historic northeast corner of Palazzo Verena, this serene sanctuary pairs vaulted lime-plaster rooms with an outdoor stone pergola, brass lanterns, and an alcove freestanding travertine tub.',
      it: 'All’angolo nord-est del palazzo, un rifugio silenzioso con soffitti a volta, pergolato privato in pietra serena e vasca monolitica in travertino.',
      fr: 'Couronnant l’angle nord-est du palais, ce sanctuaire unit plafonds voûtés, pergola privée en pierre et baignoire îlot en travertin.',
      de: 'An der ruhigen Nordostecke des Palazzo gelegen, verbindet diese Suite gewölbte Kalkputzräume mit einer privaten Pergola und freistehender Travertin-Wanne.',
    },
    areaSqm: 68,
    maxGuests: 3,
    bedType: {
      en: 'Super King + Daybed',
      it: 'Letto Super King + Divano',
      fr: 'Lit Super King + Méridienne',
      de: 'Super-Kingsize + Tagesbett',
    },
    nightlyRateEur: 680,
    orientation: {
      en: '360° Duomo Horizon',
      it: 'Orizzonte sul Duomo 360°',
      fr: 'Horizon Duomo 360°',
      de: '360°-Dom-Panorama',
    },
    sunNote: {
      en: 'All-day sun & magenta sunset glow',
      it: 'Sole tutto il giorno e luce del tramonto',
      fr: 'Ensoleillement continu et crépuscule doré',
      de: 'Ganztägige Sonne & Abendrot',
    },
    imageKey: 'suite-terrazza',
    filters: ['terrace', 'tub', 'king'],
    highDemand: true,
    bookedOffsets: [],
    blueprint: {
      x: 390,
      y: 78,
      w: 222,
      h: 132,
      terrace: {
        x: 612,
        y: 64,
        w: 94,
        h: 146,
        label: {
          en: 'Duomo Terrace',
          it: 'Terrazza Duomo',
          fr: 'Terrasse Duomo',
          de: 'Dom-Terrasse',
        },
      },
      windowSide: 'right',
      doorPos: { x: 468, y: 210, side: 'bottom' },
      bedPos: { x: 416, y: 98, w: 66, h: 74 },
      tubPos: { cx: 564, cy: 120, rx: 24, ry: 13 },
    },
  },
  {
    id: '302',
    number: '302',
    floorId: '03',
    name: 'Attico del Campanile',
    category: {
      en: 'Rooftop King Suite',
      it: 'Suite Mansardata King',
      fr: 'Suite Mansardée King',
      de: 'Dachgeschoss-King-Suite',
    },
    tagline: {
      en: 'Sun-drenched rooftop salon with Giotto Campanile sightlines',
      it: 'Salotto panoramico baciato dal sole con vista sul Campanile di Giotto',
      fr: 'Salon baigné de lumière avec vue sur le Campanile de Giotto',
      de: 'Lichtdurchflutete Dachsuite mit Blick auf Giottos Glockenturm',
    },
    description: {
      en: 'Hand-planed herringbone oak, arched steel casements, and a sheltered north terrace designed for morning espresso overlooking Florence’s terracotta skyline.',
      it: 'Rovere a spina di pesce, ampie vetrate ad arco e terrazzino privato a nord per la colazione sopra i tetti di Firenze.',
      fr: 'Parquet en chevron, verrières cintrées et terrasse nord abritée pour le café du matin au-dessus des toits.',
      de: 'Fischgrät-Eichenparkett, rundbogige Sprossenfenster und eine geschützte Nordterrasse über den Dächern von Florenz.',
    },
    areaSqm: 54,
    maxGuests: 2,
    bedType: {
      en: 'Florentine King Canopy',
      it: 'Letto King a Baldacchino',
      fr: 'Lit King à Baldaquin',
      de: 'Florentiner Himmelbett (King)',
    },
    nightlyRateEur: 560,
    orientation: {
      en: 'Faces Historic Piazza',
      it: 'Affaccio su Piazza Storica',
      fr: 'Vue Place Historique',
      de: 'Blick auf historische Piazza',
    },
    sunNote: {
      en: 'Crisp morning east-north light',
      it: 'Luce nitida del mattino',
      fr: 'Lumière claire du matin',
      de: 'Klares Morgenlicht',
    },
    imageKey: 'suite-terrazza',
    filters: ['terrace', 'king'],
    bookedOffsets: [],
    blueprint: {
      x: 78,
      y: 78,
      w: 292,
      h: 132,
      terrace: {
        x: 78,
        y: 48,
        w: 292,
        h: 30,
        label: {
          en: 'Skyline Balcony',
          it: 'Balcone sui Tetti',
          fr: 'Balcon Panoramique',
          de: 'Skyline-Balkon',
        },
      },
      windowSide: 'top',
      doorPos: { x: 288, y: 210, side: 'bottom' },
      bedPos: { x: 108, y: 108, w: 68, h: 72 },
    },
  },
  {
    id: '303',
    number: '303',
    floorId: '03',
    name: 'Belvedere Tramonto',
    category: {
      en: 'Sunset Terrace Suite',
      it: 'Suite Terrazza Tramonto',
      fr: 'Suite Terrasse Couchant',
      de: 'Abendrot-Terrassen-Suite',
    },
    tagline: {
      en: 'West-facing stone terrace crafted for quiet Oltrarno evenings',
      it: 'Terrazza rivolta a ovest per tranquille serate verso l’Oltrarno',
      fr: 'Terrasse orientée ouest pour les fins d’après-midi florentines',
      de: 'Westterrasse für ruhige Abende über dem Oltrarno',
    },
    description: {
      en: 'Set discreetly along the south-west parapet, combining a carved travertine soaking bath with linen-draped doors opening straight to twilight breezes.',
      it: 'Affacciata con discrezione sul parapetto sud-ovest, con vasca in pietra naturale e porte-finestre sulla brezza serale.',
      fr: 'Située côté sud-ouest avec baignoire sculptée en pierre et portes-fenêtres ouvrant sur la brise du soir.',
      de: 'Diskret an der Südwestbrüstung gelegen, mit gehauener Travertin-Wanne und Flügeltüren zur Abendbrise.',
    },
    areaSqm: 48,
    maxGuests: 2,
    bedType: {
      en: 'Queen Architectural',
      it: 'Letto Queen Artigianale',
      fr: 'Lit Queen Artisanal',
      de: 'Architektur-Queensize',
    },
    nightlyRateEur: 510,
    orientation: {
      en: 'Faces Cloister Courtyard',
      it: 'Affaccio sul Chiostro',
      fr: 'Vue Cour du Cloître',
      de: 'Blick auf den Klosterhof',
    },
    sunNote: {
      en: 'Warm afternoon & golden sunset',
      it: 'Pomeriggio caldo e tramonto dorato',
      fr: 'Après-midi doré et couchant',
      de: 'Warme Nachmittags- & Abendsonne',
    },
    imageKey: 'suite-terrazza',
    filters: ['terrace', 'tub'],
    bookedOffsets: [[5, 11]],
    blueprint: {
      x: 158,
      y: 286,
      w: 318,
      h: 138,
      terrace: {
        x: 68,
        y: 286,
        w: 90,
        h: 138,
        label: {
          en: 'West Loggia',
          it: 'Loggia Ovest',
          fr: 'Loggia Ouest',
          de: 'West-Loggia',
        },
      },
      windowSide: 'left',
      doorPos: { x: 244, y: 286, side: 'top' },
      bedPos: { x: 356, y: 316, w: 72, h: 76 },
      tubPos: { cx: 214, cy: 382, rx: 24, ry: 13 },
    },
  },

  // FLOOR 02 — GALLERIA LOGGIA
  {
    id: '201',
    number: '201',
    floorId: '02',
    name: 'Loggia della Spada',
    category: {
      en: 'Corner Loggia Suite',
      it: 'Suite d’Angolo con Loggia',
      fr: 'Suite d’Angle avec Loggia',
      de: 'Eck-Loggia-Suite',
    },
    tagline: {
      en: 'Vaulted corner salon with Juliette balcony over Via della Spada',
      it: 'Salone d’angolo a volte con balcone su Via della Spada',
      fr: 'Salon d’angle voûté avec balcon sur la Via della Spada',
      de: 'Gewölbter Ecksalon mit Balkon über der Via della Spada',
    },
    description: {
      en: 'Tall cypress-green shutters open to classic Florentine palazzo cornices, complemented by olive velvet seating and bespoke brass reading lamps.',
      it: 'Le persiane verde cipresso si aprono sulle cornici rinascimentali, tra velluti oliva e lampade in ottone spazzolato.',
      fr: 'Des volets vert cyprès s’ouvrent sur les corniches Renaissance, entre velours olive et laiton brossé.',
      de: 'Zypressengrüne Fensterläden öffnen sich zu Renaissance-Gesimsen, ergänzt durch olivgrünen Samt und gebürstetes Messing.',
    },
    areaSqm: 52,
    maxGuests: 3,
    bedType: {
      en: 'King + Reading Alcove',
      it: 'King + Alcova Lettura',
      fr: 'Lit King + Alcôve Lecture',
      de: 'Kingsize + Lesealkoven',
    },
    nightlyRateEur: 490,
    orientation: {
      en: 'Faces Via della Spada',
      it: 'Affaccio su Via della Spada',
      fr: 'Vue Via della Spada',
      de: 'Blick Via della Spada',
    },
    sunNote: {
      en: 'Filtered afternoon western light',
      it: 'Luce pomeridiana filtrata',
      fr: 'Lumière douce d’après-midi',
      de: 'Gefiltertes Nachmittagslicht',
    },
    imageKey: 'suite-loggia',
    filters: ['terrace', 'king'],
    bookedOffsets: [],
    blueprint: {
      x: 64,
      y: 64,
      w: 318,
      h: 146,
      terrace: {
        x: 42,
        y: 84,
        w: 22,
        h: 106,
        label: {
          en: 'Balcony',
          it: 'Balcone',
          fr: 'Balcon',
          de: 'Balkon',
        },
      },
      windowSide: 'left',
      doorPos: { x: 268, y: 210, side: 'bottom' },
      bedPos: { x: 106, y: 92, w: 68, h: 74 },
    },
  },
  {
    id: '202',
    number: '202',
    floorId: '02',
    name: 'Loggia del Sole',
    category: {
      en: 'Vaulted Spa Suite',
      it: 'Suite Loggia & Vasca',
      fr: 'Suite Loggia & Bain',
      de: 'Loggia-Spa-Suite',
    },
    tagline: {
      en: 'Limestone arches, herringbone oak, and sunlit stone balcony',
      it: 'Archi in pietra serena, rovere e balcone soleggiato',
      fr: 'Arches en pierre, parquet chevron et balcon ensoleillé',
      de: 'Kalksteinbögen, Eichenparkett und sonniger Balkon',
    },
    description: {
      en: 'Refined architectural quietude: unlacquered brass fixtures, deep freestanding limestone bathtub, and tall French doors opening onto the morning sun.',
      it: 'Silenzio architettonico con rubinetteria in ottone naturale, vasca freestanding in pietra e porte-finestre sul sole del mattino.',
      fr: 'Quiétude architecturale avec laiton brut, baignoire îlot en calcaire et hautes portes sur le soleil matinal.',
      de: 'Architektonische Ruhe mit unlackiertem Messing, freistehender Kalksteinwanne und hohen Flügeltüren.',
    },
    areaSqm: 46,
    maxGuests: 2,
    bedType: {
      en: 'Tailored Tuscan King',
      it: 'King Lino Toscano',
      fr: 'King Lin de Toscane',
      de: 'Toskanisches Leinen-Kingsize',
    },
    nightlyRateEur: 450,
    orientation: {
      en: 'Faces Historic Piazza',
      it: 'Affaccio su Piazza Storica',
      fr: 'Vue Place Historique',
      de: 'Blick auf historische Piazza',
    },
    sunNote: {
      en: 'Golden morning sunshine',
      it: 'Sole dorato del mattino',
      fr: 'Soleil doré matinal',
      de: 'Goldene Morgensonne',
    },
    imageKey: 'suite-loggia',
    filters: ['terrace', 'tub', 'king'],
    highDemand: true,
    bookedOffsets: [],
    blueprint: {
      x: 394,
      y: 64,
      w: 302,
      h: 146,
      terrace: {
        x: 456,
        y: 44,
        w: 178,
        h: 20,
        label: {
          en: 'Sun Loggia',
          it: 'Loggia Sole',
          fr: 'Loggia Soleil',
          de: 'Sonnenloggia',
        },
      },
      windowSide: 'top',
      doorPos: { x: 464, y: 210, side: 'bottom' },
      bedPos: { x: 560, y: 92, w: 68, h: 74 },
      tubPos: { cx: 454, cy: 112, rx: 24, ry: 13 },
    },
  },
  {
    id: '203',
    number: '203',
    floorId: '02',
    name: 'Suite dei Cipressi',
    category: {
      en: 'Courtyard View Suite',
      it: 'Suite Vista Cipressi',
      fr: 'Suite Vue Cyprès',
      de: 'Zypressenblick-Suite',
    },
    tagline: {
      en: 'Overlooking the tranquil cypress canopy of the inner cloister',
      it: 'Affacciata sulle chiome dei cipressi del chiostro interno',
      fr: 'Surplombant les cimes des cyprès du cloître intérieur',
      de: 'Mit Blick auf die Zypressenkronen des ruhigen Innenhofs',
    },
    description: {
      en: 'Acoustic heritage glazing ensures library stillness above the garden courtyard, dressed in stone linen, dark oak, and warm brass sconces.',
      it: 'Vetri acustici d’epoca garantiscono silenzio assoluto sopra il giardino, tra lino grezzo, rovere scuro e appliques in ottone.',
      fr: 'Double vitrage patrimonial silencieux au-dessus du jardin, habillé de lin écru et de laiton chaleureux.',
      de: 'Historische Akustikverglasung sorgt für Bibliotheksstille über dem Gartenhof, gekleidet in Naturleinen und Messing.',
    },
    areaSqm: 42,
    maxGuests: 2,
    bedType: {
      en: 'Tuscan King',
      it: 'Letto King Toscano',
      fr: 'Lit King Toscan',
      de: 'Toskanisches Kingsize',
    },
    nightlyRateEur: 410,
    orientation: {
      en: 'Faces Cloister Courtyard',
      it: 'Affaccio sul Chiostro',
      fr: 'Vue Cour du Cloître',
      de: 'Blick auf den Klosterhof',
    },
    sunNote: {
      en: 'Soft diffused courtyard light',
      it: 'Luce morbida del cortile',
      fr: 'Lumière douce du cloître',
      de: 'Sanftes, gefiltertes Hoflicht',
    },
    imageKey: 'suite-loggia',
    filters: ['garden', 'king'],
    bookedOffsets: [],
    blueprint: {
      x: 64,
      y: 286,
      w: 328,
      h: 150,
      windowSide: 'bottom',
      doorPos: { x: 256, y: 286, side: 'top' },
      bedPos: { x: 108, y: 332, w: 68, h: 72 },
    },
  },
  {
    id: '204',
    number: '204',
    floorId: '02',
    name: "Camera dell'Arco",
    category: {
      en: 'Boutique Atelier Room',
      it: 'Camera Atelier ad Arco',
      fr: 'Chambre Atelier Voûtée',
      de: 'Gewölbe-Atelier-Zimmer',
    },
    tagline: {
      en: 'Intimate stone arch alcove with bespoke travertine rain bath',
      it: 'Intima alcova ad arco con bagno in travertino scolpito',
      fr: 'Alcôve cintrée intime avec salle de bain en travertin',
      de: 'Intimer Steinbogen-Alkoven mit Travertin-Badewanne',
    },
    description: {
      en: 'Designed for solo connoisseurs or couples seeking sculpted simplicity: hand-troweled lime walls, deep soaking tub, and curated Florentine art monographs.',
      it: 'Pensata per chi cerca essenzialità materica: pareti a calce spatolata, vasca profonda e volumi d’arte fiorentina.',
      fr: 'Pensée pour la simplicité sculpturale : enduits à la chaux, baignoire profonde et monographies florentines.',
      de: 'Entworfen für Liebhaber reduzierter Baukunst: Kalkputzwände, tiefe Badewanne und Florentiner Kunstbände.',
    },
    areaSqm: 36,
    maxGuests: 2,
    bedType: {
      en: 'Double Queen Linen',
      it: 'Matrimoniale Queen Lino',
      fr: 'Lit Queen Lin Naturel',
      de: 'Queensize Naturleinen',
    },
    nightlyRateEur: 360,
    orientation: {
      en: 'Faces Cloister Courtyard',
      it: 'Affaccio sul Chiostro',
      fr: 'Vue Cour du Cloître',
      de: 'Blick auf den Klosterhof',
    },
    sunNote: {
      en: 'Serene east courtyard reflection',
      it: 'Riflesso sereno a est',
      fr: 'Reflets apaisants côté est',
      de: 'Ruhiges Morgenlicht vom Hof',
    },
    imageKey: 'suite-loggia',
    filters: ['tub'],
    bookedOffsets: [[6, 10]],
    blueprint: {
      x: 404,
      y: 286,
      w: 292,
      h: 150,
      windowSide: 'bottom',
      doorPos: { x: 486, y: 286, side: 'top' },
      bedPos: { x: 584, y: 330, w: 64, h: 72 },
      tubPos: { cx: 468, cy: 386, rx: 22, ry: 12 },
    },
  },

  // FLOOR 01 — PIANO NOBILE
  {
    id: '101',
    number: '101',
    floorId: '01',
    name: 'Sala degli Affreschi',
    category: {
      en: 'Grand Heritage Suite',
      it: 'Gran Suite Storica',
      fr: 'Grande Suite Patrimoine',
      de: 'Historische Grand Suite',
    },
    tagline: {
      en: 'Restored 16th-century botanical frescoes beneath 4.6 m ceilings',
      it: 'Affreschi botanici cinquecenteschi restaurati sotto soffitti di 4,6 m',
      fr: 'Fresques botaniques du XVIe siècle restaurées à 4,6 m de hauteur',
      de: 'Restaurierte botanische Fresken des 16. Jh. unter 4,6 m Decken',
    },
    description: {
      en: 'The jewel of the Piano Nobile: grand double casements, authentic Renaissance frieze borders in ochre and cypress green, and a carved travertine bath alcove.',
      it: 'Il gioiello del Piano Nobile: doppie finestre a tutta altezza, fregi rinascimentali in ocra e cipresso e alcova da bagno in travertino.',
      fr: 'Le joyau du Piano Nobile : hautes doubles fenêtres, frises Renaissance ocre et cyprès et alcôve de bain en travertin.',
      de: 'Das Herzstück der Beletage: hohe Doppelfenster, restaurierte Renaissance-Friese und eine Travertin-Badealkove.',
    },
    areaSqm: 64,
    maxGuests: 4,
    bedType: {
      en: 'Super King + Salon Sofa',
      it: 'Super King + Salotto',
      fr: 'Super King + Salon Privé',
      de: 'Super-Kingsize + Salon',
    },
    nightlyRateEur: 620,
    orientation: {
      en: 'Faces Historic Piazza',
      it: 'Affaccio su Piazza Storica',
      fr: 'Vue Place Historique',
      de: 'Blick auf historische Piazza',
    },
    sunNote: {
      en: 'Luminous morning piazza light',
      it: 'Luminosa luce mattutina',
      fr: 'Lumière matinale radieuse',
      de: 'Strahlendes Morgenlicht',
    },
    imageKey: 'suite-piano-nobile',
    filters: ['tub', 'king'],
    bookedOffsets: [],
    blueprint: {
      x: 64,
      y: 64,
      w: 346,
      h: 146,
      windowSide: 'top',
      doorPos: { x: 298, y: 210, side: 'bottom' },
      bedPos: { x: 102, y: 92, w: 70, h: 74 },
      tubPos: { cx: 348, cy: 112, rx: 26, ry: 13 },
    },
  },
  {
    id: '102',
    number: '102',
    floorId: '01',
    name: 'Suite Medicea',
    category: {
      en: 'Piano Nobile Balcony',
      it: 'Suite Piano Nobile con Balcone',
      fr: 'Suite Piano Nobile Balcon',
      de: 'Beletage-Balkon-Suite',
    },
    tagline: {
      en: 'High-windowed noble quarters with carved Pietra Serena hearth',
      it: 'Dimora nobile con camino in pietra serena e balcone privato',
      fr: 'Appartement noble avec cheminée en pietra serena et balcon',
      de: 'Vornehme Suite mit Pietra-Serena-Kamin und Privatbalkon',
    },
    description: {
      en: 'Proportions worthy of Florentine aristocracy: custom alabaster drapery, private eastern wrought-iron balcony, and generous lounge seating for three.',
      it: 'Proporzioni nobiliari con tendaggi in alabastro, balcone privato in ferro battuto a est e zona giorno per tre ospiti.',
      fr: 'Proportions nobles avec tentures albâtre, balcon en fer forgé à l’est et salon spacieux pour trois hôtes.',
      de: 'Aristokratische Proportionen mit Alabaster-Vorhängen, schmiedeeisernem Ostbalkon und Salon für drei Gäste.',
    },
    areaSqm: 56,
    maxGuests: 3,
    bedType: {
      en: 'Florentine King + Daybed',
      it: 'King + Dormeuse',
      fr: 'Lit King + Méridienne',
      de: 'Kingsize + Tagesbett',
    },
    nightlyRateEur: 540,
    orientation: {
      en: 'Faces Historic Piazza',
      it: 'Affaccio su Piazza Storica',
      fr: 'Vue Place Historique',
      de: 'Blick auf historische Piazza',
    },
    sunNote: {
      en: 'Direct dawn & mid-morning sun',
      it: 'Sole diretto dall’alba a mezzogiorno',
      fr: 'Soleil direct dès l’aurore',
      de: 'Direkte Morgen- & Vormittagssonne',
    },
    imageKey: 'suite-piano-nobile',
    filters: ['terrace', 'king'],
    bookedOffsets: [],
    blueprint: {
      x: 422,
      y: 64,
      w: 274,
      h: 146,
      terrace: {
        x: 696,
        y: 86,
        w: 22,
        h: 102,
        label: {
          en: 'East Balcony',
          it: 'Balcone Est',
          fr: 'Balcon Est',
          de: 'Ost-Balkon',
        },
      },
      windowSide: 'right',
      doorPos: { x: 472, y: 210, side: 'bottom' },
      bedPos: { x: 564, y: 94, w: 68, h: 74 },
    },
  },
  {
    id: '103',
    number: '103',
    floorId: '01',
    name: 'Galleria Travertino',
    category: {
      en: 'Fresco Bath Suite',
      it: 'Suite Travertino & Giardino',
      fr: 'Suite Travertin & Jardin',
      de: 'Travertin-Garten-Suite',
    },
    tagline: {
      en: 'Sculpted limestone soaking tub framed by courtyard views',
      it: 'Vasca scultorea in travertino affacciata sul giardino interno',
      fr: 'Baignoire sculptée en travertin ouverte sur le jardin intérieur',
      de: 'Skulpturale Travertin-Wanne mit Blick in den Gartenhof',
    },
    description: {
      en: 'Serene south wing retreat pairing Calacatta marble vanity craftsmanship with soothing views down into the fragrant citrus cloister.',
      it: 'Rifugio nell’ala sud con lavorazioni in marmo Calacatta e affaccio rilassante sul chiostro degli agrumi.',
      fr: 'Refuge côté sud alliant marbre Calacatta et vue apaisante sur le cloître aux agrumes.',
      de: 'Ruhiges Refugium im Südflügel mit Calacatta-Marmor und Ausblick auf die Zitronenbäume im Innenhof.',
    },
    areaSqm: 44,
    maxGuests: 2,
    bedType: {
      en: 'King Architectural',
      it: 'Letto King Artigianale',
      fr: 'Lit King Artisanal',
      de: 'Architektur-Kingsize',
    },
    nightlyRateEur: 430,
    orientation: {
      en: 'Faces Cloister Courtyard',
      it: 'Affaccio sul Chiostro',
      fr: 'Vue Cour du Cloître',
      de: 'Blick auf den Klosterhof',
    },
    sunNote: {
      en: 'Calm southern courtyard glow',
      it: 'Luce calma del chiostro a sud',
      fr: 'Clarté calme plein sud',
      de: 'Ruhiges Süd-Hoflicht',
    },
    imageKey: 'suite-piano-nobile',
    filters: ['tub', 'garden'],
    highDemand: true,
    bookedOffsets: [],
    blueprint: {
      x: 64,
      y: 286,
      w: 310,
      h: 150,
      windowSide: 'bottom',
      doorPos: { x: 248, y: 286, side: 'top' },
      bedPos: { x: 102, y: 332, w: 66, h: 72 },
      tubPos: { cx: 310, cy: 382, rx: 24, ry: 13 },
    },
  },
  {
    id: '104',
    number: '104',
    floorId: '01',
    name: 'Alcova Fiorentina',
    category: {
      en: 'Quiet Garden Room',
      it: 'Camera Silenziosa sul Giardino',
      fr: 'Chambre Calme sur Jardin',
      de: 'Ruhiges Gartenzimmer',
    },
    tagline: {
      en: 'Hushed courtyard wing crafted in raw linen and warm walnut',
      it: 'Ala riservata sul cortile in lino naturale e noce toscano',
      fr: 'Aile feutrée sur cour en lin brut et noyer chaleureux',
      de: 'Stiller Hofflügel aus Naturleinen und warmem Nussbaum',
    },
    description: {
      en: 'Ideal for reflective stays: generous writing desk by tall shutters, rainfall marble shower, and uninterrupted stillness above the cloister fountain.',
      it: 'Ideale per soggiorni contemplativi: scrittoio accanto alle imposte alte, doccia a pioggia in marmo e quiete sulla fontana.',
      fr: 'Idéale pour les séjours sereins : bureau près des volets hauts, douche pluie en marbre et calme sur la fontaine.',
      de: 'Ideal für ruhige Aufenthalte: Schreibtisch am hohen Fenster, Marmor-Regendusche und Blick über den Hofbrunnen.',
    },
    areaSqm: 38,
    maxGuests: 2,
    bedType: {
      en: 'Queen Tuscan Linen',
      it: 'Queen Lino Toscano',
      fr: 'Queen Lin de Toscane',
      de: 'Queensize Toskana-Leinen',
    },
    nightlyRateEur: 380,
    orientation: {
      en: 'Faces Cloister Courtyard',
      it: 'Affaccio sul Chiostro',
      fr: 'Vue Cour du Cloître',
      de: 'Blick auf den Klosterhof',
    },
    sunNote: {
      en: 'Gentle mid-day reflection',
      it: 'Riflesso gentile di mezzogiorno',
      fr: 'Lumière douce de mi-journée',
      de: 'Sanftes Mittagslicht',
    },
    imageKey: 'suite-piano-nobile',
    filters: ['garden'],
    bookedOffsets: [[11, 16]],
    blueprint: {
      x: 386,
      y: 286,
      w: 310,
      h: 150,
      windowSide: 'bottom',
      doorPos: { x: 472, y: 286, side: 'top' },
      bedPos: { x: 576, y: 332, w: 66, h: 72 },
    },
  },

  // FLOOR 00 — CORTILE GARDEN
  {
    id: '001',
    number: '001',
    floorId: '00',
    name: 'Suite del Chiostro',
    category: {
      en: 'Cloister Garden Suite',
      it: 'Suite del Chiostro',
      fr: 'Suite du Cloître',
      de: 'Klosterhof-Suite',
    },
    tagline: {
      en: 'Direct French-door access to the stone fountain and cypress cloister',
      it: 'Accesso diretto dalle porte-finestre alla fontana e al chiostro dei cipressi',
      fr: 'Accès direct par portes-fenêtres à la fontaine et aux cyprès du cloître',
      de: 'Direkter Gartenzugang zum Steinbrunnen und Zypressen-Kreuzgang',
    },
    description: {
      en: 'Step straight from your cool limestone bedroom onto morning flagstone pavers scented with star jasmine, paired with a generous soaking tub inside.',
      it: 'Dalla freschezza della camera in pietra direttamente sul lastricato profumato di gelsomino, con ampia vasca interna.',
      fr: 'Passez directement de la chambre en pierre fraîche aux dalles parfumées de jasmin, avec grande baignoire intérieure.',
      de: 'Treten Sie direkt vom kühlen Kalksteinschlafzimmer auf jasminduftendes Pflaster, ergänzt durch eine tiefe Badewanne.',
    },
    areaSqm: 48,
    maxGuests: 3,
    bedType: {
      en: 'King + Courtyard Lounge',
      it: 'King + Salotto Giardino',
      fr: 'King + Salon de Jardin',
      de: 'Kingsize + Gartenlounge',
    },
    nightlyRateEur: 420,
    orientation: {
      en: 'Faces Cloister Courtyard',
      it: 'Affaccio sul Chiostro',
      fr: 'Vue Cour du Cloître',
      de: 'Direkt am Klosterhof',
    },
    sunNote: {
      en: 'Cool cypress shade & dappled morning sun',
      it: 'Ombra fresca di cipressi e sole del mattino',
      fr: 'Fraîcheur des cyprès et soleil filtré',
      de: 'Kühler Zypressenschatten & Morgensonne',
    },
    imageKey: 'suite-cortile',
    filters: ['garden', 'tub', 'king'],
    bookedOffsets: [],
    blueprint: {
      x: 64,
      y: 64,
      w: 312,
      h: 146,
      windowSide: 'right',
      doorPos: { x: 256, y: 210, side: 'bottom' },
      bedPos: { x: 96, y: 94, w: 68, h: 72 },
      tubPos: { cx: 314, cy: 112, rx: 24, ry: 12 },
    },
  },
  {
    id: '002',
    number: '002',
    floorId: '00',
    name: 'Giardino Segreto',
    category: {
      en: 'Private Walled Patio',
      it: 'Suite Giardino Segreto',
      fr: 'Suite Jardin Secret',
      de: 'Geheimgarten-Suite',
    },
    tagline: {
      en: 'Secluded ground-floor suite with private walled limestone garden',
      it: 'Suite riservata al piano terra con giardino murato privato',
      fr: 'Suite confidentielle en rez-de-jardin avec patio clos privé',
      de: 'Abgeschirmte Erdgeschoss-Suite mit eigenem ummauerten Gartenhof',
    },
    description: {
      en: 'Includes an exclusive outdoor travertine bistro terrace framed by climbing jasmine, artisanal Tuscan flax bedding, and complete privacy behind ancient stone walls.',
      it: 'Dotata di patio privato in travertino tra gelsomino rampicante, biancheria in lino toscano e riservatezza assoluta.',
      fr: 'Comprend un patio privé en travertin bordé de jasmin grimpant, lin toscan artisanal et intimité totale.',
      de: 'Mit exklusiver Travertin-Gartenterrasse zwischen Kletterjasmin, toskanischem Flachs-Leinen und voller Privatsphäre.',
    },
    areaSqm: 44,
    maxGuests: 2,
    bedType: {
      en: 'Florentine King',
      it: 'Letto King Fiorentino',
      fr: 'Lit King Florentin',
      de: 'Florentiner Kingsize',
    },
    nightlyRateEur: 390,
    orientation: {
      en: 'Private Walled Garden',
      it: 'Giardino Privato Murato',
      fr: 'Jardin Clos Privé',
      de: 'Eigener ummauerter Garten',
    },
    sunNote: {
      en: 'Warm sheltered mid-day courtyard sun',
      it: 'Sole riparato di mezzogiorno',
      fr: 'Soleil abrité de mi-journée',
      de: 'Geschützte Mittagssonne',
    },
    imageKey: 'suite-cortile',
    filters: ['terrace', 'garden', 'king'],
    bookedOffsets: [],
    blueprint: {
      x: 64,
      y: 286,
      w: 294,
      h: 150,
      terrace: {
        x: 358,
        y: 300,
        w: 80,
        h: 124,
        label: {
          en: 'Private Patio',
          it: 'Patio Privato',
          fr: 'Patio Privé',
          de: 'Privat-Patio',
        },
      },
      windowSide: 'right',
      doorPos: { x: 244, y: 286, side: 'top' },
      bedPos: { x: 98, y: 332, w: 68, h: 72 },
    },
  },
  {
    id: '003',
    number: '003',
    floorId: '00',
    name: 'Camera Limonaia',
    category: {
      en: 'Bistro Cloister Room',
      it: 'Camera della Limonaia',
      fr: 'Chambre de l’Orangerie',
      de: 'Orangerie-Gartenzimmer',
    },
    tagline: {
      en: 'Sun-dappled atelier steps from terracotta lemon pots & morning pastries',
      it: 'Atelier luminoso a due passi dai limoni in terracotta e dal bistrot',
      fr: 'Atelier lumineux à deux pas des citronniers et du bistrot matinal',
      de: 'Sonnengesprenkeltes Zimmer neben Zitronenbäumen & Morgenbistro',
    },
    description: {
      en: 'Our most beloved Pied-à-Terre room for design travelers: vaulted stone ceiling, bespoke olive oak millwork, rainfall shower, and immediate access to the courtyard breakfast tables.',
      it: 'La camera più amata dai viaggiatori di design: soffitto a volta in pietra, arredi su misura in legno e accesso diretto alla colazione in cortile.',
      fr: 'La chambre favorite des esthètes : voûte en pierre, menuiserie sur mesure et accès immédiat aux tables du petit-déjeuner.',
      de: 'Unser beliebtestes Pied-à-Terre für Designreisende: Steingewölbe, maßgefertigte Einbauten und direkter Zugang zum Frühstückshof.',
    },
    areaSqm: 34,
    maxGuests: 2,
    bedType: {
      en: 'Bespoke Queen',
      it: 'Queen su Misura',
      fr: 'Queen Sur-Mesure',
      de: 'Maßgefertigtes Queensize',
    },
    nightlyRateEur: 290,
    orientation: {
      en: 'Faces Cloister Courtyard',
      it: 'Affaccio sul Chiostro',
      fr: 'Vue Cour du Cloître',
      de: 'Blick auf den Klosterhof',
    },
    sunNote: {
      en: 'Golden morning citrus light',
      it: 'Luce dorata tra gli agrumi',
      fr: 'Lumière dorée des citronniers',
      de: 'Goldenes Morgenlicht im Zitronenhof',
    },
    imageKey: 'suite-cortile',
    filters: ['garden'],
    highDemand: true,
    bookedOffsets: [],
    blueprint: {
      x: 450,
      y: 286,
      w: 246,
      h: 150,
      windowSide: 'top',
      doorPos: { x: 526, y: 286, side: 'top' },
      bedPos: { x: 584, y: 332, w: 66, h: 72 },
    },
  },
];

export const ROOM_BADGE_TEMPLATES: {
  key: string;
  label: LocalizedText;
}[] = [
  {
    key: 'linen',
    label: {
      en: 'Handcrafted Tuscan Linen',
      it: 'Lino Toscano Artigianale',
      fr: 'Lin Toscan Artisanal',
      de: 'Toskanisches Manufakturleinen',
    },
  },
  {
    key: 'shower',
    label: {
      en: 'Rainfall Marble Shower',
      it: 'Doccia a Pioggia in Marmo',
      fr: 'Douche Pluie en Marbre',
      de: 'Marmor-Regendusche',
    },
  },
  {
    key: 'acoustic',
    label: {
      en: 'Acoustic Heritage Glazing',
      it: 'Vetri Acustici Storici',
      fr: 'Vitrage Acoustique Patrimoine',
      de: 'Historische Schallschutzfenster',
    },
  },
  {
    key: 'fiber',
    label: {
      en: 'Private Gigabit Fiber',
      it: 'Fibra Privata Gigabit',
      fr: 'Fibre Privée Gigabit',
      de: 'Privates Gigabit-Glasfaser',
    },
  },
];

export const ADDONS: AddonItem[] = [
  {
    id: 'breakfast',
    name: {
      en: 'Artisan Courtyard Breakfast',
      it: 'Colazione Artigianale in Cortile',
      fr: 'Petit-Déjeuner Artisanal en Cour',
      de: 'Handwerkliches Frühstück im Hof',
    },
    description: {
      en: 'Single-origin espresso, warm stone-milled cornetti, Tuscan figs & organic farm eggs.',
      it: 'Espresso monorigine, cornetti caldi, fichi toscani e uova biologiche di fattoria.',
      fr: 'Espresso de spécialité, viennoiseries tièdes, figues toscanes et œufs fermiers.',
      de: 'Single-Origin-Espresso, warme Cornetti, toskanische Feigen & Bio-Bauernhof-Eier.',
    },
    priceEur: 24,
    pricingMode: 'per-night',
  },
  {
    id: 'chauffeur',
    name: {
      en: 'Private Florence Airport Chauffeur',
      it: 'Autista Privato Aeroporto Firenze',
      fr: 'Chauffeur Privé Aéroport Florence',
      de: 'Privater Flughafen-Chauffeur Florenz',
    },
    description: {
      en: 'Direct ZTL-permitted Mercedes V-Class welcome from Peretola Airport or SMN Station.',
      it: 'Accoglienza privata in Mercedes Classe V autorizzata ZTL da Peretola o SMN.',
      fr: 'Accueil privé en Mercedes Classe V autorisée ZTL depuis Peretola ou SMN.',
      de: 'Direkter ZTL-fähiger Mercedes-V-Klasse-Transfer ab Flughafen Peretola oder SMN.',
    },
    priceEur: 65,
    pricingMode: 'flat',
  },
  {
    id: 'wine',
    name: {
      en: 'Evening Tuscan Wine Tasting',
      it: 'Degustazione Serale Vini Toscani',
      fr: 'Dégustation Nocturne Vins Toscans',
      de: 'Abendliche Toskana-Weinprobe',
    },
    description: {
      en: 'Sommelier-led cellar flight of Brunello di Montalcino, Chianti Classico & aged pecorino.',
      it: 'Percorso guidato in cantina tra Brunello di Montalcino, Chianti Classico e pecorino.',
      fr: 'Sélection commentée en cave de Brunello di Montalcino, Chianti Classico & pecorino.',
      de: 'Sommelière-geführte Kellerprobe mit Brunello, Chianti Classico & gereiftem Pecorino.',
    },
    priceEur: 45,
    pricingMode: 'per-guest',
  },
  {
    id: 'lateCheckout',
    name: {
      en: 'Late Checkout 2:00 PM',
      it: 'Late Check-out Ore 14:00',
      fr: 'Départ Tardif 14h00',
      de: 'Später Check-out bis 14:00 Uhr',
    },
    description: {
      en: 'Linger over a unhurried second espresso on your terrace until two in the afternoon.',
      it: 'Concediti un ultimo espresso senza fretta in terrazza fino alle quattordici.',
      fr: 'Prolongez votre matinée sans hâte sur votre terrasse jusqu’à 14h00.',
      de: 'Genießen Sie einen ruhigen zweiten Espresso auf Ihrer Terrasse bis 14 Uhr.',
    },
    priceEur: 35,
    pricingMode: 'flat',
  },
];

export const ROOM_IMAGE_META: Record<
  RoomData['imageKey'],
  { w: number; h: number; label: LocalizedText }
> = {
  'suite-terrazza': {
    w: 1440,
    h: 900,
    label: {
      en: 'Terrazza Rooftop Penthouse overlooking Florence & Duomo',
      it: 'Attico Terrazza con vista su Firenze e Duomo',
      fr: 'Penthouse Terrasse avec vue sur Florence et le Duomo',
      de: 'Dachterrassen-Penthouse mit Blick auf Florenz und Dom',
    },
  },
  'suite-loggia': {
    w: 1440,
    h: 900,
    label: {
      en: 'Galleria Loggia vaulted suite with herringbone parquet',
      it: 'Suite Galleria Loggia con volte e rovere a spina di pesce',
      fr: 'Suite Galerie Loggia voûtée avec parquet chevron',
      de: 'Gewölbte Galerie-Loggia-Suite mit Fischgrätparkett',
    },
  },
  'suite-piano-nobile': {
    w: 1440,
    h: 900,
    label: {
      en: 'Piano Nobile heritage fresco suite with travertine soaking tub',
      it: 'Suite Piano Nobile affrescata con vasca in travertino',
      fr: 'Suite Piano Nobile à fresques et baignoire en travertin',
      de: 'Beletage-Freskensuite mit freistehender Travertin-Wanne',
    },
  },
  'suite-cortile': {
    w: 1440,
    h: 900,
    label: {
      en: 'Cortile Garden suite opening onto the walled cypress cloister',
      it: 'Suite Giardino aperta sul chiostro murato con cipressi',
      fr: 'Suite Jardin ouverte sur le cloître clos aux cyprès',
      de: 'Hofgarten-Suite mit direktem Ausgang in den Zypressen-Kreuzgang',
    },
  },
};
