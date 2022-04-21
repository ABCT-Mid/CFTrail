'use strict';

const dynamoose = require('dynamoose');

const resultSchema = new dynamoose.Schema({
  id: String,
  health: String,
  username: String,
  answeredCorrectly: String,
});

const resultModel = dynamoose.model('Results', resultSchema);

module.exports = resultModel;