import React from 'react';

interface ProductCanvasProps {
  name: string;
  accentHex: string;
  pantone: string;
  categoryLabel: string;
  size?: 'sm' | 'md' | 'lg';
  active?: boolean;
}

export const ProductCanvas: React.FC<ProductCanvasProps> = ({
  name,
  accentHex,
  pantone,
  categoryLabel,
  size = 'md',
  active = false
}) => {
  const dimensions = {
    sm: { width: 'w-44', height: 'h-64', labelSize: 'text-[9px]', titleSize: 'text-[11px]', capSize: 'h-8 w-20' },
    md: { width: 'w-56', height: 'h-80', labelSize: 'text-[10px]', titleSize: 'text-xs', capSize: 'h-10 w-28' },
    lg: { width: 'w-64', height: 'h-96', labelSize: 'text-xs', titleSize: 'text-sm', capSize: 'h-12 w-32' }
  };

  const dim = dimensions[size];

  return (
    <div className="relative flex flex-col items-center justify-center select-none py-8 w-full h-full min-h-[250px] md:min-h-[380px] bg-gradient-to-b from-[#FAF9F6]/50 to-[#F0EFEA]/30">
      
      {/* Background radial glow */}
      <div 
        className="absolute w-40 h-40 rounded-full blur-[60px] opacity-15 pointer-events-none transition-all duration-700" 
        style={{ 
          backgroundColor: accentHex,
          transform: active ? 'scale(1.2)' : 'scale(1)' 
        }} 
      />

      {/* Supplement Container 3D Mockup */}
      <div className={`relative flex flex-col items-center transition-transform duration-500 ${active ? 'scale-[1.03]' : 'scale-100'}`}>
        
        {/* Cap */}
        <div className={`${dim.capSize} rounded-t-sm bg-gradient-to-r from-[#2A2A2A] via-[#1F1F1F] to-[#121212] border-b border-black shadow-inner flex justify-center items-end`}>
          {/* Subtle ribbing on cap */}
          <div className="w-[90%] h-full opacity-10 bg-repeat-x" style={{ backgroundImage: 'linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '4px 100%' }} />
        </div>

        {/* Neck */}
        <div className="w-24 h-2 bg-gradient-to-r from-[#202020] via-[#181818] to-[#101010] shadow-md" />

        {/* Bottle Body */}
        <div 
          className={`${dim.width} ${dim.height} rounded-b-[24px] rounded-t-[12px] relative flex flex-col items-center justify-center overflow-hidden transition-shadow duration-500`}
          style={{
            // Amber Glass look with dynamic light source
            background: 'linear-gradient(135deg, #3A2312 0%, #2A190C 40%, #170E06 70%, #2D1B0F 100%)',
            boxShadow: active 
              ? 'inset -12px 0 25px -10px rgba(255,255,255,0.06), inset 12px 0 25px -10px rgba(0,0,0,0.5), 0 20px 40px -15px rgba(0,0,0,0.15)'
              : 'inset -8px 0 15px -10px rgba(255,255,255,0.04), inset 8px 0 15px -10px rgba(0,0,0,0.4), 0 10px 25px -15px rgba(0,0,0,0.1)'
          }}
        >
          {/* Amber shine overlay */}
          <div className="absolute inset-y-0 left-[10%] w-[15%] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

          {/* Minimal Apothecary Label */}
          <div className="w-[84%] h-[72%] bg-[#FAFAF8] shadow-md flex flex-col justify-between p-4 relative text-[#111111] font-sans border border-[#EDECE8]">
            
            {/* Top label details */}
            <div className="flex flex-col">
              <div className="flex justify-between items-start mb-1">
                <span className="text-[7px] tracking-wider uppercase font-semibold text-text-secondary">BODY CAFE CO.</span>
                <span className="text-[7px] tracking-wide font-light text-text-muted">{categoryLabel}</span>
              </div>
              <div className="w-full h-[1px] bg-[#EAEAEA] my-1" />
            </div>

            {/* Middle Logo & Product Name */}
            <div className="flex flex-col my-auto text-left">
              <h4 className={`font-logo leading-tight text-text-dark tracking-editorial select-text ${dim.titleSize} uppercase`}>
                {name}
              </h4>
              <p className="text-[8px] text-text-secondary leading-snug mt-1 max-w-[90%] uppercase tracking-wide">
                SCIENCE-BACKED FORMULATION
              </p>
            </div>

            {/* Bottom details with Pantone Accent Stripe */}
            <div className="flex flex-col mt-auto">
              {/* Product Color Stripe */}
              <div className="w-full h-1.5 mb-2 relative overflow-hidden" style={{ backgroundColor: accentHex }}>
                {/* Highlight inside stripe */}
                <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white/20 to-transparent" />
              </div>
              <div className="flex justify-between items-center text-[7px] tracking-wide text-text-secondary uppercase">
                <span>{pantone}</span>
                <span className="font-semibold text-text-dark">STANDARD PURE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Shadow */}
        <div className={`w-36 h-2 bg-black/15 rounded-full blur-[4px] mt-2 transition-all duration-500 ${active ? 'scale-110 opacity-70' : 'scale-100 opacity-100'}`} />
      </div>
    </div>
  );
};
export default ProductCanvas;
