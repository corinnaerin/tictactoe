# TODO

# Terminology
* **Line**: any row, column, or diagonal in the board
* **MoveFinder**: a function that takes in a board or a line and returns some moves. 
These are analogous to the function one would pass to Array.prototype.filter,
but specific to checking a 3x3 array
* **BoardMoveFinder**: a MoveFinder that checks the board as a whole
* **LineMoveFinder**: a MoveFinder that checks a single line at a time