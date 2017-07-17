/*
 * If you want run tests please install the test framework Mocha (https://mochajs.org).
 * Then type the command on the parent folder: mocha test
 */

// Require assert mocha
var assert = require('assert');

// Require the sentiment module
var sentiment = require('../index');

var sText = 'Seems somebody had a good meal! @wildelifeanimal #lion #safari #cats #wildlife #Africa #adventure #offroad https://t.co/6cX7hAlrYY';

describe('English', function () {
  it('It should return positive or negative', function () {
    assert.equal(sentiment('Cats are stupid.', 'en').vote, 'negative');
    assert.equal(sentiment('Cats are totally amazing!', 'en').vote, 'positive');
  });
});

describe('French', function () {
  it('It should return positive or negative', function () {
    assert.equal(sentiment('Les chats sont stupides.', 'fr').vote, 'negative');
    assert.equal(sentiment('J\'aime bien les chats!', 'fr').vote, 'positive');
  });
});

describe('Wrong language', function () {
  it('It should return positive, negative or neutral', function () {
    assert.equal(sentiment(sText, 'en').vote, 'positive');
    assert.equal(sentiment(sText, 'fr').vote, 'neutral');
  });
});

describe('Negation', function () {
  it('It should handle negation and return a positive and a negative vote', function () {
    var oPositiveResponseFr = sentiment('j\'aime beaucoup ce morceau', 'fr'),
      oNegativeResponseFr = sentiment('C\'est de la merde ce morceau', 'fr'),
      oPositiveResponseEn = sentiment('Cats are so cool!', 'en'),
      oNegativeResponseEn = sentiment('Cats are not so cool!', 'en');

    assert.equal(oPositiveResponseFr.vote, 'positive', 'Positive vote in French');
    assert.equal(oNegativeResponseFr.vote, 'negative', 'Negation detection in French');
    assert.equal(oPositiveResponseEn.vote, 'positive', 'Positive vote in English');
    assert.equal(oNegativeResponseEn.vote, 'negative', 'Negation detection in English');
  });
});

describe('Language detection', function () {
  it('It should guess language and return a positive vote', function () {
    var oResponse = sentiment(sText);
    assert.equal(oResponse.vote, 'positive');
    assert.equal(oResponse.language, 'en');
  });
});

describe('Emoji support', function () {
  it('It should return positive or negative in any language or without', function () {
    assert.equal(sentiment('♥', 'en').vote, 'positive');
    assert.equal(sentiment('♥', 'fr').vote, 'positive');
    assert.equal(sentiment('😭', 'en').vote, 'negative');
    assert.equal(sentiment('😭', 'fr').vote, 'negative');
    assert.equal(sentiment('♥').vote, 'positive');
    assert.equal(sentiment('😭').vote, 'negative');
  });
});
