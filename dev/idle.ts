class Idle implements PlayerState{
    player:Player;

    constructor(p:Player){
        this.player = p;
    }

    action(){
        
    }

    onFire(){
        this.player.state = new Firing(this.player);
    }

    onMoveLeft(){
        this.player.state = new MoveLeft(this.player);
    }

    onMoveRight(){
        this.player.state = new MoveRight(this.player);
    }

    //handle user input for the player
    onKeyUp(e:KeyboardEvent){

    }
}