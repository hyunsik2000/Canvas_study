import { hexToRgb, randomNumBetween } from "./Utils.js"

export default class Particle {
    constructor(x,y, deg, colors){
        this.angle = Math.PI /180 * randomNumBetween(deg - 30, deg + 30)
        this.r = randomNumBetween(10, 30)
        this.x = x * innerWidth
        this.y = y * innerHeight

        this.vx = this.r * Math.cos(this.angle)
        this.vy = this.r * Math.sin(this.angle)

        this.friction = 0.97
        this.gravity = 0.4

        this.width = 12
        this.height = 12

        this.opacity = 1

        this.widthDelta = randomNumBetween(0,360)
        this.heightDelta = randomNumBetween(0,360)

        this.rotation = randomNumBetween(0,360)
        this.rotationDelta = randomNumBetween(-1, 1)

        this.colors = colors || ['#FF577F', '#FF884B', '#FFD384', '#FFF9B0']
        this.color = hexToRgb(
            this.colors[Math.floor(randomNumBetween(0, this.colors.length - 1))]
        )
    }
    update() {
        this.vy += this.gravity

        this.vx *= this.friction
        this.vy *= this.friction

        this.x += this.vx
        this.y += this.vy
        
        this.opacity -= 0.01

        this.widthDelta += randomNumBetween(2,10)
        this.heightDelta += randomNumBetween(2,10)

        this.rotation += this.rotationDelta
    }
    draw(ctx) {
        ctx.translate(this.x + this.width * 2,this.y + this.height * 2)
        ctx.rotate(Math.PI/ 180 * this.rotation)
        ctx.translate(-this.x - this.width, -this.y - this.height)

        ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`
        ctx.fillRect(
            this.x,
            this.y,
            this.width * Math.cos(Math.PI / 180 * this.widthDelta),
            this.height * Math.sin(Math.PI / 180 * this.heightDelta)
        )
        ctx.resetTransform()
    }
}