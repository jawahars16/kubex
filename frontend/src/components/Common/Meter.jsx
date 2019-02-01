import React, { Component } from 'react';
import { RadialGauge } from 'canvas-gauges';
import { materialColors } from '../../common/colors';

class Meter extends Component {

  getWidth() {
    return Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.documentElement.clientWidth
    );
  }

  getHeight() {
    return Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.documentElement.clientHeight
    );
  }

  componentDidMount() {
    const options = Object.assign({}, this.props, {
      renderTo: this.el,
      units: this.props.displayValue,
      width: (this.getWidth() / 6) * 0.9,
      height: 200,
      minValue: 0,
      startAngle: 70,
      ticksAngle: 220,
      valueBox: false,
      maxValue: 1,
      minorTicks: 1,
      strokeTicks: false,
      highlights: this.props.sections,
      highlightsWidth: 30,
      ticksWidth: 0,
      colorPlate: "#fff",
      borderShadowWidth: 0,
      borders: false,
      needleType: "arrow",
      needleColor: 'black',
      needleWidth: 1,
      needleCircleSize: 10,
      needleCircleOuter: true,
      needleCircleInner: false,
      animationDuration: 1500,
      animationRule: "linear",
      value: this.props.value,
      colorMajorTicks: "transparent",
      colorMinorTicks: "transparent",
      title: this.props.title,
      colorTitle: materialColors.darkGray,
      colorUnits: materialColors.darkGray,
      colorNumbers: 'transparent',
    })
    this.gauge = new RadialGauge(options).draw()
  }

  render() {
    if (this.gauge) {
      this.gauge.update({
        highlights: this.props.sections,
        value: this.props.value,
        units: this.props.displayValue
      });
    }
    return (
      <canvas ref={(canvas) => {
        this.el = canvas
      }} />
    );
  }
}

export default Meter;