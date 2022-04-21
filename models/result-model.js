'use strict';

const dynamoose = require('dynamoose');

const resultSchema = new dynamoose.Schema({
  id: String,
  score: String,
  username: String,
});

const resultModel = dynamoose.model('Results', resultSchema);

module.exports = resultModel;