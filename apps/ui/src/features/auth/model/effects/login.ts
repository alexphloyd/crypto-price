import { z } from 'zod';
import { LoginSchema } from '@dto/auth/schemas/login.schema';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '@app/features/auth/api/api.endpoints';
import { tokenService } from '@app/shared/services';
import { actions } from '@app/features/auth/model';
import { HttpStatusCode } from 'axios';
import { BaseError } from '@api-types/errors/base';

export const login = createAsyncThunk<{ isLoggedIn: boolean }, z.infer<typeof LoginSchema>>(
  'auth/login',
  async (args, { dispatch }) => {
    const { data: queryResponse, error } = await dispatch(authApi.endpoints.login.initiate(args));

    const errorCode = (error as BaseError)?.status;
    const errorMessage = (error as BaseError)?.data?.message;

    const isVerificationNeeded = errorCode === HttpStatusCode.UpgradeRequired;
    const isAuthSuccess = !!queryResponse?.user;

    if (isVerificationNeeded) {
      dispatch(actions.setSignInProcessCredentials({ email: args.email }));
      dispatch(actions.switchAuthProcessStep('verification'));
      dispatch(actions.switchAuthProcessTab('sign-up'));
    } else {
      dispatch(actions.setLoginErrorMessage(errorMessage));
    }

    if (isAuthSuccess) {
      tokenService.setAuthTokens(queryResponse.tokens);
      dispatch(actions.setSessionUser(queryResponse.user));
    }

    return { isLoggedIn: isAuthSuccess };
  },
);
