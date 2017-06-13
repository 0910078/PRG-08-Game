class MoveRight implements PlayerState{
    player:Player;

    constructor(p:Player){
        this.player = p;
    }

    //move to the right
    public action(){
        //check if player is not too far to the right
        if (this.player.x < 736){
            this.player.x += this.player.speed;
        }
    }
}