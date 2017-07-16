/*
 * If you want run tests please install the test framework Mocha (https://mochajs.org).
 * Then type the command on the parent folder: mocha test
 */

// Require assert mocha
var assert = require('assert');

// Require the sentiment module
var sentiment = require('../index');

describe('English', function () {
  it('It should return positive or negative', function () {
    assert.equal(sentiment('Cats are stupid.', 'en').vote, 'negative');
    assert.equal(sentiment('Cats are totally amazing!', 'en').vote, 'positive');
  });
});

describe('Italian', function () {
  it('It should return positive or negative', function () {
    assert.equal(sentiment('Il mare è bello', 'it').vote, 'positive');
    assert.equal(sentiment('I gatti sono stupidi.', 'it').vote, 'negative');
  });
});

describe('Wrong language', function () {
  it('It should return positive, negative or neutral', function () {
    assert.equal(sentiment('Seems somebody had a good meal! @wildelifeanimal #lion #safari #cats #wildlife #Africa #adventure #offroad https://t.co/6cX7hAlrYY', 'en').vote, 'positive');
    assert.equal(sentiment('Seems somebody had a good meal! @wildelifeanimal #lion #safari #cats #wildlife #Africa #adventure #offroad https://t.co/6cX7hAlrYY', 'it').vote, 'neutral');
  });
});

describe('Language detection', function () {
  it('It should return positive, negative or neutral', function () {
    assert.equal(sentiment('Seems somebody had a good meal! @wildelifeanimal #lion #safari #cats #wildlife #Africa #adventure #offroad https://t.co/6cX7hAlrYY').vote, 'positive');
  });
});

describe('Emoji support', function () {
  it('It should return positive or negative in any language or without', function () {
    assert.equal(sentiment('♥', 'en').vote, 'positive');
    assert.equal(sentiment('♥', 'it').vote, 'positive');
    assert.equal(sentiment('😭', 'en').vote, 'negative');
    assert.equal(sentiment('😭', 'it').vote, 'negative');
    assert.equal(sentiment('♥').vote, 'positive');
    assert.equal(sentiment('😭').vote, 'negative');
  });
});

// @todo test negation