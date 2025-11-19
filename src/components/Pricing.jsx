import React from 'react';
import { CreditCard, Check } from 'phosphor-react';
import { motion } from 'framer-motion';

export default function Pricing({ onOpenModal }) {
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <section id="pricing" className="py-24 bg-neutral-100">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <div className="inline-block mb-4 px-4 py-1 bg-accent/10 text-accent-dark rounded-full text-sm font-semibold tracking-wide uppercase">
                        Стоимость
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                        Прозрачные цены
                    </h2>
                    <p className="text-neutral-700 text-lg">
                        Без скрытых платежей. Первая встреча — бесплатно!
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
                    {/* Free Intro */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all"
                    >
                        <div className="mb-6">
                            <div className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold mb-4">
                                БЕСПЛАТНО
                            </div>
                            <h3 className="text-xl font-bold text-neutral-900 mb-2">
                                Встреча-знакомство
                            </h3>
                            <div className="text-gray-500">30-40 минут</div>
                        </div>
                        <p className="text-neutral-700 mb-8 leading-relaxed">
                            Знакомимся, обсуждаем вашу ситуацию, определяем формат работы
                        </p>
                        <button
                            onClick={() => scrollToSection('contacts')}
                            className="w-full bg-neutral-100 text-neutral-900 py-3 rounded-xl hover:bg-neutral-200 transition-colors font-semibold"
                        >
                            Записаться
                        </button>
                    </motion.div>

                    {/* Individual Session */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-coral text-white rounded-2xl p-8 shadow-xl shadow-coral/20 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>

                        <div className="mb-6 relative z-10">
                            <div className="text-4xl font-bold mb-2">3 500 ₽</div>
                            <h3 className="text-xl font-medium text-white/90 mb-2">
                                Индивидуальная сессия
                            </h3>
                            <div className="text-white/70">60-90 минут</div>
                        </div>
                        <p className="text-white/80 mb-8 leading-relaxed relative z-10">
                            Работа один на один: психологическая консультация или тьюторская сессия
                        </p>
                        <button
                            onClick={() => scrollToSection('contacts')}
                            className="w-full bg-white text-coral-dark py-3 rounded-xl hover:bg-neutral-50 transition-colors font-bold relative z-10"
                        >
                            Записаться
                        </button>
                    </motion.div>

                    {/* Family Session */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all"
                    >
                        <div className="mb-6">
                            <div className="text-4xl font-bold text-secondary mb-2">4 500 ₽</div>
                            <h3 className="text-xl font-bold text-neutral-900 mb-2">
                                Парная/семейная сессия
                            </h3>
                            <div className="text-gray-500">90 минут</div>
                        </div>
                        <p className="text-neutral-700 mb-8 leading-relaxed">
                            Работа с парой или семьёй: родитель + ребёнок, два родителя
                        </p>
                        <button
                            onClick={() => scrollToSection('contacts')}
                            className="w-full bg-secondary/10 text-secondary-dark py-3 rounded-xl hover:bg-secondary/20 transition-colors font-semibold"
                        >
                            Записаться
                        </button>
                    </motion.div>
                </div>

                {/* Payment Info */}
                <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-400">
                                <CreditCard size={24} />
                            </div>
                            <div>
                                <p className="font-semibold text-neutral-900 mb-1">
                                    Оплата картой или через СБП
                                </p>
                                <div className="flex gap-2 text-sm text-gray-500">
                                    <span>Visa</span> • <span>Mastercard</span> • <span>Мир</span> • <span>СБП</span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => onOpenModal('payment-policy')}
                            className="text-primary-dark font-medium hover:text-primary hover:underline"
                        >
                            Правила отмены и переносов
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
