import { sidebarModel } from '..';
import { useEffect, useRef } from 'react';
import { cva } from 'class-variance-authority';
import { useAppDispatch } from '@app/app/store/hooks';
import { AppNavigation } from './app-navigation';
import { AppLogo } from './logo';
import { AuthActions } from '@app/features/auth';

export const AppSidebar = () => {
  const dispatch = useAppDispatch();

  const show = sidebarModel.useShowSidebar();
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (barRef.current && !barRef.current.contains(event.target as Node)) {
        dispatch(sidebarModel.actions.close());
      }
    };

    const handlePressEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        dispatch(sidebarModel.actions.close());
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handlePressEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handlePressEscape);
    };
  });

  return (
    <main ref={barRef} className={sideBar({ show })}>
      <AppLogo className='mb-2' />
      <AppNavigation />

      <AuthActions />
    </main>
  );
};

const sideBar = cva(
  'items-center fixed py-4 px-6 top-0 left-0 z-40 flex flex-col h-full border-r-[1px] border-gray-100/10  bg-white transition-transform duration-200 -translate-x-full min-w-fit rounded-r-[30px] overflow-hidden w-[52%] sm:w-[39%] md:w-[30%] lg:w-[19%] xl:w-[17%] 2xl:w-[15%] shadow-md',
  {
    variants: {
      show: {
        true: 'translate-x-0',
        false: 'lg:translate-x-0',
      },
    },
  },
);
