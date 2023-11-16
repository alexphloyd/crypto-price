import { Topic } from '@app/shared/ui/topic';
import { NavigationButton } from './nav.button';

export const AppNavigation = () => {
  return (
    <div className='flex flex-col w-full py-3 flex-auto space-y-2'>
      <Topic label='General' className='mb-1' />
      <NavigationButton label='Home' path='/' icon='view-stacked' />

      <Topic label='Account' />
      <NavigationButton label='Profile' path='/profile' icon='user' />
      <NavigationButton label='Settings' path='/settings' icon='settings' />

      <Topic label='Support' />
      <NavigationButton label='Contact us' path='/contact-us' icon='headphone' />
    </div>
  );
};
