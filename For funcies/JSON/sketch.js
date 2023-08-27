let rd

function setup() {
  createCanvas(windowHeight, windowHeight);

  rd = new Renderer();

  misc();
}

function draw() {
  rd.render()
}

function misc() {
  rd.createKey('background', -1)
  rd.add('background', () => background(220))
}
