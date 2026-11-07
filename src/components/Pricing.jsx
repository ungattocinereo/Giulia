import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Check, Calendar, Message, Compass, ArrowRight } from './ui/icons';

import { sessions, services } from '../content/site';

const sessionIcons = { message: Message, compass: Compass };
const fullSupport = services.find(service => service.highlight === 'premium');

export default function Pricing() {
    return (
        <section id="pricing" className="bg-neutral-100 py-20 sm:py-28">
            <div className="page-container">
                <div className="mb-12 text-center sm:mb-16">
                    <div className="section-label"><CreditCard size={15} /> Стоимость</div>
                    <h2 className="section-title mb-5">Стоимость <em className="text-primary-dark">консультаций</em></h2>
                    <p className="text-neutral-600">Начать можно с бесплатной встречи-знакомства.</p>
                </div>
                <div className="grid gap-5 md:grid-cols-3">
                    {sessions.map(session => {
                        const SessionIcon = sessionIcons[session.icon];
                        const isIntro = session.priceValue === 0;
                        return <article key={session.title} className="session-card" data-featured={isIntro}>
                            <div className="mb-6 flex items-center gap-3">
                                <span className="session-icon"><SessionIcon size={18} /></span>
                                <h3 className="text-base font-semibold">{session.title}</h3>
                            </div>
                            <p className="font-display text-5xl font-semibold tracking-tight">{session.price}</p>
                            <p className="session-duration"><Calendar size={13} />{session.duration}</p>
                            <p className="mb-6 flex-1 text-sm leading-relaxed">{session.text}</p>
                            <a href="#contacts" className={isIntro ? 'btn-primary' : 'btn-secondary'}>{session.button}<ArrowRight size={14} /></a>
                        </article>;
                    })}
                </div>
                <motion.div initial={false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative mt-6 overflow-hidden rounded-3xl bg-primary-dark p-7 text-white sm:p-10 lg:p-12">
                    <div aria-hidden="true" className="absolute -right-24 -top-24 h-80 w-80 rounded-full border border-white/10" /><div aria-hidden="true" className="absolute -right-12 -top-12 h-56 w-56 rounded-full border border-white/10" />
                    <div className="relative grid gap-8 lg:grid-cols-[1fr_0.5fr] lg:gap-16">
                        <div>
                            <div className="section-label !text-primary-light"><Compass size={14} /> Комплексная программа</div>
                            <h3 className="mb-5 font-display text-4xl font-medium text-white sm:text-5xl">Профориентация «от А до Я»</h3>
                            <p className="max-w-3xl text-sm leading-relaxed text-white/80 sm:text-base">Комплексная работа над вашим профессиональным путём: анализ интересов, сильных сторон и личных ценностей. Определяем подходящие сферы и варианты карьерного развития. Разбираем реальные шаги и составляем понятный план действий. Подходит подросткам, студентам и взрослым, которые хотят сменить профессию или найти своё дело.</p>
                        </div>
                        <div className="flex flex-col justify-center border-t border-white/20 pt-7 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0"><div className="mb-3 text-4xl font-semibold sm:text-5xl">25 000 ₽</div><span className="mb-6 inline-flex items-center gap-2 text-sm text-white/75"><Calendar size={14} /> 120–180 минут</span><a href="#contacts" className="btn-primary">Записаться <ArrowRight size={15} /></a></div>
                    </div>
                    <ul className="relative mt-8 grid gap-4 border-t border-white/20 pt-7 text-sm text-white/85 md:grid-cols-3">
                        {['Глубокий анализ интересов и способностей', 'Подбор подходящих профессий и сфер', 'Конкретный план действий'].map(text => <li key={text} className="flex items-start gap-3"><Check size={15} className="mt-1 shrink-0 text-primary-light" />{text}</li>)}
                    </ul>
                </motion.div>
                <div className="mt-6 grid gap-6 rounded-3xl border border-primary-dark/10 bg-white p-7 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-10">
                    <div>
                        <p className="section-label !mb-3"><Compass size={13} /> Комплексное сопровождение</p>
                        <h3 className="mb-3 text-xl font-semibold text-neutral-900">{fullSupport.title}</h3>
                        <p className="mb-4 text-sm text-neutral-600">{fullSupport.description}</p>
                        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-neutral-600">{fullSupport.features.map(feature => <li key={feature} className="flex items-center gap-2"><Check size={10} className="text-primary" />{feature}</li>)}</ul>
                    </div>
                    <div className="flex flex-col items-start lg:items-end">
                        <p className="text-3xl font-semibold text-neutral-900">{fullSupport.price}</p>
                        <p className="mb-4 mt-1 text-xs text-neutral-600">Длительность: {fullSupport.duration.toLowerCase()}</p>
                        <a href="#contacts" className="btn-secondary">Обсудить пакет <ArrowRight size={13} /></a>
                    </div>
                </div>
                <div className="mt-8 flex flex-col items-start justify-between gap-5 rounded-2xl border border-primary-dark/10 bg-white/60 p-6 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-4"><CreditCard size={22} className="shrink-0 text-primary" /><div><p className="text-sm font-semibold text-neutral-900">Оплата картой или через СБП</p><p className="mt-1 text-xs text-neutral-600">Visa · Mastercard · Мир · СБП</p></div></div>
                    <a href="#contacts" className="text-link text-left">Уточнить условия отмены и переноса <ArrowRight size={12} /></a>
                </div>
            </div>
        </section>
    );
}
