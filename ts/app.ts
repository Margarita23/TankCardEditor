import { emptyGrid } from "./view/emptyGrid"

let screenLog = document.querySelector('#screen-log');
document.addEventListener('click', logKey);

function logKey(e: MouseEvent) {
  console.log("Screen X/Y: " + e.screenX + ", " + e.screenY);
  console.log("Client X/Y: " + e.clientX + ", " + e.clientY);
}