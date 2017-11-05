# node-sentiment [![Build Status](https://travis-ci.org/vdcrea/node-sentiment.svg?branch=multilingual)](https://travis-ci.org/vdcrea/node-sentiment)
### Multi-language Text sentiment analysis for Node.js

Sentiment is a Node.js module that uses the https://sites.google.com/site/datascienceslab/projects/multilingualsentiment wordlists to perform [sentiment analysis](http://en.wikipedia.org/wiki/Sentiment_analysis) on arbitrary blocks of input text.

This is a very basic/binary Sentiment analysis without negation. It's binary because no weight value is associated to the words.

Lot of sentiment modules performs more accurate results for sentiment analysis. They are almost all specific to a language. This module aims to let you have consistent and comparable results across multiple languages.

Multi-lang support for:
- ar: Arabic
- bn: Bengali
- da: Danish
- de: German
- en: English
- es: Spanish
- fa: Farsi
- fr: French
- hi: Hindi
- it: Italian
- ja: Japanese
- no: Norwegian
- pl: Polish
- pt: Portuguese
- ru: Russian
- sv: Swedish
- zh: Chinese

He has not yet support on emoji analysis.

Language detection if not provided at call.

This project is a fork of the original sentiment project: https://github.com/thisandagain/sentiment

# Usage

## Installation
`npm install git://github.com/vdcrea/node-sentiment.git#multilingual --save`


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
