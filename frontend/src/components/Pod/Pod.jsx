import React, { Component } from 'react';
import { Tooltip } from 'antd';
import moment from 'moment';
import { materialColors } from '../../common/colors';
const classNames = require('classnames');

const statusColors = {
  Running: materialColors.green,
  Failed: materialColors.red,
  Pending: materialColors.gray,
  PProgress: materialColors.lightGreen,
  NProgress: materialColors.orange
}

class Pod extends Component {
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

  render() {
    return (
      <Tooltip title={this.props.name}>
        <div className={this.classes} style={{ backgroundColor: statusColors[this.props.status], margin: 1 }}>
        </div>
      </Tooltip>
    );
  }
}

export default Pod;