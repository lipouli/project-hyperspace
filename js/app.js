
function createStar() {
  var newStar = {
    x: round(random(window.innerWidth)),
    y: round(random(window.innerHeight)),
    size: 10,
    intensity: 0.05
  };
  return newStar;
}

function createStarField(nb) {
  var starField = [];
  for (let i = 0; i < nb ; i++){
    starField.push(createStar());
  }
  return starField;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  starField = createStarField(300);
  count = 0;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  starField = createStarField(300);
  redraw();
}


function draw() {
  clear();
  background(0);
  starField.forEach(star => drawStar(star));

}

function drawStar(star, intensity) {
  let radius = star.size;
  let opacity = 0;
  let variation = round(random(0, 1));
  if(!variation){
    star.intensity = (star.intensity === 0.05) ? star.intensity + 0.01 : star.intensity - 0.01;
  } else {
    star.intensity = (star.intensity === 0.09) ? star.intensity - 0.01 : star.intensity + 0.01;
  }
  for (let r = radius; r > 0; --r){
    fill(`rgba(255, 255, 255, ${opacity})`);
    ellipse(star.x, star.y, r, r);
    opacity += 1/star.size * star.intensity;
  }
}
