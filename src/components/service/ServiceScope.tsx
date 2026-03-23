import React from 'react';

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
    <section style={{ padding: '7rem 0', borderBottom: '1px solid var(--color-hairline)' }}>
      <div className="container">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem' }}>
          <div style={{ flex: '1 1 300px' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem', color: 'var(--color-obsidian)' }}>
              {title}
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.8, fontSize: '1.125rem' }}>
              {description}
            </p>
          </div>
          <div style={{ flex: '2 1 500px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2.5rem' }}>
            {items.map((item, idx) => (
              <div key={idx} style={{ padding: '2rem', backgroundColor: 'var(--color-surface-1)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-hairline)' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--color-obsidian)' }}>{item.title}</h3>
                <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--color-text-secondary)' }}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
