import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import common, { externalCodeSaga, memberFilterSaga } from './common';
import auth, { authSaga } from './auth';
import menu, { menuSaga } from './menu';
import locale, {
  localeSaga,
  changeLocaleSaga,
  localeSetStorageSaga,
} from './locale';
import loading from './loading';

const rootReducer = combineReducers({
  common,
  auth,
  menu,
  locale,
  loading,
});

export function* rootSaga() {
  yield all([
    externalCodeSaga(),
    memberFilterSaga(),
    authSaga(),
    menuSaga(),
    localeSaga(),
    changeLocaleSaga(),
    localeSetStorageSaga(),
  ]);
}

export default rootReducer;
