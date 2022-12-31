const canvas = document.querySelector("canvas") ;
ctx = canvas.getContext("2d");
let clear_btn = document.getElementById("clear")
let save_btn = document.getElementById("save")
let thickness =  document.querySelector("#thickness")
let colour =document.querySelector('.colourpicker')
let brush_btn = document.getElementById("brush")
let rectangle_btn = document.getElementById("rectangle")
let circle_btn = document.getElementById("circle")
let fill_btn = document.getElementById("fill")
let fill = false
let prevMouseX, prevMouseY, snapshot
isDrawing = false,
selectedColor = "black",
selectedTool = "brush";

let tool_buttons = [brush_btn , rectangle_btn , circle_btn]
const setCanvasBackground = () => {
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = colour.value;
}

window.addEventListener("load", () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    setCanvasBackground();
});


const startDraw = (e) => {
    isDrawing = true;
    prevMouseX = e.offsetX
    prevMouseY = e.offsetY; 
    ctx.beginPath(); 
    ctx.lineWidth = thickness.value; 
    ctx.strokeStyle = colour.value;
    ctx.fillStyle = colour.value;
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
}


const drawing = (e) => {
    if(!isDrawing) return;
    ctx.putImageData(snapshot, 0, 0);
    if(selectedTool === "brush"){
        console.log(colour.value)
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke(); 
    } else if(selectedTool === "rectangle"){
        drawRect(e);
    } else if(selectedTool === "circle"){
        drawCircle(e);
    } 
}

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", () => isDrawing = false);

const drawRect = (e) => {
    console.log(fill)
    if (!fill){
        ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
    }else{
        ctx.fillRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
    }
    
}

const drawCircle = (e) => {
    ctx.beginPath();
    let radius = Math.sqrt(Math.pow((prevMouseX - e.offsetX), 2) + Math.pow((prevMouseY - e.offsetY), 2));
    console.log(radius)
    ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI); 
    if (!fill){
        ctx.stroke();
    }else  {
        ctx.fill();
    }
   
}

function button_switch (button){
    for (let i in tool_buttons) {
        tool_buttons[i].style.backgroundColor= '#fff';
        console.log( tool_buttons[i].style.background_color)
    } 
    document.getElementById(selectedTool).style.backgroundColor='#bca6e8'
}   

thickness.addEventListener('mouseout' ,() => {
    console.log(thickness.value)
    ctx.lineWidth = thickness.value
})

colour.addEventListener('focusin',() => {
    console.log( colour.value)
    ctx.strokeStyle = colour.value
})

brush_btn.addEventListener('click', () => {
    selectedTool='brush'
    button_switch (selectedTool)
})

rectangle_btn.addEventListener('click', () => {
    selectedTool='rectangle'
    button_switch (selectedTool)
})

circle_btn.addEventListener('click', () => {
    selectedTool='circle'
    button_switch (selectedTool)
})


fill_btn.addEventListener('click', ()=> {
    if (!fill) {
        fill=true;
        fill_btn.style.backgroundColor='#bca6e8';
    } else{
        fill = false;
        fill_btn.style.backgroundColor='#fff';
    }
})

clear_btn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setCanvasBackground();
})

save_btn.addEventListener("click", () => {
    let data = canvas.toDataURL("imag/png")
    let a = document.createElement("a")
    a.href = data
    a.download = "sketch.png"
    a.click()
})