import { Grid } from "./view/grid";
import { UnitsControl } from "./view/units-control";

export class Editor{
    private grid: Grid;
    private unitsControl: UnitsControl;
    constructor(grid: Grid, unitsControl: UnitsControl){
        this.grid = grid;
        this.unitsControl = unitsControl;
    }

    run(){
        this.grid.draw();
        this.unitsControl.draw();
    }
}