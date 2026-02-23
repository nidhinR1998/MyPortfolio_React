import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Send } from 'lucide-react';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, integrate EmailJS or a backend endpoint here
        alert("This is a UI demo! In production, this would send an email.");
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <section id="contact" className="contact-section">
            <motion.div
                className="section-header"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={containerVariants}
            >
                <p className="section-subtitle">Get in Touch</p>
                <h2 className="section-title title-accent">Let's Collaborate</h2>
            </motion.div>

            <motion.div
                className="contact-layout"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.05 }}
                variants={containerVariants}
            >
                {/* Contact Info Sidebar */}
                <motion.div className="contact-info-sidebar glass" variants={itemVariants}>
                    <h3 className="contact-sidebar-title">Contact Information</h3>
                    <p className="contact-sidebar-desc">Ready to start your next project with me? Send an email or reach out on LinkedIn, and I'll get back to you as soon as possible.</p>

                    <div className="contact-links-list">
                        <a href="mailto:nidhinrajesh1998@gmail.com" className="contact-info-item hoverable">
                            <div className="contact-icon-wrapper">
                                <Mail className="contact-icon" size={24} />
                            </div>
                            <div className="contact-text-box">
                                <span className="contact-label">Email Me</span>
                                <span className="contact-value">NidhinRajesh@gmail.com</span>
                            </div>
                        </a>

                        <a href="https://www.linkedin.com/in/nidhin-r-7a2469222" target="_blank" rel="noreferrer" className="contact-info-item hoverable">
                            <div className="contact-icon-wrapper">
                                <Linkedin className="contact-icon" size={24} />
                            </div>
                            <div className="contact-text-box">
                                <span className="contact-label">Connect</span>
                                <span className="contact-value">LinkedIn Profile</span>
                            </div>
                        </a>
                    </div>
                </motion.div>

                {/* Contact Form */}
                <motion.div className="contact-form-container glass" variants={itemVariants}>
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input
                                type="text"
                                id="name"
                                className="form-input hoverable"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="form-input hoverable"
                                placeholder="john@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message" className="form-label">Message</label>
                            <textarea
                                id="message"
                                className="form-textarea hoverable"
                                placeholder="Hello, I would like to discuss a project..."
                                rows="5"
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                required
                            ></textarea>
                        </div>

                        <motion.button
                            type="submit"
                            className="btn btn-primary form-submit hoverable"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Send Message <Send size={18} />
                        </motion.button>
                    </form>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Contact;
