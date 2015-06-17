// sketch.js
/*jshint newcap: false */

'use strict';
let p5 = require('p5');
let $ = require('jquery');
let Turtle = require('./turtleDraw');
let paths = require('./turtlePaths');

let config = {
  canvasWrapper: '.canvas-wrapper'
};

let topTurtle; 
let bottomTurtle;

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
    s.frameRate(40);


    // setup Turtles for Drawing
    topTurtle = new Turtle(paths.top);
    topTurtle.setColor('red')
      .setSketch(s);

    bottomTurtle = new Turtle(paths.bottom);
    bottomTurtle.setColor('blue')
      .setSketch(s);
    
  };

  s.draw = function() {
    topTurtle.update();
    bottomTurtle.update();
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