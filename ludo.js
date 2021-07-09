// var active = false;
var die;
var color = ["y", "g", "r", "b"];
var nextNum;
var numofMoves;
var nextPlayer = 0;
var started = false;
var diceState = false;
var ludoBoardState = false;
var blueOutside = [];
var yellowOutside = [];
var greenOutside = [];
var redOutside = [];
var outsideArray = [yellowOutside, greenOutside, redOutside, blueOutside];
var squareArray = [39, 36, 33, 30, 27, 80, 79, 78, 77, 76, 75, 60, 45, 46, 47, 48, 49, 50, 15, 12, 9, 6, 3, 0, 1, 2, 5, 8, 11, 14, 17,
  54, 55, 56, 57, 58, 59, 74, 89, 88, 87, 86, 85, 84, 29, 32, 35, 38, 41, 44, 43, 42
];



// event listeners for the pawns outside

$(".square").click(function() {
  if ($("div.die").hasClass(color[nextPlayer]) && $(this).hasClass(color[nextPlayer])) {
    outsideArray[nextPlayer].pop();

    if (outsideArray[nextPlayer].length === 0 && $(this).hasClass(color[nextPlayer] + "Home")) {
      $(this).removeClass(color[nextPlayer]);
      $(this).addClass("domant");

    }

    if ((!$(this).hasClass(color[nextPlayer] + "Home") && (!$(this).hasClass("pairs")))) {
      $(this).removeClass(color[nextPlayer]);
    }

  let  currentNum =Number(this.innerText);
    nextNum = currentNum + 1;
    numofMoves = die + nextNum;
    var dieLeft = die;

    for (nextNum; nextNum < numofMoves; nextNum++) {



      if (nextNum === 52) {
        nextNum = 0;
        numofMoves = nextNum + dieLeft;
      }
      if(currentNum===52){
        currentNum = 0;
      }
      
      let currentClassList = document.querySelectorAll(".square")[squareArray[nextNum]].classList;

      document.querySelectorAll(".square")[squareArray[currentNum]].classList.remove("pairs");

      if (numofMoves - nextNum === 1) {
        rules(nextNum);
      }

      if (currentClassList.contains(color[nextPlayer])) {
        currentClassList.add("pairs");


      } else {
        currentClassList.add(color[nextPlayer]);
      }
      if (numofMoves - nextNum !== 1) {

        // debug this first --- this removes the existing class in a square regardless of the class!!! warning
        if (!currentClassList.contains("pairs")) {
          currentClassList.remove(color[nextPlayer]);

        }

      }


      dieLeft--;
      currentNum++;
    }


    diceState = true;
    $(".die").removeClass("domant");

    if (die !== 6) {
      playOn();
    }
  }
});



///  event listener for start of the game
$(document).on("keypress", function(e) {
  if (!started) {
    started = true;
    diceState = true;
    $("h1").text("game on!");
  }
  for (var i = 0; i <= 51; i++) {
    document.querySelectorAll(".square")[squareArray[i]].innerText = i;
  }
});


// click event for the die
$(".die").click(function() {

  if (diceState) {

    die = Math.floor(Math.random() * 6 + 1);

    turn();
  }
});


// click event for the pawns at home

$(".pawn").on("click", function() {

  if ($("div.die").hasClass(color[nextPlayer]) && ludoBoardState && $(this).hasClass(color[nextPlayer])) {
    $(this).removeClass(color[nextPlayer]);
    // active=false;
    switch (color[nextPlayer]) {
      case "g":
        document.querySelectorAll(".square")[46].classList.add(color[nextPlayer]);

        document.querySelectorAll(".square")[46].classList.remove("domant");
        greenOutside.push(color[nextPlayer]);

        break;
      case "r":
        document.querySelectorAll(".square")[5].classList.add(color[nextPlayer]);

        document.querySelectorAll(".square")[5].classList.remove("domant");
        redOutside.push(color[nextPlayer]);

        break;
      case "b":
        document.querySelectorAll(".square")[88].classList.add(color[nextPlayer]);

        document.querySelectorAll(".square")[88].classList.remove("domant");
        blueOutside.push(color[nextPlayer]);

        break;
      case "y":
        document.querySelectorAll(".square")[39].classList.add(color[nextPlayer]);

        document.querySelectorAll(".square")[39].classList.remove("domant");


        yellowOutside.push(color[nextPlayer]);


        break;

      default:
        console.log(color[nextPlayer]);

    }
    diceState = true;
    ludoBoardState = false;
    $(".die").removeClass("domant");
  }
});

//




// fuction that defines what happens when the die is rolled

function turn() {

  if (die === 6) {

    diceState = false;
    ludoBoardState = true;
    $(".die").addClass("domant");

    // active=true;

  } else if (document.querySelectorAll(".pawn." + color[nextPlayer]).length < 4) {
    diceState = false;
    $(".die").addClass("domant");

  } else {
    playOn();

  }

}

// function that determines turns

function playOn() {


  $(".die").removeClass(color[nextPlayer]);
  if (nextPlayer === 3) {
    nextPlayer = 0;
  } else {
    nextPlayer++;

  }

  $(".die").addClass(color[nextPlayer]);

}

// rules of game
function rules(pawnPosition) {
  var rulesClassList = document.querySelectorAll(".square")[squareArray[pawnPosition]].classList;
  let rulesColor = color[nextPlayer];
  if (rulesClassList.length === 2) {
    if (rulesClassList.contains("y")) {
      if (rulesColor !== "y") {
        rulesClassList.remove("y");
        sendHome("y");
      }

    } else if (rulesClassList.contains("g")) {
      if (rulesColor !== "g") {
        rulesClassList.remove("g");
        sendHome("g");
      }
    } else if (rulesClassList.contains("r")) {
      if (rulesColor !== "r") {
        rulesClassList.remove("r");
        sendHome("r");
      }
    } else if (rulesClassList.contains("b")) {
      if (rulesColor !== "b") {
        rulesClassList.remove("b");
        sendHome("b");
      }

    }
  }
}
// change name later
function sendHome(color) {
  for (var i = 0; i < 4; i++) {
    if (!document.querySelectorAll(".player." + color + " .pawn")[i].classList.contains(color)) {

      document.querySelectorAll(".player." + color + " .pawn")[i].classList.add(color);
      break;
    }

  }

}
