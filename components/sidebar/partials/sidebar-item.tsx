'use client';

import { usePathname, useRouter } from 'next/navigation';

import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const SidebarItem = ({
  Icon,
  label,
  href,
}: {
  Icon: LucideIcon;
  label: string;
  href: string;
}) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleRouteClick = () => {
    router.push(href);
  };

  const isRouteActive =
    (pathname === '/' && href === '/') ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  return (
    <>
      <button
        type='button'
        className={cn(
          'flex w-full py-3 items-center gap-x-3 text-sm font-normal pl-6 transition-all',
          isRouteActive ? 'bg-accent' : 'hover:bg-ring'
        )}
        onClick={handleRouteClick}
      >
        <>
          <Icon />
        </>
        <>{label}</>
      </button>
      <div
        className={cn(
          'flex right-0 border-2 transition-all border-primary',
          isRouteActive ? 'opacity-100' : 'opacity-0'
        )}
      />
    </>
  );
};

export default SidebarItem;
