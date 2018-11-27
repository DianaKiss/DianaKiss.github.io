'use strict';

const canvas = document.querySelector('.main-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

let map: number[] = []; 
let openList: number[] = []; 
let closedList: number[] = []; 
let start: { x: number; y: number; f: number, g: number} = { x: 1, y: 1, f: 0, g: 0 };
let goal: { x: number; y: number; f: number, g: number} = { x: 8, y: 8, f: 0, g: 0 };
let mw: number = 10;
let mh: number = 10; 
let neighbours: object[] = []; 
let pathArray: object[] = [];

function findNeighbour(anyArray, n): number {
  let a: number;
  for (let i: number = 0; i < anyArray.length; i++) {
    a = anyArray[i];
    if (n.x === a.x && n.y === a.y) return i;
  }
  return -1;
}

function addNeighbours(current) {
  let p;
  for (let i = 0; i < neighbours.length; i++) {
    let n = { x: current.x + neighbours[i].x, y: current.y + neighbours[i].y, g: 0, h: 0, prt: { x: current.x, y: current.y } };
    if (map[n.x][n.y] == 1 || findNeighbour(closedList, n) > -1) continue;
    n.g = current.g + neighbours[i].c; n.h = Math.abs(goal.x - n.x) + Math.abs(goal.y - n.y);
    p = findNeighbour(openList, n);
    if (p > -1 && openList[p].g + openList[p].h <= n.g + n.h) continue;
    openList.push(n);
  }
  openList.sort(function (a, b) {
    return (a.g + a.h) - (b.g + b.h);
  });
}

function createPath(): void {
  pathArray = [];
  let a, b;
  a = closedList.pop();
  pathArray.push(a);
  while (closedList.length) {
    b = closedList.pop();
    if (b.x != a.prt.x || b.y != a.prt.y) continue;
    a = b; pathArray.push(a);
  }
}

function solveMap(): any {
  drawMap();
  if (openList.length < 1) {
    document.body.appendChild(document.createElement("p")).innerHTML = "Impossible!";
    return;
  }
  let current = openList.splice(0, 1)[0];
  closedList.push(current);
  if (current.x == goal.x && current.y == goal.y) {
    createPath(); drawMap();
    return;
  }
  addNeighbours(current);
  requestAnimationFrame(solveMap);
}





function drawMap() {
  ctx.fillStyle = "#ee6"; ctx.fillRect(0, 0, 200, 200);
  for (let j: number = 0; j < mh; j++) {
    for (let i: number = 0; i < mw; i++) {
      switch (map[i][j]) {
        case 0: continue;
        case 1: ctx.fillStyle = "#990"; break;
        case 2: ctx.fillStyle = "#090"; break;
        case 3: ctx.fillStyle = "#900"; break;
      }
      ctx.fillRect(i, j, 1, 1);
    }
  }
  let a;
  if (pathArray.length) {
    let txt = "Path: " + (pathArray.length - 1) + "<br />[";
    for (let i = pathArray.length - 1; i > -1; i--) {
      a = pathArray[i];
      ctx.fillStyle = "#999";
      ctx.fillRect(a.x, a.y, 1, 1);
      txt += "(" + a.x + ", " + a.y + ") ";
    }
    document.body.appendChild(document.createElement("p")).innerHTML = txt + "]";
    return;
  }

  for (let i = 0; i < openList.length; i++) {
    a = openList[i];
    ctx.fillStyle = "#909";
    ctx.fillRect(a.x, a.y, 1, 1);
  }

  for (let i = 0; i < closedList.length; i++) {
    a = closedList[i];
    ctx.fillStyle = "#009";
    ctx.fillRect(a.x, a.y, 1, 1);
  }
}

function createMap() {
  map = new Array(mw);
  for (let i = 0; i < mw; i++) {
    map[i] = new Array(mh);
    for (let j = 0; j < mh; j++) {
      if (!i || !j || i == mw - 1 || j == mh - 1) map[i][j] = 1;
      else map[i][j] = 0;
    }
  }
  map[3][3] = map[4][3] = map[5][3] = map[6][8] = map[8][6] = map[3][5] =
    map[7][5] = map[2][1] = map[4][6] = map[5][6] = map[6][6] = map[7][6] = 1;
  map[start.x][start.y] = 2; map[goal.x][goal.y] = 3;
}

function init() {


  ctx.scale(20, 20);

  neighbours = [
    { x: 1, y: 0, c: 1 }, { x: -1, y: 0, c: 1 }, { x: 0, y: 1, c: 1 }, { x: 0, y: -1, c: 1 },
    { x: 1, y: 1, c: 1.4 }, { x: 1, y: -1, c: 1.4 }, { x: -1, y: 1, c: 1.4 }, { x: -1, y: -1, c: 1.4 }
  ];
  pathArray = []; createMap(); openList.push(start); solveMap();
}

const button = document.querySelector('#route');
button.addEventListener('click', init);


/*
//----------------------------------------------------------------------------------------------------------//
// Fun button animation
*/
let angle = 0;
 
function drawCircle() {
   
     
    // color in the background
    ctx.fillStyle = "#EEEEEE";
    ctx.fillRect(0, 0, 600, 600);
     
    // draw the circle
    ctx.beginPath();
     
    let radius = 25 + 150 * Math.abs(Math.cos(angle));
    ctx.arc(225, 225, radius, 0, Math.PI * 2, false);
    ctx.closePath();
     
    // color in the circle
    ctx.fillStyle = "#006699";
    ctx.fill();
      
    angle += Math.PI / 64;
     
    requestAnimationFrame(drawCircle);
}

const fun = document.querySelector('#fun');
fun.addEventListener('click', drawCircle);