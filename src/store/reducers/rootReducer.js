import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase'

import authReducer from './authReducer';
import postReducer from './postReducer';
import validateReducer from './validateReducer';
import modalsReducer from './modalsReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postReducer,
  firebase: firebaseReducer,
  validate: validateReducer,
  modals: modalsReducer
});

export default rootReducer;
