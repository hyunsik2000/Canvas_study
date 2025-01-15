import { randomNumberBetween } from "./Utils.js"

export default class Particle {
    constructor() {
        this.rFriction = 0.98
        this.rAlpha = randomNumberBetween(0, 5)
        this.r = innerHeight / 4

        this.angleFriction = 0.98
        this.angleAlpha = randomNumberBetween(1,2)
        this.angle = randomNumberBetween(0,360)
        this.opacity = randomNumberBetween(0.3 , 1)
        
    }
    update() {
        this.rAlpha *= this.rFriction
        this.r += this.rAlpha

        this.angle += this.angleAlpha
        this.angleAlpha *= this.angleFriction


        this.x = innerWidth / 2 + this.r * Math.cos(Math.PI / 180 * this.angle)
        this.y = innerHeight / 2 + this.r * Math.sin(Math.PI / 180 * this.angle)
        
        this.opacity -= 0.01
    }
    draw(ctx) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, 1, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`
        ctx.fill()
        ctx.closePath()
    }
}