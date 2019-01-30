import React, { Component } from 'react';
import { Col, Row, Divider } from 'antd';
import { getNodeSectionsAndUsage } from '../../core/resource';
import LinearMeter from '../Common/LinearMeter';
import { materialColors } from '../../common/colors';

class Node extends Component {
  render() {
    console.log(this.props);
    const { cpu, memory, storage, name } = this.props;

    let cpuDetail = getNodeSectionsAndUsage(cpu);
    let memoryDetail = getNodeSectionsAndUsage(memory);
    let storageDetail = getNodeSectionsAndUsage(storage);

    return (
      <div>
        <Col span={12} style={{ padding: 3 }}>
          <div style={{ background: 'white' }}>
            <Row style={{ zIndex: 500 }}>
              <div style={{
                fontSize: 18,
                fontWeight: 500,
                textAlign: 'center',
                textTransform: 'uppercase',
                marginTop: 15,
                marginBottom: 5
              }}>{name}</div>
            </Row>
            <Row style={{ zIndex: 400 }}>
              <Divider style={{ marginTop: 0 }}>Req. CPU: 20% | Req. Memory: 30%</Divider>
            </Row>
            <Row >
              <Col span={8}>
                <LinearMeter
                  sections={cpuDetail.sections}
                  value={cpuDetail.usage}
                  displayValue={`${Math.round(cpuDetail.usage * 100)}%`}
                  title='CPU' />
              </Col>
              <Col span={8}>
                <LinearMeter
                  sections={memoryDetail.sections}
                  value={memoryDetail.usage}
                  displayValue={`${Math.round(memoryDetail.usage * 100)}%`}
                  title='Memory' />
              </Col>
              <Col span={8}>
                <LinearMeter
                  sections={storageDetail.sections}
                  title='Storage' />
              </Col>
            </Row>
          </div>
        </Col>
      </div>
    );
  }
}

export default Node;