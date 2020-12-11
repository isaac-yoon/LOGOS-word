import verses from './verses';

class Game {
  constructor(ctx, canvas, input, pageLayout) {
    this.verses = verses;
    this.pageLayout = pageLayout;
    this.ctx = ctx;
    this.level = 1;
    this.guessedCorrectly = false;
    this.guessed = false;
    this.input = input;
    this.canvas = canvas;
    this.currentVerse = '';
    this.hiddenWord = '';
    this.incorrectGuesses = 0;
    this.correctGuesses = 0;
    this.totalHintsUsed = 0;
    this.levelHintsUsed = 0;
    this.canvasWidth = this.canvas.width / window.devicePixelRatio;
    this.canvasHeight = this.canvas.height / window.devicePixelRatio;
    
    // bindings
    this.wrapText = this.wrapText.bind(this);
    this.displayVerse = this.displayVerse.bind(this);
    this.clearCanvas = this.clearCanvas.bind(this);
    this.hideVerse = this.hideVerse.bind(this);
    this.checkInputWithHiddenWord = this.checkInputWithHiddenWord.bind(this);
    this.winCheck = this.winCheck.bind(this);
    this.render = this.render.bind(this);
    this.removeStartEventListeners = this.removeStartEventListeners.bind(this);
    this.start = this.start.bind(this);
    this.restart = this.restart.bind(this);
    this.clearInputField = this.clearInputField.bind(this);
    this.useHint = this.useHint.bind(this);
    this.notifyUserOfIncorrectGuess = this.notifyUserOfIncorrectGuess.bind(this);
  }

  wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    let words = text.split(' ');
    let line = '';

    for (let i = 0; i < words.length; i++) {
      let testLine = line + words[i] + ' ';
      let metrics = ctx.measureText(testLine);
      let testWidth = metrics.width;

      if (testWidth > maxWidth && i > 0) {
        ctx.strokeText(line, x, y);
        line = words[i] + ' ';
        y += lineHeight;
      } else {
        line = testLine;
      }
    }

    ctx.strokeText(line, x, y);
  }

  displayVerse(verse) {
    this.ctx.font = '24px serif';
    let maxWidth = this.canvasWidth - 20;
    let lineHeight = 25;
    let x = 10;
    let y = this.canvasHeight / 2;
    this.wrapText(this.ctx, verse, x, y, maxWidth, lineHeight);
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  hideVerse() {
    let splitVerse = this.currentVerse.split(' ');
    let i = Math.floor(Math.random() * splitVerse.length);
    let wordToHide = splitVerse[i];

    splitVerse[i] = new Array(wordToHide.length + 1).join('_ ');
    this.currentVerse = splitVerse.join(' ');

    this.hiddenWord = wordToHide;
  }

  checkInputWithHiddenWord(e) {
    if (e.keyCode === 32 || e.keyCode === 13) {
      this.guessed = true;
      let userGuess = this.input.value.toLowerCase();
      if (userGuess === this.hiddenWord.toLowerCase()) {
        this.guessedCorrectly = true;
        this.clearInputField();
      } else {
        this.clearInputField();
      }
    }

    this.render();
  }

  clearInputField() {
    document.getElementById('word-input').value = '';
  }

  winCheck() {
    return (this.level == Object.keys(this.verses).length) && this.guessedCorrectly;
  }

  render() {
    this.clearCanvas();

    if (this.winCheck()) {
      // alternatively, have a end game modal show up
      this.ctx.strokeText('You won!', this.canvasWidth / 2 - 100, 75);

      // display score
      this.ctx.strokeText(`Incorrect Guesses: ${this.incorrectGuesses}`, this.canvasWidth / 2 - 75, 100);
      this.ctx.strokeText(`Correct Guesses: ${this.correctGuesses}`, this.canvasWidth / 2 - 75, 125);
      this.ctx.strokeText(`Hints Used: ${this.totalHintsUsed}`, this.canvasWidth / 2 - 75, 150);
    } else {
      if (this.guessedCorrectly) {
      this.level += 1;
      this.correctGuesses += 1;
      this.levelHintsUsed = 0;
      this.currentVerse = this.verses[this.level];
      this.guessedCorrectly = false;
      this.guessed = false;
      this.hideVerse();
      } else if (this.guessed) {
        this.incorrectGuesses += 1;
        this.guessed = false;
        this.notifyUserOfIncorrectGuess();
      }
      this.displayVerse(this.currentVerse);
    }
  }

  notifyUserOfIncorrectGuess() {
    this.input.id = 'word-input-wrong-guess';
    setTimeout(() => {
      this.input.id = 'word-input', 1000;
    });
  }

  removeStartEventListeners() {
    this.canvas.removeEventListener('click', this.start);
    this.pageLayout.removeEventListener('keypress', this.start);
  }


  useHint() {
    // construct the hidden word letter by letter and display on input field
    if (this.levelHintsUsed < this.hiddenWord.length) {
      this.totalHintsUsed += 1;
      this.levelHintsUsed += 1;

      this.clearInputField();

      document.getElementById('word-input').value = `${this.hiddenWord.slice(0, this.levelHintsUsed)}`;
    } else {
      // notify user that there are no more hints
      console.log('no more hints!');
    }

  }

  start() {
    this.removeStartEventListeners();
    this.input.addEventListener('keypress', this.checkInputWithHiddenWord);

    // add hint button event listener upon start of game
    const hintButton = document.getElementById('hint-button');
    hintButton.addEventListener('click', this.useHint);

    this.currentVerse = verses[this.level];
    this.hideVerse();
    this.render();
  }

  restart() {
    this.level = 1;
    this.guessedCorrectly = false;
    this.guessed = false;
    this.incorrectGuesses = 0;
    this.correctGuesses = 0;
    this.totalHintsUsed = 0;
    this.levelHintsUsed = 0;
    this.start();
  }
}

export default Game;