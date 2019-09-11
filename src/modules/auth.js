import { createAction, handleActions } from 'redux-actions';
import { call, takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes
} from 'lib/createRequestSaga';
import * as authAPI from 'lib/api/auth';

/**
 * type
 */
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes(
  'auth/LOGIN'
);
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
export const login = createAction(LOGIN, ({ userId, password }) => ({
  userId,
  password
}));
export const logout = createAction(LOGOUT);
export const setUser = createAction(SET_USER);

/**
 * saga
 */
const loginSaga = createRequestSaga(LOGIN, authAPI.login);
function* logoutSaga() {
  localStorage.removeItem('user'); // localStorage 에서 user 제거
  try {
    yield call(authAPI.logout); // logout API 호출
  } catch (e) {
    console.log(e);
  }
}

export function* authSaga() {
  yield takeLatest(LOGIN, loginSaga);
  yield takeLatest(LOGOUT, logoutSaga);
}

/**
 * adcode 모듈 store 초기값
 */
const initialState = {
  user: null,
  authError: null
};

/**
 * reducer
 */
const auth = handleActions(
  {
    [LOGIN_SUCCESS]: (state, { payload }) => {
      /**
       * 로그인 성공하면 auth 넣어주기
       */
      const { data } = payload;

      return {
        ...state,
        authError: null,
        user: data.data
      };
    },
    [LOGIN_FAILURE]: (state, { payload: errorMessage }) => {
      return { ...state, authError: errorMessage, user: null };
    },
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
