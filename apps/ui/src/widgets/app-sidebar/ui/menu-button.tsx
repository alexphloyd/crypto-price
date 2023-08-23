import { useAppDispatch } from '@app/app/store/hooks';
import { type RoutePath } from '@app/shared/types';
import { useEffect, useState } from 'react';
import { Icon } from '@app/shared/ui/icon';
import { useLocation, useNavigate } from 'react-router';
import { Button } from 'antd';
import { sidebarModel } from '..';
import clsx from 'clsx';

interface MenuButtonProps {
  path: RoutePath;
  label: string;
  icon?: string;
}

export const MenuButton = ({ path, label, icon }: MenuButtonProps) => {
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
            section="primary"
            className={clsx('w-[15px] h-[15px] -mb-[2px] text-gray-500', isSelected && 'text-white')}
          />
        ) : undefined
      }
      type={isSelected ? 'primary' : 'text'}
      size="middle"
      className="text-left my-[6px] items-center justify-center"
      onClick={handleRoute}
    >
      {label}
    </Button>
  );
};

const isSelectedTopic = (currentPath: string, expectedPath: string) => {
  return currentPath === expectedPath;
};
