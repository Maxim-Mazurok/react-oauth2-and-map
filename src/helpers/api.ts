import { makeRequest } from './xhr';
import { config } from './const';

export interface APIConfig {
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

export const getChargingPoints = (): Promise<ChargingPoint[]> => {
  return new Promise((resolve, reject): void => {
    makeRequest({
      url: `${config.chargingPointsEndpoint}`,
      method: 'GET',
    })
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

export const getCustomerBasicInformation = (
  token: string,
): Promise<CustomerInformation> => {
  return new Promise((resolve, reject): void => {
    makeRequest({
      url: `${config.userEndpoint}/me`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
