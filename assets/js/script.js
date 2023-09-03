const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d")
canvas.width = 1120;
canvas.height = 576
c.fillStyle = "white"
c.fillRect(0, 0, canvas.width, canvas.height)
// c.drawImage("assets/img/Pokemon style game.png")
const image = new Image();
image.src = "assets/img/Pokemon style game.png"

const playerImage = new Image();
playerImage.src = "assets/img/playerDown.png"

class Sprite {
    constructor({ position, velocity, image }) {
        this.position = position;
        this.image = image;
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}

const background = new Sprite({
    position: {
        x: -400,
        y: -500
    },
    image: image

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



// Specifying the width, height and position of the character
function animate() {
    window.requestAnimationFrame(animate)
    background.draw();
    c.drawImage(playerImage,
        0,
        0,
        playerImage.width / 4,
        playerImage.height,
        428, 350,
        playerImage.width / 4,
        playerImage.height,);
    if (keys.w.pressed) {
        background.position.y = background.position.y += 4
    } else if (keys.a.pressed) {
        background.position.x = background.position.x += 4
    } else if (keys.s.pressed) {
        background.position.y = background.position.y -= 4
    } else if (keys.d.pressed) {
        background.position.x = background.position.x -= 4
    }
}
animate()

//  Specifying specific keys for character movement
window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "w":
            keys.w.pressed = true;
            break
        case "a":
            keys.a.pressed = true;
            break
        case "s":
            keys.s.pressed = true;
            break
        case "d":
            keys.d.pressed = true;
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

