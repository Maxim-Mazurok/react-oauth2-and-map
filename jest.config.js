module.exports = {
  setupFiles: ['dotenv/config'],
  preset: 'ts-jest',
  testMatch: ['<rootDir>/src/__tests__/**/*.spec.ts?(x)'],
  moduleNameMapper: {
    '\\.(svg|json)$': '<rootDir>/src/__mocks__/fileMock.ts',
    '\\.(scss)$': '<rootDir>/src/__mocks__/styleMock.ts',
  },
};
