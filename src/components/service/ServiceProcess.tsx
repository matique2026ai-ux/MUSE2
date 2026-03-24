'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ProcessStep {
  label: string;
  text: string;
}

interface ServiceProcessProps {
  title: string;
  steps: ProcessStep[];
}

export const ServiceProcess: React.FC<ServiceProcessProps> = ({ title, steps }) => {
  return (
    <section style={{ padding: '8rem 0', backgroundColor: 'var(--color-surface-1)' }}>
      <div className="container">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, marginBottom: '5rem', color: 'var(--color-obsidian)', letterSpacing: '-0.02em' }}
        >
          {title}
        </motion.h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
          gap: '3rem',
          position: 'relative'
        }}>
          {steps.map((step, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: 'relative', zIndex: 1, paddingBottom: '2rem' }}
            >
              {/* Massive subtle number as background pattern */}
              <div style={{ 
                position: 'absolute',
                top: '-1rem',
                left: '-0.5rem',
                fontSize: '5rem',
                fontWeight: 800,
                color: 'var(--color-obsidian)',
                opacity: 0.05,
                zIndex: -1,
                lineHeight: 1
              }}>
                {idx + 1}
              </div>

              <h3 style={{ 
                fontSize: '1.25rem', 
                fontWeight: 800, 
                marginBottom: '1rem', 
                color: 'var(--color-obsidian)',
                letterSpacing: '-0.01em'
              }}>
                {step.label}
              </h3>
              <p style={{ 
                fontSize: '0.95rem', 
                lineHeight: 1.8, 
                color: 'var(--color-text-secondary)',
                fontWeight: 400
              }}>
                {step.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
