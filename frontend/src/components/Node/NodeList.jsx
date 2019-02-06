import React, { Component } from 'react';
import { Row } from 'antd';
import Node from '../../containers/Node';
import Loading from '../Common/Loading';

class NodeList extends Component {

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
            <Node key={item.name} name={item.name} />))}
        </Row>
      </div>
    );
  }
}

export default NodeList;

