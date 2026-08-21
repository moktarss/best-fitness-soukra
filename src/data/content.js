export const IMG = '/assets/img/';
export const BF = '/assets/bf/';

export const asset = (f) => IMG + f;
export const bf = (f) => BF + f;

/* Résout un chemin d'image : « bf:xxx.png » -> visuels Best Fitness */
export const src = (p) => (p.startsWith('bf:') ? BF + p.slice(3) : IMG + p);

/* ---------------- Identité ---------------- */
export const BRAND = {
  name: 'Best Fitness',
  city: 'La Soukra',
  phone: '51055362',
  phoneHref: 'tel:+21651055362',
  instagram: 'bestfitness_soukra',
  instagramUrl: 'https://www.instagram.com/bestfitness_soukra/',
  mapsUrl: 'https://maps.app.goo.gl/mBAmD5hBd9kNEGLF8',
  hoursWeek: '8H30 → 21H',
  hoursWeekend: '8H → 20H',
  hoursSunday: '9H → 15H',
};

/* Numéro WhatsApp au format attendu par wa.me : indicatif collé, sans « + » */
export const WHATSAPP = '21651055362';

/* Lien WhatsApp dont le message est déjà écrit pour le visiteur */
export const wa = (message) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;

export const ICONS = {
  logo: bf('logo.webp'),
  logoDark: bf('logo-dark.webp'),
  arrowWhite: asset('LzasmVp3TuTfYh2Xjorv2bsIy9U.svg'),
  arrowDark: asset('itvo00VfDXJghMUCRAANdLWOSdM.svg'),
  starWhite: asset('vvYLgdnkblJts4kNwtgItO3QOVU.svg'),
  starDark: asset('uSaDB0Z8qeiD4r3fFvcVLUQdo.svg'),
  sparkle: asset('OPuWjNw2x2IOMB9PY6jHyov3jGs.svg'),
  rip: asset('a2SXGBs72Zpt8udi2WLbyuE1V4.webp'),
  wordmark: asset('Y2ogyXYqrvewI2CERgvVFgFhbKQ.webp'),
  menuPhoto: bf('coach-amal.webp'),
  award: asset('LyPF4iT8pu5PfaI355ky5ESicjA.svg'),
};

export const NAV = [
  ['Accueil', '/'],
  ['Le club', '/about'],
  ['Planning', '/program'],
  ['Cours', '/service'],
  ['Coachs', '/team'],
  ['Tarifs', '/pricing'],
  ['Actualités', '/blog'],
  ['Contact', '/contact'],
];

export const SOCIALS = [['Instagram', BRAND.instagramUrl]];

export const PARTNERS = ['BH Fitness', 'Les Mills', 'GSN', 'Impact'];

/* Ce que chaque partenaire apporte concrètement au club — page « Le club » */
export const PARTNERSHIPS = [
  { name: 'Les Mills', note: 'Bodycombat et Bodypump, programmes et licences officiels' },
  { name: 'BH Fitness', note: 'Plateau musculation et parc cardio' },
  { name: 'GSN', note: 'Nutrition sportive et compléments du club' },
  { name: 'Impact', note: 'Accessoires et petit matériel des cours collectifs' },
];

/* Les trois principes qui décident du planning et de l'encadrement */
export const VALUES = [
  {
    title: 'Régularité',
    text: "Mieux vaut trois séances tenues chaque semaine qu'un mois d'intensité suivi de six mois d'absence. Tout le planning est construit là-dessus.",
  },
  {
    title: 'Encadrement',
    text: "Un coach à chaque cours collectif : il corrige les postures, adapte les mouvements et propose toujours une version allégée. Personne ne s'entraîne seul dans son coin.",
  },
  {
    title: 'Respect',
    text: "Un créneau 100% femmes tous les midis, du matériel rangé et des coachs qui connaissent ton prénom. On vient ici pour progresser, pas pour se comparer.",
  },
];

/* ---------------- Planning des cours collectifs ---------------- */
export const DAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];

