import { connect } from 'react-redux';
import { initializeConnection } from '../actions';
import NodeList from '../components/Node/NodeList';

const mapStateToProps = (state) => {
  return {
    data: state.nodes
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initialize: _ => initializeConnection(dispatch, 'node')
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NodeList)