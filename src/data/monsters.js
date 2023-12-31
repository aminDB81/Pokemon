// Load image for the champion
const championImage = new Image();
championImage.src = "assets/img/embySprite.png";

// Load image for the first boss
const firstbosImage = new Image();
firstbosImage.src = "assets/img/Idle.png";

// Define monster objects
const monsters = {
    champion: {
        position: {
            x: 325,
            y: 360
        },
        image: {
            src: "assets/img/embySprite.png"
        },
        frames: {
            max: 4
        },
        animate: true,
        name: "Champion",
        attacks: [attacks.Tackle, attacks.Fireball]
    },
    firsrboss: {
        position: {
            x: 700,
            y: 150
        },
        image: {
            src: "assets/img/Idle.png"
        },
        frames: {
            max: 5
        },
        animate: true,
        isEnemy: true,
        name: "Enemy",
        attacks: [attacks.Tackle, attacks.Fireball]
    }
}