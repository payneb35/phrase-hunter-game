/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */
const randomPhrase = new Phrase();
const startScreen = document.querySelector('.start');

class Game {
    constructor(missed, phrases, activePhrase) {
        this.missed = missed;
        this.phrases = phrases;
        this.activePhrase = activePhrase;
    }

    startGame() {
        startScreen.classList.remove('win', 'lose');
        startScreen.style.display = 'none';
        randomPhrase.phrase = this.getRandomPhrase();
        randomPhrase.addPhraseToDisplay();
    }

    getRandomPhrase() {
        return phrases[Math.floor(Math.random() * this.phrases.length)];
    }

    handleInteraction(event) {
        let selectedLetter = event.target;
        selectedLetter.disabled = true;
        if (!randomPhrase.checkLetter(selectedLetter.textContent)) {
            selectedLetter.classList.add('wrong');
            this.removeLife();
        } else {
            selectedLetter.classList.add('chosen');
            randomPhrase.showMatchedLetter(selectedLetter.textContent);
            if (this.checkForWin()) {
                console.log('you won');
                this.gameOver();
            }
        }
    }

    removeLife() {
        const allHearts = document.querySelectorAll('li [src="images/liveHeart.png"]');
        const lastHeart = allHearts[allHearts.length - 1];
        lastHeart.src = 'images/lostHeart.png';
        this.missed++;
        if (this.missed === 5) {
            this.gameOver();
        }
    }

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

    gameOver() {
        const gameOverMessage = document.querySelector('#game-over-message');
        if (this.checkForWin()) {
            this.resetBoard();
            gameOverMessage.textContent = 'Congrats! You won!!';
            startScreen.classList.add('win');
        } else {
            this.resetBoard();
            gameOverMessage.textContent = 'Looks like you lost... Try again!';
            startScreen.classList.add('lose');
        }
        startScreen.style.display = 'block';
    }

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