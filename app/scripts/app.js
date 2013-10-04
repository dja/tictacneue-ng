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
  $scope.gamex = [[{ value: ' '}, { value: ' '}, { value: ' '}],
                  [{ value: ' '}, { value: ' '}, { value: ' '}],
                  [{ value: ' '}, { value: ' '}, { value: ' '}]];

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
  var playedCells = 0;
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

  $scope.playCell = function(cell){
    if (alreadyWon == false && this.cell.value != 'X' && this.cell.value != 'O') {
      if (turn % 2 != 0) {
        turn++;
        playedCells++;
        this.cell.value = 'X';
      }
      else {
        turn++;
        playedCells++;
        this.cell.value = 'O';
      }
// Win Conditions
      for(x=0; x<=2; ++x){
        if(this.cell.value == this.gamex[0][x].value && this.cell.value == this.gamex[1][x].value && this.cell.value == this.gamex[2][x].value && this.cell.value != null){
          alreadyWon = true;
          alert(this.cell.value + " WON!");
        this.section(4);
        }
        if(this.cell.value == this.gamex[x][0].value && this.cell.value == this.gamex[x][1].value && this.cell.value == this.gamex[x][2].value && this.cell.value != null){
          alreadyWon = true;
          alert(this.cell.value + " WON!");
        this.section(4);
        }
      }
      if(this.cell.value == this.gamex[2][0].value && this.cell.value == this.gamex[1][1].value && this.cell.value == this.gamex[0][2].value && this.cell.value != null ){
        alreadyWon = true;
        alert(this.cell.value + " WON!");
        this.section(4);
      }
      if(this.cell.value == this.gamex[0][0].value && this.cell.value == this.gamex[1][1].value && this.cell.value == this.gamex[2][2].value && this.cell.value != null ){
        alreadyWon = true;
        alert(this.cell.value + " WON!");
        this.section(4);
      }
      else if(alreadyWon == false && playedCells == 9){
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

// Reset Game
  $scope.resetGame = function(){
    // Resets game board
    for (var a = 0; a <= this.gamex.length - 1; a++) {
      for (var b = 0; b <= this.gamex.length - 1; b++) {
        this.gamex[a][b].value = ' ';
      };
    };

    this.section(2);
    turn = 0;
    alreadyWon = false;
  }
}