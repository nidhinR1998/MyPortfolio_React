import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

// Awwwards-style Magnetic Hover Effect wrapper
export default function Magnetic({ children, strength = 30 }) {
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouse = (e) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * (strength / width), y: middleY * (strength / height) });
    };

    const reset = () => {
        setIsHovered(false);
        setPosition({ x: 0, y: 0 });
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    return (
        <motion.div
            style={{ position: "relative", display: "inline-block" }}
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            onMouseEnter={handleMouseEnter}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        >
            {/* The child element must be ready to accept framer-motion props if it's motion-based itself, or standard html */}
            {children}

            {/* Optional Subtle Magnetic Highlight */}
            {isHovered && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '120%',
                        height: '120%',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(56, 189, 248, 0.1) 0%, transparent 70%)',
                        pointerEvents: 'none',
                        zIndex: -1
                    }}
                />
            )}
        </motion.div>
    );
}
