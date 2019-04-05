import { Block } from "./block";
import { Brush } from "./brush";

export class UnitsControl{
    public canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    private totalWidth: number = window.innerWidth*0.2;
    private totalHeight: number = window.innerHeight;

    private cellSize: number;
    public maxBrushSize: number;
    public blocks: Object[] = [];
    public brush: Object[] = [];
    public rubber: Object = new Object();
    public createButton: Object = new Object();

    constructor(cellSize: number){
        this.canvas = <HTMLCanvasElement>document.getElementById("units-control");
        this.ctx = this.canvas.getContext("2d", { alpha: true });
        this.canvas.width = this.totalWidth;
        this.canvas.height = this.totalHeight;
        this.cellSize = cellSize;
        this.maxBrushSize = Brush.SixteenCell * this.cellSize;
    }

    draw(){
        this.rubberView();
        this.brushes();
        this.units();
        this.createButtonView();
    };

    rubberView(){
        this.rubber = new Object({startX: 0, startY: this.maxBrushSize, endX: this.maxBrushSize, endY: this.maxBrushSize});
        let img = new Image();
        img.src = require("../../assets/sprites/Rubber.svg");
        img.onload = () => {
            this.ctx.drawImage(img, 0, this.maxBrushSize, this.maxBrushSize, this.maxBrushSize);
        };
    }

    brushes(){
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
                this.ctx.drawImage(img, this.canvas.width - this.maxBrushSize, Number(block) *  this.maxBrushSize * 2, this.maxBrushSize, this.maxBrushSize);
            };
        });
    }

    createButtonView(){
        this.createButton = new Object({startX: 0, startY: this.maxBrushSize * Object.keys(Block).length, endX: this.canvas.width, endY: this.maxBrushSize + this.maxBrushSize * Object.keys(Block).length});
        let img = new Image();
        img.src = require("../../assets/sprites/CreateButton.svg");
        img.onload = () => {
            this.ctx.drawImage(img, 0, this.maxBrushSize * Object.keys(Block).length, this.canvas.width, this.maxBrushSize);
        };
    }
}