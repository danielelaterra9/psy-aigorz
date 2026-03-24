import React from 'react';

const ApproachSection = () => {
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
            <p className="text-[#5C6269] text-lg leading-relaxed mb-6">
              Je travaille selon une approche systémique, qui considère que nos difficultés 
              prennent souvent sens dans nos relations.
            </p>
            <p className="text-[#5C6269] text-lg leading-relaxed mb-6">
              Plutôt que de se centrer uniquement sur l'individu, cette approche permet de prendre 
              du recul sur les interactions avec les proches, les modes de communication et les 
              rôles que chacun occupe.
            </p>
            <p className="text-[#5C6269] text-lg leading-relaxed mb-6">
              Cela permet de mieux comprendre ce qui se joue… et surtout d'ouvrir des 
              possibilités de changement.
            </p>
            <p className="text-[#5C6269] text-lg leading-relaxed mb-8">
              Parfois, une modification dans la manière d'interagir, de se positionner ou de 
              communiquer peut avoir des effets positifs sur l'ensemble de la situation.
            </p>
            
            {/* Citation */}
            <blockquote className="border-l-4 border-[#D4A59A] pl-6 py-2">
              <p className="text-[#2D3339] text-xl font-heading italic">
                « Comprendre les liens, c'est ouvrir des possibles. »
              </p>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApproachSection;
