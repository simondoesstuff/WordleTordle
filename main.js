import {generatePossibilities} from "./wordFilter.js";
import Input from 'input';


(async () => {
    let blacklistLetters = "";
    let containsLetters = "";
    let subsetLetters = "";

    console.log("Welcome to WordleTordle!");
    console.log("Remember, the best starting word is \"OATER\"");

    while (true) {
        blacklistLetters = await Input.text(`Blacklisted Letters\t(${blacklistLetters}):`);
        containsLetters = await Input.text(`Contains Letters\t(${containsLetters}):`);
        subsetLetters = await Input.text(`Subset Letters\t(${subsetLetters}):`);

        let blackArray = blacklistLetters.split('');
        let containsArray = containsLetters.split('');
        let subsetArray = subsetLetters.split('').map(letter => letter === '-' ? undefined : letter);

        let nextPage = true;
        let possibilities = generatePossibilities(blackArray, containsArray, subsetArray);

        while (nextPage) {
            // only show the first 50
            console.log(possibilities.slice(0, 50));
            nextPage = await Input.confirm("Next Page?", {default: false});
            // remove the first 100 elements
            possibilities = possibilities.slice(50);
        }

        console.log("\n");
    }
})();