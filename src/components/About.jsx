import React, { useEffect, useRef } from 'react';
import { UserCircle, ArrowRight } from 'phosphor-react';
import { motion } from 'framer-motion';

export default function About({ onOpenModal }) {
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Check if desktop (width >= 768px)
        const isDesktop = window.matchMedia('(min-width: 768px)').matches;

        if (isDesktop) {
            // Desktop: play once and stop on last frame
            video.loop = false;
        } else {
            // Mobile: loop continuously
            video.loop = true;
        }

        // Handle window resize
        const handleResize = () => {
            const isDesktopNow = window.matchMedia('(min-width: 768px)').matches;
            video.loop = !isDesktopNow;
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <section id="about" className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center max-w-6xl mx-auto">

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-block mb-4 px-4 py-1 bg-secondary/15 text-secondary-dark rounded-full text-sm font-semibold tracking-wide uppercase">
                            Обо мне
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                            Привет! Я — Юлия Попова
                        </h2>
                        <div className="space-y-6 text-neutral-700 leading-relaxed text-lg">
                            <p>
                                Я — психолог и тьютор с многолетним опытом работы с детьми, подростками
                                и взрослыми.
                            </p>
                            <p>
                                Я помогаю людям находить свой путь, справляться с кризисами и строить гармоничные отношения с собой и миром.
                            </p>
                            <p className="font-medium text-primary-dark">
                                Первую встречу вы можете получить бесплатно, чтобы познакомиться и понять, какой формат работы подойдёт вам лучше всего.
                            </p>
                        </div>
                        <button
                            onClick={() => onOpenModal('about-details')}
                            className="mt-10 bg-primary-dark text-white px-8 py-3 rounded-xl hover:bg-primary transition-all inline-flex items-center gap-2 shadow-lg hover:shadow-primary/30 hover:-translate-y-1"
                        >
                            Подробнее обо мне
                            <ArrowRight size={20} />
                        </button>
                    </motion.div>

                    {/* Photo Placeholder */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="order-first md:order-last"
                    >
                        <div className="relative">
                            <div className="aspect-[4/5] bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl overflow-hidden shadow-2xl border border-white/50">
                                <video
                                    ref={videoRef}
                                    src="/images/popova-video.mp4"
                                    autoPlay
                                    muted
                                    playsInline
                                    className="w-full h-full object-cover"
                                    aria-label="Видео Юлии Поповой"
                                />
                            </div>
                            {/* Decorative elements */}
                            <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-secondary/10 rounded-full -z-10 blur-2xl"></div>
                            <div className="absolute -top-8 -left-8 w-32 h-32 bg-primary/10 rounded-full -z-10 blur-2xl"></div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
