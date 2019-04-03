import { Block } from "./block";
import { Brush } from "./brush";

export class UnitsControl{
    public canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    private totalWidth: number = window.innerWidth*0.2;
    private totalHeight: number = window.innerHeight;

    private startWidth = window.innerWidth - this.totalWidth;

    private blockValue: Block = Block.Brick;
    private brushValue: Brush = Brush.OneCell;
    private cellSize: number;
    public maxBrushSize: number;
    public blocks: Object[] = [];
    public brush: Object[] = [];

    constructor(cellSize: number){
        this.canvas = <HTMLCanvasElement>document.getElementById("units-control");
        this.ctx = this.canvas.getContext("2d", { alpha: true });
        this.canvas.width = this.totalWidth;
        this.canvas.height = this.totalHeight;
        this.cellSize = cellSize;
        this.maxBrushSize = Brush.SixteenCell * this.cellSize;
    }

    draw(){
        this.rubber();
        this.brushes();
        this.units();
    };

    rubber(){
        let img = new Image();
            img.src = require("../../assets/sprites/Road.svg");
            img.onload = () => {
                this.ctx.drawImage(img, this.maxBrushSize/4, this.maxBrushSize, this.maxBrushSize/2, this.maxBrushSize/2);
            };
    }

    brushes(){
        this.ctx.font = "30px Arial";
        this.ctx.fillStyle = "rgb(255,100,0)";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        const vals = Object.keys(Brush).slice(0, Object.keys(Brush).length/2);
        vals.forEach(brushSize => {
            this.brush.push({brush: Number(brushSize),startX: this.maxBrushSize*1.5 - (Number(brushSize) * this.cellSize)/2, startY: Number(brushSize) * this.maxBrushSize, cell: this.cellSize});
            this.ctx.strokeStyle = "rgba(255,255,255, 0.9)";
            this.ctx.strokeRect(this.maxBrushSize*1.5 - (Number(brushSize) * this.cellSize)/2, Number(brushSize) * this.maxBrushSize, Number(brushSize) * this.cellSize, Number(brushSize) * this.cellSize);
        });
    }

    units(){
        let blocks = Object.keys(Block).slice(0, Object.keys(Block).length/2);
        blocks.forEach(block => {
            this.blocks.push({block: Number(block),startX: this.canvas.width - this.maxBrushSize, startY: Number(block) *  this.maxBrushSize * 2, size: this.maxBrushSize});
            let img = new Image();
            img.src = require("../../assets/sprites/" + Brush[Brush.OneCell] + Block[Number(block)] + ".svg");
            img.onload = () => {
                this.ctx.drawImage(img, this.canvas.width - this.maxBrushSize, Number(block) *  this.maxBrushSize * 2 + this.maxBrushSize, this.maxBrushSize, this.maxBrushSize);
            };
        });
    }
}