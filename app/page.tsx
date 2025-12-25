'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import HowItWorksSection from './components/HowItWorksSection';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import Chatbox from './components/Chatbox';
import FloatingChatButton from './components/FloatingChatButton';

// Dynamic import for ParticleBackground to avoid SSR issues
const ParticleBackground = dynamic(() => import('./components/ParticleBackground'), {
  ssr: false,
});

// Dynamic import for AIRobotMascot
const AIRobotMascot = dynamic(() => import('./components/AIRobotMascot'), {
  ssr: false,
});

export default function Home() {
  const [isChatboxOpen, setIsChatboxOpen] = useState(false);

  return (
    <main className="relative">
      {/* Noise overlay */}
      <div className="noise-overlay" />
      
      {/* Particle background */}
      <ParticleBackground />
      
      {/* AI Robot Mascot */}
      <AIRobotMascot onChatClick={() => setIsChatboxOpen(true)} />
      
      {/* Floating Chat Button (Mobile) */}
      <FloatingChatButton onClick={() => setIsChatboxOpen(true)} />
      
      {/* Chatbox */}
      <Chatbox isOpen={isChatboxOpen} onClose={() => setIsChatboxOpen(false)} />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Sections */}
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
