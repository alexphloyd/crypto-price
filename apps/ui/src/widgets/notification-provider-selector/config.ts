import { RadioOptions } from '@app/shared/ui/radio/types';
import { NotificationProvider } from '@prisma/client';

export const OPTIONS = [
  { value: NotificationProvider.TELEGRAM, icon: 'telegram', iconSection: 'social-media' },
  {
    value: NotificationProvider.WHATSAPP,
    icon: 'whatsapp',
    iconSection: 'social-media',
  },
  {
    value: NotificationProvider.MESSENGER,
    icon: 'facebook',
    iconSection: 'social-media',
  },
] satisfies RadioOptions;
