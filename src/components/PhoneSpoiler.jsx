import React, { useState, useEffect, useRef } from 'react';
import { Phone } from 'phosphor-react';

/**
 * PhoneSpoiler Component
 * Displays phone number with animated noise/static effect (like privacy screen)
 * Reveals the actual number when clicked to prevent scraping
 */
export default function PhoneSpoiler({ phone, className = '' }) {
    const [isRevealed, setIsRevealed] = useState(false);
    const canvasRef = useRef(null);
    const animationRef = useRef(null);

    useEffect(() => {
        if (isRevealed || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Set canvas size
        const width = canvas.width;
        const height = canvas.height;

        let frameCount = 0;

        // Animate noise/static effect (3x slower)
        const drawNoise = () => {
            frameCount++;

            // Only update every 3rd frame to slow down animation
            if (frameCount % 3 === 0) {
                const imageData = ctx.createImageData(width, height);
                const data = imageData.data;

                for (let i = 0; i < data.length; i += 4) {
                    // Random alpha value for white pixels (creates white/transparent effect)
                    const alpha = Math.random() * 255;
                    data[i] = 255;       // Red (white)
                    data[i + 1] = 255;   // Green (white)
                    data[i + 2] = 255;   // Blue (white)
                    data[i + 3] = alpha; // Random transparency
                }

                ctx.putImageData(imageData, 0, 0);
            }

            animationRef.current = requestAnimationFrame(drawNoise);
        };

        drawNoise();

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [isRevealed]);

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
                        {/* Hidden text for structure and screen readers */}
                        <span className="opacity-0 select-none pointer-events-none">
                            +7 (968) 827-44-47
                        </span>

                        {/* Animated noise overlay */}
                        <canvas
                            ref={canvasRef}
                            width={160}
                            height={24}
                            className="absolute inset-0 rounded group-hover:opacity-90 transition-opacity"
                            style={{ imageRendering: 'pixelated' }}
                        />
                    </span>
                </button>
            )}
        </div>
    );
}
