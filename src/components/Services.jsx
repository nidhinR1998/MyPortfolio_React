import React from 'react';
import { motion } from 'framer-motion';
import { Database, BrainCircuit, Code2, ServerCog } from 'lucide-react';
import './Services.css';

const Services = () => {
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

    const services = [
        {
            title: "ETL & Data Engineering",
            description: "Expertise in Ab Initio (GDE) for massive data transformation, ingestion pipelines, and large-scale data migration.",
            icon: <Database className="service-icon text-accent" size={40} />,
            color: "#38bdf8"
        },
        {
            title: "Generative AI & LLMs",
            description: "Implementing cutting-edge RAG architectures and LLM integrations using Python, Flask, and advanced vector search.",
            icon: <BrainCircuit className="service-icon text-accent" size={40} />,
            color: "#818cf8"
        },
        {
            title: "Backend Architecture",
            description: "Designing robust, scalable APIs and microservices using Java, Spring Boot, and Django.",
            icon: <ServerCog className="service-icon text-accent" size={40} />,
            color: "#c084fc"
        },
        {
            title: "Fullstack Solutions",
            description: "Bridging the gap between complex backend logic and dynamic, intuitive user interfaces.",
            icon: <Code2 className="service-icon text-accent" size={40} />,
            color: "#f472b6"
        }
    ];

    return (
        <section id="services" className="services-section">
            <motion.div
                className="section-header"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.05 }}
                variants={containerVariants}
            >
                <p className="section-subtitle">What I Do</p>
                <h2 className="section-title title-accent">My Services</h2>
            </motion.div>

            <motion.div
                className="services-grid"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.05 }}
                variants={containerVariants}
            >
                {services.map((service, index) => (
                    <motion.div
                        key={index}
                        className="service-card glass hoverable"
                        variants={itemVariants}
                        whileHover={{ y: -10, scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                        <div
                            className="service-icon-wrapper"
                            style={{ boxShadow: `0 0 20px ${service.color} 40`, borderColor: service.color }}
                        >
                            {service.icon}
                        </div>
                        <h3 className="service-title">{service.title}</h3>
                        <p className="service-description">{service.description}</p>

                        <div className="service-glow" style={{ background: service.color }}></div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default Services;
