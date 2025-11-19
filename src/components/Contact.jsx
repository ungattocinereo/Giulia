import React, { useState } from 'react';
import { PaperPlaneTilt, ChatCircle, Envelope, Phone } from 'phosphor-react';
import { motion } from 'framer-motion';
import { sendToTelegram } from '../utils/telegram';
import { validateEmail, validatePhone, validateTelegram, formatTelegram } from '../utils/validation';
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

    const handleFormChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;

        setFormData(prev => ({
            ...prev,
            [name]: newValue
        }));

        // Clear validation error when user starts typing
        if (name === 'contact' && validationErrors.contact) {
            setValidationErrors(prev => ({ ...prev, contact: null }));
        }

        // Validate contact field based on method
        if (name === 'contact' && value.trim()) {
            let isValid = false;
            let errorMessage = '';

            if (formData.method === 'telegram') {
                const formattedValue = formatTelegram(value);
                isValid = validateTelegram(formattedValue);
                errorMessage = 'Telegram username должен начинаться с @ и содержать 5-32 символа';
            } else if (formData.method === 'phone' || formData.method === 'whatsapp') {
                isValid = validatePhone(value);
                errorMessage = 'Введите корректный номер телефона (например, +79XXXXXXXXX)';
            } else if (formData.method === 'email') {
                isValid = validateEmail(value);
                errorMessage = 'Введите корректный email адрес';
            }

            if (!isValid && value.length > 3) {
                setValidationErrors(prev => ({ ...prev, contact: errorMessage }));
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.consent) {
            alert('Пожалуйста, дайте согласие на обработку персональных данных');
            return;
        }

        // Validate contact field before submission
        let isValid = false;
        let errorMessage = '';

        if (formData.method === 'telegram') {
            const formattedValue = formatTelegram(formData.contact);
            isValid = validateTelegram(formattedValue);
            errorMessage = 'Telegram username должен начинаться с @ и содержать 5-32 символа';
        } else if (formData.method === 'phone' || formData.method === 'whatsapp') {
            isValid = validatePhone(formData.contact);
            errorMessage = 'Введите корректный номер телефона (например, +79XXXXXXXXX)';
        } else if (formData.method === 'email') {
            isValid = validateEmail(formData.contact);
            errorMessage = 'Введите корректный email адрес';
        }

        if (!isValid) {
            setValidationErrors({ contact: errorMessage });
            return;
        }

        setFormStatus('loading');

        try {
            await sendToTelegram(formData);
            setFormStatus('success');
            setTimeout(() => {
                setFormStatus(null);
                setFormData({
                    name: '',
                    contact: '',
                    method: 'telegram',
                    message: '',
                    consent: false,
                });
            }, 3000);
        } catch (error) {
            console.error('Error sending form:', error);
            setFormStatus('error');
            setTimeout(() => setFormStatus(null), 5000);
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
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Ваше имя</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleFormChange}
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-primary focus:ring-0 transition-all"
                                    placeholder="Как к вам обращаться?"
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Контакт для связи</label>
                                    <input
                                        type="text"
                                        name="contact"
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
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Удобный способ</label>
                                    <select
                                        name="method"
                                        value={formData.method}
                                        onChange={handleFormChange}
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-primary focus:ring-0 transition-all"
                                    >
                                        <option value="telegram">Telegram</option>
                                        <option value="whatsapp">WhatsApp</option>
                                        <option value="phone">Звонок</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Сообщение (необязательно)</label>
                                <textarea
                                    name="message"
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

                            <button
                                type="submit"
                                disabled={formStatus === 'loading'}
                                className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-primary-dark transition-all shadow-lg hover:shadow-primary/30 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {formStatus === 'loading' ? 'Отправка...' :
                                    formStatus === 'success' ? 'Отправлено!' :
                                        'Отправить заявку'}
                            </button>

                            {formStatus === 'error' && (
                                <p className="text-red-500 text-center text-sm">
                                    Произошла ошибка. Пожалуйста, попробуйте позже.
                                </p>
                            )}
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
}
