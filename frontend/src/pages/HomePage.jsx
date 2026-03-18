import React from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import ApproachSection from '@/components/ApproachSection';
import ProtectionSection from '@/components/ProtectionSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <ApproachSection />
      <ProtectionSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default HomePage;
