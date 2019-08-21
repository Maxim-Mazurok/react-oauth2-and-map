import { getChargingPoints as getChargingPointsOriginal } from '../helpers/api';

export const getChargingPoints = jest
  .fn<ReturnType<typeof getChargingPointsOriginal>, []>()
  .mockImplementation(() => {
    return Promise.reject(new Error('ERROR'));
  });

jest.mock('../helpers/api.ts', () => ({
  getChargingPoints,
}));
