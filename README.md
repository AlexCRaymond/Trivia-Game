## 2nd Street Trivia! - By Alex Raymond 

## Link to 2nd Street Trivia! --- https://alexcraymond.github.io/Trivia-Game/

## Why Trivia?

* I chose to create a trivia game because...who doesn't like trivia?!  I felt this would be a challenging project but also a lot of fun in creating the format along with the different categories of my choosing.
* Why the name?  I created the game on 2nd street!

## Description
* Welcome to 2nd Street Trivia!  The object of the game is to answer 10 questions correctly without missing more than two.  You have 15 seconds to answer each question before time runs out.  Good luck!

## Getting Started

* Start 2nd Street Trivia by clicking on the 'Let's Go!' button at the bottom.
* On the following page the player will choose his/her prefered category out of four different options: Sports, Television, Music or Geography.
* Next, the player will choose the difficulty level for the upcoming questions.
* Lastly, the player is brought to a start page and, when ready, will click the 'Start' button to begin.

## Playing the Game

* As the game begins the player is presented with their first question along with four multiple choice answers.
* A 15 second timer will begin and the player will have to choose the answer of their choice before the timer runs out.
* If the timer reaches zero before an answer is chosen, the player will receive one 'Strike' and the question will be replaced.
* If the player correctly answers the question, their 'Score' will go up by one.
* When the player reacehs a 'Score' of 10 - the game is over and the player has won.
* If the 'Strike' count goes above two, the game is over and the player has lost.

## Technologies Used:

* HTML
* CSS
* Javascript
* jQuery

## Unsolved Problems:

* There are a couple known bugs - When choosing a category, if the player clicks randomly on the screen and not on the buttons they will automatically be brought to the following screen and the game will not display questions.
* Also, not so much a bug other than a lack of questions, if a player misses a question there is a chance they will receive the same question again within the same game.
* Ideally, the game would also include music and sound, however, time was a factor.


## Original WireFrame:


## Questions:

* Have a “questions” object with multiple arrays for each category and difficulty level that will hold the multiple choice questions. 
* Build a game function that will randomly add questions from the arrays to present the player with the next question.
* Make an if/else statement to make sure the response is equal to the correct answer and if so, within the if statement, increment score++ to add to their score. If the answer is incorrect then within the else create a “strike” alert.
* Build an empty array to store the missed questions along with the correctly answered questions so the player won’t receive the same question twice within the same game.


## Scoring:

* Start with a “Score” and “Strike” array set to “0”.
* If the player answers correctly the Score increases by one.
* If the player misses the question they receive a “Strike”.
* If the player receives more than two strikes or a score of 10 - the game is over and it will reset itself back to the home page.
