import { makeRequest } from './xhr';

interface Config {
  userEndpoint: string;
  chargingPointsEndpoint: string;
}

export interface CustomerInformation {
  externalId: string;
  email: string;
  country: string;
  locale: string;
  lastName: string;
  firstName: string;
  id: string;
  countryCode: string;
  status: string;
  _links: {
    self: {
      href: string;
    };
    'charge-session-history': {
      href: string;
    };
    'mailing-lists': {
      href: string;
    };
  };
}

export interface ChargingPoint {
  city: string;
  lng: number;
  connectors: Array<{
    id: number;
    connectorType: string;
    power: {
      current: string;
      phase?: number;
      voltage: number;
      amperage: number;
    };
    price?: {
      perSession: number;
      perMinute?: number;
      perKWh?: number;
      currency: string;
    };
  }>;
  id: number;
  address: string;
  lat: number;
}

const defaultConfig: Config = {
  userEndpoint: process.env.USER_API_ENDPOINT,
  chargingPointsEndpoint: process.env.CHARGING_POINTS_API_ENDPOINT,
};

export class API {
  private config: Config;
  private token: string;

  constructor(token = '', config: Config = defaultConfig) {
    this.config = config;
    this.token = token;
  }

  getChargingPoints = (): Promise<ChargingPoint[]> => {
    return new Promise((resolve, reject): void => {
      makeRequest(`${this.config.chargingPointsEndpoint}`, 'GET')
        .then((response: string) => {
          try {
            const parsedResponse: ChargingPoint[] = JSON.parse(response);
            resolve(parsedResponse);
          } catch (e) {
            reject(new Error('Error parsing response'));
          }
        })
        .catch(() => reject(new Error('Failed to get charging points')));
    });
  };

  getCustomerBasicInformation = (): Promise<CustomerInformation> => {
    return new Promise((resolve, reject): void => {
      makeRequest(`${this.config.userEndpoint}/me`, 'GET', {
        Authorization: `Bearer ${this.token}`,
      })
        .then((response: string) => {
          try {
            const parsedResponse: CustomerInformation = JSON.parse(response);
            resolve(parsedResponse);
          } catch (e) {
            reject(new Error('Error parsing response'));
          }
        })
        .catch(() => reject(new Error('Failed to get customer data')));
    });
  };
}
