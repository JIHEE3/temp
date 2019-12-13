import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from 'lib/createRequestSaga';
import * as commonAPI from 'lib/api/common';

/**
 * type
 */
const INITIALIZE_LOCALE = 'locale/INITIALIZE_LOCALE';
const CHANGE_LOCALE = 'locale/CHANGE_LOCALE';
const [
  SET_LOCALE,
  SET_LOCALE_SUCCESS,
  SET_LOCALE_FAILURE,
] = createRequestActionTypes('locale/SET_LOCALE');

/**
 * action
 */
export const initializeLocale = createAction(
  INITIALIZE_LOCALE,
  locale => locale
);
export const changeLocale = createAction(CHANGE_LOCALE, locale => locale);
export const setLocale = createAction(SET_LOCALE, locale => locale);

/**
 * 스토리지에 locale 담기
 * @param {string} locale
 */
const setStorage = locale => {
  try {
    localStorage.setItem('locale', locale);
  } catch (e) {
    console.log('localStorage is not working');
  }
};

/**
 * saga
 */
const setLocaleSaga = createRequestSaga(SET_LOCALE, commonAPI.setLocale);

export function* localeSaga() {
  // yield takeLatest([SET_LOCALE, INITIALIZE_LOCALE], setLocaleSaga);
  yield takeLatest([SET_LOCALE], setLocaleSaga);
}

export function* changeLocaleSaga() {
  yield takeLatest([CHANGE_LOCALE], function* changeLocale(action) {
    yield setStorage(action.payload);
    window.location.reload();
  });
}

export function* localeSetStorageSaga() {
  yield takeLatest([INITIALIZE_LOCALE], function* setLocale(action) {
    yield setStorage(action.payload);
  });
}

/**
 * adcode 모듈 store 초기값
 */
const initialState = {
  locale: null,
  error: null,
};

/**
 * reducer
 */
const locale = handleActions(
  {
    [INITIALIZE_LOCALE]: (state, { payload }) => {
      return {
        ...state,
        error: null,
        locale: payload,
      };
    },
    [SET_LOCALE_SUCCESS]: (state, { payload, actionPayload }) => {
      const { success } = payload;

      return {
        ...state,
        error: success ? null : 'server error',
        locale: actionPayload,
      };
    },
    [SET_LOCALE_FAILURE]: (state, { payload: errorMessage }) => {
      return { ...state, error: errorMessage };
    },
  },
  initialState
);

export default locale;
