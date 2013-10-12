'use strict';

angular.module("newTicApp")
  .controller("GameCtrl", function($scope, angularFire){

  $scope.games = [];
  $scope.queue = {};

  var games = new Firebase("https://tictacneue.firebaseio.com/games");
  angularFire(games, $scope, "games").then(function(){

    var queue = new Firebase("https://tictacneue.firebaseio.com/queue");
    angularFire(queue, $scope, "queue").then(function (){
      if($scope.queue.gameId == undefined){

        $scope.player = "p1";

        // create game
        var newGame = {
          board: [[{ value: ' '}, { value: ' '}, { value: ' '}],
                  [{ value: ' '}, { value: ' '}, { value: ' '}],
                  [{ value: ' '}, { value: ' '}, { value: ' '}]],
          alreadyWon: false,
          turn: 1,
          playedCells: 0,
          winorlose: null,
          iTurn: true,
          p1: 'X'
        };

        $scope.gameId = $scope.games.push(newGame) - 1;
        $scope.queue.gameId = $scope.gameId;
      }

      else {

        $scope.player = "p2";
        // read game id from queue

        // clear the queue
        $scope.gameId = $scope.queue.gameId;
        $scope.queue = {};
      }

      });
    });

  // $scope.$watch('alreadyWon', function(){
  //   if($scope.game[0].alreadyWon == true){
  //     if(cell.value == 'X'){ $scope.game[0].winorlose = 'X WINS!' } else{ $scope.game[0].winorlose = 'O WINS!' };
  //     $scope.section(5);
  //   }
  //   else if($scope.game[0].alreadyWon == false && $scope.game[0].playedCells == 9){
  //     $scope.game[0].winorlose = 'NO WIN';
  //     $scope.section(5);
  //   }
  // });

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
  }];

  // Are you player 1 or 2?
  $scope.setPlayr = function(){
    if($scope.player == 'p1'){
      $scope.section(2);
    }
    else if($scope.player == 'p2'){
      $scope.section(3);
    }
  }

  // Setting Player as X or O
  $scope.playBall = function(numPlayr){
    $scope.games[$scope.gameId].turn = numPlayr;
    if(numPlayr = 2){
      $scope.games[$scope.gameId].p1 = 'O';
    }
    $scope.section(3);
  }

  $scope.setX = function(cell){
    $scope.games[$scope.gameId].turn++;
    $scope.games[$scope.gameId].playedCells++;
    cell.value = 'X';
  }
 $scope.setO = function(cell){
    $scope.games[$scope.gameId].turn++;
    $scope.games[$scope.gameId].playedCells++;
    cell.value = 'O';
  }

  $scope.playCell = function(cell){
    if ($scope.games[$scope.gameId].alreadyWon == false && cell.value != 'X' && cell.value != 'O') {
      while($scope.player == 'p1'){
        if ($scope.games[$scope.gameId].turn % 2 != 0 && $scope.games[$scope.gameId].iTurn == true) {
          // alert($scope.player + " if " + $scope.games[$scope.gameId].turn);
          $scope.setX(cell);
          $scope.games[$scope.gameId].iTurn = false;
        }
        else if ($scope.games[$scope.gameId].turn % 2 == 0 && $scope.games[$scope.gameId].iTurn == true){
          // alert($scope.player + " else " + $scope.games[$scope.gameId].turn);
          $scope.setO(cell);
          $scope.games[$scope.gameId].iTurn = false;
        }
      }
      while($scope.player == 'p2'){
        if ($scope.games[$scope.gameId].turn % 2 == 0 && $scope.games[$scope.gameId].iTurn == false) {
          // alert($scope.player + " if2 " + $scope.games[$scope.gameId].turn);
          $scope.setX(cell);
          $scope.games[$scope.gameId].iTurn = true;
        }
        else if ($scope.games[$scope.gameId].turn % 2 != 0 && $scope.games[$scope.gameId].iTurn == false) {
          // alert($scope.player + " else2 " + $scope.games[$scope.gameId].turn);
          $scope.setO(cell);
          $scope.games[$scope.gameId].iTurn = true;
        }        
      }
      // Win Conditions
      for(var x=0; x<=2; ++x){
        if(cell.value == $scope.games[$scope.gameId].board[0][x].value && cell.value == $scope.games[$scope.gameId].board[1][x].value && cell.value == $scope.games[$scope.gameId].board[2][x].value && cell.value != null){
        $scope.games[$scope.gameId].alreadyWon = true;
        }
        if(cell.value == $scope.games[$scope.gameId].board[x][0].value && cell.value == $scope.games[$scope.gameId].board[x][1].value && cell.value == $scope.games[$scope.gameId].board[x][2].value && cell.value != null){
        $scope.games[$scope.gameId].alreadyWon = true;
        }
      }
      if(cell.value == $scope.games[$scope.gameId].board[2][0].value && cell.value == $scope.games[$scope.gameId].board[1][1].value && cell.value == $scope.games[$scope.gameId].board[0][2].value && cell.value != null ){
        $scope.games[$scope.gameId].alreadyWon = true;
      }
      if(cell.value == $scope.games[$scope.gameId].board[0][0].value && cell.value == $scope.games[$scope.gameId].board[1][1].value && cell.value == $scope.games[$scope.gameId].board[2][2].value && cell.value != null ){
        $scope.games[$scope.gameId].alreadyWon = true;
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
    for (var a = 0; a <= $scope.games[$scope.gameId].board.length - 1; a++) {
      for (var b = 0; b <= $scope.games[$scope.gameId].board.length - 1; b++) {
        $scope.games[$scope.gameId].board[a][b].value = ' ';
      };
    };

    $scope.section(2);
    $scope.games[$scope.gameId].turn = 0;
    $scope.games[$scope.gameId].playedCells = 0;
    $scope.games[$scope.gameId].alreadyWon = false;
  }
});