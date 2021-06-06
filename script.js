// select the elements on the page - canvas, shake button
const canvas = document.querySelector("#etch-a-sketch");
const ctx = canvas.getContext("2d");
const resetButton = document.querySelector(".reset")
const colorfullButton = document.querySelector(".colorfull")
const colorlessButton = document.querySelector(".colorless")
const hueValue1 = document.querySelector(".value1");
const hueValue5 = document.querySelector(".value5");
const hueValue10 = document.querySelector(".value10");

const MOVE_AMOUNT = 30;

// setup canvas for drawing
ctx.lineWidth = MOVE_AMOUNT;
ctx.lineCap = 'round';
ctx.lineJoin = 'round';

// random starting point
let { width, height } = canvas;
let x, y, color;
let light = "50";
let hueChange = 5;

startDrawing();

// write draw function
function draw(key) {

    let hue = color + hueChange;

    if (x > width) x = 0;
    if (y > height) y = 0;
    if (x < 0) x = width;
    if (y < 0) y = height;

    ctx.strokeStyle = `hsl(${hue}, 90%, ${light}%)`;
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

    color = hue;
}

function clearCanvas() {
    canvas.classList.add("shake");
    ctx.clearRect(0, 0, width, height);
    canvas.addEventListener("animationend", () => {
        canvas.classList.remove("shake");
    })
}

function startDrawing() {
    clearCanvas();
    x = Math.floor(Math.random() * width);
    y = Math.floor(Math.random() * height);
    color = Math.floor(Math.random() * 360);
    ctx.strokeStyle = `hsl(${color}, 90%, ${light}%)`;
    setTimeout(() => {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y);
        ctx.stroke();
    }, 1000);
}

colorfullButton.addEventListener("click", () => {
    colorfullButton.classList.add("pressed");
    colorlessButton.classList.remove("pressed");
    light = "50";
})

colorlessButton.addEventListener("click", () => {
    colorlessButton.classList.add("pressed");
    colorfullButton.classList.remove("pressed");
    light = "0";
})

resetButton.addEventListener("click", startDrawing);

hueValue1.addEventListener("click", () => {
    hueChange = 1;
    hueValue1.classList.add("pressed");
    hueValue5.classList.remove("pressed");
    hueValue10.classList.remove("pressed");
})
hueValue5.addEventListener("click", () => {
    hueChange = 5;
    hueValue1.classList.remove("pressed");
    hueValue5.classList.add("pressed");
    hueValue10.classList.remove("pressed");
})
hueValue10.addEventListener("click", () => {
    hueChange = 10;
    hueValue1.classList.remove("pressed");
    hueValue5.classList.remove("pressed");
    hueValue10.classList.add("pressed");
})

// event listener
window.addEventListener("keydown", (event) => {
    if (event.key.includes("Arrow")) {
        event.preventDefault();
        draw(event.key);
    }
});