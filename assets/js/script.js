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

// Specifying the width, height and position of the character
image.onload = () => {
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



