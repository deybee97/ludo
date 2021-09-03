// let active = false;
let players =[];
let leaderBoard=[];
let slotLeft=4;
let die;
let moveOn = true;
let allHomeSafe = false;
let color = ["y", "g", "r", "b"];
let nextNum;
let numofMoves;
let nextPlayer = 0;
let started = false;
let diceState = false;
let ludoBoardState = false;
let playerScore =[0,0,0,0];
// let yNotSafe=[];
// let gNotSafe=[];
// let rNotSafe=[];
// let bNotSafe=[];
// let outsideNotSafe=[yNotSafe,gNotSafe,rNotSafe,bNotSafe];
let bSafe = [73, 72, 71, 70, 69];  //bOutside
let ySafe = [40, 37, 34, 31, 28];
let rSafe = [4, 7, 10, 13, 16];
let gSafe = [61, 62, 63, 64, 65];
let outsideSafe = [ySafe, gSafe, rSafe, bSafe];  //outsideArray
let squareArray = [39, 36, 33, 30, 27, 80, 79, 78, 77, 76, 75, 60, 45, 46, 47, 48, 49, 50, 15, 12, 9, 6, 3, 0, 1, 2, 5, 8, 11, 14, 17,
  54, 55, 56, 57, 58, 59, 74, 89, 88, 87, 86, 85, 84, 29, 32, 35, 38, 41, 44, 43, 42
];


function safePawn(position) {

  let nextposition = position + 1;
  const moves = nextposition + die;
   moveOn= false;
   diceState = false;


  let currentClasslist = document.querySelectorAll(".square")[outsideSafe[nextPlayer][position]].classList;


  if (!(position + die > 5)) {

    if (currentClasslist.contains("pairs" + color[nextPlayer])) {
      match1(currentClasslist, color[nextPlayer])
    } else {
      currentClasslist.remove(color[nextPlayer]);
      currentClasslist.add("domant");
      currentClasslist.remove("safe");
    }

    if (position + die === 5) {

      sendHomeSafe(color[nextPlayer]);
      // moveOn=false;
    } else if (position + die < 5) {


      for (nextposition; nextposition < moves; nextposition++) {
        let nextClassList = document.querySelectorAll(".square")[outsideSafe[nextPlayer][nextposition]].classList;
        nextClassList.remove("domant");
        if (nextClassList.contains(color[nextPlayer])) {
          match2(nextClassList, color[nextPlayer]);
        } else {
          nextClassList.add(color[nextPlayer]);
        }
        if (moves - nextposition === 1) {
          nextClassList.add("safe");
        }
        if (moves - nextposition !== 1) {
          if (!nextClassList.contains("pairs" + color[nextPlayer])) {
            nextClassList.add("domant");
            nextClassList.remove(color[nextPlayer]);
          }
        }
      }
       moveOn=true;
    }
      diceState = true;
  }
}
// event listeners for the boxes outside

