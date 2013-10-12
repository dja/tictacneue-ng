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
    })

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
};