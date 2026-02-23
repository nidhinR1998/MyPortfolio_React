import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import './Testimonials.css';

const Testimonials = () => {
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

    const testimonials = [
        {
            text: "Nidhin delivered an exceptional frontend overhaul for our platform. The attention to detail and animations are world-class.",
            author: "Sarah J.",
            role: "Product Manager",
            company: "TechFlow Solutions"
        },
        {
            text: "A rare breed of developer who understands both hardcore backend architecture and premium UI aesthetics. Highly recommended.",
            author: "David M.",
            role: "CTO",
            company: "Innovate Labs"
        },
        {
            text: "The transition from our old stack to the new Angular architecture went flawlessly thanks to Nidhin's expertise.",
            author: "Priya K.",
            role: "Lead Engineer",
            company: "Global Systems"
        }
    ];

    return (
        <section id="testimonials" className="testimonials-section">
            <motion.div
                className="section-header"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.05 }}
                variants={containerVariants}
            >
                <p className="section-subtitle">Client Feedback</p>
                <h2 className="section-title title-accent">Testimonials</h2>
            </motion.div>

            <motion.div
                className="testimonials-grid"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.05 }}
                variants={containerVariants}
            >
                {testimonials.map((item, index) => (
                    <motion.div key={index} className="testimonial-card glass hoverable" variants={itemVariants}>
                        <Quote className="quote-icon" size={40} />
                        <p className="testimonial-text">"{item.text}"</p>
                        <div className="testimonial-author">
                            <div className="author-avatar">{item.author.charAt(0)}</div>
                            <div className="author-info">
                                <h4 className="author-name">{item.author}</h4>
                                <p className="author-role">{item.role}, {item.company}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default Testimonials;
