import * as model from './model';
import * as api from './api/api.endpoints';

// model
export const authModel = {
  ...model,
  api,
};

// UI
export { AuthActions } from './ui/auth-actions.button';
