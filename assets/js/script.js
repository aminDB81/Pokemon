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
    constructor({position,velocity}){
        this.position = position;
    }

    
}

const background = new Sprite({position : {
    x : -400,
    y : -500
}})



// Specifying the width, height and position of the character
function animate() {
    window.requestAnimationFrame(animate)
    c.drawImage(image, -400, -500)
    c.drawImage(playerImage,
        0,
        0,
        playerImage.width / 4,
        playerImage.height,
        428, 350,
        playerImage.width / 4,
        playerImage.height,);
}
animate()

//  Specifying specific keys for character movement
window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "w":
            console.log("w key was pressed");
            break
        case "a":
            console.log("a key was pressed");
            break
        case "s":
            console.log("s key was pressed");
            break
        case "d":
            console.log("d key was pressed");
            break
    }
}
)

