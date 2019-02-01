import React, { Component } from 'react';
import './App.css';
import moment from 'moment';
import kubeState from './reducers'
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Services from './containers/Services';
import { Layout } from 'antd';
import Meter from './components/Common/Meter';
import Service from './components/Service/Service';
import LinearMeter from './components/Common/LinearMeter';
import { materialColors } from './common/colors';
import Node from './components/Node/Node';
import Nodes from './containers/Nodes';
const { Header, Content } = Layout;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(kubeState, composeEnhancers(applyMiddleware(thunk)));

moment.locale('en', {
  relativeTime: {
    future: "in %s",
    past: "%s",
    s: "1s",
    m: "1m",
    mm: "%dm",
    h: "1h",
    hh: "%dh",
    d: "1d",
    dd: "%dd",
    M: "1M",
    MM: "%dM",
    y: "1y",
    yy: "%dy"
  }
});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Services />
        {/* <Nodes /> */}
      </Provider>
    );
  }
}

export default App;


{/*  <Node
          cpu={{
            request: 70,
            limit: 0,
            usage: 25,
            capacity: 100
          }}
          memory={{
            request: 50,
            limit: 6,
            usage: 1,
            capacity: 50
          }}
          name='Test Node' />
        <Service
          cpu={{
            request: 0,
            limit: 0,
            usage: 0,
            capacity: 100
          }}
          memory={{
            request: 5,
            limit: 6,
            usage: 1,
            capacity: 10
          }}
          name='test service'
          pods={[
            { state: 'Running', meta: { name: 'pod' } },
            { state: 'Pending', meta: { name: 'pod' } },
            { state: 'Failed', meta: { name: 'pod' } },
            { state: 'PProgress', meta: { name: 'pod' } },
            { state: 'NProgress', meta: { name: 'pod' } }
          ]} /> */}

