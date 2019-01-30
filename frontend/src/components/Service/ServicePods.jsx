import React, { Component } from 'react';
import ServicePod from './ServicePod';
import { Row } from 'antd';
import moment from 'moment';

class ServicePods extends Component {

  render() {
    return (
      <div style={{ flex: 1, flexDirection: 'row', display: 'flex', ...this.props.style }}>
        {this.props.data.map(pod => <ServicePod
          key={pod.meta.id}
          name={pod.meta.name}
          created={pod.meta.created}
          status={pod.state}
          request={pod.request}
          limit={pod.limit}
          usage={pod.usage} />)}
      </div>);
  }
}

export default ServicePods;