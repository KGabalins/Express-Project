/** @type {import('jest').Config} */
module.exports = {
    preset: "jest",
    testEnvironment: "node",
    testMatch: ["./__tests__/*.test.js"],
    verbose: true,
    forceExit: true,
    transform: {
        '^.+\\.jsx?$': 'babel-jest'
    }
    // clearMocks: true,
};
export {};
