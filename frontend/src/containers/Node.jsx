import { connect } from 'react-redux';
import Node from '../components/Node/Node';
import { findNode, getResourcesFromNode } from '../core';
import { getSumResources } from '../core/resource';

const mapStateToProps = (state, ownProps) => {
  const node = findNode(state.nodes, { node: ownProps.name });
  const currentPods = getResourcesFromNode(node, state.pods);

  return {
    cpu: {
      request: getSumResources(currentPods, p => p.request.cpu),
      capacity: node.cpu,
      usage: getSumResources(currentPods, p => p.usage.cpu)
    },
    memory: {
      request: getSumResources(currentPods, p => p.request.memory),
      capacity: node.memory,
      usage: getSumResources(currentPods, p => p.usage.memory)
    },
    storage: {
      request: getSumResources(currentPods, p => p.request.storage),
      capacity: node.storage,
      usage: getSumResources(currentPods, p => p.usage.storage)
    }
  }
}

export default connect(
  mapStateToProps
)(Node)