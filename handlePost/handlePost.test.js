'use strict';

const handlePost = require('./index');
jest.mock('./result-model', () => {
  let resultModel = {
    create: jest.fn(() => resultModel),
  };
  return resultModel;
});

describe('Testing our handlePost lambda function', () => {

  let eventBody = {
    id: 'thisId',
    score: '100',
    username: 'Andres',
  };

  let event = {
    body: JSON.stringify(eventBody),
  };
  const resultModel = require('./result-model');

  test('Should return a status code of 200 and a resoponse body', async () => {
    let response =  await handlePost.handler(event);
    console.log(response);
    expect(resultModel.create).toHaveBeenCalled();
    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeTruthy();
  });

  // To run this test comment out line 8 and 24-30 - then comment out the code below

  // test('Should return a status code of 500 and a resoponse body', async () => {
  //   let response =  await handlePost.handler(event);
  //   console.log(response);
  //   expect(response.statusCode).toEqual(500);
  //   expect(response.body).toBeTruthy();
  // });

});