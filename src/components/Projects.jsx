import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ExternalLink, Github, Star, GitFork, Loader2 } from 'lucide-react';
import './Projects.css';

// 3D Tilt Card Component
const ProjectCard = ({ project }) => {
    const [imageError, setImageError] = useState(false);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        // Normalized values between -0.5 and 0.5
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        x.set(mouseX / width - 0.5);
        y.set(mouseY / height - 0.5);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    // Generate a dynamic gradient background based on the repository name length
    const colors = [
        "linear-gradient(135deg, #0ea5e9, #3b82f6)",
        "linear-gradient(135deg, #8b5cf6, #d946ef)",
        "linear-gradient(135deg, #10b981, #14b8a6)",
        "linear-gradient(135deg, #f59e0b, #ef4444)"
    ];
    const colorIndex = project.name.length % colors.length;

    return (
        <motion.div
            className="project-card-wrapper hoverable"
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
            <div className="project-card-inner glass" style={{ transform: "translateZ(50px)" }}>

                {/* Image wrapper with fallback to gradient if custom image isn't found */}
                <div className="project-img-wrapper" style={{ background: imageError ? colors[colorIndex] : 'transparent' }}>
                    {!imageError ? (
                        <img
                            src={`/assets/projects/${project.name}.png`}
                            alt={project.name}
                            className="project-img"
                            onError={() => setImageError(true)}
                        />
                    ) : (
                        <div className="project-fallback-bg">
                            <h3 className="project-fallback-title">{project.name}</h3>
                        </div>
                    )}

                    <div className="project-overlay">
                        <div className="overlay-content">
                            <a href={project.html_url} target="_blank" rel="noreferrer" className="overlay-btn icon-btn" title="View Code">
                                <Github size={24} />
                            </a>
                            {project.homepage && (
                                <a href={project.homepage} target="_blank" rel="noreferrer" className="overlay-btn text-btn">
                                    Live Demo <ExternalLink size={18} />
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                <div className="project-info">
                    <h3 className="project-title">{project.name.replace(/-/g, ' ')}</h3>

                    <div className="project-badges">
                        {project.language && (
                            <span className="project-badge status-live">{project.language}</span>
                        )}
                        <span className="project-stat"><Star size={14} /> {project.stargazers_count}</span>
                        <span className="project-stat"><GitFork size={14} /> {project.forks_count}</span>
                    </div>

                    <p className="project-desc">
                        {project.description ? project.description : "A repository showcasing code solutions and architectural implementations via GitHub."}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

const Projects = () => {
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                setLoading(true);
                // Fetching live repositories from Nidhin's Github Account
                const response = await fetch('https://api.github.com/users/nidhinR1998/repos?sort=updated&per_page=6');
                if (!response.ok) {
                    throw new Error('Failed to fetch from GitHub');
                }
                const data = await response.json();

                // Filter out forks so we only show original work
                const originalRepos = data.filter(repo => !repo.fork);
                setRepos(originalRepos);
            } catch (err) {
                console.error(err);
                setError("Unable to load latest projects from GitHub. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchRepos();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 }
        }
    };

    return (
        <section id="projects" className="projects-section">
            <motion.div
                className="section-header"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.05 }}
                variants={containerVariants}
            >
                <p className="section-subtitle">Browse My Latest</p>
                <h2 className="section-title title-accent">GitHub Projects</h2>
            </motion.div>

            {loading ? (
                <div className="projects-loading">
                    <Loader2 className="spinner" size={40} />
                    <p>Fetching repositories from GitHub...</p>
                </div>
            ) : error ? (
                <div className="projects-error">
                    <p>{error}</p>
                </div>
            ) : (
                <motion.div
                    className="projects-grid"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.05 }}
                    variants={containerVariants}
                >
                    {repos.map((project, index) => (
                        <motion.div key={project.id || index} variants={{
                            hidden: { opacity: 0, y: 50 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                        }}>
                            <ProjectCard project={project} />
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </section>
    );
};

export default Projects;
