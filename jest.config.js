/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  globals: {
    d: true
  },
  setupFiles: [
    './test/setup.ts'
  ],
  coverageDirectory: 'coverage'
};
