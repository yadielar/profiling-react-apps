import { cva } from 'class-variance-authority';

const typographyVariants = cva('font-sans', {
  variants: {
    variant: {
      h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
      h2: 'scroll-m-20 text-3xl font-semibold tracking-tight border-b transition-colors first:mt-0 pb-2',
      h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
      h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
      p: 'text-base [&:not(:first-child)]:mt-4',
    },
  },
  defaultVariants: {
    variant: 'p',
  },
});

type TypographyProps = {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'p';
  component?: 'h1' | 'h2' | 'h3' | 'h4' | 'p';
  children?: React.ReactNode;
};

export function Typography({ variant, component, children }: TypographyProps) {
  const Comp = component ?? variant ?? 'p';
  return <Comp className={typographyVariants({ variant })}>{children}</Comp>;
}
