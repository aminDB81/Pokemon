
class Sprite {
    constructor({
        position,
        image,
        frames = { max: 1 },
        sprites,
        animate = false,
        rotation = 0,
    }) {
        this.position = position;
        this.image = new Image();
        this.frames = { ...frames, val: 0, elapsed: 0 };
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height;
        }
        this.image.src = image.src
        this.animate = animate;
        this.sprites = sprites;
        this.opacity = 1;
        this.rotation = rotation
    }

    draw() {
        c.save()
        c.translate(this.position.x + this.width / 2, this.position.y + this.height / 2)
        c.rotate(this.rotation)
        c.translate(-this.position.x - this.width / 2, -this.position.y - this.height / 2)
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
}

class Monster extends Sprite {
    constructor({
        position,
        image,
        frames = { max: 1 },
        sprites,
        animate = false,
        rotation = 0,
        isEnemy = false,
        name,
        attacks
    }) {
        super({
            position,
            image,
            frames,
            sprites,
            animate,
            rotation,
        })
        this.helth = 100;
        this.isEnemy = isEnemy
        this.name = name,
            this.attacks = attacks
    }

    faint() {
        document.querySelector("#dialogue").style.display = "block";
        document.querySelector("#dialogue").innerHTML = "The " + this.name + " Was Defeated"
        gsap.to(this.position, {
            y: this.position.y + 10
        })
        gsap.to(this, {
            opacity: 0
        })
        audio.battle.stop()
        audio.victory.play()
    }

    attack({ attack, recipient, renderedSprites }) {
        document.querySelector("#dialogue").style.display = "block";
        document.querySelector("#dialogue").innerHTML = this.name + " used " + attack.name
        let helthBar = "#EnemyHelthBar"
        if (this.isEnemy) {
            helthBar = "#ChampionHelthBar"
        }
        let rotation = 1
        if (this.isEnemy) {
            rotation = -2.2
        }
        recipient.helth -= attack.damage
        switch (attack.name) {

            case "Fireball":
                audio.initFireball.play()
                const fireballImage = new Image()
                fireballImage.src = "assets/img/fireball.png"
                const fireball = new Sprite({
                    position: {
                        x: this.position.x,
                        y: this.position.y
                    },
                    image: fireballImage,
                    frames: {
                        max: 4
                    },

                    animate: true,
                    rotation
                })
                renderedSprites.splice(1, 0, fireball)
                if (this.isEnemy) {
                    gsap.to(fireball.position, {
                        x: recipient.position.x + 35,
                        y: recipient.position.y + 10,
                        onComplete: () => {
                            audio.fireballHit.play()
                            gsap.to(helthBar, {
                                width: recipient.helth - attack.damage + "%"
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
                            renderedSprites.splice(1, 1)
                        }
                    })
                } else {
                    gsap.to(fireball.position, {
                        x: recipient.position.x + 35,
                        y: recipient.position.y + 45,
                        onComplete: () => {
                            audio.fireballHit.play()
                            gsap.to(helthBar, {
                                width: recipient.helth - attack.damage + "%"
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
                            renderedSprites.splice(1, 1)
                        }
                    })
                }
                break;

            case "Tackle":
                const tl = gsap.timeline();
                let movementDistance = 20;
                if (this.isEnemy) {
                    movementDistance = -20
                }
                tl.to(this.position, {
                    x: this.position.x - movementDistance * 2
                }).to(this.position, {
                    x: this.position.x + 40,
                    duration: 0.3,
                    onComplete: () => {
                        //enemy get hit
                        audio.tackleHit.play()
                        gsap.to(helthBar, {
                            width: recipient.helth - attack.damage + "%"
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
        c.fillStyle = "rgba(255 , 0 , 0 , 0)"
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

