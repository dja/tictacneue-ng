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
  }, {
    label: "Helvetica Neue not Installed. Try Again?",
    id: 'fontdetect'
  }];

  var turn = 1;
  var alreadyWon = false;

// Font Detection for Helvetica Neue
$scope.detectHelv = function(){
  var d = new Detector();
  if(d.detect('Helvetica Neue') == false){
    this.section(5);
  }
}

  // Setting Player as X or O
  $scope.playBall = function(numPlayr){
    turn = numPlayr;
  }

  $scope.playCell = function(row, col){
    if (alreadyWon == false && this.gamex[row][col] != 'X' && this.gamex[row][col] != 'O') {
      if (turn % 2 != 0) {
        turn++;
        this.gamex[row][col] = 'X';
      }
      else {
        turn++;
        this.gamex[row][col] = 'O';
      }
      // Win Conditions
      if(this.gamex[0][col] == this.gamex[1][col] && this.gamex[1][col] == this.gamex[2][col] && this.gamex[0][col] != null){
        alreadyWon = true;
        alert(this.gamex[0][col] + " WON!");
        this.section(4);
      }
      if(this.gamex[row][0] == this.gamex[row][1] && this.gamex[row][1] == this.gamex[row][2] && this.gamex[row][0] != null){
        alreadyWon = true;
        alert(this.gamex[row][0] + " WON!");
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
      else if(alreadyWon == false && this.gamex[row][col] != 'X' && this.gamex[row][col] != 'O'){
        alert("No one won.");
        this.section(4);
      }

    }
    else {
      console.log('Nice try, punk');
    }
    // Shake to Reload on iPhone
    if (typeof window.DeviceMotionEvent != 'undefined') {
        // Shake sensitivity (a lower number is more)
        var sensitivity = 50;

        // Position variables
        var x1 = 0, y1 = 0, z1 = 0, x2 = 0, y2 = 0, z2 = 0;

        // Listen to motion events and update the position
        window.addEventListener('devicemotion', function (e) {
            x1 = e.accelerationIncludingGravity.x;
            y1 = e.accelerationIncludingGravity.y;
            z1 = e.accelerationIncludingGravity.z;
        }, false);

        // Periodically check the position and fire
        // if the change is greater than the sensitivity
        setInterval(function () {
            var change = Math.abs(x1-x2+y1-y2+z1-z2);

            if (change > sensitivity) {
                var shakeGame = confirm("Do you want to start a new game?");
          if (shakeGame == true){
            window.location.reload();
          }
            }

            // Update new position
            x2 = x1;
            y2 = y1;
            z2 = z1;
        }, 150);
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
    this.section(2);
    this.turn = 0;
    this.alreadyWon = false;
  }
}