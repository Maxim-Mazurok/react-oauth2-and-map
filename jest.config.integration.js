const config = require('./jest.config');
config.testMatch = ['<rootDir>/src/__tests__/integration/**/*.spec.ts?(x)'];
module.exports = config;
