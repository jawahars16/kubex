import React, { Component } from 'react';

class Gauge extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.canvas = React.createRef();
    this.arrow = React.createRef();
  }

  refresh() {

    if (!this.canvas.current) return;

    this.prepareCanvas();
    this.drawOuterCircle();
    this.drawSections();
    this.drawInsideArc();
    // this.drawValue();
  }

  prepareCanvas() {
    const context = this.canvas.current.getContext('2d');
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);

  }

  drawSections() {
    const actualSections = [{ value: 0 }, ...this.props.sections];
    actualSections.reduce((prevEndPoint, nextStartPoint, index) => {
      return this.drawSection(prevEndPoint, nextStartPoint, index);
    });
  }

  drawInsideArc() {
    const innerRadius = 0.7 * this.props.radius;
    const context = this.canvas.current.getContext('2d');
    context.imageSmoothingEnabled = true;
    context.webkitImageSmoothingEnabled = true;
    context.mozImageSmoothingEnabled = true;
    context.beginPath();
    context.arc(this.props.radius, this.props.radius, innerRadius, 0, 2 * Math.PI, false);
    context.fillStyle = 'white';
    context.fill();
    context.closePath();
  }

  drawValue() {
    const context = this.canvas.current.getContext('2d');
    context.fillText("21m", this.props.radius, this.props.radius * 1.5);
    context.closePath();
  }

  drawOuterCircle() {
    const context = this.canvas.current.getContext('2d');
    context.beginPath();
    context.moveTo(this.props.radius, this.props.radius);
    context.arc(this.props.radius, this.props.radius, this.props.radius, 0.8 * Math.PI, 0.2 * Math.PI, false);
    context.lineTo(this.props.radius, this.props.radius);
    context.fillStyle = 'gray';
    context.fill();
    context.closePath();
  }

  drawArrow() {
    const context = this.canvas.current.getContext('2d');
    context.beginPath();
    context.moveTo(0, this.props.radius);
    context.arc(0, this.props.radius, this.props.radius, 1.99 * Math.PI, 0.11 * Math.PI, false);
    context.lineTo(0, this.props.radius);
    context.fillStyle = 'black';
    context.fill();
    context.closePath();
  }

  drawSection(prevEndPoint, nextStartPoint, index) {

    prevEndPoint.value = isNaN(prevEndPoint.value) ? 0 : prevEndPoint.value;
    nextStartPoint.value = isNaN(nextStartPoint.value) ? 0 : nextStartPoint.value;

    if (nextStartPoint.value < prevEndPoint.value) {
      nextStartPoint.value = prevEndPoint.value;
    }

    const context = this.canvas.current.getContext('2d');
    context.imageSmoothingEnabled = true;
    context.webkitImageSmoothingEnabled = true;
    context.mozImageSmoothingEnabled = true;
    context.beginPath();
    context.moveTo(this.props.radius, this.props.radius);
    context.arc(this.props.radius, this.props.radius, this.props.radius, (prevEndPoint.value + 1) * Math.PI, (nextStartPoint.value + 1) * Math.PI, false);
    context.lineTo(this.props.radius, this.props.radius);
    context.fillStyle = nextStartPoint.color;
    context.fill();
    context.closePath();
    return nextStartPoint;
  }

  render() {
    this.refresh();
    const value = this.props.value > 1 ? 1 : this.props.value;
    const usage = isNaN(value) ? 0 : value;
    return (
      <div style={{ ...this.props.style, position: 'relative' }}>
        <canvas
          ref={this.canvas}
          width={this.props.radius * 2}
          height={this.props.radius * 2}></canvas>
        <div
          className='arrow-shadow'
          ref={this.arrow}
          style={{
            height: 2,
            width: this.props.radius,
            position: 'absolute',
            backgroundColor: this.props.arrowColor,
            top: this.props.radius,
            transform: `rotate(${usage * 180}deg)`,
            transformOrigin: `100% 50%`
          }} />
        <div style={{
          position: 'absolute',
          backgroundColor: this.props.knobColor,
          height: this.props.knobRadius,
          width: this.props.knobRadius,
          borderRadius: this.props.knobRadius,
          WebkitBorderRadius: this.props.knobRadius,
          MozBorderRadius: this.props.knobRadius,
          top: this.props.radius - (this.props.knobRadius / 2),
          left: this.props.radius - (this.props.knobRadius / 2),
        }} />
        {/* <div style={{ position: 'absolute' }}>12m</div> */}
      </div>
    );
  }
}

export default Gauge;