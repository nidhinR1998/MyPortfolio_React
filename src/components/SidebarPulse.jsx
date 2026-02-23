import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './SidebarPulse.css';

const SidebarPulse = () => {
    const [logs, setLogs] = useState([
        { id: 1, time: '00:00:01', msg: 'SYSTEM_INIT::OK', status: 'LOADED' },
        { id: 2, time: '00:00:02', msg: 'NEURAL_LINK::ESTABLISHED', status: 'SYNC' },
        { id: 3, time: '00:00:04', msg: 'ETL_BUFFER::READY', status: 'WAIT' },
    ]);

    const [activeSection, setActiveSection] = useState('home');

    const sections = [
        { id: 'home', label: 'Overview' },
        { id: 'about', label: 'Identity' },
        { id: 'techstack', label: 'Arsenal' },
        { id: 'experience', label: 'Timeline' },
        { id: 'projects', label: 'Shipments' },
        { id: 'contact', label: 'Uplink' }
    ];

    // Scroll Observer
    useEffect(() => {
        const handleScroll = () => {
            const sectionElements = sections.map(s => document.getElementById(s.id));
            const scrollPosition = window.scrollY + 300;

            for (let i = sectionElements.length - 1; i >= 0; i--) {
                const el = sectionElements[i];
                if (el && scrollPosition >= el.offsetTop) {
                    setActiveSection(sections[i].id);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Random Log Generator
    useEffect(() => {
        const logMessages = [
            'OPTIMIZING_PIPELINE', 'SCRAPING_METRICS', 'AUTH_VALIDATED',
            'DATA_PACKET_TRANSFERRED', 'ENCRYPTING_CORE', 'INDEX_REBUILD',
            'AI_SYNCH_COMPLETE', 'BUFFER_PURGED', 'MDM_QUERY_INIT'
        ];

        const interval = setInterval(() => {
            const newLog = {
                id: Date.now(),
                time: new Date().toLocaleTimeString('en-GB', { hour12: false }),
                msg: logMessages[Math.floor(Math.random() * logMessages.length)],
                status: 'OK'
            };
            setLogs(prev => [...prev.slice(-7), newLog]);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="sidebar-pulse">
            {/* System Log Terminal */}
            <div className="system-log glass">
                <div className="log-title">
                    <span className="log-dot"></span>
                    Terminal Output
                </div>
                <div className="log-entries">
                    <AnimatePresence mode="popLayout">
                        {logs.map((log) => (
                            <motion.div
                                key={log.id}
                                className="log-entry"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                            >
                                <span className="timestamp">[{log.time}]</span>
                                <span className="message">{log.msg}</span>
                                <span className="status"> ..{log.status}</span>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* Vertical Tracker */}
            <div className="section-tracker">
                {sections.map(section => (
                    <a
                        key={section.id}
                        href={`#${section.id}`}
                        className={`tracker-item ${activeSection === section.id ? 'active' : ''}`}
                    >
                        <div className="tracker-dot"></div>
                        <span className="tracker-label">{section.label}</span>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default SidebarPulse;
