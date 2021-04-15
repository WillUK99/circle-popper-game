const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")
const points = document.querySelector(".points")



canvas.width = innerWidth
canvas.height = innerHeight

const x = canvas.width / 2
const y = canvas.height / 2

const projectileArr = []
const enemyArr = []
const particleArr = []

class Player {
    constructor(x, y, radius, colour) {
        this.x = x,
            this.y = y,
            this.radius = radius,
            this.colour = colour
    }

    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.colour
        c.fill()
    }
}

class Projectile {
    constructor(x, y, radius, colour, v) {
        this.x = x,
            this.y = y,
            this.radius = radius,
            this.colour = colour,
            this.v = v
    }

    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.colour
        c.fill()
    }

    update() {
        this.draw()
        this.x = this.x + this.v.x
        this.y = this.y + this.v.y
    }
}


class Enemy {
    constructor(x, y, radius, colour, v) {
        this.x = x,
            this.y = y,
            this.radius = radius,
            this.colour = colour,
            this.v = v
    }

    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.colour
        c.fill()
    }

    update() {
        this.draw()
        this.x = this.x + this.v.x
        this.y = this.y + this.v.y
    }
}


// creates and draws player in center of screen
const player = new Player(x, y, 15, "white")
player.draw()



//spawns enemies in a set interval apart. 
function spwnEnemy() {
    setInterval(() => {
        //random radius of enemies
        const r = Math.random() * (35 - 5) + 5

        let x
        let y

        //random spawning logic for all edges of screen
        if (Math.random() < 0.5) {
            x = Math.random() < 0.5 ? 0 - r : canvas.width + r
            y = Math.random() * canvas.height
        } else {
            x = Math.random() * canvas.width
            y = Math.random() < 0.5 ? 0 - r : canvas.height + r
        }

        //radom colour for enemies
        const colour = `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`

        // gets the angle between the enemy spawn x/y to center of screen/player
        const angle = Math.atan2(
            canvas.height / 2 - y,
            canvas.width / 2 - x
        )

        //velocities for enemy to be at to reach player
        const velocity = {
            x: Math.cos(angle) * 2.5,
            y: Math.sin(angle) * 2.5
        }

        //pushing enemy onto array enemy array
        enemyArr.push(new Enemy(x, y, r, colour, velocity))

    }, 400);
}



let score = 0
//for animation loop
let animationId
function animate() {
    //reqAnimFrame is put into variable so we can later stop it when enemy hits player
    // a infinite loop is made when the animate function calls itself
    animationId = requestAnimationFrame(animate)
    //sets background colour and allows for trace lines to appear
    c.fillStyle = "rgba(0 , 0, 0, 0.3)"
    // instead of clearRect() we use fillRect() to keep black colour and alpha channels
    c.fillRect(0, 0, canvas.width, canvas.height)
    // player is redrawn every loop of the animation
    player.draw()


    // looping through projectiles array and calling its instance of update()
    projectileArr.forEach((projectile, index) => {
        projectile.update()

        //removes projectiles from array if they leave the canvas screen 
        if (projectile.x - projectile.radius < 0 ||
            projectile.x - projectile.radius > canvas.width ||
            projectile.y - projectile.radius > canvas.height ||
            projectile.y - projectile.radius < 0) {
            /*.forEach can take an index (shown above) enabling 
             specific indexs to be removed with .splice()*/
            projectileArr.splice(index, 1)
        }
    })

    // loops through enemy array and animates them with .update()
    enemyArr.forEach((enemy, enemyIndex) => {
        enemy.update()


        // enemy and player collision logic
        const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y)
        if (dist - enemy.radius - player.radius < 1) {
            cancelAnimationFrame(animationId)
        }

        // projectile and enemy collisiion logic.
        projectileArr.forEach((projectile, index) => {
            const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y)
            
            setTimeout(() => {
                if (dist - enemy.radius - projectile.radius < 1) {
                    
                    if (enemy.radius - 10 > 15) {
                        gsap.to(enemy, {
                            radius: enemy.radius - 10
                        })
                        setTimeout(() => {
                            projectileArr.splice(index, 1)
                        }, 0);
                        
                        score += 15
                        points.innerHTML = score

                    } else {
                        setTimeout(() => {
                            enemyArr.splice(enemyIndex, 1)
                            projectileArr.splice(index, 1)
                        }, 0);

                        score += 50
                        points.innerHTML = score
                    }
                }
                // 0ms so it executes straight away rather than waiting for the next frame
            }, 0);


        })
    })
}

// event listener for projectiles
addEventListener("click", evt => {

    // atan2() allows us to find the angle between the player and where player clicks
    const angle = Math.atan2(
        evt.clientY - canvas.height / 2,
        evt.clientX - canvas.width / 2
    )

    // musing .cos() and .sin() to find the speed to push the projectile in x/y to reach target.
    const velocity = {
        x: Math.cos(angle) * 5.5,
        y: Math.sin(angle) * 5.5
    }

    // finally when the above is computed a new instance of a projectile is pushed onto projectileArr and can then be rendered withing the animate function above
    projectileArr.push(new Projectile(x, y, 5, "white", { x: velocity.x, y: velocity.y }))

})

animate()
spwnEnemy()



