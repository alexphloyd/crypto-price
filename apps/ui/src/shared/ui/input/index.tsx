import { forwardRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Input as TextFiled, Typography } from 'antd';
import clsx from 'clsx';

interface Props {
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  type?: 'text' | 'password' | 'email' | 'number';
}

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ name, disabled, label, className, placeholder, type }, _ref) => {
    const {
      control,
      formState: { isSubmitting, errors },
    } = useFormContext();
    const error = errors[name]?.message?.toString() as string | undefined;

    return (
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange } }) => (
          <main className={clsx('flex flex-col gap-1 items-start', className)}>
            <Label
              label={label}
              error={error}
            />
            <TextFiled
              size='large'
              disabled={isSubmitting || disabled}
              placeholder={placeholder || 'Enter your ' + name}
              type={type}
              status={error ? 'error' : undefined}
              onChange={(event) => onChange(event.target.value)}
            />
          </main>
        )}
      />
    );
  }
);

export const Label = ({
  label,
  error,
}: {
  label: string | undefined;
  error: string | undefined;
}) => {
  if (!label) return null;

  return (
    <Typography.Text type={error ? 'danger' : undefined}>
      {error ? label + ' ' + error : label}
    </Typography.Text>
  );
};
