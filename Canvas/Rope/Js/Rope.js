import Dot from "./Dot.js"
import Stick from "./Stick.js"

export default class Rope {
    constructor(config){
        this.x = config.x
        this.y = config.y
        this.segments = config.segments || 10
        this.gap = config.gap || 50
        this.iterations = config.iterations || 10

        this.dots = []
        this.sticks = []

        this.create()
    }
    pin(index){
        this.dots[index].pinned = true
    }
    checkPullingOut() {
        const length = this.dots[0].pos.dist(this.dots[1].pos)
        if (length / this.sticks[0].length > 1.2){
            this.dots[0].pinned = false
        }
    }
    create() {
        for(let i = 0; i < this.segments; i++){
            this.dots.push(new Dot(this.x, this.y + i * this.gap))
        }
        for(let i = 0; i < this.segments - 1; i++) {
            this.sticks.push(new Stick(this.dots[i], this.dots[i+1]))
        }
    }
    update(mouse) {
        this.checkPullingOut()
        this.dots.forEach((dot,index) => {
            dot.update(mouse)
        })
        for(let i = 0; i < this.iterations; i++){
        this.sticks.forEach((stick,index) => {
            stick.update()
        })
        }
    }
    draw(ctx) {
        this.dots.forEach((dot,index) => {
            dot.draw(ctx)
        })
        this.sticks.forEach((stick,index) => {
            stick.draw(ctx)
        })
        this.dots[this.dots.length - 1].drawLight(ctx)
    }
}