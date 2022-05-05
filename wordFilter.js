import wordList from "./wordList.js";


function sortByFrequency(list) {
    // first, create a map of letter -> frequency
    let frequencyMap = {};

    list.forEach(word => word.split('').forEach(letter => {
        if (frequencyMap[letter]) {
            frequencyMap[letter]++;
        } else {
            frequencyMap[letter] = 1;
        }
    }));

    // next, sort each word in the list by the frequency of its letters
    return list.sort((a, b) => {
        let aFreq = a.split('').reduce((acc, letter) => acc + frequencyMap[letter], 0);
        let bFreq = b.split('').reduce((acc, letter) => acc + frequencyMap[letter], 0);
        return bFreq - aFreq;
    });
}

export function generatePossibilities(blacklistLetters, containsLetters, subsetLetters, antiSubsetLetters) {
    return sortByFrequency(wordList).filter(word => {
        const letters = word.split("");

        return blacklistLetters.every(letter => !letters.includes(letter)) &&
            containsLetters.every(letter => letters.includes(letter)) &&
            (letters.every((letter, index) => (subsetLetters[index] === undefined || subsetLetters[index] === letter))) &&
            (letters.every((letter, index) => (antiSubsetLetters[index] === undefined || antiSubsetLetters[index] !== letter)));
    });
}