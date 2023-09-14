import { createBrowserRouter } from 'react-router-dom';
import { WithAuthLayout } from '@app/app/layouts/with-auth.layout';
import { Pages } from './pages-config';

export const appRouter = () =>
  createBrowserRouter([
    {
      element: <WithAuthLayout />,
      children: [
        {
          path: '/',
          element: <Pages.Home />,
        },

        // AUTH
        {
          path: '/auth/sign-in',
          element: <Pages.SignIn />,
        },
        {
          path: '/auth/access-denied',
          element: <Pages.AccessDenied />,
        },
      ],
    },
  ]);
