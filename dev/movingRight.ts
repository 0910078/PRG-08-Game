class MoveRight implements PlayerState{
    player:Player;
    timer: number;
    cooldown: number;

    constructor(p:Player){
        this.player = p;
        this.cooldown = 4;
        this.timer = 2;
    }

    //move to the right
    action(){
        //check if player is not too far to the right
        if (this.player.x < 736){
            this.player.x += this.player.speed;
        }
    }

    onFire(){
        //fire an arrow
        this.timer++;
        console.log(this.timer);

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
        //set player state to moveleft
        this.player.state = new MoveLeft(this.player);
    }

    onMoveRight(){
        
    }

    //handle user input for the player
    onKeyUp(e:KeyboardEvent){
        if(e.keyCode === 39){
            this.player.state = new Idle(this.player);
        }
    }
}