import { cva } from 'class-variance-authority';

export const loader = cva(
  [
    'inline-block animate-spin rounded-full border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]',
  ],
  {
    variants: {
      color: {
        blue: 'text-blue-600',
        white: 'text-neutral-100',
      },
      size: {
        sm: ['h-4 w-4 border-[2px]'],
        md: ['h-6 w-6 border-[3px]'],
      },
    },
  }
);
