const canvas = document.getElementById('main-canvas');
const gpu = new GPU({
  canvas,
  mode: 'gpu'
})

let dim = 1000, // dimensions
  centerX = dim / 2,
  centerY = dim / 2,
  bg = 0, // backgroundColor: 0 to 1(greyscale)
  color = 1, // color of the point: 0 to 1(greyscale)
  timeStep = 0.01, // Time Step
  doRender = false,
  rendersPerFrame = 1,
  pi = Math.PI,
  pointSize = 0.1, // Size of the point/brush
  coordScaleFactor = 30;// Coordinates are multiplied by this(makes the graphs bigger or smaller)
  G = 0.05; // Universal Gravitational Const

document.getElementById('timeStep').value = timeStep;
document.getElementById('rend-per-frame').value = rendersPerFrame;
document.getElementById('pt-size').value = pointSize;
document.getElementById('coord-scale-factor').value = coordScaleFactor;

const wave1Params = [100, 0, 0]; // Mass, Vx, Vy
const wave2Params = [100, 0, 0];

let p1 = [-25, 0]; // Initial Position
let p2 = [0, 0];