import React, { Component } from 'react';
import { materialColors } from '../../common/colors';
import { LinearGauge } from 'canvas-gauges';

class LinearMeter extends Component {

  componentDidMount() {
    const options = Object.assign({}, this.props, {
      renderTo: this.el,
      width: 150,
      height: 230,
      minValue: 0,
      maxValue: 1,
      majorTicks: [
        "0",
        "0.95"
      ],
      valueBox: false,
      minorTicks: 3,
      strokeTicks: false,
      colorPlate: "#fff",
      borderShadowWidth: 0,
      borders: false,
      borderOuterWidth: 0,
      borderInnerWidth: 0,
      barBeginCircle: false,
      tickSide: "right",
      numberSide: "right",
      needleSide: "left",
      needleShadow: true,
      needleType: "arrow",
      needleWidth: 15,
      needleStart: -70,
      needleEnd: 20,
      colorNeedle: "#222",
      colorNeedleEnd: "#222",
      animationDuration: 1500,
      animationRule: "linear",
      animationTarget: "plate",
      barWidth: 6,
      ticksWidth: 60,
      highlightsWidth: 60,
      colorNumbers: 'white, red',
      title: 'CPU',
      fontNumbersSize: 1,
      ticksWidthMinor: 0,
      animateOnInit: true,
      highlights: this.props.sections,
      value: this.props.value,
      fontTitleSize: 1,
      colorBarProgress: this.props.value < 0.6 ? materialColors.green : materialColors.orange
    })
    this.gauge = new LinearGauge(options).draw();
  }

  render() {
    if (this.gauge) {
      this.gauge.update({
        highlights: this.props.sections,
        value: this.props.value,
        colorBarProgress: this.props.value < 0.6 ? materialColors.green : materialColors.orange
      });
    }
    return (
      <div>
        <canvas style={{ marginTop: 0 }} ref={(canvas) => {
          this.el = canvas
        }} />
      </div>
    );
  }
}

export default LinearMeter;