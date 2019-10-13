import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

const test = handleActions({}, {});

export default combineReducers({
  test,
});
