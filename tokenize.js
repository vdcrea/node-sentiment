// treeBank tokenizer
const natural = require('natural')
// chinese tokenizer
const Segment = require('segment')
// japanese tokenizer
const tinySegmenter = require('tiny-segmenter')

module.exports = function (string, lang) {

  // Output
  let o = []

  if (!lang || !string) {
    console.warn('no lang or string passed to tokenizer')
    return o
  }

  if (lang == 'zh') {
    let segment = new Segment()
    o = segment.doSegment(string, {
      simple: true
    })
  } else if (lang == 'jp') {
    let segmenter = new TinySegmenter()
    o = segmenter.segment(string)
  } else {
    let tokenizer = new natural.TreebankWordTokenizer()
    o = tokenizer.tokenize(string)
  }

  return o

}
