/** @type {import('jest').Config} */
// const config = {
//   verbose: true,
// };

// module.exports = config;

module.exports = {
  preset: "jest",
  testEnvironment: "node",
  testMatch: ["./__tests__/*.test.js"],
  verbose: true,
  forceExit: true,
  // clearMocks: true,
}