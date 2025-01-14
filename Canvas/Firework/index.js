import CanvasOption from "./Js/CanvasOption.js"
import Particle from "./Js/Particle.js"
import Spark from "./Js/Spark.js"
import Tail from "./Js/Tail.js"
import { hypotenuse, randomNumBetween } from "./Js/Utils.js"

class Canvas extends CanvasOption {
    constructor() {
        super()

        this.tails = []
        this.particles = []
        this.sparks = []
    }

    init() {
        this.canvasWidth = innerWidth
        this.canvasHeight = innerHeight
        this.canvas.width = this.canvasWidth * this.dpr
        this.canvas.height = this.canvasHeight * this.dpr
        this.ctx.scale(this.dpr, this.dpr)
    
        this.canvas.style.width = this.canvasWidth + 'px'
        this.canvas.style.height = this.canvasHeight + 'px'

        this.createParticles()
    }

    createTail() {
        const x = randomNumBetween(this.canvasWidth * 0.2, this.canvasWidth * 0.8)
        const vy = this.canvasHeight * randomNumBetween(0.01, 0.03) * -1
        const color = 180
        this.tails.push(new Tail(x, vy, color)) 
    }

    createParticles(x, y, color) {
        console.log("Creating particles with color:", color);
        const PARTICLE_NUM = randomNumBetween(100, 500);
        for (let i = 0; i < PARTICLE_NUM; i++) {
            const r = randomNumBetween(2, 100) * hypotenuse(innerWidth, innerHeight) * 0.00005;
            const angle = Math.PI / 180 * randomNumBetween(0, 360);
            const vx = r * Math.cos(angle);
            const vy = r * Math.sin(angle);
            const opacity = randomNumBetween(0.6, 0.9);
            this.particles.push(new Particle(x, y, vx, vy, opacity, color)); // 동일한 colorDeg를 전달
        }
    }

    render() {
        let now, delta
        let then = Date.now()

        const frame = () => {
            requestAnimationFrame(frame)
            now = Date.now()
            delta = now - then
        if (delta < this.interval) return
        this.ctx.fillStyle = this.bgColor + '10'
        this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight)
        
        
        if(Math.random() < 0.01) this.createTail()

        this.tails.forEach((tail,index) => {
            tail.update()
            tail.draw()

            for (let i = 0 ; i < Math.round(-tail.vy * 0.5); i++){
                const vx = randomNumBetween(-5, 5) * 0.05
                const vy = randomNumBetween(-5, 5) * 0.05
                const opacity = Math.min(-tail.vy, 0.5)
                this.sparks.push(new Spark(tail.x, tail.y, vx, vy, opacity, tail.color))
            }
            if(tail.vy > -0.1) {
                this.createParticles(tail.x, tail.y, tail.color)
                this.tails.splice(index,1)
            }
        })
        
        this.particles.forEach((particle,index) => {
                particle.update()
                particle.draw()

                if(Math.random() < 0.05){
                    this.sparks.push(new Spark(particle.x, particle.y, 0,0, 0.3, 45))
                }
                    if (particle.opacity <= 0){
                    this.particles.splice(index, 1)
                }
            })

        this.sparks.forEach((spark, index) => {
                spark.update()
                spark.draw()

                if(spark.opacity < 0) this.sparks.splice(index, 1)
        })
    
            then = now - (delta % this.interval)
        }
    requestAnimationFrame(frame)
    }
}

const canvas = new Canvas()

window.addEventListener('load', () => {
   canvas.init()
   canvas.render()
})

window.addEventListener('resize', () => {
    canvas.init()
})
