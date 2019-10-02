import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes
} from 'lib/createRequestSaga';
import * as commonAPI from 'lib/api/common';

/**
 * type
 */
const INITIALIZE = 'menu/INITIALIZE';
const [MENU, MENU_SUCCESS, MENU_FAILURE] = createRequestActionTypes(
  'menu/MENU'
);
export { MENU };

/**
 * action
 */
export const initializeMenu = createAction(INITIALIZE);
export const getMenu = createAction(MENU);

/**
 * saga
 */
const getMenuSaga = createRequestSaga(MENU, commonAPI.menuList);

export function* menuSaga() {
  yield takeLatest(MENU, getMenuSaga);
}

/**
 * adcode 모듈 store 초기값
 */
const initialState = {
  list: null,
  error: null
};

/**
 * reducer
 */
const menu = handleActions(
  {
    [INITIALIZE]: () => {
      return initialState;
    },
    [MENU_SUCCESS]: (state, { payload }) => {
      return {
        ...state,
        error: null,
        list: payload.data
      };
    },
    [MENU_FAILURE]: (state, { payload: errorMessage }) => {
      return { ...state, error: errorMessage, list: null };
    }
  },
  initialState
);

export default menu;
