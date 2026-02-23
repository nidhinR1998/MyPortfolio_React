import React, { useEffect, useState, useRef } from 'react';
import './MatrixRain.css';

// Custom Hook to listen for the Konami Code
export const useKonamiCode = () => {
    const [isActivated, setIsActivated] = useState(false);

    useEffect(() => {
        // Up, Up, Down, Down, Left, Right, Left, Right, B, A
        const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        let konamiIndex = 0;

        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isActivated) {
                setIsActivated(false);
                return;
            }

            if (e.key.toLowerCase() === konamiCode[konamiIndex].toLowerCase()) {
                konamiIndex++;
                if (konamiIndex === konamiCode.length) {
                    setIsActivated(true);
                    konamiIndex = 0; // Reset
                }
            } else {
                konamiIndex = 0; // Reset on wrong key
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isActivated]);

    return { isActivated, setIsActivated };
};

// The Matrix HTML5 Canvas Component
const MatrixRain = ({ onClose }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Characters for the Matrix rain
        const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレゲゼデベペオォコソトノホモヨョロゴゾドボポヴッン';
        const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const nums = '0123456789';
        const alphabet = katakana + latin + nums;

        const fontSize = 16;
        const columns = Math.floor(canvas.width / fontSize);

        const drops = [];
        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }

        const draw = () => {
            // Adds a translucent black background on top of previous frames to create the "fade" tail effect
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#0F0'; // Matrix Green
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));

                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                // Send drop back to top randomly after it crosses the screen
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        const interval = setInterval(draw, 30); // 30ms per frame

        // Handle window resize
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="matrix-overlay" onClick={onClose}>
            <canvas ref={canvasRef} className="matrix-canvas"></canvas>

            <div className="matrix-message">
                <h1>System Admin Access Granted.</h1>
                <p>Nidhin's core competencies verified.</p>
                <div className="blink-cursor-matrix">_</div>
                <button className="matrix-btn" onClick={onClose}>Return to Reality</button>
            </div>
        </div>
    );
};

export default MatrixRain;
