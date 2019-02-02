import { connect } from 'react-redux';
import { initializeConnection } from '../actions';
import DeploymentList from '../components/Deployment/DeploymentList';

const mapStateToProps = (state) => {
  return {
    data: state.deployments
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initialize: _ => initializeConnection(dispatch, 'deployment')
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeploymentList)