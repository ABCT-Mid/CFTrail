# Software Requirements

## Vision

- What is the vision of this product?
  - To create a fun and enjoyable text based game that is also educational
- What pain point does this project solve?
  - Education can be mundane. SUPER MARIO EFFECT. 
- Why should we care about your product?
  - Software development is difficult as is. Let's create an alternative way to learn
  
  ## SCOPE IN
  - Character object will hold users game data
    - Score / ID / username / etc
  -  AWS server will mediate publishes and subscriptions to client/user
  -  Web app will provide game data information
  -  Users will be able to compare personal results to other users
  -  User will be served random technical questions of varying difficulty (JavaScript based?)
  -  User will be able to win or lose

  ## SCOPE OUT
  - It will not be scalable
  - It will not have authorization / authentication
  - It will not use REACT.js

## MVP
  - User can create a character
  - User can play the game at least answering 3 questions
  - User can see their results (stored in database)

## STRETCH GOALS
    - Target Stretch:
      - Front end results page w/stylings
      - CLI Images
      - Expand question pool
  - SQS / Persist a check or save point
  - Share Button
  - Persist created character
  - Implement villages / towns
  - NPC interaction

## FUNCTIONAL REQUIREMENTS
 - As a user I want to be able to create a character
 - As a user I want to be able to work on my coding skills
 - As a user I want to be entertained while receiving intellectual value
 - As a user I want to be able to compare my scores to other users
 - As a user I want to receive different questions as I play

## DATA FLOW
<img width="1553" alt="game-progress" src="https://user-images.githubusercontent.com/84699682/163650658-d65f0e5d-c6b9-4f55-92f9-c818d84e518f.PNG">
<img width="1312" alt="uml" src="https://user-images.githubusercontent.com/84699682/163650675-b50d5142-be7d-44b7-9484-208e3abab15b.PNG">
<img width="1728" alt="Screen Shot 2022-04-15 at 3 19 55 PM" src="https://user-images.githubusercontent.com/84699682/163650680-02e389bb-e4af-4ac4-a214-8725cade8f91.png">

## NON FUNCTIONAL REQUIREMENTS
  - Security: Addressed by using AWS cloud services
  - Authentication / Authorization: All requests will be made via our server. Authorization will be made by dev team
  - Testability: above 50% test coverages. Integration / Unit tests to ensure application behaves as expected (CI/CD)
