module.exports = {
  testEnvironment: 'node',
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
  testMatch: ['<rootDir>/src/**/*.test.ts'],
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        useESM: true,
        isolatedModules: true,
      },
    ],
  },
  extensionsToTreatAsEsm: ['.ts'],
  moduleFileExtensions: ['node', 'js', 'ts'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  moduleDirectories: ['node_modules', '<rootDir>'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  globalSetup: '<rootDir>/__tests__/_setup/setup-test-envs.ts',
  setupFilesAfterEnv: ['<rootDir>/__tests__/_setup/test-setup.ts'],
};
