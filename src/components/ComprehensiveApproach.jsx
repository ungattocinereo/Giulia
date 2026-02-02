import React from 'react';
import { Check, Star, Crown } from 'phosphor-react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

const services = [
    {
        title: "Индивидуальная сессия",
        description: "Психологическая консультация или тьюторская сессия",
        duration: "60–90 мин",
        price: "4 000 ₽",
        features: ["Личная работа", "Разбор ситуации", "Рекомендации"],
        highlight: false
    },
    {
        title: "Парная/семейная сессия",
        description: "Работа с парой или семьёй (родитель + ребёнок)",
        duration: "90 мин",
        price: "5 000 ₽",
        features: ["Работа с отношениями", "Медиация конфликтов", "Общие решения"],
        highlight: false
    },
    {
        title: "Профориентация",
        description: "Глубокий анализ, подбор профессий, план действий",
        duration: "120–180 мин",
        price: "25 000 ₽",
        features: ["Тестирование", "Анализ личности", "Карьерная карта", "План развития"],
        highlight: "top",
        badge: "ХИТ"
    },
    {
        title: "Пакет «Всё включено»",
        description: "Профориентация + семейная терапия + сопровождение",
        duration: "Индивидуально",
        price: "от 30 000 ₽",
        features: ["Полная диагностика", "Семейные сессии", "Сопровождение 1 месяц", "Личная поддержка"],
        highlight: "premium",
        badge: "PREMIUM"
    }
];

export default function ComprehensiveApproach() {
    return (
        <section id="comprehensive-approach" className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <div className="inline-block mb-4 px-4 py-1 bg-secondary/15 text-secondary-dark rounded-full text-sm font-semibold tracking-wide uppercase">
                        Комплексный подход
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                        Варианты работы
                    </h2>
                    <p className="text-neutral-700 text-lg">
                        Выберите формат, который подходит именно вам. От разовых консультаций до полного сопровождения.
                    </p>
                </div>

                <div className="max-w-5xl mx-auto overflow-x-auto">
                    <div className="min-w-[800px] bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                        {/* Table Header */}
                        <div className="grid grid-cols-12 bg-gray-50 p-6 border-b border-gray-100 text-sm font-bold text-gray-500 uppercase tracking-wider">
                            <div className="col-span-4">Услуга</div>
                            <div className="col-span-4">Что входит</div>
                            <div className="col-span-2 text-center">Длительность</div>
                            <div className="col-span-2 text-right">Цена</div>
                        </div>

                        {/* Table Body */}
                        <div className="divide-y divide-gray-100">
                            {services.map((service, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className={cn(
                                        "grid grid-cols-12 p-6 items-center hover:bg-gray-50/50 transition-colors relative",
                                        service.highlight === 'top' && "bg-primary/5 hover:bg-primary/10",
                                        service.highlight === 'premium' && "bg-secondary/5 hover:bg-secondary/10"
                                    )}
                                >
                                    {/* Service Name */}
                                    <div className="col-span-4 pr-4">
                                        <div className="flex items-center gap-3">
                                            {service.highlight === 'top' && <Star className="text-primary" weight="fill" size={20} />}
                                            {service.highlight === 'premium' && <Crown className="text-secondary" weight="fill" size={20} />}

                                            <div>
                                                <h3 className="font-bold text-neutral-900 text-lg flex items-center gap-2">
                                                    {service.title}
                                                    {service.badge && (
                                                        <span className={cn(
                                                            "text-[10px] px-2 py-0.5 rounded-full text-white font-bold uppercase",
                                                            service.highlight === 'top' ? "bg-primary" : "bg-secondary"
                                                        )}>
                                                            {service.badge}
                                                        </span>
                                                    )}
                                                </h3>
                                                <p className="text-sm text-gray-500 mt-1">{service.description}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Features */}
                                    <div className="col-span-4 pr-4">
                                        <ul className="space-y-1">
                                            {service.features.slice(0, 2).map((feature, idx) => (
                                                <li key={idx} className="flex items-center gap-2 text-sm text-neutral-700">
                                                    <Check size={14} className="text-green-500 flex-shrink-0" weight="bold" />
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                            {service.features.length > 2 && (
                                                <li className="text-xs text-gray-400 pl-6">+ ещё {service.features.length - 2}</li>
                                            )}
                                        </ul>
                                    </div>

                                    {/* Duration */}
                                    <div className="col-span-2 text-center font-medium text-neutral-700">
                                        {service.duration}
                                    </div>

                                    {/* Price */}
                                    <div className="col-span-2 text-right">
                                        <div className="font-bold text-xl text-neutral-900">{service.price}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
