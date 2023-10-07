import React from 'react';
import { cn } from '@/lib/utils';

type LayoutProps = {
  children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
  let sidebar: React.ReactNode;
  let main: React.ReactNode;

  React.Children.forEach(children, child => {
    if (React.isValidElement(child)) {
      if (child.type === LayoutSidebar) {
        sidebar = child;
      } else if (child.type === LayoutMain) {
        main = child;
      }
    }
  });

  return (
    <div
      className={cn(
        'md:h-full md:overflow-hidden md:grid',
        sidebar ? 'md:grid-cols-[20rem_1fr]' : 'md:grid-cols-[1fr]'
      )}
    >
      {sidebar}
      {main}
    </div>
  );
}

function LayoutSidebar({ children }: LayoutProps) {
  return (
    <aside className="overflow-y-auto bg-white dark:bg-slate-950 md:border-r border-slate-200 dark:border-slate-800">
      {children}
    </aside>
  );
}

function LayoutMain({ children }: LayoutProps) {
  return (
    <main className="overflow-y-auto bg-white dark:bg-slate-950">
      {children}
    </main>
  );
}

export { Layout, LayoutSidebar, LayoutMain };
