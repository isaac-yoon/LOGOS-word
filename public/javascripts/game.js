import verses from './verses';

class Game {
  constructor(ctx, canvas, input, pageLayout) {
    this.verses = verses;
    this.pageLayout = pageLayout;
    this.ctx = ctx;
    this.level = 1;
    this.input = input;
    this.canvas = canvas;

    // bindings
    this.displayVerse = this.displayVerse.bind(this);
    this.displayHiddenVerse = this.displayHiddenVerse.bind(this);
    this.checkInputWithHiddenWord = this.checkInputWithHiddenWord.bind(this);
    this.start = this.start.bind(this);
  };

  displayVerse() {
    let verse = this.verses[this.level];
    // let verseSplit = verse.split(' ');
    // verseSplit[4] = '-------';
    // verseSplit = verseSplit.join(' ');
    this.ctx.font = '12px serif';
    this.ctx.fillText(verse, 10, 50);
    // setTimeout(function() {
    //   this.ctx.fillText(verseSplit, 10, 50);
    // }, 3000);
  };

  displayHiddenVerse() {
    // clear previous canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    let verse = this.verses[this.level];
    let verseSplit = verse.split(' ');

    // save hidden word
    let array = [];
    array.push(verseSplit[4]);

    // add dashes to word that was hidden
    verseSplit[4] = '-------';

    // rejoin
    verseSplit = verseSplit.join(' ');

    // write on canvas hidden
    this.ctx.font = '12px serif';
    this.ctx.fillText(verseSplit, 10, 50);

    this.checkInputWithHiddenWord(array[0]);
  };

  // function that goes into divisible by number 
  // saves values to a array

  // another function that changes indexes to dashes that takes in array
  // 
  // write out all helper functions

  checkInputWithHiddenWord(hiddenWord) {
    if (e.keyCode === 32 || e.keyCode === 13) {
      let userGuess = this.input.value;
      
      // word matches
      if (userGuess === hiddenWord) {
        this.displayHiddenVerse()
        // start new level
        this.level += 1

        // needs to display new level hidden verse
        // and create a loop
      }
    }
  };

  start() {
    // remove event listeners when game starts
    this.canvas.removeEventListener('click', this.start);
    this.pageLayout.removeEventListener('keypress', this.start);

    // display verse
    this.displayVerse();

    // display hidden verse
    setTimeout(this.displayHiddenVerse, 3000);
  };

};

export default Game;