import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import adcode, { adcodeSaga } from './adcode';
import auth, { authSaga } from './auth';
import loading from './loading';

const rootReducer = combineReducers({
  adcode,
  auth,
  loading
});

export function* rootSaga() {
  yield all([adcodeSaga(), authSaga()]);
}

export default rootReducer;
