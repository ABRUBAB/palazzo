import type { LocalizedText } from './rooms';

export interface ExperienceItem {
  id: string;
  tag: LocalizedText;
  title: LocalizedText;
  body: LocalizedText;
  timing: LocalizedText;
  imageKey: 'gallery-breakfast' | 'gallery-aperitivo' | 'gallery-bath';
}

export interface GalleryPhoto {
  id: string;
  stem: string;
  w: number;
  h: number;
  aspect: 'portrait' | 'landscape';
  title: LocalizedText;
  caption: LocalizedText;
}

export interface LandmarkPin {
  id: string;
  name: string;
  walkMins: number;
  cx: number;
  cy: number;
  detail: LocalizedText;
}

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'cloister-breakfast',
    tag: {
      en: '07:30 – 10:30 · Floor 00',
      it: '07:30 – 10:30 · Piano 00',
      fr: '07h30 – 10h30 · Étage 00',
      de: '07:30 – 10:30 · Etage 00',
    },
    title: {
      en: 'Cloister Courtyard Morning Table',
      it: 'Colazione nel Chiostro dei Cipressi',
      fr: 'Matins au Cloître des Cyprès',
      de: 'Morgentafel im Zypressen-Klosterhof',
    },
    body: {
      en: 'Warm stone-milled cornetti, wild Tuscan fig preserves, and single-origin espresso served beside the 16th-century limestone fountain.',
      it: 'Cornetti caldi da grani antichi, confettura di fichi toscani e caffè monorigine accanto alla fontana cinquecentesca.',
      fr: 'Viennoiseries tièdes, confiture de figues toscanes et espresso servi près de la fontaine du XVIe siècle.',
      de: 'Warme Cornetti aus Steinmehl, toskanische Feigenkonfitüre und Espresso am historischen Kalksteinbrunnen.',
    },
    timing: {
      en: 'Included with Courtyard Breakfast add-on',
      it: 'Inclusa con opzione Colazione in Cortile',
      fr: 'Incluse avec l’option Petit-Déjeuner',
      de: 'Im Frühstücks-Zusatzpaket enthalten',
    },
    imageKey: 'gallery-breakfast',
  },
  {
    id: 'rooftop-aperitivo',
    tag: {
      en: '18:00 – 21:00 · Floor 03',
      it: '18:00 – 21:00 · Piano 03',
      fr: '18h00 – 21h00 · Étage 03',
      de: '18:00 – 21:00 · Etage 03',
    },
    title: {
      en: 'Golden Hour Above Brunelleschi’s Dome',
      it: 'Aperitivo Dorato Sopra il Duomo',
      fr: 'Apéritif Doré Face au Dôme',
      de: 'Abendgold Über der Domkuppel',
    },
    body: {
      en: 'Franciacorta Millesimato, aged Chianti Classico flights, and hand-cut Florentine Negroni poured exclusively for resident guests.',
      it: 'Franciacorta Millesimato, Chianti Classico d’annata e Negroni fiorentini serviti esclusivamente per gli ospiti del palazzo.',
      fr: 'Franciacorta Millesimato, Chianti Classico et Negroni florentins réservés exclusivement aux hôtes de la maison.',
      de: 'Franciacorta Millesimato, gereifte Chianti Classico und Florentiner Negroni exklusiv für Hausgäste.',
    },
    timing: {
      en: 'Complimentary nightly resident welcome glass',
      it: 'Calice di benvenuto offerto ogni sera',
      fr: 'Verre d’accueil offert chaque soir',
      de: 'Tägliches Begrüßungsglas inklusive',
    },
    imageKey: 'gallery-aperitivo',
  },
  {
    id: 'stone-sanctuary',
    tag: {
      en: 'By Appointment · In-Suite',
      it: 'Su Richiesta · In Suite',
      fr: 'Sur Demande · En Suite',
      de: 'Auf Wunsch · In der Suite',
    },
    title: {
      en: 'Monolithic Travertine & Botanical Rituals',
      it: 'Rituali Botanici su Travertino',
      fr: 'Rituels Botaniques en Travertin',
      de: 'Botanische Rituale in Travertin',
    },
    body: {
      en: 'Every bathing alcove blends hand-carved Tuscan stone with Santa Maria Novella apothecary essences—just two corners from our doorstep.',
      it: 'Ogni sala da bagno abbina pietra toscana lavorata a mano ed essenze dell’Officina di Santa Maria Novella.',
      fr: 'Chaque salle de bain associe pierre toscane sculptée et essences de l’Officina Santa Maria Novella.',
      de: 'Jedes Badezimmer verbindet gehauenen toskanischen Stein mit Essenzen von Santa Maria Novella.',
    },
    timing: {
      en: 'Apothecary turndown replenished daily',
      it: 'Riassetto serale botanico quotidiano',
      fr: 'Préparation nocturne quotidienne',
      de: 'Tägliche Abendvorbereitung',
    },
    imageKey: 'gallery-bath',
  },
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'gal-1',
    stem: 'hero-palazzo',
    w: 1440,
    h: 900,
    aspect: 'landscape',
    title: {
      en: '1548 Limestone Courtyard Loggia',
      it: 'Loggia del Cortile del 1548',
      fr: 'Loggia du Cloître de 1548',
      de: 'Kalkstein-Loggia von 1548',
    },
    caption: {
      en: 'Cypress-olive shutters and Pietra Serena arches bathed in early Tuscan morning sun.',
      it: 'Persiane verde cipresso e archi in pietra serena nella luce del mattino.',
      fr: 'Volets vert cyprès et arches en pietra serena dans la lumière du matin.',
      de: 'Zypressengrüne Läden und Pietra-Serena-Bögen im Morgenlicht.',
    },
  },
  {
    id: 'gal-2',
    stem: 'gallery-breakfast',
    w: 960,
    h: 1200,
    aspect: 'portrait',
    title: {
      en: 'Morning Cloister Espresso & Figs',
      it: 'Espresso & Fichi nel Chiostro',
      fr: 'Espresso & Figues au Cloître',
      de: 'Morgen-Espresso & Feigen',
    },
    caption: {
      en: 'Hand-thrown Tuscan ceramics and seasonal fruit served beneath climbing jasmine.',
      it: 'Ceramiche toscane fatte a mano sotto il gelsomino rampicante.',
      fr: 'Céramiques toscanes façonnées à la main sous le jasmin.',
      de: 'Handgedrehte toskanische Keramik unter Kletterjasmin.',
    },
  },
  {
    id: 'gal-3',
    stem: 'gallery-aperitivo',
    w: 960,
    h: 1200,
    aspect: 'portrait',
    title: {
      en: 'Ponte Vecchio & Arno Sunset Glow',
      it: 'Tramonto su Ponte Vecchio e l’Arno',
      fr: 'Crépuscule sur le Ponte Vecchio',
      de: 'Abendrot über Ponte Vecchio & Arno',
    },
    caption: {
      en: 'Rose-gold dusk settling across historic riverfront rooftops moments from Floor 03.',
      it: 'Luci dorate della sera riflesse sull’Arno a pochi passi dalle terrazze del Piano 03.',
      fr: 'Lueurs rosées du soir sur l’Arno à quelques pas des terrasses de l’Étage 03.',
      de: 'Abendgold auf dem Arno, nur einen Spaziergang von den Terrassen der Etage 03 entfernt.',
    },
  },
  {
    id: 'gal-4',
    stem: 'suite-piano-nobile',
    w: 1440,
    h: 900,
    aspect: 'landscape',
    title: {
      en: 'Piano Nobile Heritage Frescoes',
      it: 'Affreschi del Piano Nobile',
      fr: 'Fresques du Piano Nobile',
      de: 'Fresken der Beletage',
    },
    caption: {
      en: 'Original 16th-century mineral pigment friezes conserved in mineral ochre and olive.',
      it: 'Fregi cinquecenteschi conservati nei toni naturali dell’ocra e dell’oliva.',
      fr: 'Frises du XVIe siècle conservées dans des tons ocre et olive.',
      de: 'Originale Friese des 16. Jahrhunderts in Ocker und Olivgrün.',
    },
  },
  {
    id: 'gal-5',
    stem: 'gallery-bath',
    w: 960,
    h: 1200,
    aspect: 'portrait',
    title: {
      en: 'Freestanding Soaking Tub & Cypress Shutters',
      it: 'Vasca Freestanding & Infissi Cipresso',
      fr: 'Baignoire Îlot & Volets Cyprès',
      de: 'Freistehende Wanne & Zypressenfenster',
    },
    caption: {
      en: 'Sunlit limestone bath tiles and tall cypress-green French windows overlooking the courtyard.',
      it: 'Pavimenti in pietra naturale e alti infissi verde cipresso affacciati sul giardino.',
      fr: 'Sols en pierre naturelle et hautes fenêtres vert cyprès donnant sur le jardin.',
      de: 'Heller Kalksteinboden und hohe zypressengrüne Fenster mit Blick ins Grüne.',
    },
  },
  {
    id: 'gal-6',
    stem: 'gallery-detail',
    w: 960,
    h: 1200,
    aspect: 'portrait',
    title: {
      en: 'Carved Walnut Armoires & Canopy Linen',
      it: 'Armadi in Noce & Baldacchino in Lino',
      fr: 'Armoires en Noyer & Baldaquin en Lin',
      de: 'Nussbaum-Schränke & Leinen-Himmelbett',
    },
    caption: {
      en: 'Custom timber dressing room framing the vaulted four-poster canopy sanctuary.',
      it: 'Spogliatoio su misura in legno caldo affacciato sul letto a baldacchino.',
      fr: 'Dressing sur mesure en noyer ouvrant sur la chambre à baldaquin.',
      de: 'Maßgefertigte Nussbaum-Ankleide mit Blick auf das Himmelbett.',
    },
  },
];

