import React from 'react';
import { motion } from 'framer-motion';
import { Telegram, WhatsApp, Envelope, ArrowRight, Leaf, Check, Message } from './ui/icons';
import { AnimatedRays } from './ui/animated-rays';

export default function Hero() {
    return (
        <section id="home" className="relative isolate overflow-hidden bg-neutral-50 pb-16 pt-32 sm:pb-24 sm:pt-40 lg:pt-44">
            <AnimatedRays />
            <div className="page-container relative z-10">
                <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
                    <motion.div initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <h1 className="mb-7 font-medium">
                            <span className="section-label !font-sans"><Leaf size={15} /> Психолог · Тьютор · Профориентолог</span>
                            <span className="block text-[72px] leading-[0.9] sm:text-[100px] xl:text-[120px]">Юлия<br /><span className="italic text-primary-dark">Попова</span><span className="text-accent">.</span></span>
                        </h1>
                        <p className="max-w-lg text-base leading-relaxed text-neutral-600 sm:text-lg">Помогаю детям, подросткам и взрослым найти свой путь в учёбе, карьере и отношениях. Комплексный подход к решению ваших задач. Онлайн и очно в Москве.</p>
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                            <a href="#contacts" className="btn-primary">Записаться на консультацию <ArrowRight size={16} /></a>
                            <a href="#about" className="btn-secondary">Познакомиться ближе</a>
                        </div>
                        <p className="mt-5 flex items-center gap-2 text-xs text-neutral-600"><Check size={13} className="text-primary" /> Первая встреча — бесплатно. Без обязательств.</p>
                        <div className="mt-8 flex items-center gap-3">
                            <a href="https://t.me/MissisPoppins" target="_blank" rel="noopener noreferrer" className="icon-link" aria-label="Telegram"><Telegram size={21} /></a>
                            <a href="https://wa.me/79688274447" target="_blank" rel="noopener noreferrer" className="icon-link" aria-label="WhatsApp"><WhatsApp size={21} /></a>
                            <a href="mailto:radio.popova@gmail.com" className="icon-link" aria-label="Email"><Envelope size={18} /></a>
                            <span className="ml-2 max-w-32 text-xs leading-relaxed text-neutral-600">Начать можно<br />с простого сообщения</span>
                        </div>
                    </motion.div>
                    <motion.div initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }} className="relative mx-auto w-full max-w-[460px] px-5 pb-8 sm:px-8">
                        <div aria-hidden="true" className="absolute inset-x-5 bottom-4 top-3 rotate-6 rounded-[48%_48%_38%_38%] border border-primary/25 sm:inset-x-8" />
                        <div className="relative aspect-[0.92] overflow-hidden rounded-[48%_48%_38%_38%] bg-primary-light/35 ring-8 ring-white/60">
                            <img src="/images/popova-001.png" alt="Юлия Попова, психолог и тьютор" fetchPriority="high" width="512" height="512" className="h-full w-full object-cover" />
                        </div>
                        <div className="absolute bottom-2 left-0 flex items-center gap-3 rounded-2xl border border-primary-dark/10 bg-white px-5 py-4 shadow-[0_8px_24px_-16px_#31513C55] sm:left-1">
                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-50 text-primary-dark"><Message size={19} /></span>
                            <div className="text-xs"><p className="font-bold text-neutral-900">В вашем темпе</p><p className="mt-0.5 text-neutral-600">С вниманием к вашей истории</p></div>
                        </div>
                        <span className="absolute right-0 top-10 inline-flex items-center gap-2 rounded-full border border-primary-dark/10 bg-white px-4 py-2 text-xs font-semibold text-primary-dark"><span className="h-1.5 w-1.5 rounded-full bg-primary" /> Онлайн</span>
                    </motion.div>
                </div>
                <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-primary-dark/15 pt-6 text-xs font-medium text-neutral-600 sm:mt-20">
                    <span>Учёба. Карьера. Отношения.</span><a href="#approach" className="inline-flex items-center gap-2 text-primary-dark">Найдём ваш путь вместе <ArrowRight size={13} /></a>
                </div>
            </div>
        </section>
    );
}
