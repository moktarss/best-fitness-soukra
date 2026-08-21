import { useRef, useEffect, useState, Fragment, Children } from 'react';
import { motion, useScroll, useTransform, useInView, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';

/* Lien de routage animable (évite un rechargement complet de page) */
export const MLink = motion(Link);

/* Courbe d'accélération relevée sur le site de référence */
export const EASE = [0.44, 0, 0.06, 1];
export const DUR = 0.8;

const VIEWPORT = { once: true, amount: 0.15, margin: '0px 0px -8% 0px' };

/* ------------------------------------------------------------------
   Variantes d'apparition — amplitudes relevées sur l'original
   ------------------------------------------------------------------ */
export const VARIANTS = {
  up:      { hidden: { opacity: 0, y: 80 },  show: { opacity: 1, y: 0 } },
  down:    { hidden: { opacity: 0, y: -80 }, show: { opacity: 1, y: 0 } },
  'up-sm': { hidden: { opacity: 0, y: 28 },  show: { opacity: 1, y: 0 } },
  fade:    { hidden: { opacity: 0 },         show: { opacity: 1 } },
  blur: {
    hidden: { opacity: 0, filter: 'blur(10px)', y: 10 },
    show:   { opacity: 1, filter: 'blur(0px)', y: 0 },
  },
  img: {
    hidden: { opacity: 0, clipPath: 'inset(12% 6% 12% 6% round 12px)', scale: 1.06 },
    show:   { opacity: 1, clipPath: 'inset(0% 0% 0% 0% round 12px)', scale: 1 },
  },
  /* le lettrage fantôme ne monte qu'à 4 % d'opacité */
  ghost:      { hidden: { opacity: 0, y: 80 },  show: { opacity: 0.04, y: 0 } },
  'ghost-up': { hidden: { opacity: 0, y: -80 }, show: { opacity: 0.04, y: 0 } },
};

const transition = { duration: DUR, ease: EASE };

/* ------------------------------------------------------------------
   <Reveal> — apparition à l'entrée dans l'écran.
   Placé dans un <Stagger>, il laisse le parent orchestrer la cascade.
   ------------------------------------------------------------------ */
export function Reveal({
  kind = 'up',
  as = 'div',
  to,
  inStagger = false,
  className,
  children,
  ...rest
}) {
  // `to` => lien de routage animé, sinon la balise demandée
  const Tag = to ? MLink : motion[as] || motion.div;
  if (to) rest = { ...rest, to };
  const variants = VARIANTS[kind] || VARIANTS.up;

  if (inStagger) {
    return (
      <Tag className={className} variants={variants} transition={transition} {...rest}>
        {children}
      </Tag>
    );
  }
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={variants}
      transition={transition}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------
   <Stagger> — cascade : le parent pilote le délai de ses enfants
   ------------------------------------------------------------------ */
export function Stagger({ step = 0.1, as = 'div', amount = 0.1, className, children, ...rest }) {
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount, margin: '0px 0px -6% 0px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: step } } }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------
   <SplitTitle> — blur-in mot par mot.
   parts : [{ text, className }, { img, alt, imgClass }]
   ------------------------------------------------------------------ */
export function SplitTitle({ as = 'h2', className, parts = [], step = 0.06, ...rest }) {
  const Tag = motion[as] || motion.h2;
  let i = 0;

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2, margin: '0px 0px -8% 0px' }}
      variants={{ hidden: {}, show: {} }}
      {...rest}
    >
      {parts.map((part, pi) => {
        if (part.img) {
          return (
            <img
              key={'i' + pi}
              className={part.imgClass || 'star-inline'}
              src={part.img}
              alt={part.alt || ''}
            />
          );
        }
        const words = String(part.text).split(/\s+/).filter(Boolean);
        return words.map((w, wi) => {
          const delay = i++ * step;
          /* l'espace est un nœud frère : à l'intérieur d'un inline-block il
             serait avalé et les mots se colleraient */
          return (
            <Fragment key={pi + '-' + wi}>
              <span className="split-word" style={part.style}>
                <motion.i
                  className={part.className}
                  variants={VARIANTS.blur}
                  transition={{ ...transition, delay }}
                >
                  {w}
                </motion.i>
              </span>{' '}
            </Fragment>
          );
        });
      })}
    </Tag>
  );
}

/* ------------------------------------------------------------------
   <Scrub> — animation liée au défilement.
   C'est le mécanisme du site de référence : useScroll + useTransform,
   progression linéaire branchée sur la position de scroll.
   ------------------------------------------------------------------ */
/* Sur téléphone la glissée horizontale est annulée : l'élément arrivait
   décalé hors écran et ne se remettait en place qu'une fois défilé. */
const ampli = (w) => (w < 810 ? 0 : Math.min(1, w / 1200));

