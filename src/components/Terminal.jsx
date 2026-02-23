import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Terminal as TerminalIcon, Maximize2, X, Minus } from 'lucide-react';
import './Terminal.css';

const Terminal = () => {
    const [inputLines, setInputLines] = useState([
        { type: 'system', text: 'NidhinOS v4.2.1 initialized.' },
        { type: 'system', text: 'Type "help" to see available commands.' },
        { type: 'prompt', text: '' }
    ]);
    const [currentInput, setCurrentInput] = useState('');
    const currentInputRef = useRef(null);
    const terminalBodyRef = useRef(null);

    // Auto-scroll to bottom of terminal locally
    useEffect(() => {
        if (terminalBodyRef.current) {
            terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
        }
    }, [inputLines]);

    const handleCommand = (cmd) => {
        const trimmedCmd = cmd.trim().toLowerCase();
        let responseLines = [];

        switch (trimmedCmd) {
            case 'help':
                responseLines = [
                    { type: 'output', text: 'Available commands:' },
                    { type: 'output', text: '  whoami    - Display bio information' },
                    { type: 'output', text: '  ls skills - List core competencies' },
                    { type: 'output', text: '  pwd       - Print working directory' },
                    { type: 'output', text: '  clear     - Clear terminal history' },
                    { type: 'output', text: '  sudo      - Execute command as superuser' }
                ];
                break;
            case 'whoami':
                responseLines = [
                    { type: 'output', text: 'user: nidhin_r' },
                    { type: 'output', text: 'role: ETL Developer & AI Specialist' },
                    { type: 'output', text: 'location: Code & Data' }
                ];
                break;
            case 'ls skills':
                responseLines = [
                    { type: 'output', text: 'drwxr-xr-x 2 nidhin admin 4096 Feb 23 10:00 etl_database/' },
                    { type: 'output', text: '  - Ab_Initio_GDE.sh' },
                    { type: 'output', text: '  - SQL.db' },
                    { type: 'output', text: 'drwxr-xr-x 2 nidhin admin 4096 Feb 23 10:00 programming/' },
                    { type: 'output', text: '  - java.jar' },
                    { type: 'output', text: '  - python.py' },
                    { type: 'output', text: 'drwxr-xr-x 2 nidhin admin 4096 Feb 23 10:00 ai_models/' },
                    { type: 'output', text: '  - RAG_Engine.bin' }
                ];
                break;
            case 'pwd':
                responseLines = [
                    { type: 'output', text: '/home/nidhin_r/portfolios/live_workspace' }
                ];
                break;
            case 'clear':
                setInputLines([{ type: 'prompt', text: '' }]);
                return;
            case 'sudo':
                responseLines = [
                    { type: 'output', text: 'nidhin_r is not in the sudoers file. This incident will be reported.' },
                    { type: 'output', text: '...just kidding. But seriously, no sudo for you.' }
                ];
                break;
            case '':
                break;
            default:
                responseLines = [
                    { type: 'output', text: `bash: ${trimmedCmd}: command not found` },
                    { type: 'output', text: 'Type "help" for a list of valid commands.' }
                ];
        }

        // Update history
        setInputLines(prev => {
            const history = [...prev];
            // Update the previous prompt line with the entered command
            history[history.length - 1] = { type: 'input', text: `nidhin@server:~$ ${cmd}` };
            // Add response lines
            history.push(...responseLines);
            // Add new prompt
            history.push({ type: 'prompt', text: '' });
            return history;
        });
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleCommand(currentInput);
            setCurrentInput('');
        }
    };

    const focusTerminal = () => {
        currentInputRef.current?.focus();
    };

    return (
        <section id="terminal" className="terminal-section">
            <motion.div
                className="section-header"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <p className="section-subtitle">Developer Console</p>
                <h2 className="section-title title-accent">UNIX Environment</h2>
            </motion.div>

            <motion.div
                className="terminal-window glass"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                onClick={focusTerminal}
            >
                {/* Fake Window Header */}
                <div className="terminal-header">
                    <div className="window-controls">
                        <span className="control close"><X size={12} /></span>
                        <span className="control minimize"><Minus size={12} /></span>
                        <span className="control maximize"><Maximize2 size={10} /></span>
                    </div>
                    <div className="terminal-title">
                        <TerminalIcon size={14} /> nidhin@server:~
                    </div>
                </div>

                {/* Terminal Body */}
                <div className="terminal-body" ref={terminalBodyRef}>
                    {inputLines.map((line, index) => {
                        if (line.type === 'system') {
                            return <div key={index} className="term-line system-text">{line.text}</div>;
                        }
                        if (line.type === 'output') {
                            return <div key={index} className="term-line output-text">{line.text}</div>;
                        }
                        if (line.type === 'input') {
                            return <div key={index} className="term-line input-text">{line.text}</div>;
                        }
                        if (line.type === 'prompt') {
                            return (
                                <div key={index} className="term-line prompt-line">
                                    <span className="prompt-prefix">nidhin@server:~$</span>
                                    <input
                                        ref={currentInputRef}
                                        type="text"
                                        className="term-input"
                                        value={currentInput}
                                        onChange={(e) => setCurrentInput(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        spellCheck="false"
                                        autoComplete="off"
                                    />
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
            </motion.div>
        </section>
    );
};

export default Terminal;
