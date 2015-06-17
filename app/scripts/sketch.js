// sketch.js
/*jshint newcap: false */

'use strict';
let p5 = require('p5');
let $ = require('jquery');
let Turtle = require('./turtleDraw');

let config = {
  canvasWrapper: '.canvas-wrapper'
};

let topTurtle; 
let bottomTurtle;
let topPath = [
  [-1000, 0],
  [0, 0],
  [5, 0],
  [5, 1.5],
  [6, 1.5],
  [6, 0],
  [7, 0],
  [7, 4],
  [8, 4],
  [8, 0],
  [9, 0],
  [9, 4],
  [13, 4],
  [13, 1.5],
  [11, 1.5],
  [11, 1],
  [14, 1],
  [1000, 1]
];

let bottomPath = [
  [1000, 0], // offscreen
  [10, 0],
  [10, 2.5],
  [12, 2.5],
  [12, 3],
  [10, 3],
  [10, 4],
  [6, 4],
  [6, 2.5],
  [5, 2.5],
  [5, 4],
  [4, 4],
  [4, 1],
  [3, 1],
  [3, 4],
  [2, 4],
  [2, 1],
  [-1000, 1]
];

function mySketch(s){

  s.setup = function (){

    let $canvasWrapper = $(config.canvasWrapper);

    // create fullscreen canvas
    s.createCanvas(
      $canvasWrapper.innerWidth(),
      $canvasWrapper.innerHeight()
    ).parent($canvasWrapper[0]);


    // line color

    s.stroke(0);


    // setup Turtles for Drawing
    topTurtle = new Turtle(0,0,40);
    bottomTurtle = new Turtle(14,1,40);

    let turtles = [topTurtle, bottomTurtle];
    
    turtles.forEach( function(turtle) {
      turtle.setSketch(s); 
    });

    topTurtle.draw(topPath);
    bottomTurtle.draw(bottomPath);
  };

  s.draw = function() {
  };

  s.windowResized = function() {
    let $canvasWrapper = $(config.canvasWrapper),
        w = $canvasWrapper.innerWidth(),
        h = $canvasWrapper.height();

    // put in canvasWrapper
    s.resizeCanvas(w,h-3);

  };

}



function init() {
  return new p5(mySketch);
}

module.exports = {
  init
};