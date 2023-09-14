import { ConfigProvider } from 'antd';
import { ReactNode } from 'react';

export const withAntdConfig = (component: () => ReactNode) => () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#0891b2',
          fontFamily: 'Montserrat',
        },
      }}
    >
      {component()}
    </ConfigProvider>
  );
};
