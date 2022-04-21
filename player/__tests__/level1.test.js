'use strict';

let game = require('../index.js');
var rewire = require('rewire');
var prologue = rewire('../index.js').__get__("getPrologue");

jest.mock('../index.js', () => {
  return {
    schema: {
      getPrologue: jest.fn((key) => {
        return {...body};
      }),
    },
  };
});

describe('Testing Level 1', () => {
  test('Happy Path question 0-0 (prologue)', async () => { 
    let prologueParams = {
      FunctionName: 'Game_Prologue',
      Payload: JSON.stringify('Start Prologue'),
    };
    let result = await prologue(prologueParams);
    console.log(result);
  })
})