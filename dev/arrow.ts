/// <reference path="gameObject.ts" />


class Arrow extends GameObject{

    public shootingSpeed: number;

    constructor(x:number,y:number,s:number){
        super(x,y);

        this.x = x;
        this.y = y;

        this.shootingSpeed = s;

        let container: HTMLElement = document.getElementById("container");

        this.div = document.createElement("arrow");
        container.appendChild(this.div);

        this.div.style.transform = "translate("+this.x+"px,"+this.y+"px)";
    }

    //update the position of the arrow
    update(){
        this.y -= this.shootingSpeed;
    }

    //update the position in the game
    public draw(){
        this.div.style.transform = "translate("+this.x+"px,"+this.y+"px)";
    }
}