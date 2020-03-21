const render = gpu.createKernel(
  function (p1, p2, particle1Params, particle2Params, pixels, coordScaleFactor, pointSize) 
  {
    let out = pixels[this.thread.y][this.thread.x];
    const x = (this.thread.x - this.constants.centerX) / coordScaleFactor;
    const y = (this.thread.y - this.constants.centerY) / coordScaleFactor;

    const particle1X = p1[0] / coordScaleFactor;
    const particle1Y = p1[1] / coordScaleFactor;

    const particle2X = p2[0] / coordScaleFactor;
    const particle2Y = p2[1] / coordScaleFactor;

    if (Math.abs(particle1X - x) < pointSize && Math.abs(particle1Y - y) < pointSize) out = 0.5;
    if (Math.abs(particle2X - x) < pointSize && Math.abs(particle2Y - y) < pointSize) out = 1;

    return out;
  },
  {
    output: [dim, dim],
    pipeline: true,
    constants: {centerX, centerY, color}
  }
)

// Graphics Kernels
const blankGraph = gpu.createKernel(function() { // Create the starting blank graph with axes
  if ( // Coordinate Axes
    this.thread.x == this.constants.centerX ||
    this.thread.y == this.constants.centerY
  ) return 0.5;
  else return this.constants.bg;
},
{
  output: [dim, dim],
  pipeline: true,
  constants: {centerX, centerY, bg}
})

const getTex = gpu.createKernel(function(tex) { // get a separate texture so that source and destination textures should not match
  return tex[this.thread.y][this.thread.x];
},
{
  output: [dim, dim],
  pipeline: true
})

const display = gpu.createKernel(function(pixels) { // Display the pixels on the canvas
  const color = pixels[this.thread.y][this.thread.x];
  this.color(color, color, color);
},
{
  output: [dim, dim],
  graphical: true
})