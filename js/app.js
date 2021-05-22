/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
//import {startGame} from Game.js;

const startButton = document.querySelector('.start button');
const keyboard = document.querySelectorAll('div.keyrow button');
const phrases = ['Javascript is awesome',
                'Curiosity killed the cat',
                'Easy come easy go',
                'Happy as a clam',
                'Hold your horses'];
const newGame = new Game(0, phrases, phrases[0]);

startButton.addEventListener('click', () => {
    newGame.startGame();
});

keyboard.forEach(key => {
    key.addEventListener('click', () => newGame.handleInteraction(event));
})
