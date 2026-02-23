import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Play, TerminalSquare, AlertCircle } from 'lucide-react';
import './SqlSandbox.css';

// Mock Database Tables
const MOCK_DB = {
    projects: [
        { id: 1, name: 'AI Career App', tech: 'React, Django, React Native, AWS', role: 'Fullstack AI Engineer' },
        { id: 2, name: 'Enterprise Data Pipeline', tech: 'Ab Initio GDE, UNIX, DB2', role: 'ETL Developer' },
        { id: 3, name: 'Portfolio 3D', tech: 'React, Three.js, Framer Motion', role: 'Frontend Engineer' },
        { id: 4, name: 'RAG Knowledge Base', tech: 'Python, Pinecone, OpenAI', role: 'AI Engineer' }
    ],
    experience: [
        { id: 1, company: 'Leading Financial Firm', role: 'Ab Initio Developer', years: '3.5', focus: 'ETL & Data Migration' },
        { id: 2, company: 'Tech Startup', role: 'Fullstack Engineer', years: '2', focus: 'AI & Web Architecture' },
        { id: 3, company: 'Self-Employed', role: 'Freelance Developer', years: '1.5', focus: 'Python & React Apps' }
    ],
    skills: [
        { id: 1, category: 'ETL', tool: 'Ab Initio', level: 'Expert' },
        { id: 2, category: 'Database', tool: 'SQL (DB2, Oracle)', level: 'Expert' },
        { id: 3, category: 'Backend', tool: 'Java Spring Boot', level: 'Advanced' },
        { id: 4, category: 'Backend', tool: 'Python Django', level: 'Advanced' },
        { id: 5, category: 'AI', tool: 'RAG Architectures', level: 'Advanced' }
    ]
};

