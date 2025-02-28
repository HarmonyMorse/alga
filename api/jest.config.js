module.exports = {
    testEnvironment: 'node',
    setupFiles: ['<rootDir>/src/tests/setup.js'],
    testMatch: ['**/*.test.js'],
    verbose: true,
    forceExit: true,
    clearMocks: true,
    resetMocks: true,
    restoreMocks: true,
}; 