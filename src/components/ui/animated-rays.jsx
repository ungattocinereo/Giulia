// Adapted from VengeanceUI AnimatedRays (MIT), see THIRD_PARTY_NOTICES.md.
// https://github.com/Ashutoshx7/VengeanceUI
import { cn } from '@/utils/cn';

export function AnimatedRays({ className }) {
    const stripes = 'repeating-linear-gradient(100deg, #fbf8f1 0%, #fbf8f1 7%, transparent 10%, transparent 12%, #fbf8f1 16%)';
    const colors = 'repeating-linear-gradient(100deg, #b0c49e 10%, #f5c08f 15%, #b0c49e 20%, #dbe6c8 25%, #b0c49e 30%)';
    return (
        <div aria-hidden="true" className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
            <div className="rays-layer absolute -inset-10" style={{ backgroundImage: `${stripes}, ${colors}`, backgroundSize: '300%, 200%' }}>
                <div className="rays-motion absolute inset-0" style={{ backgroundImage: `${stripes}, ${colors}`, backgroundSize: '200%, 100%' }} />
            </div>
        </div>
    );
}

export default AnimatedRays;
