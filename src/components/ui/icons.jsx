import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { faTelegram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import {
    faArrowRight, faBars, faXmark, faPlus, faMinus, faCheck, faStar, faCrown,
    faCreditCard, faCompass, faRoute, faLightbulb, faCalendarDays, faLeaf,
    faEnvelope, faPhone, faCommentDots, faCircleQuestion, faSpinner, faShieldHeart,
} from '@fortawesome/free-solid-svg-icons';

config.autoAddCss = false;

// Import individual icons so the complete Font Awesome libraries aren't bundled.
function createIcon(definition) {
    return function Icon({ size = 20, style, ...props }) {
        return <FontAwesomeIcon icon={definition} style={{ fontSize: size, ...style }} {...props} />;
    };
}

export const Telegram = createIcon(faTelegram);
export const WhatsApp = createIcon(faWhatsapp);
export const Envelope = createIcon(faEnvelope);
export const Phone = createIcon(faPhone);
export const ArrowRight = createIcon(faArrowRight);
export const Menu = createIcon(faBars);
export const Close = createIcon(faXmark);
export const Plus = createIcon(faPlus);
export const Minus = createIcon(faMinus);
export const Check = createIcon(faCheck);
export const Star = createIcon(faStar);
export const Crown = createIcon(faCrown);
export const CreditCard = createIcon(faCreditCard);
export const Compass = createIcon(faCompass);
export const Route = createIcon(faRoute);
export const Lightbulb = createIcon(faLightbulb);
export const Calendar = createIcon(faCalendarDays);
export const Leaf = createIcon(faLeaf);
export const Message = createIcon(faCommentDots);
export const CircleQuestion = createIcon(faCircleQuestion);
export const Spinner = createIcon(faSpinner);
export const Shield = createIcon(faShieldHeart);
