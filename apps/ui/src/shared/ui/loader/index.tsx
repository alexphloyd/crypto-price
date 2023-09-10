import { VariantProps } from 'class-variance-authority';
import { loader } from './styles';

export const Loader = ({ size, color }: VariantProps<typeof loader>) => {
  return <figure className={loader({ size, color })} />;
};
