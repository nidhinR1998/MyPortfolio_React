import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './InitialLoader.css';

const InitialLoader = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState("Initializing Core...");

    const statusMessages = [
        "Initializing Core...",
        "Linking Data Streams...",
        "Calibrating Neural Layers...",
        "Optimizing RAG Pipelines...",
        "Synchronizing 3D Interface...",
        "Establishing Secure Connection...",
        "System Ready."
    ];

    useEffect(() => {
        let currentProgress = 0;
        const interval = setInterval(() => {
            currentProgress += Math.random() * 15;
            if (currentProgress > 100) {
                currentProgress = 100;
                clearInterval(interval);
                setTimeout(onComplete, 500);
            }
            setProgress(currentProgress);

            // Update status message based on progress
            const statusIdx = Math.min(
                Math.floor((currentProgress / 100) * statusMessages.length),
                statusMessages.length - 1
            );
            setStatus(statusMessages[statusIdx]);
        }, 150);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <motion.div
            className="loader-overlay"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
        >
            <div className="loader-scanlines" />

            <div className="loader-3d-container">
                <div className="loader-cube">
                    <div className="cube-face" />
                    <div className="cube-face" />
                    <div className="cube-face" />
                    <div className="cube-face" />
                    <div className="cube-face" />
                    <div className="cube-face" />
                </div>
                <div className="loader-inner-core" />
            </div>

            <div className="loader-text-container">
                <motion.h2
                    className="loader-title"
                    animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    Nidhin R.
                </motion.h2>
                <span className="loader-status">{status}</span>

                <div className="loader-progress-bar">
                    <motion.div
                        className="loader-progress-fill"
                        animate={{ width: `${progress}%` }}
                        transition={{ type: "spring", damping: 20, stiffness: 100 }}
                    />
                </div>
            </div>
        </motion.div>
    );
};

export default InitialLoader;
