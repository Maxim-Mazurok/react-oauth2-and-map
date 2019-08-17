import { makeRequest } from './xhr';
import { Utils } from './utils';

export interface Config {
  endpoint: string;
  httpAuth: {
    id: string;
    secret: string;
  };
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

const defaultConfig: Config = {
  endpoint: process.env.OAUTH2_ENDPOINT,
  httpAuth: {
    id: process.env.OAUTH2_HTTP_ID,
    secret: process.env.OAUTH2_HTTP_SECRET,
  },
};

export class OAuth2 {
  private config: Config;
  private credentials: AuthCredentials;
  private accessToken = '';

  constructor(config: Config = defaultConfig) {
    this.config = config;
  }

  get token(): string {
    return this.accessToken;
  }

  auth = async (credentials: AuthCredentials): Promise<void> => {
    this.credentials = credentials;
    this.accessToken = await this.getAccessToken();
  };

  private getAccessToken = (): Promise<string> => {
    return new Promise((resolve, reject): void => {
      makeRequest(
        `${this.config.endpoint}/access_token`,
        'POST',
        {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${btoa(
            `${this.config.httpAuth.id}:${this.config.httpAuth.secret}`,
          )}`,
        },
        new URLSearchParams({
          grant_type: 'password', // eslint-disable-line @typescript-eslint/camelcase
          username: this.credentials.username,
          password: this.credentials.password,
        }).toString(),
      )
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
          const errorMessage = error.hasOwnProperty('error_description')
            ? Utils.capitalize(error.error_description)
            : 'Auth failed';
          reject(new Error(errorMessage));
        });
    });
  };
}
