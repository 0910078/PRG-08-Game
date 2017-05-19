class Firing implements PlayerState{
    player:Player;

    constructor(p:Player){
        this.player = p;
    }

    action(){
        //create a new arrow
        this.player.arrows.push(
            new Arrow(
                this.player.x,
                this.player.y,this.player.
                shootingSpeed
            )
        );
    }

    onFire(){

    }

    onMoveLeft(){

    }

    onMoveRight(){
        
    }
}