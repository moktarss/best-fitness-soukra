import { PROMOS, wa } from '../data/content.js';
import { SplitTitle, SplitText, Reveal, Stagger, Counter, Marquee } from './motion.jsx';
import { Rip } from './Layout.jsx';
import { WhatsAppIcon } from './WhatsApp.jsx';

/* Message pré-rempli du CTA : le visiteur n'a plus qu'à appuyer sur envoyer */
const ask = (p) => `Bonjour, je suis intéressé(e) par le pack ${p.duration} à ${p.price} DT`;

/* ---------------- Offre exclusive (promo d'août) ----------------
   Bloc de conversion : bandeau défilant, cartes en cascade, prix compté
   et un CTA WhatsApp par pack. Les visuels sont au format 4:5 et ne sont
   jamais recadrés (object-fit:contain côté CSS). */
export function Promo() {
  return (
    <section className="section section--dark promo-sec">
      <div className="grid-lines" />

      <div className="promo-band full-bleed">
        <Marquee className="promo-band__track">
          <span className="promo-band__tag">Promo Août</span>
          <span className="promo-band__ar" lang="ar" dir="rtl">
            مدّة أطول، ربح أكبر
          </span>
          <span className="promo-band__tag">Plus tu restes, plus tu gagnes</span>
          <span className="promo-band__ar" lang="ar" dir="rtl">
            اختار اشتراكك
          </span>
        </Marquee>
      </div>

      <div className="container stack g50">
        <div className="promo-head">
          <SplitTitle
            className="d2"
            parts={[{ text: 'Offre' }, { text: 'exclusive', className: 'accent' }]}
          />
          <SplitText className="bq" style={{ color: '#fff', maxWidth: 380 }}>
            Cinq packs, un cadeau sur chacun. Choisis ta durée, on
            s'occupe du reste — réponse immédiate sur WhatsApp
          </SplitText>
        </div>

        <Stagger className="promo-grid" step={0.09}>
          {PROMOS.map((p) => (
            <Reveal key={p.id} kind="up" inStagger as="article" className="promo-card">
              <span className="promo-card__badge">Offre limitée</span>

              <div className="promo-card__img">
                <img src={p.image} alt={`Pack ${p.duration} — ${p.price} DT`} loading="lazy" />
              </div>

              <div className="promo-card__body">
                <h3 className="promo-card__dur">
                  {p.duration}
                  {p.note && <em>{p.note}</em>}
                </h3>
                <Counter className="promo-card__price" value={p.price} suffix=" DT" />
                <p className="promo-card__gift">{p.gift}</p>
              </div>

              <a
                className="promo-card__cta"
                href={wa(ask(p))}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Réserver le pack ${p.duration} à ${p.price} DT sur WhatsApp`}
              >
                <WhatsAppIcon size={18} />
                <span>Je réserve</span>
              </a>
            </Reveal>
          ))}
        </Stagger>

        <Reveal kind="up-sm" as="p" className="promo-note">
          Cadeaux offerts dans la limite des stocks. Le pack 1 an existe en deux formules :
          830 DT avec créatine 500 g, zinc et vitamine C, ou 900 DT avec 1 kg de Pure Whey.
        </Reveal>
      </div>

      <Rip side="bottom" />
    </section>
  );
}
