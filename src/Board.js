// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var row = this.get(rowIndex+'');
      var totals = _.reduce(row, function(prevValue, currValue){
        prevValue = prevValue + currValue;
        return prevValue;
      }, 0);
      return (totals > 1);
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      //Access number of rows
      var rows = this.get('n');
      //iterate over each row
      for (var r = 0; r < rows; r++){
        //Test hasRowConflictAt
        if (this.hasRowConflictAt(r)){
          return true;
        }
      }
      return false;
    },

    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      //Declare a variable and assign it the board size
      var boardSize = this.get('n');
      //Declare a variable to hold sum
      var sum = 0;
      //Declare variable to temporarily hold row
      var row = [];

      //Iterate over the rows of the board
      for (var r = 0; r < boardSize; r++){
        //if (sum > 1)
        if (sum > 1){
          return true;
        }
        //otherwise
        else {
          //pull out current row
          row = this.get(r);
          //add row[index] to sum
          sum += row[colIndex];
        }
      }
      return false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      //Declare a variable to hold the board size
      var boardSize = this.get('n');
      //iterate over every column
      for( var i = 0; i < boardSize; i++){
        //if (call hasColConflictAt)
        if(this.hasColConflictAt(i)){
          return true;
        }
      }
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      //TODO: make it check only 1 row and the next row. Not every row
      //Declare a variable and assign it the board size
      var boardSize = this.get('n');
      //Declare a variable to hold the sum
      var sum = 0;
      //Declare a variable for the row
      var row = 0;
      //Declare a variable column index
      var colIndex = majorDiagonalColumnIndexAtFirstRow;

      //iterate over each row starting at column index
      for (var r = 0; r < boardSize; r++){
        //if sum is > 1
        if(sum > 1){
          return true;
        } else {
          //Add prev index++ to the sum
          row = this.get(r);
          sum += row[colIndex];
          if(colIndex <= boardSize){
            colIndex++;
          }
        }
      }
      return false;

    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      //declare a variable and assign it the board size
      var boardSize = this.get('n');
      //iterate over every row up to the board size
      for (var r = 0; r < boardSize; r++)
        //if a conflict exists on current diagonal
      if (this.hasMajorDiagonalConflictAt(r)){
        return true;
      }
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      //Declare a variable to hold board size
      var boardSize = this.get('n');
      //declare a variable to hold the row
      var row = this.get();
      //Declare a variable to hold sum
      var sum = 0;
      //Declare a variable to hold index
      var colIndex = minorDiagonalColumnIndexAtFirstRow || boardSize;

      //iterate backward through first row
      for (var r = 0; r < boardSize; r++){
        //if sum is greater than 1
        if (sum > 1) {
          return true;
        }
        //Add in value at next row,  index - 1
        sum += this.get(r)[colIndex];
        if(colIndex > 0){
          colIndex--;
        } else if(colIndex = 0){
          break;
        }
      }
      return false;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      //Declare a variable to hold board size
      var boardSize = this.get('n');
      //Iterate over rows
      for(var r = 0; r < boardSize; r++){
        //if (Invoke the At function for the current row)
        if(this.hasMinorDiagonalConflictAt(r)){
          return true;
        }
      }
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
