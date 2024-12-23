const repoDir = __dirname;

module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  moduleNameMapper: {
    '^mobx-react-lite$': `${repoDir}/node_modules/mobx-react-lite/es/index.js`,
    DevMenu: `${repoDir}/__mocks__/DevMenu.js`,
  },
  setupFiles: [`${repoDir}/__mocks__/@react-native-community/netinfo.js`],
};
