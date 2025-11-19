import React from 'react';
import { PaperPlaneTilt, ChatCircle, InstagramLogo, UserCircle } from 'phosphor-react';
import { motion } from 'framer-motion';

export default function Hero() {
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-[url('/images/background-pastel.jpg')] bg-cover bg-center">
            {/* Content */}
            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">

                        {/* Text Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="flex-1 text-neutral-800 order-2 md:order-1 text-center md:text-left"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                className="inline-block mb-6 px-4 py-2 bg-primary/15 backdrop-blur-sm rounded-full text-sm font-medium border border-primary/30 text-primary-dark"
                            >
                                Психолог • Тьютор • Профориентолог
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-neutral-900"
                            >
                                Юлия <span className="text-primary-dark">Попова</span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                                className="text-lg md:text-xl mb-10 leading-relaxed text-neutral-600 max-w-2xl"
                            >
                                Помогаю детям, подросткам и взрослым найти свой путь в учёбе, карьере
                                и отношениях. Комплексный подход к решению ваших задач.
                            </motion.p>

                            {/* CTA Buttons */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                                className="flex flex-col sm:flex-row gap-4 mb-10 justify-center md:justify-start"
                            >
                                <button
                                    onClick={() => scrollToSection('contacts')}
                                    className="bg-accent text-white px-8 py-4 rounded-xl font-semibold hover:bg-accent-dark transition-all shadow-lg hover:shadow-accent/30 hover:-translate-y-1"
                                >
                                    Записаться на консультацию
                                </button>
                                <button
                                    onClick={() => scrollToSection('about')}
                                    className="bg-white backdrop-blur-sm border-2 border-primary text-primary-dark px-8 py-4 rounded-xl font-semibold hover:bg-primary/10 transition-all hover:-translate-y-1"
                                >
                                    Узнать больше
                                </button>
                            </motion.div>

                            {/* Social Links */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6, duration: 0.5 }}
                                className="flex gap-4 justify-center md:justify-start"
                            >
                                {[
                                    { icon: PaperPlaneTilt, href: "https://t.me/username", label: "Telegram" },
                                    { icon: ChatCircle, href: "https://wa.me/79XXXXXXXXX", label: "WhatsApp" },
                                    { icon: InstagramLogo, href: "https://instagram.com/username", label: "Instagram" },
                                ].map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 bg-white hover:bg-primary/10 backdrop-blur-sm rounded-full flex items-center justify-center transition-all hover:scale-110 border-2 border-primary/30 hover:border-primary text-primary-dark"
                                        aria-label={social.label}
                                    >
                                        <social.icon size={24} weight="fill" />
                                    </a>
                                ))}
                            </motion.div>
                        </motion.div>

                        {/* Avatar Section */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.7 }}
                            className="flex-shrink-0 order-1 md:order-2 relative"
                        >
                            <div className="relative">
                                {/* Decorative rings */}
                                <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl animate-pulse-slow"></div>
                                <div className="absolute -inset-4 rounded-full border border-primary/10"></div>
                                <div className="absolute -inset-8 rounded-full border border-primary/5"></div>

                                {/* Avatar */}
                                <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm border border-white/20 shadow-2xl overflow-hidden flex items-center justify-center group">
                                    <img
                                        src="/images/popova-001.png"
                                        alt="Юлия Попова"
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Decorative badge */}
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.8, type: "spring" }}
                                    className="absolute bottom-8 right-0 bg-white text-primary-dark px-5 py-2 rounded-full shadow-xl border-2 border-primary/20 text-sm font-bold flex items-center gap-2"
                                >
                                    <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                                    Онлайн
                                </motion.div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </div>
        </section>
    );
}