function useAmp() {
  const [amp, setAmp] = useState(() =>
    typeof window === 'undefined' ? 1 : ampli(window.innerWidth)
  );
  useEffect(() => {
    const onResize = () => setAmp(ampli(window.innerWidth));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return amp;
}

export function Scrub({
  x = 0,
  y = 0,
  s = 1,
  as = 'div',
  offset = ['start end', 'start 0.15'],
  className,
  children,
  ...rest
}) {
  const ref = useRef(null);
  const amp = useAmp();
  const { scrollYProgress } = useScroll({ target: ref, offset });

  const tx = useTransform(scrollYProgress, [0, 1], [x * amp, 0]);
  const ty = useTransform(scrollYProgress, [0, 1], [y, 0]);
  const sc = useTransform(scrollYProgress, [0, 1], [s, 1]);

  const Tag = motion[as] || motion.div;
  return (
    <Tag ref={ref} className={className} style={{ x: tx, y: ty, scale: sc }} {...rest}>
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------
   <Counter> — compteur animé au premier passage
   ------------------------------------------------------------------ */
export function Counter({ value, prefix = '', suffix = '', duration = 1600, className, as = 'div' }) {
  const Tag = as;
  const ref = useRef(null);
  const still = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.6 });
  /* sans animation, la valeur finale est posée d'emblée */
  const [n, setN] = useState(() => (still ? value : 0));

  useEffect(() => {
    if (!inView) return;
    if (still) {
      setN(value);
      return;
    }
    let raf, t0;
    const step = (t) => {
      if (!t0) t0 = t;
      const p = Math.min((t - t0) / duration, 1);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration, still]);

  return (
    <Tag ref={ref} className={className}>
      {prefix}
      {n.toLocaleString('en-US')}
      {suffix}
    </Tag>
  );
}

/* ------------------------------------------------------------------
   <Marquee> — défilement infini (contenu dupliqué)
   ------------------------------------------------------------------ */
/* Défilement infini. La piste est translatée de -50 %, donc de la moitié de
   ses copies : pour qu'aucun trou ne traverse la bande, cette moitié doit à
   elle seule couvrir l'écran. Le nombre de copies est donc calculé sur la
   largeur réelle du contenu — figé à la main, il laissait un trou sur grand
   écran, ou fabriquait une piste de 5 000 px que le téléphone peinait à
   animer. Le CSS lit --mq-copies pour allonger la durée d'autant : la
   vitesse ne dépend jamais du nombre de copies. */
export function Marquee({ className = 'marquee__track', repeat, style, children, ...rest }) {
  const ref = useRef(null);
  const [copies, setCopies] = useState(repeat || 2);

  useEffect(() => {
    if (repeat) return undefined; // nombre imposé : on ne recalcule pas
    const el = ref.current;
    if (!el) return undefined;
    const ajuste = () => {
      const jeu = el.scrollWidth / copies; // largeur d'une copie
      if (!jeu) return;
      const voulu = Math.min(8, Math.max(2, Math.ceil((2 * window.innerWidth) / jeu)));
      setCopies((c) => (c === voulu ? c : voulu));
    };
    ajuste();
    window.addEventListener('resize', ajuste);
    return () => window.removeEventListener('resize', ajuste);
  }, [copies, repeat]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ '--mq-copies': copies, ...style }}
      {...rest}
    >
      {Array.from({ length: copies }).map((_, i) => (
        <Fragment key={i}>{children}</Fragment>
      ))}
    </div>
  );
}

/* Requête média partagée : le CSS bascule au même seuil (809 px) */
export function usePhone() {
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

/* ------------------------------------------------------------------
   <MaskWord> — le mot monte depuis sous une fenêtre qui le rogne.
   Mécanique du hero Elite Fitness : pas de fondu, un volet qui s'ouvre
   par le bas, avec une légère bascule pour donner du poids au lettrage.
   ------------------------------------------------------------------ */
export function MaskWord({ children, delay = 0, duration = 1.05, className }) {
  const still = useReducedMotion();

  return (
    <span className={'mask-word' + (className ? ' ' + className : '')}>
      <motion.span
        initial={still ? { opacity: 0 } : { y: '110%', rotate: 5 }}
        animate={still ? { opacity: 1 } : { y: '0%', rotate: 0 }}
        transition={{ duration: still ? 0.4 : duration, ease: EASE, delay: still ? 0 : delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/* ------------------------------------------------------------------
   riseIn() — props d'apparition au chargement (hors scroll).
   Pour le hero, visible d'emblée : pas de whileInView, juste un délai.
   ------------------------------------------------------------------ */
export function riseIn(delay = 0, { y = 26, blur = 8, duration = DUR, still = false } = {}) {
  if (still) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.4, ease: EASE },
    };
  }
  return {
    initial: { opacity: 0, y, filter: `blur(${blur}px)` },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    transition: { duration, ease: EASE, delay },
  };
}

/* ------------------------------------------------------------------
   <SplitText> — paragraphe qui s'écrit mot par mot (blur-in en cascade).
   Le parent orchestre : chaque mot est un enfant direct, donc
   staggerChildren suffit, pas de délai calculé mot à mot.
   Les nœuds non textuels ({BRAND.city}, un lien…) comptent pour un mot.
   ------------------------------------------------------------------ */
export function SplitText({ as = 'p', step = 0.02, className, children, ...rest }) {
  const Tag = motion[as] || motion.p;
  const still = useReducedMotion();

  if (still) {
    return (
      <Tag
        className={className}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.4, ease: EASE }}
        {...rest}
      >
        {children}
      </Tag>
    );
  }

  const word = (key, content) => (
    <motion.span key={key} className="split-w" variants={VARIANTS.blur} transition={transition}>
      {content}
    </motion.span>
  );

  const nodes = [];
  Children.toArray(children).forEach((child, ci) => {
    if (typeof child !== 'string' && typeof child !== 'number') {
      nodes.push(word('n' + ci, child));
      return;
    }
    /* on garde les blancs comme nœuds frères : dans un inline-block ils
       seraient avalés et les mots se colleraient */
    String(child)
      .split(/(\s+)/)
      .forEach((tok, ti) => {
        if (!tok) return;
        if (!tok.trim()) nodes.push(<Fragment key={`s${ci}-${ti}`}> </Fragment>);
        else nodes.push(word(`w${ci}-${ti}`, tok));
      });
  });

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={{ hidden: {}, show: { transition: { staggerChildren: step } } }}
      {...rest}
    >
      {nodes}
    </Tag>
  );
}
