import { AlertTriangle, CheckCircleIcon } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const BannerVariants = cva(
  'flex items-center w-full border text-center p-4 text-sm',
  {
    variants: {
      variant: {
        warning: 'bg-secondary-foreground/90 border-ring text-primary',
        success: 'bg-secondary border-ring text-primary',
      },
    },
    defaultVariants: {
      variant: 'warning',
    },
  }
);

interface BannerProps extends VariantProps<typeof BannerVariants> {
  label: string;
}

const iconMap = {
  warning: AlertTriangle,
  success: CheckCircleIcon,
};

const Banner = ({ label, variant }: BannerProps) => {
  const Icon = iconMap[variant || 'warning'];

  return (
    <div className={cn(BannerVariants({ variant }))}>
      <Icon className='h-4 w-4 mr-2' />
      {label}
    </div>
  );
};

export { Banner, BannerVariants };
