let grid;
let img;
let turn = 0;

function preload() {
  img = loadImage('./Assets/Oak-Architextures.jpg')
}

function setup() {
  mainRender();
  createCanvas(windowHeight, windowHeight);
  createGrid();
  initializePlayers();
}

function draw() {
  rd.render();
}

function mainRender() {
  rd.add('main', () => image(img, 0, 0))
}

function createGrid() {
  let offset = 20;
  let size = {w: width-offset*2, h: height-offset*2};
  grid = new Grid(13,13,size.w,size.h,offset,offset)
  grid.createGrid();
  grid.drawlines();
}

function initializePlayers() {
  createPlayer('PlayerBlack', 'black')
  createPlayer('PlayerWhite', 'white')
}

function mouseClicked() {
  let pos = grid.nearestPos(new Position(mouseX,mouseY))
  let keysArr = [];
  players.forEach((val, key) => {
    keysArr.push(key);
  });
  createStone(pos,keysArr[turn])
  turn >= keysArr.length-1 ? turn = 0 : turn++;
}