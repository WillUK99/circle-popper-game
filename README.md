# circle-popper-game
A game where the player gains points by shooting enemies and removing them from the screen, points are gained on hits and on kills of enemies.

LIVE GAME: https://circle-popper-game.vercel.app/

## Technologies 
-HTML -SASS -JS -GSAP

### About
![image](https://user-images.githubusercontent.com/76099444/115107509-2ff38800-9f63-11eb-86e3-e50328d268a0.png)

Using the canvas API i set up a canvas tag in html which I could then querySelect onto in my JS file, I then created the relevent projectile, enemy and particle arrays (Using as data stores to loop through). 

I then created a player class which would construct the player and a draw() method function to go with it which will be continuously called in my animate loop.
![image](https://user-images.githubusercontent.com/76099444/115107583-c9bb3500-9f63-11eb-970c-68bd1cd3974b.png)

Below this code you'll be able to see the Projectile class, similar to the Player class however, it requires a velocity argument aswell in order to calculate the speed and direction any given projectile should be pushed in. The update method function takes care of updating the x and y of all projectiles and is also continuously called in the animation loop. (The enemy class looks the same as the Projectile class)
![image](https://user-images.githubusercontent.com/76099444/115114538-d782b180-9f87-11eb-8ce4-ed200983e46a.png)

Finally the particle class is again slightly different from the enemy class, is also has an alpha constructor argument which will enable to particles to slowly fade out over time and be removed later in the code base.
![image](https://user-images.githubusercontent.com/76099444/115114659-6263ac00-9f88-11eb-9d65-02f8c59d951a.png)

Once these classes had been made, I moved onto how I would render the player on screen, so i made a animate function loop which calls itself continuously aswell as the code inside of it. 

I learnt a great deal about the canvas API during this area of code and how to render objects on the screen and how to implement data structures in order to remove specific elements of the DOM/canvas when needed. 

Whether that be from removing a projectile when it leaves the endges of the canvas screen, adding collision detection and also stopping the aimation loop when an enemy touches the player in the center of the screen. 

I also used a fair bit of maths in order to find the correct angles from the center of the screen to where the player clicks to launch a projectile and also the angle any given enemy must rtavel at in order to reach the player.

example: 
![image](https://user-images.githubusercontent.com/76099444/115114860-54faf180-9f89-11eb-8b3c-3d23b515126a.png)


The collision logic used in this project also took a lot of maths too
![image](https://user-images.githubusercontent.com/76099444/115114913-a3a88b80-9f89-11eb-954e-6d6d45fcd1c3.png)

All in all i learnt a lot about JavaScript in this project and has pushed me to learn more about data structures, Canvas API, calculating angles and how to implement collision detection in an app.

#### Thankyou for reading
