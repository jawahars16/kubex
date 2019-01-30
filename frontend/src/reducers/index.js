import { combineReducers } from "redux";
import services from './services';
import pods from './pods';
import nodes from './nodes';

export default combineReducers({
  services,
  pods,
  nodes
})