import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Server, Workflow, BrainCircuit, X } from 'lucide-react';
import './DataPipeline.css';

const DataPipeline = () => {
    const [activeNode, setActiveNode] = useState(null);

    const containerVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 }
        }
    };

    const nodeData = {
        source: {
            title: "Source Systems",
            icon: <Database size={32} />,
            color: "#3b82f6", // Blue
            details: "Integrating colossal volumes of enterprise data from disparate sources (DB2, Oracle, flat files) asynchronously or via batch processing."
        },
        etl: {
            title: "Ab Initio GDE",
            icon: <Workflow size={32} />,
            color: "#10b981", // Green
            details: "Utilizing deep multi-file system (MFS) parallel partitioning and continuous data flows to transform raw inputs into clean, standardized datasets in record time."
        },
        vector: {
            title: "Vector Database",
            icon: <Server size={32} />,
            color: "#8b5cf6", // Purple
            details: "Embedding cleaned textual datasets into high-dimensional vectors (HNSW index) using Python backends to enable lightning-fast semantic retrieval."
        },
        ai: {
            title: "LLM / RAG Engine",
            icon: <BrainCircuit size={32} />,
            color: "#f59e0b", // Amber
            details: "Feeding retrieved hyper-relevant context into Large Language Models to generate highly accurate, hallucination-free enterprise responses."
        }
    };

    return (
        <section id="pipeline" className="pipeline-section">
            <motion.div
                className="section-header"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
            >
                <p className="section-subtitle">Architecture</p>
                <h2 className="section-title title-accent">Data & AI Pipeline</h2>
            </motion.div>

            <div className="pipeline-container">
                {/* SVG Background for animated "data packets" flow */}
                <svg className="pipeline-svg" preserveAspectRatio="none">
                    {/* Flow 1: Source to ETL */}
                    <path id="path1" d="M 150 150 L 350 150" className="pipe-path" />
                    <circle r="4" fill="#38bdf8" className="data-packet">
                        <animateMotion dur="2s" repeatCount="indefinite" path="M 150 150 L 350 150" />
                    </circle>
                    <circle r="4" fill="#38bdf8" className="data-packet" style={{ animationDelay: '-1s' }}>
                        <animateMotion dur="2s" repeatCount="indefinite" path="M 150 150 L 350 150" begin="-1s" />
                    </circle>

                    {/* Flow 2: ETL to Vector */}
                    <path id="path2" d="M 500 150 L 700 150" className="pipe-path" />
                    <circle r="4" fill="#10b981" className="data-packet">
                        <animateMotion dur="2s" repeatCount="indefinite" path="M 500 150 L 700 150" />
                    </circle>
                    <circle r="4" fill="#10b981" className="data-packet" style={{ animationDelay: '-1s' }}>
                        <animateMotion dur="2s" repeatCount="indefinite" path="M 500 150 L 700 150" begin="-1s" />
                    </circle>

                    {/* Flow 3: Vector to AI */}
                    <path id="path3" d="M 850 150 C 950 150, 950 300, 850 300 L 700 300" className="pipe-path" />
                    <circle r="4" fill="#8b5cf6" className="data-packet">
                        <animateMotion dur="3s" repeatCount="indefinite" path="M 850 150 C 950 150, 950 300, 850 300 L 700 300" />
                    </circle>
                </svg>

                {/* Actual Nodes Overlay */}
                <motion.div
                    className="nodes-wrapper"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    <div className="pipeline-node hoverable source-node" onClick={() => setActiveNode('source')}>
                        <div className="node-icon" style={{ color: nodeData.source.color }}>{nodeData.source.icon}</div>
                        <span className="node-label">{nodeData.source.title}</span>
                        <div className="node-glow" style={{ background: nodeData.source.color }}></div>
                    </div>

                    <div className="pipeline-node hoverable etl-node" onClick={() => setActiveNode('etl')}>
                        <div className="node-icon" style={{ color: nodeData.etl.color }}>{nodeData.etl.icon}</div>
                        <span className="node-label">{nodeData.etl.title}</span>
                        <div className="node-glow" style={{ background: nodeData.etl.color }}></div>
                    </div>

                    <div className="pipeline-node hoverable vector-node" onClick={() => setActiveNode('vector')}>
                        <div className="node-icon" style={{ color: nodeData.vector.color }}>{nodeData.vector.icon}</div>
                        <span className="node-label">{nodeData.vector.title}</span>
                        <div className="node-glow" style={{ background: nodeData.vector.color }}></div>
                    </div>

                    <div className="pipeline-node hoverable ai-node" onClick={() => setActiveNode('ai')}>
                        <div className="node-icon" style={{ color: nodeData.ai.color }}>{nodeData.ai.icon}</div>
                        <span className="node-label">{nodeData.ai.title}</span>
                        <div className="node-glow" style={{ background: nodeData.ai.color }}></div>
                    </div>
                </motion.div>

                {/* Modal for Node Details */}
                <AnimatePresence>
                    {activeNode && (
                        <motion.div
                            className="node-modal glass"
                            initial={{ opacity: 0, scale: 0.8, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 20 }}
                            style={{ borderTop: `4px solid ${nodeData[activeNode].color}` }}
                        >
                            <button className="node-close hoverable" onClick={() => setActiveNode(null)}>
                                <X size={20} />
                            </button>
                            <h3 style={{ color: nodeData[activeNode].color }}>
                                {nodeData[activeNode].icon} {nodeData[activeNode].title}
                            </h3>
                            <p>{nodeData[activeNode].details}</p>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </section>
    );
};

export default DataPipeline;
