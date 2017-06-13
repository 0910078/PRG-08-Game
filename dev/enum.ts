/// <reference path="player.ts" />


enum Key{
    LEFT = 37,
    RIGHT = 39,
    SPACE = 32
}

enum State{
    FIRING = 1,
    MOVINGLEFT = 2,
    MOVINGRIGHT = 3,
    IDLE = 4
}