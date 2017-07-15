# sentiment-multilang
### Multilanguage AFINN-based and emojis sentiment analysis for Node.js

Sentiment is a Node.js module that uses the [AFINN-111](http://www2.imm.dtu.dk/pubdb/views/publication_details.php?id=6010) wordlist to perform [sentiment analysis](http://en.wikipedia.org/wiki/Sentiment_analysis) on arbitrary blocks of input text.

He can detect automaticaly the lang if it's not provided at call.

He has full support on emoji analysis.

This project is the fork of the original sentiment project: https://github.com/thisandagain/sentiment

## Installation
`npm install sentiment-multilang --save`

## Usage
```javascript
// Require the sentiment-multilang module
var sentiment = require('sentiment-multilang');

// Use the module to get sentiment from texts.
var r1 = sentiment('Cats are stupid.','en');
console.dir(r1);        // Vote: 'negative'

var r2 = sentiment('Cats are totally amazing!','en');
console.dir(r2);        // Vote: 'positive'

var r3 = sentiment('I gatti sono stupidi.','it');
console.dir(r3);        // Vote: 'negative'

var r4 = sentiment('I gatti sono totalmente stupendi!','it');
console.dir(r4);        // Vote: 'positive'
```

## Test
```bash
npm test
```
