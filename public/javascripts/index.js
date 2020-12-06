import Game from './game';
import {
    setupCanvas,
} from './canvas';

document.addEventListener('DOMContentLoaded', () => {
    let canvas = document.getElementById('word-canvas');
    let ctx = canvas.getContext('2d');
    setupCanvas(canvas);

    let pageLayout = document.getElementById('page-layout');
    const input = document.getElementById('word-input');

    // create a new game
    const game = new Game(ctx, canvas, input, pageLayout);

    // allow user to click or press any key to start game
    canvas.addEventListener('click', game.start);
    pageLayout.addEventListener('keypress', game.start);
});