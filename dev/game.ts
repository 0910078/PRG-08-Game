/// <reference path="arrow.ts" />
/// <reference path="enemy.ts" />
/// <reference path="util.ts" />
/// <reference path="healthbar.ts" />
/// <reference path="powerup.ts" />


class Game {
    public static instance:Game;
    private static gameWidth: number;
    private static gameHeigt: number;

    public player : Player;
    private playerX: number;
    private playerY: number;
    private playerHeight: number;
    private playerWidth: number;

    public enemies : Array<Enemy>;
    private spawnTimer: number;
    private spawnCooldown: number;
    private powerup: GameObject;
    private lastpowerup: String;

    public castle : Castle;
    public healthbar: Healthbar;

    public constructor() {
        Game.gameWidth = 800;
        Game.gameHeigt = 600;

        this.spawnTimer = 0;
        this.spawnCooldown = 300;
        this.lastpowerup = "freeze";

        this.castle = new Castle(0,536);
        this.healthbar = new Healthbar(0,0);

        this.playerHeight = 32;
        this.playerWidth = 32;

        this.playerX = Game.gameWidth / 2 - this.playerWidth / 2;
        this.playerY = Game.gameHeigt - this.playerHeight; 
        this.player = new Player(this.playerX,this.playerY);

        this.enemies = [];

        requestAnimationFrame(() => this.gameLoop());
    }

    public static getInstance(){
        if(!Game.instance){
            Game.instance = new Game();
        }
        return Game.instance;
    }

    private gameLoop(){
        this.healthbar.adjustsize(this.castle.health);

        //check if the player has lost
        if (this.castle.checkHealth() < 1){
            this.gameOver();
        }

        //update player position and behaviour
        this.player.update();
        this.player.draw();

        this.spawnTimer++;

        if(this.powerup){
            this.powerup.update();
            this.powerup.draw();
        }

        //update the position for the arrows
        for(let i = 0; i < this.player.arrows.length; i++){
            this.player.arrows[i].update();
            this.player.arrows[i].draw();

            //check if arrow is out of the screen
            if(this.player.arrows[i].y < -32){
                //remove the arrow
                this.player.arrows[i].div.remove();
                let s : number = this.player.arrows.indexOf(this.player.arrows[i]);
                if(i != -1){
                    this.player.arrows.splice(s,1);
                }
            }

            for(let n = 0; n < this.enemies.length; n++){
                let obj1 = this.player.arrows[i];
                let obj2 = this.enemies[n];

                //check if the arrow still exists
                if (obj1 != null && obj2 != null){
                    if (Util.checkCollision(obj1,obj2)){
                        this.enemies[n].health -= this.player.damage;

                        //remove the arrow
                        this.player.arrows[i].div.remove();
                        let s : number = this.player.arrows.indexOf(this.player.arrows[i]);
                        if(i != -1){
                            this.player.arrows.splice(s,1);
                        }
                    }
                }
            }
            
        }

        //update the position of the enemies
        for(let i = 0; i < this.enemies.length; i++){
            
            this.enemies[i].update();
            this.enemies[i].draw();

            if (this.enemies[i].health < 1){
                this.enemies[i].div.remove();
                let e : number = this.enemies.indexOf(this.enemies[i]);
                if(i != -1){
                    this.enemies.splice(e,1);
                }
            }
        }

        //spawn an enemy if timer is above the cooldown delay
        if (this.spawnTimer % this.spawnCooldown == 0)   {
            this.enemies.push(
                new Enemy(0,0)
            );
            if (this.spawnCooldown > 150){
                this.spawnCooldown = this.spawnCooldown - 5;
            }
        }

        //spawn a powerup
        if(this.spawnTimer % 1200 == 0){
            if (this.lastpowerup == "freeze"){
                this.powerup = new PowerUp.Nuke(400,0);
                this.lastpowerup = "nuke";
                console.log(this.lastpowerup);
            }
            else{
                this.powerup = new PowerUp.Freeze(400,0);
                this.lastpowerup = "freeze";
            }
        }

        if(this.powerup != null){
            //handle powerup
            if (Util.checkCollision(this.player, this.powerup)){
                this.player.sendNotification(this.lastpowerup);
                this.powerup.div.remove();
                this.powerup = null;
            }
        }

        requestAnimationFrame(() => this.gameLoop());
    }

    public gameOver(){
        let g = Game.instance;
        g = null;
    }
} 

//load
window.addEventListener("load", function() {
    let btn = document.getElementById("startbutton");
    TweenLite.to(btn, 3, {x:0,y:300, ease:Bounce.easeOut})

    btn.addEventListener("click", function(){
        Game.getInstance();
        btn.remove();
    })
});