/* Une entrée par créneau : { h, name, coach, tag } */
export const SCHEDULE = {
  Lundi: [
    { h: '08:30', name: '100% Abdos', coach: 'Oussema', tag: 'abdos' },
    { h: '12:00', name: '100% Femmes', tag: 'femmes' },
    { h: '19:00', name: 'Les Mills Bodycombat', coach: 'Hassen', tag: 'lesmills' },
    { h: '20:00', name: '100% Abdos', coach: 'Oussema', tag: 'abdos' },
  ],
  Mardi: [
    { h: '08:30', name: 'Spinning', tag: 'spinning' },
    { h: '12:00', name: '100% Femmes', tag: 'femmes' },
    { h: '19:00', name: 'Spinning', coach: 'Dorssaf', tag: 'spinning' },
    { h: '20:00', name: 'CAF', coach: 'Chrif', tag: 'caf' },
  ],
  Mercredi: [
    { h: '08:30', name: 'TRX Stretching', tag: 'trx' },
    { h: '12:00', name: '100% Femmes', tag: 'femmes' },
    { h: '19:00', name: 'Dance Oriental', coach: 'Yasmine', tag: 'dance' },
    { h: '20:00', name: 'Balance', coach: 'Mariem', tag: 'balance' },
  ],
  Jeudi: [
    { h: '08:30', name: 'CAF', coach: 'Chrif', tag: 'caf' },
    { h: '12:00', name: '100% Femmes', tag: 'femmes' },
    { h: '18:00', name: 'Cardio HIIT', tag: 'hiit' },
    { h: '19:00', name: 'Pilates', coach: 'Dorssaf', tag: 'pilates' },
    { h: '20:00', name: 'Step', coach: 'Salma', tag: 'step' },
    { h: '20:00', name: 'Cardio HIIT', tag: 'hiit' },
  ],
  Vendredi: [
    { h: '08:30', name: 'Cross', tag: 'cross' },
    { h: '12:00', name: '100% Femmes', tag: 'femmes' },
    { h: '19:00', name: 'Les Mills Bodypump', coach: 'Ahlem', tag: 'lesmills' },
    { h: '19:00', name: 'Bodycombat', coach: 'Dhia', tag: 'lesmills' },
    { h: '20:00', name: '100% Abdos', coach: 'Oussema', tag: 'abdos' },
  ],
};

export const WEEKEND = [
  { day: 'Samedi', label: BRAND.hoursWeekend, note: 'Salle ouverte' },
  { day: 'Dimanche', label: BRAND.hoursSunday, note: 'Salle ouverte' },
];

/* ---------------- Cours proposés ---------------- */
export const SERVICES = [
  {
    title: 'Les Mills Bodycombat',
    icon: 'zkB7Nhe5TJ8GEy9hEaLfayLvA.svg',
    text: "Cardio inspiré des arts martiaux : frappes, coups de pied et enchaînements sur une bande-son qui tape. On brûle, on relâche la pression, on repart plus fort. Lundi 19h et vendredi 19h.",
  },
  {
    title: 'Les Mills Bodypump',
    icon: 'uEDUy4mBTqLIJHBzACKsjGjBN8M.svg',
    text: "Barre chargée, répétitions élevées : le cours qui sculpte tout le corps et construit une vraie force fonctionnelle, sans matériel compliqué. Vendredi 19h avec coach Ahlem.",
  },
  {
    title: 'Spinning',
    icon: 'ioRhiO2100gHx0HHENO68qHzNk.svg',
    text: "Vélo en musique, en groupe, avec des intervalles qui montent en intensité. Le meilleur rapport effort/calories du planning, accessible quel que soit ton niveau. Mardi 8h30 et 19h.",
  },
  {
    title: 'CAF — Cuisses Abdos Fessiers',
    icon: 'gdI0up9qEND2i8n5KgG6rr2SZT0.svg',
    text: "Renforcement ciblé du bas du corps et de la sangle abdominale. Coordination, gainage, confiance : trois séries qui changent la posture. Jeudi 8h30 et mardi 20h avec coach Chrif.",
  },
  {
    title: '100% Abdos',
    icon: 'iyoRXYZeVH4ZSYzTlGE9wCOKj4.svg',
    text: "Une demi-heure entièrement dédiée à la sangle abdominale : gainage, obliques, transverse. Court, dense, efficace. Lundi et vendredi avec coach Oussema.",
  },
  {
    title: '100% Femmes',
    icon: 'RFgIhC5sOHkesRwMAuJECXjNjxk.svg',
    text: "Un créneau réservé, tous les midis de la semaine à 12h. Un espace où l'on progresse à son rythme, encadrée, sans regard ni pression.",
  },
  {
    title: 'Pilates & Balance',
    icon: 'ioRhiO2100gHx0HHENO68qHzNk.svg',
    text: "Travail postural, respiration, stabilité et mobilité articulaire. Le complément indispensable aux séances intenses. Jeudi 19h (Dorssaf) et mercredi 20h (Mariem).",
  },
  {
    title: 'Dance Oriental',
    icon: 'gdI0up9qEND2i8n5KgG6rr2SZT0.svg',
    text: "Lâche-toi, sens la musique, révèle ta féminité. Un cours qui fait travailler la coordination et le cardio sans jamais en avoir l'air. Mercredi 19h avec coach Yasmine.",
  },
];

