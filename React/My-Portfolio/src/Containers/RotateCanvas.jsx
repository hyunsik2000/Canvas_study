import { Engine, Runner, Render, Mouse, MouseConstraint, Composite, Bodies, Events } from 'matter-js';
import "../Style/Containers/RotateCanvas.css";
import { useEffect, useRef, useState } from 'react';

import IconAFRAME from "../Asset/icon_AFRAME.png";
import IconCSS from "../Asset/icon_CSS.png";
import IconHTML from "../Asset/icon_HTML.png";
import IconJS from "../Asset/icon_JS.png";
import IconREACT from "../Asset/icon_REACT.png";
import IconTHREE from "../Asset/icon_THREE.png";

const data = {
    'JS': { title: 'Javascript', level: 4, desc: '자바스크립트에 대한 설명이라고 할 수 있습니다. 자바스크립트에 대한 설명. 자바스크립트에 대한 설명.' },
    'REACT': { title: 'React.js', level: 5, desc: 'React에 대한 설명이라고 할 수 있습니다. React에 대한 설명. React에 대한 설명.' },
    'CSS': { title: 'CSS/SASS', level: 3, desc: 'CSS에 대한 설명이라고 할 수 있습니다. CSS에 대한 설명. CSS에 대한 설명.' },
    'AFRAME': { title: 'Aframe.js', level: 4, desc: 'AFRAME에 대한 설명이라고 할 수 있습니다. AFRAME에 대한 설명. AFRAME에 대한 설명.' },
    'THREE': { title: 'Three.js', level: 2, desc: 'THREE에 대한 설명이라고 할 수 있습니다. THREE에 대한 설명. THREE에 대한 설명.' },
    'HTML': { title: 'HTML', level: 5, desc: 'HTML에 대한 설명이라고 할 수 있습니다. HTML에 대한 설명. HTML에 대한 설명.' },
  }

const RotateCanvas = () => {
    const [selected, setSelected] = useState(data['JS'])


    const canvasRef = useRef(null) 
    useEffect(() => {
        const canvas = canvasRef.current
        const cw = 1000
        const ch = 1000

        const gravityPower = 0.5
        let gravityDeg = 0

        let engine, render, runner, mouse, mouseConstraint

        initScene()
        initMouse()
        initGround()
        initImageBoxes()

        // Events.on(runner, 'tick', () => {
        //     gravityDeg += 0.5
        //     engine.world.gravity.x = gravityPower * Math.cos(Math.PI / 180 * gravityDeg)
        //     engine.world.gravity.y = gravityPower * Math.sin(Math.PI / 180 * gravityDeg)
        // })

        function initScene() {
            engine = Engine.create()
            render = Render.create({
                canvas: canvas,
                engine: engine,
                options: {
                    width: cw,
                    height: ch,
                    wireframes: false,
                    background: "#1b1b19"
                }
            })
            runner = Runner.create()
    
            Render.run(render)
            Runner.run(runner, engine)
        }

        function initMouse() {
            mouse = Mouse.create(canvas)
            mouseConstraint = MouseConstraint.create(engine, {
                mouse: mouse
            })
            Composite.add(engine.world, mouseConstraint)
        }
        function initGround() {
            const segments = 32
            const deg = (Math.PI * 2) / segments
            const width = 50
            const radius = cw / 2 + width / 2 

            const height = radius * Math.tan(deg / 2) * 2

            for(let i = 0; i < segments; i++){
                const seta = deg * i
                const x = radius * Math.cos(seta) + cw / 2
                const y = radius * Math.sin(seta) + ch / 2
                addRect(x, y, width, height, { isStatic: true, angle: seta})
            }
        }
        function initImageBoxes() {
            const scale = 0.7
            const t1 = { w: 250 * scale, h: 250 * scale}
            const t2 = { w: 732 * scale, h: 144 * scale}
            addRect(cw / 2, ch / 2, t1.w, t1.h, {
                chamfer: {radius: 20},
                render : { sprite : { texture: IconJS, xScale: scale, yScale: scale }}})
            addRect(cw / 2 - t1.w, ch / 2, t1.w, t1.h, {
                chamfer: {radius: 20},
                render : { sprite : { texture: IconCSS, xScale: scale, yScale: scale }}})
            addRect(cw / 2 + t1.w, ch / 2, t1.w, t1.h, {
                chamfer: {radius: 20},
                render : { sprite : { texture: IconHTML, xScale: scale, yScale: scale }}})
            addRect(cw / 2, ch / 2 + t1.h, t1.w, t1.h, {
                chamfer: {radius: 20},
               render : { sprite : { texture: IconTHREE, xScale: scale, yScale: scale }}})
            addRect(cw / 2, ch / 2 + t1.h, t1.w, t1.h, {
                chamfer: {radius: 75},
                render : { sprite : { texture: IconREACT, xScale: scale, yScale: scale }}})          
            addRect(cw / 2, ch / 2 - t2.h, t2.w, t2.h, {
                chamfer: {radius: 20},
                render : { sprite : { texture: IconAFRAME, xScale: scale, yScale: scale }}})          
        }
        function addRect(x, y, w, h, options = {}) {
            const rect = Bodies.rectangle(x, y, w, h, options)
            Composite.add(engine.world, rect)
        }
    },[])

    return (
        <div className="rotate-canvas-wrapper">
        <canvas ref={canvasRef}></canvas>
        <aside>
          <h1>{selected.title}</h1>
          <h1>👀👀👀👀👀</h1>
          <p>{selected.desc}</p>
        </aside>
        </div>
    )
}

export default RotateCanvas