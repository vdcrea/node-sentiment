# node-sentiment
### Text and emojis sentiment analysis for Node.js

Sentiment is a Node.js module that uses the [AFINN-111](http://www2.imm.dtu.dk/pubdb/views/publication_details.php?id=6010) wordlist to perform [sentiment analysis](http://en.wikipedia.org/wiki/Sentiment_analysis) on arbitrary blocks of input text.

Multilanguage, only support for english, italian and french but built to be easily extended to any language (contribution are welcome)

Language detection if not provided at call.

He has full support on emoji analysis.

This project is a fork of the original sentiment project: https://github.com/thisandagain/sentiment

# Usage

## Installation
`npm install node-sentiment --save`


```javascript
// Require the node-sentiment module
var sentiment = require('node-sentiment');

// Use the module to get sentiment from texts.

// Vote: 'negative'
console.dir(sentiment('Cats are stupid.','en'));

// Vote: 'negative' and english detected
console.dir(sentiment('Cats are stupid.'));

// Vote: 'positive', english detected and negation detected
console.dir(sentiment('Cats are not so stupid.'));

// Vote: 'positive'
console.dir(sentiment('Cats are totally amazing! ♥','en'));

// Vote: 'negative'
console.dir(sentiment('I gatti sono stupidi. 😭','it'));

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

You can also play with node-sentiment in a terminal.
```bash
node cli.js "Cats are not so cool..."
```

# Test
```bash
npm test
```

# Changelog

### 18/07/2017 Minor release 0.0.5
Whole code review
Basic CLI interface added and project renamed to node-sentiment for npm package

### 17/07/2017 Minor release 0.0.4
Negation detection fix
Language detection feature POC added
