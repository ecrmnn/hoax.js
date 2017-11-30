'use strict';

const mocks = {};
let iterator = 0;

module.exports = (obj, method) => {
  iterator += 1;

  const f = obj;
  const id = iterator;

  mocks[id] = {
    calls: [],
    original: obj[method],
  };

  f[method] = (...args) => mocks[id].calls.push(args);

  return {
    calls: mocks[id].calls,
    reset: () => {
      f[method] = mocks[id].original;
    },
  };
};
