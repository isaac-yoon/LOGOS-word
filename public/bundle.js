/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./public/javascripts/canvas.js":
/*!**************************************!*\
  !*** ./public/javascripts/canvas.js ***!
  \**************************************/
/*! namespace exports */
/*! export setupCanvas [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setupCanvas": () => /* binding */ setupCanvas
/* harmony export */ });
let calculatePixelRatio = function() {
  let ctx = document.getElementById('word-canvas').getContext('2d');
  let dpr = window.devicePixelRatio || 1;
  let bsr = ctx.webkitBackingStorePixelRatio || 
            ctx.mozBackingStorePixelRatio ||
            ctx.msBackingStorePixelRatio ||
            ctx.oBackingStorePixelRatio ||
            ctx.backingStorePixelRatio ||
            1;
  
  return dpr / bsr;
};

let modifyPPICanvasResolution = function(w, h, ratio) {
  if (!ratio) { ratio = PIXEL_RATIO; }
  let canvas = document.getElementById('word-canvas');
  canvas.width = w * ratio;
  canvas.height = h * ratio;
  canvas.style.width = w + 'px';
  canvas.style.height = h + 'px';
  canvas.getContext('2d').setTransform(ratio, 0, 0, ratio, 0, 0);
};

let setupCanvas = function(canvas) {
  let dpr = window.devicePixelRatio || 1;
  let rect = canvas.getBoundingClientRect();

  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  let ctx = canvas.getContext('2d');

  ctx.scale(dpr, dpr);

  return ctx;
};



/***/ }),

/***/ "./public/javascripts/game.js":
/*!************************************!*\
  !*** ./public/javascripts/game.js ***!
  \************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _verses__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./verses */ "./public/javascripts/verses.js");
;

class Game {
  constructor(ctx, canvas, input, pageLayout) {
    this.verses = _verses__WEBPACK_IMPORTED_MODULE_0__.default;
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
    this.hintsUsed = 0;
    
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
    this.ctx.font = '12px serif';
    let maxWidth = 250;
    let lineHeight = 25;
    let x = 10;
    let y = 25;
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
    return this.level == 9 && this.guessedCorrectly;
  }

  render() {
    this.clearCanvas();

    if (this.winCheck()) {
      this.ctx.strokeText('You won!', 125, 25);

      // display score
      this.ctx.strokeText(`Incorrect: ${this.incorrectGuesses}`, 125, 50);
      this.ctx.strokeText(`Correct: ${this.correctGuesses}`, 125, 75);
    } else {
      if (this.guessedCorrectly) {
      this.level += 1;
      this.correctGuesses += 1;
      this.currentVerse = this.verses[this.level];
      this.guessedCorrectly = false;
      this.guessed = false;
      this.hideVerse();
      } else if (this.guessed) {
        this.incorrectGuesses += 1;
        this.guessed = false;
      }
      this.displayVerse(this.currentVerse);
    }

  }

  removeStartEventListeners() {
    this.canvas.removeEventListener('click', this.start);
    this.pageLayout.removeEventListener('keypress', this.start);
  }

  useHint() {
    this.hintsUsed += 1;
    console.log('hint used');
    
  }

  start() {
    this.removeStartEventListeners();
    this.input.addEventListener('keypress', this.checkInputWithHiddenWord);
    
    this.currentVerse = _verses__WEBPACK_IMPORTED_MODULE_0__.default[this.level];
    this.hideVerse();
    this.render();
  }

  restart() {
    this.level = 1;
    this.guessedCorrectly = false;
    this.guessed = false;
    this.incorrectGuesses = 0;
    this.correctGuesses = 0;
    this.start();
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Game);

/***/ }),

/***/ "./public/javascripts/index.js":
/*!*************************************!*\
  !*** ./public/javascripts/index.js ***!
  \*************************************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./public/javascripts/game.js");
/* harmony import */ var _canvas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./canvas */ "./public/javascripts/canvas.js");
;


document.addEventListener('DOMContentLoaded', () => {
    let canvas = document.getElementById('word-canvas');
    let ctx = canvas.getContext('2d');
    (0,_canvas__WEBPACK_IMPORTED_MODULE_1__.setupCanvas)(canvas);
    
    let pageLayout = document.getElementById('page-layout');
    const input = document.getElementById('word-input');
    
    // create a new game
    const game = new _game__WEBPACK_IMPORTED_MODULE_0__.default(ctx, canvas, input, pageLayout);
    
    // buttons
    let restartButton = document.getElementById('restart-button');
    restartButton.addEventListener('click', game.restart);
    let hintButton = document.getElementById('hint-button');
    hintButton.addEventListener('click', game.useHint);
    
    // allow user to click or press any key to start game
    canvas.addEventListener('click', game.start);
    pageLayout.addEventListener('keypress', game.start);
});

/***/ }),

/***/ "./public/javascripts/verses.js":
/*!**************************************!*\
  !*** ./public/javascripts/verses.js ***!
  \**************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
const verses = {
  1 : 'In the beginning God created the heavens and the earth.',
  2 : 'In the beginning was the Word, and the Word was with God, and the Word was God.',
  3 : 'So God created mankind in his own image, in the image of God he created them; male and female he created them.',
  4 : 'He has shown you, O mortal, what is good. And what does the LORD require of you? To act justly and to love mercy and to walk humbly with your God.',
  5 : 'The fear of the LORD is the beginning of knowledge, but fools despise wisdom and instruction.',
  6 : 'The heart is deceitful above all things and beyond cure. Who can understand it?',
  7 : 'But seek first his kingdom and his righteousness, and all these things will be given to you as well.',
  8 : "Now faith is confidence in what we hope for and assurance about what we do not see. By faith we understand that the universe was formed at God's command, so that what is seen was not made out of what was visible.",
  9 : 'Then you will know the truth, and the truth will set you free.',
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (verses);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./public/javascripts/index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=bundle.js.map