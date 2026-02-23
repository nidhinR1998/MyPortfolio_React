import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Typed from 'typed.js';
import Magnetic from './Magnetic';
import './Hero.css';

const Hero = () => {
    const el = useRef(null);
    const containerRef = useRef(null);

    // Parallax State
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const typed = new Typed(el.current, {
            strings: [
                'an ETL Developer.',
                'an Ab Initio Expert.',
                'an AI &amp; LLM Specialist.',
                'a Fullstack Data Engineer.'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            loop: true,
            backDelay: 2000
        });

        return () => {
            typed.destroy();
        };
    }, []);

    // Parallax Mouse Tracker
    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const { clientX, clientY } = e;
        const { width, height } = containerRef.current.getBoundingClientRect();

        // Calculate spread (-1 to 1)
        const x = (clientX / width - 0.5) * 2;
        const y = (clientY / height - 0.5) * 2;

        setMousePosition({ x, y });
    };

    return (
        <section
            id="home"
            className="hero-section"
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setMousePosition({ x: 0, y: 0 })}
        >
            <div className="hero-container">

                {/* Profile Image */}
                <motion.div
                    className="hero-image-container"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{
                        x: mousePosition.x * -20,
                        y: mousePosition.y * -20,
                    }}
                >
                    <div className="hero-image-glow"></div>
                    {/* Original Profile Image */}
                    <img src="/assets/about-pic.png" alt="Nidhin R" className="hero-image" style={{ position: 'relative', zIndex: 5 }} />
                </motion.div>

                {/* Text Content */}
                <motion.div
                    className="hero-text-container"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    style={{
                        x: mousePosition.x * 15,
                        y: mousePosition.y * 15,
                    }}
                >
                    <p className="hero-greeting">Hello, I'm</p>
                    <h1 className="hero-name">Nidhin R<span className="text-accent">.</span></h1>

                    <motion.div
                        className="hero-status-badge"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        <span className="status-dot"></span>
                        Available for Work
                    </motion.div>

                    <h3 className="hero-role">
                        <span ref={el} className="typed-text"></span>
                    </h3>

                    <div className="hero-buttons flex-col">
                        <div className="hero-buttons-row">
                            <Magnetic strength={40}>
                                <button
                                    className="btn btn-primary hoverable"
                                    onClick={() => window.open('/assets/Resume_Nidhin_R.pdf')}
                                >
                                    Resume
                                </button>
                            </Magnetic>
                            <Magnetic strength={30}>
                                <button
                                    className="btn btn-outline hoverable"
                                    onClick={() => location.href = '#contact'}
                                >
                                    Contact
                                </button>
                            </Magnetic>
                        </div>
                    </div>

                    {/* Built-in Navigation for Left Panel */}
                    <nav className="hero-nav">
                        <a href="#about" className="hero-nav-link hoverable">ABOUT</a>
                        <a href="#services" className="hero-nav-link hoverable">SERVICES</a>
                        <a href="#experience" className="hero-nav-link hoverable">EXPERIENCE</a>
                        <a href="#projects" className="hero-nav-link hoverable">PROJECTS</a>
                    </nav>
                    <div className="hero-socials">
                        <a href="https://www.linkedin.com/in/nidhin-r-7a2469222/" target="_blank" rel="noreferrer" className="social-icon hoverable">
                            <img src="/assets/linkedin.png" alt="LinkedIn" className="icon" />
                        </a>
                        <a href="https://github.com/nidhinR1998" target="_blank" rel="noreferrer" className="social-icon hoverable">
                            <img src="/assets/github.png" alt="Github" className="icon" />
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
