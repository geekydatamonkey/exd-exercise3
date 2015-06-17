/**
* Turtle
* a simple drawing class.
**/



class Turtle {
  constructor(pointList) {
    this.scaleFactor = 40; // pixels drawn for each unit
    this.sketch = null;
    this.pointList = pointList;
    this.pointIndex = 0; 
    this.currentPosition = {
      x: pointList[0][0],
      y: pointList[0][1]
    };
    this.color = 0;
    this.stepSize = 0.1;
  }

  setColor(color) {
    this.color = color;
    return this;
  }

  setSketch(sketch) {
    this.sketch = sketch;
    return this;
  }

  setCurrentPosition(x,y) {
    this.currentPosition.x = x;
    this.currentPosition.y = y;
  }

  logStatus() {
    console.log(`point ${this.pointIndex} of ${this.pointList.length}`);
    let start = this.pointList[this.pointIndex];
    let end = this.pointList[this.pointIndex + 1];

    console.log(`currently walking between ${start} and ${end}`);
    console.log(`position: ${this.currentPosition.x}, ${this.currentPosition.y}`);
  }

  update() {

    this.logStatus();

    if (! (this.pointIndex + 1 < this.pointList.length)) {
      return;
    }

    // start walking between the point at pointIndex and
    // the next point (pointIndex + 1)
    let nextPt = {
      x: this.pointList[this.pointIndex + 1][0],
      y: this.pointList[this.pointIndex + 1][1]
    };

    // get a random point between currentPosition and nextPt
    // find the equation of the line
    let dy = nextPt.y - this.currentPosition.y;
    let dx = nextPt.x - this.currentPosition.x;
    console.log(`dx: ${dx}, dy: ${dy}`);

    // if (dy < 0) {
    //   this.sketch.frameRate(1);
    // } else {

    // }


    // let's move to the next point!
    // absolute value in case dx and dy are moving in
    // negative direction
    if (Math.abs(dx) < this.stepSize && Math.abs(dy) < this.stepSize) {
      // draw remainder of line?
      console.log('---NEXT!---');
      this.currentPosition.x = this.pointList[this.pointIndex +1][0];
      this.currentPosition.y = this.pointList[this.pointIndex +1][1];
      this.pointIndex += 1;
      return;
    }

    let nextPosition = {};
    
    // if dx == 0, line is vertical. So x will remain the same
    // and y will be current Y + stepSize in the direction of
    // dy
    if (dx === 0) {
      nextPosition.x = this.currentPosition.x;
      nextPosition.y = this.currentPosition.y + 0.1 * Math.sign(dy);
    }

    // if dy == 0, line is horz
    if (dy === 0) {
      nextPosition.x = this.currentPosition.x + 0.1 * Math.sign(dx);
      nextPosition.y = this.currentPosition.y;
    }

 

    // scaleFactor

    let [x0, y0, x1, y1] = [
      this.currentPosition.x * this.scaleFactor,
      this.currentPosition.y * this.scaleFactor,
      nextPosition.x * this.scaleFactor,
      nextPosition.y * this.scaleFactor
    ];

    // draw a line between current position and nextPosition
    this.sketch.line(x0, y0, x1, y1);

    // updateCurrentPosition
    this.setCurrentPosition(nextPosition.x, nextPosition.y);

  }
}

module.exports = Turtle;