# circle-popper-game
A game where the player gains points by shooting enemies and removing them from the screen, points are gained on hits and on kills of enemies.

## Technologies 
-HTML -SASS -JS -GSAP

### About
![image](https://user-images.githubusercontent.com/76099444/115107509-2ff38800-9f63-11eb-86e3-e50328d268a0.png)

Using the canvas API i set up a canvas tag in html which I could then querySelect onto in my JS file, I then created the relevent projectile, enemy and particle arrays (Using as data stores to loop through). 

I then created a player class which would construct the player and a draw() method function to go with it which will be continuously called in my animate loop.
![image](https://user-images.githubusercontent.com/76099444/115107583-c9bb3500-9f63-11eb-970c-68bd1cd3974b.png)

Below this code you'll be able to see the Projectile class, similar to the Player class however, it requires a velocity argument aswell in order to calculate the speed and direction any given projectile should be pushed in. The update method function takes care of updating the x and y of all projectiles and is also continuously called in the animation loop

