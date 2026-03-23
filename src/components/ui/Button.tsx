import { forwardRef } from 'react';

/* ── Types ────────────────────────────────────────────────────── */
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize    = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

/* ── Style maps ───────────────────────────────────────────────── */
const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    backgroundColor: 'var(--color-obsidian)',
    color: 'var(--color-text-inverse)',
    border: '1px solid var(--color-obsidian)',
  },
  secondary: {
    backgroundColor: 'transparent',
    color: 'var(--color-text-primary)',
    border: '1px solid var(--color-text-primary)',
  },
  ghost: {
    backgroundColor: 'transparent',
    color: 'var(--color-text-secondary)',
    border: '1px solid transparent',
  },
  danger: {
    backgroundColor: '#c0392b',
    color: '#ffffff',
    border: '1px solid #c0392b',
  },
};

const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
  sm: { fontSize: '0.8125rem', padding: '0.375rem 0.875rem', height: '2rem' },
  md: { fontSize: '0.875rem',  padding: '0.5rem 1.25rem',   height: '2.5rem' },
  lg: { fontSize: '1rem',      padding: '0.75rem 1.75rem',  height: '3rem' },
};

/* ── Component ────────────────────────────────────────────────── */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      style,
      ...rest
    },
    ref,
  ) => {
    const isDisabled = disabled || isLoading;

    const baseStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      borderRadius: 'var(--radius-md)',
      fontWeight: 500,
      lineHeight: 1,
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      opacity: isDisabled ? 0.5 : 1,
      transition: 'opacity 150ms ease, background-color 150ms ease, transform 100ms ease',
      userSelect: 'none',
      textDecoration: 'none',
      whiteSpace: 'nowrap',
      ...variantStyles[variant],
      ...sizeStyles[size],
      ...style,
    };

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        aria-busy={isLoading}
        style={baseStyle}
        onMouseDown={(e) => {
          if (!isDisabled) {
            (e.currentTarget as HTMLElement).style.transform = 'scale(0.98)';
          }
          rest.onMouseDown?.(e);
        }}
        onMouseUp={(e) => {
          (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
          rest.onMouseUp?.(e);
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
          rest.onMouseLeave?.(e);
        }}
        {...rest}
      >
        {isLoading ? (
          <span
            aria-hidden="true"
            style={{
              display: 'inline-block',
              width: '1em',
              height: '1em',
              border: '2px solid currentColor',
              borderTopColor: 'transparent',
              borderRadius: '50%',
              animation: 'button-spin 0.6s linear infinite',
            }}
          />
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
        <style>{`
          @keyframes button-spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </button>
    );
  },
);

Button.displayName = 'Button';
export default Button;
