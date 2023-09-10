import { FunctionComponent } from 'react';
import { Navigate } from 'react-router-dom';
import { type RoutePath } from '@app/shared/types';
import { type ExcludeStrict } from '@utils/types';
import { type Role } from '@prisma/client';

const SUPER_ROLES = [] satisfies Role[];

export function withGuard(
  Component: FunctionComponent,
  permissibleRoles: ExcludeStrict<Role, (typeof SUPER_ROLES)[number]>[],
  redirectTo?: RoutePath,
) {
  return function RouteElement(props: Record<string, unknown>) {
    const sessionRole = 'USER'; // TODO: set role

    if (!isAccessGranted(sessionRole, permissibleRoles)) {
      return <Navigate to={redirectTo || '/auth/access-denied'} replace />;
    }

    return <Component {...props} />;
  };
}

const isAccessGranted = (sessionRole: Role, permissibleRoles: ExcludeStrict<Role, (typeof SUPER_ROLES)[number]>[]) => {
  const allPermissibleRoles = [...SUPER_ROLES, ...permissibleRoles];
  return allPermissibleRoles.some((role) => role === sessionRole);
};
