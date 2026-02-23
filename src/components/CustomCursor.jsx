import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './CustomCursor.css';

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e) => {
            if (
                e.target.tagName.toLowerCase() === 'a' ||
                e.target.tagName.toLowerCase() === 'button' ||
                e.target.closest('a') ||
                e.target.closest('button') ||
                e.target.classList.contains('hoverable')
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    const variants = {
        default: {
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
            scale: 1,
        },
        hover: {
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
            scale: 1.5,
            backgroundColor: 'rgba(56, 189, 248, 0.2)',
            border: '1px solid rgba(56, 189, 248, 0.8)',
        }
    };

    const dotVariants = {
        default: {
            x: mousePosition.x - 4,
            y: mousePosition.y - 4,
            scale: 1,
        },
        hover: {
            x: mousePosition.x - 4,
            y: mousePosition.y - 4,
            scale: 0,
        }
    };

    return (
        <>
            <motion.div
                className="cursor-ring"
                variants={variants}
                animate={isHovering ? "hover" : "default"}
                transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 15,
                    mass: 0.5
                }}
            />
            <motion.div
                className="cursor-dot"
                variants={dotVariants}
                animate={isHovering ? "hover" : "default"}
                transition={{
                    type: "spring",
                    stiffness: 700,
                    damping: 20
                }}
            />
        </>
    );
};

export default CustomCursor;
