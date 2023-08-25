import { Label } from '@app/shared/ui/input';
import { Radio } from '@app/shared/ui/radio';
import { OPTIONS } from '@app/widgets/notification-provider-selector/config';
import { Controller, useFormContext } from 'react-hook-form';

export const NotificationProviderSelector = ({ name, label }: { name: string; label?: string }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const error = errors[name]?.message?.toString();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange } }) => (
        <main className='space-y-2'>
          <Label label={label} error={error} />
          <Radio options={OPTIONS} onChange={onChange} />
        </main>
      )}
    />
  );
};
