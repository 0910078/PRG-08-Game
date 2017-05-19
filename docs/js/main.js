var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameObject = (function () {
    function GameObject(x, y) {
        this.x = x;
        this.y = y;
    }
    GameObject.prototype.draw = function () {
    };
    return GameObject;
}());
var Arrow = (function (_super) {
    __extends(Arrow, _super);
    function Arrow(x, y, s) {
        _super.call(this, x, y);
        this.shootingSpeed = s;
    }
    return Arrow;
}(GameObject));
var Castle = (function (_super) {
    __extends(Castle, _super);
    function Castle(x, y) {
        _super.call(this, x, y);
        var container = document.getElementById("container");
        this.div = document.createElement("castle");
        container.appendChild(this.div);
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
    }
    return Castle;
}(GameObject));
var Entity = (function (_super) {
    __extends(Entity, _super);
    function Entity(x, y) {
        _super.call(this, x, y);
    }
    return Entity;
}(GameObject));
var Enemy = (function (_super) {
    __extends(Enemy, _super);
    function Enemy() {
        _super.apply(this, arguments);
    }
    return Enemy;
}(Entity));
var Firing = (function () {
    function Firing(p) {
        this.player = p;
    }
    Firing.prototype.action = function () {
        this.player.arrows.push(new Arrow(this.player.x, this.player.y, this.player.
            shootingSpeed));
    };
    Firing.prototype.onFire = function () {
    };
    Firing.prototype.onMoveLeft = function () {
    };
    Firing.prototype.onMoveRight = function () {
    };
    return Firing;
}());
var Game = (function () {
    function Game() {
        var _this = this;
        Game.gameWidth = 800;
        Game.gameHeigt = 600;
        this.castle = new Castle(0, 536);
        this.playerHeight = 32;
        this.playerWidth = 32;
        this.playerX = Game.gameWidth / 2 - this.playerWidth / 2;
        this.playerY = Game.gameHeigt - this.playerHeight;
        this.player = new Player(this.playerX, this.playerY);
        this.enemy = new Enemy(0, 0);
        console.log("de game is gestart!");
        requestAnimationFrame(function () { return _this.gameLoop(); });
    }
    Game.getInstance = function () {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    };
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.player.update();
        this.player.draw();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    return Game;
}());
window.addEventListener("load", function () {
    Game.getInstance();
});
var Idle = (function () {
    function Idle(p) {
        this.player = p;
    }
    Idle.prototype.action = function () {
    };
    Idle.prototype.onFire = function () {
        this.player.state = new Firing(this.player);
    };
    Idle.prototype.onMoveLeft = function () {
        this.player.state = new MoveLeft(this.player);
    };
    Idle.prototype.onMoveRight = function () {
        this.player.state = new MoveRight(this.player);
    };
    return Idle;
}());
var MoveLeft = (function () {
    function MoveLeft(p) {
        this.player = p;
    }
    MoveLeft.prototype.action = function () {
        this.player.x -= this.player.speed;
    };
    MoveLeft.prototype.onFire = function () {
    };
    MoveLeft.prototype.onMoveLeft = function () {
        this.player.state = new MoveRight(this.player);
    };
    MoveLeft.prototype.onMoveRight = function () {
    };
    return MoveLeft;
}());
var MoveRight = (function () {
    function MoveRight(p) {
        this.player = p;
    }
    MoveRight.prototype.action = function () {
        this.player.x += this.player.speed;
    };
    MoveRight.prototype.onFire = function () {
    };
    MoveRight.prototype.onMoveLeft = function () {
        this.player.state = new MoveLeft(this.player);
    };
    MoveRight.prototype.onMoveRight = function () {
    };
    return MoveRight;
}());
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(x, y) {
        var _this = this;
        _super.call(this, x, y);
        this.speed = 5;
        var container = document.getElementById("container");
        this.div = document.createElement("player");
        container.appendChild(this.div);
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
        this.state = new Idle(this);
    }
    Player.prototype.onKeyDown = function (e) {
        if (e.keyCode == 37) {
            this.state = new MoveLeft(this);
        }
        else if (e.keyCode == 39) {
            this.state = new MoveRight(this);
        }
    };
    Player.prototype.onKeyUp = function (e) {
        if (e.keyCode == 37) {
            this.state = new Idle(this);
        }
        else if (e.keyCode == 39) {
            this.state = new Idle(this);
        }
    };
    Player.prototype.update = function () {
        this.state.action();
    };
    Player.prototype.draw = function () {
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
    };
    return Player;
}(Entity));
//# sourceMappingURL=main.js.map