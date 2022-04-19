'use strict';

const { Consumer } = require('sqs-consumer');
const { Producer } = require('sqs-producer');

const producer = Producer.create({
  queueUrl: 'https://sqs.us-west-2.amazonaws.com/195095073964/playerQueue',
  region: 'us-west-2',
});

const app = Consumer.create({
  queueUrl: 'https://sqs.us-west-2.amazonaws.com/195095073964/gameQueue',
  handleMessage: async(message) => {
    console.log(message.Body);
    await producer.send([{
      id: 'hello',
      body: 'producer test',
    }]);
  },
});

app.on('error', (error) => {
  console.log(error.message);
});

app.start();
