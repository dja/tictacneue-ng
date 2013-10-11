'use strict';

angular.module('newTicApp', ["firebase"])
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

function GameCtrl($scope, angularFire) {

// Choose stylesheet
var rand_style_no = Math.ceil(5 * Math.random());

jQuery(function($){

$.supersized({
  slides  :   [ {image : 'img/'+rand_style_no+'bg.jpg', title : ''} ]
});
});

switch(rand_style_no)
{
  case 1:
    document.write('<!-- build:css(.tmp) styles/1.css --><link rel="stylesheet" href="styles/1.css" type="text/css"><!-- endbuild -->');
    break;
  case 2:
    document.write('<!-- build:css(.tmp) styles/2.css --><link rel="stylesheet" href="styles/2.css" type="text/css"><!-- endbuild -->');
    break;
  case 3:
    document.write('<!-- build:css(.tmp) styles/3.css --><link rel="stylesheet" href="styles/3.css" type="text/css"><!-- endbuild -->');
    break;
  case 4:
    document.write('<!-- build:css(.tmp) styles/4.css --><link rel="stylesheet" href="styles/4.css" type="text/css"><!-- endbuild -->');
    break;
  default:
    document.write('<!-- build:css(.tmp) styles/main.css --><link rel="stylesheet" href="styles/main.css" type="text/css"><!-- endbuild -->');
    break;
}

// Font Detection for Helvetica Neue
// $scope.detectHelv = function(){
//   var d = new Detector();
//   if(d.detect('Helvetica Neue') == false){
//     this.section(6);
//   }
// }

// Shake to Reload on iPhone
// if (typeof window.DeviceMotionEvent != 'undefined') {
//     // Shake sensitivity (a lower number is more)
//     var sensitivity = 50;

//     // Position variables
//     var x1 = 0, y1 = 0, z1 = 0, x2 = 0, y2 = 0, z2 = 0;

//     // Listen to motion events and update the position
//     window.addEventListener('devicemotion', function (e) {
//         x1 = e.accelerationIncludingGravity.x;
//         y1 = e.accelerationIncludingGravity.y;
//         z1 = e.accelerationIncludingGravity.z;
//     }, false);

//     // Periodically check the position and fire
//     // if the change is greater than the sensitivity
//     setInterval(function () {
//         var change = Math.abs(x1-x2+y1-y2+z1-z2);

//         if (change > sensitivity) {
//             var shakeGame = confirm("Do you want to start a new game?");
//       if (shakeGame == true){
//         resetGame();
//       }
//         }

//         // Update new position
//         x2 = x1;
//         y2 = y1;
//         z2 = z1;
//     }, 150);
// }

  // $scope.$watch('alreadyWon', function(){
  //   if(this.game[0].alreadyWon == true){
  //     if(this.cell.value == 'X'){ $scope.game[0].winorlose = 'X WINS!' } else{ $scope.game[0].winorlose = 'O WINS!' };
  //     this.section(5);
  //   }
  //   else if(this.game[0].alreadyWon == false && this.game[0].playedCells == 9){
  //     $scope.game[0].winorlose = 'NO WIN';
  //     this.section(5);
  //   }
  // });

  $scope.game = [{
    board: [[{ value: ' '}, { value: ' '}, { value: ' '}],
            [{ value: ' '}, { value: ' '}, { value: ' '}],
            [{ value: ' '}, { value: ' '}, { value: ' '}]],
    alreadyWon: false,
    turn: 1,
    playedCells: 0,
    winorlose: null,
  }];

  var database = new Firebase("https://tictacneue.firebaseio.com/game");
  var promise = angularFire(database, $scope, "game");

  promise.then ( function() {
    $scope.game = [{
      board: [[{ value: ' '}, { value: ' '}, { value: ' '}],
              [{ value: ' '}, { value: ' '}, { value: ' '}],
              [{ value: ' '}, { value: ' '}, { value: ' '}]],
      alreadyWon: false,
      turn: 1,
      playedCells: 0,
      winorlose: null,
    }];
  });
  var queue = database.child('queue');

  // game[0].player1 = Math.ceil(100 * Math.random());
  // game[0].player2 = Math.ceil(100 * Math.random());
  // if(game[0].player2 == game[0].player1){
  //   game[0].player2++;
  // };

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
  }, {
    label: "Helvetica Neue not Installed. Try Again?",
    id: 'fontdetect'
  }];

  // Setting Player as X or O
  $scope.playBall = function(numPlayr){
    this.game[0].turn = numPlayr;
  }

  $scope.playCell = function(cell){
    if (this.game[0].alreadyWon == false && this.cell.value != 'X' && this.cell.value != 'O') {
      if (this.game[0].turn % 2 != 0) {
        this.game[0].turn++;
        this.game[0].playedCells++;
        this.cell.value = 'X';
      }
      else {
        this.game[0].turn++;
        this.game[0].playedCells++;
        this.cell.value = 'O';
      }
      // Win Conditions
      for(x=0; x<=2; ++x){
        if(this.cell.value == this.game[0].board[0][x].value && this.cell.value == this.game[0].board[1][x].value && this.cell.value == this.game[0].board[2][x].value && this.cell.value != null){
        this.game[0].alreadyWon = true;
        }
        if(this.cell.value == this.game[0].board[x][0].value && this.cell.value == this.game[0].board[x][1].value && this.cell.value == this.game[0].board[x][2].value && this.cell.value != null){
        this.game[0].alreadyWon = true;
        }
      }
      if(this.cell.value == this.game[0].board[2][0].value && this.cell.value == this.game[0].board[1][1].value && this.cell.value == this.game[0].board[0][2].value && this.cell.value != null ){
        this.game[0].alreadyWon = true;
      }
      if(this.cell.value == this.game[0].board[0][0].value && this.cell.value == this.game[0].board[1][1].value && this.cell.value == this.game[0].board[2][2].value && this.cell.value != null ){
        this.game[0].alreadyWon = true;
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

// Reset Game
  $scope.resetGame = function(){
    // Resets game board
    for (var a = 0; a <= this.game[0].board.length - 1; a++) {
      for (var b = 0; b <= this.game[0].board.length - 1; b++) {
        this.game[0].board[a][b].value = ' ';
      };
    };

    this.section(2);
    this.game[0].turn = 0;
    this.game[0].playedCells = 0;
    this.game[0].alreadyWon = false;
  }
}