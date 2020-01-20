'use strict'
function FloatingElement(t) {
  var i = this,
    n = t.selector,
    e = t.limits,
    o = t.motion,
    s = t.rotation,
    r = document.querySelectorAll(n)
  r ||
    console.error(
      'Selecor incorrecto'
    ), (this.direction = this.config.directions[
    this.random(0, 4)
  ]), (this.limits = e), (this.rotation = s), (this.motion = o), (this.initialMotion = o), r.forEach(
    function(t) {
      t.addEventListener('mousemove', i.mouseListener.bind(i)), i.motionEngine(
        t
      )
    }
  )
}
;(exports.__esModule = !0), (exports.default = void 0), (FloatingElement.prototype.random = function(
  t,
  i
) {
  return Math.floor(Math.random() * (i - t + 1) + t)
}), (FloatingElement.prototype.map = function(t, i, n, e, o) {
  return (t - i) / (n - i) * (o - e) + e
}), (FloatingElement.prototype.lerp = function(t, i, n) {
  return (1 - n) * t + n * i
}), (FloatingElement.prototype.config = {
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
  incrementX: 3e-4,
  incrementY: 1e-4,
  amount: 200,
  mutatedX: 0,
  mutatedY: 0
}), (FloatingElement.prototype.nextDirection = function(t, i, n) {
  var e = this.limits
  return t > e[0] && t < e[1] && !n.includes('BACKWARDS')
    ? 'FORWARDS'
    : t < e[0] && t > e[1] && !n.includes('FORWARDS')
      ? 'BACKWARDS'
      : t > e[1] && !n.includes('FIXED-X')
        ? 'FIXED-X-BACKWARDS'
        : i > e[1] && !n.includes('FIXED-Y')
          ? 'FIXED-Y-BACKWARDS'
          : t < e[0] && !n.includes('FIXED-X')
            ? 'FIXED-X-FORWARDS'
            : i > e[0] && !n.includes('FIXED-Y')
              ? 'FIXED-Y-FORWARDS'
              : this.config.directions[this.random(0, 4)]
}), (FloatingElement.prototype.motionEngine = function(t) {
  var i,
    n = this,
    e = this.rotation,
    o = this.direction,
    s = this.config,
    r = s.incrementX,
    a = s.incrementY,
    c = s.amount,
    f = this.lerp(r, this.config.offsetX, c),
    h = this.lerp(a, this.config.offsetY, c)
  switch ((
    e && (i = this.lerp(a + r, this.config.offsetY + this.config.offsetX, 100)),
    (t.style.transform = i
      ? '\n      translate3d(\n        ' +
        (this.config.mutatedX + f) +
        '%, \n        ' +
        (this.config.mutatedY + h) +
        '%,\n        0 \n      )\n      rotate(' +
        (i + this.rotation) +
        'deg)\n      '
      : '\n      translate3d(\n        ' +
        (this.config.mutatedX + f) +
        '%, \n        ' +
        (this.config.mutatedY + h) +
        '%,\n        0 \n      )\n      '),
    this.motion ||
      (
        (this.direction = this.nextDirection(f, h, o)),
        (this.motion = this.initialMotion)
      ),
    o
  )) {
    case 'FORWARDS':
      ;(this.config.offsetX += r), (this.config.offsetY += a)
      break
    case 'BACKWARDS':
      ;(this.config.offsetX -= r), (this.config.offsetY -= a)
      break
    case 'FIXED-X-BACKWARDS':
      this.config.offsetX -= r
      break
    case 'FIXED-X-FORWARDS':
      this.config.offsetX += r
      break
    case 'FIXED-Y-BACKWARDS':
      this.config.offsetY -= a
      break
    case 'FIXED-Y-FORWARDS':
      this.config.offsetY += a
  }
  ;(this.motion -= 1), window.requestAnimationFrame(function() {
    return n.motionEngine(t)
  })
}), (FloatingElement.prototype.mouseListener = function(t) {
  var i = t.target,
    n = t.clientX,
    e = t.clientY,
    o = this.limits
  if ('IMG' === i.tagName) {
    var s = i.getBoundingClientRect(),
      r = s.x,
      a = s.y,
      c = s.height,
      f = s.width
    ;(this.config.mutatedX = this.map(
      n - r,
      r,
      r + f,
      o[0] + 2,
      o[1] - 2
    )), (this.config.mutatedY = this.map(e - a, a, a + c, o[0] + 2, o[1] - 2))
  }
})
var _default = FloatingElement
exports.default = _default
