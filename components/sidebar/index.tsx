'use client';

import { Logo } from '@/components/logo';
import {
  GraduationCap,
  ArrowUpRightFromCircle,
  BookOpenText,
  BarChart3,
} from 'lucide-react';

import SidebarItem from './partials/sidebar-item';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname();
  const isInstructorPage = pathname?.startsWith('/instructor');

  const studentRoutes = [
    {
      icon: GraduationCap,
      label: 'Dashboard',
      href: '/',
    },
    {
      icon: ArrowUpRightFromCircle,
      label: 'Explore',
      href: '/search',
    },
  ];

  const instructorRoutes = [
    {
      icon: BookOpenText,
      label: 'Courses',
      href: '/instructor/courses',
    },
    {
      icon: BarChart3,
      label: 'Analytics',
      href: '/instructor/analytics',
    },
  ];

  const routes = isInstructorPage ? instructorRoutes : studentRoutes;

  return (
    <aside className='flex flex-col h-full border-r-2 overflow-y-auto'>
      <div className='flex items-center justify-center p-5'>
        <Logo />
      </div>
      <div className='flex flex-col w-full'>
        {routes.map((route) => (
          <div key={route.label} className='flex'>
            <SidebarItem
              Icon={route.icon}
              label={route.label}
              href={route.href}
            />
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
