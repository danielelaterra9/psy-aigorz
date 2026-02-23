import React from 'react';
import Logo from './Logo';
import { Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="bg-[#2D3339] text-[#FDFBF7] py-16"
      data-testid="footer"
    >
      <div className="section-container">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white rounded-full p-2">
                <Logo size={32} />
              </div>
              <div>
                <p className="font-heading text-lg font-medium">Sophie Aigroz</p>
                <p className="text-sm text-[#FDFBF7]/70">Psychologue FSP</p>
              </div>
            </div>
            <p className="text-sm text-[#FDFBF7]/70 leading-relaxed">
              Accompagnement psychologique pour enfants, adolescent·e·s, adultes, 
              couples et familles au cœur du Valais.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg font-medium mb-4">Contact</h4>
            <div className="space-y-3">
              <a 
                href="tel:0792856209" 
                className="flex items-center gap-3 text-sm text-[#FDFBF7]/70 hover:text-[#FDFBF7] transition-colors"
                data-testid="footer-phone"
              >
                <Phone size={16} />
                079 285 62 09
              </a>
              <a 
                href="mailto:sophie.aigroz@gmail.com" 
                className="flex items-center gap-3 text-sm text-[#FDFBF7]/70 hover:text-[#FDFBF7] transition-colors"
                data-testid="footer-email"
              >
                <Mail size={16} />
                sophie.aigroz@gmail.com
              </a>
              <div className="flex items-center gap-3 text-sm text-[#FDFBF7]/70">
                <MapPin size={16} />
                1907 Saxon, Valais
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-heading text-lg font-medium mb-4">Horaires</h4>
            <div className="space-y-2 text-sm text-[#FDFBF7]/70">
              <p>Lundi: 08h00 - 18h00</p>
              <p>Mercredi: 08h00 - 18h00</p>
              <p className="text-[#D4A59A] text-sm text-[#5C6269]">Uniquement sur rendez-vous</p>
              <p>Consultations en ligne possibles</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-[#FDFBF7]/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[#FDFBF7]/50">
            © {currentYear} Sophie Aigroz - Psychologue FSP. Tous droits réservés.
          </p>
          <p className="text-sm text-[#FDFBF7]/50">
            www.psy-aigroz.ch
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
