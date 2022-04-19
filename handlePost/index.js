'use strict';

const dynamoose = require('dynamoose');

const resultSchema = new dynamoose.Schema({
  id: String,
  score: String,
  username: String
})

const resultModel = dynamoose.model('Results', resultSchema);


exports.handler = async (event) => {
  const response = { statusCode: null, body: null }
  
  const newResult = {
    id: event.queryStringParameters.id,
    score: event.queryStringParameters.score,
    username: event.queryStringParameters.username
  }
  try {
    let postResult = await resultModel.create(newResult)
    response.statusCode = 200;
    response.body = JSON.stringify(postResult)
  } catch (error) {
    response.statusCode = 500;
    response.body = JSON.stringify(new Error('Cannot Post to Results Table'))
  }

  return response;
};