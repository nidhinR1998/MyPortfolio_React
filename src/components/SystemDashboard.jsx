import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Cpu, HardDrive, Wifi, Server, Zap } from 'lucide-react';
import './SystemDashboard.css';

const SystemDashboard = () => {
    const [metrics, setMetrics] = useState({
        cpu: 34,
        ram: 2.1,
        latency: 18,
        activeConnections: 124,
        uptime: '99.98%'
    });

    const [cpuHistory, setCpuHistory] = useState(Array(20).fill(34));

    // Simulate Live Telemetry Data
    useEffect(() => {
        const interval = setInterval(() => {
            setMetrics(prev => {
                // Generate slight fluctuations
                const baseCpu = 35;
                const cpuVary = Math.floor(Math.random() * 20) - 10;
                let newCpu = baseCpu + cpuVary;

                // Random usage spikes
                if (Math.random() > 0.8) newCpu += Math.floor(Math.random() * 40);
                newCpu = Math.min(100, Math.max(0, newCpu));

                const newRam = (2.0 + Math.random() * 0.4).toFixed(1);
                const newLatency = 15 + Math.floor(Math.random() * 15);
                const newConnections = prev.activeConnections + Math.floor(Math.random() * 5) - 2;

                setCpuHistory(prevHist => {
                    const nextHist = [...prevHist.slice(1), newCpu];
                    return nextHist;
                });

                return {
                    cpu: newCpu,
                    ram: parseFloat(newRam),
                    latency: newLatency,
                    activeConnections: newConnections,
                    uptime: prev.uptime
                };
            });
        }, 1500); // Update every 1.5 seconds

        return () => clearInterval(interval);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <section id="telemetry" className="telemetry-section">
            <motion.div
                className="section-header"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.05 }}
                variants={containerVariants}
            >
                <p className="section-subtitle">DevOps & Infrastructure</p>
                <h2 className="section-title title-accent">System Telemetry</h2>
            </motion.div>

            <motion.div
                className="dashboard-container glass"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.05 }}
                variants={containerVariants}
            >
                <div className="dashboard-header">
                    <div className="dash-title">
                        <Activity size={18} className="text-accent pulse-icon" />
                        <span>Production Environment (LIVE)</span>
                    </div>
                    <div className="dash-status">
                        <div className="status-dot-live"></div>
                        System Healthy
                    </div>
                </div>

                <div className="metrics-grid">
                    {/* CPU Load Card */}
                    <div className="metric-card">
                        <div className="metric-header">
                            <Cpu size={16} /> Server CPU
                        </div>
                        <div className="metric-value">
                            <span className={metrics.cpu > 80 ? 'text-danger' : 'text-accent'}>
                                {metrics.cpu}%
                            </span>
                        </div>

                        {/* Micro Bar Chart */}
                        <div className="micro-chart">
                            {cpuHistory.map((val, idx) => (
                                <div
                                    key={idx}
                                    className="chart-bar"
                                    style={{
                                        height: `${val}%`,
                                        backgroundColor: val > 80 ? '#ef4444' : '#38bdf8'
                                    }}
                                ></div>
                            ))}
                        </div>
                    </div>

                    {/* Memory Usage Card */}
                    <div className="metric-card">
                        <div className="metric-header">
                            <HardDrive size={16} /> Memory (RAM)
                        </div>
                        <div className="metric-value">
                            <span>{metrics.ram} GB</span>
                            <span className="metric-subtext">/ 8.0 GB</span>
                        </div>
                        <div className="progress-bg">
                            <div
                                className="progress-fill"
                                style={{ width: `${(metrics.ram / 8.0) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Network Latency */}
                    <div className="metric-card">
                        <div className="metric-header">
                            <Wifi size={16} /> Api Latency
                        </div>
                        <div className="metric-value">
                            <span>{metrics.latency} ms</span>
                        </div>
                        <div className="metric-trend pulse-gentle">
                            <Activity size={14} /> Normal routing
                        </div>
                    </div>

                    {/* Active Connections */}
                    <div className="metric-card">
                        <div className="metric-header">
                            <Server size={16} /> WebSockets
                        </div>
                        <div className="metric-value">
                            <span>{metrics.activeConnections}</span>
                        </div>
                        <div className="metric-trend">
                            <Zap size={14} className="text-warning" /> Auto-scaling stable
                        </div>
                    </div>
                </div>

                <div className="dashboard-footer">
                    <div className="uptime">Node Uptime: {metrics.uptime}</div>
                    <div className="region">Region: us-east-1 (N. Virginia)</div>
                </div>
            </motion.div>
        </section>
    );
};

export default SystemDashboard;
