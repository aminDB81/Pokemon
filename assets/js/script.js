const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d")
canvas.width = 1120;
canvas.height = 576

const collisionMap = [];
 for (let i = 0; i < collision.length; i+=70) {
    collisionMap.push(collision.slice(i , 70 + i))        
 }

 class Boundary {
    constructor({position}) {
        this.position = position;
        this.widt = 64;
        this.height = 64;
    }
    draw() {
        c.fillRect(this.position.x , this.position.y , this.widt , this.height)
    }
 }

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
    if (keys.w.pressed && lastKey === "w") {
        background.position.y = background.position.y += 4
    } else if (keys.a.pressed && lastKey === "a") {
        background.position.x = background.position.x += 4
    } else if (keys.s.pressed && lastKey === "s") {
        background.position.y = background.position.y -= 4
    } else if (keys.d.pressed && lastKey === "d") {
        background.position.x = background.position.x -= 4
    }
}
animate()

//  Specifying specific keys for character movement
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

