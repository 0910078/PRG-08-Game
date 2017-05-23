class Util {
    public static checkCollision(obj1:GameObject, obj2:GameObject):boolean {
        return (obj1.x < obj2.x + obj2.width &&
                obj1.x + obj1.width > obj2.x &&
                obj1.y < obj2.y + obj2.height &&
                obj1.height + obj1.y > obj2.y)
    }
}