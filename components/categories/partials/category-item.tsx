import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';
import { LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface CategoryItemProps {
  key?: string;
  label: string;
  icon?: LucideIcon;
  value?: string;
}

const CategoryItem = ({ label, icon: Icon, value }: CategoryItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategoryId = searchParams.get('categoryId');
  const currentTitle = searchParams.get('title');

  const isCategorySelected = currentCategoryId === value;

  const onCategoryClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          title: currentTitle,
          categoryId: isCategorySelected ? null : value,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );
    router.push(url);
  };

  return (
    <Button
      variant='outline'
      className={cn('flex gap-x-2', isCategorySelected && 'bg-secondary')}
      onClick={onCategoryClick}
    >
      {Icon && <Icon className='w-4 h-4' />}
      <p className='truncate'>{label}</p>
    </Button>
  );
};

export default CategoryItem;
