let titlepage;
let currentPosition, previousPosition;

function preload(){
  titlepage = loadImage("img/booktitle.jpg");
}



function setup() {
  createCanvas(windowWidth, windowHeight);
  image(titlepage);
}

function draw() {
  background(220);
  fill(0);
  line(width/2,0,width/2,height);
  if (mouseX>=width/2) {
   currentPosition = "RIGHT"
 }else {
   currentPosition = "LEFT"
 }

 if (currentPosition != previousPosition) {
 console.log(currentPosition);
 }


fill(0);
textSize(30);
text(rotationZ,0,height/2);


}
