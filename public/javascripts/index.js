import Game from './game';
import { setupCanvas } from './canvas';
import { addModalListeners } from './modal';

document.addEventListener('DOMContentLoaded', () => {
    let canvas = document.getElementById('word-canvas');
    let ctx = canvas.getContext('2d');
    setupCanvas(canvas);
    
    let pageLayout = document.getElementById('page-layout');
    const input = document.getElementById('word-input');
    
    // create a new game
    const game = new Game(ctx, canvas, input, pageLayout);
    
    // modals
    addModalListeners();

    // buttons
    const restartButton = document.getElementById('restart-button');
    restartButton.addEventListener('click', game.restart);

    // allow user to click or press any key to start game
    canvas.addEventListener('click', game.start);
    pageLayout.addEventListener('keypress', game.start);
});