import clsx from 'clsx';
import { useState } from 'react';
import { Input as TextFiled } from 'antd';
import { formatPhoneNumber } from '@app/shared/lib/international-phone-number/format-phone-number';
import { COUNTRY_SELECTOR_OPTIONS, CountrySelector } from '@app/widgets/country-selector';
import { Label } from '@app/shared/ui/input';
import { Controller, useFormContext } from 'react-hook-form';
import { type Country } from '@app/shared/types';
import { PHONE_NUMBER_CODES } from '@app/shared/lib/international-phone-number/codes.constants';

interface Props {
  name: string;
  className?: string;
}

export const PhoneInput = ({ name, className }: Props) => {
  const {
    setValue: setPhoneFieldValue,
    control,
    formState: { errors },
  } = useFormContext();
  const [formattedValue, setFormattedValue] = useState<string>();

  const error = errors[name]?.message?.toString();

  const [country, setCountry] = useState<Country>();
  const handleCountryChange = (newCountryValue: Country) => {
    if (!newCountryValue) setPhoneFieldValue(name, '');
    setCountry(newCountryValue);
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
              value={formattedValue || ''}
              onChange={({ target }) => {
                if (!country) return;
                onChange(PHONE_NUMBER_CODES[country] + removeUnnecessarySymbols(target.value));
                setFormattedValue(formatPhoneNumber({ value: target.value, country }));
              }}
              disabled={!country}
              status={error ? 'error' : undefined}
              prefix={country ? <span>{PHONE_NUMBER_CODES[country]}</span> : null}
              placeholder={country ? undefined : 'Please, specify your location'}
              className='flex-auto'
              allowClear
              size='large'
            />
          </div>
        </main>
      )}
    />
  );
};

const removeUnnecessarySymbols = (string: string) => string.replace(/[\s-]+/g, '');
