// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
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
      var row = this.rows()[rowIndex];

      var rowSum = 0;
      for (var i = 0; i < row.length; i++) {
        rowSum += row[i];
      }
      return rowSum > 1;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var rowLength = this.rows().length;
      for (var i = 0; i < rowLength; i++) {
        if (this.hasRowConflictAt(i)) {
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

      var counter = 0;
      var rows = this.rows();
      
      for (var i = 0; i < rows.length; i++) {
        counter += rows[i][colIndex];
        if (counter > 1) {
          return true;
        }
      }

      return false; 
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {

      var columns = this.rows().length;

      for (var i = 0; i < columns; i++) {
        if (this.hasColConflictAt(i)) {
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
      //initialize row and column index tracker
      //initialize a counter to equal current column, row index
      //create an inner function that increment column and row index by 1
      //if row index is the length - 1, set counter to 0 and set rowindex to 0
      //if counter becomes > 2 return true
     
      var conflict = false;
      var rows = this.rows();
      var rowLength = rows.length;


      var currentRowIndex = 0;
      var currentColumnIndex = majorDiagonalColumnIndexAtFirstRow;

      var counter = rows[currentRowIndex][currentColumnIndex];

      var arrayMajorTraverser = function() {

        if (currentRowIndex === rowLength - 1) {
          return;
        } else if (currentColumnIndex === rowLength - 1) {
          counter = 0;
          currentColumnIndex = 0;
        } else {
          currentColumnIndex++;
        }
        currentRowIndex++;

        counter += rows[currentRowIndex][currentColumnIndex];

        if (counter > 1) {
          conflict = true;
          return;
        } 
       
        arrayMajorTraverser();
      };
       
      arrayMajorTraverser();

      return conflict; 
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var rows = this.rows();
      var columnLength = rows.length;

      for (var i = 0; i < columnLength; i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false;    
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var conflict = false;
      var currentRowIndex = 0;
      var currentColumnIndex = minorDiagonalColumnIndexAtFirstRow;
      var rows = this.rows();
      var rowLength = rows.length;
      var counter = rows[currentRowIndex][currentColumnIndex];
      
      var arrayMinorTraverser = function () {
        if (currentRowIndex === rowLength - 1) {
          return;
        } else if (currentColumnIndex === 0) {
          counter = 0;
          currentColumnIndex = rowLength - 1;
        } else {
          currentColumnIndex--;
        }
        currentRowIndex++;
        
        counter += rows[currentRowIndex][currentColumnIndex];
        if (counter > 1) {
          conflict = true;
          return;
        }

        arrayMinorTraverser();
      };
      
      arrayMinorTraverser();
      
      return conflict; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {

      var rows = this.rows();
      var columnLength = rows.length;

      for (var i = 0; i < columnLength; i++) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
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
