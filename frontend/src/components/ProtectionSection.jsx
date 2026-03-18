import React from 'react';
import { GraduationCap, Shield, Scale, Heart, Users, BookOpen } from 'lucide-react';

const ProtectionSection = () => {
  const activities = [
    {
      icon: GraduationCap,
      title: 'Recherche Universitaire',
      subtitle: 'Doctorat en cours – Université de Lausanne',
      description: 'Je mène actuellement une recherche doctorale sur l\'évaluation des compétences parentales dans les contextes de protection de l\'enfance.',
      points: [
        'Comment définir et évaluer les compétences parentales ?',
        'Comment garantir rigueur et neutralité dans les expertises ?',
        'Comment articuler clinique, droit et protection ?'
      ]
    },
    {
      icon: Scale,
      title: 'Membre de l\'APEA',
      subtitle: 'Autorité de Protection de l\'Enfant et de l\'Adulte',
      description: 'Je siège comme membre psychologue au sein de l\'APEA Martigny–St-Maurice et Entremont, où je participe aux décisions concernant des situations familiales complexes.',
      points: [
        'Travail interdisciplinaire (droit, social, médecine, psychologie)',
        'Attention à la proportionnalité des mesures',
        'Respect des droits des parents et sécurité de l\'enfant'
      ]
    }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Rigueur & Responsabilité',
      description: 'L\'évaluation psychologique engage des conséquences importantes. Elle nécessite prudence, méthodologie et conscience des impacts.'
    },
    {
      icon: Heart,
      title: 'Respect des Personnes',
      description: 'Chaque parent et chaque enfant mérite d\'être entendu avec dignité, même dans des contextes de conflit ou de vulnérabilité.'
    },
    {
      icon: Users,
      title: 'Intérêt de l\'Enfant',
      description: 'L\'intérêt supérieur de l\'enfant reste un repère central, tout en tenant compte de la complexité des liens familiaux.'
    }
  ];

  return (
    <section 
      id="protection" 
      className="py-20 lg:py-32 bg-white"
      data-testid="protection-section"
    >
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-[#D4A59A] text-sm font-medium tracking-widest uppercase mb-4">
            Entre clinique, recherche et institution
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-[#2D3339] font-medium mb-6">
            Protection de l'Enfant
          </h2>
          <p className="text-[#5C6269] text-lg leading-relaxed">
            Au-delà de mon activité clinique, je m'engage dans la recherche et la protection institutionnelle 
            de l'enfant, avec une approche rigoureuse et respectueuse de chaque famille.
          </p>
        </div>

        {/* Two Activities Cards */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          {activities.map((activity, index) => (
            <div 
              key={index}
              className="bg-[#FDFBF7] rounded-2xl p-8 border border-[#E5E5E0] hover:shadow-lg transition-shadow duration-300"
              data-testid={`activity-card-${index}`}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-[#D4A59A]/10 flex items-center justify-center flex-shrink-0">
                  <activity.icon size={28} className="text-[#D4A59A]" />
                </div>
                <div>
                  <h3 className="font-heading text-xl text-[#2D3339] font-medium">
                    {activity.title}
                  </h3>
                  <p className="text-[#D4A59A] text-sm font-medium">
                    {activity.subtitle}
                  </p>
                </div>
              </div>
              <p className="text-[#5C6269] leading-relaxed mb-6">
                {activity.description}
              </p>
              <ul className="space-y-3">
                {activity.points.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[#5C6269] text-sm">
                    <BookOpen size={16} className="text-[#D4A59A] flex-shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Image and Values Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1767082091902-791c51aab28a?auto=format&fit=crop&w=500&q=80"
                alt="Famille unie - mains ensemble"
                className="w-full h-48 object-cover rounded-xl"
                data-testid="protection-image-1"
              />
              <img
                src="https://images.unsplash.com/photo-1764952365548-02e78927a483?auto=format&fit=crop&w=500&q=80"
                alt="Enfant tenant la main d'un adulte"
                className="w-full h-48 object-cover rounded-xl mt-8"
                data-testid="protection-image-2"
              />
            </div>
            {/* Quote overlay */}
            <div className="absolute -bottom-6 left-4 right-4 bg-white p-5 rounded-xl shadow-lg border border-[#E5E5E0]">
              <p className="text-[#2D3339] text-sm font-heading italic text-center">
                « La recherche nourrit ma pratique et m'invite à maintenir une posture réflexive et exigeante. »
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="order-1 lg:order-2">
            <h3 className="font-heading text-2xl sm:text-3xl text-[#2D3339] font-medium mb-8">
              Mes Valeurs
            </h3>
            <p className="text-[#5C6269] leading-relaxed mb-8">
              Que ce soit en consultation, dans mes recherches ou au sein de l'APEA, 
              je m'appuie sur des principes fondamentaux qui guident chacune de mes interventions.
            </p>
            <div className="space-y-6">
              {values.map((value, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-[#FDFBF7] transition-colors"
                  data-testid={`value-protection-${index}`}
                >
                  <div className="w-12 h-12 rounded-full bg-[#D4A59A]/10 flex items-center justify-center flex-shrink-0">
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

export default ProtectionSection;
