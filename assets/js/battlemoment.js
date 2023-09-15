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

const firsrboss = new Sprite(monsters.firsrboss);


const champion = new Sprite(monsters.champion);

const renderedSprites = [firsrboss , champion];
const button = document.createElement("button");
button.innerHTML = "Fireball"
document.querySelector("#attacksBox").append(button)
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