const SqlSandbox = () => {
    const [query, setQuery] = useState("SELECT * \nFROM experience \nORDER BY years DESC;");
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);
    const [isExecuting, setIsExecuting] = useState(false);
    const tableContainerRef = useRef(null);

    // Pre-defined queries for quick clicks
    const predefinedQueries = [
        { label: 'All Projects', sql: "SELECT * FROM projects;" },
        { label: 'Python Experience', sql: "SELECT * FROM projects WHERE tech LIKE '%Python%';" },
        { label: 'Top Skills', sql: "SELECT tool, level FROM skills WHERE level = 'Expert';" },
        { label: 'Recent Roles', sql: "SELECT company, role FROM experience;" }
    ];

    // Lightweight SQL Parser (Mock execution)
    const executeQuery = () => {
        setIsExecuting(true);
        setError(null);
        setResults(null);

        setTimeout(() => {
            try {
                const q = query.trim().replace(/\s+/g, ' ').toLowerCase();

                // Basic syntax check
                if (!q.startsWith('select ')) {
                    throw new Error('Syntax syntax: Query must start with SELECT');
                }

                // Extract FROM table
                const fromMatch = q.match(/from\s+([a-z_]+)/);
                if (!fromMatch) {
                    throw new Error('Syntax Error: Missing FROM clause or table name');
                }

                const tableName = fromMatch[1];
                if (!MOCK_DB[tableName]) {
                    throw new Error(`Table Not Found: '${tableName}'. Available tables: projects, experience, skills`);
                }

                let resultData = [...MOCK_DB[tableName]];

                // Extract WHERE (very basic mock logic for demonstration)
                const whereMatch = q.match(/where\s+(.+?)(?:order by|;|$)/);
                if (whereMatch) {
                    const condition = whereMatch[1].trim();
                    // Attempt to mock a basic LIKE or = evaluation
                    if (condition.includes('like')) {
                        // Mock LIKE '%Python%'
                        if (condition.includes('python')) {
                            resultData = resultData.filter(item => JSON.stringify(item).toLowerCase().includes('python'));
                        }
                    } else if (condition.includes("='expert'") || condition.includes("= 'expert'")) {
                        resultData = resultData.filter(item => item.level && item.level.toLowerCase() === 'expert');
                    }
                }

                // Mock Order By
                if (q.includes('order by year') || q.includes('order by years desc')) {
                    resultData.sort((a, b) => parseFloat(b.years || 0) - parseFloat(a.years || 0));
                }

                // Extract Columns (SELECT fields)
                const selectMatch = q.match(/select\s+(.+?)\s+from/);
                if (selectMatch && selectMatch[1] !== '*') {
                    const columns = selectMatch[1].split(',').map(c => c.trim().toLowerCase());
                    resultData = resultData.map(row => {
                        const newRow = {};
                        columns.forEach(col => {
                            // Fallback logic for case sensitivity in mock data keys
                            const realKey = Object.keys(row).find(k => k.toLowerCase() === col) || col;
                            if (row[realKey] !== undefined) newRow[realKey] = row[realKey];
                        });
                        return newRow;
                    });
                }

                setResults(resultData);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsExecuting(false);
            }
        }, 600); // Simulate database latency
    };

    // Run initial query on mount silently
    useEffect(() => {
        executeQuery();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleQuickQuery = (sql) => {
        setQuery(sql);
        // Don't auto-execute, let the user see what is typed, wait 300ms then execute
        setTimeout(() => {
            document.getElementById('run-sql-btn').click();
        }, 50);
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    return (
        <section id="sql-sandbox" className="sql-sandbox-section">
            <motion.div
                className="section-header"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.05 }}
                variants={containerVariants}
            >
                <p className="section-subtitle">Interactive Database</p>
                <h2 className="section-title title-accent">SQL Sandbox</h2>
            </motion.div>

            <motion.div
                className="sql-container glass"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.05 }}
                variants={containerVariants}
            >

                <div className="sql-sidebar">
                    <div className="sql-sidebar-header">
                        <Database size={16} /> Schema Explorer
                    </div>
                    <div className="sql-tables">
                        <div className="schema-table">
                            <span className="table-name">projects</span>
                            <span className="table-cols">(id, name, tech, role)</span>
                        </div>
                        <div className="schema-table">
                            <span className="table-name">experience</span>
                            <span className="table-cols">(id, company, role, years, focus)</span>
                        </div>
                        <div className="schema-table">
                            <span className="table-name">skills</span>
                            <span className="table-cols">(id, category, tool, level)</span>
                        </div>
                    </div>

                    <div className="quick-queries">
                        <h4>Quick Queries</h4>
                        {predefinedQueries.map((pq, idx) => (
                            <button key={idx} className="quick-query-btn hoverable" onClick={() => handleQuickQuery(pq.sql)}>
                                {pq.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="sql-main">
                    <div className="sql-editor-header">
                        <span><TerminalSquare size={16} /> Query Editor</span>
                        <button id="run-sql-btn" className="btn btn-primary btn-small hoverable run-btn" onClick={executeQuery} disabled={isExecuting}>
                            <Play size={14} /> {isExecuting ? 'Executing...' : 'Run Query'}
                        </button>
                    </div>

                    <div className="sql-editor-container">
                        {/* Line numbers mock view */}
                        <div className="sql-line-numbers">
                            {query.split('\n').map((_, i) => <div key={i}>{i + 1}</div>)}
                        </div>
                        <textarea
                            className="sql-textarea"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            spellCheck="false"
                        />
                    </div>

                    <div className="sql-results-window">
                        <div className="sql-results-header">Results</div>
                        <div className="sql-results-content" ref={tableContainerRef}>

                            {isExecuting && (
                                <div className="sql-loading">
                                    <div className="spinner"></div>
                                    <span>Querying database...</span>
                                </div>
                            )}

                            {!isExecuting && error && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="sql-error">
                                    <AlertCircle size={18} /> {error}
                                </motion.div>
                            )}

                            {!isExecuting && results && results.length === 0 && (
                                <div className="sql-empty">0 rows returned.</div>
                            )}

                            {!isExecuting && results && results.length > 0 && (
                                <motion.table
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="sql-table"
                                >
                                    <thead>
                                        <tr>
                                            {Object.keys(results[0]).map((key) => (
                                                <th key={key}>{key}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <AnimatePresence>
                                        <tbody>
                                            {results.map((row, rowIndex) => (
                                                <motion.tr
                                                    key={rowIndex}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: rowIndex * 0.05 }}
                                                >
                                                    {Object.values(row).map((val, colIndex) => (
                                                        <td key={colIndex}>{val}</td>
                                                    ))}
                                                </motion.tr>
                                            ))}
                                        </tbody>
                                    </AnimatePresence>
                                </motion.table>
                            )}
                        </div>
                    </div>
                </div>

            </motion.div>
        </section>
    );
};

export default SqlSandbox;
