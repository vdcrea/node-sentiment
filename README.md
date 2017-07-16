# sentiment-multilang
### Multilanguage AFINN-based and emojis sentiment analysis for Node.js

Sentiment is a Node.js module that uses the [AFINN-111](http://www2.imm.dtu.dk/pubdb/views/publication_details.php?id=6010) wordlist to perform [sentiment analysis](http://en.wikipedia.org/wiki/Sentiment_analysis) on arbitrary blocks of input text.

He can detect automaticaly the lang if it's not provided at call.

He has full support on emoji analysis.

This project is a fork of the original sentiment project: https://github.com/thisandagain/sentiment

## Installation
`npm install sentiment-multilang --save`

## Usage
```javascript
// Require the sentiment-multilang module
var sentiment = require('sentiment-multilang');

// Use the module to get sentiment from texts.
var r1 = sentiment('Cats are stupid.','en');
console.dir(r1);        // Vote: 'negative'
var r1 = sentiment('Cats are stupid.');
console.dir(r1);        // Vote: 'negative' and english detected

var r2 = sentiment('Cats are totally amazing! ♥','en');
console.dir(r2);        // Vote: 'positive'

var r3 = sentiment('I gatti sono stupidi. 😭','it');
console.dir(r3);        // Vote: 'negative'

// Sample response for "Seems somebody had a good meal! @wildelifeanimal #lion #safari #cats #wildlife #Africa #adventure #offroad https://t.co/6cX7hAlrYY ♥"
{
  score: 8,
  comparative: 0.5,
  vote: 'positive',
  tokens:
   [ 'seems',
     'somebody',
     'had',
     'a',
     'good',
     'meal',
     '@wildelifeanimal',
     'lion',
     'safari',
     'cats',
     'wildlife',
     'africa',
     'adventure',
     'offroad',
     'httpstco6cx7halryy',
     '♥' ],
  words: [ '♥', 'adventure', 'good' ],
  positive: [ '♥', 'adventure', 'good' ],
  negative: [],
  language: 'en'
}

```

## Test
```bash
npm test
```
