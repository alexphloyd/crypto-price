import { PHONE_NUMBER_CODES } from '@app/shared/config/phone-number-codes';
import { formatPhoneNumber } from '@app/shared/lib/format-phone-number';
import { type Country } from '@app/shared/types';
import { Label } from '@app/shared/ui/input';
import { COUNTRY_SELECTOR_OPTIONS, CountrySelector } from '@app/widgets/country-selector';
import clsx from 'clsx';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Input as TextFiled } from 'antd';

interface Props {
  name: string;
  className?: string;
}

export const PhoneInput = ({ name, className }: Props) => {
  const {
    getValues,
    setValue,
    control,
    formState: { errors },
  } = useFormContext();
  const error = errors[name]?.message?.toString();

  const [country, setCountry] = useState<Country>();
  const handleCountryChange = (country: Country) => {
    if (!country) setValue(name, '');
    setCountry(country);
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=''
      render={({ field: { onChange } }) => (
        <main className={clsx('flex flex-col gap-1 items-start min-w-full', className)}>
          <Label label='Phone number' error={error} />
          <div className='flex flex-col gap-x-3 gap-y-4 md:gap-y-0 md:gap-x-4 md:flex-row  w-full'>
            <CountrySelector
              countryOptions={COUNTRY_SELECTOR_OPTIONS}
              onChange={handleCountryChange}
              className='min-w-[48.5%]'
            />
            <TextFiled
              value={getValues(name)}
              size='large'
              allowClear
              disabled={!country}
              placeholder={country ? undefined : 'Please, specify your location'}
              status={error ? 'error' : undefined}
              className='flex-auto'
              prefix={country ? <span>{PHONE_NUMBER_CODES[country]}</span> : null}
              onChange={({ target }) => onChange(formatPhoneNumber({ value: target.value, country }))}
            />
          </div>
        </main>
      )}
    />
  );
};
