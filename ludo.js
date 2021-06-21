// var active = false;
var die;
var color = ["y" ,"g", "r", "b"];

var nextPlayer = 0;
var started = false;
var diceState = false;
var ludoBoardState = false;
var blueOutside = [];
var yellowOutside = [];
var greenOutside = [];
var redOutside = [];
var outsideArray=[yellowOutside, greenOutside, redOutside,blueOutside];
var squareArray =[];





$(".square").click(function(){
  if($("div.die").hasClass(color[nextPlayer]) && $(this).hasClass(color[nextPlayer])){

    $(this).removeClass(color[nextPlayer]);
    // for(var i = 0; i<die; i++){
    //   document.querySelectorAll(".square");
    // }
  diceState = true;
    $(".die").removeClass("domant");
playOn();
  }

});

$(document).on("keypress", function(e) {
  if (!started) {
    started = true;
    diceState = true;
    $("h1").text("game on!");
  }
});



$(".die").click(function() {

  if (diceState) {

    die = Math.floor(Math.random() * 6 + 1);

    //
    // if(die !== 6 && nextPlayer===3 && row===3){
    //   nextPlayer = row = 0;
    // }else if ( die === 6 && nextPlayer===3 && row===3){
    //   nextPlayer= row
    // }
    turn();
  }
});



$(".pawn").on("click", function() {

  if ($("div.die").hasClass(color[nextPlayer]) && ludoBoardState && $(this).hasClass(color[nextPlayer])) {
    $(this).removeClass(color[nextPlayer]);
    // active=false;
    switch (color[nextPlayer]) {
      case "g":

        greenOutside.push(color[nextPlayer]);

        break;
      case "r":

        redOutside.push(color[nextPlayer]);

        break;
      case "b":

        blueOutside.push(color[nextPlayer]);

        break;
      case "y":
document.querySelectorAll(".square")[39].classList.add("y");
        yellowOutside.push(color[nextPlayer]);


        break;

      default: console.log(color[nextPlayer]);

    }
    diceState = true;
    ludoBoardState = false;
    $(".die").removeClass("domant");
  }
});

//






function turn() {

  if (die === 6) {

    diceState = false;
    ludoBoardState = true;
    $(".die").addClass("domant");

    // active=true;

  } else if (outsideArray[nextPlayer].length !== 0) {
   diceState = false;
    $(".die").addClass("domant");

  }else {
  playOn();

  }

}

function playOn(){


  $(".die").removeClass(color[nextPlayer]);
  if (nextPlayer === 3) {
    nextPlayer = 0;
  } else {
    nextPlayer++;

  }

  $(".die").addClass(color[nextPlayer]);

}
