import { Topic } from '@app/shared/ui/topic';
import { NavigationButton } from './nav.button';
import { ReactNode } from 'react';

export const AppNavigation = () => {
  return (
    <div className='flex flex-col w-full py-3 flex-auto ph'>
      <Section>
        <Topic label='Overview' />
        <NavigationButton label='Markets' path='/' icon='view-stacked' />
      </Section>

      <Section>
        <Topic label='Account' />
        <NavigationButton label='Profile' path='/profile' icon='user' />
        <NavigationButton label='Settings' path='/settings' icon='settings' />
      </Section>

      <Section>
        <Topic label='Support' />
        <NavigationButton label='Contact us' path='/contact-us' icon='headphone' />
      </Section>
    </div>
  );
};

function Section({ children }: { children: ReactNode }) {
  return <section className='flex flex-col w-full mb-3'>{children}</section>;
}
