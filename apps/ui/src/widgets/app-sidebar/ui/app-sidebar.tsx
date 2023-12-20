import { sidebarModel } from '..';
import { useEffect, useRef } from 'react';
import { useAppDispatch } from '@app/app/store/hooks';
import { AppNavigation } from './app-navigation';
import { AppLogo } from './logo';
import { AuthActions } from '@app/features/auth';
import { barStyles } from './styles';

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
    <main ref={barRef} className={barStyles({ show })}>
      <AppLogo className='mb-4' />
      <AppNavigation />
      <AuthActions />
    </main>
  );
};
