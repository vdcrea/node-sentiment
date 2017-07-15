/*
 * If you want run tests please install the test framework Mocha (https://mochajs.org).
 * Then type the command on the parent folder: mocha test
 */

// Require assert mocha
var assert = require('assert');

// Require the sentiment module
var sentiment = require('../index');

describe('English', function() {
    it('It should return positive or negative', function() {
        assert.equal('negative', sentiment('Cats are stupid.', 'en').vote);
        assert.equal('positive', sentiment('Cats are totally amazing!', 'en').vote);
    });
});

describe('Italian', function() {
    it('It should return positive or negative', function() {
        assert.equal('positive', sentiment('Il mare è bello', 'it').vote);
        assert.equal('negative', sentiment('I gatti sono stupidi.','it').vote);
    });
});

describe('Wrong language', function() {
    it('It should return positive, negative or neutral', function() {
        assert.equal('positive', sentiment('Seems somebody had a good meal! #lion #safari #cats #wildlife #Africa #adventure #offroad https://t.co/6cX7hAlrYY', 'en').vote);
        assert.equal('neutral', sentiment('Seems somebody had a good meal! #lion #safari #cats #wildlife #Africa #adventure #offroad https://t.co/6cX7hAlrYY', '8g8u').vote);
        assert.equal('neutral', sentiment('Seems somebody had a good meal! #lion #safari #cats #wildlife #Africa #adventure #offroad https://t.co/6cX7hAlrYY', 'it').vote);
    });
});

describe('Emoji support', function() {
    it('It should return positive or negative in any language', function() {
        assert.equal('positive', sentiment('♥', 'en').vote);
        assert.equal('positive', sentiment('♥', 'it').vote);
        assert.equal('negative', sentiment('😭', 'en').vote);
        assert.equal('negative', sentiment('😭', 'it').vote);
    });
});

// @todo test negation