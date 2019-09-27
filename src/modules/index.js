import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import adcode, { adcodeSaga } from './adcode';
import auth, { authSaga } from './auth';
import locale, { localeSaga, changeLocaleSaga } from './locale';
import loading from './loading';

const rootReducer = combineReducers({
  adcode,
  auth,
  locale,
  loading
});

export function* rootSaga() {
  yield all([adcodeSaga(), authSaga(), localeSaga(), changeLocaleSaga()]);
}

export default rootReducer;
