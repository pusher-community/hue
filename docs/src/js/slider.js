var theSelector = document.getElementsByClassName('Toggle-shim')[0]
let options = {
  inertia: 0.99,
  onDragStop: function() {
    hueClientNewColor(this.angle)
  }
}

new Propeller(theSelector, options)

let hueClientNewColor = (angle) => {
  console.log(getColor(angle))
  huePulse(getColor(angle))
  // getColor(angle)
}

let getColor = (angle) => {

  var x = Math.round(angle);
  switch (true) {
    case (x > 0 && x < 75):
      return "green"
    case (x > 75 && x < 135):
      return "blue"
    case (x > 135 && x < 175):
      return "purple"
    case (x > 175 && x < 220):
      return "pink"
    case (x > 220 && x < 300):
      return "orange"
    case (x > 300):
      return "green"
  }

}

let huePulse = (color) => {
  let pulseElement = document.querySelectorAll('.Toggle-ring')[0]

  pulseElement.style.borderColor = color
  pulseElement.classList.add('is-animating')

  // This should really be done on an animationend event
  setTimeout(() => {
    pulseElement.classList.remove('is-animating')
  }, 2000)
}
