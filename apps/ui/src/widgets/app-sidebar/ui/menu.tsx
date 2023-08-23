import { Topic } from '@app/shared/ui/topic';
import { MenuButton } from './menu-button';

export const Menu = () => {
  return (
    <div className="flex flex-col w-full py-2 flex-auto">
      <Topic label="General" />

      <MenuButton label="Home" path="/" icon="home" />
    </div>
  );
};
