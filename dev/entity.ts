/// <reference path="gameObject.ts" />

abstract class Entity extends GameObject {

    health:number;
    speed:number;
    damage:number;

    constructor(x:number,y:number){
        super(x,y);
    }
}