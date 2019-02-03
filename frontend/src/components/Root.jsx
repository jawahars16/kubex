import React, { Component } from 'react';
import ServiceList from '../containers/ServiceList';
import NodeList from '../containers/NodeList';
import DeploymentList from '../containers/DeploymentList';

class Root extends Component {

  componentDidMount() {
    this.props.initialize();
  }

  render() {
    switch (this.props.resource) {
      case 'deployment':
        return <DeploymentList />;
      case 'service':
        return <ServiceList />;
      case 'node':
        return <NodeList />;
      default:
        return <div>Error</div>;
    }
  }
}

export default Root;

