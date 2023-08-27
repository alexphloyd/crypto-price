import { Topic } from '@app/shared/ui/topic';
import { NavigationButton } from './nav.button';

export const AppNavigation = () => {
  return (
    <div className='flex flex-col w-full py-2 flex-auto'>
      <Topic label='General' />

      <NavigationButton label='Home' path='/' icon='home' />
    </div>
  );
};
