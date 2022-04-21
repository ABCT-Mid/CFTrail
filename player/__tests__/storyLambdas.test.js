"use strict";

let { prologueLambdaServesIntro, introPrisoner } = require("../index.js");

describe("Can call lambda functions from AWS to get story settings from the cloud", () => {
  test("should recieve opening dialog from lambda function", async () => {
    global.console.log = jest.fn();
    let key = {
      FunctionName: "Game_Prologue",
      Payload: JSON.stringify("Start Prologue"),
    };
    let result = await prologueLambdaServesIntro(key)
      .then(() => {
        expect(console.log).toHaveBeenCalledWith("The Game has Begun");
      })
    expect(console.log).toBeCalledTimes(3);
    console.log(result);
  });
});
