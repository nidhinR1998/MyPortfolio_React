import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X, Clock, CalendarDays } from 'lucide-react';
import './Articles.css';

const Articles = () => {
    const [selectedArticle, setSelectedArticle] = useState(null);

    // Prevent background scrolling when modal is open
    useEffect(() => {
        if (selectedArticle) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [selectedArticle]);

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 }
        }
    };

    const articleVariants = {
        hidden: { opacity: 0, x: -30 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
    };

    const articles = [
        {
            title: "Accelerating Enterprise Data Pipelines with Ab Initio GDE",
            category: "Data Engineering",
            date: "Feb 10, 2026",
            readTime: "8 min read",
            image: "/assets/articles/abinitio.png",
            content: (
                <>
                    <p>In modern enterprise architectures, the volume and velocity of data ingestion present a massive bottleneck. Legacy ETL tools often struggle to process petabytes of transactional data while maintaining strict SLAs. This is where <strong>Ab Initio's Graphical Development Environment (GDE)</strong> fundamentally shifts the paradigm.</p>

                    <h3>The Power of Parallel Processing</h3>
                    <p>Unlike traditional serial processing, Ab Initio utilizes a shared-nothing parallel architecture. By partitioning massive datasets across multiple nodes, we can achieve true linear scalability. In my recent migration projects, simply leveraging multi-file systems (MFS) reduced batch processing windows by over 60%.</p>

                    <h3>Phase-based Execution</h3>
                    <p>One of the most critical aspects of robust pipeline design is phase management. By orchestrating complex logic into distinct phases, you ensure that checkpoints are established naturally. If an unexpected failure occurs in Phase 3 of a 50-component graph, the recovery process is localized—saving hours of reprocessing time.</p>

                    <h3>Conclusion</h3>
                    <p>Transitioning to Ab Initio requires a highly specialized mindset regarding memory allocation and data partitioning. However, for organizations handling colossal volumes of continuous data, it remains the absolute gold standard in ETL architecture.</p>
                </>
            )
        },
        {
            title: "Building Reliable RAG Architectures with Large Language Models",
            category: "Artificial Intelligence",
            date: "Jan 22, 2026",
            readTime: "12 min read",
            image: "/assets/articles/rag_llm.png",
            content: (
                <>
                    <p>As Generative AI shifts from experimentation to enterprise production, the hallucination problem inherent in Large Language Models (LLMs) becomes a critical liability. <strong>Retrieval-Augmented Generation (RAG)</strong> has emerged as the definitive solution, grounding AI responses in verifiable, proprietary corporate data.</p>

                    <h3>Beyond Naive Chunking</h3>
                    <p>Many early RAG implementations fail because they rely on basic, fixed-size text chunking. When converting dense PDFs or internal documentation into vector embeddings, context is everything. Implementing semantic chunking—where paragraphs are split based on linguistic boundaries rather than character counts—drastically improves retrieval accuracy.</p>

                    <h3>Vector Search Orchestration</h3>
                    <p>In my recent Python/Flask integrations, utilizing advanced Vector Databases with HNSW (Hierarchical Navigable Small World) algorithms proved essential. Once the query is embedded, the nearest-neighbor search MUST be fast and accurate. Combining sparse retrieval (like BM25) with dense vector retrieval yields a hybrid search that catches both keyword exact-matches and semantic intent.</p>

                    <h3>The Future</h3>
                    <p>As models continue to advance, the true differentiator for AI applications will not be the model itself, but the sophistication of the data pipelines feeding it. High-quality ETL directly enables high-quality AI.</p>
                </>
            )
        },
        {
            title: "Modernizing Legacy Backend Systems: Java & Python Synergy",
            category: "Backend Architecture",
            date: "Nov 05, 2025",
            readTime: "10 min read",
            image: "/assets/articles/java_python.png",
            content: (
                <>
                    <p>For decades, monolithic Java applications have been the backbone of financial and enterprise systems. However, as organizations pivot towards agile data science and AI, Python has become heavily adopted. The modern challenge is orchestrating these two powerful languages into a cohesive, high-performance architecture.</p>

                    <h3>Spring Boot as the Orchestrator</h3>
                    <p>In a modern microservices environment, Java (specifically Spring Boot) excels at acting as the heavy-duty trafficController. It handles authentication, massive concurrent connection pooling, and complex transactional logic with unmatched stability. I typically architect the core "source of truth" APIs entirely in Java.</p>

                    <h3>Python for the Analytical Edge</h3>
                    <p>Conversely, Python (via Django or Flask) is deployed as specialized, stateless microservices dedicated purely to data transformation, machine learning inference, and NLP processing. When a Spring Boot API receives a request requiring AI analysis, it asynchronously queues the task to a Python worker.</p>

                    <h3>Conclusion</h3>
                    <p>By defining strict gRPC or AMQP communication protocols between Java core systems and Python analytical nodes, organizations get the best of both worlds: rock-solid enterprise stability married with cutting-edge analytical agility.</p>
                </>
            )
        }
    ];

    return (
        <section id="articles" className="articles-section">
            <motion.div
                className="section-header"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.05 }}
                variants={containerVariants}
            >
                <p className="section-subtitle">Latest Thoughts</p>
                <h2 className="section-title title-accent">Insights & Articles</h2>
            </motion.div>

            <motion.div
                className="articles-list"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.05 }}
                variants={containerVariants}
            >
                {articles.map((article, index) => (
                    <motion.div
                        key={index}
                        className="article-row glass hoverable"
                        variants={articleVariants}
                        onClick={() => setSelectedArticle(article)}
                    >
                        <div className="article-img-box">
                            <img src={article.image} alt={article.title} className="article-thumbnail" />
                        </div>

                        <div className="article-content">
                            <div className="article-meta">
                                <span className="article-category">{article.category}</span>
                                <span className="article-dot">•</span>
                                <span className="article-date">{article.date}</span>
                                <span className="article-dot">•</span>
                                <span className="article-read">{article.readTime}</span>
                            </div>
                            <h3 className="article-title">{article.title}</h3>
                        </div>

                        <div className="article-action">
                            <ArrowUpRight size={28} className="article-arrow" />
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Interactive Article Reading Modal */}
            <AnimatePresence>
                {selectedArticle && (
                    <motion.div
                        className="article-modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedArticle(null)}
                    >
                        <motion.div
                            className="article-modal-content glass"
                            initial={{ y: 100, opacity: 0, scale: 0.95 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: 50, opacity: 0, scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="modal-close-btn hoverable"
                                onClick={() => setSelectedArticle(null)}
                            >
                                <X size={24} />
                            </button>

                            <div className="modal-hero">
                                <img src={selectedArticle.image} alt={selectedArticle.title} className="modal-hero-img" />
                                <div className="modal-hero-gradient"></div>
                            </div>

                            <div className="modal-article-body">
                                <div className="modal-meta">
                                    <span className="modal-category">{selectedArticle.category}</span>
                                    <div className="modal-meta-right">
                                        <span className="modal-info"><CalendarDays size={16} /> {selectedArticle.date}</span>
                                        <span className="modal-info"><Clock size={16} /> {selectedArticle.readTime}</span>
                                    </div>
                                </div>

                                <h2 className="modal-title">{selectedArticle.title}</h2>
                                <div className="modal-divider"></div>

                                <div className="modal-text-content">
                                    {selectedArticle.content}
                                </div>
                            </div>

                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Articles;
