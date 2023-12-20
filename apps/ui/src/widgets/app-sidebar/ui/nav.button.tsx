import { useAppDispatch } from '@app/app/store/hooks';
import { type RoutePath } from '@app/shared/types';
import { useEffect, useState } from 'react';
import { Icon } from '@app/shared/ui/icon';
import { useLocation, useNavigate } from 'react-router';
import { Button, Typography } from 'antd';
import { sidebarModel } from '..';
import { twMerge } from 'tailwind-merge';

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
            className={twMerge(isSelected && 'text-white', 'w-[16px] h-[16px] -mb-[3px] text-gray-500')}
          />
        ) : undefined
      }
      type={isSelected ? 'dashed' : 'text'}
      size='middle'
      className={twMerge('text-left my-[4px] items-center justify-center')}
      onClick={handleRoute}
    >
      <Typography.Text>{label}</Typography.Text>
    </Button>
  );
};

function isSelectedTopic(currentPath: string, expectedPath: string) {
  return currentPath === expectedPath;
}
