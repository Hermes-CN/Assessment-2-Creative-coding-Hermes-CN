let b=1, vines=[], pollen=[], orbs=[], flames=[], bg;

function setup(){createCanvas(800,600);bg=color(15,25,15);background(bg);colorMode(HSB);noCursor()}

function draw(){
if(b===5){fill(hue(bg),saturation(bg),brightness(bg),3);noStroke();rect(0,0,width,height)}

// 1: Watercolor Bloom
if(b===1&&mouseIsPressed){
let h=(frameCount*2)%360;
for(let i=0;i<8;i++){
let a=random(TWO_PI),r=random(5,40);
fill(h,random(40,80),100,8);noStroke();
ellipse(mouseX+cos(a)*r,mouseY+sin(a)*r,random(10,30))
}}

// 2: Branching Vine
if(b===2&&mouseIsPressed&&frameCount%3===0){
let angle=random(TWO_PI);
vines.push({x:mouseX,y:mouseY,a:angle,h:random(80,160),l:random(30,80),w:random(2,6)})
}
for(let i=vines.length-1;i>=0;i--){
let v=vines[i];v.x+=cos(v.a)*2;v.y+=sin(v.a)*2;v.l--;v.w*=0.97;
v.a+=random(-0.3,0.3);
stroke(v.h,70,80,v.l/2);strokeWeight(v.w);
point(v.x,v.y);
if(v.l<=0||v.x<0||v.x>width||v.y<0||v.y>height)vines.splice(i,1)
}

// 3: Pollen Wind
if(b===3){
if(mouseIsPressed)for(let i=0;i<3;i++)pollen.push({x:mouseX,y:mouseY,vx:random(-3,3),vy:random(-1,2),h:random(40,60),s:random(2,5),l:255});
for(let i=pollen.length-1;i>=0;i--){
let p=pollen[i];p.x+=p.vx+noise(p.y*0.01)*2-1;p.y+=p.vy;p.l-=2;
fill(p.h,80,100,p.l/3);noStroke();ellipse(p.x,p.y,p.s);
if(p.l<=0)pollen.splice(i,1)
}}

// 4: Firefly Swarm
if(b===4&&mouseIsPressed){
for(let i=0;i<6;i++){
let a=random(TWO_PI),d=random(20,80);
fill(random(50,70),100,100,random(20,60));noStroke();
ellipse(mouseX+cos(a)*d,mouseY+sin(a)*d,random(2,6))
}}

// 5: Plasma Orb
if(b===5&&mouseIsPressed){
orbs.push({x:mouseX,y:mouseY,r:random(10,40),h:random(280,340),l:60})
}
for(let i=orbs.length-1;i>=0;i--){
let o=orbs[i];o.r+=0.5;o.l-=1;
noFill();stroke(o.h,100,100,o.l);strokeWeight(2);
ellipse(o.x,o.y,o.r*2);
stroke((o.h+30)%360,100,100,o.l*0.5);strokeWeight(4);
ellipse(o.x,o.y,o.r*1.5);
if(o.l<=0)orbs.splice(i,1)
}

// 6: Fire Dance (replaced Moss)
if(b===6&&mouseIsPressed){
for(let i=0;i<4;i++){
flames.push({
x:mouseX+random(-15,15),
y:mouseY,
vx:random(-1,1),
vy:random(-3,-0.5),
h:random(0,40),
s:random(10,25),
l:random(80,120)
})
}
}
for(let i=flames.length-1;i>=0;i--){
let f=flames[i];
f.x+=f.vx+noise(f.y*0.05)*2-1;
f.y+=f.vy;
f.s*=0.96;
f.l-=2;
f.h=(f.h+0.5)%60;
noStroke();
fill(f.h,100,100,f.l);
ellipse(f.x,f.y,f.s);
fill((f.h+15)%360,80,100,f.l*0.5);
ellipse(f.x,f.y,f.s*0.6);
if(f.l<=0||f.s<1)flames.splice(i,1)
}

// 7: Spider Web
if(b===7&&mouseIsPressed){
stroke(0,0,100,30);strokeWeight(0.5);
for(let i=0;i<3;i++){
let a=random(TWO_PI),d=random(50,200);
line(mouseX,mouseY,mouseX+cos(a)*d,mouseY+sin(a)*d)
}}

// 8: Crystal Formation
if(b===8&&mouseIsPressed){
let h=(frameCount*3)%360;
push();translate(mouseX,mouseY);rotate(frameCount*0.1);
for(let i=0;i<6;i++){
rotate(PI/3);stroke(h,60,100,80);strokeWeight(2);
line(0,0,0,random(10,40))
}
pop()
}

// Cursor
stroke(255,100);noFill();ellipse(mouseX,mouseY,12);

// FIXED UI - plain white text, no glow
fill(255);
noStroke();
textAlign(LEFT);
textSize(12);
text("1:Watercolor 2:Vine 3:Pollen 4:Firefly 5:Plasma 6:FireDance 7:Web 8:Crystal",10,height-10)
}

function keyPressed(){if(key>='1'&&key<='8')b=int(key);if(key=='c'){background(bg);vines=[];pollen=[];orbs=[];flames=[]}}