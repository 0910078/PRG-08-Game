class MoveLeft implements PlayerState{
    player:Player;

    constructor(p:Player){
        this.player = p;
    }

    action(){
        //Move to the left
        this.player.x -= this.player.speed;
    }

    onFire(){
        //fire with an arrow
    }

    onMoveLeft(){
        //Set playerstate to moveright
        this.player.state = new MoveRight(this.player);
    }

    onMoveRight(){
        
    }
}