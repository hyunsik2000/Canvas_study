const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const dpr = window.devicePixelRatio 
//dpr이 1 이면 1px에 정사각형 1개가 들어가 있는 그림
//dpr이 2 이면 1px에 정사각형 4개가 들어가 있는 그림 <-- 더 선명함함 

const canvasWidth = innerWidth
const canvasHeight = innerHeight

canvas.style.width = canvasWidth + 'px'
canvas.style.height = canvasHeight + 'px'

canvas.width = canvasWidth * dpr
canvas.height = canvasHeight * dpr
ctx.scale(dpr,dpr)
//따라서 canvas 기존 가로 세로 값에 dpr을 곱하고 ctx.scale(dpr,dpr)

class Particle {
    constructor(x, y, radius, vy) {
        this.x = x
        this.y = y
        this.radius = radius
        this.vy =vy
        this.acc = 1.01
    }
    update(){
        this.vy *= this.acc
        this.y += this.vy
    }
    draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI / 180 * 360)
        ctx.fillStyle = 'orange'
        ctx.fill()
        ctx.closePath()
    }
}

const x = 100
const y = 100
const radius = 50
const particle = new Particle(x,y,radius)
const TOTAL = 50
const randomNumBetween = (min, max) => {
    return Math.random() * (max - min + 1) + min
}
let particles = []

for (let i = 0; i < TOTAL; i++){
    const x = randomNumBetween(0, canvasWidth)
    const y = randomNumBetween(0, canvasHeight)
    const vy = randomNumBetween(1,5)
    const radius = randomNumBetween(50 , 100)
    const particle = new Particle(x, y, radius, vy)
    particles.push(particle)
}


let interval = 1000/ 60
let now, delta
let then = Date.now()

function animate() {
    window.requestAnimationFrame(animate)
    now = Date.now()
    delta = now - then

    if (delta < interval) return 0

    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    particles.forEach(particle => {
        particle.update()
        particle.draw()
        if(particle.y - particle.radius > canvasHeight) {
            particle.y = -particle.radius * 2
            particle.x = randomNumBetween(0, canvasWidth)
            particle.vy = randomNumBetween(1,20)
            particle.radius = randomNumBetween(50 , 100)
        }
    })

    then = now - (delta % interval)
}

animate()