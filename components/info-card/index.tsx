import { LucideIcon } from 'lucide-react';

import { IconBadge } from '@/components/ui/icon-badge';

interface InfoCardProps {
  numberOfItems: number;
  variant?: 'default' | 'success';
  label: string;
  icon: LucideIcon;
}

const InfoCard = ({
  variant,
  icon: Icon,
  numberOfItems,
  label,
}: InfoCardProps) => {
  return (
    <div className='flex items-center gap-x-2 p-2 border rounded-sm'>
      <IconBadge variant={variant} icon={Icon} />
      <div>
        <p className='font-medium'>{label}</p>
        <p className='text-xs italic'>
          {numberOfItems} {numberOfItems === 1 ? 'Course' : 'Courses'}
        </p>
      </div>
    </div>
  );
};

export default InfoCard;
