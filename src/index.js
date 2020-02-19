import FloatingElement from './FloatingElement'

// const n = new FloatingElement({
//   selector: '.item-motion',
//   limits: [-5, 5],
//   // limits: [-5, 5],
//   motion: 100,
//   rotation: 0,
//   speed: 1
// })

const n2 = new FloatingElement({
    selector: '.item-motion', // Selector del elemento
    limits: [-5, 5], // Limites por los cuales va a flotar con respecto a su ubicacion
    motion: 100, // Cantidad de veces que se anima entre una transicion y otra
    rotation: 0, // Rotacion del elemento
    speed: 1,
})