import { type IconName } from '@app/shared/types';
import { twMerge } from 'tailwind-merge';
import { useState } from 'react';
import { Icon } from '../icon';
import { AvailableOptions, OptionValue, Props, RadioOptions } from './types';
import { Button as AntdButton } from 'antd';
import { nanoid } from '@reduxjs/toolkit';

export const Radio = <O extends RadioOptions>({ options, onChange, defaultChecked, className }: Props<O>) => {
  const [selected, setSelected] = useState<OptionValue | undefined>(defaultChecked);

  const handleOptionClick = (value: string) => {
    setSelected(value);
    onChange(value as AvailableOptions<O>);
  };

  const optionsList = options.map((item) => (
    <Button
      key={nanoid()}
      value={item.value}
      icon={item.icon}
      iconSection={item.iconSection}
      selected={selected === item.value}
      onClick={handleOptionClick}
    />
  ));

  return (
    <main className={twMerge(className, 'w-full flex flex-row items-center justify-center gap-x-4')}>
      {optionsList}
    </main>
  );
};

const Button = ({
  value,
  icon,
  iconSection,
  selected,
  onClick,
}: {
  value: string;
  icon: IconName;
  iconSection: string;
  selected: boolean;
  onClick: (value: string) => void;
}) => {
  return (
    <AntdButton
      className={twMerge(
        'flex items-center justify-center py-7 px-6 w-full',
        selected ? 'bg-cyan-100/80' : 'bg-gray-50/00',
      )}
      type='dashed'
      onClick={() => onClick(value)}
    >
      <Icon name={icon} section={iconSection} className='w-9 h-9' />
    </AntdButton>
  );
};
