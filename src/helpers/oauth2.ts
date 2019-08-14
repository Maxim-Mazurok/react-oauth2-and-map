import { makeRequest } from './xhr';

interface Config {
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

  get token() {
    return this.accessToken;
  }

  auth = async (credentials: AuthCredentials) => {
    this.credentials = credentials;
    this.accessToken = await this.getAccessToken();
  };

  private getAccessToken = (): Promise<string> => {
    return new Promise((resolve, reject) => {
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
          grant_type: 'password',
          username: this.credentials.username,
          password: this.credentials.password,
        }).toString(),
      )
        .then(data => {
          try {
            const responseObject = JSON.parse(data.response);
            resolve(responseObject['access_token']);
          } catch (e) {
            reject('Error parsing response');
          }
        })
        .catch(data => {
          try {
            data = JSON.parse(data.response);
          } catch (e) {}
          reject(data);
        });
    });
  };
}
