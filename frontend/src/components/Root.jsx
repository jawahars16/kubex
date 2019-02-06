import React, { Component } from 'react';
import ServiceList from '../containers/ServiceList';
import NodeList from '../containers/NodeList';
import DeploymentList from '../containers/DeploymentList';
import { Alert } from 'antd';
import Loading from './Common/Loading';

class Root extends Component {

  componentDidMount() {
    this.props.initialize();
  }

  render() {

    if (!this.props.resource) {
      return <Loading />
    }

    switch (this.props.resource) {
      case 'deployment':
        return <div style={rootStyle} ><DeploymentList /></div>;
      case 'service':
        return <div style={rootStyle} ><ServiceList /></div>;
      case 'node':
        return <div style={rootStyle} ><NodeList /></div>;
      default:
        return (
          <div>
            <Alert
              message="Resource not supported"
              description="Requested resource not supported by kubex."
              type="error"
            />
          </div>
        );
    }
  }
}

const rootStyle = {
  backgroundColor: 'lightgray',
  height: `100%`
}

export default Root;

