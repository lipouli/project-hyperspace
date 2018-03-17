
function createStar() {
  var newStar = {
    x: round(random(window.innerWidth)),
    y: round(random(window.innerHeight)),
    size: 2
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
  background(0);
  starField = createStarField(300);
  count = 0;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
  starField = createStarField(300);
  redraw();
}


function draw() {
  starField.forEach((star) => ellipse(star.x, star.y, star.size, star.size));

  if (count === 5) {
    starField[round(random(starField.length - 1))].size = round(random(1, 3));
    count = 0;
  }
  count++;
}
