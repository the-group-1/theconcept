window.onload = function() {
  var canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight;
//refI

let img0;
function preload() {
  img0 = loadImage('eventsketch3/hqdefault.jpg');
}
//refIII

function setup() {
  // Top-left corner of the img is at (0, 0)
  // Width and height are the img's original width and height
  image(img, 0, 0);
}
//revIII

function setup() {
  // Here, we use a callback to display the image after loading
  loadImage('eventsketch3/TankOrDPS.jpg', img => {
    image(img, 0, 0);
  });
}
//refIII

let value = 0;
function draw() {
  fill(value);
  //refII
  image(img, x, y, [width], [height])//refIII
}
function deviceShaken() {
  value = value + 5;
  if (value > 255) {
    value = 0;
    //refII
  }
}

//code is derived and inspired by the following links
//
//refI = https://youtu.be/zm9bqSSiIdo
//refII = https://p5js.org/reference/#/p5/deviceShaken
//refIII = https://p5js.org/reference/#/p5/image
//
//end of ref
