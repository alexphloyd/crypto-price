import { createBrowserRouter } from 'react-router-dom';
import { WithAuthLayout } from '@app/app/layouts/with-auth.layout';
import { Pages } from './pages-config';
import { ErrorPageElement } from '@app/shared/ui/not-found-page-element';

export const appRouter = () =>
  createBrowserRouter([
    {
      element: <WithAuthLayout />,
      errorElement: <ErrorPageElement />,
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
          path: '/access-denied',
          element: <Pages.AccessDenied />,
        },
      ],
    },
  ]);
