function FloatingElement({ selector, limits, motion, rotation, speed }) {
  const nodes = document.querySelectorAll(selector)
  if (!nodes) {
    console.error('Selecor incorrecto')
  }
  this.direction = this.config.directions[this.random(0, 4)]
  this.limits = limits
  this.rotation = rotation
  this.motion = motion
  this.initialMotion = motion
  this.speed = speed
  nodes.forEach(node => {
    node.addEventListener('mousemove', this.mouseListener.bind(this))
    this.motionEngine(node)
  })
}

FloatingElement.prototype.random = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

FloatingElement.prototype.map = function(value, start1, stop1, start2, stop2) {
  return (value - start1) / (stop1 - start1) * (stop2 - start2) + start2
}

FloatingElement.prototype.lerp = function(start, end, amt) {
  return (1 - amt) * start + amt * end
}

FloatingElement.prototype.config = {
  offsetX: 0.001,
  offsetY: 0.005,
  directions: [
    'FORWARDS',
    'FIXED-X-FORWARDS',
    'FIXED-Y-FORWARDS',
    'BACKWARDS',
    'FIXED-X-BACKWARDS',
    'FIXED-Y-BACKWARDS'
  ],
  incrementX: 0.0003,
  incrementY: 0.0001,
  amount: 200,
  mutatedX: 0,
  mutatedY: 0
}

FloatingElement.prototype.nextDirection = function(x, y, previousDirection) {
  const { limits } = this
  if (
    x > limits[0] &&
    x < limits[1] &&
    !previousDirection.includes('BACKWARDS')
  ) {
    return 'FORWARDS'
  }
  if (
    x < limits[0] &&
    x > limits[1] &&
    !previousDirection.includes('FORWARDS')
  ) {
    return 'BACKWARDS'
  }
  if (x > limits[1] && !previousDirection.includes('FIXED-X')) {
    return 'FIXED-X-BACKWARDS'
  }
  if (y > limits[1] && !previousDirection.includes('FIXED-Y')) {
    return 'FIXED-Y-BACKWARDS'
  }
  if (x < limits[0] && !previousDirection.includes('FIXED-X')) {
    return 'FIXED-X-FORWARDS'
  }
  if (y > limits[0] && !previousDirection.includes('FIXED-Y')) {
    return 'FIXED-Y-FORWARDS'
  }
  return this.config.directions[this.random(0, 4)]
}

FloatingElement.prototype.motionEngine = function(element) {
  let { rotation, direction } = this
  const { incrementX, incrementY, amount } = this.config
  const nextX = this.lerp(incrementX, this.config.offsetX, amount)
  const nextY = this.lerp(incrementY, this.config.offsetY, amount)
  let nextRotation

  if (rotation) {
    nextRotation = this.lerp(
      incrementY + incrementX,
      this.config.offsetY + this.config.offsetX,
      100
    )
  }

  if (nextRotation) {
    element.style.transform = `
      translate3d(
        ${this.config.mutatedX + nextX}%, 
        ${this.config.mutatedY + nextY}%,
        0 
      )
      rotate(${nextRotation + this.rotation}deg)
      `
  } else {
    element.style.transform = `
      translate3d(
        ${this.config.mutatedX + nextX}%, 
        ${this.config.mutatedY + nextY}%,
        0 
      )
      `
  }

  if (!this.motion) {
    this.direction = this.nextDirection(nextX, nextY, direction)
    this.motion = this.initialMotion
  }

  switch (direction) {
    case 'FORWARDS':
      this.config.offsetX += incrementX
      this.config.offsetY += incrementY
      break
    case 'BACKWARDS':
      this.config.offsetX -= incrementX
      this.config.offsetY -= incrementY
      break
    case 'FIXED-X-BACKWARDS':
      this.config.offsetX -= incrementX
      break
    case 'FIXED-X-FORWARDS':
      this.config.offsetX += incrementX
      break
    case 'FIXED-Y-BACKWARDS':
      this.config.offsetY -= incrementY
      break
    case 'FIXED-Y-FORWARDS':
      this.config.offsetY += incrementY
      break
    default:
      break
  }
  this.motion -= this.speed
  window.requestAnimationFrame(() => {
    setTimeout(() => {
      this.motionEngine(element)
    }, 20);
  })
}

FloatingElement.prototype.mouseListener = function({
  target,
  clientX,
  clientY
}) {
  const { limits } = this
  const { width, height, x, y } = target.getBoundingClientRect()
  const isOnXMinLimit = () => this.config.mutatedX > this.limits[0]
  const isOnXMaxLimit = () => this.config.mutatedX < this.limits[1]
  const isOnYMinLimit = () => this.config.mutatedY > this.limits[0]
  const isOnYMaxLimit = () => this.config.mutatedY < this.limits[1]

  if (target.tagName === 'IMG') {
    // Left
    if (clientX - x < width / 2 && isOnXMinLimit()) {
      this.config.mutatedX = this.map(
        clientX - x,
        x,
        x + width,
        1,
        3
      )
    }

    // Right
    if (clientX - x > width / 2 && isOnXMaxLimit()) {
      this.config.mutatedX = this.map(
        clientX - x,
        x,
        x + width,
        1,
        3
      )
    }

    // Top
    if (clientY - y < height / 2 && isOnYMinLimit()) {
      this.config.mutatedY = this.map(
        clientY - y,
        y,
        y + height,
        1,
        3
      )

    }

    // Bottom
    if (clientY - y > height / 2 && isOnYMaxLimit()) {
      this.config.mutatedY = this.map(
        clientY - y,
        y,
        y + height,
        1,
        3
      )
    }
  }
}

export default FloatingElement
