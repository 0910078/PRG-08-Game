class MoveRight implements PlayerState{
    player:Player;

    constructor(p:Player){
        this.player = p;
    }

    action(){
        //Move to the right
        this.player.x += this.player.speed;
    }

    onFire(){
        //fire an arrow
    }

    onMoveLeft(){
        //set player state to moveleft
        this.player.state = new MoveLeft(this.player);
    }

    onMoveRight(){
        
    }
}