/* ---------------- Programmes mis en avant ---------------- */
export const PROGRAMS = [
  {
    num: '01',
    title: 'Les Mills Bodycombat — Lundi 19h',
    image: 'bf:coach-amal.webp',
    weeks: 'Lundi 19h',
    tags: ['Bouger', 'Coordination', 'Renforcer'],
    note: 'Coach Amal',
  },
  {
    num: '02',
    title: 'CAF — Mardi 20h',
    image: 'bf:coach-chrif.webp',
    weeks: 'Mardi 20h',
    tags: ['Bouger', 'Coordination', 'Confiance'],
    note: 'Coach Chrif',
  },
  {
    num: '03',
    title: 'Spinning — Mardi 19h',
    image: 'bf:coach-dorssaf.webp',
    weeks: 'Mardi 19h',
    tags: ['Bouger', 'Confiance', 'Renforcer'],
    note: 'Coach Dorssaf',
  },
  {
    num: '04',
    title: 'Balance — Mercredi 20h',
    image: 'bf:coach-mariem.webp',
    weeks: 'Mercredi 20h',
    tags: ['Bouger', 'Coordination', 'Renforcer'],
    note: 'Coach Mariem',
  },
  {
    num: '05',
    title: 'Freestyle Step — Jeudi 20h',
    image: 'bf:coach-salma.webp',
    weeks: 'Jeudi 20h',
    tags: ['Bouger', 'Coordination', 'Renforcer'],
    note: 'Coach Salma',
  },
  {
    num: '06',
    title: 'Sprint Power — Vendredi 20h',
    image: 'bf:coach-dhia.webp',
    weeks: 'Vendredi 20h',
    tags: ['Performance', 'Intensité', 'Power'],
    note: 'Coach Dhia',
  },
];

/* ---------------- Coachs (visuels officiels du club) ---------------- */
export const COACHES = [
  { name: 'Dhia', role: 'Sprint / Power — Vendredi 20h', image: 'bf:coach-dhia.webp', focus: 'Performance / Intensité' },
  { name: 'Amal', role: 'Les Mills Bodycombat — Lundi 19h', image: 'bf:coach-amal.webp', focus: 'Bouger / Coordination' },
  { name: 'Chrif', role: 'CAF — Mardi 20h', image: 'bf:coach-chrif.webp', focus: 'Bouger / Coordination' },
  { name: 'Dorssaf', role: 'Spinning & Pilates — Mardi 19h', image: 'bf:coach-dorssaf.webp', focus: 'Bouger / Confiance' },
  { name: 'Mariem', role: 'Balance — Mercredi 20h', image: 'bf:coach-mariem.webp', focus: 'Bouger / Coordination' },
  { name: 'Oussema', role: 'Training Circuit — Lundi 20h', image: 'bf:coach-oussema.webp', focus: 'Cardio / Brûle-calories' },
  { name: 'Salma', role: 'Freestyle Step — Jeudi 20h', image: 'bf:coach-salma.webp', focus: 'Bouger / Coordination' },
];

/* ---------------- Offre exclusive — promo d'août ----------------
   Visuels au format 4:5, affichés sans recadrage (object-fit:contain).
   `wa` construit le message déjà rempli du CTA WhatsApp de chaque carte. */
