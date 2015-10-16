/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting

window.findNRooksSolution = function(n) {
  //create an empty board
  var board = new Board({n:n});
  var boardSize = n;
  //loop through rows
  for (var r = 0; r < boardSize; r++){
    //loop through each columns
    for (var c = 0; c < boardSize; c++){
      //toggle a rook on
      board.togglePiece(r,c);
        //if a conflict exists
        if (board.hasAnyRooksConflicts()){
          //toggle rook off
          board.togglePiece(r,c);
        }
    }
  }
  //return board
  console.log("solution board " + board.rows());
  return board.rows();
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n:n});

  var findSolutions = function(row){
    //If there are no more rows
    if (row === n){
      //increment solution counter
      solutionCount++;
      return;
    }


    //Iterate over every column
    for (var col = 0; col < n; col++){
      //toggle on piece
      board.togglePiece(row,col);
      //if no conflicts
      if (!board.hasAnyRooksConflicts()){
        //recurse for next row
        findSolutions(row+1);
      }
      //toggle off piece
      board.togglePiece(row,col);
    }
  }
  findSolutions(0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  //create an empty board
  var board = new Board({n:n});
  var boardSize = n;
  //loop through rows
  for (var r = 0; r < boardSize; r++){
    //loop through each columns
    for (var c = 0; c < boardSize; c++){
      //toggle a rook on
      board.togglePiece(r,c);
        //if a conflict exists
        if (board.hasAnyQueensConflicts()){
          //toggle rook off
          board.togglePiece(r,c);
        }
    }
  }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(board.rows()));
  return board.rows();
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n:n});

  var findSolutions = function(row){
    //If there are no more rows
    if (row === n){
      //increment solution counter
      solutionCount++;
      return
    }

    //Iterate over every column
    for (var col = 0; col < n; col++){
      //toggle on piece
      board.togglePiece(row,col);
      //if no conflicts
      if (!board.hasAnyQueensConflicts()){
        //recurse for next row
        findSolutions(row+1);
      }
      //toggle off piece
      board.togglePiece(row,col);
    }
  }
  findSolutions(0);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
