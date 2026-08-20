import { useMemo } from 'react';
import { SCHEDULE, BRAND } from '../data/content.js';
import { Reveal } from './motion.jsx';

const DAY_NAMES = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

/* Retourne le nom du jour courant, ex. « Mardi » */
export function todayName(now = new Date()) {
  return DAY_NAMES[now.getDay()];
}

const toMinutes = (h) => {
  const [a, b] = h.split(':').map(Number);
  return a * 60 + b;
};

/* Bloc « cours du jour » : liste les créneaux d'aujourd'hui,
   grise ceux qui sont passés et met en avant le prochain. */
export function Today() {
  const { day, slots, nextIndex, nowMin } = useMemo(() => {
    const now = new Date();
    const day = todayName(now);
    const slots = SCHEDULE[day] || [];
    const nowMin = now.getHours() * 60 + now.getMinutes();
    // le prochain cours = premier créneau qui n'a pas encore commencé
    const nextIndex = slots.findIndex((s) => toMinutes(s.h) >= nowMin);
    return { day, slots, nextIndex, nowMin };
  }, []);

  /* Week-end : la salle est ouverte, mais sans cours collectifs */
  if (!slots.length) {
    const samedi = day === 'Samedi';
    return (
      <Reveal kind="up" className="today">
        <div className="today__head">
          <span className="today__label">Aujourd'hui</span>
          <span className="today__day">{day}</span>
        </div>
        <div className="today__closed">
          <strong>{samedi ? BRAND.hoursWeekend : BRAND.hoursSunday}</strong>
          <span>
            Salle en accès libre, pas de cours collectifs le {samedi ? 'samedi' : 'dimanche'}.
            Les cours reprennent lundi à 8h30.
          </span>
        </div>
      </Reveal>
    );
  }

  const next = nextIndex >= 0 ? slots[nextIndex] : null;

  return (
    <Reveal kind="up" className="today">
      <div className="today__head">
        <span className="today__label">Aujourd'hui</span>
        <span className="today__day">{day}</span>
        <span className="today__next">
          {next ? (
            <>
              Prochain cours&nbsp;: <b>{next.name}</b> à <b>{next.h}</b>
            </>
          ) : (
            <>Les cours du jour sont terminés — à demain&nbsp;!</>
          )}
        </span>
      </div>

      <div className="today__list">
        {slots.map((s, i) => {
          const past = toMinutes(s.h) < nowMin;
          const isNext = i === nextIndex;
          return (
            <div
              key={s.h + s.name}
              className={
                'today-slot' + (isNext ? ' today-slot--next' : past ? ' today-slot--past' : '')
              }
            >
              <span className="today-slot__h">{s.h}</span>
              <span className="today-slot__name">{s.name}</span>
              {s.coach && <span className="today-slot__coach">Coach {s.coach}</span>}
            </div>
          );
        })}
      </div>
    </Reveal>
  );
}
