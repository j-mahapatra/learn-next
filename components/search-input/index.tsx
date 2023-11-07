'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import qs from 'query-string';

import { useDebounce } from '@/hooks/use-debounce';
import { Input } from '@/components/ui/input';

const SearchInput = () => {
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentCategoryId = searchParams.get('categoryId');

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          categoryId: currentCategoryId,
          title: debouncedValue,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );
    router.push(url);
  }, [debouncedValue, currentCategoryId, router, pathname]);

  return (
    <div className='relative'>
      <Search className='h-4 w-4 absolute top-3 left-3' />
      <Input
        className='w-full md:w-80 pl-8 rounded-sm bg-accent'
        placeholder='Find a course...'
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
