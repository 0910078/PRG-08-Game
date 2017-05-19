/// <reference path="gameObject.ts" />


class Arrow extends GameObject{

    private shootingSpeed: number;

    constructor(x:number,y:number,s:number){
        super(x,y);

        this.shootingSpeed = s;
    }
}