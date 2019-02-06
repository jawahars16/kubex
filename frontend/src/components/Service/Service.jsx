import React, { Component } from 'react';
import { Col, Row, Divider } from 'antd';
import Meter from '../Common/Meter';
import { getResourceSectionsAndUsage } from '../../core/resource';
import PodList from '../Pod/PodList';

class Service extends Component {

  render() {
    const { cpu, memory, name, pods } = this.props;

    let cpuDetail = getResourceSectionsAndUsage(cpu);
    let memoryDetail = getResourceSectionsAndUsage(memory);

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
              {/* <Divider style={{ marginTop: 0 }}>{runningPods} out of {totalPods} pods running</Divider> */}
              <Divider>
                <PodList data={pods} />
              </Divider>
            </Row>
            <Row style={{ marginTop: 10 }}>
              <Col span={12}>
                <Meter
                  sections={cpuDetail.sections}
                  value={cpuDetail.usage}
                  title='CPU' />
              </Col>
              <Col span={12}>
                <Meter
                  sections={memoryDetail.sections}
                  value={memoryDetail.usage}
                  title='Memory' />
              </Col>
            </Row>
            <Row style={{ top: -80, left: -10 }}>
              <Col span={12} style={{ textAlign: 'center', fontSize: 18 }}>{`${Math.round(cpuDetail.usage * 100)}%`}</Col>
              <Col span={12} style={{ textAlign: 'center', fontSize: 18 }}>{`${Math.round(memoryDetail.usage * 100)}%`}</Col>
            </Row>
          </div>
        </Col>
      </div >
    );
  }
}

export default Service;