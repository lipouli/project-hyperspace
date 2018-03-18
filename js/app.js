
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
  createCanvas(windowWidth, windowHeight);
  noStroke();
  noFill();
  // noLoop();
  starField = createStarField(300);
  count = 0;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  starField = createStarField(300);
  redraw();
}


function draw() {
  starsWithVariation = chooseStars(10);

  clear();
  background(0);
  starField.forEach(star => drawStar(star));
}

function chooseStars(nbOfStar) {
  let starChoosed = [];
  for (let i = 0; i < nbOfStar; i++){
    starChoosed.push(starField[round(random(0, starField.length - 1))]);
  }
  return starChoosed;
}

function drawStar(star) {
  let radius = star.size * star.z;
  let x = star.x;
  let y = star.y;
  let glow = 0;
  if (starsWithVariation.findIndex(element => element === star) != -1) {
    let direction = round(random(0, 1));
    let intensity = star.intensity;
    let variation = (intensity === 3) ? 1 :
                    (intensity === 6) ? -1 :
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
