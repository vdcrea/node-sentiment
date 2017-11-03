/*
 * Multilanguage sentiment analysis for Node.js
 */
var oDictionary = require('./lib/lexicon.js');
var oLangDetect = new (require('languagedetect'));
var swEn = require('stopwords').english;
var swFr = require('stopwords').french;
var swEs = require('stopwords').spanish;
var swIt = require('stopwords').italian;
var swNl = require('stopwords').dutch;
var swDe = require('stopwords').german;

/**
 * Split a string into sentences
 * If tInput is an array, assume it has already been tokenized
 *
 * @param tInput
 * @returns {Array}
 */
function sentences(tInput) {
  if (tInput.length === 0) {
    return [];
  }
  return (tInput.constructor === Array) ? tInput : tInput.split(/(?:\.|?|!|¿|¡|:|;)+/);
};

/**
 * Split a sentence into words
 *
 * @param sInput
 * @returns {Array}
 */
function words(sInput) {
  if (sInput.length === 0) {
    return [];
  }
  return (sInput.constructor === Array) ? sInput : sInput
    .toLowerCase()
    .replace(/\r?\n|\r/g, ' ') // line breaks changed to space https://stackoverflow.com/a/10805292
    .replace(/[.,\/#!$%\^&\*;:{}=_`\"~()]/g, '')
    .replace(/\s{2,}/g, ' ') // remove extra spaces https://stackoverflow.com/a/4328722
    .split(' ');
};


/**
 * Split a string into sentences
 * and split sentences into words
 * returns an array of arrays
 *
 * @param string
 * @returns {Array}
 */
function tokenize(string) {
  var tokenized = sentences(string);
  for (var i = 0; i < tokenized.length; i++) {
    tokenized[i] = words(tokenized[i]);
  }
  return tokenized;
};


/**
 * sentiment analysis for a sentence/array of tokens
 * returns an array of objects
 * @param aSentenceTokens
 * @returns {Array}
 */
function sentimentSentence(aSentenceTokens, sLangCode) {

  // Output
  var sentiment = {
    score: 0,
    meanings: [],
    positive: [],
    negative: []
  };
  var bNegation: false;

  // Language detection
  if (sLangCode == null) {
    var aDetectedLang = oLangDetect.detect(aSentenceTokens.join(' '), 1);
    if (aDetectedLang[0]) {
      sLangCode = aDetectedLang[0][0].substring(0, 2);
    }
  }

  // Iterate over tokens
  for (var i = 0; i < aSentenceTokens.length; i++) {

    var sToken = String(aSentenceTokens[i]);
    var tokenScore = 0;

    // Negation flag
    if (oDictionary["negations"][sLangCode] && oDictionary["negations"][sLangCode][sToken]) {
      bNegation = true;
    }

    // Is it a stopword or a meaningful word?
    if (sToken.length > 0) { // sometimes last token is still an empty token (if last char is a \n enter?)
      switch (sLangCode) {
        case 'en':
          if (swEn.indexOf(sToken) == -1) { sentiment.meanings.push(sToken); }
          break;
        case 'fr':
          if (swFr.indexOf(sToken) == -1) { sentiment.meanings.push(sToken); }
          break;
        case 'es':
          if (swEs.indexOf(sToken) == -1) { sentiment.meanings.push(sToken); }
          break;
        case 'it':
          if (swIt.indexOf(sToken) == -1) { sentiment.meanings.push(sToken); }
          break;
        case 'nl':
          if (swNl.indexOf(sToken) == -1) { sentiment.meanings.push(sToken); }
          break;
        case 'de':
          if (swDe.indexOf(sToken) == -1) { sentiment.meanings.push(sToken); }
          break;
        default:
          sentiment.meanings.push(sToken);
      }
    }

    if (! oDictionary[sLangCode] || ! oDictionary[sLangCode][sToken]) {
      if (! oDictionary['emoji'][sToken]) {
        continue;
      }
      // It's an emoji
      tokenScore = Number(oDictionary['emoji'][sToken]);
    } else {
      // It's a word
      tokenScore = Number(oDictionary[sLangCode][sToken]);
    }

    // Push to Positive/Negative array
    if (tokenScore > 0) {
      sentiment.positive.push(String(sToken));
    } else if (tokenScore < 0) {
      sentiment.negative.push(String(sToken));
    }

    // Update sentiment score
    sentiment.score += tokenScore;

  }

  // Handle negation detection flag
  sentiment.score = sentiment.score * (bNegation === true ? -1 : 1);

  return sentiment;
};


/**
 * sentiment analysis for a text/array of sentences/array of tokens
 * returns an object
 */
function sentimentText(aTextSentences, sLangCode) {

  // Output
  var sentiment = {
    score: 0,
    vote: 'neutral',
    accuracy: 0,
    meanings: [],
    positive: [],
    negative: []
  };

  // Iterate over array of sentences
  for (var i = 0; i < aTextSentences.length; i++) {
    var sentenceSentiment = sentimentSentence(aTextSentences[i], sLangCode);
    sentiment.score += sentenceSentiment.score;
    sentiment.meanings.concat(sentenceSentiment.meanings);
    sentiment.positive.concat(sentenceSentiment.positive);
    sentiment.negative.concat(sentenceSentiment.negative);
  }

  // Handle vote
  if (sentiment.score > 0) {
    sentiment.vote = 'positive';
  } else if (sentiment.score < 0) {
    sentiment.vote = 'negative';
  }

  // Accuracy
  // Returns a percentage of words evaluated as sentimental
  // against all meaningful words (all tokens, stopwords excluded)
  sentiment.accuracy = (sentiment.positive.length + sentiment.negative.length) * 100 / sentiment.meanings.length;

  return sentiment;
};


/**
 * sentiment analysis on the provided input 'text'
 * returns an object
 */
module.exports = function (sText, sLangCode, mCallback) {

  if (typeof sText === 'undefined') {
    sText = '';
  }

  // Text is tokenized in an array of sentences
  // Each sentence is tokenized in an array of words
  sText = tokenize(sText);

  // Analyse sentiment
  var sentiment = sentimentText(sText, sLangCode);

  if (mCallback == null) {
    return sentiment;
  }

  process.nextTick(function () {
    mCallback(null, sentiment);
  });

};
