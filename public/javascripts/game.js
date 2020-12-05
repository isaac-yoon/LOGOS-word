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
    this.clearInputField = this.clearInputField.bind(this);
  };

  wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    let words = text.split(' ');
    let line = '';

    for (let i = 0; i < words.length; i++) {
      let testLine = line + words[i] + ' ';
      let metrics = ctx.measureText(testLine);
      let testWidth = metrics.width;

      if (testWidth > maxWidth && i > 0) {
        ctx.fillText(line, x, y);
        line = words[i] + ' ';
        y += lineHeight;
      } else {
        line = testLine;
      }
    }

    ctx.fillText(line, x, y);
  };

  displayVerse(verse) {
    this.ctx.font = '12px serif';
    let maxWidth = 250;
    let lineHeight = 25;
    let x = 10;
    let y = 25;
    this.wrapText(this.ctx, verse, x, y, maxWidth, lineHeight);
  };

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  };

  hideVerse() {
    let splitVerse = this.currentVerse.split(' ');
    let i = Math.floor(Math.random() * splitVerse.length);
    let wordToHide = splitVerse[i];

    splitVerse[i] = new Array(wordToHide.length + 1).join('_ ');
    this.currentVerse = splitVerse.join(' ');

    this.hiddenWord = wordToHide;
  };

  checkInputWithHiddenWord(e) {
    if (e.keyCode === 32 || e.keyCode === 13) {
      this.guessed = true;
      let userGuess = this.input.value.toLowerCase();
      if (userGuess === this.hiddenWord.toLowerCase()) {
        console.log('user guessed correctly');
        this.guessedCorrectly = true;
        this.clearInputField();
      } else {
        console.log('user guessed wrong');
        this.clearInputField();
      }
    };
    this.render();
  };

  clearInputField() {
    document.getElementById('word-input').value = '';
  };

  winCheck() {
    return this.level == 9 && this.guessedCorrectly;
  };

  render() {
    this.clearCanvas();
    
    if (this.winCheck()) {
      console.log('user has won');
      // render a win message and option to re-start game
    } else {
      if (this.guessedCorrectly) {
      this.level += 1;
      this.currentVerse = this.verses[this.level];
      this.guessedCorrectly = false;
      this.guessed = false;
      this.hideVerse();
      } else if (this.guessed) {
        // display message notifying user's guess is incorrect
      }
      this.displayVerse(this.currentVerse);
    }
  };

  removeStartEventListeners() {
    this.canvas.removeEventListener('click', this.start);
    this.pageLayout.removeEventListener('keypress', this.start);
  };

  start() {
    this.removeStartEventListeners();
    this.input.addEventListener('keypress', this.checkInputWithHiddenWord);

    this.currentVerse = verses[this.level];
    this.hideVerse();
    this.render();
  };
};

export default Game;