import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delay?: number) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const delayTimer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(delayTimer);
    };
  }, [value, delay]);

  return debouncedValue;
}
