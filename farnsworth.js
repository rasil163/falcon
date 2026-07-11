// =======================================
// VISIONORA Farnsworth Test
// Part 3A
// =======================================

// Elements
const container = document.getElementById("capsContainer");
const caps = Array.from(document.querySelectorAll(".cap"));

const timer = document.getElementById("timer");
const status = document.getElementById("status");

const shuffleBtn = document.getElementById("shuffleBtn");
const submitBtn = document.getElementById("submitBtn");
const restartBtn = document.getElementById("restartBtn");

// ===========================
// Timer
// ===========================

let seconds = 0;

setInterval(() => {

seconds++;

let min = String(Math.floor(seconds / 60)).padStart(2,"0");
let sec = String(seconds % 60).padStart(2,"0");

timer.innerHTML = `${min}:${sec}`;

},1000);

// ===========================
// Shuffle
// ===========================

shuffleBtn.addEventListener("click",shuffleCaps);

function shuffleCaps(){

for(let i=caps.length-1;i>0;i--){

let j=Math.floor(Math.random()*(i+1));

container.appendChild(caps[j]);

caps.splice(j,1);

}

status.innerHTML="Shuffled";

}

// ===========================
// Drag & Drop
// ===========================

let dragItem=null;

container.querySelectorAll(".cap").forEach(cap=>{

cap.addEventListener("dragstart",()=>{

dragItem=cap;

setTimeout(()=>{

cap.classList.add("dragging");

},0);

});

cap.addEventListener("dragend",()=>{

cap.classList.remove("dragging");

});

});

container.addEventListener("dragover",(e)=>{

e.preventDefault();

const afterElement=getDragAfterElement(container,e.clientX);

if(afterElement==null){

container.appendChild(dragItem);

}else{

container.insertBefore(dragItem,afterElement);

}

});

function getDragAfterElement(container,x){

const draggable=[...container.querySelectorAll(".cap:not(.dragging)")];

return draggable.reduce((closest,child)=>{

const box=child.getBoundingClientRect();

const offset=x-box.left-box.width/2;

if(offset<0 && offset>closest.offset){

return{

offset:offset,

element:child

};

}else{

return closest;

}

},{

offset:Number.NEGATIVE_INFINITY

}).element;

}

// ===========================
// Floating Particles
// ===========================

const particles=document.getElementById("particles");

for(let i=0;i<70;i++){

let dot=document.createElement("span");

let size=Math.random()*5+2;

dot.style.width=size+"px";
dot.style.height=size+"px";

dot.style.position="absolute";

dot.style.left=Math.random()*100+"%";
dot.style.top=Math.random()*100+"%";

dot.style.borderRadius="50%";

dot.style.background="#00d9ff";

dot.style.opacity=".4";

dot.style.animation=
`float ${Math.random()*8+5}s linear infinite`;

particles.appendChild(dot);

}

const style=document.createElement("style");

style.innerHTML=`

@keyframes float{

0%{

transform:translateY(0);

opacity:.3;

}

100%{

transform:translateY(-120vh);

opacity:0;

}

}

`;

document.head.appendChild(style);
// =======================================
// VISIONORA Farnsworth Test
// Part 3B
// =======================================

// Result Elements
const resultSection = document.getElementById("resultSection");
const scoreElement = document.getElementById("score");
const visionResult = document.getElementById("visionResult");
const analysis = document.getElementById("analysis");
const correctCount = document.getElementById("correctCount");

// ===========================
// Submit Test
// ===========================

submitBtn.addEventListener("click", checkResult);

function checkResult(){

    const currentCaps = [...container.querySelectorAll(".cap")];

    let correct = 0;

    currentCaps.forEach((cap,index)=>{

        if(parseInt(cap.dataset.order) === index + 1){
            correct++;
        }

    });

    correctCount.innerHTML = correct + " / 16";

    let percent = Math.round((correct / 16) * 100);

    scoreElement.innerHTML = percent;

    document.querySelector(".glass-card:nth-of-type(2)").style.display = "none";
    resultSection.style.display = "block";

    if(percent >= 90){

        visionResult.innerHTML = "Normal Colour Vision";

        analysis.innerHTML =
        "Excellent colour discrimination detected. Your colour arrangement accuracy is within the normal range.";

    }

    else if(percent >= 70){

        visionResult.innerHTML = "Mild Colour Vision Deficiency";

        analysis.innerHTML =
        "Good performance with a few ordering mistakes. A mild colour perception variation may be present.";

    }

    else if(percent >= 50){

        visionResult.innerHTML = "Moderate Colour Vision Deficiency";

        analysis.innerHTML =
        "Several colour ordering errors were detected. Further colour vision evaluation is recommended.";

    }

    else{

        visionResult.innerHTML = "Severe Colour Vision Deficiency";

        analysis.innerHTML =
        "Many colour ordering errors were detected. Please consult an eye care professional for a comprehensive assessment.";

    }

    status.innerHTML = "Completed";

}

// ===========================
// Restart Test
// ===========================

restartBtn.addEventListener("click", restartTest);

function restartTest(){

    resultSection.style.display = "none";

    document.querySelector(".glass-card:nth-of-type(2)").style.display = "block";

    correctCount.innerHTML = "0 / 16";

    scoreElement.innerHTML = "0";

    seconds = 0;

    timer.innerHTML = "00:00";

    status.innerHTML = "Testing...";

    shuffleCaps();

}

// ===========================
// Shuffle at Startup
// ===========================

shuffleCaps();