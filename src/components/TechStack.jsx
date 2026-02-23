import React from 'react';
import './TechStack.css';
import { Database, Cpu, Terminal, Server, Layers, Globe, Settings, GitBranch } from 'lucide-react'; // Import icons

const TechStack = () => {
    // A comprehensive list of modern tech skills to populate the marquee
    const technologies = [
        { name: "Ab Initio (GDE)", icon: <Database size={24} /> },
        { name: "Java", icon: <Cpu size={24} /> },
        { name: "Python", icon: <Terminal size={24} /> },
        { name: "Spring Boot", icon: <Server size={24} /> },
        { name: "Django", icon: <Layers size={24} /> },
        { name: "Flask", icon: <Cpu size={24} /> },
        { name: "Generative AI", icon: <Globe size={24} /> },
        { name: "LLMs & RAG", icon: <Globe size={24} /> },
        { name: "SQL", icon: <Database size={24} /> },
        { name: "IBM MDM", icon: <Database size={24} /> },
        { name: "UNIX / AIX", icon: <Terminal size={24} /> },
        { name: "Control M", icon: <Settings size={24} /> },
        { name: "Git & GitHub", icon: <GitBranch size={24} /> },
        { name: "Soap UI", icon: <Settings size={24} /> },
        { name: "React", icon: <Cpu size={24} /> }
    ];

    // We duplicate the array to create the seamless infinite scroll illusion
    const doubledTechnologies = [...technologies, ...technologies];

    return (
        <section id="techstack" className="tech-section">
            <div className="section-header tech-header">
                <p className="section-subtitle">My Arsenal</p>
                <h2 className="section-title title-accent">Tech Stack</h2>
            </div>

            <div className="marquee-container">
                {/* Left and Right blur gradients to obscure the edges */}
                <div className="marquee-fade marquee-fade-left"></div>
                <div className="marquee-fade marquee-fade-right"></div>

                <div className="marquee-content">
                    {doubledTechnologies.map((skill, index) => (
                        <div key={index} className="tech-item glass hoverable">
                            {skill.icon}
                            <span>{skill.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Reverse Marquee for depth */}
            <div className="marquee-container marquee-reverse">
                <div className="marquee-fade marquee-fade-left"></div>
                <div className="marquee-fade marquee-fade-right"></div>

                <div className="marquee-content">
                    {[...doubledTechnologies].reverse().map((skill, index) => (
                        <div key={index} className="tech-item glass hoverable">
                            {skill.icon}
                            <span>{skill.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TechStack;
