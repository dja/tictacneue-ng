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
  }];

  var turn = 1;
  var alreadyWon = false;

  // Setting Player as X or O
  $scope.playBall = function(numPlayr){
    turn = numPlayr;
  }

  $scope.playCell = function(row, col){
    alert('playing' + row + " " + col);
    if (alreadyWon == false && event.target.className.split(" ")[2] != "played") {
      if (turn % 2 != 0) {
        turn++;
        event.target.classList.add('played');
        this.gamex[row][col] = 'X';
      }
      else {
        turn++;
        event.target.classList.add('played');
        this.gamex[row][col] = 'O';
      }
    }
    else {
      console.log('Nice try, punk');
    }
  }

  $scope.navCells = function(){
    for(c=0;c<=2;++c){
      for(r=0;r<=2;++r){
        cellArray[c][r] = document.getElementById("cell"+c+"_"+r).innerHTML;
      }
    }
    for(x=0; x<=2; ++x){
      if(cellArray[0][x] == cellArray[1][x] && cellArray[1][x] == cellArray[2][x] && cellArray[0][x] != "&nbsp;"){
        alreadyWon = true;
        alert(cellArray[0][x] + " WON!");
        toggleVisibility('playagainbtn');
      }
      if(cellArray[x][0] == cellArray[x][1] && cellArray[x][1] == cellArray[x][2] && cellArray[x][0] != "&nbsp;"){
        alreadyWon = true;
        alert(cellArray[x][0] + " WON!");
        toggleVisibility('playagainbtn');
      }
    }
    if(cellArray[0][0] == cellArray[1][1] && cellArray[1][1] == cellArray[2][2] && cellArray[0][0] != "&nbsp;" ){
      alreadyWon = true;
      alert(cellArray[0][0] + " WON!");
      toggleVisibility('playagainbtn');
    }
    if(cellArray[2][0] == cellArray[1][1] && cellArray[1][1] == cellArray[0][2] && cellArray[2][0] != "&nbsp;" ){
      alreadyWon = true;
      alert(cellArray[2][0] + " WON!");
      toggleVisibility('playagainbtn');
    }
    else if(playedCells == 9 && alreadyWon != true){
      alert("No one won.");
      toggleVisibility('playagainbtn');
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
}


// $scope.resetGame = function(){
//   var thissound=document.getElementById('playagain');
//   thissound.play();
//   alert('Whattup');
// }