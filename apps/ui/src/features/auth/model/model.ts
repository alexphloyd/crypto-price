import { type Tab, type SignInProcess, type Step, type LoginProcess } from '@app/features/auth/model/types';
import { tokenService } from '@app/shared/services';
import { User } from '@prisma/client';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type AuthModel = {
  signInProcess: SignInProcess;
  loginProcess: LoginProcess;
  sessionUser: User | undefined;
};

const initialState: AuthModel = {
  signInProcess: {
    step: 'credentials',
    tab: 'sign-up',
    credentials: undefined,
  },
  loginProcess: {
    error: undefined,
  },
  sessionUser: undefined,
};

const authModel = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    switchAuthProcessTab(state, action: PayloadAction<Tab>) {
      state.signInProcess.tab = action.payload;
    },

    switchAuthProcessStep(state, action: PayloadAction<Step>) {
      state.signInProcess.step = action.payload;
    },

    setSessionUser(state, action: PayloadAction<User>) {
      state.sessionUser = action.payload;
    },

    setSignInProcessCredentials(state, action: PayloadAction<Partial<User>>) {
      state.signInProcess.credentials = action.payload;
    },

    setLoginErrorMessage(state, action: PayloadAction<string | undefined>) {
      state.loginProcess.error = action.payload;
    },

    logout() {
      tokenService.resetAuthTokens();
      return initialState;
    },
  },
});

export const actions = authModel.actions;

export const reducer = authModel.reducer;

export const name = authModel.name;
