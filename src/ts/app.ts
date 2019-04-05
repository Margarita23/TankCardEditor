import { Grid } from "./view/grid";
import { UnitsControl } from "./view/units-control";
import { Editor } from "./Editor";
import { Brush } from "./view/brush";

let grid = new Grid();
let unit = new UnitsControl(grid.cellSize);
let editor = new Editor(grid, unit);

var unitCan = unit.canvas;
var canvas = grid.canvas;

editor.run();

function getMousePosition(canvas: HTMLCanvasElement, evt: MouseEvent) {
  var rect = canvas.getBoundingClientRect();
  return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
  };
}

canvas.addEventListener("click", function (evt) {
  var mousePos = getMousePosition(canvas, evt);
}, false);

unitCan.addEventListener("click", function (evt) {
  var mousePos = getMousePosition(unitCan, evt);
  var rubber = Object(unit.rubber);
  var createButton = Object(unit.createButton);


  if(createButton.startX <= mousePos.x && createButton.endX >= mousePos.x){
    if(createButton.startY <= mousePos.y && mousePos.y <= createButton.endY){
      console.log("Create new Arena");
    }
  }

  if(rubber.startX <= mousePos.x && rubber.endX >= mousePos.x){
    if(rubber.startY <= mousePos.y && mousePos.y <= rubber.endY + unit.maxBrushSize){
      grid.draw();
    }
  }

  unit.brush.map(brush => {
    var brushObject = Object(brush);
    var cell = brushObject.cell;
    if(((Brush.SixteenCell * cell*1.5 - brushObject.brush*cell/2) <= mousePos.x) && ((Brush.SixteenCell * cell*1.5 + brushObject.brush*cell/2) >= mousePos.x)){
      if((Brush.SixteenCell * cell * brushObject.brush <= mousePos.y) && (Brush.SixteenCell * cell * brushObject.brush + cell * brushObject.brush >= mousePos.y)){
        editor.actingBrush[0] = Number(brushObject.brush);
      }
    }
  });

  unit.blocks.map(block => {
    var blockEnum = Object.values(block)[0];
    var x = Object.values(block)[1];
    var blockSize = Object.values(block)[3];
    if((x < mousePos.x && mousePos.x < x + blockSize))
      if(blockEnum*blockSize*2 <= mousePos.y && (blockEnum*blockSize*2+blockSize) >= mousePos.y){
        editor.actingBrush[1] = Number(blockEnum);
      }
    });
  }, false);

document.addEventListener("click", fillCell, false);

function fillCell(e:any) {
  grid.fillCell(editor.actingBrush, e.clientX, e.clientY);
};
