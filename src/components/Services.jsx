import React from 'react';
import { Compass, Path, Handshake, Check } from 'phosphor-react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

const services = [
    {
        icon: Compass,
        title: "Профориентация «Точка А»",
        description: "Комплексное тестирование, анализ результатов, рекомендации по выбору направления. Для тех, кто хочет получить ответ и действовать самостоятельно.",
        features: [
            "Диагностика интересов и способностей",
            "Анализ личностных особенностей",
            "Рекомендации по профессиям",
            "Отчёт с результатами"
        ],
        color: "primary"
    },
    {
        icon: Path,
        title: "Профориентация «От А до Я»",
        description: "Тестирование + индивидуальное сопровождение до момента, когда вы сами всё поймёте и сделаете. Для тех, кому нужна поддержка на пути.",
        features: [
            "Всё из базового пакета",
            "4-6 сессий сопровождения",
            "Разбор конкретных шагов",
            "Поддержка в принятии решений"
        ],
        popular: true,
        color: "secondary"
    },
    {
        icon: Handshake,
        title: "Всё включено",
        description: "Когда проблема не только в выборе профессии, но и в семейных отношениях. Объединяем профориентацию с семейной терапией для целостного решения.",
        features: [
            "Всё из пакета «От А до Я»",
            "Семейные сессии",
            "Работа с детско-родительскими отношениями",
            "Глубинная проработка запросов"
        ],
        color: "accent"
    }
];

export default function Services() {
    return (
        <section id="services" className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <div className="inline-block mb-4 px-4 py-1 bg-primary/15 text-primary-dark rounded-full text-sm font-semibold tracking-wide uppercase">
                        Услуги
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                        Как я могу помочь вам?
                    </h2>
                    <p className="text-neutral-700 text-lg">
                        Выберите подходящий формат работы — от базовой консультации до комплексного
                        сопровождения
                    </p>
                </div>

                <div className="max-w-6xl mx-auto grid gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className={cn(
                                "bg-white rounded-2xl p-8 md:p-10 transition-all hover:shadow-xl border border-gray-100",
                                service.popular && "ring-2 ring-secondary shadow-lg relative overflow-hidden"
                            )}
                        >
                            {service.popular && (
                                <div className="absolute top-0 right-0 bg-secondary text-white text-xs font-bold px-4 py-1 rounded-bl-xl">
                                    ПОПУЛЯРНО
                                </div>
                            )}

                            <div className="flex flex-col md:flex-row gap-8">
                                <div className="flex-shrink-0">
                                    <div className={cn(
                                        "w-16 h-16 rounded-2xl flex items-center justify-center",
                                        service.color === 'primary' && "bg-primary/10 text-primary",
                                        service.color === 'secondary' && "bg-secondary/10 text-secondary",
                                        service.color === 'accent' && "bg-accent/10 text-accent-dark",
                                    )}>
                                        <service.icon size={32} weight="fill" />
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-neutral-900 mb-3">
                                        {service.title}
                                    </h3>
                                    <p className="text-neutral-700 leading-relaxed mb-6 text-lg">
                                        {service.description}
                                    </p>

                                    <div className="bg-gray-50 rounded-xl p-6">
                                        <p className="font-semibold text-neutral-900 mb-4">Что включает:</p>
                                        <div className="grid sm:grid-cols-2 gap-3">
                                            {service.features.map((feature, idx) => (
                                                <div key={idx} className="flex items-start gap-3 text-neutral-700">
                                                    <div className={cn(
                                                        "mt-1 p-0.5 rounded-full",
                                                        service.color === 'primary' && "bg-primary/20 text-primary",
                                                        service.color === 'secondary' && "bg-secondary/20 text-secondary",
                                                        service.color === 'accent' && "bg-accent/20 text-accent-dark",
                                                    )}>
                                                        <Check size={12} weight="bold" />
                                                    </div>
                                                    <span>{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
