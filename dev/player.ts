/// <reference path="enum.ts" />
/// <reference path="entity.ts" />
/// <reference path="observable.ts" />


class Player extends Entity implements Subject {

    private observers:Array<Observer>;

    public state:PlayerState;
    public stateName: number;
    public shootingSpeed: number;
    public arrows: Array<Arrow>;

    public callback: EventListener;

    constructor(x:number,y:number){
        super(x,y);
        this.speed = 5;
        this.shootingSpeed = 10;
        this.arrows = [];
        this.damage = 10;

        this.observers = new Array<Observer>();

        this.width = 32;
        this.height = 32;

        let container: HTMLElement = document.getElementById("container");

        this.div = document.createElement("player");
        container.appendChild(this.div);

        //add event listeners for moving and shooting
        this.callback = (e:KeyboardEvent) => this.onKeyDown(e);
        window.addEventListener("keydown", this.callback);
        window.addEventListener("keyup", (e:KeyboardEvent) => this.onKeyUp(e));

        //set player state to default
        this.state = new Idle(this);
    }

    subscribe(object:Observer){
        this.observers.push(object);
    }

    sendNotification(poweruptype:String){
        for (let o of this.observers){
            let p = poweruptype;
            o.notify(p);
        }
    }

    //handle user input for the player
    onKeyDown(e:KeyboardEvent){
        if(e.keyCode === Key.LEFT && this.stateName != State.MOVINGLEFT){
            this.state = new MoveLeft(this);
            this.stateName = State.MOVINGLEFT;
        }
        if(e.keyCode === Key.RIGHT && this.stateName != State.MOVINGRIGHT){
            this.state = new MoveRight(this);
            this.stateName = State.MOVINGRIGHT;
        }
        if(e.keyCode === Key.SPACE && this.stateName != State.FIRING){
            this.state = new Firing(this);
            this.stateName = State.FIRING;
        }
    }

    onKeyUp(e:KeyboardEvent){
        this.state = new Idle(this);
        this.stateName = State.IDLE;
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