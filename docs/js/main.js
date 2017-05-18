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
var Game = (function () {
    function Game() {
        var _this = this;
        this.player = new Player(0, 0);
        this.enemy = new Enemy(0, 0);
        this.castle = new Castle(0, 536);
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
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    return Game;
}());
window.addEventListener("load", function () {
    Game.getInstance();
});
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(x, y) {
        _super.call(this, x, y);
        var container = document.getElementById("container");
        this.div = document.createElement("player");
        container.appendChild(this.div);
    }
    return Player;
}(Entity));
//# sourceMappingURL=main.js.map