export const LANDMARKS: LandmarkPin[] = [
  {
    id: 'smn-basilica',
    name: 'Basilica Santa Maria Novella',
    walkMins: 3,
    cx: 175,
    cy: 112,
    detail: {
      en: 'Giotto crucifix, Alberti marble facade & historic 1221 Officina Perfumery.',
      it: 'Facciata dell’Alberti e storica Officina Profumo-Farmaceutica dal 1221.',
      fr: 'Façade d’Alberti et célèbre parfumerie historique fondée en 1221.',
      de: 'Albertis Marmorfassade & historische Parfümerie-Apotheke von 1221.',
    },
  },
  {
    id: 'duomo',
    name: 'Cattedrale di Santa Maria del Fiore (Il Duomo)',
    walkMins: 5,
    cx: 410,
    cy: 118,
    detail: {
      en: 'Stroll via Via dei Pescioni straight into Piazza del Duomo.',
      it: 'Passeggiata diretta lungo Via dei Pescioni fino a Piazza del Duomo.',
      fr: 'Promenade directe via la Via dei Pescioni jusqu’au Duomo.',
      de: 'Direkter Spaziergang über die Via dei Pescioni zum Domplatz.',
    },
  },
  {
    id: 'smn-station',
    name: 'Firenze Santa Maria Novella Station',
    walkMins: 6,
    cx: 118,
    cy: 86,
    detail: {
      en: 'High-speed Frecciarossa & Italo rail arrivals (Rome 90m, Milan 110m).',
      it: 'Treni alta velocità Frecciarossa e Italo (Roma 90 min, Milano 110 min).',
      fr: 'Trains grande vitesse Frecciarossa & Italo (Rome 90 min, Milan 110 min).',
      de: 'Hochgeschwindigkeitszüge nach Rom (90 Min.) und Mailand (110 Min.).',
    },
  },
  {
    id: 'ponte-vecchio',
    name: 'Ponte Vecchio & Arno Riverfront',
    walkMins: 6,
    cx: 318,
    cy: 296,
    detail: {
      en: 'Continue down Via Tornabuoni past bespoke ateliers to the Arno.',
      it: 'Lungo Via de’ Tornabuoni tra gli atelier fino al Lungarno.',
      fr: 'Descendez la Via de’ Tornabuoni vers l’Arno et le Ponte Vecchio.',
      de: 'Über die Via de’ Tornabuoni an Ateliers vorbei direkt zum Arno.',
    },
  },
  {
    id: 'uffizi',
    name: 'Galleria degli Uffizi & Piazza Signoria',
    walkMins: 8,
    cx: 422,
    cy: 268,
    detail: {
      en: 'Private early-morning art curator tickets arranged by our concierge.',
      it: 'Ingressi mattutini riservati con curatore d’arte su richiesta.',
      fr: 'Entrées matinales avec conservateur organisées par la conciergerie.',
      de: 'Früher Kuratoren-Zugang über unseren Concierge reservierbar.',
    },
  },
];
