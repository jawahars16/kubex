import React, { Component } from 'react';
import { Row } from 'antd';
import Node from '../../containers/Node';

class NodeList extends Component {

  componentDidMount() {
    this.props.initialize();
  }

  render() {
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

