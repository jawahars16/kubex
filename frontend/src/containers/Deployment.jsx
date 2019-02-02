import { connect } from 'react-redux';
import { getCPUMetrics, getUMemoryMetrics, filterResources } from '../core';
import Deployment from '../components/Deployment/Deployment';

const mapStateToProps = (state, ownProps) => {

  const deployment = state.deployments.find(s => s.meta.name === ownProps.name);
  const cpuMetrics = getCPUMetrics(deployment, state.pods, state.nodes);
  const memoryMetrics = getUMemoryMetrics(deployment, state.pods, state.nodes);
  const resources = filterResources(deployment, state.pods);
  const runningPodsLength = resources.filter(p => p.state === 'Running').length;

  return {
    name: deployment.meta.name,
    ip: deployment.ip,
    cpu: cpuMetrics,
    memory: memoryMetrics,
    hasWarning: (resources.length - runningPodsLength) > 0,
    podAvailability: `${runningPodsLength} out of ${resources.length} pods available`,
    pods: resources
  }
}

export default connect(
  mapStateToProps
)(Deployment)