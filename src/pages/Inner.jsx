import { useState } from 'react';
import { asset, bf, ICONS, SERVICES, COACHES, POSTS, KPIS, VALUES, PARTNERSHIPS, BRAND } from '../data/content.js';
import { SplitTitle, SplitText, Reveal, Stagger, Scrub, Counter, Marquee } from '../components/motion.jsx';
import { Btn, Rip, Ghost, JoinMarquee } from '../components/Layout.jsx';
import {
  ServiceGrid,
  ProgramList,
  PriceTable,
  Faq,
  TeamGrid,
  BlogGrid,
} from '../components/blocks.jsx';
import { Promo } from '../components/Promo.jsx';
import { Planning } from '../components/Planning.jsx';

/* En-tête commun aux pages internes */
function PageLead({ title, ghost, ghostKind = 'ghost', children, rip = true }) {
  return (
    <section className="section section--dark page-lead">
      <div className="grid-lines" />
      {ghost && <Ghost kind={ghostKind}>{ghost}</Ghost>}
      <div className="container stack g60">
        <SplitTitle className="d2 t-1000" parts={[{ text: title }]} />
        {children}
      </div>
      {rip && <Rip side="bottom" />}
    </section>
  );
}

/* ---------------- Services ---------------- */
export function Services() {
  const [showAll, setShowAll] = useState(false);
  const items = showAll ? SERVICES : SERVICES.slice(0, 4);

  return (
    <>
      <PageLead title="Tous nos cours collectifs" ghost={`PLANNING DES
COURS COLLECTIFS`}>
        <div className="stack g40">
          <ServiceGrid items={items} to="/pricing" />
          <Reveal kind="up-sm" className="btn-row">
            {!showAll && (
              <button className="btn" type="button" onClick={() => setShowAll(true)}>
                <span>Voir plus</span>
                <i>
                  <img src={ICONS.arrowWhite} alt="" />
                </i>
              </button>
            )}
            <Btn to="/contact" label="Venir essayer" variant="dark" />
          </Reveal>
        </div>
      </PageLead>
      <JoinMarquee />
    </>
  );
}

/* ---------------- Programmes ---------------- */
export function Programs() {
  return (
    <>
      <PageLead title="Planning de la semaine" ghost={`DISCIPLINE
COACHING`} ghostKind="ghost-up">
        <Planning />

        <div className="prog-row">
          <aside className="prog-aside">
            <SplitText className="bq" style={{ color: '#fff' }}>
              Les rendez-vous du soir, avec l'affiche de chaque coach.
              Clique sur un créneau pour la voir
            </SplitText>
          </aside>
          <ProgramList showTags />
        </div>
      </PageLead>
      <JoinMarquee />
    </>
  );
}

/* ---------------- Coachs ---------------- */
export function Team() {
  return (
    <>
      <PageLead title="L’équipe de coachs" ghost={`NOTRE ÉQUIPE
DE COACHS`}>
        <TeamGrid items={COACHES} />
      </PageLead>
      <JoinMarquee />
    </>
  );
}

/* ---------------- Blog ---------------- */
export function Blog() {
  const [showAll, setShowAll] = useState(false);
  const items = showAll ? POSTS : POSTS.slice(0, 4);

  return (
    <>
      <PageLead title="À l’affiche au club" ghost={`BEST FITNESS
LA SOUKRA`}>
        <div className="stack g40">
          <BlogGrid items={items} cols={3} />
          {!showAll && (
            <Reveal kind="up-sm">
              <button className="btn" type="button" onClick={() => setShowAll(true)}>
                <span>Voir plus</span>
                <i>
                  <img src={ICONS.arrowWhite} alt="" />
                </i>
              </button>
            </Reveal>
          )}
        </div>
      </PageLead>
      <JoinMarquee />
    </>
  );
}

/* ---------------- Tarifs ---------------- */
export function Pricing() {
  return (
    <>
      {/* pas de bord déchiré ici : la promo qui suit est sombre elle aussi */}
      <PageLead title="Nos formules" ghost={`BEST FITNESS
LA SOUKRA`} rip={false} />

      <Promo />

      <section className="section section--light">
        <div className="grid-lines" />
        <div className="container stack g30">
          <PriceTable />
          <Reveal kind="up-sm" className="btn-row">
            <Btn to="/contact" label="Nous contacter" />
          </Reveal>
          <Reveal kind="up" className="promo">
            <h3>Séance d'essai</h3>
            <p>Viens tester un cours collectif gratuitement, sans engagement</p>
          </Reveal>
        </div>
      </section>

      <JoinMarquee />
    </>
  );
}

