'use strict';

const resultModel = require('./result-model');

exports.handler = async (event) => {
  const response = { statusCode: null, body: null };

  let jsonBody = JSON.parse(event.body);

  const newResult = {
    id: jsonBody.id,
    health: jsonBody.health,
    username: jsonBody.username,
    answeredCorrectly: jsonBody.answeredCorrectly
  };

  console.log(newResult);

  try {
    let postResult = await resultModel.create(newResult);
    response.statusCode = 200;
    response.body = JSON.stringify(postResult);
  } catch (error) {
    response.statusCode = 500;
    response.body = JSON.stringify(new Error('Cannot Post to Results Table'));
    console.log('-----------CATCH BLOCK---------------', error);
  }

  return response;
};
