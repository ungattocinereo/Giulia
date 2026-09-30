import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import MyApproach from './components/MyApproach';
import ComprehensiveApproach from './components/ComprehensiveApproach';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PrivacyPolicy from './components/PrivacyPolicy';
import { Close } from './components/ui/icons';

export default function App() {
  const [activeModal, setActiveModal] = useState(null);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-50 font-sans text-neutral-800 selection:bg-primary/20 selection:text-primary-dark">
      <Header />

      <main id="main-content" tabIndex={-1}>
        <Hero />
        <About onOpenModal={setActiveModal} />
        <MyApproach />
        <Pricing onOpenModal={setActiveModal} />
        <ComprehensiveApproach />
        <FAQ />
        <Contact onOpenPrivacyPolicy={() => setShowPrivacyPolicy(true)} />
      </main>

      <Footer onOpenPrivacyPolicy={() => setShowPrivacyPolicy(true)} />

      {/* Modals would go here - keeping it simple for now as per plan */}
      {activeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setActiveModal(null)}
          ></div>
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full relative z-10 shadow-2xl animate-fade-in">
            <h3 className="text-2xl font-bold mb-4">Подробная информация</h3>
            <p className="text-gray-600 mb-6">
              Здесь будет дополнительная информация по выбранному разделу.
              В данный момент этот функционал находится в разработке.
            </p>
            <button
              onClick={() => setActiveModal(null)}
              className="btn-primary w-full"
            >
              Закрыть <Close size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Privacy Policy Modal */}
      {showPrivacyPolicy && (
        <PrivacyPolicy onClose={() => setShowPrivacyPolicy(false)} />
      )}
    </div>
  );
}
