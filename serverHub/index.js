'use strict';

const { Consumer } = require('sqs-consumer');
const { Producer } = require('sqs-producer');

const producer = Producer.create({
  queueUrl: 'https://sqs.us-west-2.amazonaws.com/195095073964/playerQueue',
  region: 'us-west-2',
});

const intro = Consumer.create({
  queueUrl: 'https://sqs.us-west-2.amazonaws.com/195095073964/gameQueue',
  handleMessage: async(message) => {
    let parsedBody = JSON.parse(message.Body);
    // let parsedMessage = JSON.parse(parsedBody.Message);
    console.log(parsedBody.Message);
    // console.log(message.Body.Message);
    await producer.send([{
      id: 'GameStart',
      body: 'You wake up in the back of an imperial wagon driving down a showy mountain pass. "Hey you, you\'re finally awake"', 
    }]);
    intro.stop();

    const levelOne = Consumer.create({
      queueUrl: 'https://sqs.us-west-2.amazonaws.com/195095073964/gameQueue',
      handleMessage: async(message) => {
        let parsedBody = JSON.parse(message.Body);
        // let parsedMessage = JSON.parse(parsedBody.Message);
        console.log(parsedBody.Message);
        // console.log(message.Body.Message);
        await producer.send([{
          id: 'level1',
          body: 'Level one', 
        }]);
      },
    });
  },
});

intro.on('error', (error) => {
  console.log(error.message);
});

intro.start();

