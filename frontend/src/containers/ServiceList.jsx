import { connect } from 'react-redux';
import ServiceList from '../components/Service/ServiceList';
import { initializeConnection } from '../actions';

const mapStateToProps = (state) => {
  return {
    data: state.services
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initialize: _ => initializeConnection(dispatch, 'service')
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServiceList)