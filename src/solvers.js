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

  var numberOfPieces = 0;
  var currentColumnIndex = 0;
  var currentRowIndex = 0;
  var numberOfPiecesOnBoard = 0;


  var arrayTraverser = function() {
   console.log("CurrentRow: ", currentRowIndex, "currentColumnIndex: ", currentColumnIndex);
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

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme


  // var Tree = function(board) {
  //   this.value = board;
  //   this.children = [];
  //   this.depth = 0;
  //   this.valid = true;  
  // };
  
  // Tree.prototype.addChild = function() {
  //   if (!this.valid) {
  //     return
  //   }
  //   newChild = new Tree(???);
  //   newChild.depth = this.depth + 1
  //   newChild.valid = (!hasAnyColConflicts && !hasAnyRowConflicts);
    
  //   this.children.push(newChild);
  // }

  // initialTree = new Tree(board);

  
//accepts a board, and currentRow and Currrent column
//number of remaining options to place the next piece
//iterates over each such option, call itself, passing in current row and column
//











  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};