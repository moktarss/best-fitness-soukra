import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { asset, bf, src, ICONS, SERVICES, PROGRAMS, PRICES, FAQ } from '../data/content.js';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Reveal, Stagger, Scrub, MaskWord, riseIn, EASE } from './motion.jsx';

/* Paragraphe courant des cartes */
export function Bq({ children, className = '', ...rest }) {
  return (
    <p className={`bq ${className}`.trim()} {...rest}>
      {children}
    </p>
  );
}

/* Le personnage détouré n'est monté que sur téléphone : sur grand écran
   la photo de la salle porte seule le hero, et ses 108 Ko ne sont même
   pas téléchargés. La requête média est la même que celle du CSS. */
function usePhone() {
  const query = '(max-width:809px)';
  const [phone, setPhone] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = (e) => setPhone(e.matches);
    setPhone(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return phone;
}

/* ---------------- Hero « Elite Fitness » -------------------------------------
   Animation d'ouverture en calques, puis parallaxe au défilement :
   le ciel se dévoile et dérive lentement, le lettrage monte mot par mot
   derrière une fenêtre, le personnage remonte du bas, le pied s'écrit ensuite.
   ---------------------------------------------------------------------------- */
export function HeroElite() {
  const ref = useRef(null);
  const still = useReducedMotion();
  const phone = usePhone();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  /* les calques ne défilent pas à la même vitesse : c'est ce décalage qui
     donne la profondeur — ciel lent, titre rapide, personnage à contre-sens */
  const skyY = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const personY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const footY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const footFade = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const par = (style) => (still ? undefined : style);

  return (
    <section className="hero-ef" ref={ref}>
      <motion.div className="hero-ef__bg" style={par({ y: skyY })}>
        <motion.img
          className="hero-ef__sky"
          src={bf('hero-neon.webp')}
          alt=""
          initial={still ? { opacity: 0 } : { opacity: 0, filter: 'blur(16px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: still ? 0.4 : 1.6, ease: EASE }}
        />
      </motion.div>

      {phone && (
        <div className="hero-ef__stage">
          <motion.div className="hero-ef__person" style={par({ y: personY })}>
            <motion.img
              src={asset('Rw9riErv2ZEQVqFVpx9oBGodl6E.webp')}
              alt=""
              initial={still ? { opacity: 0 } : { opacity: 0, y: 80, scale: 1.07 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: still ? 0.4 : 1.4, ease: EASE, delay: still ? 0 : 0.3 }}
            />
          </motion.div>
        </div>
      )}

      <motion.div className="hero-ef__title" style={par({ y: titleY })}>
        <h1>
          <MaskWord delay={0.15}>Best</MaskWord>
        </h1>
        <div className="hero-ef__line2">
          <h1>
            <MaskWord delay={0.27}>Fitness</MaskWord>
          </h1>
          <h1>
            <MaskWord delay={0.39}>Soukra</MaskWord>
          </h1>
        </div>
      </motion.div>

      <motion.div className="hero-ef__foot" style={par({ y: footY, opacity: footFade })}>
        <motion.p className="hero-ef__tag" {...riseIn(0.72, { still })}>
          Plus fort chaque jour.
        </motion.p>
        <div className="hero-ef__aside">
          <motion.p {...riseIn(0.84, { still })}>
            Plus de trente cours collectifs par semaine, sept coachs diplômés et un créneau
            100% femmes tous les midis. À La Soukra.
          </motion.p>
          <motion.div {...riseIn(0.96, { still, y: 18 })}>
            <Link className="btn-ef" to="/program">
              Voir le planning
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

/* ---------------- Grille de services ---------------- */
export function ServiceGrid({ items = SERVICES, to = '/service' }) {
  return (
    <Stagger className="svc-grid" step={0.1}>
      {items.map((s) => (
        <Reveal key={s.title} kind="up" inStagger to={to} className="svc-card">
          <div>
            <h3 className="d4">{s.title}</h3>
            <Bq style={{ marginTop: 18 }}>{s.text}</Bq>
          </div>
          <div className="svc-icon">
            <img src={asset(s.icon)} alt="" />
          </div>
        </Reveal>
      ))}
    </Stagger>
  );
}

/* ---------------- Accordéon des programmes ---------------- */
export function ProgramList({ items = PROGRAMS, showTags = false }) {
  const [active, setActive] = useState(0);

  return (
    <Stagger className="prog-list" step={0.1}>
      {items.map((p, i) => (
        <Reveal
          key={p.num}
          kind="up"
          inStagger
          as="article"
          className={'prog-item' + (active === i ? ' is-active' : '')}
          onClick={() => setActive(active === i ? -1 : i)}
        >
          <div className="prog-head">
            <div className="prog-num">{p.num}</div>
            <h3 className="prog-title">{p.title}</h3>
          </div>
          <div className="prog-body">
            <div>
              {/* affiche entière (format story 9:16) + détails à côté */}
              <div className="prog-reveal">
                <div className="prog-poster">
                  <img src={src(p.image)} alt={p.title} loading="lazy" />
                </div>
                <div className="prog-detail">
                  <span className="prog-detail__when">{p.weeks}</span>
                  <strong className="prog-detail__coach">{p.note}</strong>
                  {showTags && (
                    <div className="price-tags">
                      {p.tags.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      ))}
    </Stagger>
  );
}

/* ---------------- Tableau tarifaire ---------------- */
export function PriceTable({ items = PRICES }) {
  return (
    <Stagger className="price-table" step={0.1}>
      {items.map((p) => (
        <Reveal key={p.idx} kind="down" inStagger to="/contact" className="price-row">
          <h3>{p.title}</h3>
          <div className="pr-desc">
            <p>{p.text}</p>
            <div className="price-tags">
              {p.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>
          <div className="price-val">
            <em className="idx">{p.idx}</em>
            <div className="amt">{p.amount}</div>
          </div>
        </Reveal>
      ))}
    </Stagger>
  );
}

/* ---------------- FAQ ---------------- */
export function Faq({ items = FAQ }) {
  const [open, setOpen] = useState(0);
  return (
    <Stagger className="faq" step={0.06}>
      {items.map(([q, a], i) => (
        <Reveal
          key={q}
          kind="up"
          inStagger
          className={'faq-item' + (open === i ? ' is-open' : '')}
        >
          <button className="faq-q" type="button" onClick={() => setOpen(open === i ? -1 : i)}>
            <span>
              {i + 1} - {q}
            </span>
            <span className="sign" />
          </button>
          <div className="faq-a">
            <div>
              <p>{a}</p>
            </div>
          </div>
        </Reveal>
      ))}
    </Stagger>
  );
}

/* ---------------- Cartes coachs ---------------- */
export function TeamGrid({ items }) {
  return (
    <Stagger className="team-grid" step={0.09}>
      {items.map((c) => (
        <Reveal key={c.name} kind="up" inStagger to="/contact" className="team-card">
          <div className="team-card__img">
            <img src={src(c.image)} alt={c.name} />
          </div>
          <h3>{c.name}</h3>
          <span className="focus">{c.focus}</span>
          <span>{c.role}</span>
        </Reveal>
      ))}
    </Stagger>
  );
}

/* ---------------- Cartes blog ---------------- */
export function BlogGrid({ items, cols = 2 }) {
  return (
    <Stagger className={'blog-grid' + (cols === 3 ? ' blog-grid--3' : '')} step={0.09}>
      {items.map((p) => (
        <Reveal key={p.title} kind="up" inStagger to="/blog" className="blog-card">
          {/* les affiches promo sont en 4:5 : jamais recadrées */}
          <div className={'blog-card__img' + (p.contain ? ' blog-card__img--contain' : '')}>
            <img src={src(p.image)} alt={p.title} />
          </div>
          <h3>{p.title}</h3>
          <div className="blog-meta">
            <span>{p.author}</span>
            <span>-</span>
            <span>{p.date}</span>
          </div>
        </Reveal>
      ))}
    </Stagger>
  );
}

export { Scrub, ICONS };
