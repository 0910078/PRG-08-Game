/// <reference path="arrow.ts" />


class Game {
    public static instance:Game;
    private static gameWidth: number;
    private static gameHeigt: number;

    private player : Player;
    private playerX: number;
    private playerY: number;
    private playerHeight: number;
    private playerWidth: number;

    private enemy : Enemy;
    private castle : Castle;

    public constructor() {
        Game.gameWidth = 800;
        Game.gameHeigt = 600;

        this.castle = new Castle(0,536);

        this.playerHeight = 32;
        this.playerWidth = 32;

        this.playerX = Game.gameWidth / 2 - this.playerWidth / 2;
        this.playerY = Game.gameHeigt - this.playerHeight; 
        this.player = new Player(this.playerX,this.playerY);

        this.enemy = new Enemy(0,0);

        console.log("de game is gestart!");

        requestAnimationFrame(() => this.gameLoop());
    }

    public static getInstance(){
        if(!Game.instance){
            Game.instance = new Game();
        }
        return Game.instance;
    }

    private gameLoop(){
        this.player.update();
        this.player.draw();

        requestAnimationFrame(() => this.gameLoop());

        for(let i = 0; i < this.player.arrows.length; i++){
            this.player.arrows[i].update();
            this.player.arrows[i].draw();
        }
    }
} 

//load
window.addEventListener("load", function() {
    Game.getInstance();
});