/* ---------------- À propos ---------------- */
export function About() {
  return (
    <>
      <section className="section section--dark page-lead">
        <div className="grid-lines" />
        <Ghost>{'ICI ON PROGRESSE\nENSEMBLE'}</Ghost>

        <div className="container stack g50">
          {/* le titre et l'accroche partagent la ligne ; le bouton passe dessous */}
          <div className="lead-row">
            <SplitTitle
              className="d2 t-1000"
              parts={[
                { text: 'Le club' },
                { img: ICONS.starWhite, imgClass: 'star-inline star-inline--lg' },
              ]}
            />
            <SplitText className="bq lead-row__text" style={{ color: '#fff' }}>
              Best Fitness {BRAND.city} : une salle où l'on vient pour
              progresser, pas pour se comparer. Cours collectifs toute la semaine, coachs présents,
              matériel BH Fitness et programmes Les Mills
            </SplitText>
          </div>

          <Reveal kind="up-sm">
            <Btn to="/contact" label="Venir essayer" />
          </Reveal>

          <Reveal
            kind="img"
            className="tf-wide"
            style={{ aspectRatio: '1639/920', borderRadius: 12, overflow: 'hidden' }}
          >
            <img src={bf('salle-accueil.webp')} alt="Le comptoir d'accueil du club" />
          </Reveal>
        </div>

        <Rip side="bottom" />
      </section>

      <section className="section section--light">
        <div className="grid-lines" />
        <div className="container">
          <div className="about-split">
            <div className="about-split__media" style={{ aspectRatio: '525/700' }}>
              <Scrub as="img" s={1.19} y={-50} src={bf('salle-allee.webp')} alt="L'allée des machines" />
            </div>
            <div className="about-split__body">
              <SplitTitle
                className="d3"
                parts={[{ text: 'Le club' }, { text: 'en chiffres', className: 'dim' }]}
              />
              <SplitText className="bq">
                Un planning dense, une équipe stable et des adhérents
                qui reviennent. Voilà ce qui résume le mieux le club aujourd'hui
              </SplitText>
              <Reveal kind="up-sm">
                <Btn to="/pricing" label="Voir les tarifs" />
              </Reveal>
              <Reveal kind="up-sm" className="rating">
                <span className="dots">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <i key={i} />
                  ))}
                </span>
                <span>Partenaires : BH Fitness · Les Mills · GSN · Impact</span>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--light" style={{ paddingTop: 0 }}>
        <div className="container">
          <Stagger className="kpi-row" step={0.1}>
            {KPIS.map((k) => (
              <Reveal key={k.text} kind="up" inStagger className="kpi">
                <Counter as="b" value={k.value} suffix={k.suffix} className="kpi-num" />
                <p>{k.text}</p>
              </Reveal>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section section--dark">
        <Rip side="top" />
        <div className="grid-lines" />
        <Ghost kind="ghost-up">{'SEPT COACHS\nUN SEUL OBJECTIF'}</Ghost>

        <div className="container stack g50">
          <SplitTitle className="d3 accent" parts={[{ text: 'Nos coachs' }]} />
          <Reveal kind="up-sm" as="p" className="label">
            L’équipe
          </Reveal>
          <TeamGrid items={COACHES.slice(0, 3)} />
          <Reveal kind="up-sm">
            <Btn to="/team" label="Toute l’équipe" />
          </Reveal>
        </div>
      </section>

      <section className="section section--dark" style={{ background: 'var(--dark)' }}>
        <div className="grid-lines" />
        <div className="container stack g50">
          <SplitTitle className="d3" parts={[{ text: 'Nos partenaires' }]} />
          <div className="about-split">
            <div className="about-split__media" style={{ width: '36%', aspectRatio: '416/560' }}>
              <Scrub as="img" s={1.19} y={-40} src={bf('salle-plateau-p.webp')} alt="Le plateau musculation" />
            </div>
            <div className="about-split__body">
              <div className="tst-mask">
                <Marquee className="award-track" repeat={3}>
                  {PARTNERSHIPS.map((pa) => (
                    <div className="award" key={pa.name}>
                      <img src={ICONS.award} alt="" />
                      <div>
                        <h4>{pa.name}</h4>
                        <p>{pa.note}</p>
                      </div>
                    </div>
                  ))}
                </Marquee>
              </div>
            </div>
          </div>
        </div>
        <Rip side="bottom" />
      </section>

      <section className="section section--light">
        <div className="grid-lines" />
        <div className="container stack g50">
          <SplitTitle
            className="d3"
            parts={[{ text: 'Ce qui nous' }, { text: 'tient à cœur', className: 'dim' }]}
          />
          <Stagger className="value-grid" step={0.1}>
            {VALUES.map((v) => (
              <Reveal key={v.title} kind="up" inStagger className="value-card">
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </Reveal>
            ))}
          </Stagger>

          <div className="about-split">
            <div className="about-split__media" style={{ width: '54%', aspectRatio: '713/557' }}>
              <Scrub as="img" s={1.19} y={-40} src={bf('salle-cours.webp')} alt="La salle de cours collectifs" />
            </div>
            <div className="about-split__body">
              <SplitText className="bq">
                Viens comme tu es : un coach t'accueille, t'explique le
                déroulé du cours et adapte les mouvements à ton niveau
              </SplitText>
              <Reveal kind="up-sm">
                <Btn to="/contact" label="Venir essayer" />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <Rip side="top" />
        <div className="grid-lines" />
        <div className="container stack g50">
          <SplitTitle className="d3 accent" parts={[{ text: 'Questions fréquentes' }]} />
          <Faq />
        </div>
        <Rip side="bottom" />
      </section>

      <JoinMarquee />
    </>
  );
}

/* ---------------- Contact ---------------- */
export function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <section className="section section--dark page-lead">
        <div className="grid-lines" />
        <Ghost>{'WHERE STRENGTH\nBEGINS DAILY'}</Ghost>
        <div className="container stack g40">
          <SplitTitle className="d2 t-1000" parts={[{ text: 'Passe nous voir' }]} />
          <Reveal kind="up-sm" className="footer-links">
            <a href={BRAND.instagramUrl} target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href={BRAND.mapsUrl} target="_blank" rel="noopener noreferrer">Itinéraire</a>
            <a href={BRAND.phoneHref}>{BRAND.phone}</a>
          </Reveal>
        </div>
      </section>

      {/* ---------- Où nous trouver : façade + formulaire côte à côte ---------- */}
      <section className="section section--dark">
        <div className="grid-lines" />
        <div className="container stack g40">
          <SplitTitle className="d3 accent" parts={[{ text: 'Où nous trouver' }]} />

          <div className="find-grid">
            <div className="stack g20">
              <Reveal kind="img" className="find-photo">
                <img src={bf('salle-facade.webp')} alt={`Façade de ${BRAND.name} ${BRAND.city}`} />
              </Reveal>

              <Reveal kind="up-sm" className="contact-card find-info">
                <div className="info-list">
                  <div className="info-item"><h4>Adresse</h4><p>{BRAND.city}, Tunis</p></div>
                  <div className="info-item"><h4>Téléphone</h4><p><a href={BRAND.phoneHref}>{BRAND.phone}</a></p></div>
                  <div className="info-item"><h4>Semaine</h4><p>Lundi → vendredi, {BRAND.hoursWeek}</p></div>
                  <div className="info-item"><h4>Week-end</h4><p>Samedi {BRAND.hoursWeekend.toLowerCase()} · Dimanche {BRAND.hoursSunday.toLowerCase()}</p></div>
                </div>
                <div className="btn-row">
                  <Btn href={BRAND.mapsUrl} label="Itinéraire" target="_blank" rel="noopener noreferrer" />
                  <Btn href={BRAND.instagramUrl} label="Instagram" variant="outline" target="_blank" rel="noopener noreferrer" />
                </div>
              </Reveal>
            </div>

            <Reveal
              kind="up-sm"
              as="form"
              className="contact-form find-form"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
                setTimeout(() => setSent(false), 2200);
                e.target.reset();
              }}
            >
              <SplitText className="bq" style={{ color: '#fff' }}>
                Écris-nous ou appelle le {BRAND.phone}. On te répond et
                on t'oriente vers le cours qui te correspond
              </SplitText>
              <label className="field"><span>Nom</span><input type="text" placeholder="Votre nom" required /></label>
              <label className="field"><span>Email</span><input type="email" placeholder="you@email.com" required /></label>
              <label className="field"><span>Téléphone</span><input type="tel" placeholder="Votre numéro" /></label>
              <label className="field"><span>Message</span><textarea rows="2" placeholder="Quel cours vous intéresse ?" /></label>
              <div>
                <button className="btn" type="submit">
                  <span>{sent ? 'Message envoyé' : 'Envoyer'}</span>
                  <i><img src={ICONS.arrowWhite} alt="" /></i>
                </button>
              </div>
            </Reveal>
          </div>
        </div>
        <Rip side="bottom" />
      </section>

      <section className="section section--light">
        <div className="grid-lines" />
        <div className="container stack g50">
          <SplitTitle className="d3" parts={[{ text: 'Questions fréquentes' }]} />
          <Faq />
        </div>
      </section>

      <JoinMarquee />
    </>
  );
}

/* ---------------- 404 ---------------- */
export function NotFound() {
  return (
    <>
      <section className="section section--dark" style={{ paddingTop: 170 }}>
        <div className="grid-lines" />
        <Ghost>{'DISCIPLINE\nOVER MOTIVATION'}</Ghost>
        <div className="container">
          <div className="err-wrap">
            <Reveal kind="blur" className="err-code">404</Reveal>
            <SplitTitle
              className="d3"
              style={{ color: '#fff' }}
              parts={[{ text: 'Cette page n’existe pas.' }]}
            />
            <Reveal kind="up-sm">
              <Btn to="/" label="Retour à l’accueil" />
            </Reveal>
          </div>
        </div>
        <Rip side="bottom" />
      </section>
      <JoinMarquee />
    </>
  );
}
