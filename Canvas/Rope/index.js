import App from "./Js/App.js"
import Vector from "./Js/Vector.js"

window.addEventListener('load', ()=> {
    const app = new App()
    app.render()
})

const v1 = new Vector(100,100)
const v2 = new Vector(50,50)



const v3 = Vector.add(v1,v2)

console.log(v3)
