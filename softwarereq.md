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

# STRETCH GOALS
    - Target Stretch:
      - Front end results page w/stylings
      - CLI Images
      - Expand question pool
  - SQS / Persist a check or save point
  - Share Button
  - Persist created character
  - Implement villages / towns
  - NPC interaction
