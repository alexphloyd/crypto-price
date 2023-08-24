import { Outlet, ScrollRestoration } from 'react-router-dom';
import clsx from 'clsx';
import { AppSidebar, ToggleAppSidebar, sidebarModel } from '@app/widgets/app-sidebar';

export default function Layout() {
  const isSidebarOpen = sidebarModel.useShowSidebar();

  return (
    <main className='flex flex-row min-h-full'>
      <ToggleAppSidebar />
      <AppSidebar />

      <section
        className={clsx(
          isSidebarOpen && 'blur-[3px] overflow-hidden pointer-events-none',
          'flex-auto h-screen bg-white px-[3.5%] py-2 lg:pl-[19%] xl:pl-[17%] 2xl:pl-[15%] pt-11 md:pt-14',
        )}
      >
        <Outlet />
      </section>

      <ScrollRestoration />
    </main>
  );
}
