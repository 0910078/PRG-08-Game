## Iron arrow
The aim of the game is to defend the castle from attacking enemies.

### Controls

Use the arrow keys to move left and right.
Use the spacebar to fire arrows.

### Contributing
To edit the game you will need to install typescript, download it here:
https://www.typescriptlang.org/
Once installed, use command+shift+b to compile your code!

### Play
To play the game go to:
https://0910078.github.io/PRG-08-Game/

Begrippen:
### Interface
Interface is toegepast: zie PlayerStatus class

### Static utility method
Static utility method is toegepast: zie Util class

### Singleton
Singleton is toegepast: zie getInstance() method in game.ts

### Strategy
Strategy is toegepast: Idle, MoveLeft, MoveRight en Firing classes implementeren Playerstatus

### Encapsulation
Veel dingen in game.ts of player.ts zijn private gemaakt

### Composition
Game heeft alle objecten, player heeft arrows

### Inheritance
Entity erft over van GameObject, Player en Enemy erven weer over van Entity
