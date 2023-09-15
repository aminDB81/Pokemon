const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d")
canvas.width = 1120;
canvas.height = 576

const collisionMap = []
for (let i = 0; i < collision.length; i += 140) {
    collisionMap.push(collision.slice(i, 140 + i))
}

const battlezonemap = []
for (let i = 0; i < battlezoneData.length; i += 140) {
    battlezonemap.push(battlezoneData.slice(i, 140 + i))
}

const boundaries = []
const offset = {
    x: -445,
    y: -525
}
collisionMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 913)
            boundaries.push(new Boundary({
                position: {
                    x: j * Boundary.width + offset.x,
                    y: i * Boundary.height + offset.y
                }
            }))

    });

});

const battlezone = []
battlezonemap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 913)
            battlezone.push(new Boundary({
                position: {
                    x: j * Boundary.width + offset.x,
                    y: i * Boundary.height + offset.y
                }
            }))

    });

});

c.fillRect(0, 0, canvas.width, canvas.height)
const image = new Image();
image.src = "assets/img/Pokemon style game.png"

const playerDownImage = new Image();
playerDownImage.src = "assets/img/playerDown.png"

const playerUpImage = new Image();
playerUpImage.src = "assets/img/playerUp.png"

const playerLeftImage = new Image();
playerLeftImage.src = "assets/img/playerLeft.png"

const playerRightImage = new Image();
playerRightImage.src = "assets/img/playerRight.png"


const player = new Sprite({
    position: {
        x: 428,
        y: 350
    },
    image: playerDownImage,
    frames: {
        max: 4
    },
    sprites: {
        up: playerUpImage,
        left: playerLeftImage,
        down: playerDownImage,
        right: playerRightImage
    }
})

const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: image,

});

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    },
}

const movables = [background, ...boundaries, ...battlezone]

function rectangularCollision({ rectangle1, rectangle2 }) {
    return (rectangle1.position.x + rectangle1.width >= rectangle2.position.x
        && rectangle1.position.x <= rectangle2.position.x + rectangle2.width
        && rectangle1.position.y <= rectangle2.position.y + rectangle2.height
        && rectangle1.position.y + rectangle1.height >= rectangle2.position.y)
}

const battle = {
    initiated: false
}
// Specifying the width, height and position of the character
function animate() {
    const animationId = window.requestAnimationFrame(animate)
    background.draw();
    battlezone.forEach(battlezones => {
        battlezones.draw()
    })
    boundaries.forEach(boundary => {
        boundary.draw()

    })

    player.draw();

    let moving = true
    player.animate = false;

    if (battle.initiated) return

    if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
        for (let i = 0; i < battlezone.length; i++) {
            const battlezones = battlezone[i]
            const overlappingArea =
                (Math.min(
                    player.position.x + player.width,
                    battlezones.position.x + battlezones.width
                ) -
                    Math.max(player.position.x, battlezones.position.x)) *
                (Math.min(
                    player.position.y + player.height,
                    battlezones.position.y + battlezones.height
                ) -
                    Math.max(player.position.y, battlezones.position.y))
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: battlezones
                }) &&
                overlappingArea > (player.width * player.height) / 2 &&
                Math.random() < 0.01
            ) {
                window.cancelAnimationFrame(animationId);
                audio.Map.stop();
                audio.initBattle.play()
                audio.battle.play()
                gsap.to("#overLapingDiv", {
                    opacity: 1,
                    repeat: 3,
                    yoyo: true,
                    duration: 0.4,
                    onComplete() {
                        gsap.to("#overLapingDiv", {
                            opacity: 1,
                            onComplete() {
                                // active a new animation loop
                                initBattle()
                                animateBattle();
                                gsap.to("#overLapingDiv", {
                                    opacity: 0,
                                })
                            }
                        })

                    }
                })

                battlezone.initiated = true;
                break
            }
        }
    }

    if (keys.w.pressed && lastKey === "w") {
        player.animate = true;
        player.image = player.sprites.up
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (rectangularCollision({
                rectangle1: player,
                rectangle2: {
                    ...boundary, position: {
                        x: boundary.position.x,
                        y: boundary.position.y + 3
                    }
                }
            })
            ) {
                moving = false
                break
            }
        }
        if (moving)
            movables.forEach(movables => {
                movables.position.y += 4
            })
    } else if (keys.a.pressed && lastKey === "a") {
        player.animate = true;
        player.image = player.sprites.left
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (rectangularCollision({
                rectangle1: player,
                rectangle2: {
                    ...boundary, position: {
                        x: boundary.position.x + 3,
                        y: boundary.position.y
                    }
                }
            })
            ) {
                moving = false
                break
            }
        }

        if (moving)
            movables.forEach(movables => {
                movables.position.x += 4
            })
    } else if (keys.s.pressed && lastKey === "s") {
        player.animate = true;
        player.image = player.sprites.down;
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (rectangularCollision({
                rectangle1: player,
                rectangle2: {
                    ...boundary, position: {
                        x: boundary.position.x,
                        y: boundary.position.y - 3
                    }
                }
            })
            ) {
                moving = false
                break
            }
        }

        if (moving)
            movables.forEach(movables => {
                movables.position.y -= 4
            })
    } else if (keys.d.pressed && lastKey === "d") {
        player.animate = true;
        player.image = player.sprites.right
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (rectangularCollision({
                rectangle1: player,
                rectangle2: {
                    ...boundary, position: {
                        x: boundary.position.x - 3,
                        y: boundary.position.y
                    }
                }
            })
            ) {
                moving = false
                break
            }
        }
        if (moving)
            movables.forEach(movables => {
                movables.position.x -= 4
            })
    }
}

let lastKey = "";
window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "w":
            keys.w.pressed = true;
            lastKey = "w"
            break
        case "a":
            keys.a.pressed = true;
            lastKey = "a"
            break
        case "s":
            keys.s.pressed = true;
            lastKey = "s"
            break
        case "d":
            keys.d.pressed = true;
            lastKey = "d"
            break
    }
}
);
window.addEventListener("keyup", (e) => {
    switch (e.key) {
        case "w":
            keys.w.pressed = false;
            break
        case "a":
            keys.a.pressed = false;
            break
        case "s":
            keys.s.pressed = false;
            break
        case "d":
            keys.d.pressed = false;
            break
    }
}
);

let clicked = false
addEventListener("click", () => {

    if (!clicked) {
        audio.Map.play();
        clicked = true
    }
})