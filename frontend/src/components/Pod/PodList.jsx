import React, { Component } from 'react';
import Pod from './Pod';

class PodList extends Component {

  render() {
    return (
      <div style={{ flex: 1, flexDirection: 'row', display: 'flex', ...this.props.style }}>
        {this.props.data.map(pod => <Pod
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

export default PodList;