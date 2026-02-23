import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, GraduationCap } from 'lucide-react';
import './Experience.css';

const Experience = () => {
    const [activeTab, setActiveTab] = useState('skills');

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.1 }
        }
    };

    const skillVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
    };

    const skills = [
        { name: "Ab Initio (ETL)", level: 95 },
        { name: "Java & Spring Boot", level: 90 },
        { name: "Python / AI / LLMs", level: 85 },
        { name: "SQL & DB Management", level: 90 },
        { name: "React & Frontend", level: 80 }
    ];

    const experiences = [
        {
            year: "2024 - Present",
            role: "ETL Developer",
            company: "Tech Solutions Inc.",
            description: "Designing and optimizing robust ETL workflows using Ab Initio GDE to handle massive data migrations. Designing end-to-end data pipelines for enterprise analytics."
        },
        {
            year: "2022 - 2024",
            role: "Software Engineer",
            company: "Digital Innovations Ltd.",
            description: "Developed and maintained fullstack applications utilizing Java, Spring Boot, and Python. Integrated Generative AI models and orchestrated database performance tuning."
        },
        {
            year: "2020 - 2022",
            role: "Developer Trainee",
            company: "Startup Co.",
            description: "Assisted in data processing workflows and built dynamic, responsive frontend interfaces using modern JavaScript frameworks."
        }
    ];

    return (
        <section id="experience" className="experience-section">
            <motion.div
                className="section-header"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.05 }}
                variants={containerVariants}
            >
                <p className="section-subtitle">Explore My</p>
                <h2 className="section-title title-accent">Experience & Skills</h2>
            </motion.div>

            <div className="experience-tabs hoverable">
                <button
                    className={`tab-btn ${activeTab === 'skills' ? 'active' : ''}`}
                    onClick={() => setActiveTab('skills')}
                >
                    Technical Skills
                </button>
                <button
                    className={`tab-btn ${activeTab === 'timeline' ? 'active' : ''}`}
                    onClick={() => setActiveTab('timeline')}
                >
                    My Journey
                </button>
            </div>

            <div className="experience-content-area">
                <AnimatePresence mode="wait">

                    {/* SKILLS VIEW */}
                    {activeTab === 'skills' && (
                        <motion.div
                            key="skills"
                            className="skills-container glass"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                        >
                            <h3 className="card-title">Core Competencies</h3>
                            <div className="progress-bars-wrapper">
                                {skills.map((skill, index) => (
                                    <motion.div key={index} className="skill-progress-item" variants={skillVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                                        <div className="skill-header">
                                            <span className="skill-name">{skill.name}</span>
                                            <span className="skill-percentage">{skill.level}%</span>
                                        </div>
                                        <div className="progress-track">
                                            <motion.div
                                                className="progress-fill"
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${skill.level}%` }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1.5, delay: 0.2 + (index * 0.1), ease: "easeOut" }}
                                                style={{
                                                    background: skill.type === 'frontend'
                                                        ? 'linear-gradient(90deg, #38bdf8, #818cf8)'
                                                        : 'linear-gradient(90deg, #c084fc, #e879f9)'
                                                }}
                                            ></motion.div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* TIMELINE VIEW */}
                    {activeTab === 'timeline' && (
                        <motion.div
                            key="timeline"
                            className="timeline-container relative"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                        >
                            <div className="timeline-line"></div>
                            {experiences.map((event, index) => (
                                <motion.div
                                    key={index}
                                    className="timeline-item glass hoverable"
                                    initial={{ opacity: 0, x: 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.2 }}
                                    whileHover={{ x: -10, scale: 1.02 }}
                                >
                                    <div className="timeline-icon text-accent">
                                        {event.icon}
                                    </div>
                                    <div className="timeline-content">
                                        <span className="timeline-date">{event.year}</span>
                                        <h3 className="timeline-role">{event.role}</h3>
                                        <h4 className="timeline-company">{event.company}</h4>
                                        <p className="timeline-description">{event.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </section>
    );
};

export default Experience;
