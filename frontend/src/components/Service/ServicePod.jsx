import React, { Component } from 'react';
import { Avatar, Col, Tooltip, Spin, Icon } from 'antd';
import moment from 'moment';
import { materialColors } from '../../common/colors';
const classNames = require('classnames');

const statusColors = {
  Running: materialColors.green,
  Failed: materialColors.red,
  Pending: materialColors.gray
}

const loadingStatusColors = {
  PProgress: materialColors.lightGreen,
  NProgress: materialColors.orange
}

const loadingIcon = <Icon type="loading-3-quarters" style={{ fontSize: 40 }} spin />;

class ServicePod extends Component {
  constructor(props) {
    super(props);
    this.state = { ts: moment(this.props.created).fromNow() }

    this.classes = classNames({
      'circle': true,
      'inner-shadow': true
    })

  }

  componentDidMount() {
    setInterval(_ => {
      this.setState({
        ts: moment(this.props.created).fromNow()
      });
    }, 1000 * 60);
  }

  loadingPod = _ =>
    <div style={{
      backgroundColor: loadingStatusColors[this.props.status],
      margin: 1
    }} className={this.classes}>
      <Spin indicator={loadingIcon} size="large" style={{
        color: 'white',
        opacity: 0.7,
        marginRight: 2
      }} />
    </div>;

  regularPod = _ =>
    <div className={this.classes} style={{ backgroundColor: statusColors[this.props.status], margin: 1 }}>
      {this.state.ts}
    </div>;

  failedPod = _ =>
    <div className={this.classes} style={{ backgroundColor: materialColors.red, margin: 1 }}>
      <img src="https://img.icons8.com/ios-glyphs/30/ffffff/exclamation-mark.png" alt='warning' style={{ width: 20 }} />
    </div>;

  render() {
    let content;

    if (this.props.status in loadingStatusColors) {
      content = this.loadingPod();
    } else if (this.props.status === 'Failed') {
      content = this.failedPod();
    } else {
      content = this.regularPod();
    }

    return (
      <Tooltip title={this.props.name}>
        {content}
      </Tooltip>
    );
  }
}

const avatarStyle = {
  verticalAlign: 'middle',
  border: '1px solid white'
}

export default ServicePod;