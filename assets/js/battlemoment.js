const BattleBackgroundImage = new Image();
BattleBackgroundImage.src = "assets/img/BattleBackground.png";
const BattleBackground = new Sprite({
    position: {
        x: 0,
        y: 0
    }
    ,
    image: BattleBackgroundImage
})
const firstbosImage = new Image();
firstbosImage.src = "assets/img/Idle.png";
const firsrboss = new Sprite({
    position: {
        x: 700,
        y: 150
    },
    image: firstbosImage,
    frames: {
        max: 5
    },
    animate: true,
    isEnemy: true,
    name : "Enemy"
});

const championImage = new Image();
championImage.src = "assets/img/embySprite.png";
const champion = new Sprite({
    position: {
        x: 325,
        y: 360
    },
    image: championImage,
    frames: {
        max: 4
    },
    animate: true,
    name: "Champion"
});

const renderedSprites = [firsrboss , champion]

function animateBattle() {
    window.requestAnimationFrame(animateBattle)
    BattleBackground.draw();
    console.log('animation battle');

    renderedSprites.forEach((sprite) => {
        sprite.draw()
    })

}
animateBattle()

document.querySelectorAll("#Tackle").forEach(button => {
    button.addEventListener("click", () => {
        champion.attack({
            attack: {
                name: "Tackle",
                damage: 10,
                type: "normal"
            },
            recipient: firsrboss
        })
    })
});
document.querySelectorAll("#FireBall").forEach(button => {
    button.addEventListener("click", () => {
        champion.attack({
            attack: {
                name: "Fireball",
                damage: 20,
                type: "Fire"
            },
            recipient: firsrboss,
            renderedSprites
        })
    })
});