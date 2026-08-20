# Best Fitness — La Soukra

Site du club **Best Fitness Soukra**, en React + Vite, animé avec framer-motion.
Design repris du template Framer Fitova, hero d'après Elite Fitness, identité
et contenus du club.

## Démarrer

```bash
npm install
npm run dev
```

<http://127.0.0.1:5173/> · `npm run build` → `dist/` · `npm run preview`

## Identité

| | |
|---|---|
| Accent | **`#e8ff36`** — R232 G255 B54 — PANTONE 388 |
| Sombre | `#171717` · fond des sections |
| Logo | `public/assets/bf/logo.png` (détouré, fond transparent) |
| Contact | La Soukra · 51055362 · @bestfitness_soukra |
| Partenaires | BH Fitness · Les Mills · GSN · Impact |

Le token s'appelle `--accent` dans `src/styles/style.css` : un seul endroit à
changer pour repeindre tout le site.

## Contenus du club

Tout est centralisé dans **`src/data/content.js`** :

- `SCHEDULE` — le planning hebdomadaire, créneau par créneau, avec le coach
- `COACHES` — les 7 coachs et leur affiche officielle
- `SERVICES` — les 8 familles de cours
- `PROGRAMS` — les rendez-vous du soir mis en avant
- `PROMOS` — les cinq packs de l'offre d'août
- `PRICES`, `FAQ`, `STATS`, `KPIS`, `TESTIMONIALS`, `BRAND`
- `WHATSAPP` et `wa(message)` — le numéro du club et le constructeur de lien
  `wa.me` avec message pré-rempli

Pour modifier le planning, il suffit d'éditer `SCHEDULE` : la grille, les
couleurs par type de cours et la page Planning se mettent à jour seules.

### Horaires

| | |
|---|---|
| Lundi → vendredi | `BRAND.hoursWeek` — 8h30 → 21h, cours collectifs |
| Samedi | `BRAND.hoursWeekend` — 8h → 20h, accès libre |
| Dimanche | `BRAND.hoursSunday` — **9h → 15h**, accès libre |

Le dimanche n'est plus un jour de fermeture. Les trois valeurs viennent de
`BRAND` : le tableau `WEEKEND`, le bloc « cours du jour », la FAQ, la page
Contact et le footer les lisent toutes au même endroit.

## Offre exclusive (promo d'août)

`src/components/Promo.jsx`, alimenté par `PROMOS`. Le bloc est monté juste
après le hero sur `/` et en tête de `/pricing`.

| Durée | Prix | Cadeau |
|---|---|---|
| 1 mois | 140 DT | Zinc Bisglycinate + Multivitamins |
| 3 mois | 340 DT | Créatine 200 g + Zinc |
| 6 mois | 560 DT | Beauty Up (femmes) **ou** Testo Anabolic (hommes) |
| 1 an — A | 830 DT | Créatine 500 g + Zinc + Vitamine C |
| 1 an — B | 900 DT | Pure Whey 1 kg |

Bandeau `--accent` en marquee (« PROMO AOÛT — مدّة أطول، ربح أكبر »), cartes en
cascade (`Stagger`), survol qui soulève la carte et allume un halo, prix animé
au `Counter`, badge « offre limitée » et, sur chaque carte, un CTA WhatsApp dont
le message est déjà écrit (« Bonjour, je suis intéressé(e) par le pack 3 mois à
340 DT »). Les visuels de `public/assets/bf/promo/` sont en 4:5 et affichés en
`object-fit: contain` : ils ne sont jamais recadrés, ni ici ni sur `/blog`.

Les mêmes montants sont repris dans `PRICES`, donc dans le tableau tarifaire.

## Bouton flottant WhatsApp

`src/components/WhatsApp.jsx`, monté dans `App.jsx` : présent sur toutes les
pages. Pastille `--accent`, icône SVG inline, anneau qui pulse lentement,
libellé « Écris-nous » qui se déplie au survol et au focus clavier. Sur mobile
la pastille reste seule pour ne pas masquer le contenu ; sous
`prefers-reduced-motion` la pulsation s'arrête et le libellé reste déplié.
`WhatsAppIcon` est réutilisée par les CTA des cartes promo.

## Visuels du club

`public/assets/bf/` :

```
logo.png / logo-dark.png     logo détouré (blanc / sombre)
coach-dhia.png               Sprint · Power — vendredi 20h
coach-amal.png               Les Mills Bodycombat — lundi 19h
coach-chrif.png              CAF — mardi 20h
coach-dorssaf.png            Spinning — mardi 19h
coach-mariem.png             Balance — mercredi 20h
coach-oussema.png            Training Circuit — lundi 20h
coach-salma.png              Freestyle Step — jeudi 20h
dance-oriental.png           Dance Oriental — mercredi 19h
fete-des-femmes.png          visuel événement
planning.png                 planning source
```

Toutes les images sont en **WebP** (35 Mo → 6 Mo, −83 %). Les affiches sont en
1080×1920 et s'affichent en 9:16 **sans recadrage** : `object-fit: contain`
dans l'accordéon des cours, `cover` sur les cartes coachs dont le format est
calé au pixel sur celui des affiches.

