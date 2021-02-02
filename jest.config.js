module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coveragePathIgnorePatterns: [
    '/node_modules/'
  ],
  roots: [
    '<rootDir>/src/',
    '<rootDir>/tests/'
  ]
};