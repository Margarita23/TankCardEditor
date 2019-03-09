import { Arena } from "./Arena";
import { Unit } from "./Unit";
import { Brush } from "./Brush";

export class Grid {
    private arena: number[][] = new Arena().map;
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    private totalWidth: number = window.innerWidth - window.innerWidth*0.05;
    private totalHeight: number = window.innerHeight - window.innerHeight*0.05;
    private mainBorder: number = this.totalHeight <= this.totalWidth ? window.innerHeight*0.05 : window.innerWidth*0.05;

    private arenaSize: number = this.totalHeight <= this.totalWidth ? (this.totalHeight - this.mainBorder) : (this.totalWidth - this.totalWidth*0.3);
    private elementsFieldSize: number = this.totalHeight <= this.totalWidth ? this.totalWidth - this.arenaSize : this.totalHeight - this.arenaSize;
    private cellSize: number = this.arenaSize / 52;
    
    //private val!: Unit;

    constructor(){
        this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
        this.canvas.width = this.totalWidth;
        this.canvas.height = this.totalHeight;
        this.ctx = <CanvasRenderingContext2D>this.canvas.getContext("2d");
    }

    //get value() {
    //    return this.val;
    //}

    //set value(value: Unit){
    //    this.val = value;
    //}

    draw(){
        this.emptyArena(this.arena);
        this.units();
        this.brushes();

        this.ctx.fillStyle = "red";
        this.ctx.strokeRect(this.arenaSize + this.mainBorder*2, 0 + this.mainBorder, this.elementsFieldSize, this.elementsFieldSize);
        console.log(this.totalWidth);
        console.log(this.totalHeight);
        console.log(this.arenaSize);
        console.log(this.elementsFieldSize);
    }

    emptyArena(arena: number[][]){
        for(var i = 0; i < arena.length; i++){
            for(var j = 0; j < arena[i].length; j++ ){
                if(i%4==0 && j%4==0){
                    this.ctx.strokeStyle = "rgb(255,0,0)";
                    this.ctx.strokeRect(i*this.cellSize + this.mainBorder, j*this.cellSize + this.mainBorder, this.cellSize*4, this.cellSize*4);
                }
                this.ctx.strokeStyle = "rgba(0,0,0,0.1)";
                this.ctx.strokeRect(i*this.cellSize + this.mainBorder, j*this.cellSize + this.mainBorder, this.cellSize, this.cellSize);
            }
        }
    }

    units(){
        for(var i = 0; i < 5; i++){
            this.allUnits(i);
        }
    }

    allUnits(unit: number){
        this.ctx.font = this.totalWidth*0.02 + "px Arial";
            switch(unit){
                case Unit.brick : 
                this.ctx.fillStyle = "rgb(100,0,0)";
                this.ctx.fillText("Brick", this.arenaSize + this.arenaSize*0.1, (this.arenaSize * 0.05) + this.arenaSize*0.2*unit);
                break;
            case Unit.hardBrick : 
                this.ctx.fillStyle = "rgb(100,100,100)";
                this.ctx.fillText("HardBrick", this.arenaSize + this.arenaSize*0.1, (this.arenaSize * 0.05) + this.arenaSize*0.2*unit);
                break;
            case Unit.green : 
                this.ctx.fillStyle = "rgb(0,200,0)";
                this.ctx.fillText("Green", this.arenaSize + this.arenaSize*0.1, (this.arenaSize * 0.05) + this.arenaSize*0.2*unit);
                break;
            case Unit.water : 
                this.ctx.fillStyle = "rgb(0,0,200)";
                this.ctx.fillText("Water", this.arenaSize + this.arenaSize*0.1, (this.arenaSize * 0.05) + this.arenaSize*0.2*unit);
                break;
            case Unit.ice : 
                this.ctx.fillStyle = "rgb(220,220,220)";
                this.ctx.fillText("Ice", this.arenaSize + this.arenaSize*0.1, (this.arenaSize * 0.05) + this.arenaSize*0.2*unit);
                break;
        }
        this.ctx.fillRect(this.arenaSize + this.arenaSize*0.1, (this.arenaSize * 0.05) + this.arenaSize*0.2*unit, this.arenaSize*0.05, this.arenaSize*0.05);
    }

    brushes(){
        for(var i = 0; i < 3; i++){
            this.allBrushes(i);
        }
    }

    allBrushes(brush: number){
        this.ctx.font = this.totalWidth*0.02 + "px Arial";
            switch(brush){
                case Brush.oneCell : 
                this.ctx.strokeStyle = "rgb(200,0,0)";
                this.ctx.fillText("Little", this.arenaSize + this.arenaSize*0.3, (this.arenaSize * 0.05) + this.arenaSize*0.2*brush);
                this.ctx.strokeRect(this.arenaSize + this.arenaSize*0.3, (this.arenaSize * 0.05) + this.arenaSize*0.2*brush, this.cellSize, this.cellSize);
                break;
            case Brush.fourCell : 
                this.ctx.strokeStyle = "rgb(100,100,100)";
                this.ctx.fillText("Middle", this.arenaSize + this.arenaSize*0.3, (this.arenaSize * 0.05) + this.arenaSize*0.2*brush);
                this.ctx.strokeRect(this.arenaSize + this.arenaSize*0.3, (this.arenaSize * 0.05) + this.arenaSize*0.2*brush, this.cellSize*2, this.cellSize*2);
                break;
            case Brush.sixteenCell : 
                this.ctx.strokeStyle = "rgb(0,200,0)";
                this.ctx.fillText("Big", this.arenaSize + this.arenaSize*0.3, (this.arenaSize * 0.05) + this.arenaSize*0.2*brush);
                this.ctx.strokeRect(this.arenaSize + this.arenaSize*0.3, (this.arenaSize * 0.05) + this.arenaSize*0.2*brush, this.cellSize*4, this.cellSize*4);
                break;
        }
    }





    fillCell(unit: Unit, x: number, y: number){
        
        //для одного маленького квадратика
        //        let Nx = Math.floor((x - this.totalWidth*0.05)*52/this.arenaSize);
        //        let Ny = Math.floor((x - this.totalWidth*0.05)*52/this.arenaSize);

        //для четырех маленьких квадратиков
        //        let Fx = Math.floor((x - this.totalWidth*0.05)*26/this.arenaSize);
        //        let Fy = Math.floor((x - this.totalWidth*0.05)*26/this.arenaSize);

        //для одного большого квадрата
        let i = Math.floor((x - this.mainBorder)*13/this.arenaSize);
        let j = Math.floor((y - this.mainBorder)*13/this.arenaSize);


        if((i >=0 && i < 13) && (j >= 0 && j < 13)){
            this.ctx.fillStyle = "rgb(100,20,20)";
            this.ctx.fillRect(i*this.cellSize*4 + this.mainBorder, j*this.cellSize*4 + this.mainBorder, this.cellSize*4, this.cellSize*4);
            //this.ctx.fillText("x: " + x + "; y: " + y, 50,50);
            //this.ctx.fillText("Nx: " + Fx + "; Ny: " + Fy, 100,100);
            //this.ctx.fillText("i: " + i + "; j: " + j, 150,150);
        }
        
    }


}