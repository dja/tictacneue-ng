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
  $scope.gamex = [['hi1', 'hi2', 'hi3'], ['hi4', 'hi5', 'hi6'], ['hi7', 'hi8', 'hi9']];

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