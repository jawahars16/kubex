import { connect } from 'react-redux';
import Root from '../components/Root';
import { initializeConnection } from '../actions';

const mapStateToProps = (state) => {
  return state && state.meta && state.meta.resource;
}

const mapDispatchToProps = (dispatch) => {
  return {
    initialize: _ => initializeConnection(dispatch, 'meta')
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Root)