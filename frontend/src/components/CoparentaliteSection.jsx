import React from 'react';
import { Users, Calendar, CheckCircle } from 'lucide-react';

const CoparentaliteSection = () => {
  return (
    <section 
      id="coparentalite" 
      className="py-20 lg:py-32 bg-[#FDFBF7]"
      data-testid="coparentalite-section"
    >
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-[#D4A59A] text-sm font-medium tracking-widest uppercase mb-4">
            Accompagnement spécialisé
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-[#2D3339] font-medium mb-6">
            La Coparentalité : Accompagner Après la Séparation Conjugale
          </h2>
          <p className="text-[#5C6269] text-lg leading-relaxed">
            La séparation transforme le lien conjugal, mais le lien coparental demeure. Je 
            propose des accompagnements spécifiquement dédiés à la coparentalité dans ce 
            contexte, selon deux formats.
          </p>
        </div>

        {/* Two Options Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Option 1: Thérapie */}
          <div className="bg-white rounded-2xl p-8 border border-[#E5E5E0] shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full bg-[#D4A59A]/10 flex items-center justify-center">
                <Users size={28} className="text-[#D4A59A]" />
              </div>
              <h3 className="font-heading text-2xl text-[#2D3339] font-medium">
                Thérapie de Coparentalité
              </h3>
            </div>
            
            <p className="text-[#5C6269] leading-relaxed mb-6">
              Elle peut se dérouler en individuel, en séances conjointes ou en individuel dans un 
              premier temps, puis en commun.
            </p>
            
            <p className="text-[#5C6269] leading-relaxed">
              Ce travail vise à améliorer la communication entre parents, apaiser les conflits, 
              recentrer les décisions autour des besoins de l'enfant et construire une coopération 
              parentale plus sereine.
            </p>
          </div>

          {/* Option 2: Ateliers */}
          <div className="bg-white rounded-2xl p-8 border border-[#E5E5E0] shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full bg-[#D4A59A]/10 flex items-center justify-center">
                <Calendar size={28} className="text-[#D4A59A]" />
              </div>
              <h3 className="font-heading text-2xl text-[#2D3339] font-medium">
                Ateliers de Coparentalité
              </h3>
            </div>
            
            <p className="text-[#5C6269] leading-relaxed mb-4">
              Ces ateliers sont proposés plusieurs fois par année, en petit groupe, sur 4 jeudis 
              consécutifs de 17h30 à 19h30, et sont animés avec une autre psychothérapeute.
            </p>
            
            <div className="bg-[#FDFBF7] rounded-xl p-4 mb-4">
              <p className="text-[#2D3339] font-medium text-sm mb-2">Participation possible :</p>
              <div className="flex flex-wrap gap-4">
                <span className="flex items-center gap-2 text-[#5C6269] text-sm">
                  <CheckCircle size={16} className="text-[#D4A59A]" />
                  Seul·e
                </span>
                <span className="flex items-center gap-2 text-[#5C6269] text-sm">
                  <CheckCircle size={16} className="text-[#D4A59A]" />
                  Avec l'autre parent
                </span>
              </div>
            </div>
            
            <p className="text-[#5C6269] leading-relaxed text-sm">
              Les objectifs de ces ateliers sont de réduire les tensions coparentales, d'acquérir des 
              outils concrets pour communiquer plus sereinement avec votre coparent et de 
              développer des stratégies pour soutenir votre enfant dans ce contexte. L'avantage du 
              groupe est aussi d'échanger sur vos expériences respectives et de vous rendre 
              compte que bien d'autres parents vivent les mêmes difficultés que vous.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoparentaliteSection;
