// ===============================
// VISIONORA Ishihara Test
// ===============================

const plates = [
{img:"plates/plate1.png",answer:"4"},
{img:"plates/plate2.png",answer:"15"},
{img:"plates/plate3.png",answer:"8"},
{img:"plates/plate4.png",answer:"74"},
{img:"plates/plate5.png",answer:"6"},
{img:"plates/plate6.png",answer:"45"},
{img:"plates/plate7.png",answer:"10"},
{img:"plates/plate8.png",answer:"26"},
{img:"plates/plate9.png",answer:"7"},
{img:"plates/plate10.png",answer:"15"},
];

let current = 0;
let score = 0;
let answers = new Array(plates.length).fill("");

const plateImage = document.getElementById("plateImage");
const answer = document.getElementById("answer");
const plateNo = document.getElementById("plateNo");
const progressBar = document.getElementById("progressBar");
const scoreText = document.getElementById("score");
const analysisText = document.getElementById("analysisText");

const resultSection = document.getElementById("resultSection");
const finalScore = document.getElementById("finalScore");
const resultTitle = document.getElementById("resultTitle");
const resultDescription = document.getElementById("resultDescription");

function loadPlate(){

plateImage.src = plates[current].img;
plateNo.innerText = current + 1;
answer.value = answers[current];

progressBar.style.width =
((current+1)/plates.length*100)+"%";

analysisText.innerHTML =
"🤖 AI is analysing Plate "+(current+1);

}

loadPlate();

function calculateScore(){

score = 0;

for(let i=0;i<plates.length;i++){

if(
answers[i].trim().toLowerCase() ==
plates[i].answer.toLowerCase()
){

score++;

}

}

scoreText.innerText = score;

}

document.getElementById("nextBtn").onclick=function(){

answers[current]=answer.value;

calculateScore();

if(current<plates.length-1){

current++;
loadPlate();

}else{

showResult();

}

};

document.getElementById("prevBtn").onclick=function(){

answers[current]=answer.value;

if(current>0){

current--;

loadPlate();

}

};

function showResult(){

document.querySelector(".test-container").style.display="none";

resultSection.style.display="flex";

finalScore.innerText=score;

let percent=(score/plates.length)*100;

if(percent>=90){

resultTitle.innerText="Normal Colour Vision";

resultDescription.innerText=
"Excellent colour vision detected.";

}
else if(percent>=70){

resultTitle.innerText="Mild Colour Vision Deficiency";

resultDescription.innerText=
"Minor colour perception issues detected.";

}
else if(percent>=50){

resultTitle.innerText="Moderate Colour Blindness";

resultDescription.innerText=
"Further ophthalmic examination is recommended.";

}
else{

resultTitle.innerText="Severe Colour Blindness";

resultDescription.innerText=
"Please consult an eye specialist for diagnosis.";

}

}

function restartTest(){

current=0;

score=0;

answers.fill("");

document.querySelector(".test-container").style.display="grid";

resultSection.style.display="none";

scoreText.innerText="0";

loadPlate();

}

function downloadPDF(){

window.print();

}

// ===============================
// Floating Particles
// ===============================

const particles=document.getElementById("particles");

for(let i=0;i<80;i++){

let dot=document.createElement("span");

let size=Math.random()*5+2;

dot.style.width=size+"px";
dot.style.height=size+"px";

dot.style.left=Math.random()*100+"%";
dot.style.top=Math.random()*100+"%";

dot.style.position="absolute";
dot.style.borderRadius="50%";
dot.style.background="#00d9ff";
dot.style.opacity=".4";

dot.style.animation=
`float ${Math.random()*6+5}s linear infinite`;

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