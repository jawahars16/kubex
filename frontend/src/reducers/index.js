import { combineReducers } from "redux";
import services from './services';
import pods from './pods';
import nodes from './nodes';
import deployments from './deployments';
import meta from './meta';

export default combineReducers({
  meta,
  services,
  pods,
  nodes,
  deployments
})