$(".square").click(function() {

  if ($("div.die").hasClass(color[nextPlayer]) && $(this).hasClass(color[nextPlayer]) && $("div.die").hasClass("domant")) {
     ludoBoardState=false;
    if (!$(this).hasClass("safe")) {

      //changes made $(this).hasClass(color[nextPlayer] + "Home") !$(this).hasClass("pairs" + color[nextPlayer]) this.classList.length >= 4 &&
      if ( $(this).hasClass("safePoint") && !$(this).hasClass("pairs" + color[nextPlayer])) {
        $(this).removeClass(color[nextPlayer]);
        // if (this.classList.length === 3) {
        //   $(this).addClass("domant");
        // }
      }
      //changes made $(this).hasClass(color[nextPlayer] + "Home")
      if (!$(this).hasClass("safePoint") && !$(this).hasClass("pairs" + color[nextPlayer])) {
        // $(this).fadeOut(1000000);
        $(this).removeClass(color[nextPlayer]);
        // $(this).fadeIn();
      }

      let currentNum = Number(this.innerText);
       nextNum = currentNum + 1;
       numofMoves = die + nextNum;
      let dieLeft = die;

   for (nextNum; nextNum < numofMoves; nextNum++) {  //



        if (nextNum === 52) {
          nextNum = 0;
          numofMoves = nextNum + dieLeft;
        }
        if (currentNum === 52) {
          currentNum = 0;
        }

        let nextClassList = document.querySelectorAll(".square")[squareArray[nextNum]].classList;
        let currentClasslist = document.querySelectorAll(".square")[squareArray[currentNum]].classList;



        if (currentClasslist.contains("pairs" + color[nextPlayer])) {
          match1(currentClasslist, color[nextPlayer]);
        }

        if ((currentNum === 50) || (currentNum == 11) || (currentNum == 24) || (currentNum == 37)) {

          let safe = rule2(currentNum, dieLeft, currentClasslist);
          if (safe) {
            break;
          }
        }

        if (numofMoves - nextNum === 1) {
          rules(nextNum);
          // if (nextClassList.contains("safePoint", "domant")) {
          //   nextClassList.remove("domant")
          // }
        }


        if (nextClassList.contains(color[nextPlayer])) {
          match2(nextClassList, color[nextPlayer]);
        } else {

          nextClassList.add(color[nextPlayer]);

        }



        if (numofMoves - nextNum !== 1) {

          // debug this first --- this removes the existing class in a square regardless of the class!!! warning
          if (!nextClassList.contains("pairs" + color[nextPlayer])) {

            nextClassList.remove(color[nextPlayer]);
          }

        }


        dieLeft--;
        currentNum++;

      }

     diceState = true;
    } else {

      const position = Number(this.innerText);

      safePawn(position);
    }




    if(diceState){
    $(".die").removeClass("domant");
  }
    if (die !== 6 && moveOn) {
      playOn();
       allHomeSafe = false;
    } else if (allHomeSafe) {
      playOn();
      allHomeSafe = false;
    }

  }
});





///  event listener for start of the game
$(".start-button").on("click", function() {
  if (!started && players.length===4) {

    $(".safe").addClass("domant");
    $(".square."+color[0]).removeClass(color[0]+" pairs"+color[0]+ " tripplet"+color[0]+" quad"+color[0]+" safe");

    $(".player."+color[0]+ " .pawn").addClass(color[0]);
    color=["y","g","r","b"];
    $(".pawn").removeClass("domant");
    started = true;
    diceState = true;
    setTimeout(()=>{
    $("h1").text(`it's your turn ${players[0]}`);
  }, 1000);
    $("h1").text("game on!");
  }

  for (let i = 0; i <= 51; i++) {
    // document.querySelectorAll(".square")[squareArray[i]].innerText = i;
    if(i===0 || i===13 || i===26 || i===39){
      document.querySelectorAll(".square")[squareArray[i]].innerHTML = "<i class='far fa-star'></i><p>"+i+"</p>";
    }else{
      document.querySelectorAll(".square")[squareArray[i]].innerHTML = "<p>"+i+"</p>";
    }

    document.querySelectorAll(".square")[squareArray[i]].classList.add("white-pane");
  }
  for (let i = 0; i < 5; i++) {
    document.querySelectorAll(".square")[ySafe[i]].innerText = i;
    document.querySelectorAll(".square")[gSafe[i]].innerText = i;
    document.querySelectorAll(".square")[rSafe[i]].innerText = i;
    document.querySelectorAll(".square")[bSafe[i]].innerText = i;
  }
});

//
// click event for the die
$(".die").click(function() {

  if (diceState) {
    moveOn = true;
    die =Math.floor(Math.random() * 6 + 1);
//
    $("img").attr("src", "images/dice" + die + ".png");
    turn();
  }
});


// click event for the pawns at home

