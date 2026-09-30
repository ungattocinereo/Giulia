import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Check, Calendar, Message, Compass, ArrowRight, Star } from './ui/icons';

import { sessions } from '../content/site';

const sessionIcons = { message: Message, compass: Compass };

export default function Pricing({ onOpenModal }) {
    return (
        <section id="pricing" className="bg-neutral-100 py-20 sm:py-28">
            <div className="page-container">
                <div className="mb-12 text-center sm:mb-16">
                    <div className="section-label"><CreditCard size={15} /> Стоимость</div>
                    <h2 className="section-title mb-5">Понятный формат.<br /><span className="italic text-primary-dark">Прозрачные цены.</span></h2>
                    <p className="text-neutral-600">Без скрытых платежей. Первая встреча — бесплатно!</p>
                </div>
                <div className="grid gap-5 md:grid-cols-3">
                    {sessions.map((session, index) => {
                        const SessionIcon = sessionIcons[session.icon];
                        return (
                        <motion.div key={session.title} whileHover={{ y: -4 }} className={`flex flex-col rounded-3xl border p-7 sm:p-8 ${session.dark ? 'border-primary-dark bg-primary-dark text-white' : 'border-primary-dark/10 bg-white text-neutral-900'}`}>
                            <div className="mb-7 flex items-center justify-between"><span className={`flex h-11 w-11 items-center justify-center rounded-full ${session.dark ? 'bg-white/10' : 'bg-primary-50 text-primary-dark'}`}><SessionIcon size={19} /></span>{index === 0 && <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-[10px] font-bold tracking-wide text-primary-dark"><Star size={10} /> РЕКОМЕНДУЮ</span>}</div>
                            <div className="mb-4 text-3xl font-semibold tracking-tight sm:text-4xl">{session.price}</div>
                            <h3 className="mb-3 text-lg font-semibold">{session.title}</h3>
                            <div className={`mb-5 flex items-center gap-2 text-xs ${session.dark ? 'text-white/75' : 'text-neutral-600'}`}><Calendar size={12} /> {session.duration}</div>
                            <p className={`mb-8 flex-1 text-sm leading-relaxed ${session.dark ? 'text-white/80' : 'text-neutral-600'}`}>{session.text}</p>
                            <a href="#contacts" className={index === 0 ? 'btn-primary w-full' : `btn-secondary w-full ${session.dark ? '!border-white/30 !bg-transparent !text-white hover:!bg-white/10' : ''}`}>{session.button}<ArrowRight size={14} /></a>
                        </motion.div>
                    ); })}
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
                <div className="mt-8 flex flex-col items-start justify-between gap-5 rounded-2xl border border-primary-dark/10 bg-white/60 p-6 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-4"><CreditCard size={22} className="shrink-0 text-primary" /><div><p className="text-sm font-semibold text-neutral-900">Оплата картой или через СБП</p><p className="mt-1 text-xs text-neutral-600">Visa · Mastercard · Мир · СБП</p></div></div>
                    <button type="button" onClick={() => onOpenModal('payment-policy')} className="text-link text-left">Правила отмены и переносов <ArrowRight size={12} /></button>
                </div>
            </div>
        </section>
    );
}
