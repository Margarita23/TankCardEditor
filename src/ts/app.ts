import { Grid } from "./view/grid";
import { UnitsControl } from "./view/units-control";
import { Editor } from "./Editor";
import { Block } from "./view/block";
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
  console.log(mousePos.x + ',' + mousePos.y);
}, false);

unitCan.addEventListener("click", function (evt) {
  var mousePos = getMousePosition(unitCan, evt);

  var myBLOCK = "";
  console.log("mx - " + mousePos.x + ', my - ' + mousePos.y);
  unit.blocks.map(block => {
    var blockEnum = Object.values(block)[0];
    var x = Object.values(block)[1];
    var y = Object.values(block)[2];
    var blockSize = Object.values(block)[3];

    if((x < mousePos.x && mousePos.x < x + blockSize))
      if(blockEnum*blockSize*2 <= mousePos.y && (blockEnum*blockSize*2+blockSize) >= mousePos.y){
        myBLOCK = blockEnum;
        console.log("myBLOCK --- " + myBLOCK);
      }
    });
}, false);

document.addEventListener("click", fillCell, false);
  function fillCell(e:any) {
    grid.fillCell(Brush.SixteenCell, Block.Brick, e.clientX, e.clientY);
  };
