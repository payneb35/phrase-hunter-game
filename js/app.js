/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
//import {startGame} from Game.js;

//Declaring a few necessary variables
const startButton = document.querySelector('.start button');
const keyboard = document.querySelectorAll('div.keyrow button');
const phrases = ['Javascript is awesome',
                'Curiosity killed the cat',
                'Easy come easy go',
                'Happy as a clam',
                'Hold your horses',
                'Better late than never',
                'Let it be',
                'Be happy'];

//Creating a new game object
const newGame = new Game(0, phrases, );

//Makes the "Start Button" start a new game
startButton.addEventListener('click', () => {
    newGame.startGame();
});

//Handles clicking the on screen keyboard
keyboard.forEach(key => {
    key.addEventListener('click', () => newGame.handleInteraction(event.target));
})

//Handles using physical keyboard when playing
document.addEventListener('keyup', () => {
    if (event.key <= 'z' && event.key >= 'a' && document.querySelector('.start').style.display === 'none') {
        const keyboard = document.querySelectorAll('button.key');
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