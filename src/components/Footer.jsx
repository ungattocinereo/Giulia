import React from 'react';
import { PaperPlaneTilt, ChatCircle, Envelope } from 'phosphor-react';

export default function Footer({ onOpenPrivacyPolicy }) {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-primary-dark text-white py-12 border-t border-white/10">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">

                    <div className="text-center md:text-left">
                        <h3 className="text-2xl font-bold mb-2">Юлия Попова</h3>
                        <p className="text-white/60">Психолог • Тьютор • Профориентолог</p>
                    </div>

                    <div className="flex gap-4">
                        {[
                            { icon: PaperPlaneTilt, href: "https://t.me/MissisPoppins", label: "Telegram" },
                            { icon: ChatCircle, href: "https://wa.me/79688274447", label: "WhatsApp" },
                            { icon: Envelope, href: "mailto:radio.popova@gmail.com", label: "Email" },
                        ].map((social, index) => (
                            <a
                                key={index}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110"
                                aria-label={social.label}
                            >
                                <social.icon size={20} weight="fill" />
                            </a>
                        ))}
                    </div>

                    <div className="text-center md:text-right text-white/40 text-sm">
                        <p>&copy; {currentYear} Все права защищены</p>
                        <button
                            onClick={onOpenPrivacyPolicy}
                            className="mt-1 hover:text-white/60 transition-colors"
                        >
                            Политика конфиденциальности
                        </button>
                    </div>

                </div>
            </div>
        </footer>
    );
}
