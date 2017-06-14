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
Static utility method is toegepast: zie Util class, wordt gebruikt in game.ts

### Singleton
Singleton is toegepast: zie getInstance() method in game.ts, hiervan wordt gebruik gemaakt bijvoorbeeld in enemy.ts

### Strategy
Strategy is toegepast: Idle, MoveLeft, MoveRight en Firing classes implementeren Playerstatus

### Encapsulation
Veel dingen in game.ts of player.ts zijn private gemaakt, alleen noodzakelijk private gemaakt

### Composition
Game heeft alle objecten, player heeft arrows

### Inheritance
Entity erft over van GameObject, Player en Enemy erven weer over van Entity

### Library
Gebruikt voor het startscherm (tweenlite), zie definitions mapje

### Observer
De enemies subscriben zich op de player, zodra die een powerup oppakt, passen zij hun gedrag aan

### Enumeraties
Is toegepast bijvoorbeeld voor de key bindings makkelijk te onthoudenz zie enum.ts

### Namespaces
Gedaan met de powerups, in de game.ts worden ze aangemaakt als Powerup.Nuke of Powerup.Freeze

### Polymorphism
powerups in game.ts zijn een gameObject, daarom kunnen ze beiden hun update functie aanroepen met this.powerup.update() ook al zijn het verschillende classes

### Abstract
Entity is een abstract class, omdat je nooit een instance van entity zelf wil maken

