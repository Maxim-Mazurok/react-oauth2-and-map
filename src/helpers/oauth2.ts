import { makeRequest } from './xhr';
import { Utils } from './utils';
import { config } from './const';

export interface OAuth2Config {
  endpoint: string;
  httpAuth: {
    id: string;
    secret: string;
  };
  authGrantType: 'password';
}

export interface AuthCredentials {
  username: string;
  password: string;
}

interface AuthSuccess {
  token_type: string;
  access_token: string;
  expires_in: number;
  refresh_token: string;
}

interface AuthError {
  error: string;
  error_description: string;
}

export const getAccessToken = (
  credentials: AuthCredentials,
): Promise<string> => {
  return new Promise((resolve, reject): void => {
    makeRequest({
      url: `${config.endpoint}/access_token`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${btoa(
          `${config.httpAuth.id}:${config.httpAuth.secret}`,
        )}`,
      },
      body: new URLSearchParams({
        grant_type: config.authGrantType, // eslint-disable-line @typescript-eslint/camelcase
        username: credentials.username,
        password: credentials.password,
      }),
    })
      .then((response: string) => {
        try {
          const parsedResponse: AuthSuccess = JSON.parse(response);
          if (parsedResponse.hasOwnProperty('access_token')) {
            resolve(parsedResponse.access_token);
          } else {
            reject(new Error('No access token in response'));
          }
        } catch (e) {
          reject(new Error('Error parsing response'));
        }
      })
      .catch((response: string) => {
        let error: AuthError;
        try {
          error = JSON.parse(response);
        } catch (e) {}
        const errorMessage =
          error && error.hasOwnProperty('error_description')
            ? Utils.capitalize(error.error_description)
            : 'Auth request failed';
        reject(new Error(errorMessage));
      });
  });
};
