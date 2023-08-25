import compose from 'compose-function';
import { withAntd } from '@app/app/providers/with-antd';
import { withStore } from '@app/app/providers/with-store';

export const withProviders = compose(withStore, withAntd);
