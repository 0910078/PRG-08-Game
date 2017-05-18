class Game {

    private player : Player;
    private enemy : Enemy;

    constructor() {
        this.player = new Player();
        this.enemy = new Enemy();
        
        requestAnimationFrame(() => this.gameLoop());
    }

    gameLoop(){
        requestAnimationFrame(() => this.gameLoop());
    }
} 

//load
window.addEventListener("load", function() {
    let g:Game = new Game();
});