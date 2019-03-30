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
    private img: HTMLImageElement = new Image();
    private cellSize: number;

    constructor(cellSize: number){
        this.canvas = <HTMLCanvasElement>document.getElementById("units-control");
        this.ctx = <CanvasRenderingContext2D>this.canvas.getContext("2d");
        this.canvas.width = this.totalWidth;
        this.canvas.height = this.totalHeight;
        this.cellSize = cellSize;
    }

    draw(){
        this.brushes();
        this.units();
    };

    brushes(){
        this.ctx.font = "30px Arial";
        const vals = Object.keys(Brush).slice(0, Object.keys(Brush).length/2);
        vals.forEach(brushSize => {
            switch(brushSize){
                case "1" :
                    this.ctx.fillStyle = "rgb(200,200,200)";
                    this.ctx.fillRect(Brush.SixteenCell * this.cellSize - (Number(brushSize) * this.cellSize)/2, Number(brushSize) * 20, Number(brushSize) * this.cellSize, Number(brushSize) * this.cellSize);
                    break;

                case "2" :
                    this.ctx.fillStyle = "rgb(200,200,200)";
                    this.ctx.fillRect(Brush.SixteenCell * this.cellSize - (Number(brushSize) * this.cellSize)/2, Number(brushSize) * 20, Number(brushSize) * this.cellSize, Number(brushSize) * this.cellSize);
                    break;

                case "4" :
                    this.ctx.fillStyle = "rgb(200,200,200)";
                    this.ctx.fillRect(Brush.SixteenCell * this.cellSize - (Number(brushSize) * this.cellSize)/2, Number(brushSize) * 20, Number(brushSize) * this.cellSize, Number(brushSize) * this.cellSize);
                    break;
            }
        });
    }

    units(){
        const blocks = Object.keys(Block).slice(0, Object.keys(Block).length/2);
        blocks.forEach(block => {
            switch(block){
                case "0":
                    let img1 = new Image();
                    img1.src = require("../../assets/sprites/Brick.svg");
                    img1.onload = () => {
                        this.ctx.drawImage(img1, this.canvas.width - Brush.SixteenCell * this.cellSize, Number(block) *  Brush.SixteenCell * this.cellSize * 2, Brush.SixteenCell * this.cellSize, Brush.SixteenCell * this.cellSize);
                    };
                    break;
                case "1":
                    let img2 = new Image();
                    img2.src = require("../../assets/sprites/HardBrick.svg");
                    img2.onload = () => {
                        this.ctx.drawImage(img2, this.canvas.width - Brush.SixteenCell * this.cellSize, Number(block) *  Brush.SixteenCell * this.cellSize * 2, Brush.SixteenCell * this.cellSize, Brush.SixteenCell * this.cellSize);
                    };
                    break;
                case "2":
                    let img3 = new Image();
                    img3.src = require("../../assets/sprites/Grass.svg");
                    img3.onload = () => {
                        this.ctx.drawImage(img3, this.canvas.width - Brush.SixteenCell * this.cellSize, Number(block) *  Brush.SixteenCell * this.cellSize * 2, Brush.SixteenCell * this.cellSize, Brush.SixteenCell * this.cellSize);
                    };
                    break;
                case "3":
                    let img4 = new Image();
                    img4.src = require("../../assets/sprites/Water.svg");
                    img4.onload = () => {
                        this.ctx.drawImage(img4, this.canvas.width - Brush.SixteenCell * this.cellSize, Number(block) *  Brush.SixteenCell * this.cellSize * 2, Brush.SixteenCell * this.cellSize, Brush.SixteenCell * this.cellSize);
                    };
                    break;
                case "4":
                    let img5 = new Image();
                    img5.src = require("../../assets/sprites/Ice.svg");
                    img5.onload = () => {
                        this.ctx.drawImage(img5, this.canvas.width - Brush.SixteenCell * this.cellSize, Number(block) *  Brush.SixteenCell * this.cellSize * 2, Brush.SixteenCell * this.cellSize, Brush.SixteenCell * this.cellSize);
                    };
                    break;
            }
        });
    }
}