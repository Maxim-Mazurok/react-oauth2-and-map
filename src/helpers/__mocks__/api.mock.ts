import { ChargingPoint, CustomerInformation } from '../api';
import { testData } from '../const';

export const getCustomerBasicInformation = jest
  .fn<Promise<CustomerInformation>, null>()
  .mockResolvedValue({
    externalId: '',
    email: '',
    country: '',
    locale: '',
    lastName: testData.lastName,
    firstName: testData.firstName,
    id: '',
    countryCode: '',
    status: '',
    _links: {
      self: {
        href: '',
      },
      'charge-session-history': {
        href: '',
      },
      'mailing-lists': {
        href: '',
      },
    },
  });
export const getChargingPoints = jest
  .fn<Promise<ChargingPoint[]>, null>()
  .mockResolvedValue([
    {
      city: 'Barendrecht',
      lng: 4.51867,
      connectors: [
        {
          id: 270222,
          connectorType: 'Type2',
          power: {
            current: 'AC',
            phase: 3,
            voltage: 240,
            amperage: 16,
          },
        },
      ],
      id: 165114,
      address: 'Brucknerstraat 60',
      lat: 51.85191,
    },
    {
      city: 'Franeker',
      lng: 5.52363634109497,
      connectors: [
        {
          id: 50676,
          connectorType: 'Type2',
          power: {
            current: 'AC',
            phase: 1,
            voltage: 240,
            amperage: 16,
          },
          price: {
            perSession: 0.0,
            perMinute: 0.0,
            perKWh: 0.25,
            currency: 'EUR',
          },
        },
      ],
      id: 32571,
      address: 'Harlingerweg 54',
      lat: 53.1853065490723,
    },
  ]);
export const API = jest.fn().mockImplementation(() => {
  return {
    getCustomerBasicInformation,
  };
});

jest.mock('../api', () => {
  return {
    API,
  };
});
