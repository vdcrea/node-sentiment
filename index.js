/*
 * Multilanguage AFINN-based sentiment analysis for Node.js
 */
var afinn = require('./lib/AFINN.js');
var oLangDetect = new (require('languagedetect'));

function tokenize(input) {
  return input
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=_`\"~()]/g, '')
    .split(' ');
};

// Performs sentiment analysis on the provided input 'phrase'
module.exports = function (phrase, lang, callback) {
  // Parse arguments
  if (typeof phrase === 'undefined') phrase = '';
  if ((typeof(lang) === 'undefined') || !afinn["langs"][lang]) lang = null;
  if (typeof callback === 'undefined') callback = null;

  // Storage objects
  var tokens = tokenize(phrase),
    score = 0,
    words = [],
    positive = [],
    negative = [];


  if (lang == null) {
    var aDetectedLang = oLangDetect.detect(tokens.join(' '), 1);
    if (aDetectedLang[0]) {
      lang = aDetectedLang[0][0].substring(0, 2);
    }
  }

  // Iterate over tokens if language is knowned
  var len = tokens.length;
  while (len--) {

    var negation = (afinn["negations"][lang] && afinn["negations"][lang][tokens[len - 1]]) ? -1 : 1,
      obj = afinn["truncated"][lang]
        ? tokens[len].replace(/[aeiouúäâàáéèëêïîíìöôùüû]$/, "")
        : String(tokens[len]);

    if (! afinn[lang] || ! afinn[lang][obj]) {
      if (! afinn['emoji'][obj]) {
        continue;
      }

      // It's an emoji
      item = Number(afinn['emoji'][obj]);
    } else {
      // var prevobj = (len > 0) ? String(tokens[len-1]): "";
      var item = Number(afinn[lang][obj]);
    }


    words.push(obj);
    if (item > 0) {
      positive.push(obj);
    } else if (item < 0) {
      negative.push(obj);
    }
    score += item * negation;
  }

  // Handle optional async interface
  var result = {
    score: score,
    comparative: score / tokens.length,
    vote: 'neutral',
    tokens: tokens,
    words: words,
    positive: positive,
    negative: negative,
    language: lang
  };
  // Classify text as positive, negative or neutral.
  if (result.score > 0) {
    result.vote = 'positive';
  } else if (result.score < 0) {
    result.vote = 'negative';
  }

  if (callback === null) {
    return result;
  }

  process.nextTick(function () {
    callback(null, result);
  });
};
