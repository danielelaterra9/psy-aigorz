import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const HeroSection = () => {
  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      className="hero-section pt-20"
      data-testid="hero-section"
    >
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-80px)] py-12 lg:py-0">
          {/* Text Content */}
          <div className="order-2 lg:order-1 animate-fade-in-up">
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-[#2D3339] font-medium leading-tight mb-2">
              Sophie Aigroz
            </h1>
            <p className="text-[#D4A59A] text-xl sm:text-2xl font-heading font-medium tracking-wide mb-2">
              Psychologue FSP
            </p>
            <p className="text-[#5C6269] text-sm tracking-widest uppercase mb-6">
              Saxon, Valais
            </p>
            <p className="text-lg sm:text-xl text-[#5C6269] leading-relaxed mb-8 max-w-xl">
              Un espace d'écoute confidentiel et respectueux pour vous accompagner 
              dans les différentes étapes de vie, situations de crise ou difficultés relationnelles.
            </p>
            
            {/* Quick Info */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 text-[#5C6269]">
                <MapPin size={18} className="text-[#D4A59A] flex-shrink-0" />
                <span className="text-sm">1907 Saxon, Valais</span>
              </div>
              <div className="flex items-center gap-3 text-[#5C6269]">
                <Phone size={18} className="text-[#D4A59A] flex-shrink-0" />
                <span className="text-sm">079 285 62 09</span>
              </div>
              <div className="flex items-center gap-3 text-[#5C6269]">
                <Clock size={18} className="text-[#D4A59A] flex-shrink-0" />
                <span className="text-sm">Lun & Mer: 8h00-18h00</span>
              </div>
              <div className="flex items-center gap-3 text-[#5C6269]">
                <Mail size={18} className="text-[#D4A59A] flex-shrink-0" />
                <span className="text-sm">sophie.aigroz@gmail.com</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={scrollToContact}
                className="btn-primary px-8 py-3.5 rounded-full text-base font-medium"
                data-testid="hero-cta-button"
              >
                Prendre contact
              </button>
              <a
                href="tel:0792856209"
                className="px-8 py-3.5 rounded-full text-base font-medium border border-[#E5E5E0] text-[#2D3339] hover:border-[#D4A59A] hover:text-[#D4A59A] transition-all duration-300"
                data-testid="hero-phone-button"
              >
                Appeler
              </a>
            </div>

            {/* Additional info */}
            <div className="mt-8 flex flex-wrap gap-6 text-sm text-[#5C6269]">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D4A59A]"></span>
                Uniquement sur rendez-vous
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D4A59A]"></span>
                Consultations en ligne possibles
              </span>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 animate-fade-in animation-delay-200">
            <div className="relative max-w-[420px] sm:max-w-[450px] lg:max-w-[480px] mx-auto overflow-hidden rounded-2xl shadow-xl">
              <img
                src="https://customer-assets.emergentagent.com/job_aigroz-psy/artifacts/hlr8pp0b_IMG-20260325-WA0024.jpg"
                alt="Sophie Aigroz - Psychologue FSP"
                className="w-full h-auto aspect-[4/5] object-cover"
                style={{ objectPosition: '35% 55%' }}
                data-testid="hero-portrait"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
