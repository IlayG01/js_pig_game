/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/
//global variables
var playersScores, roundScore, activePlayer, dice, isGamePlaying;

document.querySelector('.btn-new').addEventListener('click', initializeGame);

function initializeGame() {
    // hide the cube
    document.querySelector('.dice').style.display = 'none';
// initialize scores
    document.querySelector("#current-player-1").textContent = '0';
    document.querySelector("#current-player-0").textContent = '0';
    document.querySelector("#score-player-1").textContent = '0';
    document.querySelector("#score-player-0").textContent = '0';
    document.querySelector("#name-player-1").textContent = 'PLAYER 2';
    document.querySelector("#name-player-0").textContent = 'PLAYER 1';
//hiding dice
    document.querySelector('.dice').style.display = 'none';

    playersScores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    isGamePlaying = true;
}


document.querySelector(".btn-roll").addEventListener('click', function () {
    if(isGamePlaying) {
        // our dice rolling
        var diceNumber = Math.round(Math.random() * 5) + 1;
        // update the dice
        var diceDOM = document.querySelector(".dice");
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice' + diceNumber + ".png";
        // add it to current player if dice is not 1
        if (diceNumber !== 1) {
            roundScore += diceNumber;
            document.querySelector("#current-player-" + activePlayer).textContent = roundScore;
        } else {
            roundScore = 0;
            document.querySelector("#current-player-" + activePlayer).textContent = roundScore;
            nextPlayerTurn()
        }
    }
});

document.querySelector(".btn-hold").addEventListener('click', function () {
    if(isGamePlaying){
        // add current score to global score
        playersScores[activePlayer] += roundScore;
        console.log(playersScores[activePlayer]);
        roundScore = 0;
        // update ui
        document.querySelector("#score-player-" + activePlayer).textContent = playersScores[activePlayer];
        document.querySelector("#current-player-" + activePlayer).textContent = '0';
        // check if won or pass the turn
        if (playersScores[activePlayer] >= 100) {
            document.querySelector("#name-player-" + activePlayer).classList.add('winner');
            document.querySelector("#name-player-" + activePlayer).textContent = "WINNER";
            document.querySelector("#name-player-" + activePlayer).classList.remove('active');
            document.querySelector('.dice').style.display = 'none';
            isGamePlaying = false;
        } else {
            nextPlayerTurn()
        }
    }
});

function nextPlayerTurn() {
    activePlayer ? activePlayer = 0 : activePlayer = 1;
    //initialize new round
    document.querySelector("#current-player-1").textContent = '0';
    document.querySelector("#current-player-0").textContent = '0';
    //changing the active player
    document.querySelector(".player-0-panel").classList.toggle('active');
    document.querySelector(".player-1-panel").classList.toggle('active');
}

initializeGame();