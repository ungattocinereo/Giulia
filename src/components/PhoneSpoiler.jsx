import React, { useState } from 'react';
import { Phone } from 'phosphor-react';

/**
 * PhoneSpoiler Component
 * Displays phone number as hidden/blurred text (like Telegram spoilers)
 * Reveals the actual number when clicked to prevent scraping
 */
export default function PhoneSpoiler({ phone, className = '' }) {
    const [isRevealed, setIsRevealed] = useState(false);

    const handleReveal = () => {
        setIsRevealed(true);
    };

    return (
        <div className={`flex items-center gap-4 ${className}`}>
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                <Phone size={20} />
            </div>

            {isRevealed ? (
                <a
                    href={`tel:${phone}`}
                    className="hover:text-secondary-light transition-colors"
                >
                    {phone}
                </a>
            ) : (
                <button
                    onClick={handleReveal}
                    className="relative group cursor-pointer"
                    aria-label="Нажмите, чтобы показать номер телефона"
                >
                    <span className="relative inline-block">
                        {/* Blurred background effect */}
                        <span
                            className="absolute inset-0 bg-white/30 backdrop-blur-md rounded"
                            aria-hidden="true"
                        />

                        {/* Hidden text for screen readers and structure */}
                        <span className="opacity-0 select-none pointer-events-none">
                            +7 (XXX) XXX-XX-XX
                        </span>

                        {/* Visible spoiler overlay */}
                        <span className="absolute inset-0 flex items-center justify-center">
                            <span className="text-white/60 text-sm group-hover:text-white/80 transition-colors">
                                Нажмите, чтобы показать
                            </span>
                        </span>
                    </span>
                </button>
            )}
        </div>
    );
}
