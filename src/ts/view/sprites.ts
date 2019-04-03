import { Brush } from "./brush";
import { Block } from "./block";
export class Sprites {

    public all: Map<string, HTMLImageElement> = new Map<string, HTMLImageElement>();

    constructor(){
        let brushes = Object.keys(Brush).slice(Object.keys(Brush).length/2, Object.keys(Brush).length);
        let blocks = Object.keys(Block).slice(Object.keys(Block).length/2, Object.keys(Block).length);

        brushes.forEach(brush => {
            blocks.forEach(block => {
                let img = new Image();
                img.src = require("../../assets/sprites/" + brush + block + ".svg");
                this.all.set(brush + block, img);
            });
        });
    }
}