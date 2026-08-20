import { motion, useReducedMotion } from 'framer-motion';
import { wa, BRAND } from '../data/content.js';
import { EASE } from './motion.jsx';

/* Icône WhatsApp en SVG inline — aucune librairie d'icônes dans le projet */
export function WhatsAppIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.86 9.86 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.67c2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.24-8.25 8.24a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24Z" />
      <path d="M8.53 7.33c-.19-.42-.38-.43-.56-.44h-.47c-.16 0-.43.06-.66.31-.23.25-.86.84-.86 2.05s.88 2.38 1.01 2.54c.12.17 1.71 2.74 4.22 3.73 2.08.82 2.5.66 2.96.62.45-.04 1.46-.6 1.67-1.18.2-.58.2-1.07.15-1.18-.06-.1-.22-.17-.46-.29-.25-.12-1.46-.72-1.68-.8-.23-.09-.39-.13-.56.12-.16.25-.63.8-.78.96-.14.17-.29.19-.53.07-.25-.13-1.04-.39-1.99-1.23-.73-.66-1.23-1.46-1.37-1.71-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.55-1.34-.77-1.83Z" />
    </svg>
  );
}

const MESSAGE = `Bonjour ${BRAND.name} ${BRAND.city}, je voudrais des informations sur les abonnements.`;

/* Bouton flottant présent sur toutes les pages (monté dans App).
   Pulsation lente + libellé qui se déplie au survol ; sous
   prefers-reduced-motion la pastille reste fixe et le libellé visible. */
export function WhatsAppFab() {
  const still = useReducedMotion();

  return (
    <motion.a
      className={'wa-fab' + (still ? ' wa-fab--still' : '')}
      href={wa(MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Écrire au club sur WhatsApp"
      initial={{ opacity: 0, scale: still ? 1 : 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: still ? 0.4 : 0.7, ease: EASE, delay: still ? 0 : 1.2 }}
    >
      <span className="wa-fab__icon">
        <WhatsAppIcon size={26} />
      </span>
      <span className="wa-fab__label">Écris-nous</span>
    </motion.a>
  );
}
