import { connect } from 'react-redux';
import Pods from '../components/Pods';
import { filterResourcesBySelector } from '../core';

const mapStateToProps = (state, ownProps) => {
  return {
    data: filterResourcesBySelector(ownProps.selector, state.pods)
  }
}

export default connect(
  mapStateToProps
)(Pods)