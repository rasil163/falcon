// ======================================
// VISIONORA Anomaloscope Test
// Part 3A
// ======================================

// Reference colour (Yellow)
const referenceColor = {
    r: 255,
    g: 255,
    b: 0
};

// Elements
const mixColor = document.getElementById("mixColor");
const referenceBox = document.getElementById("referenceColor");

const redSlider = document.getElementById("redSlider");
const greenSlider = document.getElementById("greenSlider");

const redValue = document.getElementById("redValue");
const greenValue = document.getElementById("greenValue");

const score = document.getElementById("score");
const analysisText = document.getElementById("analysisText");

const checkBtn = document.getElementById("checkBtn");
const resetBtn = document.getElementById("resetBtn");

const resultSection = document.getElementById("resultSection");
const finalPercent = document.getElementById("finalPercent");
const visionType = document.getElementById("visionType");
const resultText = document.getElementById("resultText");

// Initial colours
referenceBox.style.background =
`rgb(${referenceColor.r},${referenceColor.g},${referenceColor.b})`;

updateColour();

// =========================
// Slider Events
// =========================

redSlider.addEventListener("input", updateColour);
greenSlider.addEventListener("input", updateColour);

function updateColour(){

let r = parseInt(redSlider.value);
let g = parseInt(greenSlider.value);

redValue.innerHTML = r;
greenValue.innerHTML = g;

mixColor.style.background =
`rgb(${r},${g},0)`;

}

// =========================
// Similarity Calculation
// =========================

function calculateSimilarity(){

let r = parseInt(redSlider.value);
let g = parseInt(greenSlider.value);

let diffR = Math.abs(referenceColor.r - r);
let diffG = Math.abs(referenceColor.g - g);

let totalDifference = diffR + diffG;

let similarity =
100 - ((totalDifference / 510) * 100);

if(similarity < 0){

similarity = 0;

}

return Math.round(similarity);

}

// =========================
// Check Button
// =========================

checkBtn.addEventListener("click", function(){

let similarity = calculateSimilarity();

score.innerHTML = similarity + "%";

if(similarity >= 95){

analysisText.innerHTML =
"✅ Excellent match detected. AI considers this a normal colour response.";

}
else if(similarity >= 80){

analysisText.innerHTML =
"🟢 Good colour perception. Slight adjustment may improve the match.";

}
else if(similarity >= 60){

analysisText.innerHTML =
"🟡 Moderate difference detected. This may indicate mild colour vision deficiency.";

}
else{

analysisText.innerHTML =
"🔴 Large mismatch detected. Professional colour vision testing is recommended.";

}

showResult(similarity);

});
// ======================================
// VISIONORA Anomaloscope Test
// Part 3B
// ======================================

// =========================
// Show Result
// =========================

function showResult(similarity){

document.querySelector(".analysis").style.display="none";
document.querySelector(".test-area").style.display="none";
resultSection.style.display="block";

finalPercent.innerHTML = similarity + "%";

if(similarity >= 95){

visionType.innerHTML = "Normal Colour Vision";

resultText.innerHTML =
"Excellent colour matching ability detected. Your response is within the normal range.";

}
else if(similarity >= 80){

visionType.innerHTML = "Near Normal Vision";

resultText.innerHTML =
"Your colour perception is close to normal with only minor variation.";

}
else if(similarity >= 60){

visionType.innerHTML = "Possible Mild Colour Vision Deficiency";

resultText.innerHTML =
"The match differs noticeably from the reference. A clinical eye examination is recommended.";

}
else{

visionType.innerHTML = "Possible Colour Vision Deficiency";

resultText.innerHTML =
"Significant colour mismatch detected. Please consult an ophthalmologist for a complete assessment.";

}

}

// =========================
// Reset Button
// =========================

resetBtn.addEventListener("click", function(){

redSlider.value = 128;
greenSlider.value = 128;

redValue.innerHTML = "128";
greenValue.innerHTML = "128";

score.innerHTML = "0%";

analysisText.innerHTML =
"Move the sliders until both colours appear identical.";

updateColour();

});

// =========================
// Restart Test
// =========================

function restartTest(){

document.querySelector(".analysis").style.display="block";
document.querySelector(".test-area").style.display="grid";
resultSection.style.display="none";

redSlider.value = 128;
greenSlider.value = 128;

redValue.innerHTML = "128";
greenValue.innerHTML = "128";

score.innerHTML = "0%";

analysisText.innerHTML =
"Move the sliders until both colours appear identical.";

updateColour();

}

// =========================
// Floating Particles
// =========================

const particles = document.getElementById("particles");

if(particles){

for(let i=0;i<70;i++){

let dot=document.createElement("span");

let size=Math.random()*5+2;

dot.style.width=size+"px";
dot.style.height=size+"px";

dot.style.left=Math.random()*100+"%";
dot.style.top=Math.random()*100+"%";

dot.style.position="absolute";
dot.style.borderRadius="50%";
dot.style.background="#00d9ff";
dot.style.opacity=".35";

dot.style.animation=
`float ${Math.random()*8+6}s linear infinite`;

particles.appendChild(dot);

}

const style=document.createElement("style");

style.innerHTML=`

@keyframes float{

0%{
transform:translateY(0);
opacity:.2;
}

50%{
opacity:.8;
}

100%{
transform:translateY(-120vh);
opacity:0;
}

}

`;

document.head.appendChild(style);

}

// =========================
// Initial Load
// =========================

updateColour();