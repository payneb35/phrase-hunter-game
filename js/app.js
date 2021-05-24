/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
//import {startGame} from Game.js;

//Declaring a few necessary variables
const startButton = document.querySelector('.start button');
const keyboard = document.querySelectorAll('div.keyrow button');
let newGame;

startButton.focus();

//Makes the "Start Button" start a new game
startButton.addEventListener('click', () => {
    newGame = new Game();
    newGame.startGame();
    return newGame;
});

//Handles clicking the on screen keyboard
keyboard.forEach(key => {
    key.addEventListener('click', () => newGame.handleInteraction(event.target));
})

//Handles using physical keyboard when playing
document.addEventListener('keyup', () => {
    if (event.key <= 'z' && event.key >= 'a' && document.querySelector('.start').style.display === 'none') {
        let pressedKey;
        keyboard.forEach(key => {
            if (!key.disabled) {
                if (key.textContent === event.key) {
                    pressedKey = key;
                    newGame.handleInteraction(pressedKey);
                }
            }
        });
    }
});