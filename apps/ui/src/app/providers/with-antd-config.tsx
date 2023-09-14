import { ConfigProvider } from 'antd';
import { ReactNode } from 'react';

export const withAntdConfig = (component: () => ReactNode) => () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'Montserrat',
        },
      }}
    >
      {component()}
    </ConfigProvider>
  );
};
