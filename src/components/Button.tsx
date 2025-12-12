import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseStyles = 'font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-minecraft-accent focus:ring-offset-2 focus:ring-offset-minecraft-dark whitespace-nowrap min-w-fit';

  const variantStyles = {
    primary: 'bg-gradient-accent text-minecraft-dark hover:shadow-neon-green',
    secondary: 'bg-minecraft-accent/20 text-minecraft-accent border border-minecraft-accent hover:bg-minecraft-accent/30',
    accent: 'bg-minecraft-accent text-minecraft-dark hover:shadow-neon-cyan',
  };

  const sizeStyles = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
