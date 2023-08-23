import { Radio } from '@app/shared/ui/radio';
import { OPTIONS } from '@app/widgets/notification-provider-selector/config';
import { NotificationProvider } from '@prisma/client';

export const NotificationProviderSelector = ({ onChange }: { onChange: (provider: NotificationProvider) => void }) => {
  return (
    <Radio
      options={OPTIONS}
      onChange={onChange}
      // defaultChecked='TELEGRAM'
    />
  );
};
