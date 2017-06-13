/// <reference path="entity.ts" />
/// <reference path="observer.ts" />


class Enemy extends Entity implements Observer{

    private atktimer:number;
    private game:Game;

    constructor(x:number,y:number){
        super(x,y);

        this.width = 32;
        this.height = 32;

        this.speed = 2;
        this.damage = 5;
        this.health = 50;

        this.atktimer = 0;
        this.game = Game.getInstance();
        this.game.player.subscribe(this);

        this.x = Math.floor((Math.random() * 732) + 32);
        this.y = -32;

        let container: HTMLElement = document.getElementById("container");

        this.div = document.createElement("blackknight");
        container.appendChild(this.div);

        this.div.style.transform = "translate("+this.x+"px,"+this.y+"px)";
    }

    update(){
        //walk towards the castle
        if (this.y < 534){
            this.y += this.speed;
        }

        else{
            this.attack();
        }
    }

    draw(){
        this.div.style.transform = "translate("+this.x+"px,"+this.y+"px)";
    }

    attack(){
        //damage the castle
        this.atktimer = this.atktimer + 1;
        if (this.atktimer > 60){
            //damage the castle
            this.game.castle.takeDamage(this.damage);

            //increase damage everytime you hit
            this.damage += 1;

            //reset the timer
            this.atktimer = 0;
        }
    }

    notify(poweruptype: String){
        if (poweruptype == "freeze"){
                for(let i = 0; i < this.game.enemies.length; i++){
                    this.game.enemies[i].speed = 0;
                }
        }
        if (poweruptype == "nuke"){
                for(let i = 0; i < this.game.enemies.length; i++){
                    this.game.enemies[i].health -= 50;
                }
        }
    }
}