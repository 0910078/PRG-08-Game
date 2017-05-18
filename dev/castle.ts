/// <reference path="gameObject.ts" />

class Castle extends GameObject{
    constructor(x:number,y:number){
        super(x,y);

        let container: HTMLElement = document.getElementById("container");

        this.div = document.createElement("castle");
        container.appendChild(this.div);

        this.div.style.transform = "translate("+this.x+"px,"+this.y+"px)";
    }
}