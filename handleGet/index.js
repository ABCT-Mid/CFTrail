'use strict';


const resultModel =  require('./result-model');

exports.handler = async (event) => {
  const response = { statusCode: null, body: null };

  try {
    let results = await resultModel.scan().exec();
    response.headers = {
      "Access-Control-Allow-Headers" : "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
    }
    response.statusCode = 200;
    response.body = JSON.stringify(results);
  } catch (error) {
    response.statusCode = 500;
    response.body = JSON.stringify(new Error('Cannot Read from Results Table'));
  }

  return response;
};
