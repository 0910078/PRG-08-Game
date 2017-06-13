/// <reference path="gameObject.ts" />

class Healthbar extends GameObject{
    public health:number;

    constructor(x:number,y:number){
        super(x,y);

        let container: HTMLElement = document.getElementById("container");

        this.div = document.createElement("healthbar");
        container.appendChild(this.div);

        this.div.style.transform = "translate("+this.x+"px,"+this.y+"px)";
    }

    public adjustsize(h:number){
        this.div.style.width = h+"px";
    }
}