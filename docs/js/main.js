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
    GameObject.prototype.update = function () {
    };
    return GameObject;
}());
var Arrow = (function (_super) {
    __extends(Arrow, _super);
    function Arrow(x, y, s) {
        _super.call(this, x, y);
        this.x = x;
        this.y = y;
        this.width = 4;
        this.height = 32;
        this.shootingSpeed = s;
        var container = document.getElementById("container");
        this.div = document.createElement("arrow");
        container.appendChild(this.div);
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
    }
    Arrow.prototype.update = function () {
        this.y -= this.shootingSpeed;
    };
    Arrow.prototype.draw = function () {
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
    };
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
    function Enemy(x, y) {
        _super.call(this, x, y);
        this.width = 32;
        this.height = 32;
        this.speed = 2;
        this.damage = 5;
        this.health = 50;
        this.x = Math.floor((Math.random() * 732) + 32);
        this.y = -32;
        var container = document.getElementById("container");
        this.div = document.createElement("blackknight");
        container.appendChild(this.div);
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
    }
    Enemy.prototype.update = function () {
        if (this.y < 534) {
            this.y += this.speed;
        }
        else {
            this.attack();
        }
    };
    Enemy.prototype.draw = function () {
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
    };
    Enemy.prototype.attack = function () {
    };
    return Enemy;
}(Entity));
var Firing = (function () {
    function Firing(p) {
        this.player = p;
        this.cooldown = 10;
        this.timer = 5;
        this.width = 8;
        this.height = 32;
    }
    Firing.prototype.action = function () {
        this.timer++;
        if (this.timer >= this.cooldown) {
            this.timer = 0;
            this.player.arrows.push(new Arrow(this.player.x + this.player.width / 2 - this.width / 2, this.player.y - this.player.height, this.player.shootingSpeed));
        }
    };
    Firing.prototype.onFire = function () {
    };
    Firing.prototype.onMoveLeft = function () {
        if (this.player.x > 32) {
            this.player.x -= this.player.speed * 2;
        }
    };
    Firing.prototype.onMoveRight = function () {
        if (this.player.x < 736) {
            this.player.x += this.player.speed * 2;
        }
    };
    Firing.prototype.onKeyUp = function (e) {
        if (e.keyCode === 32) {
            this.player.state = new Idle(this.player);
        }
    };
    return Firing;
}());
var Util = (function () {
    function Util() {
    }
    Util.checkCollision = function (obj1, obj2) {
        return (obj1.x < obj2.x + obj2.width &&
            obj1.x + obj1.width > obj2.x &&
            obj1.y < obj2.y + obj2.height &&
            obj1.height + obj1.y > obj2.y);
    };
    return Util;
}());
var Game = (function () {
    function Game() {
        var _this = this;
        Game.gameWidth = 800;
        Game.gameHeigt = 600;
        this.spawnTimer = 0;
        this.spawnCooldown = 300;
        this.castle = new Castle(0, 536);
        this.playerHeight = 32;
        this.playerWidth = 32;
        this.playerX = Game.gameWidth / 2 - this.playerWidth / 2;
        this.playerY = Game.gameHeigt - this.playerHeight;
        this.player = new Player(this.playerX, this.playerY);
        this.enemies = [];
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
        this.spawnTimer++;
        for (var i = 0; i < this.player.arrows.length; i++) {
            this.player.arrows[i].update();
            this.player.arrows[i].draw();
            if (this.player.arrows[i].y < -32) {
                this.player.arrows[i].div.remove();
                var s = this.player.arrows.indexOf(this.player.arrows[i]);
                if (i != -1) {
                    this.player.arrows.splice(s, 1);
                }
            }
            for (var n = 0; n < this.enemies.length; n++) {
                var obj1 = this.player.arrows[i];
                var obj2 = this.enemies[n];
                if (obj1 != null && obj2 != null) {
                    if (Util.checkCollision(obj1, obj2)) {
                        this.enemies[n].health -= this.player.damage;
                        if (this.enemies[n].health < 1) {
                            this.enemies[n].div.remove();
                            var e = this.enemies.indexOf(this.enemies[n]);
                            if (i != -1) {
                                this.enemies.splice(e, 1);
                            }
                        }
                        this.player.arrows[i].div.remove();
                        var s = this.player.arrows.indexOf(this.player.arrows[i]);
                        if (i != -1) {
                            this.player.arrows.splice(s, 1);
                        }
                    }
                }
            }
        }
        for (var i = 0; i < this.enemies.length; i++) {
            this.enemies[i].update();
            this.enemies[i].draw();
        }
        if (this.spawnTimer > this.spawnCooldown) {
            this.enemies.push(new Enemy(0, 0));
            this.spawnTimer = 0;
        }
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
    Idle.prototype.onKeyUp = function (e) {
    };
    return Idle;
}());
var MoveLeft = (function () {
    function MoveLeft(p) {
        this.player = p;
        this.cooldown = 4;
        this.timer = 2;
    }
    MoveLeft.prototype.action = function () {
        if (this.player.x > 32) {
            this.player.x -= this.player.speed;
        }
    };
    MoveLeft.prototype.onFire = function () {
        this.timer++;
        if (this.timer >= this.cooldown) {
            this.timer = 0;
            this.player.arrows.push(new Arrow(this.player.x + this.player.width / 2 - 2, this.player.y - this.player.height, this.player.shootingSpeed));
        }
    };
    MoveLeft.prototype.onMoveLeft = function () {
    };
    MoveLeft.prototype.onMoveRight = function () {
        this.player.state = new MoveRight(this.player);
    };
    MoveLeft.prototype.onKeyUp = function (e) {
        if (e.keyCode === 37) {
            this.player.state = new Idle(this.player);
        }
    };
    return MoveLeft;
}());
var MoveRight = (function () {
    function MoveRight(p) {
        this.player = p;
        this.cooldown = 4;
        this.timer = 2;
    }
    MoveRight.prototype.action = function () {
        if (this.player.x < 736) {
            this.player.x += this.player.speed;
        }
    };
    MoveRight.prototype.onFire = function () {
        this.timer++;
        if (this.timer >= this.cooldown) {
            this.timer = 0;
            this.player.arrows.push(new Arrow(this.player.x + this.player.width / 2 - 2, this.player.y - this.player.height, this.player.shootingSpeed));
        }
    };
    MoveRight.prototype.onMoveLeft = function () {
        this.player.state = new MoveLeft(this.player);
    };
    MoveRight.prototype.onMoveRight = function () {
    };
    MoveRight.prototype.onKeyUp = function (e) {
        if (e.keyCode === 39) {
            this.player.state = new Idle(this.player);
        }
    };
    return MoveRight;
}());
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(x, y) {
        var _this = this;
        _super.call(this, x, y);
        this.speed = 5;
        this.shootingSpeed = 10;
        this.arrows = [];
        this.damage = 10;
        this.width = 32;
        this.height = 32;
        var container = document.getElementById("container");
        this.div = document.createElement("player");
        container.appendChild(this.div);
        this.callback = function (e) { return _this.onKeyDown(e); };
        window.addEventListener("keydown", this.callback);
        window.addEventListener("keyup", function (e) { return _this.state.onKeyUp(e); });
        this.state = new Idle(this);
    }
    Player.prototype.onKeyDown = function (e) {
        if (e.keyCode === 37) {
            this.state.onMoveLeft();
        }
        if (e.keyCode === 39) {
            this.state.onMoveRight();
        }
        if (e.keyCode === 32) {
            this.state.onFire();
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