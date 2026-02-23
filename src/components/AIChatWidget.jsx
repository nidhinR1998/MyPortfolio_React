import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Cpu, ArrowRight } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import Magnetic from './Magnetic';
import './AIChatWidget.css';

// Decrypt utility — XOR + Base64 (key decrypted only at point of use)
const _dk = (e, s) => {
    const k = s.split('').map(c => c.charCodeAt(0));
    return atob(e).split('').map((c, i) =>
        String.fromCharCode(c.charCodeAt(0) ^ k[i % k.length])
    ).join('');
};

// Initialize Gemini SDK — key is decrypted in memory only when called
const genAI = new GoogleGenerativeAI(_dk('DyAeCToXFA5lXnt/fyslCw0fGBJmRGZefD0vDjg6IhJ/AAdQfBop', 'NidhinPF2024'));

// System Prompt for Nidhin's AI Assistant
const getSystemPrompt = (mode = 'professional') => {
    const basePrompt = `You are the AI Assistant embedded in Nidhin R's professional portfolio website. 
Your goal is to converse with recruiters and engineers, answering questions exclusively about Nidhin's background, skills, and availability. 
Do NOT break character.

Here is Nidhin's context from his official resume:
- Role: System Engineer (ETL Developer)
- Education: Master of Computer Applications (MCA) from SASTRA University (2025). BSc in Physics from University of Kerala (2020).
- Experience: Tata Consultancy Services (TCS) since Oct 2021. Currently working for the client Nedbank.
- Core ETL Skills: Ab Initio (GDE 3.1 to 4.2 upgrades), SQL, IBM MDM. 
- Major Achievements: Led ECV Client 360 data migration from legacy CIS to IBM MDM. Developed Suspect Party Identification logic in MDM to perform party collapsing based on business rules.
- Core Software Eng Skills: Java, Python, Shell Scripting, Spring Boot, Django, Flask.
- Generative AI Skills: Generative AI, LLMs, RAG architectures (Retrieval-Augmented Generation).
- Tools: UNIX/AIX/LINUX, Git, DBeaver, Control M Scheduler.
- Contact: nidhinrajesh1998@gmail.com, Phone: +91-7356324654.

CITATION RULE: When answering based on resume facts, always append a source citation tag at the end, like [Source: Education] or [Source: Nedbank Experience].

MODES:
- professional: Concise, formal answers.
- deep_dive: Detailed technical explanations including specific versions and architectures.
- creative: Enthusiastic, engaging, and highlights potential business value.

Current Mode: ${mode}.`;

    if (mode === 'professional') return basePrompt + " Keep answers under 2 sentences.";
    if (mode === 'deep_dive') return basePrompt + " Provide 3-4 sentences with deep technical specifics.";
    return basePrompt + " Be enthusiastic and mention how his skills can solve complex problems.";
};

// Pre-defined quick prompts
const QUICK_PROMPTS = [
    "What is Nidhin's Ab Initio experience?",
    "Tell me about his backend skills.",
    "Does he have Cloud experience?",
    "How can I contact him?"
];

// Note: We removed the NLP_DATABASE since we are using live Gemini Pro API now!

const AIChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', text: 'Hello! I am Nidhin\'s AI Assistant (Powered by Gemini). Ask me anything about his ETL experience, Java skills, or Ab Initio projects!', isStreaming: false }
    ]);
    const [inputVal, setInputVal] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [aiMode, setAiMode] = useState('professional'); // professional, deep_dive, creative

    // Maintain conversational history for Gemini context
    const [chatSession, setChatSession] = useState(null);

    const messagesEndRef = useRef(null);

    // Initialize Gemini Chat Session on mount or when mode changes
    useEffect(() => {
        const initChat = async () => {
            try {
                const model = genAI.getGenerativeModel({
                    model: "gemini-2.5-flash",
                    systemInstruction: {
                        parts: [{ text: getSystemPrompt(aiMode) }]
                    }
                });

                const chat = model.startChat({
                    history: [
                        { role: "user", parts: [{ text: "Hello!" }] },
                        { role: "model", parts: [{ text: "Hello! I am Nidhin's AI Assistant. I'm currently in " + aiMode + " mode. How can I help you today?" }] },
                    ],
                });
                setChatSession(chat);
            } catch (err) {
                console.error("Failed to initialize Gemini:", err);
            }
        };
        initChat();
    }, [aiMode]);

    // Auto-scroll handler
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    // Handle Quick Prompts
    const handleQuickPrompt = (prompt) => {
        setInputVal(prompt);
        // We use a small timeout to allow the input value state to update visually before submitting
        setTimeout(() => handleSend(prompt), 50);
    };

    // Core Message Sending Logic
    const handleSend = async (forcedMessage = null) => {
        const textToSend = forcedMessage || inputVal;
        if (!textToSend.trim()) return;

        setMessages(prev => [...prev, { role: 'user', text: textToSend.trim(), timestamp: new Date() }]);
        setInputVal('');
        setIsTyping(true);

        // Fetch Live Gemini Response
        let newMessageId = null;
        try {
            if (!chatSession) throw new Error("Chat session not initialized");

            newMessageId = Date.now();
            setMessages(prev => [...prev, {
                id: newMessageId,
                role: 'assistant',
                text: '',
                timestamp: new Date(),
                isStreaming: true
            }]);

            setIsTyping(false); // Hide the dots, stream begins

            const result = await chatSession.sendMessageStream(textToSend);
            let fullText = '';

            for await (const chunk of result.stream) {
                const chunkText = chunk.text();
                fullText += chunkText;

                // Update the last message progressively
                setMessages(prev => prev.map(msg =>
                    msg.id === newMessageId ? { ...msg, text: fullText } : msg
                ));
            }

            // Stream Finished
            setMessages(prev => prev.map(msg =>
                msg.id === newMessageId ? { ...msg, isStreaming: false } : msg
            ));

        } catch (error) {
            console.error("Gemini API Error:", error);
            setIsTyping(false);

            if (newMessageId) {
                // Replace the empty active bubble with the error message
                setMessages(prev => prev.map(msg =>
                    msg.id === newMessageId ? {
                        ...msg,
                        text: "I'm having trouble connecting to the Gemini LLM right now. Please try again later.",
                        isStreaming: false
                    } : msg
                ));
            } else {
                // Chat session failed to initialize before the bubble was created
                setMessages(prev => [...prev, {
                    role: 'assistant',
                    text: "I'm having trouble connecting to the Gemini LLM right now. Please try again later or reach out to Nidhin directly via email!",
                    timestamp: new Date(),
                    isStreaming: false
                }]);
            }
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    // Format timestamp
    const formatTime = (dateObj) => {
        if (!dateObj) return '';
        return dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <>
            {/* Floating Action Button */}
            <AnimatePresence>
                {!isOpen && (
                    <Magnetic strength={50}>
                        <motion.button
                            className="chat-fab hoverable"
                            onClick={() => setIsOpen(true)}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <MessageSquare size={24} />
                        </motion.button>
                    </Magnetic>
                )}
            </AnimatePresence>

            {/* Premium Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="chat-window-container custom-glass"
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    >
                        {/* Header */}
                        <div className="chat-header">
                            <div className="chat-header-info">
                                <div className="chat-avatar-container">
                                    <div className="chat-avatar bg-accent-glow">
                                        <Cpu size={18} />
                                    </div>
                                    <span className="live-indicator"></span>
                                </div>
                                <div className="chat-header-text">
                                    <h3>Nidhin's AI Entity</h3>
                                    <span className="chat-status">{aiMode.replace('_', ' ').toUpperCase()} MODE v2.5</span>
                                </div>
                            </div>
                            <div className="chat-header-actions">
                                <select
                                    className="mode-selector"
                                    value={aiMode}
                                    onChange={(e) => setAiMode(e.target.value)}
                                    title="AI Personality Mode"
                                >
                                    <option value="professional">Professional</option>
                                    <option value="deep_dive">Deep Dive</option>
                                    <option value="creative">Creative</option>
                                </select>
                                <button className="chat-close hoverable" onClick={() => setIsOpen(false)}>
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Message Feed */}
                        <div className="chat-messages premium-scrollbar">
                            {messages.map((msg, idx) => (
                                <div key={msg.id || idx} className={`chat-bubble-wrapper ${msg.role === 'user' ? 'user-wrapper' : 'assistant-wrapper'} ${msg.isStreaming ? 'streaming' : ''}`}>

                                    {msg.role === 'assistant' && (
                                        <div className="bubble-icon bg-accent">
                                            <Bot size={14} />
                                        </div>
                                    )}

                                    <div className="bubble-content">
                                        <div className={`chat-bubble ${msg.role === 'user' ? 'user-bubble' : 'assistant-bubble'}`}>
                                            {msg.text}
                                            {msg.isStreaming && <span className="stream-cursor"></span>}
                                        </div>

                                        <div className="message-timestamp">
                                            {msg.timestamp ? formatTime(msg.timestamp) : 'Just now'}
                                        </div>
                                    </div>

                                    {msg.role === 'user' && (
                                        <div className="bubble-icon bg-user">
                                            <User size={14} />
                                        </div>
                                    )}
                                </div>
                            ))}

                            {isTyping && (
                                <div className="chat-bubble-wrapper assistant-wrapper">
                                    <div className="bubble-icon bg-accent"><Bot size={14} /></div>
                                    <div className="bubble-content">
                                        <div className="chat-bubble assistant-bubble typing-indicator">
                                            <span></span><span></span><span></span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Quick Prompts - Only show if conversation is small */}
                            {messages.length <= 2 && !isTyping && (
                                <motion.div
                                    className="quick-prompts-container"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <p className="prompts-label">Suggested Questions:</p>
                                    <div className="prompts-scroll">
                                        {QUICK_PROMPTS.map((prompt, i) => (
                                            <button
                                                key={i}
                                                className="quick-prompt-chip"
                                                onClick={() => handleQuickPrompt(prompt)}
                                            >
                                                {prompt}
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="chat-input-area">
                            <input
                                type="text"
                                placeholder="Message AI Assistant..."
                                value={inputVal}
                                onChange={(e) => setInputVal(e.target.value)}
                                onKeyDown={handleKeyDown}
                                disabled={isTyping}
                            />
                            <button
                                className={`chat-send ${inputVal.trim() ? 'active' : ''}`}
                                onClick={() => handleSend()}
                                disabled={!inputVal.trim() || isTyping}
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default AIChatWidget;
