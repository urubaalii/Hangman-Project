var OUR_POSSIBLE_WORDS=["obdurate", 
"verisimilitude",
"defenestrate",
"obsequious",
"dissonant",
"toady",
"idempotent",
];
var MAX_GUESSES = 6;
var guessesLeft;
var word="";
var guesses="";
var gameOver=false; 

function startNewGame() {
    var randomIndex = parseInt(Math.random() * OUR_POSSIBLE_WORDS.length);
    word = OUR_POSSIBLE_WORDS[randomIndex];
    guessesLeft = MAX_GUESSES;
    guesses = "";
    gameOver = false;

    document.getElementById("userGuess").disabled = false;
    document.getElementById("guessButton").disabled = false;
    document.getElementById("dialog").innerHTML = "";

    updateCurrentView();
}


function takeGuess(){
    if(gameOver) 
        return;

    var input = document.getElementById("userGuess");
    var letterPicked = input.value;

    if (letterPicked && guesses.indexOf(letterPicked) === -1) {
    guesses += letterPicked;
    if(word.indexOf(letterPicked) < 0) {
        guessesLeft--;
    }
}
    input.value = ""; //clear input field after guess
    updateCurrentView();
} 


function updateCurrentView() {
    var clueString = "";

    for (var i = 0; i < word.length; i++) {
        if(guesses.indexOf(word[i]) >= 0) {
            clueString += word[i] + " ";
        } else {
            clueString += "_ ";
        }
    }


    var image = document.getElementById("hmpic");
    image.src = "images/hangman" + guessesLeft + ".gif";

    var clue = document.getElementById("clue");
    clue.innerHTML = clueString;

    var guessedLetter = document.getElementById("guesses");
    guessedLetter.innerHTML = "Guesses: " + guesses;

//win or lose
if (guessesLeft <= 0) {
    gameOver = true;
    displayGameOverMessage("lose");
} else if (!clueString.includes("_")) {
    gameOver = true;
    displayGameOverMessage("win");
}
}

//display win/lose message
function displayGameOverMessage(result) {
    var dialog = document.getElementById("dialog");
    if(result === "lose") {
        dialog.innerHTML = "You lose! The word was " + word + ".<br><br>";
    } else if (result === "win") {
        dialog.innerHTML = "You win!<br><br>";
    }
    
    dialog.innerHTML += "<button onclick='startNewGame()'>Play Again</button>";

    document.getElementById("userGuess").disabled = true;
    document.getElementById("guessButton").disabled = true;
}
