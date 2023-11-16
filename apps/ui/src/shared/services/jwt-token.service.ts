import { type RefreshResponse } from '@api-types/domain/auth/types';
import Cookies from 'js-cookie';

export const getAccessToken = () => Cookies.get('access');

export const setAuthTokens = ({ access, refresh }: Awaited<RefreshResponse>) => {
  Cookies.set('access', access);
  Cookies.set('refresh', refresh);
};

export const resetAuthTokens = () => {
  Cookies.remove('access');
  Cookies.remove('refresh');
};
