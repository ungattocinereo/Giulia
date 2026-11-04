import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Calendar, Check, Close, Compass, Leaf, Lightbulb, People, Restart, Shield } from './ui/icons';
import Dialog from './ui/Dialog';
import ContactForm from './ContactForm';
import { getQuizState, QUIZ_MAX_QUESTIONS } from '../content/consultationQuiz';

export const quizIcons = { compass: Compass, calendar: Calendar, lightbulb: Lightbulb, shield: Shield, leaf: Leaf, people: People };

export default function ConsultationQuiz({ open, onClose, onOpenPrivacyPolicy }) {
    const [answers, setAnswers] = useState([]);
    const [formStatus, setFormStatus] = useState(null);
    const heading = useRef(null);
    const scroll = useRef(null);
    const contact = useRef(null);
    const { questionId, question, result, path } = getQuizState(answers);
    const Icon = quizIcons[(question || result).icon];
    const busy = formStatus === 'loading';
    const stage = result ? 'result' : questionId;

    useEffect(() => {
        if (!open) return;
        scroll.current?.scrollTo({ top: 0, behavior: 'instant' });
        heading.current?.focus({ preventScroll: true });
    }, [open, stage]);

    const answer = value => setAnswers(previous => getQuizState(previous).questionId === questionId ? [...previous, value] : previous);
    const back = () => { setFormStatus(null); setAnswers(previous => previous.slice(0, -1)); };
    const restart = () => { setFormStatus(null); setAnswers([]); };

    return (
        <Dialog open={open} onClose={onClose} labelledBy="quiz-dialog-title" className="quiz-dialog">
            <div className="quiz-dialog-header">
                <span><Compass size={16} /> Подбор консультации</span>
                <button type="button" className="quiz-icon-button" onClick={onClose} aria-label="Закрыть тест"><Close size={18} /></button>
            </div>
            <div ref={scroll} className="quiz-dialog-scroll">
                <div key={stage} className="quiz-stage">
                    {!result ? (
                        <>
                            <div className="quiz-progress-label"><span>Вопрос {answers.length + 1}</span><span>Всего — до {QUIZ_MAX_QUESTIONS}</span></div>
                            <div className="quiz-progress" aria-hidden="true">{Array.from({ length: QUIZ_MAX_QUESTIONS }, (_, index) => <span key={index} data-complete={index <= answers.length} />)}</div>
                            <span className="quiz-question-icon"><Icon size={24} /></span>
                            <h2 id="quiz-dialog-title" ref={heading} tabIndex={-1} data-dialog-focus className="quiz-question-title">{question.title}</h2>
                            <p className="quiz-hint">{question.hint}</p>
                            {question.examples && <ul className="quiz-examples">{question.examples.map(example => <li key={example}><span aria-hidden="true" />{example}</li>)}</ul>}
                            <div className="quiz-options" aria-label="Варианты ответа">
                                <button type="button" onClick={() => answer(true)} className="quiz-option quiz-option-yes"><span className="quiz-option-symbol"><Check size={16} /></span><span>{question.yesLabel || 'Да'}</span><ArrowRight size={14} /></button>
                                <button type="button" onClick={() => answer(false)} className="quiz-option"><span className="quiz-option-symbol"><Close size={15} /></span><span>{question.noLabel || 'Нет'}</span><ArrowRight size={14} /></button>
                            </div>
                            <div className="quiz-step-footer">
                                <button type="button" onClick={back} disabled={!answers.length} className="quiz-text-button"><ArrowLeft size={14} /> Назад</button>
                                <p>Нет правильных или неправильных ответов.</p>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="quiz-result-label"><Check size={13} /> Ваш результат</div>
                            <span className="quiz-question-icon"><Icon size={24} /></span>
                            <h2 id="quiz-dialog-title" ref={heading} tabIndex={-1} data-dialog-focus className="quiz-question-title">{result.title}</h2>
                            <p className="quiz-hint">{result.summary}</p>
                            {formStatus !== 'success' && <button type="button" disabled={busy} className="btn-primary mt-6 w-full sm:w-auto" onClick={() => contact.current?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' })}>Обсудить результат с Юлией <ArrowRight size={14} /></button>}
                            <ul className="quiz-result-details">{result.details.map(detail => <li key={detail}><Check size={12} /><span>{detail}</span></li>)}</ul>
                            <p className="quiz-result-note">Это первый ориентир. На бесплатной встрече-знакомстве за 20 минут мы уточним вашу ситуацию и выберем формат работы.</p>
                            <details className="quiz-answer-review">
                                <summary>Ваши ответы <span>{path.length}</span></summary>
                                <ol>{path.map(step => <li key={step.id}><span>{step.title}</span><strong>{step.label}</strong></li>)}</ol>
                            </details>
                            <div className="quiz-result-actions">
                                <button type="button" onClick={back} disabled={busy || formStatus === 'success'} className="quiz-text-button"><ArrowLeft size={13} /> Изменить ответы</button>
                                <button type="button" onClick={restart} disabled={busy} className="quiz-text-button"><Restart size={13} /> Пройти заново</button>
                            </div>
                            <div ref={contact} className="quiz-result-form">
                                <h3 className="text-xl font-semibold text-neutral-900">Обсудим ваш результат?</h3>
                                <p className="mb-6 mt-2 text-sm leading-relaxed text-neutral-600">Оставьте удобный контакт — Юлия свяжется с вами в течение дня.</p>
                                <ContactForm quizAnswers={answers} onOpenPrivacyPolicy={onOpenPrivacyPolicy} onStatusChange={setFormStatus} />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </Dialog>
    );
}
