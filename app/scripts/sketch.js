// sketch.js
/*jshint newcap: false */

'use strict';
let p5 = require('p5');
let $ = require('jquery');
let Turtle = require('./turtleDraw');
let paths = require('./turtlePaths');

let config = {
  canvasWrapper: '.canvas-wrapper',
  topColor: 'red',
  bottomColor: 'blue',
  topArrowColor: [255,200,200,200],
  bottomArrowColor: [200,200,255,200]
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
    s.noFill();
    //s.frameRate(40);
    setupTurtles();
    
  };

  function setupTurtles() {
    topTurtle = new Turtle(paths.top);
    topTurtle.setColor(config.topColor)
      .setSketch(s)
      .setArrowColor(config.topArrowColor)
      .setArrowStrokeWeight(1)
      .onDone(function(turtle) {
        if (turtle.hasTarget()) {
          drawEndArrows(turtle, turtle.getTarget());
        } else {
          drawEndArrows(turtle, {
            x: s.width/2 + 100,
            y: s.height/2 + 75
          });
        }
      });

    bottomTurtle = new Turtle(paths.bottom);
    bottomTurtle.setColor(config.bottomColor)
      .setSketch(s)
      .setArrowColor(config.bottomArrowColor)
      .setArrowStrokeWeight(1)
      .onDone(function(turtle) {
        if (turtle.hasTarget()) {
          drawEndArrows(turtle, turtle.getTarget());
        } else {
          drawEndArrows(turtle, {
            x: s.width/2 - 100,
            y: s.height/2 + 75
          });
        }
      });
  }

  function drawEndArrows(turtle, target) {
    target = target || turtle.getTarget();

    turtle.setArrowStrokeWeight(turtle.strokeWeight)
        .setArrowColor(turtle.color);

    if (target) {
      turtle.drawArrowTo(target.x, target.y);
    } else {
      turtle.drawRandomArrow();
    }
  }

  s.draw = function() {
    topTurtle.update();
    bottomTurtle.update();
  };

  s.mousePressed = function() {
    console.log('click!');
    s.clear();
    setupTurtles();
    topTurtle.setTarget(s.mouseX, s.mouseY);
    bottomTurtle.setTarget(s.mouseX, s.mouseY);
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