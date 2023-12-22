import { createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '@app/features/auth/api/auth.api';
import { authModel } from '../..';

export const checkSession = createAsyncThunk('auth/check-session', async (_args, { dispatch }) => {
  const { data: session } = await dispatch(authApi.endpoints.session.initiate());
  if (session?.user) {
    dispatch(authModel.actions.setSessionUser(session.user));
  }
});
