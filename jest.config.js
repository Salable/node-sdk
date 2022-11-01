module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less|scss)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/$1',
  },
  testMatch: ['**/*.(spec|test).{ts,tsx}'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/*stories.{ts,tsx}',
    '!**/node_modules/**',
    '!**/dist/**',
    '!**/.storybook/**',
    '!**/index.{ts,tsx}',
    '!**/styled.ts',
    '!**/assets/**',
  ],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
  modulePathIgnorePatterns: ['./dist'],
};
