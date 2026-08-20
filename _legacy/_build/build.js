/* Génère les pages internes en réutilisant le header / footer de index.html */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const index = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

const between = (s, a, b) => {
  const i = s.indexOf(a), j = s.indexOf(b, i);
  return s.slice(i, j + b.length);
};

const HEADER = between(index, '<!-- ============ HEADER ============ -->', '</header>');
const FOOTER = between(index, '<!-- ============ FOOTER ============ -->', '</footer>');
const MARQUEE = between(index, '<!-- ============ MARQUEE ============ -->', '</section>');

const IMG = 'assets/img/';
const arrowW = IMG + 'LzasmVp3TuTfYh2Xjorv2bsIy9U.svg';
const arrowB = IMG + 'itvo00VfDXJghMUCRAANdLWOSdM.svg';
const rip = IMG + 'a2SXGBs72Zpt8udi2WLbyuE1V4.png';

const btn = (label, href, variant) =>
  `<a class="btn${variant ? ' btn--' + variant : ''}" href="${href}">
          <span>${label}</span>
          <i><img src="${variant === 'dark' ? arrowW : arrowW}" alt=""></i>
        </a>`;

const bq = (txt) => `<p class="bq"><span class="bk">[</span>${txt}</p>`;

const shell = (opts) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${opts.title}</title>
<meta name="description" content="${opts.desc}">
<link rel="icon" href="assets/img/hqjeOGxzmeO6zrAEl9pg0SKBd9o.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Archivo:wght@400;500;600;700;800&family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/style.css">
</head>
<body>

${HEADER}

<main>
${opts.body}
</main>

${FOOTER}

