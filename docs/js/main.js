var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
        var _this = _super.call(this, x, y) || this;
        _this.x = x;
        _this.y = y;
        _this.width = 4;
        _this.height = 32;
        _this.shootingSpeed = s;
        var container = document.getElementById("container");
        _this.div = document.createElement("arrow");
        container.appendChild(_this.div);
        _this.div.style.transform = "translate(" + _this.x + "px," + _this.y + "px)";
        return _this;
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
        var _this = _super.call(this, x, y) || this;
        _this.health = 250;
        var container = document.getElementById("container");
        _this.div = document.createElement("castle");
        container.appendChild(_this.div);
        _this.div.style.transform = "translate(" + _this.x + "px," + _this.y + "px)";
        return _this;
    }
    Castle.prototype.takeDamage = function (d) {
        this.health -= d;
    };
    Castle.prototype.checkHealth = function () {
        return this.health;
    };
    return Castle;
}(GameObject));
var Entity = (function (_super) {
    __extends(Entity, _super);
    function Entity(x, y) {
        return _super.call(this, x, y) || this;
    }
    return Entity;
}(GameObject));
var Enemy = (function (_super) {
    __extends(Enemy, _super);
    function Enemy(x, y) {
        var _this = _super.call(this, x, y) || this;
        _this.width = 32;
        _this.height = 32;
        _this.speed = 2;
        _this.damage = 5;
        _this.health = 50;
        _this.atktimer = 0;
        _this.game = Game.getInstance();
        _this.game.player.subscribe(_this);
        _this.x = Math.floor((Math.random() * 732) + 32);
        _this.y = -32;
        var container = document.getElementById("container");
        _this.div = document.createElement("blackknight");
        container.appendChild(_this.div);
        _this.div.style.transform = "translate(" + _this.x + "px," + _this.y + "px)";
        return _this;
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
        this.atktimer = this.atktimer + 1;
        if (this.atktimer > 60) {
            this.game.castle.takeDamage(this.damage);
            this.damage += 1;
            this.atktimer = 0;
        }
    };
    Enemy.prototype.notify = function (poweruptype) {
        if (poweruptype == "freeze") {
            for (var i = 0; i < this.game.enemies.length; i++) {
                this.game.enemies[i].speed = 0;
            }
        }
        if (poweruptype == "nuke") {
            for (var i = 0; i < this.game.enemies.length; i++) {
                this.game.enemies[i].health -= 50;
            }
        }
    };
    return Enemy;
}(Entity));
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(x, y) {
        var _this = _super.call(this, x, y) || this;
        _this.speed = 5;
        _this.shootingSpeed = 10;
        _this.arrows = [];
        _this.damage = 10;
        _this.observers = new Array();
        _this.width = 32;
        _this.height = 32;
        var container = document.getElementById("container");
        _this.div = document.createElement("player");
        container.appendChild(_this.div);
        _this.callback = function (e) { return _this.onKeyDown(e); };
        window.addEventListener("keydown", _this.callback);
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
        _this.state = new Idle(_this);
        return _this;
    }
    Player.prototype.subscribe = function (object) {
        this.observers.push(object);
    };
    Player.prototype.sendNotification = function (poweruptype) {
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var o = _a[_i];
            var p = poweruptype;
            o.notify(p);
        }
    };
    Player.prototype.onKeyDown = function (e) {
        if (e.keyCode === Key.LEFT && this.stateName != State.MOVINGLEFT) {
            this.state = new MoveLeft(this);
            this.stateName = State.MOVINGLEFT;
        }
        if (e.keyCode === Key.RIGHT && this.stateName != State.MOVINGRIGHT) {
            this.state = new MoveRight(this);
            this.stateName = State.MOVINGRIGHT;
        }
        if (e.keyCode === Key.SPACE && this.stateName != State.FIRING) {
            this.state = new Firing(this);
            this.stateName = State.FIRING;
        }
    };
    Player.prototype.onKeyUp = function (e) {
        this.state = new Idle(this);
        this.stateName = State.IDLE;
    };
    Player.prototype.update = function () {
        this.state.action();
    };
    Player.prototype.draw = function () {
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
    };
    return Player;
}(Entity));
var Key;
(function (Key) {
    Key[Key["LEFT"] = 37] = "LEFT";
    Key[Key["RIGHT"] = 39] = "RIGHT";
    Key[Key["SPACE"] = 32] = "SPACE";
})(Key || (Key = {}));
var State;
(function (State) {
    State[State["FIRING"] = 1] = "FIRING";
    State[State["MOVINGLEFT"] = 2] = "MOVINGLEFT";
    State[State["MOVINGRIGHT"] = 3] = "MOVINGRIGHT";
    State[State["IDLE"] = 4] = "IDLE";
})(State || (State = {}));
var Firing = (function () {
    function Firing(p) {
        this.player = p;
        this.cooldown = 10;
        this.timer = 5;
        this.width = 8;
        this.height = 32;
    }
    Firing.prototype.action = function () {
        console.log(this.timer);
        this.timer++;
        if (this.timer >= this.cooldown) {
            this.timer = 0;
            this.player.arrows.push(new Arrow(this.player.x + this.player.width / 2 - this.width / 2, this.player.y - this.player.height, this.player.shootingSpeed));
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
var Healthbar = (function (_super) {
    __extends(Healthbar, _super);
    function Healthbar(x, y) {
        var _this = _super.call(this, x, y) || this;
        var container = document.getElementById("container");
        _this.div = document.createElement("healthbar");
        container.appendChild(_this.div);
        _this.div.style.transform = "translate(" + _this.x + "px," + _this.y + "px)";
        return _this;
    }
    Healthbar.prototype.adjustsize = function (h) {
        this.div.style.width = h + "px";
    };
    return Healthbar;
}(GameObject));
var PowerUp;
(function (PowerUp) {
    var Nuke = (function (_super) {
        __extends(Nuke, _super);
        function Nuke(x, y) {
            var _this = _super.call(this, x, y) || this;
            var random = Math.floor((Math.random() * 700) + 50);
            _this.x = random;
            _this.width = 32;
            _this.height = 32;
            var container = document.getElementById("container");
            _this.div = document.createElement("nuke");
            container.appendChild(_this.div);
            _this.div.style.transform = "translate(" + _this.x + "px," + _this.y + "px)";
            return _this;
        }
        Nuke.prototype.draw = function () {
            this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
        };
        Nuke.prototype.update = function () {
            this.y += 3;
            if (this.y > 600) {
                this.div.remove();
            }
        };
        return Nuke;
    }(GameObject));
    PowerUp.Nuke = Nuke;
    var Freeze = (function (_super) {
        __extends(Freeze, _super);
        function Freeze(x, y) {
            var _this = _super.call(this, x, y) || this;
            var random = Math.floor((Math.random() * 700) + 50);
            _this.x = random;
            _this.width = 32;
            _this.height = 32;
            var container = document.getElementById("container");
            _this.div = document.createElement("freeze");
            container.appendChild(_this.div);
            _this.div.style.transform = "translate(" + _this.x + "px," + _this.y + "px)";
            return _this;
        }
        Freeze.prototype.draw = function () {
            this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
        };
        Freeze.prototype.update = function () {
            this.y += 3;
            if (this.y > 600) {
                this.div.remove();
            }
        };
        return Freeze;
    }(GameObject));
    PowerUp.Freeze = Freeze;
})(PowerUp || (PowerUp = {}));
var Game = (function () {
    function Game() {
        var _this = this;
        Game.gameWidth = 800;
        Game.gameHeigt = 600;
        this.spawnTimer = 0;
        this.spawnCooldown = 300;
        this.lastpowerup = "freeze";
        this.castle = new Castle(0, 536);
        this.healthbar = new Healthbar(0, 0);
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
        this.healthbar.adjustsize(this.castle.health);
        if (this.castle.checkHealth() < 1) {
            this.gameOver();
        }
        this.player.update();
        this.player.draw();
        this.spawnTimer++;
        if (this.powerup) {
            this.powerup.update();
            this.powerup.draw();
        }
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
            if (this.enemies[i].health < 1) {
                this.enemies[i].div.remove();
                var e = this.enemies.indexOf(this.enemies[i]);
                if (i != -1) {
                    this.enemies.splice(e, 1);
                }
            }
        }
        if (this.spawnTimer % this.spawnCooldown == 0) {
            this.enemies.push(new Enemy(0, 0));
            if (this.spawnCooldown > 150) {
                this.spawnCooldown = this.spawnCooldown - 5;
            }
        }
        if (this.spawnTimer % 1200 == 0) {
            if (this.lastpowerup == "freeze") {
                this.powerup = new PowerUp.Nuke(400, 0);
                this.lastpowerup = "nuke";
                console.log(this.lastpowerup);
            }
            else {
                this.powerup = new PowerUp.Freeze(400, 0);
                this.lastpowerup = "freeze";
            }
        }
        if (this.powerup != null) {
            if (Util.checkCollision(this.player, this.powerup)) {
                this.player.sendNotification(this.lastpowerup);
                this.powerup.div.remove();
                this.powerup = null;
            }
        }
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.gameOver = function () {
        var g = Game.instance;
        g = null;
    };
    return Game;
}());
window.addEventListener("load", function () {
    var btn = document.getElementById("startbutton");
    TweenLite.to(btn, 3, { x: 0, y: 300, ease: Bounce.easeOut });
    btn.addEventListener("click", function () {
        Game.getInstance();
        btn.remove();
    });
});
var Idle = (function () {
    function Idle(p) {
        this.player = p;
    }
    Idle.prototype.action = function () {
    };
    return Idle;
}());
var MoveLeft = (function () {
    function MoveLeft(p) {
        this.player = p;
    }
    MoveLeft.prototype.action = function () {
        if (this.player.x > 32) {
            this.player.x -= this.player.speed;
        }
    };
    return MoveLeft;
}());
var MoveRight = (function () {
    function MoveRight(p) {
        this.player = p;
    }
    MoveRight.prototype.action = function () {
        if (this.player.x < 736) {
            this.player.x += this.player.speed;
        }
    };
    return MoveRight;
}());
//# sourceMappingURL=main.js.map