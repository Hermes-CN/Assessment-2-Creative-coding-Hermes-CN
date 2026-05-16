let ripples=[],lastSecond=0;

function setup(){createCanvas(800,800);colorMode(HSB);textAlign(CENTER,CENTER)}

function draw(){
background(0,0.1);
translate(width/2,height/2);
let sc=second();
if(sc!=lastSecond){ripples.push({r:20,h:0,s:random(TWO_PI)});lastSecond=sc}

for(let i=ripples.length-1;i>=0;i--){
let r=ripples[i];r.r+=2;r.h=(r.h+5)%360;
stroke(r.h,80,100,0.7);strokeWeight(2);noFill();
push();rotate(r.s);
for(let j=0;j<6;j++){
rotate(PI/3);
beginShape();
for(let a=0;a<TWO_PI;a+=0.1){
let rad=r.r+sin(a*3)*20;
vertex(cos(a)*rad,sin(a)*rad);
}
endShape(CLOSE);
}
pop();
if(r.r>400)ripples.splice(i,1)
}

rotate(frameCount*0.01);
fill(255);textSize(50);text(nf(hour(),2)+":"+nf(minute(),2)+":"+nf(sc,2),0,0)
}