import { combineReducers } from 'redux';
import questionReducer from './questionReducer.jsx';
import authenticateReducer from './authenticateReducer.jsx';
import userReducer from './userReducer.jsx';

var reducers = combineReducers({
	questionReducer,
	authenticateReducer,
  userReducer,
});

export default reducers;