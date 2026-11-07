import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Credentials from './components/Credentials';
import MyApproach from './components/MyApproach';
import ComprehensiveApproach from './components/ComprehensiveApproach';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PrivacyPolicy from './components/PrivacyPolicy';

export default function App() {
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-50 font-sans text-neutral-800 selection:bg-primary/20 selection:text-primary-dark">
      <Header />

      <main id="main-content" tabIndex={-1}>
        <Hero />
        <About />
        <Credentials />
        <MyApproach />
        <ComprehensiveApproach onOpenPrivacyPolicy={() => setShowPrivacyPolicy(true)} />
        <Pricing />
        <FAQ />
        <Contact onOpenPrivacyPolicy={() => setShowPrivacyPolicy(true)} />
      </main>

      <Footer onOpenPrivacyPolicy={() => setShowPrivacyPolicy(true)} />

      {/* Privacy Policy Modal */}
      {showPrivacyPolicy && (
        <PrivacyPolicy onClose={() => setShowPrivacyPolicy(false)} />
      )}
    </div>
  );
}
