import { Grid } from "./view/Grid";
import { Unit } from "./view/Unit";

let grid = new Grid();
grid.draw();


document.addEventListener("click", getClickPosition, false);

function getClickPosition(e:any) {
  var xPosition = e.clientX;
  var yPosition = e.clientY;
  grid.fillCell(Unit.brick, e.clientX, e.clientY);
}

  console.log("Screen X/Y: " );
  console.log("Client X/Y: ");


