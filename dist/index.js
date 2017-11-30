'use strict';

var mocks = {};
var iterator = 0;

module.exports = function (obj, method) {
  iterator += 1;

  var f = obj;
  var id = iterator;

  mocks[id] = {
    calls: [],
    original: obj[method]
  };

  f[method] = function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return mocks[id].calls.push(args);
  };

  return {
    calls: mocks[id].calls,
    reset: function reset() {
      f[method] = mocks[id].original;
    }
  };
};