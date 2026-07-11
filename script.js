// ==========================
// VISIONORA Animations
// ==========================

// Floating Particles
const particles = document.getElementById("particles");

for (let i = 0; i < 80; i++) {

    let dot = document.createElement("span");

    let size = Math.random() * 6 + 2;

    dot.style.width = size + "px";
    dot.style.height = size + "px";

    dot.style.left = Math.random() * 100 + "%";
    dot.style.top = Math.random() * 100 + "%";

    dot.style.animationDuration = (Math.random() * 8 + 5) + "s";

    particles.appendChild(dot);
}

// Particle Style
const style = document.createElement("style");

style.innerHTML = `
#particles{
position:fixed;
top:0;
left:0;
width:100%;
height:100%;
overflow:hidden;
z-index:-1;
}

#particles span{
position:absolute;
border-radius:50%;
background:#00d4ff;
opacity:.4;
animation:floatParticle linear infinite;
}

@keyframes floatParticle{
0%{
transform:translateY(0);
opacity:.3;
}
50%{
opacity:1;
}
100%{
transform:translateY(-120vh);
opacity:0;
}
}
`;

document.head.appendChild(style);

// ==========================
// Mouse Movement Effect
// ==========================

document.addEventListener("mousemove", function(e){

const eye=document.querySelector(".eye-circle");

if(!eye) return;

let x=(window.innerWidth/2-e.pageX)/40;
let y=(window.innerHeight/2-e.pageY)/40;

eye.style.transform=`translate(${x}px,${y}px)`;

});

// ==========================
// 3D Card Tilt
// ==========================

const cards=document.querySelectorAll(".card");

cards.forEach(card=>{

card.addEventListener("mousemove",(e)=>{

const rect=card.getBoundingClientRect();

const x=e.clientX-rect.left;
const y=e.clientY-rect.top;

const rotateX=((y-rect.height/2)/12);
const rotateY=((rect.width/2-x)/12);

card.style.transform=
`rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;

});

card.addEventListener("mouseleave",()=>{

card.style.transform="rotateX(0) rotateY(0)";

});

});

// ==========================
// Navbar Blur on Scroll
// ==========================

window.addEventListener("scroll",()=>{

const nav=document.querySelector(".navbar");

if(window.scrollY>50){

nav.style.background="rgba(0,0,0,.55)";
nav.style.boxShadow="0 10px 25px rgba(0,0,0,.3)";

}else{

nav.style.background="rgba(255,255,255,.05)";
nav.style.boxShadow="none";

}

});

// ==========================
// Fade-in Animation
// ==========================

const observer=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity=1;
entry.target.style.transform="translateY(0)";

}

});

});

document.querySelectorAll(".card,.about-container").forEach(item=>{

item.style.opacity=0;
item.style.transform="translateY(70px)";
item.style.transition="1s";

observer.observe(item);

});

// ==========================
// Ripple Button Effect
// ==========================

document.querySelectorAll("button,.hero-btn,.signup-btn,.login-btn").forEach(btn=>{

btn.addEventListener("click",function(e){

const circle=document.createElement("span");

const d=Math.max(this.clientWidth,this.clientHeight);

circle.style.width=d+"px";
circle.style.height=d+"px";
circle.style.position="absolute";
circle.style.borderRadius="50%";
circle.style.background="rgba(255,255,255,.4)";
circle.style.left=(e.offsetX-d/2)+"px";
circle.style.top=(e.offsetY-d/2)+"px";
circle.style.animation="ripple .6s linear";

this.style.position="relative";
this.style.overflow="hidden";

this.appendChild(circle);

setTimeout(()=>{

circle.remove();

},600);

});

});

const ripple=document.createElement("style");

ripple.innerHTML=`
@keyframes ripple{
from{
transform:scale(0);
opacity:1;
}
to{
transform:scale(4);
opacity:0;
}
}
`;

document.head.appendChild(ripple);

// ==========================
// Hero Typing Effect (Fixed)
// ==========================

const title = document.querySelector(".hero-left h1");

if(title){

const line1 = "AI Powered";
const line2 = "Vision Testing Platform";

title.innerHTML = "";

const textNode = document.createTextNode("");
title.appendChild(textNode);

title.appendChild(document.createElement("br"));

const span = document.createElement("span");
span.textContent = "";
title.appendChild(span);

let i = 0;

function typeLine1(){

if(i < line1.length){

textNode.textContent += line1.charAt(i);
i++;

setTimeout(typeLine1,70);

}else{

let j = 0;

function typeLine2(){

if(j < line2.length){

span.textContent += line2.charAt(j);
j++;

setTimeout(typeLine2,70);

}

}

typeLine2();

}

}

typeLine1();

}