"use strict";

const AWS = require("aws-sdk");
AWS.config.update({
  region: "us-west-2",
});

const axios = require("axios");

const prompt = require("prompt");

prompt.start();

const sns = new AWS.SNS();

const snsArnPrologue = "arn:aws:sns:us-west-2:195095073964:Game_Intro";

let gamePrologue = {
  Message: "Game_Prologue_Start",
  TopicArn: snsArnPrologue,
};

let character;

let prologueParams = {
  FunctionName: "Game_Prologue",
  Payload: JSON.stringify("Start Prologue"),
};

function getPrologue(key) {
  const response = new AWS.Lambda()
    .invoke(key)
    .promise()
    .then((data) => {
      console.clear();
      console.log(data.Payload);
    })
    .then(() => {
      setTimeout(() => {
        console.log(
          "*You recieve a menacing look from a scrawny bloke in chains*"
        );
      }, 3000);
    })
    .then(() => {
      setTimeout(async () => {
        console.log("Whats your name!");
        const { username } = await prompt.get(["username"]);
        console.log("Whats your occupation?");
        const { job } = await prompt.get(["job"]);
        character = {
          name: username,
          occupation: job,
          score: 75,
        };
        console.clear();
        console.log("Great you are: ", character);
        //TODO
        //let user say yes or no to reinput data
        //if no then call getPrologue() again
        let level1_0 = {
          FunctionName: "Game_Level1_0",
          Payload: JSON.stringify(character),
        };
        getLevel1_0(level1_0);
      }, 5000);
    })
    .catch((error) => {
      console.error(error.message);
    });
}

function getLevel1_0(key) {
  const response = new AWS.Lambda()
    .invoke(key)
    .promise()
    .then((data) => {
      let parsed = JSON.parse(data.Payload);
      console.log(parsed.body);
    })
    .then(() => {
      setTimeout(() => {
        console.log(
          "TRUE OR FALSE: You can change a const value after setting it."
        );
        instanceOne();
      }, 3000);
    })
    .catch((error) => {
      console.error(error);
    });
}

function instanceOne() {
  prompt.get("answer", function (err, result) {
    if (
      result.answer.toLowerCase() === "tru" ||
      result.answer.toLowerCase() === "true" ||
      result.answer.toLowerCase() === "t"
    ) {
      console.clear();
      console.log(
        'OOPS, Incorrect! "const" is a signal that the identifier won\'t be reassigned.'
      );
      character.score -= 5;
      console.log(character);
      let level2_0 = {
        FunctionName: "Game_Level2_0",
        Payload: JSON.stringify(character),
      };
      getLevel2_0(level2_0);
    } else if (
      result.answer.toLowerCase() === "false" ||
      result.answer.toLowerCase() === "f"
    ) {
      console.clear();
      console.log("Wow, I'm impressed! here is a token from me old boot");
      setTimeout(() => {
        console.log("THE PRISONER HANDS YOU 15 SHILINGS!");
        character.score += 5;
        console.log(character);
        let level2_0 = {
          FunctionName: "Game_Level2_0",
          Payload: JSON.stringify(character),
        };
        getLevel2_0(level2_0);
      }, 3000);
    } else {
      console.log("Please answer with only a True or False");
      instanceOne();
    }
  });
}

function getLevel2_0(key) {
  const response = new AWS.Lambda()
    .invoke(key)
    .promise()
    .then((data) => {
      let parsed = JSON.parse(data.Payload);
      setTimeout(() => {
        console.clear();
        console.log(parsed.body);
      }, 5000);
    })
    .then(() => {
      setTimeout(() => {
        // Refactor for actual input for switch
        console.log("How do you find the minimum of x and y using JavaScript?");
        console.log("");
        console.log("A: min(x,y);");
        console.log("B: Math.min(x,y)");
        console.log("C: Math.min(x y)");

        instanceTwo();
      }, 9000);
    })
    .catch((error) => {
      console.error(error);
    });
}

function instanceTwo() {
  prompt.get("answer", function (error, result) {
    if (
      result.answer.toLowerCase() === "a" ||
      result.answer.toLowerCase() === "c"
    ) {
      console.log(
        "You tripped and rolled your ankle dropping the 15 shillings you received earlier. Stamina -10"
      );
      character.score -= 5;
      console.log(character);
      let level3_0 = {
        FunctionName: "Game_Level3_0",
        Payload: JSON.stringify(character),
      };
      getLevel3_0(level3_0);
    } else if (result.answer.toLocaleLowerCase() === "b") {
      console.log("That is correct, agility +5");
      character.score += 5;
      console.log(character);
      let level3_0 = {
        FunctionName: "Game_Level3_0",
        Payload: JSON.stringify(character),
      };
      getLevel3_0(level3_0);
    } else {
      console.log("Please choose only A, B, or C");
      instanceTwo();
    }
  });
}

function getLevel3_0(key) {
  const response = new AWS.Lambda()
    .invoke(key)
    .promise()
    .then((data) => {
      let parsed = JSON.parse(data.Payload);
      console.clear();
      console.log(character);
      console.log(parsed.body);
    })
    .then(() => {
      console.log(
        "Given the Dragon class, how would you invoke the breathesFire method?"
      );
      prompt.get("answer", function (error, result) {
        if (result.answer === "Dragon.breathesFire();") {
          console.log("Congratulations, you chose wisely.");
          console.log(
            "May you have as much fun on your job search as you did during this game."
          );
        } else {
          setTimeout(() => {
            console.log("....");
          }, 3000);
          setTimeout(() => {
            console.log(".......");
          }, 6000);
          setTimeout(() => {
            console.log("..........");
          }, 9000);
          setTimeout(() => {
            sns
              .publish(gamePrologue)
              .promise()
              .then((data) => {
                console.log(data);
                console.log("The Game has Begun");
                getPrologue(prologueParams);
              })
              .catch((error) => {
                console.log(error);
              });
          }, 10000);
          async function postResults() {
            let resultsUrl = `https://25ubvmru83.execute-api.us-west-2.amazonaws.com/Production/game`;
            let data = {
              id: character.occupation,
              username: character.name,
              score: character.score.toString(),
            };

            let headers = { "Content-Type": "application/json" };

            try {
              await axios.post(resultsUrl, JSON.stringify(data), {
                headers: headers,
              });
            } catch (error) {
              console.log(
                "AXIOS ------------------------------------",
                error.message
              );
            }
          }
          postResults();
        }
      });
    });
}


sns
  .publish(gamePrologue)
  .promise()
  .then((data) => {
    console.log(data);
    console.log("The Game has Begun");
    getPrologue(prologueParams);
  })
  .catch((error) => {
    console.log(error);
  });
