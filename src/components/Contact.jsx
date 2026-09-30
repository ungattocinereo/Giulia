import React, { useEffect, useState } from 'react';
import { Telegram, WhatsApp, Envelope, ArrowRight, Check, Spinner, Message, Shield } from './ui/icons';
import { sendToTelegram } from '../utils/telegram';
import { CONTACT_LIMITS, getContactError } from '../utils/validation';
import PhoneSpoiler from './PhoneSpoiler';

export default function Contact({ onOpenPrivacyPolicy }) {
    const [isHydrated, setIsHydrated] = useState(false);
    useEffect(() => setIsHydrated(true), []);
    const [formData, setFormData] = useState({
        name: '',
        contact: '',
        method: 'telegram',
        message: '',
        consent: false,
    });
    const [formStatus, setFormStatus] = useState(null);
    const [validationErrors, setValidationErrors] = useState({});
    const [formError, setFormError] = useState('');

    const handleFormChange = (e) => {
        const { name, value, type, checked } = e.target;
        const nextData = { ...formData, [name]: type === 'checkbox' ? checked : value };
        setFormData(nextData);
        setFormError('');
        setValidationErrors(prev => ({
            ...prev,
            [name]: null,
            ...((name === 'contact' || name === 'method') ? {
                contact: nextData.contact.trim() ? getContactError(nextData.method, nextData.contact) : null,
            } : {}),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formStatus === 'loading' || formStatus === 'success') return;
        const errors = {};
        if (!formData.name.trim()) errors.name = 'Укажите ваше имя';
        const contactError = getContactError(formData.method, formData.contact);
        if (contactError) errors.contact = contactError;
        if (!formData.consent) errors.consent = 'Дайте согласие на обработку персональных данных';
        setValidationErrors(errors);
        if (Object.keys(errors).length) return;

        setFormError('');
        setFormStatus('loading');
        try {
            await sendToTelegram(formData);
            setFormData({ name: '', contact: '', method: 'telegram', message: '', consent: false });
            setFormStatus('success');
            setTimeout(() => setFormStatus(null), 3000);
        } catch (error) {
            setFormError(error.message || 'Не удалось отправить заявку. Попробуйте позже.');
            setFormStatus('error');
        }
    };

    return (
        <section id="contacts" className="bg-neutral-100 py-20 sm:py-28">
            <div className="page-container">
                <div className="flex flex-col overflow-hidden rounded-3xl border border-primary-dark/10 bg-white lg:flex-row">

                    {/* Contact Info Side */}
                    <div className="relative flex flex-col justify-between overflow-hidden bg-primary-dark p-7 text-white sm:p-10 lg:w-2/5 lg:p-12">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full -ml-32 -mb-32 blur-3xl"></div>

                        <div className="relative z-10">
                            <div className="section-label !text-primary-light"><Message size={14} /> Первый шаг</div>
                            <h2 className="mb-6 font-display text-5xl font-medium !text-white">Давайте<br /><span className="italic">поговорим.</span></h2>
                            <p className="text-white/80 mb-10 leading-relaxed">
                                Запишитесь на консультацию онлайн или очно в Москве, или задайте любой вопрос. Я отвечу в течение дня.
                            </p>

                            <div className="space-y-5">
                                <a href="mailto:radio.popova@gmail.com" className="flex items-center gap-3 text-sm transition-colors hover:text-secondary-light">
                                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                                        <Envelope size={20} />
                                    </div>
                                    <span>radio.popova@gmail.com</span>
                                </a>
                                <PhoneSpoiler
                                    phone="+79688274447"
                                    className="text-sm transition-colors hover:text-secondary-light"
                                />
                            </div>
                        </div>

                        <div className="mt-12 relative z-10">
                            <p className="mb-4 text-xs text-white/75">Мессенджеры:</p>
                            <div className="flex gap-4">
                                <a
                                    href="https://t.me/MissisPoppins"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 transition-colors hover:bg-white/15"
                                    title="Telegram: @MissisPoppins"
                                    aria-label="Telegram"
                                >
                                    <Telegram size={20} />
                                </a>
                                <a
                                    href="https://wa.me/79688274447"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 transition-colors hover:bg-white/15"
                                    title="WhatsApp: +79688274447"
                                    aria-label="WhatsApp"
                                >
                                    <WhatsApp size={20} />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Form Side */}
                    <div className="p-7 sm:p-10 lg:w-3/5 lg:p-12">
                        <h3 className="mb-2 text-xl font-semibold text-neutral-900">Записаться на консультацию</h3>
                        <p className="mb-8 text-sm text-neutral-600">Оставьте удобный контакт — я свяжусь с вами.</p>
                        <noscript>Для отправки заявки включите JavaScript или используйте контакты Telegram, WhatsApp, email и телефон выше.</noscript>
                        <form onSubmit={handleSubmit}>
                            <fieldset disabled={!isHydrated || formStatus === 'loading' || formStatus === 'success'} className="space-y-5">
                                <div>
                                    <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-2">Ваше имя</label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="contact-name"
                                        maxLength={CONTACT_LIMITS.name}
                                        autoComplete="name"
                                        value={formData.name}
                                        onChange={handleFormChange}
                                        required
                                        className="form-input"
                                        placeholder="Как к вам обращаться?"
                                    />
                                    {validationErrors.name && <p role="alert" className="text-red-500 text-xs mt-1">{validationErrors.name}</p>}
                                </div>

                                <div className="grid gap-5 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="contact-value" className="block text-sm font-medium text-gray-700 mb-2">Контакт для связи</label>
                                        <input
                                            type="text"
                                            name="contact"
                                            id="contact-value"
                                            maxLength={CONTACT_LIMITS.contact}
                                            value={formData.contact}
                                            onChange={handleFormChange}
                                            required
                                            className={`form-input ${validationErrors.contact ? 'border-red-500 border-2' : ''
                                                }`}
                                            placeholder="@username или телефон"
                                        />
                                        {validationErrors.contact && (
                                            <p className="text-red-500 text-xs mt-1">{validationErrors.contact}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label htmlFor="contact-method" className="block text-sm font-medium text-gray-700 mb-2">Удобный способ</label>
                                        <select
                                            name="method"
                                            id="contact-method"
                                            value={formData.method}
                                            onChange={handleFormChange}
                                            className="form-input"
                                        >
                                            <option value="telegram">Telegram</option>
                                            <option value="whatsapp">WhatsApp</option>
                                            <option value="phone">Звонок</option>
                                            <option value="email">Email</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-2">Сообщение (необязательно)</label>
                                    <textarea
                                        name="message"
                                        id="contact-message"
                                        maxLength={CONTACT_LIMITS.message}
                                        value={formData.message}
                                        onChange={handleFormChange}
                                        rows="3"
                                        className="form-input resize-none"
                                        placeholder="Кратко опишите ваш запрос..."
                                    ></textarea>
                                </div>

                                <div className="flex items-start gap-3">
                                    <input
                                        type="checkbox"
                                        name="consent"
                                        checked={formData.consent}
                                        onChange={handleFormChange}
                                        id="consent"
                                        className="mt-1 h-4 w-4 shrink-0 cursor-pointer rounded accent-primary-dark"
                                    />
                                    <label htmlFor="consent" className="text-sm text-gray-500">
                                        Я даю согласие на обработку персональных данных в соответствии с{' '}
                                        <button
                                            type="button"
                                            onClick={onOpenPrivacyPolicy}
                                            className="text-primary-dark underline decoration-primary/40 underline-offset-2 hover:decoration-primary-dark"
                                        >
                                            политикой конфиденциальности
                                        </button>
                                    </label>
                                </div>

                                {validationErrors.consent && <p role="alert" className="text-red-500 text-sm">{validationErrors.consent}</p>}

                                <button
                                    type="submit"
                                    disabled={formStatus === 'loading' || formStatus === 'success'}
                                    className="btn-primary w-full"
                                >
                                    {formStatus === 'loading' ? 'Отправка...' :
                                        formStatus === 'success' ? 'Отправлено!' :
                                            'Отправить заявку'}
                                    {formStatus === 'loading' ? <Spinner size={16} className="animate-spin" /> : formStatus === 'success' ? <Check size={16} /> : <ArrowRight size={16} />}
                                </button>

                                {formStatus === 'error' && (
                                    <p role="alert" className="text-red-500 text-center text-sm">
                                        {formError}
                                    </p>
                                )}
                                {formStatus === 'success' && <p role="status" className="text-green-700 text-center text-sm">Заявка отправлена. Я свяжусь с вами в течение дня.</p>}
                            </fieldset>
                        </form>
                        <p className="mt-5 flex items-center justify-center gap-2 text-[11px] text-neutral-600"><Shield size={13} className="text-primary" /> С вниманием к вам и вашим данным</p>
                    </div>

                </div>
            </div>
        </section>
    );
}
