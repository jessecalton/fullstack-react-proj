// import reducers and combine them!
import { combineReducers } from 'redux';
import authReducer from './authReducer';

export default combineReducers({
  // The key names we provide will be the same as the ones in the state object.
  auth: authReducer,
  // the auth piece of state is being manufactured by the authReducer
});
