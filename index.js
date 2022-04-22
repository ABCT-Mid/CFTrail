'use strict';

const figlet = require('figlet');
const colors = require('@colors/colors');
let me = 'Andres'.rainbow;

const terminalImage = require('terminal-image');

let results = 'Hello there, you won, congratulations';

console.log(`My name is ${me.underline}.`);

figlet('Hello', function (error, data) {
  if (error) {
    console.log(error);
  }
  console.log(data.rainbow);
});

figlet('There', function (error, data) {
  if (error) {
    console.log(error);
  }
  console.log(data);
});
figlet('Yo!', function (error, data) {
  if (error) {
    console.log(error);
  }
  console.log(data);
});

(async () => {
  console.log(await terminalImage.file('./assets/snowy-wagon.jpg'));
})();

figlet.text('Stacks and Overflows!', {
  font: '',
  horizontalLayout: 'default',
  verticalLayout: 'default',
  width: 100,
  whitespaceBreak: true,
}, function (err, data) {
  if (err) {
    console.log('Something went wrong...');
    console.dir(err);
    return;
  }
  console.log(data.red);
});

