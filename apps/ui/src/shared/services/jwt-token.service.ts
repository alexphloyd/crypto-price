import { type RefreshResponse } from '@api-types/domain/auth/types';
import Cookies from 'js-cookie';

 const getAccessToken = () => Cookies.get('access');

 const setAuthTokens = ({ access, refresh }: Awaited<RefreshResponse>) => {
  Cookies.set('access', access);
  Cookies.set('refresh', refresh);
};

 const resetAuthTokens = () => {
  Cookies.remove('access');
  Cookies.remove('refresh');
};

export const tokenService = {
  getAccessToken, 
  setAuthTokens,
  resetAuthTokens
}