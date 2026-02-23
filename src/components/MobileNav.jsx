import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Briefcase, Code, Mail, Cpu, Terminal } from 'lucide-react';
import './MobileNav.css';

const navItems = [
    { id: 'home', icon: Home, label: 'Home', href: '#home' },
    { id: 'about', icon: User, label: 'About', href: '#about' },
    { id: 'experience', icon: Briefcase, label: 'Work', href: '#experience' },
    { id: 'projects', icon: Code, label: 'Projects', href: '#projects' },
    { id: 'contact', icon: Mail, label: 'Contact', href: '#contact' },
];

const MobileNav = () => {
    const [activeTab, setActiveTab] = useState('home');
    const isScrollingManual = useRef(false);
    const scrollTimeout = useRef(null);

    // Handle scroll to section and set active tab
    const handleNavClick = (id, href) => {
        // Prevent intersection observer from updating while we scroll manually
        isScrollingManual.current = true;
        setActiveTab(id);

        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }

        // Clear existing timeout if any
        if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

        // Reset the flag after the smooth scroll finishes (approx 800ms)
        scrollTimeout.current = setTimeout(() => {
            isScrollingManual.current = false;
        }, 800);
    };

    // Update active tab based on scroll position
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0
        };

        const observerCallback = (entries) => {
            // Only update active tab from observer if we are NOT scroll-jumping via click
            if (isScrollingManual.current) return;

            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveTab(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        navItems.forEach((item) => {
            const el = document.querySelector(item.href);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <motion.div
            className="mobile-nav-container"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
        >
            <nav className="mobile-nav-dock glass-morphism">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;

                    return (
                        <button
                            key={item.id}
                            className={`mobile-nav-item ${isActive ? 'active' : ''}`}
                            onClick={() => handleNavClick(item.id, item.href)}
                        >
                            <motion.div
                                className="icon-wrapper"
                                animate={{
                                    y: isActive ? -12 : 0,
                                    scale: isActive ? 1.2 : 1
                                }}
                                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                            >
                                <Icon size={24} />
                                {isActive && (
                                    <motion.div
                                        className="active-glow"
                                        layoutId="activeGlow"
                                        initial={false}
                                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </motion.div>
                            <motion.span
                                className="item-label"
                                animate={{
                                    opacity: isActive ? 1 : 0.6,
                                    y: isActive ? 5 : 0
                                }}
                            >
                                {item.label}
                            </motion.span>

                            {isActive && (
                                <motion.div
                                    className="active-indicator"
                                    layoutId="activeIndicator"
                                />
                            )}
                        </button>
                    );
                })}
            </nav>
        </motion.div>
    );
};

export default MobileNav;
