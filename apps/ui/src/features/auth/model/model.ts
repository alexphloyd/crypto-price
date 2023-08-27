import { type SignInProcess } from '@app/features/auth/model/types';
import { createSlice } from '@reduxjs/toolkit';

type AuthModel = {
  signInProcess: SignInProcess;
};

const initialState: AuthModel = {
  signInProcess: {
    step: 'credentials',
    tab: 'sign-up',
  },
};

const authModel = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    switchToLoginTab(state) {
      state.signInProcess.tab = 'log-in';
    },
    switchToSignUpTab(state) {
      state.signInProcess.tab = 'sign-up';
    },

    switchToVerificationStep(state) {
      state.signInProcess.step = 'verification';
    },
    switchToCredentialsTab(state) {
      state.signInProcess.step = 'credentials';
    },
  },
});

export const actions = authModel.actions;

export const reducer = authModel.reducer;

export const name = authModel.name;
