# hoax.js
> Mock objects with ease

[![travis](https://img.shields.io/travis/ecrmnn/hoax.js/master.svg?style=flat-square)](https://travis-ci.org/ecrmnn/hoax.js/builds)
[![npm version](https://img.shields.io/npm/v/hoax.js.svg?style=flat-square)](http://badge.fury.io/js/hoax.js)
[![npm downloads](https://img.shields.io/npm/dm/hoax.js.svg?style=flat-square)](http://badge.fury.io/js/hoax.js)
[![npm license](https://img.shields.io/npm/l/hoax.js.svg?style=flat-square)](http://badge.fury.io/js/hoax.js)
[![prs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![eslint](https://img.shields.io/badge/code_style-airbnb-blue.svg?style=flat-square)](https://github.com/airbnb/javascript)

### Installation
```bash
npm install hoax.js --save
```

### Usage
```javascript
const hoax = require('hoax.js');

const mock = hoax(console, 'log');

// Do not actually log to console
console.log('unicorn');
console.log('rainbow');
console.log('magic');

// Get calls to the mocked function
mock.calls;
//=> [
//=>   ['unicorn'],
//=>   ['rainbow'],
//=>   ['magic'],
//=> ]

// Reset when done
mock.reset();

// Does log to console
console.log('This will be logged');

// You may also provide a function to return whatever you want 
const mock = hoax(process, 'cwd', () => '/fake/path');

process.cwd();
//=> /fake/path

mock.reset();

process.cwd();
//=> /ecrmnn/hoax.js
```

### License
MIT © [Daniel Eckermann](http://danieleckermann.com)
