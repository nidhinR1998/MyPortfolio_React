import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Brain, Zap, CheckCircle, Database, Layout, ShieldCheck } from 'lucide-react';
import './AgentOrchestrator.css';

const AGENTS = [
    { id: 'researcher', name: 'Researcher Agent', icon: Search, color: '#38bdf8', description: 'Scans source schemas & metadata' },
    { id: 'architect', name: 'AI Architect', icon: Layout, color: '#818cf8', description: 'Designs Ab Initio mapping logic' },
    { id: 'etl_dev', name: 'ETL Developer', icon: Database, color: '#c084fc', description: 'Generates GDE components & DML' },
    { id: 'validator', name: 'QA Validator', icon: ShieldCheck, color: '#4ade80', description: 'Verifies data integrity & RAG citations' },
];

const LOG_MESSAGES = [
    { agent: 'researcher', text: 'Connecting to legacy CIS database...' },
    { agent: 'researcher', text: 'Source metadata extracted: 450 tables found.' },
    { agent: 'architect', text: 'Analyzing migration path to IBM MDM...' },
    { agent: 'architect', text: 'Optimal mapping: Use ECV Client 360 pattern.' },
    { agent: 'etl_dev', text: 'Initializing Ab Initio GDE 4.2 project...' },
    { agent: 'etl_dev', text: 'Building Reformat & Joiner components...' },
    { agent: 'validator', text: 'Running Suspect Party Identification test...' },
    { agent: 'validator', text: 'Validation passed. Ready for production push.' },
];

const AgentOrchestrator = () => {
    const [activeAgent, setActiveAgent] = useState(0);
    const [logs, setLogs] = useState([]);
    const [isSimulating, setIsSimulating] = useState(true);
    const logContainerRef = useRef(null);

    useEffect(() => {
        if (!isSimulating) return;

        let currentStep = 0;
        const interval = setInterval(() => {
            if (currentStep < LOG_MESSAGES.length) {
                const nextLog = LOG_MESSAGES[currentStep];
                setLogs(prev => [...prev, { ...nextLog, id: Date.now() }]);

                // Switch active agent based on who is talking
                const agentIndex = AGENTS.findIndex(a => a.id === nextLog.agent);
                if (agentIndex !== -1) setActiveAgent(agentIndex);

                currentStep++;
            } else {
                currentStep = 0; // Restart simulation
                setLogs([]);
            }
        }, 2000);

        return () => clearInterval(interval);
    }, [isSimulating]);

    useEffect(() => {
        if (logContainerRef.current) {
            logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
        }
    }, [logs]);

    return (
        <section id="ai-orchestrator" className="orchestrator-section">
            <div className="section-header">
                <p className="section-subtitle">Multi-Agent Workflow Simulation</p>
                <h2 className="section-title title-accent">AI Agent Orchestrator</h2>
            </div>

            <div className="orchestrator-layout glass">
                <div className="agents-grid">
                    {AGENTS.map((agent, index) => {
                        const Icon = agent.icon;
                        const isActive = activeAgent === index;

                        return (
                            <motion.div
                                key={agent.id}
                                className={`agent-card ${isActive ? 'active' : ''}`}
                                animate={{
                                    scale: isActive ? 1.05 : 1,
                                    boxShadow: isActive ? `0 0 20px ${agent.color}44` : 'none'
                                }}
                            >
                                <div className="agent-icon-wrapper" style={{ backgroundColor: `${agent.color}22`, color: agent.color }}>
                                    <Icon size={24} />
                                    {isActive && (
                                        <motion.div
                                            className="pulse-ring"
                                            style={{ borderColor: agent.color }}
                                            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                                            transition={{ repeat: Infinity, duration: 2 }}
                                        />
                                    )}
                                </div>
                                <div className="agent-info">
                                    <h4>{agent.name}</h4>
                                    <p>{agent.description}</p>
                                </div>
                                {isActive && (
                                    <div className="agent-status">
                                        <Zap size={12} className="spinning" /> Processing...
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>

                <div className="terminal-panel">
                    <div className="terminal-header">
                        <div className="dots">
                            <span></span><span></span><span></span>
                        </div>
                        <span className="terminal-title">AGENT CORE LOGS</span>
                        <button className="sim-toggle" onClick={() => setIsSimulating(!isSimulating)}>
                            {isSimulating ? 'Pause' : 'Resume'}
                        </button>
                    </div>
                    <div className="terminal-body" ref={logContainerRef}>
                        <AnimatePresence mode="popLayout">
                            {logs.map((log) => (
                                <motion.div
                                    key={log.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="log-line"
                                >
                                    <span className="log-timestamp">[{new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}]</span>
                                    <span className="log-agent" style={{ color: AGENTS.find(a => a.id === log.agent)?.color }}>
                                        {log.agent.toUpperCase()}:
                                    </span>
                                    <span className="log-text">{log.text}</span>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        {isSimulating && <div className="cursor-blink">_</div>}
                    </div>
                </div>
            </div>

            <div className="orchestrator-footer">
                <p>This simulation illustrates Nidhin's approach to <strong>AI-driven Data Engineering</strong>. Agents collaborate to modernize enterprise data pipelines with automated validation and ETL generation.</p>
            </div>
        </section>
    );
};

export default AgentOrchestrator;
