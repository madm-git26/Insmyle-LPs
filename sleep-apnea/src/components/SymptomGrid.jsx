import { Icon } from './ui/Icon';
import { Reveal } from './ui/Reveal';
import { symptoms } from '../content/copy';

/**
 * Six symptom cards (spec 10). 6-up on xl to match the comp, then 3 / 2 / 1.
 * Nothing here is hover-dependent — the copy is always visible on touch.
 */
export function SymptomGrid() {
  return (
    <div className="symptom-grid">
      {symptoms.items.map((item, i) => (
        <Reveal key={item.title} delay={i * 80}>
          <article className="card card--hover symptom-card">
            <Icon className="symptom-card__icon" name={item.icon} size={34} strokeWidth={1.4} />
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
