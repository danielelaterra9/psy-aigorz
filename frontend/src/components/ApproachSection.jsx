import React from 'react';
import { Shield, MessageCircle, Sparkles } from 'lucide-react';

const ApproachSection = () => {
  const values = [
    {
      icon: Shield,
      title: 'Confidentialité',
      description: 'Un cadre sécurisant et confidentiel pour explorer vos difficultés en toute confiance.'
    },
    {
      icon: MessageCircle,
      title: 'Écoute respectueuse',
      description: 'Une attention bienveillante et sans jugement pour comprendre votre situation unique.'
    },
    {
      icon: Sparkles,
      title: 'Ressources',
      description: 'Mobilisation de vos ressources individuelles, parentales et familiales.'
    }
  ];

  return (
    <section 
      id="approche" 
      className="py-20 lg:py-32 bg-[#FDFBF7]"
      data-testid="approach-section"
    >
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative flex items-center justify-center">
            <img
              src="https://customer-assets.emergentagent.com/job_aigroz-psy/artifacts/9kaxbdrk_Image%20cercles.png"
              alt="Approche systémique - liens interconnectés"
              className="w-full max-w-md h-auto object-contain"
              data-testid="approach-image"
            />
          </div>

          {/* Content */}
          <div>
            <p className="text-[#D4A59A] text-sm font-medium tracking-widest uppercase mb-4">
              Mon approche
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-[#2D3339] font-medium mb-6">
              Une Approche Systémique
            </h2>
            <p className="text-[#5C6269] text-lg leading-relaxed mb-8">
              Je propose un espace d'écoute confidentiel et respectueux, ancré dans une approche systémique, 
              afin de soutenir la compréhension des relations, l'apaisement des tensions et le développement 
              de ressources individuelles, parentales et familiales.
            </p>
            
            {/* Citation */}
            <blockquote className="border-l-4 border-[#D4A59A] pl-6 py-2 mb-10">
              <p className="text-[#2D3339] text-xl font-heading italic">
                « Comprendre les liens, c'est ouvrir des possibles. »
              </p>
            </blockquote>

            {/* Values */}
            <div className="space-y-6">
              {values.map((value, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-4"
                  data-testid={`value-item-${index}`}
                >
                  <div className="w-12 h-12 rounded-full bg-white border border-[#E5E5E0] flex items-center justify-center flex-shrink-0">
                    <value.icon size={20} className="text-[#D4A59A]" />
                  </div>
                  <div>
                    <h4 className="font-heading text-lg text-[#2D3339] font-medium mb-1">
                      {value.title}
                    </h4>
                    <p className="text-[#5C6269] text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApproachSection;
