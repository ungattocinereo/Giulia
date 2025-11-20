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
                    {/* Free Intro - Highlighted */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-white rounded-2xl p-8 shadow-xl ring-4 ring-green-100 border-green-200 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-4 py-1 rounded-bl-xl z-10">
                            РЕКОМЕНДУЮ
                        </div>

                        <div className="mb-6">
                            <div className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold mb-4">
                                БЕСПЛАТНО
                            </div>
                            <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                                Встреча-знакомство
                            </h3>
                            <div className="text-gray-500 font-medium">30-40 минут</div>
                        </div>
                        <p className="text-neutral-700 mb-8 leading-relaxed">
                            Знакомимся, обсуждаем вашу ситуацию, определяем формат работы. Никаких обязательств.
                        </p>
                        <button
                            onClick={() => scrollToSection('contacts')}
                            className="w-full bg-green-600 text-white py-4 rounded-xl hover:bg-green-700 transition-all font-bold shadow-lg hover:shadow-green-600/30"
                        >
                            Записаться бесплатно
                        </button>
                    </motion.div>

                    {/* Individual Session */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-coral text-white rounded-2xl p-8 shadow-xl shadow-coral/20 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>

                        <div className="mb-6 relative z-10">
                            <div className="text-4xl font-bold mb-2">4 000 ₽</div>
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
                            <div className="text-4xl font-bold text-secondary mb-2">5 000 ₽</div>
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

                {/* Career Guidance Package - Full Width */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-6xl mx-auto mb-16"
                >
                    <div className="bg-gradient-to-br from-primary to-primary-dark text-white rounded-3xl p-10 md:p-12 shadow-2xl shadow-primary/30 relative overflow-hidden">
                        {/* Decorative elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full -ml-32 -mb-32 blur-3xl"></div>

                        <div className="relative z-10">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-8">
                                <div>
                                    <div className="inline-block bg-white/20 text-white px-4 py-1 rounded-full text-xs font-bold mb-4 tracking-wide uppercase">
                                        Комплексная программа
                                    </div>
                                    <div className="text-5xl md:text-6xl font-bold mb-3">15 000 ₽</div>
                                    <h3 className="text-2xl md:text-3xl font-bold mb-2">
                                        Профориентация «от А до Я»
                                    </h3>
                                    <div className="text-white/80 text-lg">120–180 минут</div>
                                </div>
                            </div>

                            <p className="text-white/90 text-lg leading-relaxed mb-8 max-w-4xl">
                                Комплексная работа над вашим профессиональным путём: анализ интересов, сильных сторон и личных ценностей.
                                Определяем подходящие сферы и варианты карьерного развития. Разбираем реальные шаги и составляем понятный план действий.
                                Подходит подросткам, студентам и взрослым, которые хотят сменить профессию или найти своё дело.
                            </p>

                            <div className="grid md:grid-cols-3 gap-4 mb-8">
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <Check size={16} weight="bold" />
                                    </div>
                                    <span className="text-white/90">Глубокий анализ интересов и способностей</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <Check size={16} weight="bold" />
                                    </div>
                                    <span className="text-white/90">Подбор подходящих профессий и сфер</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <Check size={16} weight="bold" />
                                    </div>
                                    <span className="text-white/90">Конкретный план действий</span>
                                </div>
                            </div>

                            <button
                                onClick={() => scrollToSection('contacts')}
                                className="bg-white text-primary-dark px-8 py-4 rounded-xl hover:bg-neutral-50 transition-all font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1"
                            >
                                Записаться на профориентацию
                            </button>
                        </div>
                    </div>
                </motion.div>

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
