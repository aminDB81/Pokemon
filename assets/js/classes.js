
class Sprite {
    constructor({ position,
        image,
        frames = { max: 1 },
        sprites,
        animate = false,
        isEnemy = false,
        rotation = 0,
        name
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
        this.rotation = rotation
        this.name = name
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
    attack({ attack, recipient, renderedSprites }) {
        document.querySelector("#attack-text-box").style.display = "block"
        document.querySelector("#attack-text-box").innerHTML = this.name + " used " + attack.name;
        const textbox = document.getElementById("attack-text-box");
        textbox.addEventListener("click", () => {
            if(queue.length > 0) {
                queue[0]()
                queue.shift()
            } else textbox.style.display = "none";
        });
        let helthBar = "#EnemyHelthBar"
        if (this.isEnemy) {
            helthBar = "#ChampionHelthBar"
        }
        let rotation = 1
        if (this.isEnemy) {
            rotation = -2.2
        }
        this.helth -= attack.damage
        switch (attack.name) {

            case "Fireball":
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

                // renderedSprites.push(fireball);
                renderedSprites.splice(1, 0, fireball)
                if (this.isEnemy) {
                    gsap.to(fireball.position, {
                        x: recipient.position.x + 35,
                        y: recipient.position.y + 10,
                        onComplete: () => {
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
                            renderedSprites.splice(1, 1)
                        }
                    })
                } else {
                    gsap.to(fireball.position, {
                        x: recipient.position.x + 35,
                        y: recipient.position.y + 45,
                        onComplete: () => {
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

