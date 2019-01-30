import React, { Component } from 'react';
import { Row } from 'antd';
import Service from '../../containers/Service';

class ServiceList extends Component {

  componentDidMount() {
    this.props.initialize();
  }

  render() {
    return (
      <div>
        <Row >
          {this.props.data.map(item => (
            <Service key={item.meta.key} name={item.meta.name} selector={item.selector} />))}
        </Row>
      </div>
    );
  }
}

export default ServiceList;