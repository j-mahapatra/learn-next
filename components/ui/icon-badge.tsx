import { LucideIcon } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const backgroundVariants = cva(
  'flex rounded-full justify-center items-center',
  {
    variants: {
      variant: {
        default: 'bg-accent',
        success: 'bg-ring',
      },
      size: {
        default: 'p-2',
        md: 'p-[6px]',
        sm: 'p-1',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const iconVariants = cva('', {
  variants: {
    variant: {
      default: 'bg-accent',
      success: 'bg-ring',
    },
    size: {
      default: 'h-8 w-8',
      md: 'h-6 w-6',
      sm: 'h-4 w-4',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

type BackgroundVariantProps = VariantProps<typeof backgroundVariants>;
type IconVariantProps = VariantProps<typeof iconVariants>;

interface IconBadgeProps extends BackgroundVariantProps, IconVariantProps {
  icon: LucideIcon;
  variant?: 'default' | 'success';
  size?: 'default' | 'md' | 'sm';
}

export const IconBadge = ({ icon: Icon, variant, size }: IconBadgeProps) => {
  return (
    <div className={cn(backgroundVariants({ variant, size }))}>
      <Icon className={cn(iconVariants({ variant, size }))} />
    </div>
  );
};
