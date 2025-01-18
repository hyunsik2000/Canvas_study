import { useEffect, useRef } from "react";
import "../Style/Containers/Nudake.css";

const Nudake = () => {
    const canvasRef = useRef(null)

    useEffect(()=>{
        const canvas = canvasRef.current
        const canvasParent = canvas.parentNode
        const ctx = canvas.getContext('2d')

        let canvasWidth, canvasHeight

        function resize() {
            canvasWidth = canvasParent.clientWidth
            canvasHeight = canvasParent.clientHeight
            canvas.style.width = canvasWidth + "px"
            canvas.style.height = canvasHeight + "px"
            canvas.width = canvasWidth
            canvas.height = canvasHeight
        }

        let frameId

        function frame() {
            frameId = requestAnimationFrame(frame)
            ctx.fillRect(100, 100, 100, 100)
        }
        
        window.addEventListener('resize', resize) // 얘도 cleanUp 필수수
        resize()
        requestAnimationFrame(frame) //리액트에서 이런식으로 frame 사용하면 컴포넌트가 언마운트 되도 계속 사용됨 -> cleanUp 필수수
        
        return () => {
            window.removeEventListener('resize', resize)
            cancelAnimationFrame(frameId)
        }
    },[])

    return(
        <div className="nudake">
            <canvas ref={canvasRef}/>
        </div>
    )
}

export default Nudake