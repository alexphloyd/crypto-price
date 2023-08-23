import { type IconName } from '@app/shared/types';
import clsx from 'clsx';
import { useState } from 'react';
import { Icon } from '../icon';
import { AvailableOptions, OptionValue, Props, RadioOptions } from './types';
import { Button as AntdButton } from 'antd';
import { nanoid } from '@reduxjs/toolkit';

export const Radio = <O extends RadioOptions>({
  options,
  onChange,
  defaultChecked,
  className,
}: Props<O>) => {
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
    <main
      className={clsx(
        'w-full flex flex-row items-center justify-center flex-wrap gap-3',
        className
      )}
    >
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
      className={clsx(
        'flex items-center justify-center py-7 px-6',
        selected ? 'bg-blue-100/60' : 'bg-gray-50/00'
      )}
      type='dashed'
      onClick={() => onClick(value)}
    >
      <Icon
        name={icon}
        section={iconSection}
        className='w-9 h-9'
      />
    </AntdButton>
  );
};