## Structure

```
src/
├── main.jsx · App.jsx           montage + routes
├── data/content.js              tout le contenu du club
├── components/
│   ├── motion.jsx               SplitTitle · MaskWord · riseIn · Reveal · Stagger · Scrub · Counter
│   ├── Planning.jsx             grille du planning hebdomadaire
│   ├── Layout.jsx               Header (logo) · Footer · marquee
│   ├── Promo.jsx                offre exclusive (packs + CTA WhatsApp)
│   ├── WhatsApp.jsx             icône SVG + bouton flottant
│   └── blocks.jsx               hero · cours · coachs · tarifs · FAQ
├── pages/Home.jsx · Inner.jsx
└── styles/style.css
```

## Routes

`/` accueil · `/about` le club · `/program` planning · `/service` cours ·
`/team` coachs · `/pricing` tarifs · `/blog` actualités · `/contact` · 404

## Animations

Voir `src/components/motion.jsx`. Blur-in mot par mot sur les titres, cascade
sur les grilles, et scroll-scrub (`useScroll` + `useTransform`) sur les blocs
et photos — valeurs relevées sur le template d'origine.

### Hero

Le hero joue une ouverture en calques, puis chaque calque défile à sa propre
vitesse (parallaxe) :

| Calque | À l'ouverture | Au défilement |
|---|---|---|
| Ciel | net à partir d'un flou de 16 px, 1,6 s | descend de 8 % + dérive lente en boucle (`@keyframes hero-sky`, 34 s) |
| Lettrage | chaque mot monte derrière un volet (`<MaskWord>`), décalé de 0,12 s | monte de 110 px |
| Personnage | remonte de 80 px en se réduisant de 1,07 à 1, à 0,3 s | descend de 60 px (contre-sens du titre) |
| Pied | blur-in en cascade à 0,72 s / 0,84 s / 0,96 s | monte de 40 px et s'efface |

Le personnage est centré par `.hero-ef__stage` en flex, et non par une
transformée : la transformée reste libre pour la parallaxe. Sous
`prefers-reduced-motion`, tout se réduit à un fondu et le ciel se fige.

Le hero est **plein écran sur tous les formats** (`min-height: 100svh` avec
repli `100vh`). En dessous de 810 px, le calque du personnage repasse dans le
flux et absorbe la hauteur restante (`flex: 1` + `object-fit: contain`), avec un
`order` explicite pour que titre / personnage / pied restent dans le bon ordre.
Titre et textes sont en `clamp()` — le titre suit aussi la hauteur (`13vh`) pour
tenir sur un écran court sans jamais déborder.

## Footer

`Footer` dans `src/components/Layout.jsx` : quatre colonnes en grille
responsive (4 → 2 → 1), apparitions en cascade sobres (`Stagger` + `Reveal`).

- **Marque** — logo blanc, baseline, accroche `اختار اشتراكك`
- **Horaires** — lundi→vendredi, samedi, dimanche 9h → 15h
- **Navigation** — les huit routes
- **Contact** — téléphone, Instagram, itinéraire Maps, bouton WhatsApp

puis la barre des partenaires et la barre légale. Le logo source est **déjà
blanc** : aucun `filter: invert()` ne doit lui être appliqué, c'est ce qui le
rendait noir sur fond noir. Le formulaire du footer a été retiré — il faisait
doublon avec celui de `/contact`.

## Photos du club

`src/components/Gallery.jsx` — grille 4 colonnes (2 sur mobile) en
`grid-auto-flow: dense`, mélange de formats larges, hauts et carrés. Onze
photos réelles du club, une prise par sujet : espace Les Mills et mur néon,
allée des machines, salle de cours collectifs, néon « Believe in yourself »,
plateau, cardio avec vue, espace détente, coin nutrition, comptoir d'accueil,
trophée, Anela Motion Academy.

La photo du trophée est la vraie statue dorée du club, désormais en **paysage**
(1600×1067) : sa cellule est passée de `sq` à `wide` dans `SHOTS`.

Les 19 photos sources ont été passées à l'empreinte perceptuelle : un seul
doublon réel (`IMG_3603` / `IMG_3603_1`), écarté. Chaque image est
redimensionnée puis convertie en WebP (8,1 Mo → ~200 Ko en moyenne).

## Cours du jour

`src/components/Today.jsx` calcule le jour courant et affiche les créneaux du
jour au-dessus du planning :

- les cours déjà passés sont grisés,
- le prochain cours est mis en avant en `--accent`,
- le week-end affiche les horaires d'accès libre — samedi 8h → 20h,
  dimanche 9h → 15h — et non plus « Club fermé »,
- la colonne du jour est surlignée dans la grille hebdomadaire.

Aucune configuration : tout se déduit de `SCHEDULE` et de l'heure du visiteur.

## À faire avant mise en ligne

- **Photo du hero** : encore la photo du template Elite Fitness. À remplacer
  par une photo du club.
- **Formulaires** : démos front, à brancher sur un service d'envoi. Le CTA
  WhatsApp, lui, est déjà fonctionnel.
