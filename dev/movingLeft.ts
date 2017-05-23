class MoveLeft implements PlayerState{
    player:Player;

    constructor(p:Player){
        this.player = p;
    }

    //move to the left
    public action(){
        // check if player is not too far to the left
        if (this.player.x > 32){
            this.player.x -= this.player.speed;
        }
    }
}