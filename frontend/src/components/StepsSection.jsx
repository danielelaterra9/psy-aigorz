import React from 'react';
import { Heart, Users, Target } from 'lucide-react';

const StepsSection = () => {
  const steps = [
    {
      number: '1',
      icon: Heart,
      title: 'Retrouver rapidement un apaisement',
      description: 'La première étape vise à diminuer la souffrance psychologique et à rétablir un sentiment de mieux-être. Il s\'agit de vous offrir un espace sécurisant, de comprendre ce qui vous amène et de mettre en place des premiers leviers concrets pour apaiser les tensions.'
    },
    {
      number: '2',
      icon: Users,
      title: 'Évaluer l\'alliance thérapeutique',
      description: 'Nous prenons ensuite un temps pour faire le point sur notre collaboration : Est-ce que vous vous sentez à l\'aise ? Est-ce que mon approche et ma manière de travailler vous conviennent ? Cette étape est essentielle, car la qualité de la relation thérapeutique est un facteur clé du changement.'
    },
    {
      number: '3',
      icon: Target,
      title: 'Construire un parcours personnalisé',
      description: 'Enfin, nous définissons ensemble des objectifs thérapeutiques spécifiques et un accompagnement sur mesure. Ce parcours tient compte de votre histoire, de vos ressources et de vos besoins, avec une direction claire et évolutive.'
    }
  ];

  return (
    <section 
      id="etapes" 
      className="py-20 lg:py-32 bg-white"
      data-testid="steps-section"
    >
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <img
              src="https://images.unsplash.com/photo-1588006011843-15eabd03569d?auto=format&fit=crop&w=800&q=80"
              alt="Chemin vers le mieux-être - étapes du parcours thérapeutique"
              className="w-full h-[400px] lg:h-[500px] object-cover rounded-2xl shadow-lg"
              data-testid="steps-image"
            />
            {/* Overlay quote */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-5 rounded-xl shadow-lg">
              <p className="text-[#2D3339] text-sm font-heading italic text-center">
                « Un accompagnement structuré, adapté à votre rythme. »
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <p className="text-[#D4A59A] text-sm font-medium tracking-widest uppercase mb-4">
              Le parcours
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-[#2D3339] font-medium mb-6">
              Les Étapes du Travail Thérapeutique
            </h2>
            <p className="text-[#5C6269] text-lg leading-relaxed mb-10">
              Mon accompagnement s'organise en plusieurs étapes, pensées pour être à la fois 
              structurées et adaptées à votre rythme.
            </p>

            {/* Steps */}
            <div className="space-y-8">
              {steps.map((step, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-5"
                  data-testid={`step-item-${index}`}
                >
                  <div className="w-14 h-14 rounded-full bg-[#D4A59A] flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-heading text-xl font-semibold">{step.number}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-heading text-lg text-[#2D3339] font-medium mb-2">
                      {step.title}
                    </h4>
                    <p className="text-[#5C6269] text-sm leading-relaxed">
                      {step.description}
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

export default StepsSection;
