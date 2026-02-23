import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Code2, BrainCircuit, Wrench, ChevronDown, ChevronUp } from 'lucide-react';
import './CoreCompetencies.css';

const CoreCompetencies = () => {
    const [openIndex, setOpenIndex] = useState(0);

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.4 } }
    };

    const categories = [
        {
            id: "etl",
            title: "ETL & Database",
            icon: <Database size={24} />,
            color: "#38bdf8", // Cyan
            skills: ["Ab Initio (GDE 3.1.7.2, 4.2.1.1)", "SQL", "IBM MDM", "Data Migration", "Performance Tuning"]
        },
        {
            id: "programming",
            title: "Programming",
            icon: <Code2 size={24} />,
            color: "#818cf8", // Indigo
            skills: ["Java", "Python", "Shell Scripting", "Spring Boot", "Django", "Flask"]
        },
        {
            id: "ai",
            title: "AI & Emerging Tech",
            icon: <BrainCircuit size={24} />,
            color: "#c084fc", // Purple
            skills: ["Generative AI", "Large Language Models (LLMs)", "RAG Architectures", "Vector Search"]
        },
        {
            id: "tools",
            title: "Tools & Platforms",
            icon: <Wrench size={24} />,
            color: "#f472b6", // Pink
            skills: ["UNIX / AIX / LINUX", "Git / GitHub", "DBeaver", "Putty", "Control M Scheduler", "Soap UI", "Winscp", "Ab Initio MHUB", "MQ Explore"]
        }
    ];

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    return (
        <section id="competencies" className="competencies-section">
            <motion.div
                className="section-header"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.05 }}
                variants={containerVariants}
            >
                <p className="section-subtitle">Categorized Expertise</p>
                <h2 className="section-title title-accent">Core Competencies</h2>
            </motion.div>

            <motion.div
                className="competencies-container"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.05 }}
                variants={containerVariants}
            >
                {categories.map((category, index) => {
                    const isOpen = openIndex === index;

                    return (
                        <motion.div
                            key={category.id}
                            className={`comp-card glass ${isOpen ? 'active' : ''}`}
                            variants={itemVariants}
                        >
                            {/* Card Header (Clickable) */}
                            <div
                                className="comp-header hoverable"
                                onClick={() => handleToggle(index)}
                            >
                                <div className="comp-title-group">
                                    <div className="comp-icon" style={{ color: category.color, background: `${category.color}20`, border: `1px solid ${category.color}40` }}>
                                        {category.icon}
                                    </div>
                                    <h3 className="comp-title">{category.title}</h3>
                                </div>
                                <div className="comp-toggle-icon">
                                    {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                                </div>
                            </div>

                            {/* Animated Expansion Body */}
                            <AnimatePresence>
                                {isOpen && (
                                    <motion.div
                                        className="comp-body"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <div className="comp-skills-list">
                                            {category.skills.map((skill, idx) => (
                                                <div key={idx} className="comp-skill-badge hoverable" style={{ borderColor: `${category.color}40` }}>
                                                    <span className="comp-skill-dot" style={{ background: category.color }}></span>
                                                    {skill}
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                        </motion.div>
                    );
                })}
            </motion.div>
        </section>
    );
};

export default CoreCompetencies;
