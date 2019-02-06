import React, { Component } from 'react';
import { Row } from 'antd';
import Deployment from '../../containers/Deployment';
import Loading from '../Common/Loading';

class DeploymentList extends Component {

  componentDidMount() {
    this.props.initialize();
  }

  render() {

    if (!this.props.data || this.props.data.length === 0) {
      return <Loading />
    }

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