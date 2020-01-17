import perlinNoise2D from './perlinNoise2D'
const images = document.querySelectorAll('.item-motion')

const triggerMotion = elements => {
  elements.forEach(element => {
    element.style.transition = 'all 2s'
    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseover', handleMouseInOut)
    element.addEventListener('mouseleave', handleMouseInOut)
    handleMotion(element)
  })
}

let isOver = false
let offsetX = 0.001
let offsetY = 0.001
let flag = true
let rotation = 15
let increment = 0.0001
let multiplierX = 1000
let multiplierY = 1000
let shouldRotate

const randomFromInterval = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min)

const handleMotion = element => {
  const { x, y } = element.getBoundingClientRect()
  const nextX = perlinNoise2D(x, offsetX)
  const nextY = perlinNoise2D(offsetY, y)
  let rotate = perlinNoise2D(offsetX, offsetY) + rotation

  if (flag) rotate = -rotate

  const currentState = element.style
  offsetX += increment
  offsetY += increment

  setTimeout(() => {
    window.requestAnimationFrame(() => handleMotion(element))
    flag = !flag
  }, 0)
  console.log(x)

  if (!isOver) {
    element.style.transform = `translate3d(${nextX * multiplierX}%, ${nextY *
      multiplierY}%, 0)`
    return
  }
  shouldRotate = rotate
}

const handleMouseInOut = ({ target, type }) => {
  if (type === 'mouseover') {
    isOver = true
    // target.style.transition = 'all 1s'
  }
  if (type === 'mouseleave') {
    isOver = false
    // target.style.transition = 'all 10s'
  }
}

const handleMouseMove = ({ target, clientX, clientY, screenX }) => {
  console.log(clientX, clientY)
  const {
    x: parentX,
    y: parentY,
    width: parentWidth,
    height: parentHeight
  } = target.parentElement.getBoundingClientRect()
  const xLimit = clientX < parentX + parentWidth && clientX > parentX
  const yLimit = clientY < parentY + parentHeight && clientY > parentY
  console.log(xLimit, yLimit)
  if (xLimit && yLimit) {
    target.style.transform = `translate3d(${clientX -
      parentWidth}px, ${clientY - parentHeight}px, 0)`
  }
}

triggerMotion(images)
