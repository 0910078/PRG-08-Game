Welcome!

The aim of the game is to defend the castle from attacking enemies.

Controls:

Use the arrow keys to move left and right.
Use the spacebar to fire arrows.

To play the game go to:

https://0910078.github.io/PRG-08-Game/

Begrippen:
Interface is toegepast: zie PlayerStatus class
Static utility method is toegepast: zie Util class
Singleton is toegepast: zie getInstance() method in game.ts
Strategy is toegepast: Idle, MoveLeft, MoveRight en Firing classes implementeren Playerstatus

Encapsulation: veel dingen in game.ts of player.ts zijn private gemaakt
Composition: Game heeft alle objecten, player heeft arrows
Inheritance: Entity erft over van GameObject, Player en Enemy erven weer over van Entity
