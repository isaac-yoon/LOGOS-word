const axios = require('axios');

document.addEventListener('DOMContentLoaded', () => {
    let canvas = document.getElementById('word-canvas');
    let gameLayout = document.getElementById('page-layout');

    const input = document.getElementById('word-input');
    // const game = new Game(ctx, canvas, input, gameLayout);
    
    canvas.addEventListener('click', game.startGame);
    gameLayout.addEventListener('keypress', game.startGame);

});