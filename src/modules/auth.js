import { createAction, handleActions } from 'redux-actions';
import { call, put, takeLatest } from 'redux-saga/effects';
// import createRequestSaga, {
//   createRequestActionTypes
// } from 'lib/createRequestSaga';
import { initializeMenu } from 'modules/menu';
import * as authAPI from 'lib/api/auth';

/**
 * type
 */
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';
const LOGOUT = 'auth/LOGOUT';
const SET_USER = 'auth/SET_USER';

/**
 * action
 */
export const initializeForm = createAction(
  INITIALIZE_FORM,
  // register / login
  formType => formType
);
export const logout = createAction(LOGOUT);
export const setUser = createAction(SET_USER);

/**
 * saga
 */
function* logoutSaga() {
  yield localStorage.removeItem('user'); // localStorage 에서 user 제거
  try {
    yield call(authAPI.logout); // logout API 호출
    yield put(initializeMenu());
  } catch (e) {
    console.log(e);
  }
}

export function* authSaga() {
  yield takeLatest(LOGOUT, logoutSaga);
}

/**
 * adcode 모듈 store 초기값
 */
const initialState = {
  user: null
};

/**
 * reducer
 */
const auth = handleActions(
  {
    [LOGOUT]: state => {
      return { ...state, user: null };
    },
    [SET_USER]: (state, { payload: user }) => {
      return { ...state, user };
    }
    // [UNLOAD_ADCODE]: () => initialState
  },
  initialState
);

export default auth;
