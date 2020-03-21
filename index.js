const scaleCoords = coord => Math.floor(coord * coordScaleFactor) / coordScaleFactor;

let renders = 0; // renders count.
let frames = 0; // frame count
let t = 0; // time
let blank = blankGraph(); // initial black graph rendered pixels texture
let renderPixelsTex = blankGraph();

const doDraw = () => {
  if(doRender) {
    for (let i = 0; i < rendersPerFrame; i++) {
      p1[0] += wave1Params[1]*timeStep;
      p1[1] += wave1Params[2]*timeStep;

      p2[0] += wave2Params[1]*timeStep;
      p2[1] += wave2Params[2]*timeStep;

      
      const r = Math.sqrt(
        (p1[0]- p2[0])*(p1[0] - p2[0]) + 
        (p2[0] - p2[1])*(p2[0] - p2[1])
        )

      const F = G*wave1Params[0]*wave2Params[0] / (r*r);
      const a1 =  F / wave1Params[0];
      const a2 =  - F / wave2Params[0];

      const cos = Math.abs(p2[0] - p1[0]) / r;
      const sin = Math.abs(p2[1] - p2[0]) / r;
      
      wave1Params[1] += a1 * cos;
      wave1Params[2] += a1 * sin;

      wave2Params[1] += a2 * cos;
      wave2Params[2] += a2 * sin;

      renderPixelsTex = render(p1, p2, wave1Params, wave2Params, getTex(blank), coordScaleFactor, pointSize);
      
      t += timeStep;
      renders++; // count the rendered frame
    }
    display(renderPixelsTex);
    frames++;
  }
  window.requestAnimationFrame(doDraw);
}

//  Rendering--------------------------------------

document.getElementById('start-stop').onclick = e => {
  e.preventDefault();

  doRender = !doRender;
  e.target.innerText = e.target.innerText === 'Start' ? 'Stop' : 'Start';
  document.getElementById('change').disabled = !document.getElementById('change').disabled;
}

document.getElementById('restart').onclick = e => {
  e.preventDefault();

  doRender = false;
  renderPixelsTex = blankGraph();
  doRender = true;
  document.getElementById('start-stop').innerText = 'Stop';
  document.getElementById('change').disabled = true;
}

document.getElementById('change').onclick = e => {
  e.preventDefault();

  timeStep = document.getElementById('timeStep').value;
  rendersPerFrame = document.getElementById('rend-per-frame').value;
  pointSize = document.getElementById('pt-size').value;
  coordScaleFactor = document.getElementById('coord-scale-factor').value;
}

document.getElementById('blank').onclick = e => {
  e.preventDefault();

  doRender = false;
  document.getElementById('start-stop').innerText = 'Start';
  document.getElementById('change').disabled = false;
  renderPixelsTex = blankGraph();
  display(renderPixelsTex);
}

display(renderPixelsTex);
window.requestAnimationFrame(doDraw);

setInterval(() => {
  document.getElementById('frames').innerHTML = `
  ${renders} renders per second <br>
  ${frames} fps <br>
  time step per render: ${timeStep} <br>
  rendersPerFrame: ${rendersPerFrame} <br>
  dimensions: ${dim} x ${dim} <br>
  coordScaleFactor: ${coordScaleFactor} <br>
  pointSize: ${pointSize} <br>
`;
  frames = 0;
  renders = 0;
}, 1000)