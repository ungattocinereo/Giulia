import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Leaf } from './ui/icons';
import { motion } from 'framer-motion';

export default function About({ onOpenModal }) {
    const videoRef = useRef(null);
    const [isVideoReady, setIsVideoReady] = useState(false);

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
        const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
            if (entries.some(entry => entry.isIntersecting)) {
                setIsVideoReady(true);
                observer.disconnect();
            }
        }, { rootMargin: '200px' }) : null;
        if (observer) observer.observe(video);
        else setIsVideoReady(true);
        return () => {
            window.removeEventListener('resize', handleResize);
            observer?.disconnect();
        };
    }, []);

    return (
        <section id="about" className="overflow-hidden bg-white py-20 sm:py-28">
            <div className="page-container">
                <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center max-w-6xl mx-auto">

                    {/* Text Content */}
                    <motion.div
                        initial={false}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="section-label">
                            <Leaf size={14} /> Обо мне
                        </div>
                        <h2 className="section-title mb-7">
                            Привет! Я — Юлия Попова
                        </h2>
                        <div className="space-y-5 text-base leading-relaxed text-neutral-600 sm:text-lg">
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
                            className="btn-secondary mt-8"
                        >
                            Подробнее обо мне
                            <ArrowRight size={20} />
                        </button>
                    </motion.div>

                    {/* Photo Placeholder */}
                    <motion.div
                        initial={false}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mx-auto w-full max-w-md md:order-last"
                    >
                        <div className="relative">
                            <div className="aspect-[4/5] overflow-hidden rounded-[2rem] border border-primary-dark/10 bg-primary-50">
                                <video
                                    ref={videoRef}
                                    src={isVideoReady ? '/images/popova-video.mp4' : undefined}
                                    poster="/images/popova-001.png"
                                    preload="none"
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
