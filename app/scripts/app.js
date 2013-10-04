'use strict';

angular.module('newTicApp', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'GameCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

function GameCtrl($scope) {
  $scope.gamex = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];

  $scope.bttns = [{
    label: "Start Game ›",
    id: 'startgame'
  }, {
    label: "Choose X ›",
    id: 'playr1'
  }, {
    label: "Choose O ›",
    id: 'playr2'
  }, {
    label: "Play Again ›",
    id: 'playagainbtn'
  }];

  var turn = 1;
  var playedCells = 0;
  var alreadyWon = false;

  // Setting Player as X or O
  $scope.playBall = function(numPlayr){
    turn = numPlayr;
  }

  $scope.playCell = function(row, col){
    if (alreadyWon == false && this.gamex[row][col] != 'X' && this.gamex[row][col] != 'O') {
      if (turn % 2 != 0) {
        turn++;
        playedCells++;
        this.gamex[row][col] = 'X';
      }
      else {
        turn++;
        playedCells++;
        this.gamex[row][col] = 'O';
      }
  if(this.gamex[0][col] == this.gamex[1][col] && this.gamex[1][col] == this.gamex[2][col] && this.gamex[0][col] != null){
    alreadyWon = true;
    alert(this.gamex[0][col] + " WON!");
    this.section(4);
  }
  if(this.gamex[row][0] == this.gamex[row][1] && this.gamex[row][1] == this.gamex[row][2] && this.gamex[row][0] != null){
    alreadyWon = true;
    alert(this.gamex[x][0] + " WON!");
    this.section(4);
  }
  if(this.gamex[0][0] == this.gamex[1][1] && this.gamex[1][1] == this.gamex[2][2] && this.gamex[0][0] != null ){
    alreadyWon = true;
    alert(this.gamex[0][0] + " WON!");
    this.section(4);
  }
  if(this.gamex[2][0] == this.gamex[1][1] && this.gamex[1][1] == this.gamex[0][2] && this.gamex[2][0] != null ){
    alreadyWon = true;
    alert(this.gamex[2][0] + " WON!");
    this.section(4);
  }
  else if(playedCells == 9 && alreadyWon != true){
    alert("No one won.");
    this.section(4);
  }




    }
    else {
      console.log('Nice try, punk');
    }
}






  // Switch views between hidden and visible elements
  var section = 1;
  
  $scope.section = function (id) {
      section = id;   
  };
  
  $scope.is = function (id) {
      return section == id;
  };

  $scope.resetGame = function(){
    // Resets game board
    for (var a = 0; a <= this.gamex.length - 1; a++) {
      for (var b = 0; b <= this.gamex.length - 1; b++) {
      this.gamex[a][b] = null;
      };
    }
  }
}