import './styles.css';
import { RouterProvider } from 'react-router';
import { withProviders } from './providers';
import { appRouter } from './router/app-router';

const App = () => <RouterProvider router={appRouter()} />;

export const ComposedApp = withProviders(App);
