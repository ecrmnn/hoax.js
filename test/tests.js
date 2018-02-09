'use strict';

const it = require('mocha').it;
const describe = require('mocha').describe;
const expect = require('chai').expect;
const hoax = require('../dist');

describe('Hoax.js Test Suite', () => {
  it('should mock console.warn', () => {
    const mock = hoax(console, 'warn');

    // eslint-disable-next-line
    console.warn('unicorn');
    // eslint-disable-next-line
    console.warn('rainbow');
    // eslint-disable-next-line
    console.warn('magic');

    expect(mock.calls).to.eql([
      ['unicorn'],
      ['rainbow'],
      ['magic'],
    ]);
  });

  it('should mock be resettable', () => {
    const logger = {
      logs: [],
      log(value) {
        this.logs.push(value);
      },
    };

    logger.log('cats');
    logger.log('fairy tales');

    const mock = hoax(logger, 'log');
    logger.log('chocolate forests');

    expect(logger.logs).to.eql([
      'cats',
      'fairy tales',
    ]);

    mock.reset();
    logger.log('candy rivers');

    expect(logger.logs).to.eql([
      'cats',
      'fairy tales',
      'candy rivers',
    ]);
  });

  it('should trigger and return from fake function', () => {
    const mock = hoax(process, 'cwd', () => '/fake/path/');

    const value = process.cwd();

    mock.reset();

    expect(value).to.be.eql('/fake/path/');
  });
});
