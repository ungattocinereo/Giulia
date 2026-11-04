import React from 'react';
import { Telegram, WhatsApp, Envelope, Message } from './ui/icons';
import ContactForm from './ContactForm';
import PhoneSpoiler from './PhoneSpoiler';

export default function Contact({ onOpenPrivacyPolicy }) {
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
                        <ContactForm onOpenPrivacyPolicy={onOpenPrivacyPolicy} />
                    </div>

                </div>
            </div>
        </section>
    );
}
