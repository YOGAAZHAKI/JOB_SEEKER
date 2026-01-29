import { Briefcase, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoProps {
  variant?: 'default' | 'light';
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const Logo = ({ variant = 'default', size = 'md', showText = true }: LogoProps) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10',
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className="flex items-center gap-2">
      <div
        className={cn(
          'relative flex items-center justify-center rounded-xl bg-gradient-accent p-2',
          sizeClasses[size]
        )}
      >
        <Briefcase className="h-4 w-4 text-accent-foreground" />
        <TrendingUp className="absolute -right-1 -top-1 h-3 w-3 text-accent" />
      </div>
      {showText && (
        <span
          className={cn(
            'font-display font-bold tracking-tight',
            textSizeClasses[size],
            variant === 'light' ? 'text-primary-foreground' : 'text-foreground'
          )}
        >
          SkillBridge
        </span>
      )}
    </div>
  );
};
