/// <reference path="gameObject.ts" />

class Entity extends GameObject {

    health:number;
    speed:number;
    damage:number;

    constructor(x:number,y:number){
        super(x,y);
    }
}