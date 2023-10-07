import { Outlet } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { MainNav } from './main-nav';

export function Root() {
  return (
    <div
      className="md:h-full md:overflow-hidden md:grid md:grid-rows-[auto_1fr] bg-white dark:bg-slate-950"
      data-theme="light"
    >
      <header className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
        <MainNav />
      </header>
      <div className="md:h-full md:overflow-hidden md:grid">
        <Outlet />
      </div>
      <Toaster />
    </div>
  );
}
