import { cva } from 'class-variance-authority';

export const barStyles = cva(
  'shadow-r-sm items-center fixed py-5 px-6 top-0 left-0 z-40 flex flex-col h-full border-r-[1px] border-gray-100/10  bg-white transition-transform duration-200 -translate-x-full min-w-fit rounded-r-[30px] overflow-hidden w-[52%] sm:w-[39%] md:w-[30%] lg:w-[19%] xl:w-[17%] 2xl:w-[15%]',
  {
    variants: {
      show: {
        true: 'translate-x-0',
        false: 'lg:translate-x-0',
      },
    },
  },
);
