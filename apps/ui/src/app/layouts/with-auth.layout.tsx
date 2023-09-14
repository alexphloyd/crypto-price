import { authModel } from '@app/features/auth';
import { Layout } from '@app/shared/ui/layout';
import { sidebarModel } from '@app/widgets/app-sidebar';

export const WithAuthLayout = () => {
  const isSideBarOpen = sidebarModel.useShowSidebar();
  const { isLoading: isAuthChecking } = authModel.api.session.useQuery(undefined, { refetchOnReconnect: true });

  return <Layout showSidebar={isSideBarOpen} isGlobalLoading={isAuthChecking} />;
};
