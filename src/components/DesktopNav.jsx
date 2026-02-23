import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './DesktopNav.css';

const navItems = [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'experience', label: 'Work', href: '#experience' },
    { id: 'projects', label: 'Projects', href: '#projects' },
    { id: 'contact', label: 'Contact', href: '#contact' },
];

const DesktopNav = () => {
    const [activeSection, setActiveSection] = useState('home');
    const isScrollingManual = useRef(false);
    const scrollTimeout = useRef(null);

    const handleClick = (id, href) => {
        // Immediately set active section for instant visual feedback
        setActiveSection(id);
        isScrollingManual.current = true;

        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });

        // Release lock after scroll settles
        if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
        scrollTimeout.current = setTimeout(() => {
            isScrollingManual.current = false;
        }, 900);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (isScrollingManual.current) return;
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: '-10% 0px -70% 0px', threshold: 0 }
        );
        navItems.forEach(({ href }) => {
            const el = document.querySelector(href);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, []);

    return (
        <nav className="desktop-nav">
            <ul className="desktop-nav-list">
                {navItems.map(({ id, label, href }) => {
                    const isActive = activeSection === id;
                    return (
                        <li key={id} className="desktop-nav-item">
                            <span className="desktop-nav-tooltip">{label}</span>
                            <button
                                className={`desktop-nav-dot ${isActive ? 'active' : ''}`}
                                onClick={() => handleClick(id, href)}
                                aria-label={label}
                            >
                                {isActive && (
                                    <motion.span
                                        className="dot-ring"
                                        layoutId="desktopNavRing"
                                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                                    />
                                )}
                                <span className="dot-core" />
                            </button>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default DesktopNav;
