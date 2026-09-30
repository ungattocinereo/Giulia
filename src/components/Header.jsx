import React, { useEffect, useRef, useState } from 'react';
import { Menu, Close, ArrowRight, Telegram, WhatsApp } from './ui/icons';
import { cn } from '../utils/cn';

const navItems = [
    { id: 'about', label: 'Обо мне' },
    { id: 'approach', label: 'Подход' },
    { id: 'pricing', label: 'Стоимость' },
    { id: 'comprehensive-approach', label: 'Форматы работы' },
    { id: 'faq', label: 'Вопросы' },
];

export default function Header() {
    const [activeSection, setActiveSection] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dialogRef = useRef(null);
    const menuButtonRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const visible = entries.find(entry => entry.isIntersecting);
            if (visible) setActiveSection(visible.target.id);
        }, { rootMargin: '-20% 0px -65% 0px', threshold: 0 });
        ['home', ...navItems.map(item => item.id), 'contacts'].forEach(id => {
            const section = document.getElementById(id);
            if (section) observer.observe(section);
        });
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!isMenuOpen) { if (dialog.open) dialog.close(); return; }
        dialog.showModal();
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        const desktop = window.matchMedia('(min-width: 1024px)');
        const closeOnDesktop = () => { if (desktop.matches) setIsMenuOpen(false); };
        desktop.addEventListener('change', closeOnDesktop);
        return () => {
            document.body.style.overflow = previousOverflow;
            desktop.removeEventListener('change', closeOnDesktop);
            if (dialog.open) dialog.close();
            menuButtonRef.current?.focus({ preventScroll: true });
        };
    }, [isMenuOpen]);

    return (
        <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-5">
            <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-10 focus:rounded-lg focus:bg-white focus:p-3">Перейти к содержимому</a>
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full border border-primary-dark/10 bg-neutral-50/95 p-2.5 pl-3 shadow-[0_8px_30px_-20px_#31513C66] backdrop-blur-md lg:pl-5">
                <a href="#home" className="flex shrink-0 items-center gap-3" aria-label="Юлия Попова — на главную">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-dark text-sm font-semibold tracking-tight text-white">ЮП</span>
                    <span className="text-sm font-bold text-neutral-900 sm:text-base">Юлия Попова<span className="hidden text-[10px] font-medium tracking-wide text-neutral-600 sm:block">Психолог и тьютор</span></span>
                </a>
                <nav aria-label="Основная навигация" className="hidden items-center gap-1 lg:flex">
                    {navItems.map(item => (
                        <a key={item.id} href={`#${item.id}`} aria-current={activeSection === item.id ? 'location' : undefined}
                            className={cn('rounded-full px-3 py-2.5 text-xs font-semibold transition-colors hover:bg-primary/10 hover:text-primary-dark xl:px-4 xl:text-sm', activeSection === item.id ? 'bg-primary/10 text-primary-dark' : 'text-neutral-600')}>
                            {item.label}
                        </a>
                    ))}
                </nav>
                <a href="#contacts" className="btn-primary hidden min-h-[44px] px-5 py-2.5 lg:inline-flex">Записаться <ArrowRight size={14} /></a>
                <button ref={menuButtonRef} type="button" onClick={() => setIsMenuOpen(true)} aria-label="Открыть меню" aria-expanded={isMenuOpen} aria-controls="mobile-navigation" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-dark text-white lg:hidden"><Menu size={18} /></button>
            </div>

            <dialog ref={dialogRef} id="mobile-navigation" className="mobile-menu" aria-labelledby="mobile-menu-title" onCancel={() => setIsMenuOpen(false)} onClick={event => { if (event.target === event.currentTarget && event.clientX < event.currentTarget.getBoundingClientRect().left) setIsMenuOpen(false); }}>
                <div className="flex items-center justify-between border-b border-primary-dark/10 px-6 py-6">
                    <span id="mobile-menu-title" className="text-lg font-bold">Юлия Попова</span>
                    <button type="button" onClick={() => setIsMenuOpen(false)} aria-label="Закрыть меню" className="flex h-11 w-11 items-center justify-center rounded-full border border-primary-dark/15"><Close size={20} /></button>
                </div>
                <div className="flex-1 overflow-y-auto px-6 py-8">
                    <p className="section-label">Давайте познакомимся</p>
                    <nav aria-label="Мобильная навигация" className="space-y-1">
                        {[...navItems, { id: 'contacts', label: 'Контакты' }].map((item, index) => (
                            <a key={item.id} href={`#${item.id}`} onClick={() => setIsMenuOpen(false)} aria-current={activeSection === item.id ? 'location' : undefined} className="group flex items-center justify-between border-b border-primary-dark/10 py-4 text-xl font-semibold transition-colors hover:text-accent">
                                <span><span className="mr-4 text-xs font-medium text-primary">0{index + 1}</span>{item.label}</span><ArrowRight size={15} className="text-primary" />
                            </a>
                        ))}
                    </nav>
                    <a href="#contacts" onClick={() => setIsMenuOpen(false)} className="btn-primary mt-8 w-full">Записаться на консультацию <ArrowRight size={16} /></a>
                    <div className="mt-8 flex items-center gap-3"><a href="https://t.me/MissisPoppins" target="_blank" rel="noopener noreferrer" className="icon-link" aria-label="Telegram"><Telegram size={20} /></a><a href="https://wa.me/79688274447" target="_blank" rel="noopener noreferrer" className="icon-link" aria-label="WhatsApp"><WhatsApp size={20} /></a><span className="ml-2 text-xs text-neutral-600">Можно просто написать</span></div>
                </div>
            </dialog>
        </header>
    );
}
