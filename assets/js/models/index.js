const gameOverImage = new Image();
gameOverImage.src = '/assets/images/bgs/gameover.png';

window.gameOverImage = gameOverImage;

document.addEventListener('DOMContentLoaded', () => {
    const game = new Game('main-canvas');
    const startButton = document.getElementById('startButton');
        if(startButton) {
            startButton.addEventListener('click', () => {
                game.start();
                startButton.style.display = 'none';
            });
        }
    
});
