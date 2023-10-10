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

type LayoutSidebarProps = {
  children: React.ReactNode;
};

function LayoutSidebar({ children }: LayoutSidebarProps) {
  return (
    <aside className="md:overflow-y-auto bg-white dark:bg-slate-950 md:border-r border-slate-200 dark:border-slate-800">
      {children}
    </aside>
  );
}

type LayoutMainProps = {
  hideOverflow?: boolean;
  children: React.ReactNode;
};

function LayoutMain({ children, hideOverflow = false }: LayoutMainProps) {
  return (
    <main
      className={cn(
        'bg-white dark:bg-slate-950',
        hideOverflow ? 'md:h-full md:overflow-hidden' : 'md:overflow-y-auto'
      )}
    >
      {children}
    </main>
  );
}

export { Layout, LayoutSidebar, LayoutMain };