<script src="js/motion.min.js"></script>
<script src="js/main.js"></script>
</body>
</html>
`;

/* ---------------- Données ---------------- */

const SERVICES = [
  ['Strength training', 'zkB7Nhe5TJ8GEy9hEaLfayLvA.svg', 'Build muscle and develop physical strength through structured resistance workouts designed to progressively overload the body, enhance neuromuscular efficiency, and create a strong foundation that supports overall performance and fitness adaptation. ]'],
  ['Functional fitness', 'ioRhiO2100gHx0HHENO68qHzNk.svg', 'Train movement patterns that improve balance, coordination, and real-world physical performance through dynamic exercises that enhance mobility, stability, and joint control, helping you move more efficiently and confidently in both training and everyday life. ]'],
  ['Endurance coaching', 'uEDUy4mBTqLIJHBzACKsjGjBN8M.svg', 'Increase stamina and cardiovascular capacity with progressive, performance-focused conditioning programs that challenge your limits, improve oxygen efficiency, and build long-term resilience, ensuring higher energy levels and better recovery across all physical activities. ]'],
  ['Body transformation', 'gdI0up9qEND2i8n5KgG6rr2SZT0.svg', 'Achieve visible change through guided training plans designed for fat loss, muscle gain, and complete body reshaping, supported by structured programming, performance tracking, and sustainable habit building to ensure consistent progress and long-term physical transformation. ]'],
  ['Athletic performance', 'iyoRXYZeVH4ZSYzTlGE9wCOKj4.svg', 'Improve speed, agility, coordination, and explosive power through performance-focused training designed to enhance athletic ability, movement efficiency, and overall physical performance. Structured workouts help develop strength, reaction time ]'],
  ['Mobility training', 'RFgIhC5sOHkesRwMAuJECXjNjxk.svg', 'Enhance flexibility, joint health, and movement quality through guided mobility exercises that improve range of motion, reduce stiffness, and support injury prevention. Our programs help the body move more efficiently, recover effectively ]'],
];

const PROGRAMS = [
  ['01', 'Build Strength Gain More Power', 'FHGltqkHYgk8S28ppDzQd2nmow.jpg', '12 Weeks', ['Advanced', 'Full Gym', 'Hypertrophy'], 'Levels through expert guidance'],
  ['02', 'Build Endurance Improve Daily Output', 'CqG4SYcNZEflEFXh4Jeabpx9E8.jpg', '11 Weeks', ['Full Gym', 'Advanced', 'Yoga'], 'Reach new heights with coaching'],
  ['03', 'Move Better With Functional Training', 'H0teLaJ28yzsYTFuXxD5mbbRus.jpg', '10 Weeks', ['Hypertrophy', 'Advanced', 'Full Gym'], 'Achieve your goals with guidance'],
  ['04', 'Strengthen Your Core Build Stability', 'kmpmT3NCaE4d0jfbxDBo8YBH1oo.jpg', '13 Weeks', ['Gym', 'Full Gym', 'Yoga'], 'Progress with expert advice'],
];

const COACHES = [
  ['Noah Reed', 'Strength Coach, Powerlifting', '7aX8EiNZrPaLX34fHXjd7ZKpE.png'],
  ['Caleb Morgan', 'Cardio Coach, HIIT', 'wfsSFHTcSnVZmE6v15QjobEtQ.png'],
  ['Ava Sinclair', 'Fitness Coach, Mobility', 'jqr2vacHFQ4h9D8jPvyJua83k.png'],
  ['Sophia Bennett', 'Fitness Coach, Recovery', 'pT6abVd5iE8g5xAIyooIBg14.png'],
  ['Ethan Brooks', 'Performance Coach, Strength', 'ZIqPogvE1yrRu7pYSBAK4i14Xw.png'],
  ['Mason Carter', 'Conditioning, Endurance', 'JQ1TCYriing9iPsK8fg0spM0qQ.png'],
];

const POSTS = [
  ['Build strength with smarter training', 'Sarah Mitchell', 'BO4uclmblN5sJvV0splkW5tdBg.png'],
  ['Nutrition habits that drive better results', 'Frances Tolbert', '6tHiLiI3z7ha2atrlwd8OFP10.png'],
  ['The importance of recovery for long-term results', 'Jerry Perkins', 'odl0G5fPXqx9iUm44cuB2OudtKg.png'],
  ['That one last thing to reach your fitness goal', 'James Bott', 'jBd5ubGXLHWTDLbFeE1iut0KAE.png'],
  ['Fitness is not about being better than someone else', 'David Landon', 'z8ttdUmQaRQxl4AtRWgXL9Zfy8.png'],
  ['Building consistency over motivation', 'Margaret Bacon', '2fY133EvfVAxgJFouzsEzJOYrnY.png'],
];

const FAQ = [
  ['What types of training programs available?', 'We provide website design, Webflow development, UI/UX design, and digital solutions tailored to help businesses grow online effectively.'],
  ['How often should I train weekly?', 'We offer complete solar and wind energy solutions, from first consultation and tailored system design to expert installation and continued maintenance, ensuring dependable, efficient, and future-focused energy systems suited to your needs.'],
  ['Do you offer guidance for beginners?', 'We deliver comprehensive solar and wind energy services, starting with consultation and custom design through to skilled installation and ongoing support, creating efficient, reliable, and future-ready energy systems designed for your needs.'],
  ['Can I achieve results without experience?', 'From initial consultation to tailored design, expert installation, and continuous maintenance, we provide complete solar and wind energy services that ensure efficient, dependable, and future-ready energy solutions customized to your requirements.'],
  ['Are certified trainers available for support?', 'We provide website design, Webflow development, UI/UX design, and digital solutions tailored to help businesses grow online effectively.'],
  ['What membership benefits are included here?', 'We offer complete solar and wind energy solutions, from first consultation and tailored system design to expert installation and continued maintenance, ensuring dependable, efficient, and future-focused energy systems suited to your needs.'],
  ['Can I access all gym facilities?', 'We deliver comprehensive solar and wind energy services, starting with consultation and custom design through to skilled installation and ongoing support, creating efficient, reliable, and future-ready energy systems designed for your needs.'],
  ['Do you offer flexible membership options?', 'From initial consultation to tailored design, expert installation, and continuous maintenance, we provide complete solar and wind energy services that ensure efficient, dependable, and future-ready energy solutions customized to your requirements.'],
];

const PRICES = [
  ['Trial session', "Step onto the floor and see what you're capable of. No pressure. No promises. Just real training and real effort ]", ['First step', 'Show up'], '01', 'Free'],
  ['Monthly membership', 'Unlimited access to the gym, equipment, and community. Progress comes from repetition, not shortcuts ]', ['Commitment', 'Growth'], '02', '$150.00'],
  ['Personal training', 'Work one-on-one with a coach who keeps you moving forward. Every session is built around your goals ]', ['Power', 'Endurance'], '03', '$300.00'],
];

/* ---------------- Fragments réutilisables ---------------- */

const svcCard = (s, hidden) => `<a class="svc-card${hidden ? ' is-hidden' : ''}" href="pricing.html" data-anim="up">
          <div>
            <h3 class="d4">${s[0]}</h3>
            <p class="bq" style="margin-top:18px"><span class="bk">[</span>${s[2]}</p>
          </div>
          <div class="svc-icon"><img src="${IMG}${s[1]}" alt=""></div>
        </a>`;

const progItem = (p, i) => `<article class="prog-item${i === 0 ? ' is-active' : ''}" data-anim="up">
          <div class="prog-head">
            <div class="prog-num">${p[0]}</div>
            <h3 class="prog-title">${p[1]}</h3>
          </div>
          <div class="prog-body"><div>
            <div class="prog-media"><img src="${IMG}${p[2]}" alt="Class Image"></div>
            <div class="prog-meta">
              <span>${p[5]}</span>
              <div class="price-tags">${p[4].map(t => `<span style="color:#fff">${t}</span>`).join('')}</div>
              <b>${p[3]}</b>
            </div>
          </div></div>
        </article>`;

const coachCard = (c, hidden) => `<a class="team-card${hidden ? ' is-hidden' : ''}" href="contact.html" data-anim="up">
          <div class="team-card__img"><img src="${IMG}${c[2]}" alt="${c[0]}"></div>
          <h3>${c[0]}</h3>
          <span>[ ${c[1]} ]</span>
        </a>`;

const postCard = (p, hidden) => `<a class="blog-card${hidden ? ' is-hidden' : ''}" href="blog.html" data-anim="up">
          <div class="blog-card__img"><img src="${IMG}${p[2]}" alt="Blog Image"></div>
          <h3>${p[0]}</h3>
          <div class="blog-meta"><span>${p[1]}</span><span>-</span><span>Jul 9, 2026</span></div>
        </a>`;

const faqBlock = () => `<div class="faq" data-stagger="0.06">
      ${FAQ.map((f, i) => `<div class="faq-item${i === 0 ? ' is-open' : ''}" data-anim="up">
        <button class="faq-q" type="button"><span>${i + 1} - ${f[0]}</span><span class="sign"></span></button>
        <div class="faq-a"><div><p>${f[1]}</p></div></div>
      </div>`).join('\n      ')}
    </div>`;

const priceTable = () => `<div class="price-table" data-stagger="0.1">
        ${PRICES.map(p => `<a class="price-row" href="contact.html" data-anim="down">
          <h3>${p[0]}</h3>
          <div class="pr-desc">
            <p>[ ${p[1]}</p>
            <div class="price-tags">${p[2].map(t => `<span>${t}</span>`).join('')}</div>
          </div>
          <div class="price-val"><em class="idx">${p[3]}</em><div class="amt">${p[4]}</div></div>
        </a>`).join('\n        ')}
      </div>`;

const pageLead = (title, ghost, extra) => `<section class="section section--dark page-lead">
  <div class="grid-lines"></div>
  ${ghost ? `<div class="ghost-text" data-anim="up">${ghost}</div>` : ''}
  <div class="container stack g60">
    <h2 class="d2 t-1000" data-split>${title}</h2>
    ${extra || ''}
  </div>
</section>`;

/* ---------------- PAGES ---------------- */

const pages = {};

/* ---- SERVICE ---- */
pages['service.html'] = shell({
  title: 'Services — Fitova',
  desc: 'Training designed for progress — strength, endurance, mobility and body transformation programs.',
  body: `
<section class="section section--dark page-lead">
  <div class="grid-lines"></div>
  <div class="ghost-text" data-anim="up">STRENGTH, PERFORMANCE,
PROGRESS</div>
  <div class="container stack g60">
    <h2 class="d2 t-1000" data-split>Training designed for progress</h2>

    <div class="stack g40">
      <div class="svc-grid" data-stagger="0.1">
        ${SERVICES.slice(0, 4).map(s => svcCard(s, false)).join('\n        ')}
        ${SERVICES.slice(4).map(s => svcCard(s, true)).join('\n        ')}
      </div>
      <div class="btn-row" data-anim="up">
        <a class="btn" href="pricing.html"><span>Price plan</span><i><img src="${arrowW}" alt=""></i></a>
        <a class="btn btn--dark" href="contact.html"><span>Join us today</span><i><img src="${arrowW}" alt=""></i></a>
      </div>
    </div>
  </div>
  <div class="rip rip--bottom"><img src="${rip}" alt=""></div>
</section>

${MARQUEE}
`});

/* ---- PROGRAM ---- */
pages['program.html'] = shell({
  title: 'Programs — Fitova',
  desc: 'Progressive training plans designed for sustainable fitness results.',
  body: `
<section class="section section--dark page-lead">
  <div class="grid-lines"></div>
  <div class="ghost-text" data-anim="up">DISCIPLINE
FITNESS TRAINING</div>
  <div class="container stack g60">
    <h2 class="d2 t-1000" data-split>Training designed for progress</h2>

    <div class="prog-row">
      <aside class="prog-aside">
        ${bq('Progressive training plans designed to support sustainable fitness results, long-term consistency, and steady performance improvement over time ]').replace('class="bq"', 'class="bq" style="color:#fff" data-anim="up"')}
      </aside>
      <div class="prog-list" data-stagger="0.1">
        ${PROGRAMS.map(progItem).join('\n        ')}
      </div>
    </div>
  </div>
  <div class="rip rip--bottom"><img src="${rip}" alt=""></div>
</section>

${MARQUEE}
`});

/* ---- TEAM ---- */
pages['team.html'] = shell({
  title: 'Trainers — Fitova',
  desc: 'Meet your fitness coaches — strength, cardio, mobility and recovery specialists.',
  body: `
<section class="section section--dark page-lead">
  <div class="grid-lines"></div>
  <div class="ghost-text" data-anim="up">DEDICATED
TRAINING TEAM</div>
  <div class="container stack g60">
    <h2 class="d2 t-1000" data-split>Meet your fitness coaches</h2>

    <div class="team-grid" data-stagger="0.09">
      ${COACHES.map(c => coachCard(c, false)).join('\n      ')}
    </div>
  </div>
  <div class="rip rip--bottom"><img src="${rip}" alt=""></div>
</section>

${MARQUEE}
`});

/* ---- BLOG ---- */
pages['blog.html'] = shell({
  title: 'Journal — Fitova',
  desc: 'Performance & strength journal — training, nutrition and recovery insights.',
  body: `
<section class="section section--dark page-lead">
  <div class="grid-lines"></div>
  <div class="ghost-text" data-anim="up">A STRONGER LIFE
MORE CONFIDENT</div>
  <div class="container stack g60">
    <h2 class="d2 t-1000" data-split>Performance &amp; strength journal</h2>

    <div class="stack g40">
      <div class="blog-grid blog-grid--3" id="postGrid" data-stagger="0.09">
        ${POSTS.slice(0, 4).map(p => postCard(p, false)).join('\n        ')}
        ${POSTS.slice(4).map(p => postCard(p, true)).join('\n        ')}
      </div>
      <div data-anim="up">
        <a class="btn" href="#" data-loadmore="#postGrid"><span>Load more</span><i><img src="${arrowW}" alt=""></i></a>
      </div>
    </div>
  </div>
  <div class="rip rip--bottom"><img src="${rip}" alt=""></div>
</section>

${MARQUEE}
`});

/* ---- PRICING ---- */
pages['pricing.html'] = shell({
  title: 'Price plan — Fitova',
  desc: 'Choose your training plan — trial session, monthly membership or personal training.',
  body: `
<section class="section section--dark page-lead">
  <div class="grid-lines"></div>
  <div class="ghost-text" data-anim="up">A STRONGER LIFE
MORE CONFIDENT</div>
  <div class="container">
    <h2 class="d2 t-1000" data-split>Choose your training plan</h2>
  </div>
  <div class="rip rip--bottom"><img src="${rip}" alt=""></div>
</section>

<section class="section section--light">
  <div class="grid-lines"></div>
  <div class="container stack g30">
    ${priceTable()}

    <div class="btn-row" data-anim="up">
      <a class="btn" href="contact.html"><span>Contact us</span><i><img src="${arrowW}" alt=""></i></a>
    </div>

    <div class="promo" data-anim="up">
      <h3>25% off</h3>
      <p>[ Train harder for less with up to 25% off selected memberships for a limited time]</p>
    </div>
  </div>
</section>

${MARQUEE}
`});

/* ---- ABOUT ---- */
pages['about.html'] = shell({
  title: 'About — Fitova',
  desc: 'Building better athletes — strength, confidence and healthier lifestyles through expert coaching.',
  body: `
<section class="section section--dark page-lead">
  <div class="grid-lines"></div>
  <div class="ghost-text" data-anim="up">WHERE YOU START YOUR
FITNESS JOURNEY</div>
  <div class="container stack g50">
    <h2 class="d2 t-1000" data-split>Building better athletes <img class="star-inline star-inline--lg" src="${IMG}vvYLgdnkblJts4kNwtgItO3QOVU.svg" alt=""></h2>
    <div class="offset-col">
      ${bq('We help people build strength, confidence, and healthier lifestyles through expert coaching, proven training methods ]').replace('class="bq"', 'class="bq" style="color:#fff" data-anim="up"')}
      <div data-anim="up" style="--d:.12s">
        <a class="btn" href="contact.html"><span>Join us today</span><i><img src="${arrowW}" alt=""></i></a>
      </div>
    </div>
    <div class="tf-wide" data-anim="img" style="aspect-ratio:1639/920;border-radius:12px;overflow:hidden">
      <img src="${IMG}EUfR46oZ04oHFx9YKnLzkHB7B0.png" alt="">
    </div>
  </div>
  <div class="rip rip--bottom"><img src="${rip}" alt=""></div>
</section>

<section class="section section--light">
  <div class="grid-lines"></div>
  <div class="container">
    <div class="about-split">
      <div class="about-split__media" data-anim="img" style="aspect-ratio:525/700">
        <img src="${IMG}cFqfKDrmCZZ2QByzWHPo7Dzge2U.png" alt="">
      </div>
      <div class="about-split__body">
        <h2 class="d3" data-split>Measuring success <span class="dim">beyond the workout</span></h2>
        ${bq('The numbers below reflect the collective effort of a community built on consistency, discipline, and long-term commitment to fitness. Every milestone represents real progress achieved through structured training, expert guidance, and the determination of our members to improve day by day ]').replace('class="bq"', 'class="bq" data-anim="up"')}
        <div data-anim="up">
          <a class="btn" href="pricing.html"><span>View pricing</span><i><img src="${arrowW}" alt=""></i></a>
        </div>
        <div class="rating" data-anim="up">
          <span class="dots"><i></i><i></i><i></i><i></i><i></i></span>
          <span>[ 4.9/5 from 2,000+ member reviews ]</span>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section section--light" style="padding-top:0">
  <div class="container">
    <div class="kpi-row" data-stagger="0.1">
      <div class="kpi" data-anim="up"><b data-count="250" data-suffix="K+">0</b><p>[ Hours of Training Logged ]</p></div>
      <div class="kpi" data-anim="up"><b data-count="5000" data-suffix="+">0</b><p>[ Fitness Goals Achieved ]</p></div>
      <div class="kpi" data-anim="up"><b data-count="200" data-suffix="+">0</b><p>[ Weekly Coaching Hours ]</p></div>
      <div class="kpi" data-anim="up"><b data-count="1000" data-suffix="+">0</b><p>[ Personal Transformation goal ]</p></div>
    </div>
  </div>
</section>

<section class="section section--dark">
  <div class="rip rip--top"><img src="${rip}" alt=""></div>
  <div class="grid-lines"></div>
  <div class="ghost-text" data-anim="up">DEDICATED
TRAINING TEAM</div>
  <div class="container stack g50">
    <h2 class="d3 green" data-split>Strength and guidance</h2>
    <p class="label" data-anim="up">[ your fitness coaches ]</p>
    <div class="team-grid" data-stagger="0.1">
      ${COACHES.slice(0, 3).map(c => coachCard(c, false)).join('\n      ')}
    </div>
    <div data-anim="up">
      <a class="btn" href="team.html"><span>View all coach</span><i><img src="${arrowW}" alt=""></i></a>
    </div>
  </div>
</section>

<section class="section section--dark" style="background:var(--dark)">
  <div class="grid-lines"></div>
  <div class="container stack g50">
    <h2 class="d3" data-split>Earned excellence</h2>
    <div class="about-split">
      <div class="about-split__media" data-anim="img" style="width:36%;aspect-ratio:416/560">
        <img src="${IMG}CyQsygrXMZmez5n3JCXwJJzXqLY.png" alt="">
      </div>
      <div class="about-split__body">
        <div class="tst-mask">
          <div class="award-track" data-marquee>
            ${[1, 2, 3].map(() => `<div class="award">
              <img src="${IMG}LyPF4iT8pu5PfaI355ky5ESicjA.svg" alt="">
              <div><h4>Best fitness experience</h4><p>[ Recognized for exceptional member experiences ]</p></div>
              <span>2026</span>
            </div>`).join('\n            ')}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="rip rip--bottom"><img src="${rip}" alt=""></div>
</section>

<section class="section section--light">
  <div class="grid-lines"></div>
  <div class="container stack g50">
    <h2 class="d3" data-split>Values that shape <span class="dim">every decision</span></h2>
    <div class="value-grid" data-stagger="0.1">
      ${[1, 2, 3].map(() => `<div class="value-card" data-anim="up">
        <h3>Daily discipline</h3>
        <p>[ Building consistency through focused training, commitment, and the determination to improve every day ]</p>
      </div>`).join('\n      ')}
    </div>
    <div class="about-split">
      <div class="about-split__media" data-anim="img" style="width:54%;aspect-ratio:713/557">
        <img src="${IMG}7hBXVl1vEDAt2uYrc02mQ4ak0pI.jpg" alt="">
      </div>
      <div class="about-split__body">
        ${bq('Building consistency through focused training, commitment, and the determination to improve every day ]').replace('class="bq"', 'class="bq" data-anim="up"')}
        <div data-anim="up">
          <a class="btn" href="contact.html"><span>Join us today</span><i><img src="${arrowW}" alt=""></i></a>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section section--dark">
  <div class="rip rip--top"><img src="${rip}" alt=""></div>
  <div class="grid-lines"></div>
  <div class="container stack g50">
    <h2 class="d3 green" data-split>Quick answers for you</h2>
    ${faqBlock()}
  </div>
  <div class="rip rip--bottom"><img src="${rip}" alt=""></div>
</section>

${MARQUEE}
`});

/* ---- CONTACT ---- */
pages['contact.html'] = shell({
  title: 'Contact — Fitova',
  desc: 'Start your fitness journey — reach out and take the first step toward your goals.',
  body: `
<section class="section section--dark page-lead">
  <div class="grid-lines"></div>
  <div class="ghost-text" data-anim="up">WHERE STRENGTH
BEGINS DAILY</div>
  <div class="container stack g40">
    <h2 class="d2 t-1000" data-split>Start your fitness journey</h2>
    <div class="footer-links" data-anim="up">
      <a href="https://facebook.com" target="_blank" rel="noopener">Facebook</a>
      <a href="https://x.com" target="_blank" rel="noopener">Twitter</a>
      <a href="https://instagram.com" target="_blank" rel="noopener">Instagram</a>
    </div>
  </div>
  <div class="rip rip--bottom"><img src="${rip}" alt=""></div>
</section>

<section class="section section--light">
  <div class="grid-lines"></div>
  <div class="container">
    <div class="contact-grid">
      <div class="stack g30">
        <h2 class="d3" data-split>Ready to sweat?</h2>
        ${bq('Reach out and take the first step toward your fitness goals ]').replace('class="bq"', 'class="bq" data-anim="up"')}
      </div>
      <form class="contact-form" data-demo data-anim="up">
        <label class="field"><span>Name</span><input type="text" name="name" placeholder="Your name" required></label>
        <label class="field"><span>Email</span><input type="email" name="email" placeholder="you@email.com" required></label>
        <label class="field"><span>Phone number</span><input type="tel" name="phone" placeholder="+1 (123) 456-7890"></label>
        <label class="field"><span>Message</span><textarea name="message" rows="2" placeholder="Tell us about your goals"></textarea></label>
        <div><button class="btn" type="submit"><span>Send message</span><i><img src="${arrowW}" alt=""></i></button></div>
      </form>
    </div>
  </div>
</section>

<section class="section section--dark">
  <div class="rip rip--top"><img src="${rip}" alt=""></div>
  <div class="grid-lines"></div>
  <div class="container stack g50">
    <h2 class="d3 green" data-split>Where strength begins daily</h2>
    ${bq('Find your nearest location and start training with us in a fully equipped fitness space built for performance and progress ]').replace('class="bq"', 'class="bq" style="color:#fff;max-width:560px" data-anim="up"')}

    <div class="about-split">
      <div class="about-split__media" data-anim="img" style="width:54%;aspect-ratio:713/557">
        <img src="${IMG}7hBXVl1vEDAt2uYrc02mQ4ak0pI.jpg" alt="">
      </div>
      <div class="about-split__body">
        <div class="contact-card" data-anim="up">
          <h3 class="d4 green" style="margin-bottom:16px">Iron Peak</h3>
          <div class="info-list">
            <div class="info-item"><h4>Address</h4><p>128 Madison Avenue, Brooklyn</p></div>
            <div class="info-item"><h4>Opening hours</h4><p>Open daily • 5 AM – 11 PM</p></div>
            <div class="info-item"><h4>Parking</h4><p>Free parking available onsite</p></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="rip rip--bottom"><img src="${rip}" alt=""></div>
</section>

<section class="section section--light">
  <div class="grid-lines"></div>
  <div class="container stack g50">
    <h2 class="d3" data-split>Quick answers for you</h2>
    ${faqBlock()}
  </div>
</section>

${MARQUEE}
`});

/* ---- 404 ---- */
pages['404.html'] = shell({
  title: '404 — Fitova',
  desc: 'Page not found.',
  body: `
<section class="section section--dark" style="padding-top:170px">
  <div class="grid-lines"></div>
  <div class="ghost-text" data-anim="up">DISCIPLINE
OVER MOTIVATION</div>
  <div class="container">
    <div class="err-wrap">
      <div class="err-code" data-anim="blur">404</div>
      <h2 class="d3" style="color:#fff" data-split>The page you're looking for is missing.</h2>
      <div data-anim="up">
        <a class="btn" href="index.html"><span>Back to home</span><i><img src="${arrowW}" alt=""></i></a>
      </div>
    </div>
  </div>
  <div class="rip rip--bottom"><img src="${rip}" alt=""></div>
</section>

${MARQUEE}
`});

/* ---------------- Écriture ---------------- */
Object.keys(pages).forEach(function (name) {
  fs.writeFileSync(path.join(ROOT, name), pages[name], 'utf8');
  console.log('✓ ' + name);
});
