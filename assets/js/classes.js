
class Sprite {
    constructor({ position,
        image,
        frames = { max: 1 },
        sprites,
        animate = false,
        isEnemy = false
    }) {
        this.position = position;
        this.image = image;
        this.frames = { ...frames, val: 0, elapsed: 0 };
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height;
        }
        this.animate = animate;
        this.sprites = sprites;
        this.opacity = 1;
        this.helth = 100;
        this.isEnemy = isEnemy
    }

    draw() {
        c.save()
        c.globalAlpha = this.opacity
        c.drawImage(
            this.image,
            this.frames.val * this.width,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height
        )
        c.restore()
        if (!this.animate) return
        if (this.frames.max > 1) {
            this.frames.elapsed++
        }
        if (this.frames.elapsed % 10 === 0) {
            if (this.frames.val < this.frames.max - 1) {
                this.frames.val++
            } else {
                this.frames.val = 0;
            }
        }

    }
    attack({ attack, recipient }) {
        switch (attack.name) {

            case "Fireball":



            
                break;



            case "Tackle":
                const tl = gsap.timeline();

                this.helth -= attack.damage

                let movementDistance = 20;
                if (this.isEnemy) {
                    movementDistance = -20
                }

                let helthBar = "#EnemyHelthBar"
                if (this.isEnemy) {
                    helthBar = "#ChampionHelthBar"
                }

                tl.to(this.position, {
                    x: this.position.x - movementDistance * 2
                }).to(this.position, {
                    x: this.position.x + 40,
                    duration: 0.3,
                    onComplete: () => {
                        //enemy get hit
                        gsap.to(helthBar, {
                            width: this.helth - attack.damage + "%"
                        })
                        gsap.to(recipient.position, {
                            x: recipient.position.x + 10,
                            yoyo: true,
                            repeat: 4,
                            duration: 0.08
                        })

                        gsap.to(recipient, {
                            opacity: 0,
                            repeat: 5,
                            yoyo: true,
                            duration: 0.08
                        })
                    }
                }).to(this.position, {
                    x: this.position.x
                });
                break;
        }




    }
}


class Boundary {
    static width = 64
    static height = 64
    constructor({ position }) {
        this.position = position
        this.width = 64
        this.height = 64
    }
    draw() {
        c.fillStyle = "rgba(255 , 0 , 0 , 0.2)"
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

