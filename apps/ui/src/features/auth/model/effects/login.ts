import { z } from 'zod';
import { LoginSchema } from '@dto/auth/schemas/login.schema';
import { LoginResponse } from '@api-types/auth.types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '@app/features/auth/api/auth.api';
import { tokenService } from '@app/shared/services';
import { actions } from '@app/features/auth/model';
import { HttpStatusCode } from 'axios';
import { BaseError } from '@api-types/errors/base';

export const login = createAsyncThunk<LoginEffectRes | null, z.infer<typeof LoginSchema>>(
  'auth/login',
  async (args, { dispatch }) => {
    const { data: queryResponse, error } = await dispatch(authApi.endpoints.login.initiate(args));

    const errorCode = (error as BaseError).status;
    const errorMessage = (error as BaseError).data.message;

    const isVerificationNeeded = errorCode === HttpStatusCode.UpgradeRequired;
    const authSuccess = !!queryResponse?.user;

    if (isVerificationNeeded) {
      dispatch(actions.setSignInProcessCredentials({ email: args.email }));
      dispatch(actions.switchAuthProcessStep('verification'));
      dispatch(actions.switchAuthProcessTab('sign-up'));
    } else {
      dispatch(actions.setLoginErrorMessage(errorMessage));
    }

    if (authSuccess) {
      tokenService.setAuthTokens(queryResponse.tokens);
      dispatch(actions.setSessionUser(queryResponse.user));

      return queryResponse;
    }

    return null;
  },
);

type LoginEffectRes = Awaited<LoginResponse>;
