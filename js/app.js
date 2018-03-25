var canvasJs = {
  cnv: null,
  starField: null,
  starsWithVariation: null,
  deviation: {
    x: 0,
    y: 0
  }
};

function createStar() {
  var newStar = {
    x: round(random(window.innerWidth)),
    y: round(random(window.innerHeight)),
    z: round(random(1, 5)),
    size: 3,
    intensity: round(random(3, 6))
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
  canvasJs.cnv = createCanvas(windowWidth, windowHeight);
  canvasJs.cnv.mouseMoved(mouseMoveHandler);
  noStroke();
  noFill();
  canvasJs.starField = createStarField(400);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  canvasJs.starField = createStarField(400);
  redraw();
}


function draw() {
  canvasJs.starsWithVariation = chooseStars(10);

  clear();
  background(0);
  canvasJs.starField.forEach(star => drawStar(star));
}

function chooseStars(nbOfStar) {
  let starChoosed = [];
  for (let i = 0; i < nbOfStar; i++){
    starChoosed.push(canvasJs.starField[round(random(0, canvasJs.starField.length - 1))]);
  }
  return starChoosed;
}

function drawStar(star) {
  let starZ = star.z;
  let radius = star.size * starZ;
  let deviationX = canvasJs.deviation.x;
  let deviationY = canvasJs.deviation.y;
  let x = star.x + deviationX * (starZ / 6);
  let y = star.y + deviationY * (starZ / 6);
  let glow = 0;
  if (canvasJs.starsWithVariation.findIndex(element => element === star) != -1) {
    let direction = round(random(0, 1));
    let intensity = star.intensity;
    let variation = (intensity <= 3) ? 1 :
                    (intensity >= 6) ? -1 :
                    (direction) ? 1 : -1;
    star.intensity += variation;
  }
  let intensity = star.intensity;
  let glowVariation = 0.1 / (radius - radius / intensity);

  for (let r = radius; r > radius / intensity; --r){
    stroke(`rgba(255, 255, 255, ${glow})`),
    ellipse(x, y, r, r);
    glow += glowVariation;
  }

  fill(255, 255, 255);
  ellipse(x, y, radius / intensity, radius / intensity);
  noFill();

}

function mouseMoveHandler(){
  let centerX = windowWidth / 2;
  let centerY = windowHeight / 2;
  let diffX = (centerX - mouseX) / 20;
  let diffY = (centerY - mouseY) / 20;
  canvasJs.deviation.x = diffX;
  canvasJs.deviation.y = diffY;
}
