import { Grid } from "./view/Grid";
import { Unit } from "./view/Unit";
import { Brush } from "./view/Brush";

let grid = new Grid();
grid.draw();


document.addEventListener("click", fillCell, false);

function fillCell(e:any) {
  grid.fillCell(Brush.sixteenCell,Unit.brick, e.clientX, e.clientY);
};
