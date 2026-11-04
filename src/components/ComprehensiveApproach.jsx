import React, { useEffect, useState } from 'react';
import { ArrowRight, Compass, Route } from './ui/icons';
import ConsultationQuiz, { quizIcons } from './ConsultationQuiz';
import { quizResults } from '../content/consultationQuiz';

export default function ComprehensiveApproach({ onOpenPrivacyPolicy }) {
    const [open, setOpen] = useState(false);
    const [hydrated, setHydrated] = useState(false);
    useEffect(() => setHydrated(true), []);

    return (
        <section id="comprehensive-approach" aria-labelledby="consultation-guide-title" className="bg-white py-20 sm:py-28">
            <div className="page-container">
                <div className="quiz-invitation">
                    <div className="quiz-invitation-copy">
                        <div className="section-label"><Compass size={15} /> Как выбрать помощь</div>
                        <h2 id="consultation-guide-title" className="section-title">С чего начать<br /><span className="italic text-primary-dark">именно вам?</span></h2>
                        <p className="mt-6 max-w-lg text-base leading-relaxed text-neutral-600">Профориентация, тьютор или психолог? Ответьте на несколько вопросов о подростке — и узнайте, какой формат может подойти вашей семье.</p>
                        <p className="quiz-invitation-meta"><Route size={14} /> До 5 коротких вопросов · Результат сразу</p>
                        <button type="button" disabled={!hydrated} onClick={() => setOpen(true)} className="btn-primary quiz-start" aria-haspopup="dialog">Узнать, какая консультация нужна <ArrowRight size={16} className="shrink-0" /></button>
                        <p className="mt-4 text-xs leading-relaxed text-neutral-600">Контакты понадобятся только если вы решите записаться.</p>
                        <noscript><p className="mt-4 text-sm">Чтобы пройти тест, включите JavaScript. Или <a href="#contacts" className="text-link">свяжитесь с Юлией</a> — выберем формат вместе.</p></noscript>
                    </div>
                    <div className="quiz-formats" aria-label="Форматы помощи">
                        <p className="quiz-formats-eyebrow">У каждой ситуации — свой первый шаг</p>
                        {Object.values(quizResults).map(result => {
                            const Icon = quizIcons[result.icon];
                            return <article id={result.anchor} key={result.id} className="quiz-format"><span className="quiz-format-icon"><Icon size={20} /></span><div><h3>{result.title}</h3><p>{result.teaser}</p></div></article>;
                        })}
                    </div>
                </div>
                <div className="quiz-guide-footer"><p>Ищете консультацию для себя? <a href="#contacts" className="text-link">Обсудим ваш запрос</a> на бесплатной встрече.</p><a href="#pricing" className="text-link">Посмотреть стоимость <ArrowRight size={12} /></a></div>
            </div>
            <ConsultationQuiz open={open} onClose={() => setOpen(false)} onOpenPrivacyPolicy={onOpenPrivacyPolicy} />
        </section>
    );
}
