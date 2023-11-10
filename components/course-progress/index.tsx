import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

interface CourseProgressProps {
  value: number;
  variant?: 'default' | 'success';
  size?: 'default' | 'sm';
}

const colorByVariant = {
  default: 'text-primary-foreground/90',
  success: 'text-ring',
};

const sizeByVariant = {
  default: 'text-sm',
  sm: 'text-xs',
};

const CourseProgress = ({ value, variant, size }: CourseProgressProps) => {
  return (
    <div className='mb-2'>
      <Progress className='h-2' value={value} variant={variant} />
      <p
        className={cn(
          'font-medium my-1 text-secondary text-center',
          colorByVariant[variant || 'default'],
          sizeByVariant[size || 'default']
        )}
      >
        {Math.round(value)}% Completed
      </p>
    </div>
  );
};

export default CourseProgress;
