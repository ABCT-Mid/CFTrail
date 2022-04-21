'use strict';


const resultModel =  require('../models/result-model');

exports.handler = async (event) => {
  const response = { statusCode: null, body: null };
  try {
    let results = await resultModel.scan().exec();
    response.statusCode = 200;
    response.body = JSON.stringify(results);
  } catch (error) {
    response.statusCode = 500;
    response.body = JSON.stringify(new Error('Cannot Read from Results Table'));
  }

  return response;
};
