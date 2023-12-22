import { type Tab, type SignInProcess, type Step, type LoginProcess } from '@app/features/auth/model/types';
import { tokenService } from '@app/shared/services';
import { type User } from '@prisma/client';
import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { checkSession } from './effects/check-session';
import { login } from './effects/login';

type AuthModel = {
  signInProcess: SignInProcess;
  loginProcess: LoginProcess;
  session: User | undefined;
  isSessionChecking: boolean;
  isLoginPending: boolean;
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
  session: undefined,
  isSessionChecking: false,
  isLoginPending: false,
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
      state.session = action.payload;
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
  extraReducers: (builder) => {
    // check-session
    builder.addCase(checkSession.pending, (state) => {
      state.isSessionChecking = true;
    });
    builder.addCase(checkSession.fulfilled, (state) => {
      state.isSessionChecking = false;
    });
    builder.addCase(checkSession.rejected, (state) => {
      state.isSessionChecking = false;
    });

    // login
    builder.addCase(login.pending, (state) => {
      state.isLoginPending = true;
    });
    builder.addCase(login.fulfilled, (state) => {
      state.isLoginPending = false;
    });
    builder.addCase(login.rejected, (state) => {
      state.isLoginPending = false;
    });
  },
});

export const actions = authModel.actions;

export const reducer = authModel.reducer;

export const name = authModel.name;
