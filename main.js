import {generatePossibilities} from "./wordFilter.js";
import Input from 'input';

console.log("Welcome to WordleTordle!");
console.log("Remember, the best starting word is \"OATER\"");

(async () => {
    let blacklistLetters;
    let containsLetters;
    let subsetLetters;

    while (true) {
        blacklistLetters = await Input.text(`Blacklisted Letters:`, {default: blacklistLetters ? blacklistLetters : undefined});
        containsLetters = await Input.text(`Contains Letters:`, {default: containsLetters ? containsLetters : undefined});
        subsetLetters = await Input.text(`Subset Letters:`, {default: subsetLetters ? subsetLetters : undefined});

        let blackArray = blacklistLetters.split('');
        let containsArray = containsLetters.split('');
        let subsetArray = subsetLetters.split('').map(letter => letter === '-' ? undefined : letter);

        let nextPage = true;
        let possibilities = generatePossibilities(blackArray, containsArray, subsetArray);

        while (nextPage) {
            // only show the first 50
            console.log(possibilities.slice(0, 50));

            let choice = await Input.select('Keep searching?', [
                {name: 'Fine-tune parameters', value: 0},
                {name: 'View next page', value: 1},
                {name: 'Restart', value: 2}
            ]);

            switch (choice) {
                case 1:
                    break;
                case 2:
                    blacklistLetters = undefined;
                    containsLetters = undefined;
                    subsetLetters = undefined;
                    nextPage = false;
                    break;
                case 0:
                    nextPage = false;
                    break;
            }

            // remove the first 100 elements
            possibilities = possibilities.slice(50);
        }

        console.log("\n");
    }
})();
