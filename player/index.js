'use strict';

require('dotenv').config();

const AWS = require('aws-sdk');
AWS.config.update({
  region: 'us-west-2',
});


let apiURL = process.env.API_URL;

const axios = require('axios');
const prompt = require('prompt');
const colors = require('@colors/colors');

prompt.start();

const sns = new AWS.SNS();

const snsArnPrologue = 'arn:aws:sns:us-west-2:195095073964:Game_Intro';

let gamePrologue = {
  Message: 'Game_Prologue_Start',
  TopicArn: snsArnPrologue,
};

let character;

let prologueParams = {
  FunctionName: 'Game_Prologue',
  Payload: JSON.stringify('Start Prologue'),
};

function getPrologue(key) {
  const response = new AWS.Lambda()
    .invoke(key)
    .promise()
    .then(async (data) => {
      console.clear();
      // console.log(await terminalImage.file('../assets/snowy-wagon.jpg'));
      console.log(data.Payload.red);
    })
    .then(() => {
      setTimeout(() => {
        console.log(
          '*You receive a menacing look from a scrawny bloke in chains*',
        );
      }, 3000);
    })
    .then(() => {
      setTimeout(async () => {
        console.log('Whats your name!');
        const { username } = await prompt.get(['username']);
        console.log('Whats your occupation?');
        const { job } = await prompt.get(['job']);
        character = {
          name: username,
          occupation: job,
          score: 75,
        };
        console.clear();
        console.log('Great you are: ', character);
        //TODO
        //let user say yes or no to reinput data
        //if no then call getPrologue() again
        let level1_0 = {
          FunctionName: 'Game_Level1_0',
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
      console.log(character);
      console.log(parsed.body);
    })
    .then(() => {
      setTimeout(() => {
        question1_1();
      }, 3000);
    })
    .catch((error) => {
      console.error(error);
    });
}

function question1_1() {
  console.log(
    'TRUE OR FALSE: You can change a const value after setting it.',
  );
  prompt.get('answer', function (err, result) {
    if (
      result.answer.toLowerCase() === 'tru' ||
      result.answer.toLowerCase() === 'true' ||
      result.answer.toLowerCase() === 't'
    ) {
      setTimeout(() => {
        console.log(
          'OOPS, Incorrect! "const" is a signal that the identifier won\'t be reassigned.',
        );
        character.score -= 5;
        console.log(character);
        setTimeout(() => {
          console.clear();
          question1_2();
        },3000);
      }, 3000);
    } else if (
      result.answer.toLowerCase() === 'false' ||
      result.answer.toLowerCase() === 'f'
    ) {
      setTimeout(() => {
        console.log('Wow, I\'m impressed! here is a token from me old boot');
        console.log('THE PRISONER HANDS YOU 15 SHILINGS!');
        character.score += 5;
        console.log(character);
        setTimeout(() => {
          console.clear();
          question1_2();
        },3000);
      }, 3000);
    } else {
      console.log('Please answer with only a True or False');
      question1_1();
    }
  });
}

function question1_2() {
  console.log('TRUE OR FALSE: You can pass an anonymous function as an argument of another function');
  prompt.get('answer', function (err, result) {
    if (
      result.answer.toLowerCase() === 'false' ||
      result.answer.toLowerCase() === 'f'
    ) {
      setTimeout(() => {
        console.log(
          'OOPS, Incorrect! This is also called a callback.',
        );
        character.score -= 5;
        console.log(character);
        setTimeout(() => {
          console.clear();
          question1_3();
        },3000);
      },2000);
    } else if (
      result.answer.toLowerCase() === 'tru' ||
      result.answer.toLowerCase() === 'true' ||
      result.answer.toLowerCase() === 't'
    ) {
      console.log('Shiver me timbers!  Here is a jewel I have been keeping in me eye socket');
      setTimeout(() => {
        console.log('THE PRISONER HANDS YOU A SLIMY RUBY!');
        character.score += 5;
        console.log(character);
        setTimeout(() => {
          console.clear();
          question1_3();
        },3000);
      }, 2000);
    } else {
      console.log('Please answer with only a True or False');
      question1_2();
    }
  });
}

function question1_3() {
  console.log('TRUE OR FALSE: An empty array is falsy');
  prompt.get('answer', function (err, result) {
    if (
      result.answer.toLowerCase() === 'tru' ||
      result.answer.toLowerCase() === 'true' ||
      result.answer.toLowerCase() === 't'
    ) {
      console.clear();
      console.log(
        'OOPS, Incorrect! JavaScript is the Wild West.',
      );
      character.score -= 5;
      console.log(character);
      let level2_0 = {
        FunctionName: 'Game_Level2_0',
        Payload: JSON.stringify(character),
      };
      getLevel2_0(level2_0);

    } else if (
      result.answer.toLowerCase() === 'false' ||
      result.answer.toLowerCase() === 'f'
    ) {
      console.clear();
      console.log('Arrrrrrrr! Im broke!  This is all I have left.....');
      setTimeout(() => {
        console.log('THE PRISONER HANDS YOU HIS GOLDEN PEGLEG!');
        character.score += 5;
        console.log(character);
        let level2_0 = {
          FunctionName: 'Game_Level2_0',
          Payload: JSON.stringify(character),
        };
        getLevel2_0(level2_0);
      }, 3000);
    } else {
      console.log('Please answer with only a True or False');
      question1_3();
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
        console.log(character);
        console.log(parsed.body);
      }, 5000);
    })
    .then(() => {
      setTimeout(() => {
        // Refactor for actual input for switch
        question2_1();
      }, 9000);
    })
    .catch((error) => {
      console.error(error);
    });
}

function question2_1() {
  console.log('How do you find the minimum of x and y using JavaScript?');
  console.log('');
  console.log('A: min(x,y);');
  console.log('B: Math.min(x,y)');
  console.log('C: Math.min(x y)');
  prompt.get('answer', function (error, result) {
    if (
      result.answer.toLowerCase() === 'a' ||
      result.answer.toLowerCase() === 'c'
    ) {
      setTimeout(() => {
        console.log(
          'You tripped and rolled your ankle dropping the 15 shillings you received earlier. Stamina -10',
        );
        character.score -= 5;
        console.log(character);
        setTimeout(() => {
          console.clear();
          question2_2();
        },3000);
      },2000);
    } else if (result.answer.toLocaleLowerCase() === 'b') {
      setTimeout(() => {
        console.log('That is correct, agility +5');
        character.score += 5;
        console.log(character);
        setTimeout(() => {
          console.clear();
          question2_2();
        },3000);
      },2000);
    } else {
      console.log('Please choose only A, B, or C');
      question2_1();
    }
  });
}

function question2_2() {
  console.log('What is the proper syntax of a "for" statement in JavaScript?');
  console.log('');
  console.log('A:  for(initialization; condition; increment);');
  console.log('B:  for(initialization; condition; decrement)');
  console.log('C:  All of the above');
  prompt.get('answer', function (error, result) {
    if (
      result.answer.toLowerCase() === 'a' ||
      result.answer.toLowerCase() === 'b'
    ) {
      setTimeout(() => {
        console.log(
          'You stepped on a lego and are writhing in agony. Charisma -20',
        );
        character.score -= 5;
        console.log(character);
        setTimeout(() => {
          console.clear();
          question2_3();
        },3000);
      },2000);
    } else if (result.answer.toLocaleLowerCase() === 'c') {
      setTimeout(() => {
        console.log('Yahtzee!  Strength +10');
        character.score += 5;
        console.log(character);
        setTimeout(() => {
          console.clear();
          question2_3();
        },3000);
      },2000);
    } else {
      console.log('Please choose only A, B, or C');
      question2_2();
    }
  });
}

function question2_3() {
  console.log('What is the proper for loop to iterate an x amount of times?');
  console.log('');
  console.log('A:  for of');
  console.log('B:  for each');
  console.log('C:  for in');
  console.log('D:  None of the above');
  prompt.get('answer', function (error, result) {
    if (
      result.answer.toLowerCase() === 'a' ||
      result.answer.toLowerCase() === 'b' ||
      result.answer.toLowerCase() === 'c'
    ) {
      setTimeout(() => {
        console.log(
          'You take an arrow to the ankle. Luck -50',
        );
        character.score -= 5;
        console.log(character);
        setTimeout(() => {
          let level3_0 = {
            FunctionName: 'Game_Level3_0',
            Payload: JSON.stringify(character),
          };
          getLevel3_0(level3_0);
        },3000);
      },2000);
    } else if (result.answer.toLocaleLowerCase() === 'd') {
      setTimeout(() => {
        console.log('Huzzah!  Your stay is on the house.  Charisma +10');
        character.score += 5;
        console.log(character);
        setTimeout(() => {
          let level3_0 = {
            FunctionName: 'Game_Level3_0',
            Payload: JSON.stringify(character),
          };
          getLevel3_0(level3_0);
        },3000);
      },2000);
    } else {
      console.log('Please choose only A, B, C or D');
      question2_3();
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
      question3_1();
    });
}

function question3_1(){
  console.log('Given a Queue class, what is the proper method to add a node to the Queue');
  prompt.get('answer', function (error, result) {
    if (result.answer === 'Queue.enqueue();') {
      setTimeout(() => {
        console.log('*....grumbles...* Luck won\'t carry you far.  Double or nothing!!');
        setTimeout(() => {
          console.clear();
          question3_2();
        },3000);
      },2000);
    } else if (result.answer === 'Queue.enqueue()') {
      setTimeout(() => {
        console.log('You fool!! Don\'t forget the importance of semi-colons, you heathen!!');
        setTimeout(() => {
          question3_1();
        },2000);
      },2000);
    } else {
      setTimeout(() => {
        console.log('You have answered incorrectly! You\'ve started to become.........sussy.  (Sussy +15)');
        character.score -= 5;
        console.log(character);
        setTimeout(() => {
          console.clear();
          question3_2();
        },3000);
      },2000);
    }
  });
}

function question3_2(){
  console.log('Write the signature of an async function named "sum" that adds two numbers together passed through as arguments (a and b)');
  prompt.get('answer', function (error, result) {
    if (result.answer === 'async function sum(a,b)' || result.answer === 'async function sum(a,b){}') {
      setTimeout(() => {
        console.log('I keep my word.....take your reward quickly lest you feel my wrath');
        character.score += 10;
        console.log(character);
        setTimeout(() => {
          console.clear();
          question3_3();
        },3000);
      },2000);
    } else if (result.answer === 'async function sum(a,b);' || result.answer === 'async function sum(a,b){};') {
      setTimeout(() => {
        console.log('Your wit is as sharp as my blade!  I see that you remembered your semi-colons.');
        character.score += 20;
        console.log(character);
        setTimeout(() => {
          console.clear();
          question3_3();
        },3000);
      },2000);
    } else {
      setTimeout(() => {
        console.log('Inconceivable!! I\'ve killed for less than this!!');
        character.score -= 10;
        console.log(character);
        setTimeout(() => {
          console.clear();
          question3_3();
        },3000);
      },2000);
    }
  });
}

function question3_3() {
  console.log(
    'Given the Dragon class, how would you invoke the breathesFire method?',
  );
  prompt.get('answer', function (error, result) {
    if (result.answer === 'Dragon.breathesFire();') {
      setTimeout(() => {
        console.log('Congratulations, you chose wisely.');
        console.log(
          'May you have as much fun on your job search as you did during this game.',
        );
      },2000);
    } else {
      setTimeout(() => {
        console.log('....');
      }, 3000);
      setTimeout(() => {
        console.log('.......');
      }, 6000);
      setTimeout(() => {
        console.log('..........');
      }, 9000);
      setTimeout(() => {
        sns
          .publish(gamePrologue)
          .promise()
          .then((data) => {
            console.log(data);
            console.log('The Game has Begun');
            getPrologue(prologueParams);
          })
          .catch((error) => {
            console.log(error);
          });
      }, 10000);
      postResults();
    }
  });
}

async function postResults() {
  let data = {
    id: character.occupation,
    username: character.name,
    score: character.score.toString(),
  };

  let headers = { 'Content-Type': 'application/json' };

  try {
    await axios.post(apiURL.toString(), JSON.stringify(data), {
      headers: headers,
    });
  } catch (error) {
    console.log(
      'AXIOS ------------------------------------',
      error.message,
    );
  }
}

sns
  .publish(gamePrologue)
  .promise()
  .then((data) => {
    console.log(data);
    console.log('The Game has Begun');
    getPrologue(prologueParams);
  })
  .catch((error) => {
    console.log(error);
  });
