interface PlayerState{
    player:Player;
    action():void;
    onFire():void;
    onMoveLeft():void;
    onMoveRight():void;
    onKeyUp(e:KeyboardEvent):void;
}