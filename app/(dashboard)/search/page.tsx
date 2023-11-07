import { db } from '@/lib/database';
import Categories from '@/components/categories';

export default async function SearchPage() {
  const categories = await db.category.findMany({
    orderBy: {
      name: 'asc',
    },
  });
  return (
    <div className='p-5'>
      <Categories items={categories} />
    </div>
  );
}
