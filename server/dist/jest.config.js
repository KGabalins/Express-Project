/** @type {import('jest').Config} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
        '^.+\\.tsx?$': 'ts-jest',
    },
    // testMatch: ["./__tests__/*.test.js"],
    // verbose: true,
    // forceExit: true,
    // transform: {
    //   '^.+\\.jsx?$': 'babel-jest'
    // }
    // clearMocks: true,
};
export {};
