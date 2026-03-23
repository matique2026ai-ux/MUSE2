'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { cmsAdd } from '@/lib/cms';
import { useParams } from 'next/navigation';

interface ContactFormProps {
  content: {
    details: {
      emailText: string;
      phoneText: string;
      locationText: string;
    };
    availabilityText: string;
    form: {
      name: string;
      org: string;
      email: string;
      projectTypeLabel: string;
      projectTypes: Array<{ label: string; value: string }>;
      message: string;
      submit: string;
      successMsg: string;
    };
  };
  isRtl: boolean;
  dir: 'ltr' | 'rtl';
  siteConfig?: any;
}

export default function ContactForm({ content, isRtl, dir, siteConfig }: ContactFormProps) {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';

  const [form, setForm] = useState({ name: '', org: '', email: '', projectType: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await cmsAdd('inquiries', {
        name: form.name,
        email: form.email,
        phone: form.org || '',
        subject: form.projectType || 'General Inquiry',
        message: form.message,
        locale,
        status: 'new',
      });
      setIsSubmitted(true);
      setForm({ name: '', org: '', email: '', projectType: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 6000);
    } catch (err) {
      console.error('Failed to save inquiry:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '1rem',
    backgroundColor: 'transparent',
    border: '1px solid var(--color-hairline)',
    color: 'var(--color-text-primary)',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
      {/* DETAILS */}
      <div className={`lg:col-span-5 flex flex-col gap-12 ${isRtl ? 'order-2 lg:order-1' : ''}`} style={{ textAlign: isRtl ? 'right' : 'left' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <Mail size={24} color="var(--color-sand)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <span style={{ fontSize: '1.25rem', fontWeight: 500 }}>{siteConfig?.email || content.details.emailText}</span>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <Phone size={24} color="var(--color-sand)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <span style={{ fontSize: '1.25rem', fontWeight: 500 }} dir="ltr">{siteConfig?.phone || content.details.phoneText}</span>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <MapPin size={24} color="var(--color-sand)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <span style={{ fontSize: '1.25rem', fontWeight: 500, lineHeight: 1.5, maxWidth: '40ch' }}>{siteConfig?.address?.[locale] || content.details.locationText}</span>
          </div>
        </div>
        <div style={{ paddingTop: '2.5rem', borderTop: '1px solid var(--color-hairline)' }}>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.6, color: 'var(--color-text-secondary)', maxWidth: '45ch' }}>{content.availabilityText}</p>
        </div>
      </div>

      {/* FORM */}
      <div className={`lg:col-span-7 ${isRtl ? 'order-1 lg:order-2' : ''}`} style={{ textAlign: isRtl ? 'right' : 'left' }}>
        <div style={{ padding: '3rem', backgroundColor: 'var(--color-surface-1)', border: '1px solid var(--color-hairline)' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>{content.form.name} *</label>
                <input type="text" required value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} style={{ ...inputStyle, textAlign: isRtl ? 'right' : 'left' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>{content.form.org}</label>
                <input type="text" value={form.org} onChange={e => setForm(f => ({...f, org: e.target.value}))} style={{ ...inputStyle, textAlign: isRtl ? 'right' : 'left' }} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>{content.form.email} *</label>
                <input type="email" required dir="ltr" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} style={{ ...inputStyle, textAlign: isRtl ? 'right' : 'left' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>{content.form.projectTypeLabel} *</label>
                <select required value={form.projectType} onChange={e => setForm(f => ({...f, projectType: e.target.value}))} style={{ ...inputStyle, textAlign: isRtl ? 'right' : 'left', appearance: 'none' }} dir={dir}>
                  {content.form.projectTypes.map((pt, i) => (
                    <option key={i} value={pt.value} disabled={pt.value === ''}>{pt.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>{content.form.message} *</label>
              <textarea required value={form.message} onChange={e => setForm(f => ({...f, message: e.target.value}))} style={{ ...inputStyle, textAlign: isRtl ? 'right' : 'left', minHeight: '150px', resize: 'vertical' }} />
            </div>
            <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              <button type="submit" disabled={submitting} style={{ padding: '1rem 2.5rem', backgroundColor: 'var(--color-obsidian)', color: 'white', fontWeight: 600, border: 'none', cursor: submitting ? 'wait' : 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem', opacity: submitting ? 0.7 : 1 }}>
                {submitting ? <Loader2 size={18} className="animate-spin" /> : <ArrowRight size={18} className={isRtl ? 'rotate-180' : ''} />}
                {content.form.submit}
              </button>
              {isSubmitted && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981', fontWeight: 500 }}>
                  <CheckCircle2 size={20} />
                  {content.form.successMsg}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
