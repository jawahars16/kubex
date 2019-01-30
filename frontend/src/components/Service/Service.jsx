import React, { Component } from 'react';
import { Col, Row, Divider } from 'antd';
import Meter from '../Common/Meter';
import { getResourceSectionsAndUsage } from '../../core/resource';
import ServicePods from './ServicePods';

class Service extends Component {

  render() {
    const { cpu, memory, name, ip, pods } = this.props;

    let cpuDetail = getResourceSectionsAndUsage(cpu);
    let memoryDetail = getResourceSectionsAndUsage(memory);

    const runningPods = pods.filter(p => p.state === 'Running').length;
    const totalPods = pods.length;

    return (
      <div>
        <Col span={8} style={{ padding: 3 }}>
          <div style={{ background: 'white' }}>
            <Row >
              <div style={{
                fontSize: 18,
                fontWeight: 500,
                textAlign: 'center',
                textTransform: 'uppercase',
                marginTop: 15,
                marginBottom: 5
              }}>{name}</div>
            </Row>
            <Row>
              <Divider style={{ marginTop: 0 }}>{runningPods} out of {totalPods} pods running</Divider>
            </Row>
            <Row style={{ marginTop: 10 }}>
              <Col span={12}>
                <Meter
                  sections={cpuDetail.sections}
                  value={cpuDetail.usage}
                  displayValue={`${Math.round(cpuDetail.usage * 100)}%`}
                  title='CPU' />
              </Col>
              <Col span={12}>
                <Meter
                  sections={memoryDetail.sections}
                  value={memoryDetail.usage}
                  displayValue={`${Math.round(memoryDetail.usage * 100)}%`}
                  title='Memory' />
              </Col>
            </Row>
            <Row>
              <ServicePods data={pods} style={{ marginTop: -40, marginLeft: 20, marginRight: 20, marginBottom: 30 }} />
            </Row>
          </div>
        </Col>
      </div >
    );
  }
}

export default Service;