const fs = require('fs');

const dict = [];
let words;

module.exports.fromFile = function(filepPath) {
    words = fs.readFileSync('./assets/ita.txt').toString().split('\n');
    return init(words)
}

module.exports.fromArray = function(array) {
    return init(array);
}

module.exports.fromObject = function(obj) {
    
}

const init = function(words) {
    words.forEach((word, wordIndex) => {
        word.split('').forEach((letter, letterIndex) => {
            dict[letterIndex] = dict[letterIndex] || {}; //to be changed in array or map;
            dict[letterIndex][letter] = dict[letterIndex][letter] || new Set();
            dict[letterIndex][letter].add(wordIndex);
        });
        dict[word.length] = dict[word.length] || {};
        dict[word.length]['.'] = dict[word.length]['.'] || new Set();
        dict[word.length]['.'].add(wordIndex);
    });
}

const getMatches = function(word, startIndex) {
    return word.split('')
    .reduce(function (previous, current, index) {
        index+=startIndex;
        if (!previous) return dict[index][current];
        let currentSet = dict[index][current];
        return new Set([...currentSet].filter(_ => previous.has(_)));
    }, null)
}

module.exports.search = function (tokens) {
    let index = 0;
    let result = tokens
        .map((word) => {
            index += typeof word === 'string' ? word.length : word;
            if (typeof word === 'number') return null;
            return getMatches(word, index-word.length);
        })
        .concat([dict[index]['.']])
        .filter(el => !!el)
        .reduce((prev, curr) => new Set([...curr].filter(_ => prev.has(_))));
    
    return [...result].map(index => words[index]);
}