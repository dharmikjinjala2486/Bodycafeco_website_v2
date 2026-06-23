import React from 'react';
import { ShieldCheck, Compass, CheckCircle } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="bg-bg-soft pt-12 pb-24 text-left font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-24">
        
        {/* Intro Hero */}
        <div className="max-w-4xl mb-24 space-y-6">
          <span className="text-[10px] uppercase tracking-superwide font-bold text-text-muted">Our Philosophy</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-text-dark leading-[1.1] tracking-tight">
            Wellness is not a metric. <br />
            <span className="font-semibold text-text-dark">It is a daily protocol.</span>
          </h1>
          <p className="text-sm md:text-xl text-text-secondary leading-relaxed font-light max-w-2xl pt-2">
            Body Cafe Co is a premium ritual brand built on clinical evidence, chemical safety, and complete botanical transparency. We construct tools for daily longevity.
          </p>
        </div>

        {/* Core Pillars (Aesop editorial grid style) */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 py-16 border-t border-border-light">
          <div>
            <span className="text-[10px] uppercase tracking-superwide font-bold text-text-muted">The Foundation</span>
            <h2 className="text-2xl md:text-3xl font-light text-text-dark mt-2 mb-6 tracking-tight">
              Why we exist.
            </h2>
            <p className="text-xs md:text-sm leading-relaxed text-text-secondary font-light mb-4">
              Modern supplements are marketed with aggressive neon branding, bulk sizing, and mysterious proprietary blends. The industry prioritizes margins over clinical reality.
            </p>
            <p className="text-xs md:text-sm leading-relaxed text-text-secondary font-light">
              We started Body Cafe Co with a simple rule: create clean, single-origin botanical extracts and fully chelated minerals that align with human biochemistry. No performance gimmicks. Just quiet, consistent, scientific health.
            </p>
          </div>

          <div className="bg-bg-subtle aspect-[4/3] flex items-center justify-center p-8 border border-border-light relative overflow-hidden">
            {/* Visual representing clinical purity */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-psyllium/5 to-transparent" />
            <div className="text-center relative z-10 space-y-4">
              <span className="text-[10px] uppercase tracking-superwide font-bold text-text-muted">The Purity Guarantee</span>
              <h3 className="text-lg font-logo tracking-wider text-text-dark uppercase">100% TRACEABLE</h3>
              <p className="text-[10px] text-text-secondary max-w-xs leading-relaxed uppercase tracking-wider mx-auto">
                All production batches undergo batch testing for heavy metals, solvent residue, and biological activity.
              </p>
            </div>
          </div>
        </section>

        {/* Pillars Grid */}
        <section className="py-24 border-t border-border-light">
          <div className="max-w-3xl mb-16">
            <span className="text-[10px] uppercase tracking-superwide font-bold text-text-muted">Quality Protocol</span>
            <h2 className="text-2xl md:text-3xl font-light text-text-dark mt-2 tracking-tight">
              Our Core Standards
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            <div className="space-y-4">
              <div className="w-10 h-10 bg-bg-soft border border-border-light flex items-center justify-center">
                <ShieldCheck size={16} className="text-text-dark" />
              </div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-text-dark">Patented Molecules Only</h3>
              <p className="text-xs md:text-sm leading-relaxed text-text-secondary font-light">
                We use branded raw materials (Creapure®, Albion™ Chelates, affron®) to guarantee that the chemical compound mirrors the research that proved its efficacy.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-10 h-10 bg-bg-soft border border-border-light flex items-center justify-center">
                <Compass size={16} className="text-text-dark" />
              </div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-text-dark">Apothecary Design</h3>
              <p className="text-xs md:text-sm leading-relaxed text-text-secondary font-light">
                Our amber glass canisters filter harmful ultraviolet wavelengths to extend formulation shelf-life without chemical preservatives or artificial coatings.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-10 h-10 bg-bg-soft border border-border-light flex items-center justify-center">
                <CheckCircle size={16} className="text-text-dark" />
              </div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-text-dark">Refined Restraint</h3>
              <p className="text-xs md:text-sm leading-relaxed text-text-secondary font-light">
                We formulation-test under high heat and acidity parameters to verify stability, refusing to add masking agents, synthetic sweeteners, or colors.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
export default About;
