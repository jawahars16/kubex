import { connect } from 'react-redux';
import { filterResources } from '../core';
import PodList from '../components/Pod/PodList';

const mapStateToProps = (state, ownProps) => {
  return {
    data: filterResources(ownProps.selector, state.pods)
  }
}

export default connect(
  mapStateToProps
)(PodList)