"use strict";angular.module("newTicApp",["firebase"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"GameCtrl"}).otherwise({redirectTo:"/"})}]);var rand_style_no=Math.ceil(5*Math.random());switch(jQuery(function(a){a.supersized({slides:[{image:"img/"+rand_style_no+"bg.jpg",title:""}]})}),rand_style_no){case 1:document.write('<!-- build:css(.tmp) styles/1.css --><link rel="stylesheet" href="styles/1.css" type="text/css"><!-- endbuild -->');break;case 2:document.write('<!-- build:css(.tmp) styles/2.css --><link rel="stylesheet" href="styles/2.css" type="text/css"><!-- endbuild -->');break;case 3:document.write('<!-- build:css(.tmp) styles/3.css --><link rel="stylesheet" href="styles/3.css" type="text/css"><!-- endbuild -->');break;case 4:document.write('<!-- build:css(.tmp) styles/4.css --><link rel="stylesheet" href="styles/4.css" type="text/css"><!-- endbuild -->');break;default:document.write('<!-- build:css(.tmp) styles/main.css --><link rel="stylesheet" href="styles/main.css" type="text/css"><!-- endbuild -->')}angular.module("newTicApp").controller("GameCtrl",["$scope","angularFire",function(a,b){a.games=[],a.queue={};var c=new Firebase("https://tictacneue.firebaseio.com/games");b(c,a,"games").then(function(){var c=new Firebase("https://tictacneue.firebaseio.com/queue");b(c,a,"queue").then(function(){if(void 0==a.queue.gameId){a.player="p1";var b={board:[[{value:" "},{value:" "},{value:" "}],[{value:" "},{value:" "},{value:" "}],[{value:" "},{value:" "},{value:" "}]],alreadyWon:!1,turn:1,playedCells:0,winorlose:null,iTurn:1};a.gameId=a.games.push(b)-1,a.queue.gameId=a.gameId}else a.player="p2",a.gameId=a.queue.gameId,a.queue={}})}),a.bttns=[{label:"Start Game ›",id:"startgame"},{label:"Choose X ›",id:"playr1"},{label:"Choose O ›",id:"playr2"},{label:"Play Again ›",id:"playagainbtn"}],a.setPlayr=function(){"p1"==a.player?a.section(2):"p2"==a.player&&a.section(3)},a.playBall=function(b){a.games[a.gameId].turn=b,a.section(3)},a.setX=function(b){a.games[a.gameId].turn++,a.games[a.gameId].playedCells++,b.value="X"},a.setO=function(b){a.games[a.gameId].turn++,a.games[a.gameId].playedCells++,b.value="O"},a.playCell=function(b){if(0==a.games[a.gameId].alreadyWon&&"X"!=b.value&&"O"!=b.value){"p1"==a.player&&1==a.games[a.gameId].iTurn?0!=a.games[a.gameId].turn%2?(alert(a.player+" if "+a.games[a.gameId].turn),a.games[a.gameId].iTurn=2,a.setX(b)):0==a.games[a.gameId].turn%2&&(alert(a.player+" else "+a.games[a.gameId].turn),a.games[a.gameId].iTurn=2,a.setO(b)):"p2"==a.player&&2==a.games[a.gameId].iTurn&&(0==a.games[a.gameId].turn%2?(alert(a.player+" if2 "+a.games[a.gameId].turn),a.games[a.gameId].iTurn=1,a.setX(b)):0!=a.games[a.gameId].turn%2&&(alert(a.player+" else2 "+a.games[a.gameId].turn),a.games[a.gameId].iTurn=1,a.setO(b)));for(var c=0;2>=c;++c)b.value==a.games[a.gameId].board[0][c].value&&b.value==a.games[a.gameId].board[1][c].value&&b.value==a.games[a.gameId].board[2][c].value&&null!=b.value&&(a.games[a.gameId].alreadyWon=!0),b.value==a.games[a.gameId].board[c][0].value&&b.value==a.games[a.gameId].board[c][1].value&&b.value==a.games[a.gameId].board[c][2].value&&null!=b.value&&(a.games[a.gameId].alreadyWon=!0);b.value==a.games[a.gameId].board[2][0].value&&b.value==a.games[a.gameId].board[1][1].value&&b.value==a.games[a.gameId].board[0][2].value&&null!=b.value&&(a.games[a.gameId].alreadyWon=!0),b.value==a.games[a.gameId].board[0][0].value&&b.value==a.games[a.gameId].board[1][1].value&&b.value==a.games[a.gameId].board[2][2].value&&null!=b.value&&(a.games[a.gameId].alreadyWon=!0)}else console.log("Nice try, punk")};var d=1;a.section=function(a){d=a},a.is=function(a){return d==a},a.resetGame=function(){for(var b=0;b<=a.games[a.gameId].board.length-1;b++)for(var c=0;c<=a.games[a.gameId].board.length-1;c++)a.games[a.gameId].board[b][c].value=" ";a.section(2),a.games[a.gameId].turn=0,a.games[a.gameId].playedCells=0,a.games[a.gameId].alreadyWon=!1}}]),function(a){a(document).ready(function(){a("body").append('<div id="supersized-loader"></div><div id="supersized"></div>')}),a.supersized=function(b){var c="#supersized",d=this;d.$el=a(c),d.el=c,vars=a.supersized.vars,d.$el.data("supersized",d),api=d.$el.data("supersized"),d.init=function(){a.supersized.vars.options=a.extend({},a.supersized.defaultOptions,b),d.options=a.supersized.vars.options,d._build()},d._build=function(){d._start()},d._start=function(){vars.current_slide=d.options.start_slide?d.options.start_slide-1:Math.floor(Math.random()*d.options.slides.length);var b=d.options.new_window?' target="_blank"':"";imageLink=api.getField("url")?"href='"+api.getField("url")+"'":"";var c=a('<img src="'+api.getField("image")+'"/>');c.appendTo(d.el).wrap('<a class="image-loading activeslide" '+imageLink+b+"></a>").css("visibility","hidden"),c.load(function(){d._origDim(a(this)),d.resizeNow(),d.launch()}),d.$el.css("visibility","hidden")},d.launch=function(){d.$el.css("visibility","visible"),a("#supersized-loader").hide(),a(window).resize(function(){d.resizeNow()})},d.resizeNow=function(){return d.$el.each(function(){return a("img",d.el).each(function(){function b(a){a?(thisSlide.width()<f||thisSlide.width()<d.options.min_width)&&(thisSlide.width()*e>=d.options.min_height?(thisSlide.width(d.options.min_width),thisSlide.height(thisSlide.width()*e)):c()):d.options.min_height>=g&&!d.options.fit_landscape?f*e>=d.options.min_height||f*e>=d.options.min_height&&1>=e?(thisSlide.width(f),thisSlide.height(f*e)):e>1?(thisSlide.height(d.options.min_height),thisSlide.width(thisSlide.height()/e)):thisSlide.width()<f&&(thisSlide.width(f),thisSlide.height(thisSlide.width()*e)):(thisSlide.width(f),thisSlide.height(f*e))}function c(a){a?thisSlide.height()<g&&(thisSlide.height()/e>=d.options.min_width?(thisSlide.height(d.options.min_height),thisSlide.width(thisSlide.height()/e)):b(!0)):d.options.min_width>=f?g/e>=d.options.min_width||e>1?(thisSlide.height(g),thisSlide.width(g/e)):1>=e&&(thisSlide.width(d.options.min_width),thisSlide.height(thisSlide.width()*e)):(thisSlide.height(g),thisSlide.width(g/e))}thisSlide=a(this);var e=(thisSlide.data("origHeight")/thisSlide.data("origWidth")).toFixed(2),f=d.$el.width(),g=d.$el.height();d.options.fit_always?g/f>e?b():c():g<=d.options.min_height&&f<=d.options.min_width?g/f>e?d.options.fit_landscape&&1>e?b(!0):c(!0):d.options.fit_portrait&&e>=1?c(!0):b(!0):f<=d.options.min_width?g/f>e?d.options.fit_landscape&&1>e?b(!0):c():d.options.fit_portrait&&e>=1?c():b(!0):g<=d.options.min_height?g/f>e?d.options.fit_landscape&&1>e?b():c(!0):d.options.fit_portrait&&e>=1?c(!0):b():g/f>e?d.options.fit_landscape&&1>e?b():c():d.options.fit_portrait&&e>=1?c():b(),thisSlide.parent().hasClass("image-loading")&&a(".image-loading").removeClass("image-loading"),d.options.horizontal_center&&a(this).css("left",(f-a(this).width())/2),d.options.vertical_center&&a(this).css("top",(g-a(this).height())/2)}),d.options.image_protect&&a("img",d.el).bind("contextmenu mousedown",function(){return!1}),!1})},d._origDim=function(a){a.data("origWidth",a.width()).data("origHeight",a.height()).css("visibility","visible")},d.getField=function(a){return d.options.slides[vars.current_slide][a]},d.init()},a.supersized.vars={current_slide:0,options:{}},a.supersized.defaultOptions={start_slide:1,new_window:1,image_protect:1,min_width:0,min_height:0,vertical_center:1,horizontal_center:1,fit_always:0,fit_portrait:1,fit_landscape:0},a.fn.supersized=function(b){return this.each(function(){new a.supersized(b)})}}(jQuery);