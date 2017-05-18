class Game {
    public static instance:Game;
    private player : Player;
    private enemy : Enemy;
    private castle : Castle;

    public constructor() {
        this.player = new Player(0,0);
        this.enemy = new Enemy(0,0);
        this.castle = new Castle(0,536);

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
        requestAnimationFrame(() => this.gameLoop());
    }
} 

//load
window.addEventListener("load", function() {
    Game.getInstance();
});