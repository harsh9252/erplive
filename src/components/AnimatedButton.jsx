import React, { useState } from 'react';
import { FiLoader } from 'react-icons/fi';

const ButtonVariants = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  SUCCESS: 'success',
  DANGER: 'danger',
  WARNING: 'warning',
  INFO: 'info',
  GHOST: 'ghost',
  OUTLINE: 'outline',
};

const ButtonSizes = {
  SMALL: 'sm',
  MEDIUM: 'md',
  LARGE: 'lg',
  EXTRA_LARGE: 'xl',
};

const variantStyles = {
  [ButtonVariants.PRIMARY]: {
    base: 'bg-gradient-to-r from-blue-600 to-blue-700 text-white border-transparent',
    hover: 'hover:from-blue-700 hover:to-blue-800 hover:shadow-lg hover:shadow-blue-500/25',
    active: 'active:from-blue-800 active:to-blue-900',
    focus: 'focus:ring-blue-500',
  },
  [ButtonVariants.SECONDARY]: {
    base: 'bg-gradient-to-r from-gray-600 to-gray-700 text-white border-transparent',
    hover: 'hover:from-gray-700 hover:to-gray-800 hover:shadow-lg hover:shadow-gray-500/25',
    active: 'active:from-gray-800 active:to-gray-900',
    focus: 'focus:ring-gray-500',
  },
  [ButtonVariants.SUCCESS]: {
    base: 'bg-gradient-to-r from-green-600 to-green-700 text-white border-transparent',
    hover: 'hover:from-green-700 hover:to-green-800 hover:shadow-lg hover:shadow-green-500/25',
    active: 'active:from-green-800 active:to-green-900',
    focus: 'focus:ring-green-500',
  },
  [ButtonVariants.DANGER]: {
    base: 'bg-gradient-to-r from-red-600 to-red-700 text-white border-transparent',
    hover: 'hover:from-red-700 hover:to-red-800 hover:shadow-lg hover:shadow-red-500/25',
    active: 'active:from-red-800 active:to-red-900',
    focus: 'focus:ring-red-500',
  },
  [ButtonVariants.WARNING]: {
    base: 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white border-transparent',
    hover: 'hover:from-yellow-600 hover:to-yellow-700 hover:shadow-lg hover:shadow-yellow-500/25',
    active: 'active:from-yellow-700 active:to-yellow-800',
    focus: 'focus:ring-yellow-500',
  },
  [ButtonVariants.INFO]: {
    base: 'bg-gradient-to-r from-cyan-600 to-cyan-700 text-white border-transparent',
    hover: 'hover:from-cyan-700 hover:to-cyan-800 hover:shadow-lg hover:shadow-cyan-500/25',
    active: 'active:from-cyan-800 active:to-cyan-900',
    focus: 'focus:ring-cyan-500',
  },
  [ButtonVariants.GHOST]: {
    base: 'bg-transparent text-gray-700 border-transparent',
    hover: 'hover:bg-gray-100 hover:text-gray-900',
    active: 'active:bg-gray-200',
    focus: 'focus:ring-gray-500',
  },
  [ButtonVariants.OUTLINE]: {
    base: 'bg-transparent text-blue-600 border-blue-600',
    hover: 'hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-500/25',
    active: 'active:bg-blue-700',
    focus: 'focus:ring-blue-500',
  },
};

const sizeStyles = {
  [ButtonSizes.SMALL]: 'px-3 py-1.5 text-sm rounded-lg',
  [ButtonSizes.MEDIUM]: 'px-4 py-2 text-sm rounded-xl',
  [ButtonSizes.LARGE]: 'px-6 py-3 text-base rounded-xl',
  [ButtonSizes.EXTRA_LARGE]: 'px-8 py-4 text-lg rounded-2xl',
};

export function AnimatedButton({
  children,
  variant = ButtonVariants.PRIMARY,
  size = ButtonSizes.MEDIUM,
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  onClick,
  className = '',
  animationType = 'scale', // 'scale', 'bounce', 'pulse', 'shake', 'glow'
  ...props
}) {
  const [isPressed, setIsPressed] = useState(false);
  const [ripples, setRipples] = useState([]);

  const variantStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size];

  const handleClick = (e) => {
    if (disabled || loading) return;

    // Create ripple effect
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    const newRipple = {
      x,
      y,
      size,
      id: Date.now(),
    };

    setRipples(prev => [...prev, newRipple]);
    
    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);

    onClick?.(e);
  };

  const getAnimationClass = () => {
    switch (animationType) {
      case 'bounce':
        return 'hover:animate-bounce';
      case 'pulse':
        return 'hover:animate-pulse';
      case 'shake':
        return 'hover:animate-shake';
      case 'glow':
        return 'hover:animate-glow';
      case 'scale':
      default:
        return 'hover:scale-105 active:scale-95';
    }
  };

  return (
    <button
      className={`
        relative overflow-hidden font-medium border transition-all duration-200 ease-out
        ${sizeStyle}
        ${variantStyle.base}
        ${variantStyle.hover}
        ${variantStyle.active}
        ${variantStyle.focus}
        ${getAnimationClass()}
        ${disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${isPressed ? 'transform scale-95' : ''}
        focus:outline-none focus:ring-2 focus:ring-offset-2
        ${className}
      `}
      onClick={handleClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      disabled={disabled || loading}
      {...props}
    >
      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full animate-ping"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            animationDuration: '600ms',
          }}
        />
      ))}

      {/* Button content */}
      <span className="relative flex items-center justify-center gap-2">
        {loading ? (
          <FiLoader className="w-4 h-4 animate-spin" />
        ) : (
          leftIcon && <span className="flex-shrink-0">{leftIcon}</span>
        )}
        
        <span className={loading ? 'opacity-70' : ''}>
          {children}
        </span>
        
        {!loading && rightIcon && (
          <span className="flex-shrink-0">{rightIcon}</span>
        )}
      </span>

      {/* Shine effect */}
      <div className="absolute inset-0 -top-px overflow-hidden rounded-inherit">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:animate-shimmer" />
      </div>
    </button>
  );
}

// Floating Action Button
export function FloatingActionButton({
  children,
  onClick,
  className = '',
  variant = ButtonVariants.PRIMARY,
  size = 'lg',
  ...props
}) {
  return (
    <AnimatedButton
      variant={variant}
      size={size}
      onClick={onClick}
      className={`
        fixed bottom-6 right-6 z-50 rounded-full shadow-2xl
        hover:shadow-3xl hover:-translate-y-1
        ${className}
      `}
      animationType="bounce"
      {...props}
    >
      {children}
    </AnimatedButton>
  );
}

// Button Group
export function ButtonGroup({ children, className = '', orientation = 'horizontal' }) {
  return (
    <div 
      className={`
        inline-flex ${orientation === 'vertical' ? 'flex-col' : 'flex-row'}
        ${orientation === 'horizontal' ? 'rounded-xl' : 'rounded-xl'}
        overflow-hidden shadow-lg
        ${className}
      `}
    >
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            className: `
              ${child.props.className || ''}
              ${orientation === 'horizontal' 
                ? (index === 0 ? 'rounded-r-none' : index === React.Children.count(children) - 1 ? 'rounded-l-none' : 'rounded-none')
                : (index === 0 ? 'rounded-b-none' : index === React.Children.count(children) - 1 ? 'rounded-t-none' : 'rounded-none')
              }
              ${orientation === 'horizontal' ? 'border-r-0 last:border-r' : 'border-b-0 last:border-b'}
            `,
          });
        }
        return child;
      })}
    </div>
  );
}

export { ButtonVariants, ButtonSizes };
export default AnimatedButton;