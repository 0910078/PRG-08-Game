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

//Interface is correct geïmplementeerd

### Static utility method
Static utility method is toegepast: zie Util class

//De method uit de Util class wordt op een juiste manier gebruikt in bijvoorbeeld game.ts

### Singleton
Singleton is toegepast: zie getInstance() method in game.ts

//De singleton is op de juiste manier aangemaakt, maar nog niet aangeroepen vanuit andere classes.

### Strategy
Strategy is toegepast: Idle, MoveLeft, MoveRight en Firing classes implementeren Playerstatus

//Strategy pattern is op een verkeerde manier toegepast, de aanpassing beschrijf ik in mijn pull request.

### Encapsulation
Veel dingen in game.ts of player.ts zijn private gemaakt

//In de genoemde game.ts en player.ts is inderdaad encapsulation gebruikt. In player.ts zijn een paar functies nog niet benoemd wat betreft
private/public/protected. Zorg ervoor dat je in elke class, bij elke methode/variabele, altijd aangeeft of het private/public/protected is!

### Composition
Game heeft alle objecten, player heeft arrows

//Composition wordt, zoals hierboven genoemd, in de Game en in Player op een goede manier gebruikt.

### Inheritance
Entity erft over van GameObject, Player en Enemy erven weer over van Entity

//Inheritance wordt op de juiste manier toegepast.

//Ik geef de game een voldoende. De core van de game staat, Strategy Pattern was niet helemaal juist geïmplementeerd maar ik hoop
//daar nu duidelijk over te geven.
//Tip: Probeer er een gewoonte van te maken om Encapsulation overal direct toe te passen. Begin desnoods met alles direct private te maken,
//als je later merkt dat de variabelen public/protected moeten zijn kan dat op dat moment nog aangepast worden.