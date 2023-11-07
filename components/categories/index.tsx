'use client';

import { Category } from '@prisma/client';
import {
  CandlestickChart,
  MonitorSmartphone,
  PaintBucket,
  Microscope,
  HeartPulse,
  PersonStanding,
  Store,
  Music,
  Video,
  Speech,
  LucideIcon,
} from 'lucide-react';
import CategoryItem from './partials/category-item';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface CategoriesProps {
  items: Category[];
}

const IconMap: Record<Category['name'], LucideIcon> = {
  Business: CandlestickChart,
  'Computer Science': MonitorSmartphone,
  Design: PaintBucket,
  Engineering: Microscope,
  'Health & Fitness': HeartPulse,
  Lifestyle: PersonStanding,
  Marketing: Store,
  Music: Music,
  'Photography & Video': Video,
  'Soft Skill': Speech,
};

const Categories = ({ items }: CategoriesProps) => {
  return (
    <ScrollArea className='w-full whitespace-nowrap rounded-md border'>
      <div className='flex w-max space-x-4 p-4'>
        {items.map((item) => (
          <CategoryItem
            key={item.id}
            label={item.name}
            icon={IconMap[item.name]}
            value={item.id}
          />
        ))}
      </div>
      <ScrollBar orientation='horizontal' />
    </ScrollArea>
  );
};

export default Categories;
