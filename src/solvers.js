/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = undefined;
 
  var newBoard = new Board({ n: n });
  console.log(newBoard);

  var numberOfPieces = 0;
  var currentColumnIndex = 0;
  var currentRowIndex = 0;
  var numberOfPiecesOnBoard = 0;


  var arrayTraverser = function() {  
    if (numberOfPiecesOnBoard === n) {
      return;
    }
   
    if (currentColumnIndex === n - 1 && currentRowIndex === n - 1) {
      return; //means no solution!!!
    } else if (currentColumnIndex === n - 1) {
      currentColumnIndex = 0;
      currentRowIndex++;  
    } else {
      currentColumnIndex++;
    }

  
    setPiece(currentRowIndex, currentColumnIndex);
  };
  var setPiece = function(row, column) {

    newBoard.togglePiece(row, column);

    if (newBoard.hasAnyRowConflicts() || newBoard.hasAnyColConflicts()) {
      newBoard.togglePiece(row, column);
      arrayTraverser();
    } else {
      numberOfPiecesOnBoard++;
      arrayTraverser();
    }
  };

  setPiece(currentRowIndex, currentColumnIndex);
  solution = newBoard.rows();

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  // console.log(solution);
  return solution;
};

//*Time complexity*: O(n^4)





// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  //initialized a new board
  //create a recursive function which accepts a row on the board as input
  //in the recursion, for each column index
  //toggle the space on the current row/column
  //if board has no conflicts and number of pieces = n
  //increse the solutionscounter and toggle piece off 
  //if the board has conflict, toggle the piece off
  // if not on the last row, recurse over the next row
  //at the end of each for loop, toggle the initial piece off
  //return the final solutionscount
  var solutionCount = 0;
  var newBoard = new Board({n: n});
  var pieceCounter = 0;

  var rowChecker = function(currentRowIndex) {
    for (var i = 0; i < n; i++) {
      newBoard.togglePiece(currentRowIndex, i);
      pieceCounter ++;
      if (!(newBoard.hasAnyRooksConflicts()) && pieceCounter === n) {
        solutionCount++;
        newBoard.togglePiece(currentRowIndex, i);
        pieceCounter --;

      } else if (newBoard.hasAnyRooksConflicts()) {
        newBoard.togglePiece(currentRowIndex, i);
        pieceCounter --;
      } else {
        if (currentRowIndex !== n - 1) {
          rowChecker(currentRowIndex + 1);
        }
        newBoard.togglePiece(currentRowIndex, i);
        pieceCounter --;
      }
    }
  };
  
  rowChecker(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);

  return solutionCount;
};

//*Time complexity: O(n ^ n)



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other


window.findNQueensSolution = function(n) {
  var anotherBoard = new Board({n: n});
  var pieceCounter = 0;
  var solutionBoard = new Board({n: n}).rows();
  var flag = false;
  // console.log(anotherBoard.rows());

  if (n === 0) {
    return [];
  }

  var rowChecker = function(currentRowIndex, anotherBoard) {

    for (var i = 0; i < n; i++) {
      if (!flag) {
      
        anotherBoard.togglePiece(currentRowIndex, i);
        
        pieceCounter++;
        if (!(anotherBoard.hasAnyQueensConflicts()) && pieceCounter === n) { 
          solutionBoard = anotherBoard.rows();
          flag = true;
          pieceCounter--;
        } else if (anotherBoard.hasAnyQueensConflicts()) {
          anotherBoard.togglePiece(currentRowIndex, i);
          pieceCounter--;
        } else {
          if (currentRowIndex !== n - 1 && !flag) {
            rowChecker(currentRowIndex + 1, anotherBoard);
          } if (!flag) {
            anotherBoard.togglePiece(currentRowIndex, i);
            pieceCounter--;
          }
        }
      }
    }
    
  }; 
  
  rowChecker(0, anotherBoard);
  
  var solution = solutionBoard;

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

//*Time complexity:* O(n ^ 4)



// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other

window.countNQueensSolutions = function(n) {
  
  //initialized a new board
  //create a recursive function which accepts a row on the board as input
  //in the recursion, for each column index
  //toggle the space on the current row/column
  //if board has no conflicts and number of pieces = n
  //increse the solutionscounter and toggle piece off 
  //if the board has conflict, toggle the piece off
  // if not on the last row, recurse over the next row
  //at the end of each for loop, toggle the initial piece off
  //return the final solutionscount
  var solutionCount = 0;
  var newBoard = new Board({n:n});
  var pieceCounter = 0;
  
  if (n === 0) {
    return 1;
  }

  var rowChecker = function(currentRowIndex) {

    for (var i = 0; i < n; i++) {
      newBoard.togglePiece(currentRowIndex, i);
      pieceCounter++;
      if (!(newBoard.hasAnyColConflicts() || newBoard.hasAnyRowConflicts() || newBoard.hasAnyMajorDiagonalConflicts() || 
      newBoard.hasAnyMinorDiagonalConflicts()) && pieceCounter === n) {
        solutionCount++;
        newBoard.togglePiece(currentRowIndex, i);
        pieceCounter--;
      } else if ((newBoard.hasAnyColConflicts() || newBoard.hasAnyRowConflicts() || newBoard.hasAnyMajorDiagonalConflicts() || 
      newBoard.hasAnyMinorDiagonalConflicts())) {
        newBoard.togglePiece(currentRowIndex, i);
        pieceCounter--;
      } else {
        if (currentRowIndex !== n - 1) {
          rowChecker(currentRowIndex + 1);
        }
        newBoard.togglePiece(currentRowIndex, i);
        pieceCounter--;
      }

    }
  }; 

  rowChecker(0);
  
  
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

//*Time complexity*: Theoretically, n^n, but due to so many cases being ruled out towards the 
//beginning of the iteration, it should be much shorter.