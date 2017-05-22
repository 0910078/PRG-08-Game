/// <reference path="entity.ts" />

class Enemy extends Entity{

    constructor(x:number,y:number){
        super(x,y);

        this.speed = 2;
        this.damage = 5;
        this.health = 50;

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
    }
}