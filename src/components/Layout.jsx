import { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ICONS, NAV, SOCIALS, BRAND, PARTNERS, wa } from '../data/content.js';
import { Marquee, Reveal, Stagger } from './motion.jsx';

/* ---------------- Bouton pilule ---------------- */
export function Btn({ to, href, label, variant, ...rest }) {
  const inner = (
    <>
      <span>{label}</span>
      <i>
        <img src={ICONS.arrowWhite} alt="" />
      </i>
    </>
  );
  const cls = 'btn' + (variant ? ' btn--' + variant : '');
  if (href) {
    return (
      <a className={cls} href={href} {...rest}>
        {inner}
      </a>
    );
  }
  return (
    <Link className={cls} to={to || '/'} {...rest}>
      {inner}
    </Link>
  );
}

/* ---------------- Bord papier déchiré ---------------- */
export function Rip({ side = 'bottom' }) {
  return (
    <div className={`rip rip--${side}`}>
      <img src={ICONS.rip} alt="" />
    </div>
  );
}

/* ---------------- Lettrage fantôme ---------------- */
export function Ghost({ children, kind = 'ghost', className = '' }) {
  return (
    <Reveal kind={kind} className={`ghost-text ${className}`.trim()}>
      {children}
    </Reveal>
  );
}

/* ---------------- Header ---------------- */
export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <header className={'site-header' + (scrolled ? ' is-scrolled' : '')}>
      <Link to="/" className="brand">
        <img src={ICONS.logo} alt={BRAND.name} />
      </Link>

      <div className="nav-tools">
        <div className="menu-wrap" ref={wrapRef}>
          <button
            className="pill-btn"
            aria-expanded={open}
            aria-label="Menu"
            onClick={(e) => {
              e.stopPropagation();
              setOpen((v) => !v);
            }}
          >
            <span className="mlabel">{open ? 'CLOSE' : 'MENU'}</span>
          </button>

          <div className={'menu-panel' + (open ? ' is-open' : '')}>
            {NAV.map(([label, to]) => (
              <NavLink key={to} className="m-link" to={to} onClick={() => setOpen(false)}>
                {label}
              </NavLink>
            ))}
            <div className="menu-social">
              {SOCIALS.map(([label, url]) => (
                <a key={label} href={url} target="_blank" rel="noopener noreferrer">
                  {label}
                </a>
              ))}
            </div>
            <div className="menu-photo">
              <img src={ICONS.menuPhoto} alt="" />
            </div>
          </div>
        </div>

        <Link className="pill-btn pill-btn--icon" to="/contact" aria-label="Write us">
          <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 2 11 13" />
            <path d="M22 2 15 22l-4-9-9-4 20-7z" />
          </svg>
        </Link>
        <a className="pill-btn pill-btn--icon" href={BRAND.phoneHref} aria-label="Call us">
          <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
          </svg>
        </a>
      </div>
    </header>
  );
}

/* ---------------- Marquee « Join today » ----------------
   `dark` sert à garder l'alternance clair/sombre quand la section qui
   précède est déjà claire. */
export function JoinMarquee({ dark = false }) {
  return (
    <section className={'marquee' + (dark ? ' marquee--dark' : '')}>
      <Marquee>
        <span>Rejoins-nous</span>
        <div className="m-img">
          <img src="/assets/img/kOJ7tjAZxMAxUDii1EWnI3FSLU.webp" alt="" />
        </div>
        <span>Rejoins-nous</span>
        <div className="m-img">
          <img src="/assets/img/vfap6qYYMnJRrJkr6urIothpgBY.webp" alt="" />
        </div>
        <span>Rejoins-nous</span>
        <div className="m-img">
          <img src="/assets/img/kOJ7tjAZxMAxUDii1EWnI3FSLU.webp" alt="" />
        </div>
      </Marquee>
    </section>
  );
}

/* ---------------- Footer ----------------
   Quatre colonnes lisibles : marque, horaires, navigation, contact.
   Le logo est déjà blanc dans le fichier source : aucun filtre à appliquer,
   sinon il redevient noir sur fond noir. */
export function Footer() {
  const HOURS = [
    ['Lundi → vendredi', BRAND.hoursWeek],
    ['Samedi', BRAND.hoursWeekend],
    ['Dimanche', BRAND.hoursSunday],
  ];

  return (
    <footer className="site-footer">
      <div className="grid-lines" />
      <div className="container">
        <Stagger className="footer-grid" step={0.08} amount={0.05}>
          <Reveal kind="up-sm" inStagger className="footer-col footer-col--brand">
            <img className="footer-logo" src={ICONS.logo} alt={BRAND.name} />
            <p className="footer-baseline">
              Plus fort chaque jour. {BRAND.city}, Tunis — plus de trente cours collectifs par
              semaine et sept coachs diplômés.
            </p>
            <span className="footer-ar" lang="ar" dir="rtl">
              اختار اشتراكك
            </span>
          </Reveal>

          <Reveal kind="up-sm" inStagger className="footer-col">
            <h3 className="footer-col__title">Horaires</h3>
            <ul className="footer-hours">
              {HOURS.map(([day, hours]) => (
                <li key={day}>
                  <span>{day}</span>
                  <b>{hours}</b>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal kind="up-sm" inStagger className="footer-col">
            <h3 className="footer-col__title">Navigation</h3>
            <nav className="footer-nav">
              {NAV.map(([label, to]) => (
                <Link key={to} to={to}>
                  {label}
                </Link>
              ))}
            </nav>
          </Reveal>

          <Reveal kind="up-sm" inStagger className="footer-col">
            <h3 className="footer-col__title">Contact</h3>
            <div className="footer-links">
              <a href={BRAND.phoneHref}>{BRAND.phone}</a>
              <a href={BRAND.instagramUrl} target="_blank" rel="noopener noreferrer">
                @{BRAND.instagram}
              </a>
              <a href={BRAND.mapsUrl} target="_blank" rel="noopener noreferrer">
                Itinéraire
              </a>
            </div>
            <Btn href={wa(`Bonjour ${BRAND.name}, je voudrais m'inscrire.`)} label="WhatsApp" target="_blank" rel="noopener noreferrer" />
          </Reveal>
        </Stagger>

        <div className="partners">
          {PARTNERS.map((p) => (
            <span key={p}>{p}</span>
          ))}
        </div>

        <div className="footer-base">
          <span>© {new Date().getFullYear()} {BRAND.name} — {BRAND.city}, Tunis. Tous droits réservés.</span>
          <span>Plus fort chaque jour.</span>
        </div>
      </div>
    </footer>
  );
}
