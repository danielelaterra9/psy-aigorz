import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#services', label: 'Services' },
    { href: '#approche', label: 'Approche' },
    { href: '#contact', label: 'Contact' },
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
      data-testid="navigation-header"
    >
      <nav className="section-container">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Name */}
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-3"
            data-testid="nav-logo-link"
          >
            <Logo size={40} />
            <div className="hidden sm:block">
              <p className="font-heading text-lg text-[#2D3339] font-medium">Sophie Aigroz</p>
              <p className="text-xs text-[#5C6269] tracking-wide">Psychologue FSP</p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="nav-link text-[#2D3339] text-sm font-medium tracking-wide hover:text-[#D4A59A]"
                data-testid={`nav-link-${link.label.toLowerCase()}`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('#contact')}
              className="btn-primary px-5 py-2.5 rounded-full text-sm font-medium"
              data-testid="nav-cta-button"
            >
              Prendre contact
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-[#2D3339]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="mobile-menu-button"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div 
            className="md:hidden bg-white border-t border-[#E5E5E0] py-4 animate-fade-in"
            data-testid="mobile-menu"
          >
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="block w-full text-left px-4 py-3 text-[#2D3339] font-medium hover:bg-[#F5F5F0]"
                data-testid={`mobile-nav-link-${link.label.toLowerCase()}`}
              >
                {link.label}
              </button>
            ))}
            <div className="px-4 pt-3">
              <button
                onClick={() => scrollToSection('#contact')}
                className="btn-primary w-full px-5 py-2.5 rounded-full text-sm font-medium"
                data-testid="mobile-nav-cta-button"
              >
                Prendre contact
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navigation;
