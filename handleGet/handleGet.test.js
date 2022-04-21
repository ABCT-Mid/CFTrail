'use strict';

const handleGet = require('./index');
jest.mock('./result-model.js', () => {
  let resultModel = {
    scan: jest.fn(() => resultModel ),
    exec: jest.fn(() => resultModel),
  };
  return resultModel;
});


describe('Testing our handleGet lambda function', () => {

  let event = {};
  const resultModel = require('./result-model');
  
  test('Should return a status code and a response body', async () => {
    let response = await handleGet.handler(event);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeTruthy();
    expect(resultModel.scan).toHaveBeenCalled();
  });

  // To run this test comment out line 9 and 18-23 - then comment out the code below

  // test('Should return a status code of 500 and a resoponse body', async () => {
  //   let response =  await handleGet.handler(event);
  //   console.log(response);
  //   expect(response.statusCode).toEqual(500);
  //   expect(response.body).toBeTruthy();
  // });

});