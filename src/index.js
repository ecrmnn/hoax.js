'use strict';

const mocks = {};
let iterator = 0;

module.exports = (obj, method, fn = null) => {
  iterator += 1;

  const f = obj;
  const id = iterator;

  mocks[id] = {
    calls: [],
    original: obj[method],
  };

  // eslint-disable-next-line consistent-return
  f[method] = (...args) => {
    mocks[id].calls.push(args);

    if (fn) {
      return fn(args);
    }
  };

  return {
    calls: mocks[id].calls,
    reset: () => {
      f[method] = mocks[id].original;
    },
  };
};
