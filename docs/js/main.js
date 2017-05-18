var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameObject = (function () {
    function GameObject() {
    }
    GameObject.prototype.draw = function () {
    };
    return GameObject;
}());
var Entity = (function (_super) {
    __extends(Entity, _super);
    function Entity() {
        _super.apply(this, arguments);
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
        requestAnimationFrame(function () { return _this.gameLoop(); });
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    return Game;
}());
window.addEventListener("load", function () {
    var g = new Game();
});
var Player = (function (_super) {
    __extends(Player, _super);
    function Player() {
        _super.apply(this, arguments);
    }
    return Player;
}(Entity));
//# sourceMappingURL=main.js.map