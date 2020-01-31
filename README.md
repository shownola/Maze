# README
* This will be a maze game that will run inside the browser
* User will start with a blue ball that will go through the maze and end when the ball touches the green square.
* User will use the "WASD" keys to maneuver the ball.

CHALLENGES:
* Generate a maze - implement a recursive algorithm
* How to draw this on the screen? - Matter.js, a 2d physics engine for the web
* Make designated keyboard keys control the ball - can use Matter.js to map key presses to movements of shapes
* Detect when the ball touches the green square - Again, Matter.js has the ability to detect collisions between different shapes and report them as events.

BUILDING THE MAZE:
* Create a grid of 'cells'
* Pick a random starting cells
* For that cell, build a randomly-ordered list of neighbors
* If a neighbor has been visited before, remove it from the list
* For each remaining neighbor, 'move' to it and remove the wall between those two cells
* Repeat for this new neighbor

MATTER JS TERMINOLOGY:
* World: Object that contains all of the different 'things' in our app
* Engine: Reads in the current state of the world object, then calculates changes in positions of all of the different shapes
* Runner: Gets the engine and world to work together. Runs about 60 times per second
* Render: Whenever the engine processes an update, Render will take a look at all the different shapes and show them on the screen.
* Body: A shape that is displayed. Can be a circle, rectangle, oval, etc.
