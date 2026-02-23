import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './NeuralNet.css';

const NeuralNet = () => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const [hoveredLayer, setHoveredLayer] = useState(null);
    const [hasError, setHasError] = useState(false);

    const layers = [
        { name: 'Input Embeddings', description: 'Converts text tokens into dense vectors.' },
        { name: 'Self-Attention', description: 'Calculates relationship weights between all tokens in a sequence.' },
        { name: 'Feed-Forward', description: 'Applies non-linear transformations to each vector.' },
        { name: 'Output Head', description: 'Predicts the next token in the sequence.' },
    ];

    useEffect(() => {
        if (hasError) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId;

        const resize = () => {
            try {
                if (!containerRef.current || !canvasRef.current) return;
                const rect = containerRef.current.getBoundingClientRect();
                canvas.width = rect.width || 300;
                canvas.height = rect.height || 300;
            } catch (e) {
                console.error("NeuralNet Resize Error:", e);
            }
        };

        window.addEventListener('resize', resize);
        resize();

        let particles = [];
        const numLayers = 4;
        const nodesPerLayer = [6, 8, 8, 4];

        const createSignal = () => {
            if (particles.length > 50 || canvas.height <= 0) return;
            particles.push({
                x: 0,
                y: (Math.random() * 0.6 + 0.2) * canvas.height,
                speed: Math.random() * 2 + 1,
                size: Math.random() * 2 + 1,
                opacity: 1,
                hue: 200 + Math.random() * 40
            });
        };

        const draw = () => {
            try {
                if (!ctx || !canvas) return;
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                if (canvas.width <= 0 || canvas.height <= 0) {
                    animationFrameId = requestAnimationFrame(draw);
                    return;
                }

                const layerGap = canvas.width / (numLayers + 1);

                // Draw connections
                ctx.lineWidth = 0.5;
                for (let i = 0; i < numLayers - 1; i++) {
                    const x1 = (i + 1) * layerGap;
                    const x2 = (i + 2) * layerGap;
                    const nodes1 = nodesPerLayer[i];
                    const nodes2 = nodesPerLayer[i + 1];

                    for (let j = 0; j < nodes1; j++) {
                        const y1 = (j + 1) * (canvas.height / (nodes1 + 1));
                        for (let k = 0; k < nodes2; k++) {
                            const y2 = (k + 1) * (canvas.height / (nodes2 + 1));

                            const dist = Math.hypot(x2 - x1, y2 - y1);
                            const alpha = Math.max(0, Math.min(0.1, 0.1 * (1 - dist / canvas.width)));
                            ctx.strokeStyle = `rgba(56, 189, 248, ${isNaN(alpha) ? 0.05 : alpha})`;
                            ctx.beginPath();
                            ctx.moveTo(x1, y1);
                            ctx.lineTo(x2, y2);
                            ctx.stroke();
                        }
                    }
                }

                // Draw nodes
                for (let i = 0; i < numLayers; i++) {
                    const x = (i + 1) * layerGap;
                    const nodes = nodesPerLayer[i];
                    for (let j = 0; j < nodes; j++) {
                        const y = (j + 1) * (canvas.height / (nodes + 1));

                        try {
                            const gradient = ctx.createRadialGradient(x, y, 0, x, y, 5);
                            gradient.addColorStop(0, '#38bdf8');
                            gradient.addColorStop(1, 'transparent');
                            ctx.fillStyle = gradient;
                            ctx.beginPath();
                            ctx.arc(x, y, 4, 0, Math.PI * 2);
                            ctx.fill();
                        } catch (e) { /* gradient fail */ }

                        ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.arc(x, y, 6, 0, Math.PI * 2);
                        ctx.stroke();
                    }
                }

                // Update signal particles
                for (let i = particles.length - 1; i >= 0; i--) {
                    const p = particles[i];
                    p.x += p.speed;
                    if (p.x > canvas.width) {
                        particles.splice(i, 1);
                        continue;
                    }

                    ctx.shadowBlur = 10;
                    ctx.shadowColor = `hsla(${p.hue}, 100%, 50%, ${p.opacity})`;
                    ctx.fillStyle = `hsla(${p.hue}, 100%, 50%, ${p.opacity})`;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.shadowBlur = 0;
                }

                if (Math.random() < 0.1) createSignal();
                animationFrameId = requestAnimationFrame(draw);
            } catch (e) {
                console.error("NeuralNet Draw Error:", e);
                setHasError(true);
            }
        };

        draw();

        return () => {
            window.removeEventListener('resize', resize);
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, [hasError]);

    if (hasError) {
        return (
            <section id="neural-net" className="neural-section">
                <div className="neural-container glass" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                    <p>Neural visualization temporarily unavailable.</p>
                </div>
            </section>
        );
    }

    return (
        <section id="neural-net" className="neural-section">
            <div className="section-header">
                <p className="section-subtitle">Deep Learning Architecture</p>
                <h2 className="section-title title-accent">Neural Network Logic</h2>
            </div>

            <div className="neural-container glass" ref={containerRef}>
                <canvas ref={canvasRef} className="neural-canvas"></canvas>

                <div className="layer-labels">
                    {layers.map((layer, index) => (
                        <div
                            key={index}
                            className="layer-info-card"
                            onMouseEnter={() => setHoveredLayer(index)}
                            onMouseLeave={() => setHoveredLayer(null)}
                        >
                            <h4>{layer.name}</h4>
                            <AnimatePresence>
                                {hoveredLayer === index && (
                                    <motion.p
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                    >
                                        {layer.description}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

                <div className="interaction-hint">
                    Hover layers to explore LLM components
                </div>
            </div>

            <div className="neural-footer">
                <p>Nidhin leverages <strong>Transformer-based architectures</strong> and <strong>Self-Attention mechanisms</strong> to build contextual RAG systems that process complex enterprise data with high semantic accuracy.</p>
            </div>
        </section>
    );
};

export default NeuralNet;
