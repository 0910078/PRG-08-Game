class Idle implements PlayerState{
    player:Player;

    constructor(p:Player){
        this.player = p;
    }

    //player won't move
    public action(){

    }
}