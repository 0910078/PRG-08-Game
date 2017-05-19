class MoveLeft implements PlayerState{
    player:Player;
    timer: number;
    cooldown: number;

    constructor(p:Player){
        this.player = p;
        this.cooldown = 4;
        this.timer = 2;
    }

    //move to the left
    action(){
        //check if player is not too far to the left
        if (this.player.x > 32){
            this.player.x -= this.player.speed;
        }
    }

    //fire an arrow
    onFire(){
        this.timer++;

        if (this.timer >= this.cooldown){
            //reset timer
            this.timer = 0;

            //create a new arrow
            this.player.arrows.push(
                new Arrow(
                    this.player.x + this.player.width / 2 - 2,
                    this.player.y - this.player.height,
                    this.player.shootingSpeed
                )
            );
        }
    }

    onMoveLeft(){
        
    }

    //Set playerstate to moveright
    onMoveRight(){
        this.player.state = new MoveRight(this.player);
    }

    //handle user input for the player
    onKeyUp(e:KeyboardEvent){
        if(e.keyCode === 37){
            this.player.state = new Idle(this.player);
        }
    }
}