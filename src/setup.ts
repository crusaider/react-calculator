// Polyfill crypto for jsdom environment
if (!globalThis.crypto) {
  // Node.js has crypto in the crypto module
  const { randomBytes } = require('crypto');
  Object.defineProperty(globalThis, 'crypto', {
    value: {
      getRandomValues: (arr: Uint8Array) => {
        const bytes = randomBytes(arr.length);
        arr.set(bytes);
        return arr;
      },
      subtle: {},
    },
    writable: false,
  });
}

