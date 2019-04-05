import { Grid } from "./view/grid";
import { UnitsControl } from "./view/units-control";

export class Editor{
    private grid: Grid;
    private unitsControl: UnitsControl;
    public actingBrush: number[] = [4,1];

    constructor(grid: Grid, unitsControl: UnitsControl){
        this.grid = grid;
        this.unitsControl = unitsControl;
    }

    run(){
        this.grid.draw();
        this.unitsControl.draw();
    }
}