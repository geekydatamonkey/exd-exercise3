/**
* Turtle
* a simple drawing class.
**/

let _ = require('lodash');

class Turtle {
  constructor(initX = 0, initY = 0, scaleFactor = 10) {
    this.scaleFactor = scaleFactor; // pixels drawn for each unit
    this.sketch = null;
    this.offset = {
      x: 100,
      y: 200
    };
    this.x = initX * this.scaleFactor + this.offset.x;
    this.y = initY * this.scaleFactor + this.offset.y;
  }

  setSketch(sketch) {
    this.sketch = sketch;
  } 

  // _drawline(toX, toY) {

  // }

  draw(pointList) {
    let self = this;
    _.forEach(pointList, function(point) {
      let nextX = self.scaleFactor * point[0] + self.offset.x;
      let nextY = self.scaleFactor * point[1] + self.offset.y;
      self.sketch.line(self.x, self.y, nextX, nextY);
      self.x = nextX;
      self.y = nextY;
    });

  }

}

module.exports = Turtle;