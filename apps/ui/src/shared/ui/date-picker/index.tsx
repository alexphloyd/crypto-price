import dayjs from 'dayjs';
import { Label } from '../input';
import { DatePicker as AntdDatePicker } from 'antd';
import { Controller, useFormContext } from 'react-hook-form';

interface Props {
  name: string;
  label: string;
}

export const DatePicker = ({ name, label }: Props) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const error = errors[name]?.message as string | undefined;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange } }) => (
        <main className='flex flex-col gap-1 items-start'>
          <Label
            label={label}
            error={error}
          />
          <AntdDatePicker
            status={error ? 'error' : undefined}
            format='MM-DD-YYYY'
            onChange={(event) => onChange(dayjs((event as any).$d).format('DD-MM-YYYY-Z'))}
            className='w-full'
            size='large'
          />
        </main>
      )}
    />
  );
};
