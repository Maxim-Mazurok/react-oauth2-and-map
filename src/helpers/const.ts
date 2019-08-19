import { OAuth2Config } from './oauth2';
import { APIConfig } from './api';

export const testIDs = {
  loginForm: 'login-form',
  userInfo: 'user-info',
  signIn: 'sign-in',
  email: 'email',
  password: 'password',
  error: 'error',
};

export const testData = {
  email: {
    valid: 'valid@newmotion.com',
    invalid: 'invalid@newmotion.com',
  },
  password: {
    valid: 'valid',
    invalid: 'invalid',
  },
  lastName: 'TestLastName',
  firstName: 'TestFirstName',
  invalidCredentialsError: 'INVALID_CREDENTIALS_ERROR',
};

export const inputs = {
  email: {
    id: 'email',
    label: 'E-mail',
    testId: testIDs.email,
  },
  password: {
    id: 'password',
    label: 'Password',
    testId: testIDs.password,
  },
};

export const config: OAuth2Config & APIConfig = {
  endpoint: process.env.OAUTH2_ENDPOINT,
  httpAuth: {
    id: process.env.OAUTH2_HTTP_ID,
    secret: process.env.OAUTH2_HTTP_SECRET,
  },
  authGrantType: 'password',
  userEndpoint: process.env.USER_API_ENDPOINT,
  chargingPointsEndpoint: process.env.CHARGING_POINTS_API_ENDPOINT,
};
