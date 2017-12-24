// Assigning cards
var cards = ["fa-diamond", "fa-diamond", "fa-paper-plane-o", "fa-paper-plane-o", "fa-anchor", "fa-anchor", "fa-bolt", "fa-bolt", "fa-cube", "fa-cube", "fa-leaf", "fa-leaf", "fa-bicycle", "fa-bicycle", "fa-bomb", "fa-bomb"];

// Create array to hold opened cards
var openedCards = [];
var moves = 0;
var starts = 3;
var matches = 0;

var starRating = "3";


// Shuffle cards from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

// Create each card's HTMl
function createCard() {
  let cardList = shuffle(cards);
  cardList.forEach(function(card)  {
    $(".deck").append('<li><i class="card fa ' + card + '"></i></li>');
  })
}

// gameplay by flipping cards
function findMatch() {
  $(".card").on("click", function() {
    if ($(this).hasClass("open show")) { return; }
    $(this).toggleClass("flipInY open show");
    openedCards.push($(this));
 
   // Game play for correct match
    if (openedCards.length === 2) {
      if (openedCards[0][0].classList[2] === openedCards[1][0].classList[2]) {
      openedCards[0][0].classList.add("match");
      openedCards[1][0].classList.add("match");
      $(openedCards[0]).off('click');
      $(openedCards[1]).off('click');
      matches += 1;
      moves++;
      closeCards();
      gameOver();
      } else {
  // Gameplay for incorrect match 
      openedCards[0][0].classList.add("wrong");
      openedCards[1][0].classList.add("wrong");
      setTimeout(removeClasses, 900);
      setTimeout(closeCards, 900);
      moves++;
      }
    }
  updateMoves();
  })
}

// Update HTML with rating
function updateMoves() {

  $("#moves").text(moves.toString());
  if (moves > 0 && moves < 12) {
    starRating = starRating;
  } else if (moves >= 12 && moves <= 18) {
    $("#starOne").removeClass("fa-star");
    starRating = "2";
  } else if (moves > 19) {
    $("#starTwo").removeClass("fa-star");
    starRating = "1";
  }
}


// Open popup when game over from www.w3schools.com
function gameOver() {
  if (matches === 8) {
    var modal = document.getElementById("congrats");
    var span = document.getElementsByClassName("close")[0];
    $("#total-stars").text(starRating);
    modal.style.display = "block";

  // closing modal and rematch option
  
    span.onclick = function() {
        modal.style.display = "none";
    }

   $("#rematch").on("click", function() {
       location.reload()
   });
   clearInterval(timer);
 }
}

// emptying array holding flipped cards
function closeCards() {
  openedCards = [];
}

// clsong incorrectly matched cards
function removeClasses() {
  $(".card").removeClass("show open flipInY wrong");
  closeCards();
}

// Disable clicks for already opened cards
function disableClick() {
 openedCards.forEach(function (card) {
   card.off("click");
  })
}

// initiating timer for when first card is clicked
function startTimer() {
  var clicks = 0;
  $(".card").on("click", function() {
    clicks += 1;
    if (clicks === 1) {
      var sec = 0;
      function time ( val ) { return val > 9 ? val : "0" + val; }
      timer = setInterval( function(){
        $(".seconds").html(time(++sec % 60));
        $(".minutes").html(time(parseInt(sec / 60, 10)));
      }, 1000);
    }
  })
 }

// Call all functions to prepare game
shuffle(cards);
createCard();
findMatch();
startTimer();

// option to restart game 
function restartGame() {
  $("#restart").on("click", function() {
      alert("You will lose all your progress!");
      location.reload()
  });
  }

restartGame();
