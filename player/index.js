'use strict';

const AWS = require('aws-sdk');
AWS.config.update({
  region:'us-west-2',
});

const prompt = require('prompt');

prompt.start();

const sns = new AWS.SNS();

const snsArn = 'arn:aws:sns:us-west-2:195095073964:game_messages';

const { Consumer } = require('sqs-consumer');

const app = Consumer.create({
  queueUrl: 'https://sqs.us-west-2.amazonaws.com/195095073964/playerQueue',
  handleMessage: async(message) => {
    console.log(message.Body);
    console.log('A scrawny prisoner looks over at you angrily');
    setTimeout(async () => {
      console.log('Whats your name!');
      const {username} = await prompt.get(['username']);
      console.log('Whats your occupation?');
      const {job} = await prompt.get(['job']);
      console.log(job, username);
      sns.publish({
        Message: JSON.stringify([job, username]),
        TopicArn: snsArn,
      }).promise()
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.log(error);
        });
    }, 5000);
  },
}); 

let gameStart = {
  Message: 'Game Start',
  TopicArn: snsArn,
};

sns.publish(gameStart).promise()
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.log(error);
  });

app.start();