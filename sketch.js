var d;
var tspeed;
var cspeed;
var truckx =600;
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
  d = int((dist(mouseX+35,mouseY,truckx,125)/4));
  //truck boundaries
  stroke(0);
  fill(255,0,0,0);
  rect(truckx,100,200,50);

  noStroke();
  //danger 1 zone behind truck
  fill(250,250,0,100);
  rect(truckx-tspeed,100,-tspeed,50);
   //danger 2 zone behind truck
  fill(250,0,0,100);
  rect(truckx,100,-tspeed,50);

  //pc car boundaries
  stroke(0);
  fill(255,0,0,0);
  rect(carx,150,100,50);

  noStroke();
  //danger 1 zone behind car
  fill(250,250,0,100);
  rect(carx-cspeed,150,-cspeed,50);
   //danger 2 zone behind car
  fill(250,0,0,100);
  rect(carx,150,-cspeed,50);
  //car stuck to mouse cursor
  fill(255);
  rect(mouseX-35,mouseY-25,70,50);
  //check for danger 1 zone behind truck
  if((mouseX+35)>(truckx-(tspeed*2))&&(mouseX+30)<(truckx-tspeed)&&(mouseY-25)<150&&(mouseY+25)>100){
    fill(255,255,0);
    ellipse(500,500,20,20);
  }
  //check for danger 2 zone behind truck
  if((mouseX+35)>(truckx-tspeed)&&(mouseX+30)<truckx&&(mouseY-25)<150&&(mouseY+25)>100){
    text(d,600,600);
    fill(255,0,0);
    if(frameCount%d == 0){
    ellipse(500,500,50,50);
  }
  }



}
