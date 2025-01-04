const canvas = document.querySelector('canvas')

const ctx = canvas.getContext('2d')

const dpr = window.devicePixelRatio 
//dpr이 1 이면 1px에 정사각형 1개가 들어가 있는 그림
//dpr이 2 이면 1px에 정사각형 4개가 들어가 있는 그림 <-- 더 선명함함 

const canvasWidth = 300
const canvasHeight = 300

canvas.style.width = canvasWidth + 'px'
canvas.style.height = canvasHeight + 'px'

canvas.width = canvasWidth * dpr
canvas.height = canvasHeight * dpr
ctx.scale(dpr,dpr)
//따라서 canvas 기존 가로 세로 값에 dpr을 곱하고 ctx.scale(dpr,dpr)
