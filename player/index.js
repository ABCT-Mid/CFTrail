'use strict';

const AWS = require('aws-sdk');
AWS.config.update({
  region:'us-west-2',
});

const { Consumer } = require('sqs-consumer');

const app = Consumer.create({
  queueUrl: 'https://sqs.us-west-2.amazonaws.com/195095073964/playerQueue',
  handleMessage: async(message) => {
    console.log(message.Body);
  },
}); 

const sns = new AWS.SNS();

const snsArn = 'arn:aws:sns:us-west-2:195095073964:game_messages';

let test = {
  Message: 'TEST',
  TopicArn: snsArn,
};

sns.publish(test).promise()
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.log(error);
  });

app.start();