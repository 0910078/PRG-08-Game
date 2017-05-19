/// <reference path="entity.ts" />

class Player extends Entity {

    public speed:number;
    public state:PlayerState;
    public damage: number;
    public shootingSpeed: number;
    public arrows: Array<Arrow>;

    constructor(x:number,y:number){
        super(x,y);
        this.speed = 5;

        let container: HTMLElement = document.getElementById("container");

        this.div = document.createElement("player");
        container.appendChild(this.div);

        //add event listeners for moving and shooting
        window.addEventListener("keydown", (e:KeyboardEvent) => this.onKeyDown(e));
        window.addEventListener("keyup", (e:KeyboardEvent) => this.onKeyUp(e));

        //set player state to default
        this.state = new Idle(this);
    }

    //handle user input for the player
    onKeyDown(e:KeyboardEvent){
        if(e.keyCode == 37){
            this.state = new MoveLeft(this);
        }
        else if(e.keyCode == 39){
            this.state = new MoveRight(this);
        }
    }

    //handle user input for the player
    onKeyUp(e:KeyboardEvent){
        if(e.keyCode == 37){
            this.state = new Idle(this);
        }
        else if(e.keyCode == 39){
            this.state = new Idle(this);
        }
    }

    //update player behaviour
    update(){
        this.state.action();
    }

    //update the position
    public draw(){
        this.div.style.transform = "translate("+this.x+"px,"+this.y+"px)";
    }
}