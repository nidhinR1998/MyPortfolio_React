import React from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, Cloud } from 'lucide-react';
import './Certifications.css';

const Certifications = () => {
    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
    };

    const certs = [
        {
            title: "Master of Computer Applications",
            issuer: "University",
            date: "2023",
            icon: <Award size={32} />,
            color: "#8b5cf6" // Purple
        },
        {
            title: "Bachelors Degree in Physics",
            issuer: "University",
            date: "2021",
            icon: <Award size={32} />,
            color: "#38bdf8" // Cyan
        },
        {
            title: "AWS Certified Cloud Practitioner",
            issuer: "Amazon Web Services",
            date: "2024",
            icon: <Cloud size={32} />,
            color: "#f59e0b" // Orange/Gold
        },
        {
            title: "Fullstack Development Certification",
            issuer: "Tech Academy",
            date: "2022",
            icon: <ShieldCheck size={32} />,
            color: "#10b981" // Green
        }
    ];

    return (
        <section id="certifications" className="certs-section">
            <motion.div
                className="section-header"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.05 }}
                variants={containerVariants}
            >
                <p className="section-subtitle">Credentials</p>
                <h2 className="section-title title-accent">Education & Certs</h2>
            </motion.div>

            <motion.div
                className="certs-grid"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.05 }}
                variants={containerVariants}
            >
                {certs.map((cert, index) => (
                    <motion.div
                        key={index}
                        className="cert-card hoverable glass"
                        variants={itemVariants}
                        whileHover={{ y: -10 }}
                    >
                        <div className="cert-icon-wrapper" style={{ boxShadow: `0 0 20px ${cert.color}40`, color: cert.color }}>
                            {cert.icon}
                        </div>
                        <div className="cert-info">
                            <h3 className="cert-title">{cert.title}</h3>
                            <p className="cert-issuer">{cert.issuer}</p>
                            <div className="cert-date">{cert.date}</div>
                        </div>
                        <div className="cert-glow" style={{ background: `radial-gradient(circle at top right, ${cert.color}20, transparent 70%)` }}></div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default Certifications;
