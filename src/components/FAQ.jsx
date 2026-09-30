import React from 'react';
import { CircleQuestion, ArrowRight } from './ui/icons';
import { FaqAccordion } from './ui/faq-accordion';

import { faqs } from '../content/site';

const items = faqs.map(faq => ({
    question: faq.question,
    answer: <div className="space-y-3">{faq.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>,
}));

export default function FAQ() {
    return (
        <section id="faq" className="bg-neutral-50 py-20 sm:py-28">
            <div className="page-container grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
                <div>
                    <div className="section-label"><CircleQuestion size={15} /> Частые вопросы</div>
                    <h2 className="section-title mb-6">Перед первой<br />встречей</h2>
                    <p className="max-w-sm text-neutral-600">Ответы на самые популярные вопросы о работе со мной.</p>
                    <a href="#contacts" className="text-link mt-7">Задать свой вопрос <ArrowRight size={14} /></a>
                </div>
                <FaqAccordion items={items} />
            </div>
        </section>
    );
}
