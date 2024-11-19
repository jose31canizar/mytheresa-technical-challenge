// __mocks__/@react-native-community/netinfo.js
export default {
  fetch: jest.fn(() => Promise.resolve({isConnected: true})),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
};
