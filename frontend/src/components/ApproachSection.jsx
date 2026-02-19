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
          <div className="relative">
            <div className="absolute -inset-4 bg-[#CD5D45]/5 rounded-2xl transform -rotate-2"></div>
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
              alt="Espace thérapeutique accueillant"
              className="relative w-full h-[400px] lg:h-[500px] object-cover rounded-2xl"
              data-testid="approach-image"
            />
          </div>

          {/* Content */}
          <div>
            <p className="text-[#CD5D45] text-sm font-medium tracking-widest uppercase mb-4">
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
            <p className="text-[#5C6269] text-lg leading-relaxed mb-10">
              L'approche systémique considère l'individu dans son environnement relationnel. 
              Mon cabinet à Saxon offre un cadre sécurisant pour explorer vos difficultés et mobiliser vos ressources.
            </p>

            {/* Values */}
            <div className="space-y-6">
              {values.map((value, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-4"
                  data-testid={`value-item-${index}`}
                >
                  <div className="w-12 h-12 rounded-full bg-white border border-[#E5E5E0] flex items-center justify-center flex-shrink-0">
                    <value.icon size={20} className="text-[#CD5D45]" />
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
