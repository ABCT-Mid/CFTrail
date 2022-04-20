'use strict'

const prompt = require('prompt');

const getLevel2_0 = require('../player/index.js')

prompt.start();

let characterInfo;

function levelOne(character) {
  characterInfo = character;
  instanceOne(characterInfo);
  return characterInfo;
}

async function instanceOne() {
  console.log(
    "TRUE OR FALSE: You can change a const value after setting it."
  );
  const { answer } = await prompt.get(["answer"])
    if (
      answer.toLowerCase() === "tru" ||
      answer.toLowerCase() === "true" ||
      answer.toLowerCase() === "t"
    ) {
      console.clear();
      console.log(
        'OOPS, Incorrect! "const" is a signal that the identifier won\'t be reassigned.'
      );
      console.log(characterInfo);
      characterInfo.score -= 5;
      let level2_0 = {
        FunctionName: "Game_Level2_0",
        Payload: JSON.stringify(characterInfo),
      };
      getLevel2_0(level2_0);
    } else if (
      answer.toLowerCase() === "false" ||
      answer.toLowerCase() === "f"
    ) {
      console.clear();
      console.log("Wow, I'm impressed! here is a token from me old boot");
      setTimeout(() => {
        console.log("THE PRISONER HANDS YOU 15 SHILINGS!");
        characterInfo.score += 5;
        console.log(characterInfo);
      }, 3000);
    } else {
      console.log("Please answer with only a True or False");
      instanceOne();
    }
}


module.exports = levelOne