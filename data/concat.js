// run 'node concat.js' in the terminal
// to concat all text files in data in a js module
const dataFolder = './wordslist/';
const fs = require('fs');

const o = {};

const files = fs.readdirSync(dataFolder);

for (let file of files) {
  if (file != '.DS_Store') {
    let filename = file.split('.')[0].split('_');
    let lang = filename[2];
    let value = filename[0];

    if (!o[lang]) {
      o[lang] = {};
    }

    if (!o[lang][value]) {
      o[lang][value] = readFileContent(dataFolder, file);
    }

  }
}

writeFile('module.exports = ' + JSON.stringify(o));

function readFileContent(dataFolder, file) {
  var f = fs.readFileSync(dataFolder + '/' + file, 'utf8');
  return f.toString().replace(/\r?\n|\r/g, ' ').replace(/\s+$/, '').split(' ');
}

function writeFile(data) {
  fs.writeFile('index.js', data, 'utf8');
}
