/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

//Initializing variables that need to be used across the Game class
const startScreen = document.querySelector('.start');

class Game {
    constructor() {
        this.missed = 0;
        this.phrases = [
                        new Phrase('Javascript is awesome'),
                        new Phrase('Curiosity killed the cat'),
                        new Phrase('Easy come easy go'),
                        new Phrase('Happy as a clam'),
                        new Phrase('Hold your horses'),
                        new Phrase('Better late than never'),
                        new Phrase('Let it be'),
                        new Phrase('Be happy')
                        ];
        this.activePhrase;
    }

    //This method starts the game by removing the start screen, getting the phrase, and displaying it
    startGame() {
        startScreen.classList.remove('win', 'lose');
        startScreen.style.display = 'none';
        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();
    }

    //This method selects a random phrase from the provided array
    getRandomPhrase() {
        return this.phrases[Math.floor(Math.random() * this.phrases.length)];
    }

    //This method handles all user interaction with the page
    handleInteraction(selectedLetter) {
        //Disabling any selected letters
        selectedLetter.disabled = true;
        //Calling checkLetter on the phrase and passing in the selected letter
        if (!this.activePhrase.checkLetter(selectedLetter.textContent)) {
            //Marking letter as wrong and removing a life
            selectedLetter.classList.add('wrong');
            this.removeLife();
        } else {
            //Marking letter as correct, showing letter(s) in hidden phrase, and checking for a win
            selectedLetter.classList.add('chosen');
            this.activePhrase.showMatchedLetter(selectedLetter.textContent);
            if (this.checkForWin()) {
                this.gameOver();
            }
        }
    }

    //This method switches the live hearts to lost hearts, increments the this.missed, and checks if they've lost all their lives
    removeLife() {
        const allHearts = document.querySelectorAll('li [src="images/liveHeart.png"]');
        const lastHeart = allHearts[allHearts.length - 1];
        lastHeart.src = 'images/lostHeart.png';
        this.missed++;
        if (this.missed === 5) {
            this.gameOver();
        }
    }

    //This method checks to see if they've revealed all letters in the phrase
    checkForWin() {
        const domLetters = document.querySelectorAll('#phrase li');
        const allCorrect = []
        domLetters.forEach(letter => {
            if (letter.classList.contains('hide')) {
                allCorrect.push(false);
            } else {
                allCorrect.push(true);
            }
        })
        if (allCorrect.includes(false)) {
            return false;
        } else {
            return true;
        }
    }

    //this method handles ending the game (either by winning or losing all lives)
    gameOver() {
        const gameOverMessage = document.querySelector('#game-over-message');
        const startButton = document.querySelector('.start button');
        if (this.checkForWin()) {
            this.resetBoard();
            gameOverMessage.textContent = 'Congrats! You won!!';
            startScreen.classList.add('win');
        } else {
            this.resetBoard();
            gameOverMessage.textContent = 'Looks like you lost... Try again!';
            startScreen.classList.add('lose');
        }
        startScreen.style.display = 'flex';
        startButton.focus();
    }

    //This method helps to reset the board when starting fresh
    resetBoard() {
        const phraseHtml = document.querySelectorAll('#phrase ul li');
        const keyboard = document.querySelectorAll('button.key');
        const allHearts = document.querySelectorAll('li [src="images/lostHeart.png"]');
        phraseHtml.forEach(character => character.remove());
        keyboard.forEach(key => {
            key.classList.remove('wrong');
            key.classList.remove('chosen');
            key.disabled = false;
        })
        allHearts.forEach(heart => heart.src = 'images/liveHeart.png');
        this.missed = 0;
    }
}