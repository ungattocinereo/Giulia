import React, { useState } from 'react';
import { PaperPlaneTilt, ChatCircle, Envelope } from 'phosphor-react';
import { sendToTelegram } from '../utils/telegram';
import { CONTACT_LIMITS, getContactError } from '../utils/validation';
import PhoneSpoiler from './PhoneSpoiler';

export default function Contact({ onOpenPrivacyPolicy }) {
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
        <section id="contacts" className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">

                    {/* Contact Info Side */}
                    <div className="bg-coral text-white p-10 md:p-12 md:w-2/5 flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full -ml-32 -mb-32 blur-3xl"></div>

                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold mb-6">Свяжитесь со мной</h2>
                            <p className="text-white/80 mb-10 leading-relaxed">
                                Запишитесь на консультацию или задайте любой вопрос. Я отвечу в течение дня.
                            </p>

                            <div className="space-y-6">
                                <a href="mailto:radio.popova@gmail.com" className="flex items-center gap-4 hover:text-secondary-light transition-colors">
                                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                                        <Envelope size={20} />
                                    </div>
                                    <span>radio.popova@gmail.com</span>
                                </a>
                                <PhoneSpoiler
                                    phone="+79688274447"
                                    className="hover:text-secondary-light transition-colors"
                                />
                            </div>
                        </div>

                        <div className="mt-12 relative z-10">
                            <p className="text-sm text-white/60 mb-4">Мессенджеры:</p>
                            <div className="flex gap-4">
                                <a
                                    href="https://t.me/MissisPoppins"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all"
                                    title="Telegram: @MissisPoppins"
                                >
                                    <PaperPlaneTilt size={20} weight="fill" />
                                </a>
                                <a
                                    href="https://wa.me/79688274447"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all"
                                    title="WhatsApp: +79688274447"
                                >
                                    <ChatCircle size={20} weight="fill" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Form Side */}
                    <div className="p-10 md:p-12 md:w-3/5">
                        <form onSubmit={handleSubmit}>
                            <fieldset disabled={formStatus === 'loading' || formStatus === 'success'} className="space-y-6">
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
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-primary focus:ring-0 transition-all"
                                        placeholder="Как к вам обращаться?"
                                    />
                                    {validationErrors.name && <p role="alert" className="text-red-500 text-xs mt-1">{validationErrors.name}</p>}
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
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
                                            className={`w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-primary focus:ring-0 transition-all ${validationErrors.contact ? 'border-red-500 border-2' : ''
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
                                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-primary focus:ring-0 transition-all"
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
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-primary focus:ring-0 transition-all resize-none"
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
                                        className="mt-1 rounded text-primary focus:ring-primary"
                                    />
                                    <label htmlFor="consent" className="text-sm text-gray-500">
                                        Я даю согласие на обработку персональных данных в соответствии с{' '}
                                        <button
                                            type="button"
                                            onClick={onOpenPrivacyPolicy}
                                            className="text-primary hover:underline"
                                        >
                                            политикой конфиденциальности
                                        </button>
                                    </label>
                                </div>

                                {validationErrors.consent && <p role="alert" className="text-red-500 text-sm">{validationErrors.consent}</p>}

                                <button
                                    type="submit"
                                    disabled={formStatus === 'loading' || formStatus === 'success'}
                                    className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-primary-dark transition-all shadow-lg hover:shadow-primary/30 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {formStatus === 'loading' ? 'Отправка...' :
                                        formStatus === 'success' ? 'Отправлено!' :
                                            'Отправить заявку'}
                                </button>

                                {formStatus === 'error' && (
                                    <p role="alert" className="text-red-500 text-center text-sm">
                                        {formError}
                                    </p>
                                )}
                                {formStatus === 'success' && <p role="status" className="text-green-700 text-center text-sm">Заявка отправлена. Я свяжусь с вами в течение дня.</p>}
                            </fieldset>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
}