$(".pawn").on("click", function() {

  if ($("div.die").hasClass(color[nextPlayer], "domant") && ludoBoardState && $(this).hasClass(color[nextPlayer]) && !$(this).hasClass("domant")) {
    $(this).removeClass(color[nextPlayer]);
    // active=false;
    switch (color[nextPlayer]) {
      case "g":
        const gHome = document.querySelectorAll(".square")[46].classList;
        if (gHome.contains("g")) {

          match2(gHome, color[nextPlayer]);

        } else {
          gHome.add(color[nextPlayer]);
          // gHome.remove("domant");
        }

        break;
      case "r":
        const rHome = document.querySelectorAll(".square")[5].classList;


        if (rHome.contains("r")) {

          match2(rHome, color[nextPlayer]);
        } else {
          rHome.add(color[nextPlayer]);
          // rHome.remove("domant");
        }
        break;

      case "b":
        const bHome = document.querySelectorAll(".square")[88].classList;

        if (bHome.contains("b")) {
          match2(bHome, color[nextPlayer]);
        } else {
          bHome.add(color[nextPlayer]);
          // bHome.remove("domant");
        }
        break;
      case "y":
        const yHome = document.querySelectorAll(".square")[39].classList;

        if (yHome.contains("y")) {

          match2(yHome, (color[nextPlayer]));

        } else {

          yHome.add(color[nextPlayer]);
          // yHome.remove("domant");
        }

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
let activeHomeCheck = document.querySelectorAll(".pawn." + color[nextPlayer]).length;
let domantHomeCheck =document.querySelectorAll(".pawn.domant." + color[nextPlayer]).length;
  if (die === 6 && activeHomeCheck!==domantHomeCheck ) {

    diceState = false;
    ludoBoardState = true;
    $(".die").addClass("domant");

    // active=true;

  }
  // if the pawns at home are less than 4, it means one or more of them are outside.

  else if (document.querySelectorAll(".pawn." + color[nextPlayer]).length< 4) {

    if(document.querySelectorAll(".white-pane."+color[nextPlayer]).length===0){
      let quaterToSafe = document.querySelectorAll(".square.safe."+color[nextPlayer]).length;
      let play = true;
        for(let i = 0; i<quaterToSafe; i++){
        let text = Number(document.querySelectorAll(".square.safe."+color[nextPlayer])[i].innerText);
        if(text+die<=5){
          play= false;
          diceState = false;
          $(".die").addClass("domant");
          break;
        }
        }
        if(play){
          playOn();
        }
    }else{
      diceState = false;
      $(".die").addClass("domant");
    }
}

  else {
    playOn();

  }


}

// function that determines turns

function playOn() {

if(slotLeft === color.length){
  $(".die").removeClass(color[nextPlayer]);

  if (nextPlayer === (color.length - 1)) {
    nextPlayer = 0;
  } else {
    nextPlayer++;

  }

  $(".die").addClass(color[nextPlayer]);
  $("h1").text(`it's your turn ${players[nextPlayer]}`)
}else{
  slotLeft = color.length;
  if (nextPlayer === (color.length)) {
    nextPlayer = 0;
  }
  $(".die").addClass(color[nextPlayer]);
  $("h1").text(`it's your turn ${players[nextPlayer]}`)
}
}

// rules of game
function rules(pawnPosition) {
  let rulesClassList = document.querySelectorAll(".square")[squareArray[pawnPosition]].classList;
  let rulesColor = color[nextPlayer];
  let playOn = true;

  // && !rulesClassList.contains(rulesColor + "Home")
  if (rulesClassList.length >= 2) {
    if (rulesClassList.contains("y")) {
      if (rulesColor !== "y") {
        // rulesClassList.remove("y");
        sendHome("y", rulesClassList);
      }

    } else if (rulesClassList.contains("g")) {
      if (rulesColor !== "g") {
        // rulesClassList.remove("g");
        sendHome("g", rulesClassList);
      }
    } else if (rulesClassList.contains("r")) {
      if (rulesColor !== "r") {
        // rulesClassList.remove("r");
        sendHome("r", rulesClassList);
      }
    } else if (rulesClassList.contains("b")) {
      if (rulesColor !== "b") {
        // rulesClassList.remove("b");
        sendHome("b", rulesClassList);
      }

    }

  }

}


// change name later
function sendHome(color, squareClassList) {
  if (!squareClassList.contains("safePoint")) {
    if (!squareClassList.contains("pairs" + color)) {
      squareClassList.remove(color);

    } else {
      match1(squareClassList, color);
    }
    checkForSpaceAtHome(color, "sentHome");
    moveOn = false;
  }
}


function sendHomeSafe(colour) {
  checkForSpaceAtHome(colour, "done");
  if (document.querySelectorAll(".player." + colour + " .pawn.domant").length === 4) {

    $(".die").removeClass(color[nextPlayer]);
    const ind = color.indexOf(colour);

    if (ind > -1) {
      color.splice(ind, 1);
      outsideSafe.splice(ind, 1);
      leaderBoard.push(players.splice(ind,1));
    }
    if(color.length===3){

    }else if(color.length==2){

    }

    allHomeSafe = true;
  } else {

    moveOn = false;
  }
  if(color.length===1){
   restart();
  }
}

function checkForSpaceAtHome(color, reason) {
  for (let i = 0; i < 4; i++) {
    if (!document.querySelectorAll(".player." + color + " .pawn")[i].classList.contains(color)) {

      document.querySelectorAll(".player." + color + " .pawn")[i].classList.add(color);

      if (reason === "done") {
        document.querySelectorAll(".player." + color + " .pawn")[i].classList.add("domant");
      }
      break;
    }

  }
}




function match1(currentClasslist, color) {
  if (currentClasslist.contains("tripplet" + color)) {

    if (currentClasslist.contains("quad" + color)) {
      currentClasslist.remove("quad" + color);
    } else {
      currentClasslist.remove("tripplet" + color);
    }

  } else {
    currentClasslist.remove("pairs" + color);
  }
}


function match2(nextClassList, color) {
  if (nextClassList.contains("pairs" + color)) {
    if (nextClassList.contains("tripplet" + color)) {
      nextClassList.add("quad" + color);
    } else {
      nextClassList.add("tripplet" + color);
    }
  } else {
    nextClassList.add("pairs" + color);
  }
}
//  && currentClasslist.contains("y")
function rule2(currentPosition, movesLeft) {
  let safe = false;
  if (currentPosition === 50 && color[nextPlayer] === "y") {

    safe = homeSafe("y", movesLeft);

  } else if (currentPosition === 11 && color[nextPlayer] === "g") {
    safe = homeSafe("g", movesLeft);
  } else if (currentPosition === 24 && color[nextPlayer] === "r") {
    safe = homeSafe("r", movesLeft);
  } else if (currentPosition === 37 && color[nextPlayer] === "b") {
    safe = homeSafe("b", movesLeft);
  }
  return safe;
}


function homeSafe(color, movesLeft) {
  if (movesLeft === 6) {
    sendHomeSafe(color);

  } else {
    // let arrayUsed;
    // switch (color) {
    //   case "y":
    //     arrayUsed = 0;
    //     break;
    //   case "g":
    //     arrayUsed = 1;
    //     break;
    //   case "r":
    //     arrayUsed = 2;
    //     break;
    //   case "b":
    //     arrayUsed = 3;
    //     break;
    //   default:
    //     console.log(color);
    //
    // }
    for (let i = 0; i < movesLeft; i++) {

      let classList = document.querySelectorAll(".square")[outsideSafe[nextPlayer][i]].classList;
      classList.remove("domant");

      if (classList.contains(color)) {
        match2(classList, color);
      } else {
        classList.add(color);
      }
      if (movesLeft - i === 1) {
        classList.add("safe");
      }
      if (movesLeft - i !== 1) {
        if (!classList.contains("pairs" + color)) {
          classList.add("domant");
          classList.remove(color);
        }

      }

    }
  }
  return true;
}


function restart(){


  outsideSafe=[ySafe, gSafe, rSafe, bSafe];
  $(".die").addClass(color[0]);
 slotLeft=4;
ludoBoardState = false;
 nextPlayer = 0;
  diceState=false;
  allHomeSafe=false;
  started=false;
  $("h1").text("press any key to RESTART");



}

$(".add-button").on("click",function(){

if(players.length!==4){
  let playerID = document.querySelectorAll(".player-name");
  let playerNames=[]
  playerID.forEach((player)=>{
    if(player.value!==""){
   playerNames.push(player.value)
 }
  })
  players = playerNames;
  console.log(players)
  if(players.length===4){
    playerID.forEach((input)=>{
      input.readOnly= true;
    })
    $("h1").text("Click start button!");
  }
}
});
