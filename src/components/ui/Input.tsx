import { forwardRef } from 'react';

/* ── Types ────────────────────────────────────────────────────── */
type InputSize = 'sm' | 'md' | 'lg';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  inputSize?: InputSize;
  leftDecoration?: React.ReactNode;
  rightDecoration?: React.ReactNode;
}

/* ── Size map ─────────────────────────────────────────────────── */
const sizeMap: Record<InputSize, { fontSize: string; padding: string; height: string }> = {
  sm: { fontSize: '0.8125rem', padding: '0 0.75rem',  height: '2rem' },
  md: { fontSize: '0.875rem',  padding: '0 0.875rem', height: '2.75rem' },
  lg: { fontSize: '1rem',      padding: '0 1rem',     height: '3.25rem' },
};

/* ── Component ────────────────────────────────────────────────── */
const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      hint,
      inputSize = 'md',
      leftDecoration,
      rightDecoration,
      id,
      disabled,
      style,
      ...rest
    },
    ref,
  ) => {
    const inputId = id ?? (label ? `input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);
    const hintId  = hint  ? `${inputId}-hint`  : undefined;
    const errorId = error ? `${inputId}-error` : undefined;
    const sizing  = sizeMap[inputSize];

    const borderColor = error
      ? '#c0392b'
      : 'var(--color-hairline)';

    const wrapperStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      height: sizing.height,
      border: `1.5px solid ${borderColor}`,   // explicit full boundary on all 4 sides
      borderRadius: 'var(--radius-md)',
      backgroundColor: disabled ? 'var(--color-surface-2)' : 'var(--color-surface-0)',
      overflow: 'hidden',
      transition: 'border-color 150ms ease, box-shadow 150ms ease',
    };

    const inputStyle: React.CSSProperties = {
      flex: 1,
      width: '100%',
      height: '100%',
      fontSize: sizing.fontSize,
      padding: sizing.padding,
      border: 'none',           // border is on the wrapper, not the input itself
      outline: 'none',
      background: 'transparent',
      color: disabled ? 'var(--color-text-muted)' : 'var(--color-text-primary)',
      cursor: disabled ? 'not-allowed' : 'text',
      ...style,
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', width: '100%' }}>
        {label && (
          <label
            htmlFor={inputId}
            style={{
              fontSize: '0.8125rem',
              fontWeight: 500,
              color: 'var(--color-text-secondary)',
              userSelect: 'none',
            }}
          >
            {label}
          </label>
        )}

        <div
          style={wrapperStyle}
          onFocus={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-sand)';
            (e.currentTarget as HTMLElement).style.boxShadow =
              '0 0 0 3px rgba(201, 185, 154, 0.2)';
          }}
          onBlur={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = borderColor;
            (e.currentTarget as HTMLElement).style.boxShadow = 'none';
          }}
        >
          {leftDecoration && (
            <span
              aria-hidden="true"
              style={{
                display: 'flex',
                alignItems: 'center',
                paddingInlineStart: '0.75rem',
                color: 'var(--color-text-muted)',
                flexShrink: 0,
              }}
            >
              {leftDecoration}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={[hintId, errorId].filter(Boolean).join(' ') || undefined}
            style={inputStyle}
            {...rest}
          />
          {rightDecoration && (
            <span
              aria-hidden="true"
              style={{
                display: 'flex',
                alignItems: 'center',
                paddingInlineEnd: '0.75rem',
                color: 'var(--color-text-muted)',
                flexShrink: 0,
              }}
            >
              {rightDecoration}
            </span>
          )}
        </div>

        {hint && !error && (
          <p id={hintId} style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: 0 }}>
            {hint}
          </p>
        )}
        {error && (
          <p
            id={errorId}
            role="alert"
            style={{ fontSize: '0.75rem', color: '#c0392b', margin: 0, fontWeight: 500 }}
          >
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
export default Input;
