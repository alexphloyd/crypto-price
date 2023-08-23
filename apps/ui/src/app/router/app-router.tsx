import { createBrowserRouter } from 'react-router-dom';
import { Pages } from './pages-config';
import Layout from '../../shared/ui/layout';

export const appRouter = () =>
  createBrowserRouter([
    {
      element: <Layout />,
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
