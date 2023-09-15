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
    name: "Enemy"
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

const queue = []

document.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", (e) => {
        const selectedAttack = attacks[e.currentTarget.innerHTML]
        champion.attack({
            attack: selectedAttack,
            recipient: firsrboss,
            renderedSprites
        })
        queue.push(() => {
            firsrboss.attack({
                attack: attacks.Tackle,
                recipient: champion,
                renderedSprites
            })
        })
    })
});
document.querySelector("#dialogue").addEventListener("click" , (e) => {
    if (queue.length > 0) {
        queue[0]();
        queue.shift();
    } else e.currentTarget.style.display ="none"
})