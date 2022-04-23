# How We Tested Our App

We utilized tests throughout the entire building process for this app.  Due to the nature of our code base, we leaned into different methods to ensure the proper functionality of our code as well as the flow and _feel_ of our story. 
We wanted to make sure:

- Our AWS systems were implemented correctly and behaved as we wanted them to
- The code that we wrote locally all functioned in a way that told our story and provided a good experience to the user
- That the flow and immersive feel of the game aligned with our vision

## Using Jest

One thing that we did not envision originally, was the limited usage of the `jest` library.  Since so much of our code was either:
1.  Hosted on AWS,

or 

2. Relied on `console.log()` to tell our story,

Jest wasn't the best method for us to test **all** of our functionality.

We were able to utilize jest to test our lambda functions.  While these functions "lived" in AWS, we wrote them and they originated locally.  We were able to mock the functions and the schema model using jest without actually invoking the functions themselves.  

It is also worth noting that we were able to reach 100% coverage on these test, but we had to get creative to do so.  
In order to get coverage for the `error` response, we had to run that test separately by commenting out the `return` statement.  Doing this tests the method without creating a timeout error, and returns an empty repsonse body and the expected status code of `500`.

See Below:

![Test 1](../CFTrail/assets/test-1.png)

![Test 2](../CFTrail/assets/test-2.png)

## Using AWS

As mentioned previously, much of our code as well as our API and DB are hosted with AWS.  One of the many benefits to using AWS, is that they offer built in test environments that allowed us to test our lambda functions, our `/game` routes and our DynamoDB tables.  

In addition to using these provided test environments, we found that the CloudWatch logs were incredibly useful in pinpointing any errors that came up along the way.  More often than not, it was the CloudWatch logs that offered helpful information and not the logs from the tests themselves!

## Playing Through Our Game

Our game is text based and relied mainly on two things (apart from AWS):

1. User input through the `prompt` library
2. `console.log()` messages that relayed information to the user through the CLI

We started out by writing the game in a few large functions, then we decided to decouple these into individual functions that each were responsible for a specific job.

We had one function that sent a payload to lambda to initiate the game, and then progress each level. 
Then we had individual functions that were in charge of asking each question of each level. 
Finally we had functions that were written that handled both correct, and incorrect answers respectively.  

Decoupling our functionality in this way allowed us to pinpoint any weak points both in our code _and_ in our story telling which proved invaluable.  

See sample below:

``` JavaScript
function question3_3() {
  let beast = 'Dragon';
  let spell = 'breathesFire';
  console.log(
    `Given the ${beast.brightRed} class, how would you invoke the ${spell.brightRed} method?`.brightWhite,
  );
  prompt.get('answer', function (error, result) {
    if (result.answer === 'Dragon.breathesFire();') {
      setTimeout(() => {
        serveCorrectDialogue3_3();
        postResults();
      }, 2000);
    } else {
      serveIncorrectDialogue3_3();
      postResults();
    }
  });
}
```

## User Testing

We also used user testing to "crowd source" so to speak.  Before finalizing our product, we were able to test it out on a user outside of our team.  This user was able to provide unbiased feedback on all aspects of our game including:
- The flow and feel of the game.  Were some timeouts too long, too short, etc
- The questions themselves.  Did they make sense, should they be reworded, etc.
- The look and feel of the final product.  Was it fun, did it look nice, etc.

## Thunder Client

Early on in writing our CRUD functions we did use AWS's own test environments.  After we were satisfied with our API, we deployed it live and at this point we used Thunder Client to test out our 2 routes, GET and POST. 

This testing proved useful in that we were able to change how our POST request functioned and we could see how the request body should be formed.  

It was also an early proof of life that our GET route worked as intended and indeed returned results

See below:

![Thunder Test](../CFTrail/assets/thunder-test.png)


## Through Our React App

One of our stretch goals was to make a simple, yet effective front end for our app that would serve as a sort of leader board.  The idea being to offer a way for the user to see their results, and a leaderboard for the game upon completion of their run through.  This aligned with our vision of a throwback, old school arcade/dungeon game.  
We were able to achieve this stretch goal, and while it is quite simple, it also served as an excellent real world test for our app.  
It was an excellent lesson on how to configure the API to handle `CORS` and at the end of the day we were able to hit our `GET` request from our REACT app.  
This was a valuable proof of life that:

- Our `postResults` function worked and was able to store our data in our DB
- Our `GET` request and route worked as intended and were able to retrieve these results and deliver them to our front end.
- We were able to read these results, and render them to the user!  Our leader board indeed worked.

[Link to our App](https://6262e7f29af1bf15c5bab06c--stacks-and-overflows.netlify.app/)

See our `postResults` code below:

``` JavaScript
async function postResults() {
  let data = {
    id: character.occupation,
    username: character.name,
    health: character.health.toString(),
    answeredCorrectly: answeredCorrectly.toString(),
  };

  let headers = { 'Content-Type': 'application/json' };

  try {
    await axios.post(apiURL.toString(), JSON.stringify(data), {
      headers: headers,
    });
  } catch (error) {
    console.log(
      'AXIOS ------------------------------------',
      error.message,
    );
  }
}
```
