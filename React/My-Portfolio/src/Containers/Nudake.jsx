import { useEffect, useRef } from "react";
import throttle from 'lodash/throttle';
import gsap from 'gsap';
import "../Style/Containers/Nudake.css";
import image1 from "../Asset/newjeans1.jpg";
import image2 from "../Asset/newjeans2.jpg";
import image3 from "../Asset/newjeans3.jpg";
import { getDistance, getAngle, getScrupedPercent, drawImageCenter } from "../Utils/Utils";

const Nudake = () => {
    const canvasRef = useRef(null)

    useEffect(()=>{
        const canvas = canvasRef.current
        const canvasParent = canvas.parentNode
        const ctx = canvas.getContext('2d')

        const imageSrcs = [image1, image2, image3]
        const loadedImages = []
        let imageIndex = 0
        let prevPos = { x: 0, y: 0}
        let isChanging = false

        let canvasWidth, canvasHeight

        function resize() {
            canvasWidth = canvasParent.clientWidth
            canvasHeight = canvasParent.clientHeight
            canvas.style.width = canvasWidth + "px"
            canvas.style.height = canvasHeight + "px"
            canvas.width = canvasWidth
            canvas.height = canvasHeight

            preloadImage().then(()=> drawImage())
        }

        function preloadImage() {
            return new Promise((resolve, reject) => {
                let loaded = 0
                imageSrcs.forEach(src => {
                    const img = new Image()
                    img.src = src
                    img.onload = () => {
                        loaded += 1
                        loadedImages.push(img)
                        if (loaded === imageSrcs.length) return resolve()
                    }
                })
            })
        }

        function drawImage(){
            isChanging = true
            const image = loadedImages[imageIndex]
            const firstDrawing = ctx.globalCompositeOperation === 'source-over'

            gsap.to(canvas, { opacity: 0, duration: firstDrawing ? 0 : 1, onComplete: () => {
                canvas.style.opacity = 1
                ctx.globalCompositeOperation = 'source-over' //globalCompositeOperation 에 대해 문서를 한번 훑어보자
                drawImageCenter(canvas, ctx, image)
    
                const nextImage = imageSrcs[(imageIndex + 1) % imageSrcs.length]
                canvasParent.style.backgroundImage = `url(${nextImage})`
                prevPos = null

                isChanging = false
            } })
        }

        function onMouseDown(e) {
            if(isChanging) return
            window.addEventListener('mouseup', onMouseUp)
            window.addEventListener('mousedown', onMouseDown)
            prevPos = {x: e.offsetX, y: e.offsetY}
        }
        function onMouseUp() {
            window.removeEventListener('mouseup', onMouseUp)
            window.removeEventListener('mousedown', onMouseDown)
        }
        function onMouseMove(e) {
            if(isChanging) return
            drawCircles(e)
            checkPercent()
        }

        function drawCircles(e) {
            const nextPos = { x: e.offsetX, y: e.offsetY}
            if(!prevPos) prevPos = nextPos
            const dist = getDistance(prevPos, nextPos)
            const angle = getAngle(prevPos, nextPos)

            for(let i = 0; i < dist; i++){
                const x = prevPos.x + Math.cos(angle) * i
                const y = prevPos.y + Math.sin(angle) * i

            ctx.globalCompositeOperation = 'destination-out' //globalCompositeOperation 에 대해 문서를 한번 훑어보자
            ctx.beginPath()
            ctx.arc(x,y , canvasWidth / 15, 0, Math.PI * 2)
            ctx.fill()
            ctx.closePath()
        }

            prevPos = nextPos
        }

        const checkPercent = throttle(() => {
            const percent = getScrupedPercent(ctx, canvasWidth, canvasHeight)
            if (percent > 30){
                imageIndex  = (imageIndex + 1) % imageSrcs.length
                drawImage()
            }
        }, 500)

        window.addEventListener('mousemove', onMouseMove)
        window.addEventListener('resize', resize) // 얘도 cleanUp 필수수
        resize()
  
        
        return () => {
            window.removeEventListener('resize', resize)
            window.removeEventListener('mousemove', onMouseMove)
        }
    },[])

    return(
        <div className="nudake">
            <canvas ref={canvasRef}/>
        </div>
    )
}

export default Nudake