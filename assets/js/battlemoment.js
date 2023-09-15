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

const firsrboss = new Monster(monsters.firsrboss);
const champion = new Monster(monsters.champion);
const renderedSprites = [firsrboss , champion];

champion.attacks.forEach(attack => {
    const button = document.createElement("button");
button.innerHTML = attack.name
document.querySelector("#attacksBox").append(button)
})


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

        if (firsrboss.helth <= 0) {
            queue.push(() => {
                firsrboss.faint()
            })
            return
        }

        const randowAttack =  firsrboss.attacks[Math.floor(Math.random() * champion.attacks.length)]
        queue.push(() => {
            firsrboss.attack({
                attack: randowAttack,
                recipient: champion,
                renderedSprites
            })
        })
    })
    button.addEventListener("mouseenter" , (e) => {
        const selectedAttack = attacks[e.currentTarget.innerHTML]
        document.querySelector("#attackType").innerHTML = selectedAttack.type
        document.querySelector("#attackType").style.color = selectedAttack.color
    })
});
document.querySelector("#dialogue").addEventListener("click" , (e) => {
    if (queue.length > 0) {
        queue[0]();
        queue.shift();
    } else e.currentTarget.style.display ="none"
})