class Firing implements PlayerState{
    player:Player;
    cooldown: number;
    timer: number;
    width: number;
    height: number;

    constructor(p:Player){
        this.player = p;
        this.cooldown = 10;
        this.timer = 5;

        this.width = 8;
        this.height = 32;
    }

    public action(){
        this.timer++;

        if (this.timer >= this.cooldown){
            //reset timer
            this.timer = 0;

            //create a new arrow
            this.player.arrows.push(
                new Arrow(
                    this.player.x + this.player.width / 2 - this.width / 2,
                    this.player.y - this.player.height,
                    this.player.shootingSpeed
                )
            );
        }
    }
}