export const PROMOS = [
  {
    id: '1mois',
    duration: '1 mois',
    price: 140,
    gift: 'Zinc Bisglycinate + Multivitamins',
    image: bf('promo/promo-1mois.webp'),
  },
  {
    id: '3mois',
    duration: '3 mois',
    price: 340,
    gift: 'Créatine 200 g + Zinc',
    image: bf('promo/promo-3mois.webp'),
  },
  {
    id: '6mois',
    duration: '6 mois',
    price: 560,
    gift: 'Beauty Up (femmes) ou Testo Anabolic (hommes)',
    note: 'Au choix',
    image: bf('promo/promo-6mois.webp'),
  },
  {
    id: '1an-a',
    duration: '1 an',
    price: 830,
    gift: 'Créatine 500 g + Zinc + Vitamine C',
    note: 'Formule A',
    image: bf('promo/promo-1an.webp'),
  },
  {
    id: '1an-b',
    duration: '1 an',
    price: 900,
    gift: 'Pure Whey 1 kg',
    note: 'Formule B',
    image: bf('promo/promo-cover.webp'),
  },
];

/* ---------------- Actualités ---------------- */
export const POSTS = [
  { title: 'Promo août — 1 mois à 140 DT, cadeau inclus', author: 'Best Fitness Soukra', image: 'bf:promo/promo-1mois.webp', date: 'Août 2026', contain: true },
  { title: 'Promo août — 3 mois à 340 DT + créatine 200 g', author: 'Best Fitness Soukra', image: 'bf:promo/promo-3mois.webp', date: 'Août 2026', contain: true },
  { title: 'Promo août — 6 mois à 560 DT, ton cadeau au choix', author: 'Best Fitness Soukra', image: 'bf:promo/promo-6mois.webp', date: 'Août 2026', contain: true },
  { title: 'Promo août — 1 an à 830 DT, le pack complet', author: 'Best Fitness Soukra', image: 'bf:promo/promo-1an.webp', date: 'Août 2026', contain: true },
  { title: 'Promo août — مدّة أطول، ربح أكبر', author: 'Best Fitness Soukra', image: 'bf:promo/promo-cover.webp', date: 'Août 2026', contain: true },
  { title: 'Sprint Power — le nouveau rendez-vous du vendredi', author: 'Coach Dhia', image: 'bf:coach-dhia.webp', date: 'Vendredi 20h' },
  { title: 'Dance Oriental : lâche-toi, sens la musique', author: 'Coach Yasmine', image: 'bf:dance-oriental.webp', date: 'Mercredi 19h' },
  { title: 'Freestyle Step, le cours qui fait oublier le cardio', author: 'Coach Salma', image: 'bf:coach-salma.webp', date: 'Jeudi 20h' },
  { title: 'Training Circuit : améliore ton cardio, brûle des calories', author: 'Coach Oussema', image: 'bf:coach-oussema.webp', date: 'Lundi 20h' },
  { title: 'Balance — renforcer par la stabilité', author: 'Coach Mariem', image: 'bf:coach-mariem.webp', date: 'Mercredi 20h' },
  { title: 'Fête des femmes au Best Fitness', author: 'Best Fitness Soukra', image: 'bf:fete-des-femmes.webp', date: 'Événement' },
];

/* ---------------- Tarifs ---------------- */
export const PRICES = [
  {
    title: 'Séance découverte',
    text: "Viens essayer un cours collectif, sans engagement. Tu repars avec un avis honnête sur ce qui te correspond.",
    tags: ['Premier pas', 'Sans engagement'],
    idx: '01',
    amount: 'Gratuit',
  },
  {
    title: 'Abonnement 1 mois',
    text: "Accès illimité à la salle et à tous les cours collectifs du planning, coachs inclus. Zinc Bisglycinate + Multivitamins offerts en août.",
    tags: ['Régularité', 'Sans engagement'],
    idx: '02',
    amount: '140 DT',
  },
  {
    title: 'Abonnement 3 mois',
    text: "Un trimestre pour installer le rythme, avec créatine 200 g et zinc offerts sur l'offre d'août.",
    tags: ['Progression', 'Cadeau inclus'],
    idx: '03',
    amount: '340 DT',
  },
  {
    title: 'Abonnement 6 mois',
    text: "Six mois d'accès illimité, avec ton cadeau au choix : Beauty Up pour les femmes ou Testo Anabolic pour les hommes.",
    tags: ['Engagement', 'Cadeau au choix'],
    idx: '04',
    amount: '560 DT',
  },
  {
    title: 'Abonnement 1 an',
    text: "L'année complète à 830 DT avec créatine 500 g, zinc et vitamine C — ou 900 DT avec 1 kg de Pure Whey.",
    tags: ['Meilleur prix', 'Deux formules'],
    idx: '05',
    amount: '830 DT',
  },
  {
    title: 'Coaching personnalisé',
    text: "Un coach rien que pour toi : bilan, programme sur mesure et suivi séance après séance.",
    tags: ['Sur mesure', 'Suivi'],
    idx: '06',
    amount: 'Nous consulter',
  },
];

