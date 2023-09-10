import { RefreshResponse } from '@api-types';
import Cookies from 'js-cookie';

export const getAccess = () => Cookies.get('access');

export const set = ({ access, refresh }: Awaited<RefreshResponse>) => {
  Cookies.set('access', access);
  Cookies.set('refresh', refresh);
};

export const remove = () => {
  Cookies.remove('access');
  Cookies.remove('refresh');
};
