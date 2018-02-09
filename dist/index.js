'use strict';

var mocks = {};
var iterator = 0;

module.exports = function (obj, method) {
  var fn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  iterator += 1;

  var f = obj;
  var id = iterator;

  mocks[id] = {
    calls: [],
    original: obj[method]
  };

  // eslint-disable-next-line consistent-return
  f[method] = function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    mocks[id].calls.push(args);

    if (fn) {
      return fn(args);
    }
  };

  return {
    calls: mocks[id].calls,
    reset: function reset() {
      f[method] = mocks[id].original;
    }
  };
};