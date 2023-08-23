import clsx from 'clsx';

export const AppLogo = ({ className }: { className?: string }) => {
  return (
    <main className={clsx('flex items-center', className)}>
      <img src="/logo.png" alt="app-logo" className="w-7 h-7 mr-[10px]" />
      <span className="tracking-wide text-xl font-mono">sync-vision</span>
    </main>
  );
};
