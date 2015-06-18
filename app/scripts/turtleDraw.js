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
    this.strokeWeight = 10;
    this.arrowStrokeWeight = 1;
    this.color = 0;
    this.arrowColor = this.color; // [255,255,255,255]
    this.stepSize = 0.1;
    this.offset = {
      x: 150,
      y: 75
    };
    this.target = null;
    this.done = false;
    this.onDoneCallback = null;

  }

  setColor(color) {
    this.color = color;
    return this;
  }

  getTarget() {
    return this.target;
  }

  hasTarget() {
    return !!this.target;
  }

  onDone(fn) {
    this.onDoneCallback = fn;
  }

  // target of arrows
  setTarget(x,y) {
    this.target = { x, y };
    return this;
  }

  setArrowColor(color) {
    this.arrowColor = color;
    return this;
  }

  setStrokeWeight(weight) {
    this.strokeWeight = weight;
    return this;
  }

  setArrowStrokeWeight(weight) {
    this.arrowStrokeWeight = weight;
    return this;
  }

  setSketch(sketch) {
    this.sketch = sketch;
    return this;
  }

  setCurrentPosition(x,y) {
    this.currentPosition.x = x;
    this.currentPosition.y = y;
    return this;
  }

  logStatus() {
    console.log(`point ${this.pointIndex} of ${this.pointList.length}`);
    let start = this.pointList[this.pointIndex];
    let end = this.pointList[this.pointIndex + 1];

    console.log(`currently walking between ${start} and ${end}`);
    console.log(`position: ${this.currentPosition.x}, ${this.currentPosition.y}`);
  }

  getScaledX(x) {
    return x * this.scaleFactor + this.offset.x;
  }

  getScaledY(y) {
    return y * this.scaleFactor + this.offset.y;
  }

  /**
  * Takes non-scaled coordinates. Calculates and draws
  * a line using scalefactor and offset
  **/
  drawLineFromCurrentPositionTo(x,y) {
    let coords = [
      this.getScaledX(this.currentPosition.x),
      this.getScaledY(this.currentPosition.y),
      this.getScaledX(x),
      this.getScaledY(y)
    ];

    // draw a line between current position and nextPosition
    this.sketch.stroke(this.color);
    this.sketch.strokeWeight(this.strokeWeight);
    this.sketch.line.apply(this.sketch, coords);

  }

  getNextPoint() {
    return {
      x: this.pointList[this.pointIndex + 1][0],
      y: this.pointList[this.pointIndex + 1][1]
    };
  }

  getCurrentPosition() {
    return {
      x: this.currentPosition.x,
      y: this.currentPosition.y
    };
  }

  getCurrentPoint() {
    return {
      x: this.pointList[this.pointIndex][0],
      y: this.pointList[this.pointIndex][1]
    };
  }

  getCurrentHeading() {
    let nextPt = this.getNextPoint();
    let currentPt = this.getCurrentPoint();
    let dy = nextPt.y - currentPt.y;
    let dx = nextPt.x - currentPt.x;
    return Math.atan2(dy,dx);
  }

  drawRandomArrow() {
    let s = this.sketch;

    //let direction = this.getCurrentHeading();

    let x = s.random(0,s.width);
    let y = s.random(0, s.height);
    this.drawArrowTo(x,y);

    return this;
  }

  drawArrowTo(x,y) {
      let s = this.sketch;
      let [x0, y0, x1, y1] = [
        this.getScaledX(this.currentPosition.x),
        this.getScaledY(this.currentPosition.y),
        x,
        y
      ];

      s.stroke(this.arrowColor);
      s.strokeWeight(this.arrowStrokeWeight);
      s.line(x0,y0,x1,y1);
      s.push();
      s.translate(x1,y1);
      let angle = Math.atan2(x0 - x1, y1 - y0);
      s.rotate(angle);
      s.line(0, 0, -5, -10);
      s.line(0, 0, 5, -10);
      s.pop();

      return this;
  }

  reset() {
    this.pointIndex = 0;
    this.currentPosition = this.getCurrentPoint();
    this.done = false;
    return this;
  }

  isLastPoint() {
    return this.pointIndex === this.pointList.length - 1;
  }

  isDone() {
    return this.done;
  }

  toggleDone() {
    this.done = !this.done;
    return this;
  }

  update() {

    //this.logStatus();

    if (this.isLastPoint()) {
      if (this.isDone()) {
        return;
      }
      this.toggleDone();
      return this.onDoneCallback(this);
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
    //console.log(`dx: ${dx}, dy: ${dy}`);

    // let's move to the next point!
    // absolute value in case dx and dy are moving in
    // negative direction
    if (Math.abs(dx) < this.stepSize && Math.abs(dy) < this.stepSize) {

      // draw remainder of line
      this.drawLineFromCurrentPositionTo(nextPt.x, nextPt.y);

      this.currentPosition.x = this.pointList[this.pointIndex +1][0];
      this.currentPosition.y = this.pointList[this.pointIndex +1][1];
      this.pointIndex += 1;
      return;
    }


    // random chance to draw and arrow from currentPosition to edge
    if (this.sketch.random() < 0.5) {

      // if no target, create a random arrow
      if (! this.target) {
        this.drawRandomArrow();
      } else {
        this.drawArrowTo(this.target.x, this.target.y);
      }
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

    this.drawLineFromCurrentPositionTo(nextPosition.x,nextPosition.y);

    // updateCurrentPosition
    this.setCurrentPosition(nextPosition.x, nextPosition.y);

  }
}

module.exports = Turtle;