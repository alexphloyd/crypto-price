import clsx from 'clsx';
import { Select } from 'antd';
import { Icon } from '@app/shared/ui/icon';
import { CountrySelectorOptions } from '../types';
import { type Country } from '@app/shared/types';
import { nanoid } from '@reduxjs/toolkit';

interface Props {
  countryOptions: CountrySelectorOptions;
  onChange: (country: Country) => void;
  className?: string;
}

export const CountrySelector = ({ countryOptions, onChange, className }: Props) => {
  return (
    <Select
      showSearch
      allowClear
      size='large'
      optionLabelProp='label'
      onChange={onChange}
      className={clsx('caret-transparent transition-none animation-none cursor-pointer', className)}
      placeholder={
        <div className='flex items-center'>
          <Icon
            name='united-kingdom'
            section='flags'
            className='w-6 h-6 rounded-[23%] mr-[2px]'
          />
          &nbsp; Select your country..
        </div>
      }
    >
      {countryOptions.map(({ value, label }) => (
        <Select.Option
          key={nanoid()}
          value={value}
          label={
            <div className='flex items-center'>
              <Icon
                name={value}
                section='flags'
                className='w-6 h-6 rounded-[23%] mr-[2px]'
              />
              &nbsp; {label}
            </div>
          }
        >
          {label}
        </Select.Option>
      ))}
    </Select>
  );
};
