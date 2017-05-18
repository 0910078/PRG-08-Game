/// <reference path="entity.ts" />

class Player extends Entity {
    constructor(x:number,y:number){
        super(x,y);

        let container: HTMLElement = document.getElementById("container");

        this.div = document.createElement("player");
        container.appendChild(this.div);
    }
}