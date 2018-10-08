var d;
var tspeed;
var cspeed;
var trucky =10;
var carx = 400;
var tacc;
var cacc;
var tooFast = false;
var tooFastCar = false;

function setup() {
  createCanvas(1000,1000);
  tspeed = 150;
  cspeed = 75;
}

function draw() {
  background(200);
  //adjusts speed of truck dynamically between 70 and 200
  tacc = 0.5;
  if(tspeed>200){
    tooFast = true;
  }
  if(tooFast){
    tspeed -= tacc;
  }
  if(!tooFast){
    tspeed+=tacc;
  }
  if(tspeed<70){
    tooFast=false;
  }
  //adjusts speed of car dynamically between 30 and 120
  cacc = 0.5;
  if(cspeed>120){
    tooFastCar = true;
  }
  if(tooFastCar){
    cspeed -= cacc;
  }
  if(!tooFastCar){
    cspeed+=cacc;
  }
  if(cspeed<30){
    tooFastCar=false;
  }

  text(tspeed,50,500);
  //measures distance from car to back of truck;
  d = int((dist(mouseX,mouseY-25,425,trucky+200)/4));
  stroke(255,0,0);
  line(mouseX,mouseY-25,425,trucky+200);
  //truck boundaries
  stroke(0);
  fill(255,0,0,0);
  rect(400,trucky,50,200);

  noStroke();
  //danger 1 zone behind truck
  fill(250,250,0,100);
  rect(400,trucky+tspeed+200,50,tspeed);
   //danger 2 zone behind truck
  fill(250,0,0,100);
  rect(400,trucky+200,50,tspeed);

  //pc car boundaries
  // stroke(0);
  // fill(255,0,0,0);
  // rect(carx,150,100,50);
  //
  // noStroke();
  // //danger 1 zone behind car
  // fill(250,250,0,100);
  // rect(carx-cspeed,150,-cspeed,50);
  //  //danger 2 zone behind car
  // fill(250,0,0,100);
  // rect(carx,150,-cspeed,50);
  //car stuck to mouse cursor
  fill(255);
  rect(mouseX-25,mouseY-35,50,70);
  //check for danger 1 zone behind truck
  if((mouseY-35)>(trucky+200+tspeed)&&(mouseY-30)<(trucky+(tspeed*2))+200&&(mouseX+25)>400&&(mouseX-25)<450){
    fill(255,255,0);
    ellipse(500,500,20,20);
  }
  //check for danger 2 zone behind truck
  if((mouseY-35)>(trucky+200)&&(mouseY-30)<(trucky+200+tspeed)&&(mouseX+25)>400&&(mouseX-25)<450){
    text(d,600,600);
    fill(255,0,0);
    if(frameCount%d == 0){
    ellipse(500,500,50,50);
  }
  }



}
