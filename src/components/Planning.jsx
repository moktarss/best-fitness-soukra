import { DAYS, SCHEDULE, WEEKEND, BRAND } from '../data/content.js';
import { Reveal, Stagger } from './motion.jsx';
import { Today, todayName } from './Today.jsx';

/* Planning hebdomadaire des cours collectifs.
   Grille 7 colonnes sur desktop, colonnes empilées sur mobile. */
export function Planning({ showToday = true }) {
  const today = todayName();

  return (
    <div className="planning">
      {showToday && <Today />}

      <Stagger className="planning__grid" step={0.06} amount={0.05}>
        {DAYS.map((day) => (
          <Reveal
            key={day}
            kind="up"
            inStagger
            className={'planning__day' + (day === today ? ' planning__day--today' : '')}
          >
            <h3 className="planning__dayname">{day}</h3>
            <div className="planning__slots">
              {SCHEDULE[day].map((s, i) => (
                <div className={`slot slot--${s.tag}`} key={day + i}>
                  <span className="slot__h">{s.h}</span>
                  <span className="slot__name">{s.name}</span>
                  {s.coach && <span className="slot__coach">Coach {s.coach}</span>}
                </div>
              ))}
            </div>
          </Reveal>
        ))}

        {WEEKEND.map((w) => (
          <Reveal
            key={w.day}
            kind="up"
            inStagger
            className={
              'planning__day planning__day--off' + (w.day === today ? ' planning__day--today' : '')
            }
          >
            <h3 className="planning__dayname">{w.day}</h3>
            <div className="planning__off">
              <strong>{w.label}</strong>
              {w.note && <span>{w.note}</span>}
            </div>
          </Reveal>
        ))}
      </Stagger>

      <Reveal kind="up-sm" as="p" className="planning__note">
        Les cours sont inclus dans l'abonnement. Places limitées : arrive quelques
        minutes en avance sur les créneaux du soir. Renseignements au{' '}
        <a href={BRAND.phoneHref}>{BRAND.phone}</a>.
      </Reveal>
    </div>
  );
}
