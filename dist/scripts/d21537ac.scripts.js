"use strict";function GameCtrl(a,b){var c=Math.ceil(5*Math.random());switch(jQuery(function(a){a.supersized({slides:[{image:"img/"+c+"bg.jpg",title:""}]})}),c){case 1:document.write('<link rel="stylesheet" href="styles/1.css" type="text/css">');break;case 2:document.write('<link rel="stylesheet" href="styles/2.css" type="text/css">');break;case 3:document.write('<link rel="stylesheet" href="styles/3.css" type="text/css">');break;case 4:document.write('<link rel="stylesheet" href="styles/4.css" type="text/css">');break;default:document.write('<link rel="stylesheet" href="styles/main.css" type="text/css">')}a.game=[{board:[[{value:" "},{value:" "},{value:" "}],[{value:" "},{value:" "},{value:" "}],[{value:" "},{value:" "},{value:" "}]],alreadyWon:!1,turn:1,playedCells:0,winorlose:null}];var d=new Firebase("https://tictacneue.firebaseio.com/game"),e=b(d,a,"game");e.then(function(){a.game=[{board:[[{value:" "},{value:" "},{value:" "}],[{value:" "},{value:" "},{value:" "}],[{value:" "},{value:" "},{value:" "}]],alreadyWon:!1,turn:1,playedCells:0,winorlose:null}]}),d.child("queue"),a.bttns=[{label:"Start Game ›",id:"startgame"},{label:"Choose X ›",id:"playr1"},{label:"Choose O ›",id:"playr2"},{label:"Play Again ›",id:"playagainbtn"},{label:"Helvetica Neue not Installed. Try Again?",id:"fontdetect"}],a.playBall=function(a){this.game[0].turn=a},a.playCell=function(){if(0==this.game[0].alreadyWon&&"X"!=this.cell.value&&"O"!=this.cell.value){for(0!=this.game[0].turn%2?(this.game[0].turn++,this.game[0].playedCells++,this.cell.value="X"):(this.game[0].turn++,this.game[0].playedCells++,this.cell.value="O"),x=0;2>=x;++x)this.cell.value==this.game[0].board[0][x].value&&this.cell.value==this.game[0].board[1][x].value&&this.cell.value==this.game[0].board[2][x].value&&null!=this.cell.value&&(this.game[0].alreadyWon=!0),this.cell.value==this.game[0].board[x][0].value&&this.cell.value==this.game[0].board[x][1].value&&this.cell.value==this.game[0].board[x][2].value&&null!=this.cell.value&&(this.game[0].alreadyWon=!0);this.cell.value==this.game[0].board[2][0].value&&this.cell.value==this.game[0].board[1][1].value&&this.cell.value==this.game[0].board[0][2].value&&null!=this.cell.value&&(this.game[0].alreadyWon=!0),this.cell.value==this.game[0].board[0][0].value&&this.cell.value==this.game[0].board[1][1].value&&this.cell.value==this.game[0].board[2][2].value&&null!=this.cell.value&&(this.game[0].alreadyWon=!0)}else console.log("Nice try, punk")};var f=1;a.section=function(a){f=a},a.is=function(a){return f==a},a.resetGame=function(){for(var a=0;a<=this.game[0].board.length-1;a++)for(var b=0;b<=this.game[0].board.length-1;b++)this.game[0].board[a][b].value=" ";this.section(2),this.game[0].turn=0,this.game[0].playedCells=0,this.game[0].alreadyWon=!1}}angular.module("newTicApp",["firebase"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"GameCtrl"}).otherwise({redirectTo:"/"})}]);