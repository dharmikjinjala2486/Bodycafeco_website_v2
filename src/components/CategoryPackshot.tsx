import React from 'react';

interface CategoryPackshotProps {
  name: string;
  accentHex: string;
  pantone: string;
  categoryLabel: string;
  isHovered?: boolean;
}

export const CategoryPackshot: React.FC<CategoryPackshotProps> = ({
  name,
  accentHex,
  pantone,
  categoryLabel,
  isHovered = false,
}) => {
  return (
    <div className="relative flex flex-col items-center justify-center select-none w-full h-[240px] md:h-[280px] bg-transparent">
      
      {/* Supplement Container 3D Mockup */}
      <div 
        className="relative flex flex-col items-center transition-transform duration-500 ease-[0.16,1,0.3,1]"
        style={{
          transform: isHovered ? 'scale(1.05)' : 'scale(1)'
        }}
      >
        {/* Cap */}
        <div className="h-7 w-20 md:h-8 md:w-24 rounded-t-[3px] bg-gradient-to-r from-[#2A2A2A] via-[#1F1F1F] to-[#121212] border-b border-black shadow-inner flex justify-center items-end">
          {/* Subtle ribbing on cap */}
          <div 
            className="w-[90%] h-full opacity-10 bg-repeat-x" 
            style={{ 
              backgroundImage: 'linear-gradient(90deg, #000 1px, transparent 1px)', 
              backgroundSize: '4px 100%' 
            }} 
          />
        </div>

        {/* Neck */}
        <div className="w-16 h-1.5 md:w-20 md:h-2 bg-gradient-to-r from-[#202020] via-[#181818] to-[#101010]" />

        {/* Bottle Body */}
        <div 
          className="w-28 h-36 md:w-32 md:h-44 rounded-b-[20px] rounded-t-[10px] relative flex flex-col items-center justify-center overflow-hidden"
          style={{
            // Amber Glass look with dynamic light source
            background: 'linear-gradient(135deg, #3A2312 0%, #2A190C 40%, #170E06 70%, #2D1B0F 100%)',
            boxShadow: 'inset -6px 0 15px -8px rgba(255,255,255,0.05), inset 6px 0 15px -8px rgba(0,0,0,0.5)'
          }}
        >
          {/* Amber shine overlay */}
          <div className="absolute inset-y-0 left-[10%] w-[15%] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

          {/* Minimal Apothecary Label */}
          <div className="w-[84%] h-[72%] bg-[#FAFAF8] flex flex-col justify-between p-2.5 relative text-[#111111] font-sans border border-[#EDECE8]">
            
            {/* Top label details */}
            <div className="flex flex-col">
              <div className="flex justify-between items-start mb-0.5">
                <span className="text-[5.5px] tracking-wider uppercase font-semibold text-text-secondary">BODY CAFE CO.</span>
                <span className="text-[5.5px] tracking-wide font-light text-text-muted">{categoryLabel}</span>
              </div>
              <div className="w-full h-[0.5px] bg-[#EAEAEA] my-0.5" />
            </div>

            {/* Middle Product Name */}
            <div className="flex flex-col my-auto text-left">
              <h4 className="font-logo leading-tight text-text-dark tracking-editorial text-[8px] uppercase font-bold">
                {name.replace(' Monohydrate', '').replace(' Bisglycinate', '').replace(' Fish Oil', '').replace(' Extract', '')}
              </h4>
              <p className="text-[5px] text-text-secondary leading-snug mt-0.5 max-w-[90%] uppercase tracking-wide">
                SCIENCE-BACKED
              </p>
            </div>

            {/* Bottom details with Pantone Accent Stripe */}
            <div className="flex flex-col mt-auto">
              {/* Product Color Stripe */}
              <div className="w-full h-1 mb-1.5 relative overflow-hidden" style={{ backgroundColor: accentHex }}>
                {/* Highlight inside stripe */}
                <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white/20 to-transparent" />
              </div>
              <div className="flex justify-between items-center text-[5px] tracking-wide text-text-secondary uppercase">
                <span>{pantone}</span>
                <span className="font-semibold text-text-dark">STANDARD PURE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPackshot;
