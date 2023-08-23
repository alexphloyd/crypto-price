import compose from 'compose-function';
import { withStore } from './with-store';

export const withProviders = compose(withStore);
