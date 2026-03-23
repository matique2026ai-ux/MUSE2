'use client';

import { motion } from 'framer-motion';

interface ProjectSpecsProps {
  specs: {
    client: string;
    area: string;
    status: string;
    team?: string;
  };
  labels: {
    client: string;
    area: string;
    status: string;
    team: string;
  };
  narrativeLabels: {
    executiveSummary: string;
    designChallenge: string;
    architecturalResponse: string;
    scopeOfServices: string;
  };
  titleLabel: string;
  title: string;
  description?: string;
  designChallenge: string;
  architecturalResponse: string;
  services: string[];
  isRTL: boolean;
}

export default function ProjectSpecs({ 
  specs, 
  labels, 
  titleLabel, 
  narrativeLabels,
  description, 
  designChallenge,
  architecturalResponse,
  services,
  isRTL 
}: ProjectSpecsProps) {
  const items = [
    { label: labels.client, value: specs.client },
    { label: labels.area, value: specs.area },
    { label: labels.status, value: specs.status },
    ...(specs.team ? [{ label: labels.team, value: specs.team }] : []),
  ];

  return (
    <section className="bg-[#0A0A0A] w-full text-stone-300 relative overflow-hidden">
      
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '4rem 4rem' }} />

      <div className="container mx-auto px-6 md:px-12 lg:px-24 py-24 md:py-32 relative z-10 w-full max-w-7xl">
        
        <div className={`flex flex-col lg:flex-row gap-16 lg:gap-24 ${isRTL ? 'lg:flex-row-reverse text-right' : 'text-left'}`}>
          
          {/* Left Column: Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="w-full lg:w-3/5"
          >
            <div className={`mb-12 border-b border-[#1a1a1a] pb-6 flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span className={`text-sm tracking-[0.2em] font-mono uppercase text-[#A67C52]`}>
                {narrativeLabels.executiveSummary}
              </span>
            </div>
            
            {description && (
              <p className={`text-xl md:text-2xl font-light text-stone-200 mb-16 ${isRTL ? 'leading-[2.2] tracking-normal' : 'leading-[1.8] tracking-[-0.01em]'}`}>
                {description}
              </p>
            )}

            {/* Dynamic Narrative Fields */}
            <div className="flex flex-col gap-16 mt-16 text-stone-300">
              <div>
                <h3 className={`text-xs tracking-[0.2em] font-mono uppercase text-[#A67C52] mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {narrativeLabels.designChallenge}
                </h3>
                <p className={`text-base md:text-lg font-light leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
                  {designChallenge}
                </p>
              </div>

              <div>
                <h3 className={`text-xs tracking-[0.2em] font-mono uppercase text-[#A67C52] mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {narrativeLabels.architecturalResponse}
                </h3>
                <p className={`text-base md:text-lg font-light leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
                  {architecturalResponse}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Specification Data Matrix */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="w-full lg:w-2/5 flex flex-col"
          >
            <div className={`mb-12 border-b border-[#1a1a1a] pb-6 flex justify-between items-end ${isRTL ? 'flex-row-reverse text-right' : 'text-left'}`}>
              <h2 className={`text-sm tracking-[0.2em] font-mono uppercase text-[#A67C52]`}>
                {titleLabel}
              </h2>
            </div>

            <div className="flex flex-col w-full border-t border-[#1a1a1a] mb-16">
              {items.map((item) => (
                <div
                  key={item.label}
                  className={`flex flex-col sm:flex-row border-b border-[#1a1a1a] group hover:bg-[#121212] transition-colors duration-300 ${isRTL ? 'sm:flex-row-reverse text-right' : 'text-left'}`}
                >
                  <div className={`w-full sm:w-1/3 py-6 px-4 border-b sm:border-b-0 sm:border-r border-[#1a1a1a] flex items-center ${isRTL ? 'sm:border-l sm:border-r-0' : ''}`}>
                    <span className={`text-[11px] font-mono uppercase text-stone-500 tracking-[0.1em]`}>
                      {item.label}
                    </span>
                  </div>
                  <div className="w-full sm:w-2/3 py-6 px-4 sm:px-8 flex items-center">
                    <span className={`text-lg md:text-xl font-light text-stone-100 ${isRTL ? 'tracking-normal' : 'tracking-[-0.01em]'}`}>
                      {item.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Scope of Services */}
            <div className={`mt-auto ${isRTL ? 'text-right' : 'text-left'}`}>
               <h3 className={`text-xs tracking-[0.2em] font-mono uppercase text-[#A67C52] mb-6`}>
                  {narrativeLabels.scopeOfServices}
               </h3>
               <ul className="flex flex-col gap-3 font-light text-stone-400 text-sm">
                 {(services || []).map((service, idx) => (
                   <li key={idx} className="flex items-center gap-3">
                     <span className="w-1 h-1 bg-stone-600 rounded-full" />
                     {service}
                   </li>
                 ))}
               </ul>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