export const TESTIMONIALS = [
  {
    name: 'Membre depuis 2023',
    since: 'Cours collectifs',
    avatar: asset('YOhmrNhQSS2mmV9TCMZKNB3BcI.webp'),
    text: "Le créneau de 12h m'a tout changé : je viens sur ma pause, une heure, et je repars lancée pour l'après-midi. Les coachs connaissent nos prénoms, ça compte plus qu'on ne croit",
  },
  {
    name: 'Membre depuis 2022',
    since: '100% Femmes',
    avatar: asset('glEpcdCS1d8fSQN6PCQdtSJsOg.webp'),
    text: "Je n'avais jamais mis les pieds dans une salle. Le créneau 100% femmes m'a permis de commencer sans me sentir jugée, et aujourd'hui je fais aussi du Bodypump le vendredi",
  },
  {
    name: 'Membre depuis 2024',
    since: 'Bodycombat',
    avatar: asset('cXF5Zf2egT5bwiTyuRZPicdJPns.webp'),
    text: "Le Bodycombat du lundi soir est devenu mon rendez-vous. On tape, on transpire, on rit, et on ressort la tête vidée. C'est la meilleure façon que j'ai trouvée de décompresser",
  },
];

export const FAQ = [
  ['Faut-il réserver les cours collectifs ?', "Les cours sont accessibles à tous les adhérents dans la limite des places. Pour les créneaux les plus demandés — Bodycombat du lundi, Spinning du mardi — mieux vaut arriver un peu en avance."],
  ['Je débute totalement, est-ce que je peux venir ?', "Oui. Chaque cours se module : les coachs proposent systématiquement une version allégée des mouvements. Commence par le créneau découverte, on t'orientera vers le cours adapté."],
  ['Le créneau 100% femmes, comment ça marche ?', "Tous les midis de la semaine, de 12h à 13h, la salle est réservée aux femmes. Un espace pour progresser à son rythme, encadrée, sans regard extérieur."],
  ['Quels sont les horaires du week-end ?', "Le samedi la salle est ouverte de 8h à 20h, et le dimanche de 9h à 15h. Accès libre les deux jours : pas de cours collectifs, mais un coach reste sur le plateau."],
  ['Que faut-il apporter ?', "Une tenue de sport, des chaussures propres réservées à la salle, une serviette et une bouteille d'eau. Le matériel des cours est fourni."],
  ['Proposez-vous du coaching individuel ?', "Oui, avec l'ensemble de l'équipe. Bilan de départ, programme sur mesure et suivi régulier. Contacte-nous au 51055362 pour en parler."],
  ['Les cours Les Mills sont-ils inclus ?', "Bodycombat et Bodypump sont inclus dans l'abonnement, sans supplément. Le club est licencié Les Mills."],
  ['Où se trouve la salle ?', "À La Soukra. Appelle le 51055362 ou passe par Instagram @bestfitness_soukra, on te donne l'adresse exacte et les accès."],
];

export const STATS = [
  { value: 30, suffix: '+', text: 'Cours collectifs par semaine, du lundi au vendredi' },
  { value: 7, suffix: '', text: 'Coachs diplômés qui vous suivent séance après séance' },
  { value: 12, suffix: 'h', text: 'Un créneau 100% femmes tous les midis de la semaine' },
];

export const KPIS = [
  { value: 30, suffix: '+', text: 'Cours collectifs par semaine' },
  { value: 7, suffix: '', text: 'Coachs diplômés' },
  { value: 12, suffix: 'h', text: 'Amplitude horaire quotidienne' },
  { value: 4, suffix: '', text: 'Marques partenaires' },
];
