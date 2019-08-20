const config = require('./jest.config');
config.testMatch = ['<rootDir>/src/__tests__/unit/**/*.spec.ts?(x)'];
module.exports = config;
