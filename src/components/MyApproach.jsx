import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Route, Lightbulb, Leaf } from './ui/icons';

const principles = [
    { icon: Compass, title: 'Стратегия', text: 'Помогаю увидеть картину целиком и построить долгосрочный план действий.' },
    { icon: Route, title: 'Маршрут', text: 'Выстраиваю индивидуальный образовательный и карьерный маршрут.' },
    { icon: Lightbulb, title: 'Ясность', text: 'Вношу ясность в сложные ситуации выбора и самоопределения.' },
];

export default function MyApproach() {
    return (
        <section id="approach" className="bg-primary-50 py-20 sm:py-28">
            <div className="page-container">
                <div className="grid gap-8 lg:grid-cols-2 lg:gap-20">
                    <div><div className="section-label"><Leaf size={14} /> Как я работаю</div><h2 className="section-title">Видеть человека.<br /><span className="italic text-primary-dark">Находить путь.</span></h2></div>
                    <div className="space-y-5 text-base leading-relaxed text-neutral-600 sm:text-lg lg:pt-10">
                        <p>Моя особенность — <strong className="font-semibold text-primary-dark">комплексный подход</strong>. Я помогаю не только разобраться с психологическими трудностями, но и выстроить образовательный маршрут, найти профессиональное призвание.</p>
                        <p>Если у вас запутанная ситуация, где переплелись учёба, самоопределение и семейные отношения — вы попали по адресу. Я умею распутывать сложные клубки и находить решения.</p>
                    </div>
                </div>
                <div className="mt-12 grid gap-4 md:grid-cols-3 sm:mt-16 sm:gap-6">
                    {principles.map((item, index) => (
                        <motion.div key={item.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="rounded-2xl border border-primary-dark/10 bg-white/75 p-7 sm:p-8">
                            <div className="mb-7 flex items-center justify-between"><span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 text-primary-dark"><item.icon size={21} /></span><span className="font-display text-3xl text-primary/50">0{index + 1}</span></div>
                            <h3 className="mb-3 text-xl font-semibold text-neutral-900">{item.title}</h3><p className="text-sm leading-relaxed text-neutral-600">{item.text}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
