/** @type {import('jest').Config} */
module.exports = {
    // preset: "ts-jest",
    roots: [
        "dist/__tests/*.test.js"
    ],
    testEnvironment: "node",
    forceExit: true,
    // transform: {
    //   // '^.+\\.jsx?$': 'babel-jest',
    //   // '^.+\\.tsx?$': 'ts-jest',
    // },
    testMatch: ["dist/__tests__/*.test.js"],
    // testMatch: ["**/?(*.)+(spec|test).js"],
    // verbose: true,
    // forceExit: true,
    // transform: {
    //   '^.+\\.jsx?$': 'babel-jest'
    // }
    // clearMocks: true,
};
export {};
// module.exports = {
//   // roots: [
//   //   "<rootDir>/src"
//   // ],
//   // transform: {
//   //   "^.+\\.tsx?$": "ts-jest"
//   // },
//   // testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
//   // moduleFileExtensions: [
//   //   "ts",
//   //   "tsx",
//   //   "json"
//   // ],
// }
