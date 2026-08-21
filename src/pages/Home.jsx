import { bf, ICONS, SERVICES, STATS, TESTIMONIALS, BRAND } from '../data/content.js';
import {
  SplitTitle,
  SplitText,
  Reveal,
  Stagger,
  Scrub,
  Counter,
  Marquee,
  usePhone,
} from '../components/motion.jsx';
import { Btn, Rip, Ghost, JoinMarquee } from '../components/Layout.jsx';
import { HeroElite, ServiceGrid, ProgramList, PriceTable } from '../components/blocks.jsx';
import { Promo } from '../components/Promo.jsx';
import { Planning } from '../components/Planning.jsx';
import { Gallery } from '../components/Gallery.jsx';

export default function Home() {
  /* les avis défilent tout seuls sur grand écran ; au doigt on préfère
     maîtriser la lecture, donc on passe en carrousel balayable */
  const phone = usePhone();

  const avis = TESTIMONIALS.map((t) => (
    <article className="tst-card" key={t.name + t.since}>
      <div className="tst-head">
        <img src={t.avatar} alt="" />
        <div>
          <h4>{t.name}</h4>
          <span>{t.since}</span>
        </div>
      </div>
      <p>{t.text}</p>
    </article>
  ));

  return (
    <>
      <HeroElite />

      {/* ---------- Offre exclusive : juste après le hero, c'est le bloc qui convertit ---------- */}
      <Promo />

      {/* ---------- Le club ---------- */}
      <section className="section section--light">
        <div className="grid-lines" />
        <div className="container stack g60">
          <SplitTitle
            className="d2 t-820"
            parts={[
              { text: 'Une salle, une équipe,' },
              { img: ICONS.starDark },
              { text: 'ta progression', className: 'dim' },
            ]}
          />

          <div className="offset-col">
            <SplitText className="bq">
              Best Fitness, c'est {BRAND.city} : une salle équipée, plus
              de trente cours collectifs par semaine et sept coachs diplômés qui connaissent ton
              prénom. Du lundi au vendredi, de 8h30 à 21h, il y a toujours un créneau pour toi
            </SplitText>
            <SplitText className="bq">
              Bodycombat, Bodypump, Spinning, CAF, Pilates, Balance,
              Step, Dance Oriental — et un créneau 100% femmes tous les midis. Que tu débutes ou que
              tu enchaînes les séances depuis des années, tu trouveras ton rythme ici
            </SplitText>
            <Reveal kind="up-sm">
              <Btn to="/about" label="Découvrir le club" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- Planning ---------- */}
      <section className="section section--dark">
        <Rip side="top" />
        <div className="grid-lines" />
        <Ghost>{'PLANNING DES\nCOURS COLLECTIFS'}</Ghost>

        <div className="container stack g60">
          <SplitTitle className="d3 accent" parts={[{ text: 'Planning des cours collectifs' }]} />
          <Planning />
        </div>

        <Rip side="bottom" />
      </section>

      {/* ---------- Les cours ---------- */}
      <section className="section section--light">
        <div className="grid-lines" />
        <div className="container stack g60">
          <Reveal kind="up-sm" as="p" className="label">
            [ nos cours ]
          </Reveal>

          <div className="stack g40">
            <ServiceGrid items={SERVICES.slice(0, 4)} />
            <Reveal kind="up-sm" className="btn-row">
              <Btn to="/service" label="Tous les cours" />
              <Btn to="/pricing" label="Tarifs" variant="dark" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- Les coachs à l'affiche ---------- */}
      <section className="section section--dark" style={{ background: 'var(--dark)' }}>
        <Rip side="top" />
        <div className="grid-lines" />
        <Ghost kind="ghost-up">{'DISCIPLINE\nCOACHING'}</Ghost>

        <div className="container stack g60">
          <SplitTitle className="d3 accent" parts={[{ text: 'Les rendez-vous de la semaine' }]} />

          <div className="prog-row">
            <aside className="prog-aside">
              <SplitText className="bq" style={{ color: '#fff' }}>
                Chaque soir, un cours et un coach. Clique pour voir
                l'affiche du créneau
              </SplitText>
            </aside>
            <ProgramList showTags />
          </div>
        </div>

        <Rip side="bottom" />
      </section>

      {/* ---------- Chiffres ---------- */}
      <section className="section section--light">
        <div className="grid-lines" />
        <div className="container">
          <div className="about-split">
            <div className="about-split__media">
              <Scrub as="img" s={1.19} y={-50} src={bf('salle-plateau-p.webp')} alt="" />
              <img className="star" src={ICONS.starWhite} alt="" />
            </div>

            <div className="about-split__body">
              <SplitTitle
                className="d3"
                parts={[{ text: 'Ce qui fait' }, { text: 'la différence', className: 'dim' }]}
              />
              <SplitText className="bq">
                Un planning dense, des coachs présents, et une salle où
                l'on se sent à sa place dès la première séance.
              </SplitText>
              <Reveal kind="up-sm">
                <Btn to="/contact" label="Venir essayer" />
              </Reveal>

              <Stagger className="stats" step={0.1}>
                {STATS.map((s) => (
                  <Scrub key={s.text} x={210} className="stat">
                    <img src={ICONS.sparkle} alt="" />
                    <Counter className="num" value={s.value} suffix={s.suffix} />
                    <p>{s.text}</p>
                  </Scrub>
                ))}
              </Stagger>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- La salle en images ---------- */}
      <section className="section section--dark">
        <Rip side="top" />
        <div className="grid-lines" />
        <Ghost kind="ghost-up">{`BEST FITNESS
LA SOUKRA`}</Ghost>

        <div className="container stack g50">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              gap: 30,
              flexWrap: 'wrap',
            }}
          >
            <SplitTitle className="d3 accent" parts={[{ text: 'La salle en images' }]} />
            <SplitText className="bq" style={{ color: '#fff', maxWidth: 380 }}>
              Plateau musculation, cardio, salle de cours collectifs et
              espace détente — 1 000 m² à La Soukra
            </SplitText>
          </div>

          <Gallery />

          <Reveal kind="up-sm" className="btn-row">
            <Btn to="/contact" label="Venir visiter" />
          </Reveal>
        </div>

        <Rip side="bottom" />
      </section>

      {/* ---------- Témoignages ---------- */}
      <section className="section section--dark">
        <Rip side="top" />
        <div className="grid-lines" />
        <Ghost>{'PLUS FORT\nCHAQUE JOUR'}</Ghost>

        <div className="container stack g70">
          <SplitTitle className="d3 accent" parts={[{ text: 'Ils viennent, ils restent' }]} />

          {phone ? (
            <div className="tst-row">{avis}</div>
          ) : (
            <div className="tst-mask full-bleed">
              <Marquee className="tst-track" repeat={4}>
                {avis}
              </Marquee>
            </div>
          )}
        </div>
        <Rip side="bottom" />
      </section>

      {/* ---------- Tarifs ---------- */}
      <section className="section section--dark">
        <Rip side="top" />
        <div className="grid-lines" />
        <Ghost kind="ghost-up" className="ghost-text--bottom">
          {'BEST FITNESS\nLA SOUKRA'}
        </Ghost>

        <div className="container stack g50">
          {/* sans affiche, le titre tient le centre */}
          <div className="price-head price-head--center">
            <SplitTitle
              className="d2"
              parts={[
                { text: 'On ne vend pas de la motivation,' },
                { text: 'on vend du résultat', className: 'dim' },
              ]}
            />
          </div>

          <div className="stack g30">
            <PriceTable />
            <Reveal kind="up" className="promo">
              <h3>Séance d'essai</h3>
              <p>
                [ Viens tester un cours collectif gratuitement, sans engagement. Appelle le{' '}
                {BRAND.phone} ]
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* la section tarifs est claire : le marquee passe en sombre pour garder l'alternance */}
      <JoinMarquee dark />
    </>
  );
}
