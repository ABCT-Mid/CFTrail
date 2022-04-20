"use strict";

const AWS = require("aws-sdk");
AWS.config.update({
  region: "us-west-2",
});

require("dotenv").config();

const axios = require("axios");
const prompt = require("prompt");
const levelOne = require("../levelOne/levelOne.js");
const levelTwo = require("../levelTwo/levelTwo.js");

let apiURL = process.env.API_URL;
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
      setTimeout(async () => {
       await levelOne(character);
       let level2_0 = {
         FunctionName: "Game_Level2_0",
         Payload: JSON.stringify(character),
       };
       getLevel2_0(level2_0);
      }, 3000);
    })
    .catch((error) => {
      console.error(error);
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
        levelTwo(character);
        setTimeout(() => {
          let level3_0 = {
            FunctionName: "Game_Level3_0",
            Payload: JSON.stringify(character),
          };
          getLevel3_0(level3_0);
        }, 5000);
      }, 9000);
    })
    .catch((error) => {
      console.error(error);
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
            let data = {
              id: character.occupation,
              username: character.name,
              score: character.score.toString(),
            };

            let headers = { "Content-Type": "application/json" };

            try {
              await axios.post(apiURL.toString(), JSON.stringify(data), {
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
