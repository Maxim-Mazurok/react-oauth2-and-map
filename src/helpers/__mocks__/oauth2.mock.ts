import { testData } from '../const';
import { AuthCredentials } from '../oauth2';

export const auth = jest
  .fn<Promise<void>, [AuthCredentials]>()
  .mockImplementation((credentials: AuthCredentials) => {
    if (
      credentials.username === testData.email.valid &&
      credentials.password === testData.password.valid
    ) {
      return Promise.resolve();
    } else {
      return Promise.reject(new Error(testData.invalidCredentialsError));
    }
  });
export const OAuth2 = jest.fn().mockImplementation(() => {
  return {
    auth,
  };
});

jest.mock('../oauth2', () => {
  return {
    OAuth2,
  };
});
