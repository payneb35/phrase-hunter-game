/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */
class Phrase {
    constructor (phrase) {
        this.phrase = phrase;
    }

    //This method shows the empty phrase that is being guessed
    addPhraseToDisplay() {
        const phraseHtml = document.querySelector('#phrase ul');
        Array.from(this.phrase).forEach(phraseCharacter => {
            const li = document.createElement('li');
            if (phraseCharacter === ' ') {
                li.classList.add('space');
                li.textContent = ' ';
            } else {
                li.classList.add('hide', 'letter', `${phraseCharacter.toLowerCase()}`);
                li.textContent = '?';
            }
            phraseHtml.appendChild(li);
        });
    }

    //This method checks if the guessed letter is in the phrase
    checkLetter(letter) {
        return this.phrase.toLowerCase().includes(letter);
    }

    //This method updates the phrase display to include any correctly selected letters
    showMatchedLetter(letter) {
        let matchedLetters = document.querySelectorAll(`li.${letter}`);
        matchedLetters.forEach(matchedLetter => {
            matchedLetter.textContent = `${letter}`;
            matchedLetter.classList.remove('hide');
            matchedLetter.classList.add('show');
        });
    }
}