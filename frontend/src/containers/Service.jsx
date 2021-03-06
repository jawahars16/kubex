import { connect } from 'react-redux';
import Service from '../components/Service/Service';
import { getCPUMetrics, getUMemoryMetrics, filterResources } from '../core';

const mapStateToProps = (state, ownProps) => {

  const service = state.services.find(s => s.meta.name === ownProps.name);
  const cpuMetrics = getCPUMetrics(service, state.pods, state.nodes);
  const memoryMetrics = getUMemoryMetrics(service, state.pods, state.nodes);
  const resources = filterResources(service, state.pods);
  const runningPodsLength = resources.filter(p => p.state === 'Running').length;

  return {
    name: service.meta.name,
    ip: service.ip,
    cpu: cpuMetrics,
    memory: memoryMetrics,
    hasWarning: (resources.length - runningPodsLength) > 0,
    podAvailability: `${runningPodsLength} out of ${resources.length} pods available`,
    pods: resources
  }
}

export default connect(
  mapStateToProps
)(Service)