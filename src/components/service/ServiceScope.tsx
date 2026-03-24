'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ScopeItem {
  title: string;
  description: string;
}

interface ServiceScopeProps {
  title: string;
  description: string;
  items: ScopeItem[];
}

export const ServiceScope: React.FC<ServiceScopeProps> = ({ title, description, items }) => {
  return (
    <section style={{ padding: '8rem 0', backgroundColor: 'var(--color-surface-0)', borderBottom: '1px solid var(--color-hairline)' }}>
      <div className="container">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem' }}>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ flex: '1 1 300px' }}
          >
            {title && (
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: '2rem', color: 'var(--color-obsidian)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                {title}
              </h2>
            )}
            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.8, fontSize: '1.25rem', maxWidth: '500px' }}>
              {description}
            </p>
          </motion.div>
          
          <div style={{ flex: '2 1 500px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem 3rem' }}>
            {items.map((item, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{ 
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative'
                }}
              >
                {/* Visual marker: Vertical line like a construction joint or wall detail */}
                <div style={{ 
                  width: '1px', 
                  height: '2rem', 
                  backgroundColor: 'var(--color-sand)', 
                  marginBottom: '1.5rem',
                  opacity: 0.8
                }} />
                
                <h3 style={{ 
                  fontSize: '0.85rem', 
                  fontWeight: 700, 
                  color: 'var(--color-sand)', 
                  marginBottom: '1rem', 
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase'
                }}>
                  {item.title}
                </h3>
                <p style={{ 
                  fontSize: '1.125rem', 
                  lineHeight: 1.6, 
                  color: 'var(--color-text-primary)',
                  fontWeight: 500,
                  maxWidth: '30ch'
                }}>
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
};
