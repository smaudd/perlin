import FloatingElement from './FloatingElement'

const n = new FloatingElement({
  selector: '.item-motion',
  limits: [-5, 5],
  motion: 100,
  rotation: 1
})
