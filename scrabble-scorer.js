// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};


function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   let word = input.question("Let's play some scrabble! Enter a word:");
  
   return word;

   // console.log("Let's play some scrabble! Enter a word:");
};

function simpleScorer(word) {
   let letterPoints = 0;
   for (let i = 0; i < word.length; i++) {
      letterPoints += 1; 
}
return letterPoints;
}
function vowelBonusScorer(word) {
   word = word.toUpperCase();
   let vowels = ["A", "E","I", "O", "U"];
   let letterPoints = 0;
   for (let i =0; i < word.length; i++) {
      if (vowels.includes(word[i])){
         letterPoints += 3;
      
      } else {letterPoints +=1};
   }
   return letterPoints;
}

function scrabbleScorer(word) {
   word = word.toLowerCase();
   let letterPoints = 0;
   for (let i = 0; i < word.length; i++){
      letterPoints += newPointStructure[word[i]]; 
}
return letterPoints;
}

   const scoringAlgorithms = [
     {
      name: "Scrabble",
      description: "The traditional scoring algorithm",
      scorerFunction: scrabbleScorer
   },

   {
      name: "Simpler Score",
      description: "Each letter is worth 1 point",
      scorerFunction: simpleScorer
   },

   { 
      name: "Bonus Vowels",
      description: "Vowels are 3 pts, consonants aer 1 pt",
      scorerFunction: vowelBonusScorer

   }
   ];

function scorerPrompt() {
   console.log(
      "Which scoring algorithm would you like to use?\n" +

      "0 - Simple: One point per character\n" +
      "1 - Vowel Bonus: Vowels are worth 3 points\n" +
      "2 - Scrabble: Uses scrabble point system\n");

   let userInput = input.question('Enter 0, 1, or 2');

   return scoringAlgorithms[userInput];
}

function transform(oldPointStructure) {
   let newPointStructure = {};

   for (const pointValue in oldPointStructure){
     for (let i = 0; i < oldPointStructure[pointValue].length; i++){
      newPointStructure[oldPointStructure[pointValue][i].toLowerCase()] = parseInt(pointValue);
     }
   }
   return newPointStructure;

}

let newPointStructure = transform(oldPointStructure);

function runProgram() {
  let word =  initialPrompt();
   let scorer = scorerPrompt();
   console.log(`Score for ${word}: ${scorer.scorerFunction(word)}`)
};

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
