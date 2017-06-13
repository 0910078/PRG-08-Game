namespace PowerUp   {
    export class Nuke extends GameObject{
        constructor(x:number,y:number){
            super(x,y);
            let random = Math.floor((Math.random() * 700) + 50);
            this.x = random;

            this.width = 32;
            this.height = 32;

            let container: HTMLElement = document.getElementById("container");
            this.div = document.createElement("nuke");
            container.appendChild(this.div);

            this.div.style.transform = "translate("+this.x+"px,"+this.y+"px)";
        }

        draw(){
            this.div.style.transform = "translate("+this.x+"px,"+this.y+"px)";
        }

        update(){
            this.y += 3;
            if (this.y > 600){
                this.div.remove();
            }
        }
    }
    export class Freeze extends GameObject{
        constructor(x:number,y:number){
            super(x,y);
            let random = Math.floor((Math.random() * 700) + 50);
            this.x = random;

            this.width = 32;
            this.height = 32;

            let container: HTMLElement = document.getElementById("container");
            this.div = document.createElement("freeze");
            container.appendChild(this.div);

            this.div.style.transform = "translate("+this.x+"px,"+this.y+"px)";
        }

        draw(){
            this.div.style.transform = "translate("+this.x+"px,"+this.y+"px)";
        }

        update(){
            this.y += 3;
            if (this.y > 600){
                this.div.remove();
            }
        }
    }
}