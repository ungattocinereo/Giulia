import React from 'react';
import { Telegram, WhatsApp, Envelope, ArrowRight } from './ui/icons';

export default function Footer({ onOpenPrivacyPolicy }) {
    return (
        <footer className="bg-primary-dark py-10 text-white sm:py-14">
            <div className="page-container">
                <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-center">
                    <div><a href="#home" className="font-display text-4xl">Юлия Попова<span className="text-secondary-light">.</span></a><p className="mt-2 text-xs text-white/75">Психолог · Тьютор · Профориентолог</p></div>
                    <div className="flex items-center gap-3">
                        {[{ icon: Telegram, href: 'https://t.me/MissisPoppins', label: 'Telegram' }, { icon: WhatsApp, href: 'https://wa.me/79688274447', label: 'WhatsApp' }, { icon: Envelope, href: 'mailto:radio.popova@gmail.com', label: 'Email' }].map(social => <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 transition-colors hover:bg-white/15"><social.icon size={20} /></a>)}
                        <a href="#home" className="ml-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/10" aria-label="Вернуться наверх"><ArrowRight size={15} className="-rotate-90" /></a>
                    </div>
                </div>
                <div className="mt-9 flex flex-col justify-between gap-4 border-t border-white/20 pt-6 text-xs text-white/75 sm:flex-row"><p>© {new Date().getFullYear()} Юлия Попова. Все права защищены.</p><button type="button" onClick={onOpenPrivacyPolicy} className="text-left underline decoration-white/30 underline-offset-4 transition-colors hover:text-white">Политика конфиденциальности</button></div>
            </div>
        </footer>
    );
}
