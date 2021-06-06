// select the elements on the page - canvas, shake button
const canvas = document.querySelector("#etch-a-sketch");
const ctx = canvas.getContext("2d");
const shakeButton = document.querySelector(".shake")

const MOVE_AMOUNT = 50;
// setup canvas for drawing
ctx.lineWidth = MOVE_AMOUNT;
ctx.lineCap = 'round';
ctx.lineJoin = 'round';

// random starting point
let {width, height} = canvas;

let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);
let color = Math.floor(Math.random() * 360);

// start drawing
ctx.strokeStyle = `hsl(${color}, 90%, 50%)`;
ctx.beginPath();
ctx.moveTo(x,y);
ctx.lineTo(x,y);
ctx.stroke();

// write draw function
function draw(key) {

    if (x > width) x = 0;
    if (y > height) y = 0;
    if (x < 0) x = width;
    if (y < 0) y = height;

    let colorChange = color + 5;

    ctx.strokeStyle = `hsl(${colorChange}, 90%, 50%)`;
    ctx.beginPath();
    ctx.moveTo(x, y);
    
    switch (key) {
        case "ArrowLeft": {
            x -= MOVE_AMOUNT;
            break;
        }
        case "ArrowUp": {
            y -= MOVE_AMOUNT;
            break;
        }
        case "ArrowRight": {
            x += MOVE_AMOUNT;
            break;
        }
        case "ArrowDown": {
            y += MOVE_AMOUNT;  
            break;
        }
        default: {
            break;
            }
    }
    ctx.lineTo(x,y);
    ctx.stroke();

    color = colorChange;
}

// event listener
window.addEventListener("keydown", (event) => {
    if (event.key.includes("Arrow")) {
        event.preventDefault();
        draw(event.key);
    }
});