import { VariantProps } from 'class-variance-authority';
import { loader } from './styles';

export const Loader = ({ size = 'sm', color = 'blue' }: VariantProps<typeof loader>) => {
  return (
    <div
      className={loader({ color, size })}
      role='status'
    >
      <span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
        Loading...
      </span>
    </div>
  );
};
