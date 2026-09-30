// Adapted from VengeanceUI FaqAccordion (MIT), see THIRD_PARTY_NOTICES.md.
// https://github.com/Ashutoshx7/VengeanceUI
import React, { useId, useState } from 'react';
import { cn } from '@/utils/cn';
import { Plus, Minus } from './icons';

export function FaqAccordion({ items = [], className, ...props }) {
    const [activeIndex, setActiveIndex] = useState(null);
    const id = useId();
    return (
        <div className={cn('w-full', className)} {...props}>
            <ul className="space-y-3">
                {items.map((item, index) => {
                    const isActive = activeIndex === index;
                    const panelId = `${id}-panel-${index}`;
                    const buttonId = `${id}-button-${index}`;
                    return (
                        <li key={item.question} className={cn('overflow-hidden rounded-2xl border transition-colors duration-300', isActive ? 'border-primary/35 bg-primary-50' : 'border-primary-dark/10 bg-white')}>
                            <h3>
                                <button type="button" id={buttonId} aria-expanded={isActive} aria-controls={panelId} onClick={() => setActiveIndex(isActive ? null : index)} className="flex w-full items-center gap-4 p-5 text-left font-semibold text-neutral-900 transition-colors hover:bg-primary-50 sm:p-6">
                                    <span className="hidden shrink-0 text-xs font-medium text-primary sm:inline">0{index + 1}</span>
                                    <span className="flex-1 text-sm leading-relaxed sm:text-base">{item.question}</span>
                                    <span className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors', isActive ? 'bg-primary-dark text-white' : 'bg-primary-50 text-primary-dark')}>{isActive ? <Minus size={13} /> : <Plus size={13} />}</span>
                                </button>
                            </h3>
                            <div id={panelId} role="region" aria-labelledby={buttonId} aria-hidden={!isActive} className={cn('grid transition-[grid-template-rows,opacity] duration-300 ease-in-out', isActive ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0')}>
                                <div className="overflow-hidden"><div className="px-5 pb-6 text-sm leading-relaxed text-neutral-600 sm:pl-14 sm:pr-7">{item.answer}</div></div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default FaqAccordion;
