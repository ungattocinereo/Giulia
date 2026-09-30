import React from 'react';
import { Check, Star, Crown, Calendar, Compass } from './ui/icons';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

import { services } from '../content/site';

export default function ComprehensiveApproach() {
    return (
        <section id="comprehensive-approach" className="bg-white py-20 sm:py-28">
            <div className="page-container">
                <div className="mb-12 max-w-2xl"><div className="section-label"><Compass size={15} /> Комплексный подход</div><h2 className="section-title mb-5">Ваш запрос.<br /><span className="italic text-primary-dark">Ваш формат работы.</span></h2><p className="text-neutral-600">Выберите формат, который подходит именно вам. От разовых консультаций до полного сопровождения.</p></div>
                <div className="overflow-hidden rounded-3xl border border-primary-dark/10">
                    <div className="hidden grid-cols-[1.2fr_1.1fr_0.65fr_0.6fr] gap-6 bg-neutral-50 px-7 py-5 text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-600 lg:grid"><span>Услуга</span><span>Что входит</span><span>Длительность</span><span className="text-right">Стоимость</span></div>
                    <div className="divide-y divide-primary-dark/10">
                        {services.map((service, index) => (
                            <motion.div key={service.title} initial={false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} className={cn('grid gap-5 p-6 sm:p-7 lg:grid-cols-[1.2fr_1.1fr_0.65fr_0.6fr] lg:items-center lg:gap-6', service.highlight === 'top' && 'bg-primary-50/60', service.highlight === 'premium' && 'bg-secondary-50')}>
                                <div><div className="mb-2 flex flex-wrap items-center gap-2"><h3 className="text-base font-semibold text-neutral-900">{service.title}</h3>{service.badge && <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-dark/10 px-2 py-1 text-[9px] font-bold tracking-wide text-primary-dark">{service.highlight === 'premium' ? <Crown size={10} /> : <Star size={10} />}{service.badge}</span>}</div><p className="text-xs leading-relaxed text-neutral-600">{service.description}</p></div>
                                <ul className="space-y-2">{service.features.map(feature => <li key={feature} className="flex items-start gap-2 text-xs text-neutral-600"><Check size={11} className="mt-1 shrink-0 text-primary" />{feature}</li>)}</ul>
                                <span className="inline-flex items-center gap-2 text-xs text-neutral-600"><Calendar size={12} />{service.duration}</span>
                                <span className="text-xl font-semibold tracking-tight text-neutral-900 lg:text-right">{service.price}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
