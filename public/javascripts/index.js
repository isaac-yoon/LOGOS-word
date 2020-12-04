import Game from './game';

document.addEventListener('DOMContentLoaded', () => {
    let canvas = document.getElementById('word-canvas');
    let ctx = canvas.getContext('2d');
    let pageLayout = document.getElementById('page-layout');

    const input = document.getElementById('word-input');
    // create a new game
    const game = new Game(ctx, canvas, input, pageLayout);

    // allow user to click or press any key to start game
    canvas.addEventListener('click', game.start);
    pageLayout.addEventListener('keypress', game.start);
});