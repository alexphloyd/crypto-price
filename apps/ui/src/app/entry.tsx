import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { withProviders } from './providers/compose';
import { appRouter } from './router/app-router';
import { StrictMode } from 'react';

import './styles/index.css';

const ComposedApp = withProviders(() => <RouterProvider router={appRouter()} />);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <ComposedApp />
  </StrictMode>,
);
