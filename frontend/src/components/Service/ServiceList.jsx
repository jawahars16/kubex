import React, { Component } from 'react';
import { Row } from 'antd';
import Service from '../../containers/Service';
import Loading from '../Common/Loading';

class ServiceList extends Component {

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
            <Service key={item.meta.key} name={item.meta.name} />))}
        </Row>
      </div>
    );
  }
}

export default ServiceList;