'use strict';

const AWS = require('aws-sdk');
AWS.config.update({
  region:'us-west-2',
});

const prompt = require('prompt');

prompt.start();

const sns = new AWS.SNS();

const snsArnPrologue = 'arn:aws:sns:us-west-2:195095073964:Game_Intro';
// const snsArnPrologue = 'arn:aws:sns:us-west-2:195095073964:Game_Intro';
// const snsArnPrologue = 'arn:aws:sns:us-west-2:195095073964:Game_Intro';
// const snsArnPrologue = 'arn:aws:sns:us-west-2:195095073964:Game_Intro';

let gamePrologue = {
  Message: 'Game_Prologue_Start',
  TopicArn: snsArnPrologue,
  // Protocol: lambda
};
let character;

let prologueParams = {
  FunctionName: 'Game_Prologue',
  Payload: JSON.stringify('Start Prologue'),
}

function getPrologue(key){
  const response = new AWS.Lambda().invoke(key).promise()
  .then((data) => {
    console.clear();
    console.log(data.Payload);
  }).then(()=>{
    setTimeout(() => {
          console.log("*You recieve a menacing look from a scrawny bloke in chains*");
        }, 3000);
  }).then(()=>{
    setTimeout(async () => {
        console.log("Whats your name!");
        const { username } =  await prompt.get(["username"]);
        console.log("Whats your occupation?");
        const { job } =  await prompt.get(["job"]);
        character = {
          name : username,
          occupation : job,
          score: 75
        }
        console.clear();
        console.log('Great you are: ',  character)
        //TODO
        //let user say yes or no to reinput data
        //if no then call getPrologue() again
        let level1_0 = {
          FunctionName: 'Game_Level1_0',
          Payload: JSON.stringify(character),
        }
        getLevel1_0(level1_0);
      }, 5000);
  })
  .catch((error) =>{
    console.error(error.message)
  })
}

function getLevel1_0 (key) {
  const response = new AWS.Lambda().invoke(key).promise()
  .then((data) => {
    let parsed = JSON.parse(data.Payload)
    console.log(parsed.body)
  }).then(() => {
    setTimeout(() => {
      console.log('TRUE OR FALSE: You can change a const value after setting it.');
      prompt.get('answer', function (err, result) {
        if(result.answer.toLowerCase() === 'tru' || result.answer.toLowerCase() === 'true' ||result.answer.toLowerCase() ===  't'){
          console.clear();
          console.log('OOPS, Incorrect! \"const\" is a signal that the identifier won\'t be reassigned.')
          character.score -= 5;
          console.log(character);
          let level2_0 = {
            FunctionName: 'Game_Level2_0',
            Payload: JSON.stringify(character),
          }
          getLevel2_0(level2_0);
        }
        else if(result.answer.toLowerCase() === 'false' || result.answer.toLowerCase() === 'f'){
          console.clear()
          console.log('Wow, I\'m impressed! here is a token from me old boot')
          setTimeout(() => {
            console.log('THE PRISONER HANDS YOU 15 SHILINGS!');
            character.score += 5
            console.log(character);
            let level2_0 = {
              FunctionName: 'Game_Level2_0',
              Payload: JSON.stringify(character),
            }
            getLevel2_0(level2_0);
          }, 3000)
        }
      });
    }, 3000);
  })
  .catch(error => {
    console.error(error);
  })
}

function getLevel2_0 (key) {
  const response = new AWS.Lambda().invoke(key).promise()
  .then(() => {
    console.log('from level 2 lambda', response)
  })
}


























// async function getResponse(key) {
//   return new AWS.Lambda().invoke(key);
// }

// async function gameStart() {
//   let response = await getResponse(brandNewParams);
//   console.log("undefined?", response);
//   setTimeout(() => {
//     console.log("*You recieve a menacing look from a scrawny bloke in chains*");
//   }, 2000);
//   setTimeout(() => {
//     console.log("Whats your name!");
//   }, 5000);
//   const { username } = await prompt.get(["username"]);
//   console.log("Whats your occupation?");
//   const { job } = await prompt.get(["job"]);

// let gamePrologueResponse = {
//   Protocol: 'LAMBDA',
//   TopicArn: snsArnPrologue
// };
// }

sns.publish(gamePrologue).promise()
  .then(data => {
    console.log(data);
    getPrologue(prologueParams)
  })
  .catch(error => {
    console.log(error);
  });

