import { Arena } from "./Arena";
import { Unit } from "./Unit";

export class Grid {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private totalHeight: number = window.innerHeight;
    private totalWidth: number = window.innerWidth;
    private gameSize: number = this.totalHeight <= this.totalWidth ? (this.totalHeight - this.totalHeight * 0.1) : (this.totalWidth - this.totalWidth * 0.1);
    private cellSize: number = this.gameSize / 52;
    private arena: number[][] = new Arena().map;


    constructor(){
        this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
        this.canvas.width = this.totalWidth;
        this.canvas.height = this.totalHeight;
        this.ctx = <CanvasRenderingContext2D>this.canvas.getContext("2d");
    }

    draw(){
        this.emptyArena(this.arena);
    }

    emptyArena(arena: number[][]){
        for(var i = 0; i < arena.length; i++){
            for(var j = 0; j < arena[i].length; j++ ){
                if(i%4==0 && j%4==0){
                    this.ctx.strokeStyle = "red";
                    this.ctx.strokeRect(i*this.cellSize, j*this.cellSize, this.cellSize*4, this.cellSize*4);
                }
                this.ctx.strokeStyle = "rgba(0,0,0,0.1)";
                this.ctx.strokeRect(i*this.cellSize, j*this.cellSize, this.cellSize, this.cellSize);
            }
        }
    }

    fillCell(unit: Unit, x: number, y: number){
        let i = Math.floor(x/13/4);
        let j = Math.floor(y/13/4);
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(i*this.cellSize*4, j*this.cellSize*4, this.cellSize*4, this.cellSize*4);
    }


}