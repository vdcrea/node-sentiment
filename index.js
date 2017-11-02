/*
 * Multilanguage sentiment analysis for Node.js
 */
var oDictionary = require('./lib/lexicon.js');
var oLangDetect = new (require('languagedetect'));
var sw = require('stopwords');
var _ = require('lodash');

function tokenize(input) {
  return (input.constructor === Array) ? input : input
    .toLowerCase()
    .replace(/\r?\n|\r/g, ' ') // line breaks changed to space https://stackoverflow.com/a/10805292
    .replace(/[.,\/#!$%\^&\*;:{}=_`\"~()]/g, '')
    .replace(/\s{2,}/g, ' ') // remove extra spaces https://stackoverflow.com/a/4328722
    .split(' ');
};

// Performs sentiment analysis on the provided input 'phrase'
module.exports = function (sPhrase, sLangCode, mCallback) {

  if (typeof sPhrase === 'undefined') {
    sPhrase = '';
  }

  // Storage objects
  var aTokens = tokenize(sPhrase),
    iGlobalScore = 0,
    aWords = [],
    meaningfulWords = [], // tokens/words with stopwords excluded
    aPositive = [],
    aNegative = [],
    bNegation = false;

  // Detect language if needed (beta must be performed on each word for more efficiency)
  if (sLangCode == null) {
    var aDetectedLang = oLangDetect.detect(aTokens.join(' '), 1);
    if (aDetectedLang[0]) {
      sLangCode = aDetectedLang[0][0].substring(0, 2);
    }
  }

  // Iterate over tokens
  var len = aTokens.length;
  while (len--) {
    var sToken = String(aTokens[len]), iCurrentScore = 0;

    // Negation flag
    if (oDictionary["negations"][sLangCode] && oDictionary["negations"][sLangCode][sToken]) {
      bNegation = true;
    }

    if (! oDictionary[sLangCode] || ! oDictionary[sLangCode][sToken]) {
      if (! oDictionary['emoji'][sToken]) {
        continue;
      }
      // It's an emoji
      iCurrentScore = Number(oDictionary['emoji'][sToken]);
    } else {
      // It's a word
      iCurrentScore = Number(oDictionary[sLangCode][sToken]);
    }

    aWords.push(String(sToken));

    // Is it a stopword?
    switch (sLangCode) {
      case 'en':
        if (!_.includes(sw.english, sToken)) { meaningfulWords.push(sToken); }
        break;
      case 'fr':
        if (!_.includes(sw.french, sToken)) { meaningfulWords.push(sToken); }
        break;
      case 'es':
        if (!_.includes(sw.spanish, sToken)) { meaningfulWords.push(sToken); }
        break;
      case 'it':
        if (!_.includes(sw.italian, sToken)) { meaningfulWords.push(sToken); }
        break;
      case 'de':
        if (!_.includes(sw.german, sToken)) { meaningfulWords.push(sToken); }
        break;
      case 'nl':
        if (!_.includes(sw.dutch, sToken)) { meaningfulWords.push(sToken); }
        break;
      default:
        meaningfulWords.push(sToken);
    }

    if (iCurrentScore > 0) {
      aPositive.push(String(sToken));
    } else if (iCurrentScore < 0) {
      aNegative.push(String(sToken));
    }
    iGlobalScore += iCurrentScore;
  }

  // Handle negation detection flag
  iGlobalScore = iGlobalScore * (bNegation === true ? -1 : 1);

  // Handle optional async interface
  var oResult = {
    score: iGlobalScore,
    comparative: iGlobalScore / aTokens.length,
    comparativeMeaningfull: iGlobalScore / meaningfulWords.length,
    vote: 'neutral',
    tokens: aTokens,
    meanings: meaningfulWords,
    words: aWords,
    positive: aPositive,
    negative: aNegative,
    negation: bNegation,
    language: sLangCode
  };

  // Classify text as positive, negative or neutral.
  if (oResult.score > 0) {
    oResult.vote = 'positive';
  } else if (oResult.score < 0) {
    oResult.vote = 'negative';
  }

  if (mCallback == null) {
    return oResult;
  }

  process.nextTick(function () {
    mCallback(null, oResult);
  });
};
