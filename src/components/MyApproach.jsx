import React from 'react';
import { motion } from 'framer-motion';
import { Strategy, Path, Lightbulb } from 'phosphor-react';

export default function MyApproach() {
    return (
        <section id="approach" className="py-24 bg-neutral-50">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-block mb-4 px-4 py-1 bg-primary/15 text-primary-dark rounded-full text-sm font-semibold tracking-wide uppercase">
                        Как я работаю
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-8">
                        Мой подход
                    </h2>

                    <div className="space-y-8 text-lg text-neutral-700 leading-relaxed">
                        <p>
                            Моя особенность — <strong>комплексный подход</strong>. Я помогаю не только разобраться с психологическими трудностями,
                            но и выстроить образовательный маршрут, найти профессиональное призвание.
                        </p>
                        <p>
                            Если у вас запутанная ситуация, где переплелись учёба, самоопределение и семейные отношения —
                            вы попали по адресу. Я умею распутывать сложные клубки и находить решения.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mt-16 text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                        >
                            <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4">
                                <Strategy size={24} weight="fill" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Стратегия</h3>
                            <p className="text-gray-600">Помогаю увидеть картину целиком и построить долгосрочный план действий.</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                        >
                            <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-lg flex items-center justify-center mb-4">
                                <Path size={24} weight="fill" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Маршрут</h3>
                            <p className="text-gray-600">Выстраиваю индивидуальный образовательный и карьерный маршрут.</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                        >
                            <div className="w-12 h-12 bg-accent/10 text-accent-dark rounded-lg flex items-center justify-center mb-4">
                                <Lightbulb size={24} weight="fill" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Ясность</h3>
                            <p className="text-gray-600">Вношу ясность в сложные ситуации выбора и самоопределения.</p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
