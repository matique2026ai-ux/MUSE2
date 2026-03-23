import React from 'react';

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
    <section style={{ padding: '7rem 0', backgroundColor: 'var(--color-surface-1)' }}>
      <div className="container">
        <h2 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 700, marginBottom: '4rem', color: 'var(--color-obsidian)' }}>
          {title}
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
          gap: '2rem',
          position: 'relative'
        }}>
          {steps.map((step, idx) => (
            <div key={idx} style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ 
                width: '3rem', 
                height: '3rem', 
                borderRadius: '50%', 
                backgroundColor: 'var(--color-obsidian)', 
                color: 'var(--color-sand)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontSize: '0.875rem',
                fontWeight: 700,
                marginBottom: '1.5rem'
              }}>
                {String(idx + 1).padStart(2, '0')}
              </div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--color-obsidian)' }}>{step.label}</h3>
              <p style={{ fontSize: '0.9375rem', lineHeight: 1.7, color: 'var(--color-text-secondary)' }}>{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
