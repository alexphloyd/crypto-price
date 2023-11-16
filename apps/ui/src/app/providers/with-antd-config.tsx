import { ConfigProvider } from 'antd';
import { ReactNode } from 'react';

export const withAntdConfig = (component: () => ReactNode) => () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#3a889c',
          fontFamily: 'Exo',
        },
      }}
    >
      {component()}
    </ConfigProvider>
  );
};
