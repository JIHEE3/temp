import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import menu, { menuSaga } from './menu';
import locale, { localeSaga, changeLocaleSaga } from './locale';
import loading from './loading';

const rootReducer = combineReducers({
  auth,
  menu,
  locale,
  loading
});

export function* rootSaga() {
  yield all([authSaga(), menuSaga(), localeSaga(), changeLocaleSaga()]);
}

export default rootReducer;
