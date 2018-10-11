// const FuzzySearch = require('./fuzzy-search');
const fs = require('fs');

// const time3 = new Date().getTime();

// console.log(searchRegex(/^\w{1}(k)$/));
// console.log(searchRegex(/^(ba)\w{2}(na)$/));
// console.log(searchRegex(/^(w)\w{5}(s)$/))



// console.log('Regex search result: ', (time4 - time3));



const words = fs.readFileSync('./assets/ita.txt');

const t1 = new Date().getTime();

console.log(searchRegex(regexBuilder('ba**na')));
console.log(searchRegex(regexBuilder('w***a')));
console.log(searchRegex(regexBuilder('*k')));
console.log(searchRegex(regexBuilder('***ll*l*')));

const t2 = new Date().getTime();
console.log('new Regex search result: ', (t2 - t1));

const t3 = new Date().getTime();
console.log(searchRegex(/^(ba)\w{2}(na)$/));
console.log(searchRegex(/^(w)\w{3}(a)$/));
console.log(searchRegex(/^\w{1}(k)$/));
console.log(searchRegex(/^\w{3}(ll)\w{1}(l)\w{1}$/));
const t4 = new Date().getTime();
console.log('slash slash search result: ', (t4 - t3));



// const time3 = new Date().getTime();

// const time4 = new Date().getTime();

// console.log('Regex search result: ', (time4 - time3));

// const time4 = new Date().getTime();

// console.log('Regex search result: ', (time4 - time3));
function regexBuilder(str) {
    const res = str.split('')
        .map(x => x==='*' ? 1 : x)
        .reduce((prev, curr, i, arr) => {
            if (typeof prev === 'string' || typeof prev === 'number') prev = [prev];
            let lastInserted = prev[prev.length-1];
            if ((typeof lastInserted === 'number' && typeof curr === 'number') ||
                (typeof lastInserted === 'string' && typeof curr === 'string')) {
                prev.pop();
                return prev.concat([lastInserted+curr]);
            }
            prev.pop();
            return prev.concat([lastInserted, curr])
        })
        .map(token => {
            if (typeof token === 'number') {
                return '\\w{'+token+'}';
            }
            else return '('+token+')';
        });
        
        return new RegExp(['^', ...res, '$'].join(''));
}

function searchRegex(regex) {
    return words.toString()
        .split('\n')
        .filter(w => regex.test(w));
}


// const time1 = new Date().getTime();

// FuzzySearch.fromFile('./assets/ita.txt');

// console.log(FuzzySearch.search([1, 'k']));
// console.log(FuzzySearch.search(['ba', 2, 'na']));
// console.log(FuzzySearch.search(['w', 5, 's']))

// const time2 = new Date().getTime();

// console.log('Fuzzy search result: ', (time2 - time1));