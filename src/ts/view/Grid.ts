import { Arena } from "./arena";
import { Block } from "./block";
import { Brush } from "./brush";

export class Grid {
    private arena: Arena = new Arena;
    public canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("grid");;
    public ctx: CanvasRenderingContext2D = <CanvasRenderingContext2D>this.canvas.getContext("2d", { alpha: true });

    private totalWidth: number = parent.innerWidth*0.7;
    private totalHeight: number = parent.innerHeight;
    private arenaSize: number = this.totalHeight <= this.totalWidth ? this.totalHeight : this.totalWidth;
    readonly cellSize: number = this.arenaSize / 52;

    constructor(){
        this.canvas.width = this.totalWidth;
        this.canvas.height = this.totalHeight;
    };

    draw(){
        this.emptyArena(this.arena);
    };

    emptyArena(arena: Arena){
        for(var i = 0; i < arena.size[0]; i++){
            for(var j = 0; j < arena.size[1]; j++ ){
                if(i%4==0 && j%4==0){
                    this.ctx.strokeStyle = "rgb(255,0,0)";
                    this.ctx.strokeRect(i*this.cellSize, j*this.cellSize, this.cellSize*4, this.cellSize*4);
                }
                this.ctx.strokeStyle = "rgba(0,0,0,0.1)";
                this.ctx.strokeRect(i*this.cellSize, j*this.cellSize, this.cellSize, this.cellSize);
            }
        };
    };

    fillCell(brush: Brush, block: Block, x: number, y: number){

        //для одного маленького квадратика
        //        let Nx = Math.floor((x - this.totalWidth*0.05)*52/this.arenaSize);
        //        let Ny = Math.floor((x - this.totalWidth*0.05)*52/this.arenaSize);

        //для четырех маленьких квадратиков
        //        let i = Math.floor((x - this.totalWidth*0.05)*26/this.arenaSize);
        //        let j = Math.floor((x - this.totalWidth*0.05)*26/this.arenaSize);

        //для одного большого квадрата
        let i = Math.floor(x*13/this.arenaSize);
        let j = Math.floor(y*13/this.arenaSize);

        if((i >=0 && i < 13) && (j >= 0 && j < 13)){
            this.ctx.fillStyle = "rgb(100,20,20)";
            this.ctx.fillRect(i*this.cellSize*4, j*this.cellSize*4, this.cellSize*brush, this.cellSize*brush);
        }
    }
}