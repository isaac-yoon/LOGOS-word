/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
;

document.addEventListener('DOMContentLoaded', () => {
    let canvas = document.getElementById('word-canvas');
    let ctx = canvas.getContext('2d');
    let pageLayout = document.getElementById('page-layout');

    const input = document.getElementById('word-input');
    // create a new game
    const game = new _game__WEBPACK_IMPORTED_MODULE_0__.default(ctx, canvas, input, pageLayout);

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
  2 : 'In the beginning was the Word, and the Word was with God, and the Word was God',
};

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