import React, { Component } from 'react';
import { Col, Spin, Empty } from 'antd';

class Loading extends Component {

  render() {
    return (
      <div style={{ width: `100%`, height: `100%`, backgroundColor: 'white' }}>
        <Col span={8} />
        <Col span={8} >
          <Empty
            style={{ marginTop: `45%` }}
            description={
              <h3 style={{color: 'gray'}}>
                Loading cluster data...
              </h3>
            }
          />
        </Col>
        <Col span={8} />
      </div>
    );
  }
}

export default Loading;