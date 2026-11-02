import React, { useEffect, useId, useState } from 'react';
import { ArrowRight, Calendar, Check, Compass, Leaf, Message, Minus, Plus, Shield } from './ui/icons';
import { serviceGuides } from '../content/site';

const guideIcons = { compass: Compass, leaf: Leaf, shield: Shield };

function ServiceCard({ service, index }) {
    const [expanded, setExpanded] = useState(false);
    const detailsId = useId();
    const Icon = guideIcons[service.icon];

    return (
        <article id={service.id} className={`service-guide-card service-guide-${service.tone}`} data-expanded={expanded} aria-labelledby={`${service.id}-title`}>
            <div className="service-guide-heading">
                <div className="service-guide-decoration mb-5 flex items-center justify-between">
                    <span className="service-guide-icon"><Icon size={22} /></span>
                    <span aria-hidden="true" className="font-display text-4xl opacity-40">0{index + 1}</span>
                </div>
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.14em]">{service.intent}</p>
                <h3 id={`${service.id}-title`} className="service-guide-title">{service.title}</h3>
                <p className="service-guide-summary mt-3 text-sm leading-relaxed text-neutral-600">{service.summary}</p>
                <div className="service-guide-mobile-summary">
                    <p className="font-semibold"><Calendar size={11} className="mr-2" />{service.timing.map(time => time.term).join(" или ")}</p>
                    {service.frequency && <p className="mt-1">{service.frequency}</p>}
                    <p className="mt-2 text-neutral-600">{service.audienceShort}</p>
                </div>
            </div>

            <button type="button" className="service-guide-toggle" aria-expanded={expanded} aria-controls={detailsId} onClick={() => setExpanded(value => !value)}>
                <span>{expanded ? 'Скрыть подробности' : 'Запросы и кому подходит'}<span className="sr-only">: {service.title}</span></span>
                {expanded ? <Minus size={14} /> : <Plus size={14} />}
            </button>

            <div id={detailsId} className="service-guide-details">
                <div className="service-guide-timing">
                    <h4 className="service-guide-label"><Calendar size={12} /> Время</h4>
                    <ul className="space-y-4">
                        {service.timing.map(time => (
                            <li key={time.term}>
                                <p className="mb-1 text-base font-semibold text-neutral-900">{time.term}</p>
                                <p className="text-sm leading-relaxed text-neutral-600">{time.text}</p>
                            </li>
                        ))}
                    </ul>
                    {service.frequency && <p className="service-guide-frequency">{service.frequency}</p>}
                </div>
                <div className="service-guide-needs">
                    <h4 className="service-guide-label">С каким запросом</h4>
                    <p className="mb-4 text-base font-semibold text-neutral-900">{service.needsTitle}</p>
                    {service.needsIntro && <p className="mb-5 text-sm leading-relaxed text-neutral-600">{service.needsIntro}</p>}
                    <ul className="space-y-3">
                        {service.needs.map(need => (
                            <li key={need.title} className="flex items-start gap-2.5 text-sm leading-relaxed">
                                <Check size={11} className="mt-1.5 shrink-0 text-primary" />
                                <div>
                                    <p className={need.text ? 'font-semibold text-neutral-800' : 'text-neutral-700'}>{need.title}</p>
                                    {need.text && <p className="mt-1 text-neutral-600">{need.text}</p>}
                                </div>
                            </li>
                        ))}
                    </ul>
                    {service.additionalNeed && <p className="mt-5 border-l-2 border-primary-light pl-3 text-sm font-medium text-primary-dark">{service.additionalNeed}</p>}
                </div>

                <div className="service-guide-audience">
                    <h4 className="service-guide-label">Кому подходит</h4>
                    <ul className="space-y-2 text-sm leading-relaxed text-neutral-700">
                        {service.audience.map(person => <li key={person} className="flex gap-2.5"><span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/50" />{person}</li>)}
                    </ul>
                </div>
                <a href="#contacts" className="service-guide-contact">{service.button}<ArrowRight size={13} /></a>
            </div>
        </article>
    );
}

export default function ComprehensiveApproach() {
    const [enhanced, setEnhanced] = useState(false);
    // Keep all descriptions readable in SSR/no-JS; enhance mobile after hydration.
    useEffect(() => setEnhanced(true), []);

    return (
        <section id="comprehensive-approach" aria-labelledby="service-guide-title" className="service-guide bg-white py-20 sm:py-28" data-enhanced={enhanced}>
            <div className="page-container">
                <div className="mb-10 grid gap-5 lg:mb-14 lg:grid-cols-[1.3fr_0.7fr] lg:items-end lg:gap-14">
                    <div>
                        <div className="section-label"><Compass size={15} /> Как выбрать формат</div>
                        <h2 id="service-guide-title" className="section-title">Какая помощь<br /><span className="italic text-primary-dark">нужна именно вам?</span></h2>
                    </div>
                    <p className="max-w-md text-base leading-relaxed text-neutral-600 lg:pb-1">Три направления — для разных задач и жизненных ситуаций. Ориентируйтесь на свой запрос и время, которое у вас есть.</p>
                </div>

                <div className="service-guide-grid">
                    {serviceGuides.map((service, index) => <ServiceCard key={service.id} service={service} index={index} />)}
                </div>

                <div className="mt-7 flex flex-col gap-6 rounded-3xl bg-primary-50 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-start gap-4">
                        <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-primary-dark sm:flex"><Message size={20} /></span>
                        <div>
                            <h3 className="mb-2 text-lg font-semibold text-neutral-900">Пока не знаете, что выбрать?</h3>
                            <p className="max-w-xl text-sm leading-relaxed text-neutral-600">Необязательно приходить с готовым ответом. На бесплатной встрече-знакомстве за 20 минут обсудим вашу ситуацию и выберем подходящий формат.</p>
                        </div>
                    </div>
                    <a href="#contacts" className="btn-primary shrink-0">Помогите выбрать <ArrowRight size={14} /></a>
                </div>
                <p className="mt-6 text-center text-sm text-neutral-600">Уже определились? <a href="#pricing" className="text-link">Посмотреть стоимость <ArrowRight size={12} /></a></p>
            </div>
        </section>
    );
}
