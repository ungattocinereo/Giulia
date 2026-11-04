import React, { useEffect, useId, useRef, useState } from 'react';
import { ArrowRight, Check, Shield, Spinner } from './ui/icons';
import { sendToTelegram } from '../utils/telegram';
import { CONTACT_LIMITS, getContactError } from '../utils/validation';
import { QUIZ_MESSAGE_LIMIT } from '../content/consultationQuiz';

const emptyForm = { name: '', contact: '', method: 'telegram', message: '', consent: false };

// One form and delivery path for ordinary enquiries and quiz results.
export default function ContactForm({ onOpenPrivacyPolicy, quizAnswers, onStatusChange }) {
    const id = useId();
    const formRef = useRef(null);
    const submitLock = useRef(false);
    const [hydrated, setHydrated] = useState(false);
    const [formData, setFormData] = useState(emptyForm);
    const [formStatus, setFormStatus] = useState(null);
    const [validationErrors, setValidationErrors] = useState({});
    const [formError, setFormError] = useState('');
    const fromQuiz = quizAnswers !== undefined;
    useEffect(() => setHydrated(true), []);
    useEffect(() => { onStatusChange?.(formStatus); }, [formStatus, onStatusChange]);

    const change = event => {
        const { name, value, type, checked } = event.target;
        const next = { ...formData, [name]: type === 'checkbox' ? checked : value };
        setFormData(next);
        setFormError('');
        setValidationErrors(previous => ({
            ...previous, [name]: null,
            ...((name === 'contact' || name === 'method') ? { contact: next.contact.trim() ? getContactError(next.method, next.contact) : null } : {}),
        }));
    };

    const submit = async event => {
        event.preventDefault();
        if (submitLock.current || formStatus === 'success') return;
        const errors = {};
        if (!formData.name.trim()) errors.name = 'Укажите ваше имя';
        const contactError = getContactError(formData.method, formData.contact);
        if (contactError) errors.contact = contactError;
        if (!formData.consent) errors.consent = 'Дайте согласие на обработку персональных данных';
        setValidationErrors(errors);
        if (Object.keys(errors).length) {
            formRef.current.elements.namedItem(Object.keys(errors)[0])?.focus();
            return;
        }
        submitLock.current = true;
        setFormStatus('loading');
        setFormError('');
        try {
            await sendToTelegram({ ...formData, ...(fromQuiz ? { quizAnswers: [...quizAnswers] } : {}) });
            setFormStatus('success');
            setFormData(emptyForm);
        } catch (error) {
            setFormError(error.message || 'Не удалось отправить заявку. Попробуйте позже.');
            setFormStatus('error');
        } finally {
            submitLock.current = false;
        }
    };

    const errorProps = name => ({
        'aria-invalid': validationErrors[name] ? true : undefined,
        'aria-describedby': validationErrors[name] ? `${id}-${name}-error` : undefined,
    });
    const error = name => validationErrors[name] && <p id={`${id}-${name}-error`} role="alert" className="mt-1 text-xs text-red-700">{validationErrors[name]}</p>;

    if (formStatus === 'success') return (
        <div role="status" className="rounded-2xl border border-primary/20 bg-primary-50 p-6 text-primary-dark">
            <Check size={22} className="mb-3" />
            <p className="text-lg font-bold">Заявка отправлена</p>
            <p className="mt-2 text-sm leading-relaxed">{fromQuiz ? 'Результат теста и ваши ответы отправлены Юлии вместе с контактом. ' : ''}Я свяжусь с вами в течение дня.</p>
        </div>
    );

    return (
        <>
            <form ref={formRef} onSubmit={submit} noValidate aria-label={fromQuiz ? 'Заявка по результату теста' : 'Запись на консультацию'}>
                <fieldset disabled={!hydrated || formStatus === 'loading'} className="space-y-5">
                    <div>
                        <label htmlFor={`${id}-name`} className="mb-2 block text-sm font-medium text-neutral-800">Ваше имя</label>
                        <input id={`${id}-name`} name="name" type="text" autoComplete="name" maxLength={CONTACT_LIMITS.name} value={formData.name} onChange={change} required className="form-input" placeholder="Как к вам обращаться?" {...errorProps('name')} />
                        {error('name')}
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                            <label htmlFor={`${id}-contact`} className="mb-2 block text-sm font-medium text-neutral-800">Контакт для связи</label>
                            <input id={`${id}-contact`} name="contact" type={formData.method === 'email' ? 'email' : 'text'} inputMode={['phone', 'whatsapp'].includes(formData.method) ? 'tel' : formData.method === 'email' ? 'email' : 'text'} autoCapitalize="none" autoCorrect="off" spellCheck={false} autoComplete={formData.method === 'email' ? 'email' : ['phone', 'whatsapp'].includes(formData.method) ? 'tel' : 'off'} maxLength={CONTACT_LIMITS.contact} value={formData.contact} onChange={change} required className="form-input" placeholder={formData.method === 'telegram' ? '@username' : formData.method === 'email' ? 'name@example.ru' : '+7 900 000-00-00'} {...errorProps('contact')} />
                            {error('contact')}
                        </div>
                        <div>
                            <label htmlFor={`${id}-method`} className="mb-2 block text-sm font-medium text-neutral-800">Удобный способ</label>
                            <select id={`${id}-method`} name="method" value={formData.method} onChange={change} className="form-input">
                                <option value="telegram">Telegram</option><option value="whatsapp">WhatsApp</option><option value="phone">Звонок</option><option value="email">Email</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label htmlFor={`${id}-message`} className="mb-2 block text-sm font-medium text-neutral-800">{fromQuiz ? 'Что ещё важно знать? (необязательно)' : 'Сообщение (необязательно)'}</label>
                        <textarea id={`${id}-message`} name="message" maxLength={fromQuiz ? QUIZ_MESSAGE_LIMIT : CONTACT_LIMITS.message} value={formData.message} onChange={change} rows="3" className="form-input resize-y" placeholder={fromQuiz ? 'Например, возраст подростка или удобное время для связи' : 'Кратко опишите ваш запрос…'} />
                    </div>
                    {fromQuiz && <p className="text-xs leading-relaxed text-neutral-600">К заявке будут приложены рекомендация сайта и ваши ответы на вопросы теста.</p>}
                    <div className="flex items-start gap-3">
                        <input id={`${id}-consent`} name="consent" type="checkbox" checked={formData.consent} onChange={change} required className="mt-1 h-5 w-5 shrink-0 cursor-pointer rounded accent-primary-dark" {...errorProps('consent')} />
                        <label htmlFor={`${id}-consent`} className="text-sm text-neutral-600">
                            Я даю согласие на обработку персональных данных{fromQuiz ? ', включая результат и ответы теста,' : ''} в соответствии с{' '}
                            <button type="button" onClick={onOpenPrivacyPolicy} className="text-primary-dark underline decoration-primary/40 underline-offset-2 hover:decoration-primary-dark">политикой конфиденциальности</button>
                        </label>
                    </div>
                    {error('consent')}
                    <button type="submit" className="btn-primary w-full" disabled={formStatus === 'loading'}>
                        {formStatus === 'loading' ? 'Отправка…' : fromQuiz ? 'Отправить заявку с результатом' : 'Отправить заявку'}
                        {formStatus === 'loading' ? <Spinner size={16} className="animate-spin" /> : <ArrowRight size={16} />}
                    </button>
                </fieldset>
                {formStatus === 'error' && <p role="alert" className="mt-4 text-center text-sm text-red-700">{formError}</p>}
            </form>
            <p className="mt-5 flex items-center justify-center gap-2 text-center text-[11px] text-neutral-600"><Shield size={13} className="shrink-0 text-primary" /> С вниманием к вам и вашим данным</p>
        </>
    );
}
