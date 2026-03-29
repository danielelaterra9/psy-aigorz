import React from 'react';
import { Users, Heart, User, ChevronRight, ArrowRight } from 'lucide-react';

const ServicesSection = () => {
  const scrollToCoparentalite = () => {
    const element = document.querySelector('#coparentalite');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const services = [
    {
      id: 'relationnelles',
      icon: Users,
      title: 'Thérapies Relationnelles',
      description: 'Accompagnement pour les familles, les couples et la coparentalité. Retrouver l\'équilibre et la communication.',
      items: [
        { text: 'Thérapie familiale', link: null },
        { text: 'Thérapie de couple', link: null },
        { text: 'Thérapie de coparentalité', link: 'coparentalite' }
      ]
    },
    {
      id: 'parentalite',
      icon: Heart,
      title: 'Soutien à la Parentalité',
      description: 'Guidance parentale, prévention du burn-out et renforcement du lien parent-enfant.',
      items: [
        { text: 'Guidance parentale', link: null },
        { text: 'Accompagnement du burn-out parental', link: null },
        { text: 'Reprise ou soutien de la relation parent–enfant', link: null }
      ]
    },
    {
      id: 'individuels',
      icon: User,
      title: 'Suivis Individuels',
      description: 'Pour adultes et adolescent·e·s. Gestion des difficultés émotionnelles et relationnelles.',
      items: [
        { text: 'Adultes', link: null },
        { text: 'Adolescent·e·s dès 12 ans', link: null },
        { text: 'Difficultés émotionnelles et relationnelles', link: null }
      ]
    }
  ];

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="services" 
      className="py-20 lg:py-32 bg-white"
      data-testid="services-section"
    >
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-[#D4A59A] text-sm font-medium tracking-widest uppercase mb-4">
            Accompagnement personnalisé
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-[#2D3339] font-medium mb-6">
            Mes Services
          </h2>
          <p className="text-[#5C6269] text-lg leading-relaxed">
            J'accompagne les enfants, les adolescent·e·s, les adultes, les couples et les familles 
            dans différentes étapes de vie, situations de crise ou difficultés relationnelles.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`service-card bg-[#FDFBF7] rounded-xl p-8 border border-[#E5E5E0] animate-fade-in-up animation-delay-${(index + 1) * 100}`}
              data-testid={`service-card-${service.id}`}
            >
              <div className="w-14 h-14 rounded-full bg-[#D4A59A]/10 flex items-center justify-center mb-6">
                <service.icon size={28} className="text-[#D4A59A]" />
              </div>
              <h3 className="font-heading text-2xl text-[#2D3339] font-medium mb-4">
                {service.title}
              </h3>
              <p className="text-[#5C6269] leading-relaxed mb-6">
                {service.description}
              </p>
              <ul className="space-y-3">
                {service.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[#5C6269] text-sm">
                    <ChevronRight size={16} className="text-[#D4A59A] flex-shrink-0 mt-0.5" />
                    <div>
                      <span>{item.text}</span>
                      {item.link && (
                        <button
                          onClick={scrollToCoparentalite}
                          className="ml-2 inline-flex items-center gap-1 text-[#D4A59A] hover:text-[#C99589] font-medium underline underline-offset-2 decoration-1 hover:decoration-2 transition-all cursor-pointer text-xs"
                          data-testid="link-en-savoir-plus"
                        >
                          En savoir plus
                          <ArrowRight size={12} />
                        </button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <button
            onClick={scrollToContact}
            className="btn-primary px-8 py-3.5 rounded-full text-base font-medium inline-flex items-center gap-2"
            data-testid="services-cta-button"
          >
            Demander un premier entretien
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
