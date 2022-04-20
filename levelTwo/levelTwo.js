'use strict';

const prompt = require('prompt')

prompt.start();

let characterInfo;

function levelTwo(character) {
  characterInfo = character,
  instanceOne(character);
}

async function instanceOne() {
  console.log("How do you find the minimum of x and y using JavaScript?");
        console.log("");
        console.log("A: min(x,y);");
        console.log("B: Math.min(x,y)");
        console.log("C: Math.min(x y)");

  await prompt.get("answer", function (error, result) {
    if (
      result.answer.toLowerCase() === "a" ||
      result.answer.toLowerCase() === "c"
    ) {
      console.log(
        "You tripped and rolled your ankle dropping the 15 shillings you received earlier. Stamina -10"
      );
      characterInfo.score -= 5;
      console.log(characterInfo);
    } else if (result.answer.toLocaleLowerCase() === "b") {
      console.log("That is correct, agility +5");
      characterInfo.score += 5;
      console.log(characterInfo);

    } else {
      console.log("Please choose only A, B, or C");
      instanceOne();
    }
  });
}

module.exports = levelTwo