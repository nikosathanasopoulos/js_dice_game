'use strict';

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const player0NameEl = document.getElementById('name--0');
const player1NameEl = document.getElementById('name--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnHow = document.querySelector('.btn--how');
const btnNames = document.querySelector('.btn--names');

let currentScore = 0;
let activePlayer = 0;
const scores = [0,0];
let playing = true;
let playerName = ['Player 1','Player 2']

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const init = function(){
    playing = true;
    scores[0] = 0;
    scores[1] = 0;
    currentScore = 0;
    activePlayer = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    score0El.textContent = 0;
    score1El.textContent = 0;
    player0El.classList.add('player--active')
    player1El.classList.remove('player--active')
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
}

const switchPlayer = function (){
    console.log('Next Player');
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer ===0 ? 1: 0;
    player0El.classList.toggle('player--active')
    player1El.classList.toggle('player--active')
};

init();

// Rolling dice functionality
btnRoll.addEventListener('click', function(){
    if(playing){
        const dice = Math.floor(Math.random() * 6)+1;

        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;

        if(dice !== 1){
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }
        else{
            switchPlayer();
        }
    }

});

btnHold.addEventListener('click', function(){
    if(playing){
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        if(scores[activePlayer] > 100){
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            playing = false;
            alert(`Player ${playerName[activePlayer]} you have won`);
        }
        else{
            switchPlayer();
        }
    }
});

btnNew.addEventListener('click', function(){
    init();
});

btnHow.addEventListener('click', function(){
    alert('How to play, the winner must reach 100 points, and can roll the dice as many times as he wants , if the dice is 1, you lose your turn. Once you feel that your luck is running out press hold to save your score and give the turn to your oponent');
});

btnNames.addEventListener('click', function(){
    let tmp;
    tmp = prompt('Give the name of player 1');
    if(tmp){
        playerName[0] = tmp;
        player0NameEl.textContent = playerName[0];
    }
    tmp = prompt('Give the name of player 2');
    if(tmp){
        playerName[1] = tmp;
        player1NameEl.textContent = playerName[1];
    }

    console.log(playerName);

});