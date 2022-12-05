'use strict';

// Selecting elements
const score0El = document.querySelector('#score--0');
const current0El = document.querySelector('#current--0');
const score1El = document.querySelector('#score--1');
const current1El = document.querySelector('#current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

let scores;
let currentScore;
let activePlayer;
let playing;

const init = function () {
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');
  player0.classList.remove('player--winner', 'name');
  player1.classList.remove('player--winner', 'name');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};
init();

function switchPlayer() {
  current0El.textContent = 0;
  current1El.textContent = 0;
  currentScore = 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
}

btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1.Genereating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    // 2.Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3.Check for rolled, if 1 switch to next player
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;

      if (player0.classList.contains('player--active')) {
        current0El.textContent = currentScore;
      } else {
        current1El.textContent = currentScore;
      }
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    score0El.textContent =
      Number(score0El.textContent) + Number(current0El.textContent);
    score1El.textContent =
      Number(score1El.textContent) + Number(current1El.textContent);
    if (score0El.textContent >= 20) {
      playing = false;
      player0.classList.add('player--winner');
    } else if (score1El.textContent >= 20) {
      playing = false;
      player1.classList.add('player--winner', 'name');
    }
    current0El.textContent = 0;
    current1El.textContent = 0;
    diceEl.classList.add('hidden');
    switchPlayer();
  }
});

btnNew.addEventListener('click', init);
