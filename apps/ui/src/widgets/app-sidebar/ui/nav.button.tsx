import { useAppDispatch } from '@app/app/store/hooks';
import { type RoutePath } from '@app/shared/types';
import { useEffect, useState } from 'react';
import { Icon } from '@app/shared/ui/icon';
import { useLocation, useNavigate } from 'react-router';
import { Button, Typography } from 'antd';
import { sidebarModel } from '..';
import clsx from 'clsx';

interface Props {
  path: RoutePath;
  label: string;
  icon?: string;
}

export const NavigationButton = ({ path, label, icon }: Props) => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const { pathname: currentPath } = useLocation();

  const [isSelected, setIsSelected] = useState(isSelectedTopic(currentPath, path));

  useEffect(() => {
    setIsSelected(isSelectedTopic(currentPath, path));
  }, [currentPath]);

  const handleRoute = () => {
    navigate(path);
    dispatch(sidebarModel.actions.close());
  };

  return (
    <Button
      icon={
        icon ? (
          <Icon
            name={icon}
            section='primary'
            className={clsx('w-[16px] h-[16px] -mb-[3px] text-gray-500', isSelected && 'text-white')}
          />
        ) : undefined
      }
      type={isSelected ? 'primary' : 'text'}
      size='middle'
      className='text-left my-[6px] items-center justify-center'
      onClick={handleRoute}
    >
      <Typography.Text className={isSelected ? 'text-white' : undefined}>{label}</Typography.Text>
    </Button>
  );
};

const isSelectedTopic = (currentPath: string, expectedPath: string) => {
  return currentPath === expectedPath;
};
