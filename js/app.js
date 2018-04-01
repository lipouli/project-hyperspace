var canvasJs = {
  cnv: null,
  starField: null,
  starsWithVariation: null,
  nbStarsWithVariation: 10,
  nbStars: 400,
  deviation: {
    x: 0,
    y: 0
  },
  starColors: [
    {
      name: 'white',
      r: 255,
      g: 255,
      b: 255
    },
    {
      name: 'blue',
      r: 119,
      g: 165,
      b: 239
    },
    {
      name: 'yellow',
      r: 255,
      g: 243,
      b: 76
    }
  ]
};

function createStar() {
  var newStar = {
    x: round(random(window.innerWidth)),
    y: round(random(window.innerHeight)),
    z: round(random(1, 5)),
    size: 3,
    intensity: round(random(3, 6)),
    color: canvasJs.starColors[round(random(0,canvasJs.starColors.length - 1))],
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
  document.addEventListener('mousemove', mouseMoveHandler);
  noStroke();
  noFill();
  canvasJs.starField = createStarField(canvasJs.nbStars);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  canvasJs.starField = createStarField(canvasJs.nbStars);
  redraw();
}


function draw() {
  canvasJs.starsWithVariation = chooseStars(canvasJs.nbStarsWithVariation);

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

  let option = {
    starZ : star.z,
    radius : star.z * star.size,
    deviationX : canvasJs.deviation.x,
    deviationY : canvasJs.deviation.y,
    x : star.x + canvasJs.deviation.x * (star.z / 15),
    y : star.y + canvasJs.deviation.y * (star.z / 15),
    color : star.color,
  }

  if (canvasJs.starsWithVariation.findIndex(element => element === star) != -1) {
    let direction = round(random(0, 1));
    let intensity = star.intensity;
    let variation = (intensity <= 3) ? 1 :
                    (intensity >= 6) ? -1 :
                    (direction) ? 1 : -1;
    star.intensity += variation;
  }
  option.intensity = star.intensity;

  fill(option.color.r, option.color.g, option.color.b);
  ellipse(option.x, option.y, option.radius / option.intensity, option.radius / option.intensity);
  noFill();

}

function deviceMoved() {
  canvasJs.deviation.x = round(rotationX);
  canvasJs.deviation.y = round(rotationY);
  let div = document.getElementsByTagName('div');
  div.textContent = rotationX + ' ' + rotationY;
}

function mouseMoveHandler(){
  let centerX = windowWidth / 2;
  let centerY = windowHeight / 2;
  let diffX = (centerX - mouseX) / 10;
  let diffY = (centerY - mouseY) / 5;
  canvasJs.deviation.x = round(diffX);
  canvasJs.deviation.y = round(diffY);
}
