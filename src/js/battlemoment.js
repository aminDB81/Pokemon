// Load the battle background image
const BattleBackgroundImage = new Image();
BattleBackgroundImage.src = "assets/img/BattleBackground.png";

// Create a sprite for the battle background
const BattleBackground = new Sprite({
    position: {
        x: 0,
        y: 0
    }
    ,
    image: BattleBackgroundImage
})

let firsrboss
let champion
let renderedSprites
let battleanimationId
let queue

// Function to initialize a battle
function initBattle() {
    document.querySelector("#user").style.display = "block"
    document.querySelector("#dialogue").style.display = "none"
    document.querySelector("#EnemyHelthBar").style.width = "100%"
    document.querySelector("#ChampionHelthBar").style.width = "100%"
    document.querySelector("#attacksBox").replaceChildren()


    
    firsrboss = new Monster(monsters.firsrboss);
    champion = new Monster(monsters.champion);
    renderedSprites = [firsrboss, champion];
    queue = []
    champion.attacks.forEach(attack => {
        const button = document.createElement("button");
        button.innerHTML = attack.name
        document.querySelector("#attacksBox").append(button)
    })
    document.querySelectorAll("button").forEach(button => {
        button.addEventListener("click", (e) => {
            const selectedAttack = attacks[e.currentTarget.innerHTML]

            champion.attack({
                attack: selectedAttack,
                recipient: firsrboss,
                renderedSprites
            })

            if (firsrboss.helth <= 15) {
                queue.push(() => {
                    firsrboss.faint()
                })
                queue.push(() => {
                    gsap.to("#overLapingDiv", {
                        opacity: 1,
                        onComplete: () => {
                            cancelAnimationFrame(battleanimationId)
                            animate()
                            document.querySelector("#user").style.display = "none"
                            gsap.to("#overLapingDiv", {
                                opacity: 0
                            })
                            battle.initiated = false
                            audio.Map.play()
                        }
                    })
                })
            }

            const randowAttack = firsrboss.attacks[Math.floor(Math.random() * champion.attacks.length)]
            queue.push(() => {
                firsrboss.attack({
                    attack: randowAttack,
                    recipient: champion,
                    renderedSprites
                })
                if (champion.helth <= 15) {
                    queue.push(() => {
                        champion.faint()
                    })
                    queue.push(() => {
                        gsap.to("#overLapingDiv", {
                            opacity: 1,
                            onComplete: () => {
                                cancelAnimationFrame(battleanimationId)
                                animate()
                                document.querySelector("#user").style.display = "none"
                                gsap.to("#overLapingDiv", {
                                    opacity: 0
                                })
                                battle.initiated = false;
                                audio.Map.play()
                            }
                        })
                    })
                }
            })
        })
        button.addEventListener("mouseenter", (e) => {
            const selectedAttack = attacks[e.currentTarget.innerHTML]
            document.querySelector("#attackType").innerHTML = selectedAttack.type
            document.querySelector("#attackType").style.color = selectedAttack.color
        })
    });
}

// Function to animate the battle
function animateBattle() {
    battleanimationId = window.requestAnimationFrame(animateBattle)
    BattleBackground.draw();

    renderedSprites.forEach((sprite) => {
        sprite.draw()
    })

}
animate()
// initBattle()
// animateBattle()



// Event listener for dialogue box click to progress battle actions
document.querySelector("#dialogue").addEventListener("click", (e) => {
    if (queue.length > 0) {
        queue[0]();
        queue.shift();
    } else e.currentTarget.style.display = "none"
})