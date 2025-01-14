import CanvasOption from "./CanvasOption.js";
import { randomNumBetween } from "./Utils.js";

export default class Tail extends CanvasOption {
    constructor(x, vy, color){
        super()
        this.x = x
        this.y = this.canvasHeight
        this.vy = vy
        this.angle = randomNumBetween(0,2)
        this.color = color
        this.friction = 0.97
    }
    update(){
        this.vy *= this.friction
        this.y += this.vy
        this.angle += 1
        this.x += Math.cos(this.angle) * this.vy * 0.2
        this.opacity = -this.vy * 0.4
    }

    draw(){
        this.ctx.fillStyle = `hsla(${this.color}, 100%, 65%, ${this.opacity})`
        this.ctx.beginPath()
        this.ctx.arc(this.x, this.y, 1, 0, Math.PI * 2)
        this.ctx.fill()
        this.ctx.closePath()
    }
}