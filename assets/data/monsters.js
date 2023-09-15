const championImage = new Image();
championImage.src = "assets/img/embySprite.png";

const firstbosImage = new Image();
firstbosImage.src = "assets/img/Idle.png";

const monsters = {
    champion : {
        position: {
            x: 325,
            y: 360
        },
        image: championImage,
        frames: {
            max: 4
        },
        animate: true,
        name: "Champion",
        attacks: [attacks.Tackle , attacks.Fireball]
    } , 
    firsrboss : {
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
        name: "Enemy",
        attacks: [attacks.Tackle]
    }
}