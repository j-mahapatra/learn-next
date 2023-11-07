import { db } from '@/lib/database';
import Categories from '@/components/categories';
import SearchInput from '@/components/search-input';

export default async function SearchPage() {
  const categories = await db.category.findMany({
    orderBy: {
      name: 'asc',
    },
  });
  return (
    <>
      <div className='px-5 pt-5 block md:hidden md:mb-0'>
        <SearchInput />
      </div>
      <div className='p-5'>
        <Categories items={categories} />
      </div>
    </>
  );
}
