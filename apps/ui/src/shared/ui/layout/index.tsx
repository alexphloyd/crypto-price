import { Outlet, ScrollRestoration } from 'react-router-dom';
import clsx from 'clsx';
import { AppSidebar, ToggleAppSidebar } from '@app/widgets/app-sidebar';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface Props {
  showSidebar: boolean;
  isGlobalLoading: boolean;
}

export const Layout = ({ isGlobalLoading, showSidebar }: Props) => {
  const [loadingSimulation, setLoadingSimulation] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoadingSimulation(false), 1000);
  }, []);

  return (
    <AnimatePresence>
      {isGlobalLoading || loadingSimulation ? (
        <Loader key='loader' />
      ) : (
        <motion.main
          key='layout'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className='flex flex-row min-h-full'
        >
          <ToggleAppSidebar />
          <AppSidebar />

          <section
            className={clsx(
              showSidebar && 'blur-[3px] overflow-hidden pointer-events-none',
              'flex-auto min-h-screen bg-white px-[3.5%] lg:pl-[19%] xl:pl-[17%] 2xl:pl-[15%] pt-11 pb-16 md:pt-10',
            )}
          >
            <Outlet />
          </section>

          <ScrollRestoration />
        </motion.main>
      )}
    </AnimatePresence>
  );
};

const Loader = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0 }}
    transition={{ delay: 0.3 }}
    className='fixed top-0 left-0 w-full h-full flex justify-center items-center'
  >
    <motion.div className='w-16 h-16 border-t-4 border-cyan-600 border-solid rounded-full animate-spin' />
  </motion.div>
);
