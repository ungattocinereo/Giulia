import React, { useState } from 'react';
import { CaretDown } from 'phosphor-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

const faqs = [
    {
        question: "Как проходит встреча-знакомство?",
        answer: "Встреча-знакомство длится 30-40 минут и проходит онлайн или офлайн. На ней мы знакомимся, вы рассказываете о своей ситуации и запросе, а я объясняю, как могу помочь. Это возможность понять, подходим ли мы друг другу, и выбрать формат дальнейшей работы. Никаких обязательств — встреча полностью бесплатна."
    },
    {
        question: "В чём отличие психолога от тьютора?",
        answer: (
            <>
                <p className="mb-3">
                    <strong>Психолог</strong> работает с эмоциями, отношениями,
                    внутренними конфликтами и помогает разобраться в себе. Например:
                    тревога, низкая самооценка, сложности в отношениях.
                </p>
                <p>
                    <strong>Тьютор</strong> помогает выстроить образовательный маршрут,
                    организовать учёбу, найти мотивацию и раскрыть потенциал. Например:
                    профориентация, помощь с выбором вуза, планирование учёбы.
                </p>
                <p className="mt-3 text-primary-dark font-medium">
                    Я совмещаю обе роли — работаю и с психологическими запросами, и с
                    образовательными задачами.
                </p>
            </>
        )
    },
    {
        question: "Как понять, какой пакет мне подходит?",
        answer: "Если у вас есть конкретный вопрос по выбору профессии — подойдет «Точка А». Если нужна поддержка и сопровождение — «От А до Я». Если ситуация затрагивает семейные отношения — «Всё включено». На бесплатной встрече-знакомстве мы вместе определим оптимальный вариант."
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                        Часто задаваемые вопросы
                    </h2>
                    <p className="text-neutral-700 text-lg">
                        Ответы на самые популярные вопросы о работе со мной
                    </p>
                </div>

                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-primary/30 transition-colors"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                            >
                                <span className="font-semibold text-neutral-900 text-lg pr-8">
                                    {faq.question}
                                </span>
                                <CaretDown
                                    size={24}
                                    className={cn(
                                        "flex-shrink-0 text-gray-400 transition-transform duration-300",
                                        openIndex === index && "transform rotate-180 text-primary-dark"
                                    )}
                                />
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="px-8 pb-8 text-neutral-700 leading-relaxed border-t border-gray-50 pt-4">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
