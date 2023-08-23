import { PHONE_NUMBER_CODES } from '@app/shared/config/phone-number-codes';
import { formatPhoneNumber } from '@app/shared/lib/format-phone-number';
import { Country, PhoneNumber } from '@app/shared/types';
import { Input } from 'antd';

interface Props {
  country: Country | undefined;
  value: string | undefined;
  onChange: (value: PhoneNumber) => void;
  className?: string;
}

export const PhoneInput = ({ country, value, onChange, className }: Props) => {
  const handleChange = (value: string) => {
    if (!country || typeof value !== 'string') return;
    onChange(formatPhoneNumber({ value, country }));
  };

  return (
    <Input
      size='large'
      allowClear
      value={value ?? ''}
      disabled={!country}
      className={className}
      onChange={({ target }) => handleChange(target.value)}
      placeholder={country ? undefined : 'Please, specify your location'}
      prefix={country ? <span>{PHONE_NUMBER_CODES[country]}</span> : null}
    />
  );
};
