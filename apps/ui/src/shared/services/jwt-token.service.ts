import Cookies from 'js-cookie';

export const getAccess = () => Cookies.get('access');

export const set = ({ accessToken, refreshToken }: { accessToken: string; refreshToken: string }) => {
  Cookies.set('access', accessToken);
  Cookies.set('refresh', refreshToken);
};

export const remove = () => {
  Cookies.remove('access');
  Cookies.remove('refresh');
};
