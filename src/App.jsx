import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import TechStack from './components/TechStack';
import CoreCompetencies from './components/CoreCompetencies';
import Certifications from './components/Certifications';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Articles from './components/Articles';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import ThreeDBackground from './components/ThreeDBackground';
import Terminal from './components/Terminal';
import AIChatWidget from './components/AIChatWidget';
import SqlSandbox from './components/SqlSandbox';
import DataPipeline from './components/DataPipeline';
import SystemDashboard from './components/SystemDashboard';
import MatrixRain, { useKonamiCode } from './components/MatrixRain';
import MobileNav from './components/MobileNav';
import AgentOrchestrator from './components/AgentOrchestrator';
import NeuralNet from './components/NeuralNet';
import ErrorBoundary from './components/ErrorBoundary';
import InitialLoader from './components/InitialLoader';
import DesktopNav from './components/DesktopNav';

function App() {
  const { isActivated, setIsActivated } = useKonamiCode();
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <InitialLoader key="loader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <CustomCursor />
      <ScrollProgress />
      <ThreeDBackground />

      <div className="portfolio-layout">
        {/* Left Fixed Panel */}
        <aside className="left-panel">
          <Hero />
        </aside>

        {/* Right Scrollable Content */}
        <main className="right-panel">
          <About />
          <Services />
          <TechStack />
          <ErrorBoundary>
            <NeuralNet />
          </ErrorBoundary>
          <SqlSandbox />
          <DataPipeline />
          <ErrorBoundary>
            <AgentOrchestrator />
          </ErrorBoundary>
          <SystemDashboard />
          <CoreCompetencies />
          <Certifications />
          <Experience />
          <Projects />
          <Terminal />
          <Articles />
          <Testimonials />
          <Contact />

          <footer className="footer">
            <p>Copyright &#169; 2024 Nidhin R. All Rights Reserved.</p>
          </footer>
        </main>
      </div>

      {/* Global Floating AI Widget */}
      <AIChatWidget />

      {/* Desktop Right-Side Navigation (hidden on mobile) */}
      <DesktopNav />

      {/* Mobile Bottom Dock (hidden on desktop) */}
      <MobileNav />

      {/* Extreme Tier: The Matrix Konami Code Easter Egg */}
      {isActivated && <MatrixRain onClose={() => setIsActivated(false)} />}
    </>
  );
}

export default App;
