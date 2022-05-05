import {generatePossibilities} from "./wordFilter.js";
import Input from 'input';
import Chalk from "chalk";

console.log("Welcome to WordleTordle!\n");
console.log("Remember, the best starting word is \"OATER\"");
console.log("Enter the words you guess as you play the game.");
console.log("Writing a ^ after a letter means the letter is correct (green).");
console.log("Writing a * after a letter means the letter is in the wrong space (yellow).");
console.log("Writing nothing after the letter means the letter is incorrect (grey).\n");


(async () => { while (true) await doRound() })();


async function doRound() {
    let guesses = [];

    let blacklistLetters = [];
    let containsLetters = [];
    let subsetLetters = [];
    let antiSubsetLetters = [];

    while (true) {
        // better to be in uppercase to match the game
        guesses.forEach(guess => console.log('\t' + guess));

        // must be lowercase because the wordlist is in lowercase
        let nextGuess = (await Input.text("Enter next guess: ", { validate: s => s.length !== 0 })).toLowerCase();

        let matches = nextGuess.matchAll(/(\w)([\^*])?/g);

        { // this is like a foreach and a for loop combined
            let word = "";
            let i = 0;
            for (let match of matches) {
                let index = i++;
                let letter = match[1];
                let mod = match[2];

                if (mod === '^') {
                    subsetLetters[index] = letter;
                    word += Chalk.bgGreen(Chalk.blackBright(letter.toUpperCase()));
                } else if (mod === '*') {
                    antiSubsetLetters[index] = letter;
                    containsLetters.push(letter);
                    word += Chalk.bgYellow(Chalk.blackBright(letter.toUpperCase()));
                } else {
                    blacklistLetters.push(letter);
                    word += Chalk.bgGrey(Chalk.whiteBright(letter.toUpperCase()));
                }
            }

            guesses.push(word);
        }

        let nextPage = true;
        let possibilities = generatePossibilities(blacklistLetters, containsLetters, subsetLetters, antiSubsetLetters);

        while (nextPage) {
            // only show the first 50
            console.log(possibilities.slice(0, 50));

            let choice = await Input.select('Keep searching?', [
                {name: 'Enter next word', value: 0},
                {name: 'View next page', value: 1},
                {name: 'Restart', value: 2}
            ]);

            switch (choice) {
                case 1:
                    break;
                case 2:
                    console.log('\n');
                    return;
                case 0:
                    nextPage = false;
                    break;
            }

            // remove the first 100 elements
            possibilities = possibilities.slice(50);
        }

        console.log("\n");
    }
}
