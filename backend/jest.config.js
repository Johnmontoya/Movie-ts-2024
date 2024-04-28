/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    coveragePathIgnorePatterns: [
      "/node_modules"
    ],
    testMatch: ['**/__test__/**/*.ts', '**/?(*.)+(spec|test).ts'],
    testPathIgnorePatterns: ['__tests__/utils'],
    testTimeout: 10000
};
