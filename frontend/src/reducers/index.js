import { combineReducers } from "redux";
import services from './services';
import pods from './pods';
import nodes from './nodes';
import deployments from './deployments';

export default combineReducers({
  services,
  pods,
  nodes,
  deployments
})