import { bf } from '../data/content.js';
import { Reveal, Stagger, Scrub } from './motion.jsx';

/* Photos réelles du club — une prise par sujet, pas de doublon.
   La grille alterne portraits et paysages pour éviter l'effet catalogue. */
export const SHOTS = [
  { file: 'salle-neon.webp',      alt: 'Espace Les Mills et mur végétal néon',    span: 'wide' },
  { file: 'salle-allee.webp',     alt: 'Allée des machines',                       span: 'tall' },
  { file: 'salle-cours.webp',     alt: 'Salle de cours collectifs',                span: 'sq' },
  { file: 'salle-believe.webp',   alt: 'Néon « Believe in yourself »',             span: 'sq' },
  { file: 'salle-plateau.webp',   alt: 'Plateau musculation et cardio',            span: 'wide' },
  { file: 'salle-cardio.webp',    alt: 'Tapis de course avec vue sur l’extérieur', span: 'sq' },
  { file: 'salle-attente.webp',   alt: 'Espace détente et accueil',                span: 'sq' },
  { file: 'salle-nutrition.webp', alt: 'Coin nutrition et boissons',               span: 'tall' },
  { file: 'salle-accueil.webp',   alt: 'Comptoir Best Fitness',                    span: 'wide' },
  /* la photo du trophée est désormais en paysage (1600×1067) : cellule large */
  { file: 'salle-trophee.webp',   alt: 'La statue dorée du club',                   span: 'wide' },
  { file: 'salle-anela.webp',     alt: 'Anela Motion Academy',                     span: 'sq' },
];

export function Gallery({ items = SHOTS }) {
  return (
    <Stagger className="gallery" step={0.07} amount={0.05}>
      {items.map((s) => (
        <Reveal key={s.file} kind="up" inStagger className={`gallery__item gallery__item--${s.span}`}>
          <Scrub as="img" s={1.12} src={bf(s.file)} alt={s.alt} loading="lazy" />
        </Reveal>
      ))}
    </Stagger>
  );
}
