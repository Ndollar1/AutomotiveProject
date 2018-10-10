var d;
var tspeed;
var cspeed;
var trucky = 70;
var truckx = 200;
var carx = 400;
var tacc;
var cacc;
var tooFast = false;
var tooFastCar = false;
var beep;
var beepCount;
var audioAlert = true;
var visualAlert = true;
var clicked = false;
var aOn,aOff,vOn,vOff,crash,autoB;

function setup() {
  beep = loadSound("beep.wav");
  aOn = loadImage("audioOn.png");
  aOff = loadImage("audioOff.png");
  vOn = loadImage("visualOn.png");
  vOff = loadImage("visualOff.png");
  crash = loadImage("crashWarning.png");
  autoB = loadImage("autoBrake.png");
  createCanvas(1000, 700);
  frameRate(30);
  tspeed = 150;
  cspeed = 125;
  textSize(40);
  beepCount = 0;
}

function draw() {
  background(200);
  noStroke();
  strokeWeight(0);
  //adjusts speed of truck dynamically between 70 and 200
  tacc = 0.5;
  if (tspeed > 150) {
    tooFast = true;
  }
  if (tooFast) {
    tspeed -= tacc;
  }
  if (!tooFast) {
    tspeed += tacc;
  }
  if (tspeed < 70) {
    tooFast = false;
  }
  //adjusts speed of car dynamically between 130 and 120
  cacc = 0.1;
  if (cspeed > 130) {
    tooFastCar = true;
  }
  if (tooFastCar) {
    cspeed -= cacc;
  }
  if (!tooFastCar) {
    cspeed += cacc;
  }
  if (cspeed < 120) {
    tooFastCar = false;
  }
  fill(255);
  text("Truck speed:", 10, 50);
  text(int(tspeed), 250, 50);
  text(int(cspeed), 250, 650);
  text("Car speed:", 10, 650);



  //truck boundaries
  stroke(0);
  strokeWeight(3);
  fill(255, 0, 0, 0);
  rect(truckx, trucky, 50, 200);

  noStroke();
  //danger 1 zone behind truck
  fill(250, 250, 0, 100);
  rect(truckx, trucky + tspeed + 200, 50, tspeed);
  //danger 2 zone behind truck
  fill(255, 100, 0, 100);
  rect(truckx, trucky + 200 + (tspeed / 2), 50, tspeed / 2);
  //auto braking zone
  fill(250, 0, 0, 100);
  rect(truckx, trucky + 200, 50, tspeed / 2);

  //HUD view
  fill(0);
  rect(400, 50, 500, 600);

  //buttons for alerts

  //audio alert toggle
  if (audioAlert) {
    //fill(255);
    image(aOn,500,500,100,100);
  } else {
    image(aOff,500,500,100,100)
    //fill(255, 0, 0);
  }
  //rect(500, 500, 100, 100);
//  fill(0);
  //textSize(30);
//  text("audio",510,560);
  if (mouseIsPressed && mouseX > 500 && mouseX < 600 && mouseY > 500 && mouseY < 600 && audioAlert && !clicked) {
    audioAlert = false;
    clicked = true;
  } else if (mouseIsPressed && mouseX > 500 && mouseX < 600 && mouseY > 500 && mouseY < 600 && !audioAlert && !clicked) {
    audioAlert = true;
    clicked = true;
  } else if (!mouseIsPressed) {
    clicked = false;
  }
  //visual alert toggle
  if (visualAlert) {
    image(vOn, 700,500,100,100);
  //  fill(255);
  } else {
    image(vOff,700,500,100,100);
  //  fill(255, 0, 0);
  }
  //rect(700, 500, 100, 100);
  fill(0);
  textSize(30);
  //text("visual",710,560);
  if (mouseIsPressed && mouseX > 700 && mouseX < 800 && mouseY > 500 && mouseY < 600 && visualAlert && !clicked) {
    visualAlert = false;
    clicked = true;
  } else if (mouseIsPressed && mouseX > 700 && mouseX < 800 && mouseY > 500 && mouseY < 600 && !visualAlert && !clicked) {
    visualAlert = true;
    clicked = true;
  } else if (!mouseIsPressed) {
    clicked = false;
  }
  textSize(40);
  d = int((dist(mouseX, mouseY - 25, truckx + 25, trucky + 200) / 10));
  if (mouseX > 0 && mouseY > 0 && mouseX < 400 && mouseY < 700) {
    //measures distance from car to back of truck;
    text(d, mouseX + 50, mouseY);
    stroke(255, 0, 0);
    strokeWeight(3);
    line(mouseX, mouseY - 25, truckx + 25, trucky + 200);
    noStroke();
    fill(255);
    rect(mouseX - 25, mouseY - 35, 50, 70);
  }
  //check for danger 1 zone behind truck
  if ((mouseY - 35) > (trucky + 200 + tspeed) && (mouseY - 30) < (trucky + (tspeed * 2)) + 200 && (mouseX + 25) > truckx && (mouseX - 25) < truckx + 50 && tspeed < cspeed && visualAlert) {
    fill(255, 255, 0);
    rect(400, 50, 500, 80);
    textSize(40);
    fill(255);
    stroke(0);
    strokeWeight(4);
    text("Warning!", 550, 100);
  }
  //check for danger 2 zone behind truck
  else if ((mouseY - 35) > (trucky + 200 + (tspeed / 2)) && (mouseY - 30) < (trucky + 200 + tspeed) && (mouseX + 25) > truckx && (mouseX - 25) < truckx + 50 && tspeed < cspeed) {
    if (visualAlert) {
      fill(255, 100, 0);
      rect(400, 50, 500, 80);
    //  text(d, 600, 600);
      fill(255);
      stroke(0);
      strokeWeight(4);
      textSize(40);
      text("Brake now!", 550, 100);
      image(crash,570,150,150,150);
    }
    if (frameCount % d == 0) {
      // fill(255, 0, 0);
      // ellipse(1100, 90, 50, 50);
      if (audioAlert) {
        beepCount++;
        if (beepCount % 4 == 0) {
          beep.play();
        }
      }
    }
  }
  //check for autobraking zone
  else if ((mouseY - 35) > (trucky + 200) && (mouseY - 30) < (trucky + 200 + (tspeed / 2)) && (mouseX + 25) > truckx && (mouseX - 25) < truckx + 50 && tspeed < cspeed) {
    fill(255, 0, 0);
    rect(400, 50, 500, 80);
    //text(d, 600, 600);
    fill(250, 255, 255);
    stroke(0);
    strokeWeight(4);
    textSize(40);
    text("Autobraking!", 550, 100);
    image(autoB,570,150,150,150);
    if (cspeed > tspeed) {
      cspeed--;
    }
    if (frameCount % d == 0) {
      // fill(255, 0, 0);
      // ellipse(1100, 90, 50, 50);
      if (audioAlert) {
        beepCount++;
        if (beepCount % 4 == 0) {
          beep.play();
        }
      }
    }
  } else if (d * 10 < (trucky + (tspeed * 2)) && (mouseX + 25) > truckx && (mouseX - 25) < truckx + 50 && visualAlert) {
    fill(255, 255, 0);
    rect(400, 50, 500, 80);
    textSize(40);
    fill(255);
    stroke(0);
    strokeWeight(4);
    text("Too close!", 550, 100);
  } else {
    //fill(0, 255, 0);
    //  ellipse(450, 100, 50, 50);
  }



}
