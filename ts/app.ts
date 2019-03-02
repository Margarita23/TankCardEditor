import { emptyGrid } from "./view/emptyGrid"

let screenLog = document.querySelector('#screen-log');
document.addEventListener('click', logKey);

let img = document.createElement("img");
img.src = "../asserts/tankTwo.ico";

function logKey(e: MouseEvent) {
  console.log("Screen X/Y: " + e.screenX + ", " + e.screenY);
  console.log("Client X/Y: " + e.clientX + ", " + e.clientY);
}

