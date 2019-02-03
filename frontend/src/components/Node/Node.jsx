import React, { Component } from 'react';
import { Col, Row, Divider } from 'antd';
import { getNodeSectionsAndUsage } from '../../core/resource';
import LinearMeter from '../Common/LinearMeter';
import { materialColors } from '../../common/colors';
const classNames = require('classnames');

const exclamation = <img src="https://img.icons8.com/ios-glyphs/30/ffffff/exclamation-mark.png" alt='warning' style={{ width: 20 }} />

const tick = <img src="https://img.icons8.com/ios-glyphs/30/ffffff/checkmark.png" alt='success' style={{ width: 20 }} />

class Node extends Component {
  render() {
    const { cpu, memory, readyStatus, name } = this.props;

    let cpuDetail = getNodeSectionsAndUsage(cpu);
    let memoryDetail = getNodeSectionsAndUsage(memory);
    this.classes = classNames({
      'circle-lg': true,
      'inner-shadow': true
    })

    return (
      <div>
        <Col span={8} style={{ padding: 3 }}>
          <div style={{ background: 'white' }}>
            <Row style={{ top: 10 }}>
              <div className={this.classes} style={{
                backgroundColor: readyStatus ? materialColors.green : materialColors.red,
                margin: 'auto',
              }} >
                {readyStatus ? tick : exclamation}
              </div>
            </Row>
            <Row>
              <Divider style={{ marginTop: 0, top: 15 }}>
                <span style={{
                  fontSize: 14,
                  fontWeight: 500,
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  marginTop: 15,
                  marginBottom: 5,
                }}>
                  {name}
                </span>
              </Divider>
            </Row>
            <Row style={{ top: 10, zIndex: 10 }}>
              <Col span={12} style={{ textAlign: 'center', fontSize: 20 }}><b>{Math.round((cpu.usage / cpu.capacity) * 100.0)}%</b></Col>
              <Col span={12} style={{ textAlign: 'center', fontSize: 20 }}><b>{Math.round((memory.usage / memory.capacity) * 100)}%</b></Col>
            </Row>
            <Row style={{ top: -15 }}>
              <Col span={12}>
                <LinearMeter
                  sections={cpuDetail.sections}
                  value={cpuDetail.usage}
                  displayValue={`${Math.round(cpuDetail.usage * 100)}%`}
                  title='CPU' />
              </Col>
              <Col span={12}>
                <LinearMeter
                  sections={memoryDetail.sections}
                  value={memoryDetail.usage}
                  displayValue={`${Math.round(memoryDetail.usage * 100)}%`}
                  title='Memory' />
              </Col>
            </Row>
            <Row style={{ top: -20 }}>
              <Col span={12} style={{ textAlign: 'center', fontSize: 16 }}>CPU</Col>
              <Col span={12} style={{ textAlign: 'center', fontSize: 16 }}>Memory</Col>
            </Row>
          </div>
        </Col>
      </div>
    );
  }
}

export default Node;