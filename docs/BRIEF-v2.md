# Best Fitness Soukra — chantier v2

Site React + Vite + framer-motion. Tout le contenu vient de `src/data/content.js`,
tout le CSS de `src/styles/style.css` (fichier en **CRLF**), les briques d'animation
de `src/components/motion.jsx` (`Reveal`, `Stagger`, `SplitTitle`, `MaskWord`,
`riseIn`, `Scrub`, `Counter`, `Marquee`). Aucune nouvelle dépendance.
`npm run build` doit passer à la fin.

## 1. Hero plein écran
`.hero-ef` (style.css ~l.310) : `min-height:min(96vh,800px)` → plein écran réel sur
tous les formats (`100svh` avec repli `100vh`), y compris le breakpoint 1023px qui
force aujourd'hui `min-height:auto`. Sur mobile (375×667) la composition — titre,
personnage, pied — doit tenir dans l'écran sans débordement : tailles fluides en
`clamp()`, le personnage prend la hauteur restante. Vérifier 375 / 768 / 1280 / 1920.

## 2. Dimanche ouvert 9h → 15h
La salle n'est plus fermée le dimanche. À corriger partout :
- `content.js` : `BRAND.hoursSunday = '9H → 15H'`, tableau `WEEKEND` (l.90),
  FAQ « Quels sont les horaires du week-end ? » (l.262)
- `src/components/Today.jsx` (l.32-45) : le dimanche affiche les horaires, plus « Club fermé »
- `src/pages/Inner.jsx` l.411 : « Samedi 8h → 20h · Dimanche 9h → 15h »

## 3. Nouveau bloc « Offre exclusive » (promo d'août) — pièce maîtresse
Nouveau composant `src/components/Promo.jsx`, données `PROMOS` dans `content.js`,
placé **juste après le hero** sur `/` et en tête de `/pricing`. Cinq packs :

| Durée | Prix | Cadeau |
|---|---|---|
| 1 mois | 140 DT | Zinc Bisglycinate + Multivitamins |
| 3 mois | 340 DT | Créatine 200 g + Zinc |
| 6 mois | 560 DT | au choix : Beauty Up (femmes) **ou** Testo Anabolic (hommes) |
| 1 an — A | 830 DT | Créatine 500 g + Zinc + Vitamine C |
| 1 an — B | 900 DT | Pure Whey 1 kg |

Visuels déjà convertis : `/assets/bf/promo/promo-1mois.webp`, `promo-3mois.webp`,
`promo-6mois.webp`, `promo-1an.webp`, `promo-cover.webp` (format 4:5, **jamais
recadrés** : `object-fit:contain`).

Objectif = convertir. Bandeau « PROMO AOÛT — مدّة أطول، ربح أكبر » en marquee,
cartes en cascade (`Stagger`), survol qui soulève la carte et allume un halo
`--accent`, prix en `Counter`, badge « offre limitée », et sur chaque carte un CTA
WhatsApp avec message pré-rempli (« Bonjour, je suis intéressé(e) par le pack 3 mois
à 340 DT »). Respecter `prefers-reduced-motion`.

## 4. Tarifs réels
`PRICES` (content.js l.213) : reprendre les montants ci-dessus en DT. Garder la séance
découverte gratuite et le coaching personnalisé en « Nous consulter ».

## 5. Supprimer « À l'affiche »
`src/pages/Home.jsx` l.234-258 : retirer la section entière (titre « À l'affiche »
+ `BlogGrid`). Ne pas casser l'alternance clair/sombre des sections voisines.

## 6. Actualités
`POSTS` (content.js l.203) : ajouter en tête les cinq visuels promo (titre, date
« Août 2026 », auteur « Best Fitness Soukra »), pour qu'ils s'affichent sur `/blog`.

## 7. Contact plus compact
`src/pages/Inner.jsx`, section « Où nous trouver » (l.389-418) : bloc plus resserré,
photo d'emplacement `/assets/bf/salle-facade.webp` (la façade du club) + formulaire
côte à côte, animés. Ajouter un bouton « Itinéraire » vers
https://maps.app.goo.gl/mBAmD5hBd9kNEGLF8 et le lien Instagram
https://www.instagram.com/bestfitness_soukra/.

## 8. Footer refondu
`src/components/Layout.jsx` l.153-239 + CSS l.631-670 / l.901.
Problème actuel : le logo est **noir sur fond noir** (`.footer-brand img{height:38px}`
écrase le `filter:invert(1)` de `.footer-mark img`) et la structure est brouillonne.
Refaire un footer lisible : colonne marque (logo blanc + baseline), colonne horaires
(lundi→vendredi, samedi, dimanche 9h→15h), colonne navigation, colonne contact
(téléphone, Instagram, itinéraire Maps), partenaires, barre légale. Grille responsive,
apparitions en cascade sobres.

## 9. Bouton flottant WhatsApp
Sur toutes les pages (monté dans `Layout`/`App`) : `https://wa.me/21651055362` avec
message pré-rempli. Design salle de sport : pastille `--accent`, icône WhatsApp SVG
inline, pulsation lente, libellé qui se déplie au survol, `aria-label`, ne masque pas
le contenu sur mobile, se fige sous `prefers-reduced-motion`.

## 10. Ancrage tunisien
Prix en DT, téléphone +216 51055362, La Soukra / Tunis, quelques accroches en arabe
tunisien comme sur les visuels (« اختار اشتراكك ») là où c'est naturel.

## 11. Trophée
`public/assets/bf/salle-trophee.webp` a déjà été remplacé par la vraie statue dorée du
club — la photo est maintenant en **paysage** (1600×1067) alors que l'ancienne était en
portrait. Vérifier le rendu dans `src/components/Gallery.jsx` et ajuster la cellule.
