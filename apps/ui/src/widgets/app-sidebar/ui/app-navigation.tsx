import { Topic } from '@app/shared/ui/topic';
import { NavigationButton } from './nav.button';

export const AppNavigation = () => {
  return (
    <div className='flex flex-col w-full py-2 flex-auto space-y-3'>
      <Topic label='General' />
      <NavigationButton label='Board' path='/' icon='view-stacked' />
      <NavigationButton label='Your cars' path='/your-cars' icon='app' />

      <Topic label='Account' />
      <NavigationButton label='Profile' path='/profile' icon='user' />
      <NavigationButton label='Settings' path='/settings' icon='settings' />

      <Topic label='Support' />
      <NavigationButton label='Contact us' path='/contact-us' icon='headphone' />
    </div>
  );
};
