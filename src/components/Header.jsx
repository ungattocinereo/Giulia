import React, { useState, useEffect } from 'react';
import { List, X } from 'phosphor-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

const navItems = [
    { id: 'about', label: 'О себе' },
    { id: 'services', label: 'Услуги' },
    { id: 'pricing', label: 'Стоимость' },
    { id: 'contacts', label: 'Контакты' },
];

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setIsMenuOpen(false);
        }
    };

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
            )}
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div
                        className={cn(
                            "text-2xl font-bold transition-colors duration-300",
                            isScrolled ? "text-primary-dark" : "text-white"
                        )}
                    >
                        Юлия Попова
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-secondary-dark",
                                    isScrolled ? "text-neutral-800" : "text-white/90"
                                )}
                            >
                                {item.label}
                            </button>
                        ))}
                        <button
                            onClick={() => scrollToSection('contacts')}
                            className={cn(
                                "px-6 py-2 rounded-full font-medium transition-all transform hover:-translate-y-0.5",
                                isScrolled
                                    ? "bg-primary text-white hover:bg-primary-dark"
                                    : "bg-white text-primary hover:bg-white/90"
                            )}
                        >
                            Записаться
                        </button>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className={cn(
                            "md:hidden p-2 rounded-lg transition-colors",
                            isScrolled ? "text-gray-700" : "text-white"
                        )}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X size={24} /> : <List size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
                    >
                        <nav className="flex flex-col p-4 space-y-4">
                            {navItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => scrollToSection(item.id)}
                                    className="text-neutral-800 hover:text-primary-dark transition-colors text-left py-2 font-medium"
                                >
                                    {item.label}
                                </button>
                            ))}
                            <button
                                onClick={() => scrollToSection('contacts')}
                                className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors w-full font-medium"
                            >
                                Записаться
                            </button>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
