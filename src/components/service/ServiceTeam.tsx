import React from 'react';

interface ServiceTeamProps {
  title: string;
  lead: string;
  bio: string;
}

export const ServiceTeam: React.FC<ServiceTeamProps> = ({ title, lead, bio }) => {
  return (
    <section style={{ padding: '7rem 0', borderBottom: '1px solid var(--color-hairline)' }}>
      <div className="container">
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '4rem', 
          flexWrap: 'wrap',
          backgroundColor: 'var(--color-obsidian)',
          color: 'var(--color-surface-0)',
          padding: '4rem',
          borderRadius: 'var(--radius-2xl)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ flex: '1 1 300px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '2rem', opacity: 0.9 }}>
              {title}
            </h2>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-sand)', marginBottom: '1rem' }}>
              {lead}
            </h3>
            <p style={{ fontSize: '1rem', lineHeight: 1.8, opacity: 0.7 }}>
              {bio}
            </p>
          </div>
          <div style={{ flex: '0 0 200px', height: '260px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-xl)', border: '1px solid rgba(255,255,255,0.1)' }}>
            {/* Profile image placeholder */}
          </div>
        </div>
      </div>
    </section>
  );
};
