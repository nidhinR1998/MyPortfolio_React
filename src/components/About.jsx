import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

const About = () => {
    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 }
        }
    };

    return (
        <section id="about" className="about-section">
            <motion.div
                className="section-header"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.05 }}
                variants={containerVariants}
            >
                <p className="section-subtitle">Get To Know More</p>
                <h2 className="section-title title-accent">About Me</h2>
            </motion.div>

            <motion.div
                className="about-content"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.05 }}
                variants={containerVariants}
            >
                <div className="about-text-container">
                    <p className="about-desc">
                        I am an IT professional with strong hands-on experience in Ab Initio, specializing in data transformation, data processing, and large-scale data migration. I have a solid foundation in ETL workflows, performance tuning, and end-to-end pipeline design.
                    </p>
                    <p className="about-desc">
                        In addition to my ETL background, I possess deep skills in Java, Spring Boot, Python, Django, Flask, and emerging technologies like Generative AI, LLMs, and RAG architectures. I have built multiple self-designed projects reflecting a versatile, full-stack, and AI-driven approach to complex problem-solving.
                    </p>

                    <div className="about-highlights">
                        <div className="highlight-item glass hoverable">
                            <span className="highlight-number">4+</span>
                            <span className="highlight-text">Years ETL Experience</span>
                        </div>
                        <div className="highlight-item glass hoverable">
                            <span className="highlight-number">10+</span>
                            <span className="highlight-text">Data / AI Projects</span>
                        </div>
                    </div>
                </div>

                {/* Live Github Stats Panel */}
                <motion.div
                    className="about-github-stats glass"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    <h3 className="stats-title">Live GitHub Activity</h3>
                    <div className="stats-images">
                        <img
                            src="https://github-readme-stats.vercel.app/api?username=nidhinR1998&show_icons=true&theme=nord&bg_color=0f172a&title_color=38bdf8&text_color=94a3b8&icon_color=38bdf8&hide_border=true"
                            alt="Nidhin's GitHub Stats"
                            className="github-stat-img hoverable"
                        />
                        <img
                            src="https://github-readme-stats.vercel.app/api/top-langs/?username=nidhinR1998&layout=compact&theme=nord&bg_color=0f172a&title_color=38bdf8&text_color=94a3b8&hide_border=true"
                            alt="Top Languages"
                            className="github-stat-img hoverable"
                        />
                    </div>
                    <div className="stats-images-full">
                        <img
                            src="https://github-readme-activity-graph.vercel.app/graph?username=nidhinR1998&theme=react-dark&bg_color=0f172a&color=38bdf8&line=38bdf8&point=ffffff&hide_border=true"
                            alt="GitHub Activity Graph"
                            className="github-activity-img"
                        />
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default About;
