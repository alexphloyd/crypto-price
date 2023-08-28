import { cva } from 'class-variance-authority';

export const loader = cva(['animate-spin inline-block self-center border-current border-t-transparent rounded-full'], {
  variants: {
    color: {
      blue: 'text-blue-600',
      white: 'text-zinc-300',
    },
    size: {
      sm: ['h-6 w-6 border-[2px]'],
      md: ['h-8 w-8 border-[3px]'],
    },
  },
});
