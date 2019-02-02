import React, { Component } from 'react';
import { Row } from 'antd';
import Deployment from '../../containers/Deployment';

class DeploymentList extends Component {

  componentDidMount() {
    this.props.initialize();
  }

  render() {
    return (
      <div>
        <Row >
          {this.props.data.map(item => (
            <Deployment key={item.meta.key} name={item.meta.name} />))}
        </Row>
      </div>
    );
  }
}

export default DeploymentList;