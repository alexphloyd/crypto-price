import { Outlet, ScrollRestoration } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { AppSidebar, ToggleAppSidebar } from '@app/widgets/app-sidebar';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface Props {
  showSidebar: boolean;
  isGlobalLoading: boolean;
}

export function Layout({ isGlobalLoading, showSidebar }: Props) {
  const [loadingSimulation, setLoadingSimulation] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoadingSimulation(false), 800);
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
            className={twMerge(
              showSidebar && 'blur-[3px] overflow-hidden pointer-events-none',
              'flex-auto min-h-screen bg-white px-[5%] lg:pl-[27%] xl:pl-[24%] 2xl:pl-[20%] pb-16 pt-12 lg:pt-10',
            )}
          >
            <Outlet />
          </section>

          <ScrollRestoration />
        </motion.main>
      )}
    </AnimatePresence>
  );
}

function Loader() {
  return (
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
}
