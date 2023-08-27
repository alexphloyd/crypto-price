import { VariantProps } from 'class-variance-authority';
import { loader } from './styles';

export const Loader = ({ size = 'sm', color = 'white' }: VariantProps<typeof loader>) => {
  return (
    <div className={loader({ size, color })}>
      <span className='sr-only'>Loading...</span>
    </div>
  );
};
