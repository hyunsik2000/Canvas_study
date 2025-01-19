import { useEffect, useRef } from "react";
import lodash from 'lodash/throttle';
import "../Style/Containers/Nudake.css";
import image1 from "../Asset/newjeans1.jpg";
import image2 from "../Asset/newjeans2.jpg";
import image3 from "../Asset/newjeans3.jpg";
import { getDistance, getAngle, getScrupedPercent } from "../Utils/Utils";
import throttle from "lodash/throttle";

const Nudake = () => {
    const canvasRef = useRef(null)

    useEffect(()=>{
        const canvas = canvasRef.current
        const canvasParent = canvas.parentNode
        const ctx = canvas.getContext('2d')

        const imageSrcs = [image1, image2, image3]
        let imageIndex = 0
        let prevPos = { x: 0, y: 0}

        let canvasWidth, canvasHeight

        function resize() {
            canvasWidth = canvasParent.clientWidth
            canvasHeight = canvasParent.clientHeight
            canvas.style.width = canvasWidth + "px"
            canvas.style.height = canvasHeight + "px"
            canvas.width = canvasWidth
            canvas.height = canvasHeight

            drawImage()
        }

        function drawImage(){
            ctx.clearRect(0, 0, canvasWidth, canvasHeight)
            const image = new Image()
            image.src = imageSrcs[imageIndex]
            image.onload = () => {
            ctx.globalCompositeOperation = 'source-over' //globalCompositeOperation 에 대해 문서를 한번 훑어보자
            ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight)

            const nextImage = imageSrcs[(imageIndex + 1) % imageSrcs.length]
            canvasParent.style.backgroundImage = `url(${imageSrcs[nextImage]})`
            }
        }

        function onMouseDown(e) {
            console.log("onMouseDown")
            window.addEventListener('mouseup', onMouseUp)
            window.addEventListener('mousedown', onMouseDown)
            prevPos = {x: e.offsetX, y: e.offsetY}
        }
        function onMouseUp() {
            console.log("onMouseUp")
            window.removeEventListener('mouseup', onMouseUp)
            window.removeEventListener('mousedown', onMouseDown)
        }
        function onMouseMove(e) {
            console.log("onMouseMove")
            drawCircles(e)
            checkPercent()
        }

        function drawCircles(e) {
            const nextPos = { x: e.offsetX, y: e.offsetY}
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
            if (percent > 50){
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