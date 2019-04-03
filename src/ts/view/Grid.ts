import { Arena } from "./arena";
import { Block } from "./block";
import { Brush } from "./brush";
import { Sprites } from './sprites';

export class Grid {
    private arena: Arena = new Arena;
    public canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("grid");;
    public ctx: CanvasRenderingContext2D = <CanvasRenderingContext2D>this.canvas.getContext("2d", { alpha: true });

    private totalWidth: number = parent.innerWidth*0.7;
    private totalHeight: number = parent.innerHeight;
    private arenaSize: number = this.totalHeight <= this.totalWidth ? this.totalHeight : this.totalWidth;
    readonly cellSize: number = this.arenaSize / 52;
    readonly sprites: Map<string, HTMLImageElement>= (new Sprites()).all;

    constructor(){
        this.canvas.width = this.totalWidth;
        this.canvas.height = this.totalHeight;
    };

    draw(){
        this.emptyArena(this.arena);
    };

    emptyArena(arena: Arena){
        this.ctx.fillStyle = "rgb(0,0,0)";
        this.ctx.fillRect(0, 0, this.canvas.width,  this.canvas.height);
        for(var i = 0; i < arena.size[0]; i++){
            for(var j = 0; j < arena.size[1]; j++ ){
                if(i%4==0 && j%4==0){
                    this.ctx.strokeStyle = "rgba(255,255,255, 0.6)";
                    this.ctx.strokeRect(i*this.cellSize, j*this.cellSize, this.cellSize*4, this.cellSize*4);
                }
                this.ctx.strokeStyle = "rgba(255,255,255, 0.1)";
                this.ctx.strokeRect(i*this.cellSize, j*this.cellSize, this.cellSize, this.cellSize);
            }
        };
    };

    fillCell(activeBrush: number[], x: number, y: number){
        let i;
        let j;
        switch(activeBrush[0]){
            case Brush.OneCell :
                //для одного маленького квадратика
                i = Math.floor(x*52/this.arenaSize);
                j = Math.floor(y*52/this.arenaSize);
                if((i >=0 && i < 52) && (j >= 0 && j < 52)){
                    this.ctx.drawImage(this.sprites.get("" + Brush[Number(activeBrush[0])] + Block[Number(activeBrush[1])]), i*this.cellSize, j*this.cellSize, this.cellSize*activeBrush[0], this.cellSize*activeBrush[0]);
                }
                break;
            case Brush.FourCell :
                //для четырех маленьких квадратиков
                i = Math.floor(x*26/this.arenaSize);
                j = Math.floor(y*26/this.arenaSize);
                if((i >=0 && i < 26) && (j >= 0 && j < 26)){
                    this.ctx.drawImage(this.sprites.get("" + Brush[Number(activeBrush[0])] + Block[Number(activeBrush[1])]), i*this.cellSize*2, j*this.cellSize*2, this.cellSize*activeBrush[0], this.cellSize*activeBrush[0]);
                }
                break;
            case Brush.SixteenCell :
                //для одного большого квадрата
                i = Math.floor(x*13/this.arenaSize);
                j = Math.floor(y*13/this.arenaSize);
                if((i >=0 && i < 13) && (j >= 0 && j < 13)){
                    this.ctx.drawImage(this.sprites.get("" + Brush[Number(activeBrush[0])] + Block[Number(activeBrush[1])]), i*this.cellSize*4, j*this.cellSize*4, this.cellSize*activeBrush[0], this.cellSize*activeBrush[0]);
                }
                break;
        }
        //if((i >=0 && i < 13) && (j >= 0 && j < 13)){
        //    this.ctx.drawImage(this.sprites.get("" + Brush[Number(activeBrush[0])] + Block[Number(activeBrush[1])]), i*this.cellSize*4, j*this.cellSize*4, this.cellSize*activeBrush[0], this.cellSize*activeBrush[0]);
        //}
    }
}