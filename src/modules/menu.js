import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from 'lib/createRequestSaga';
import * as commonAPI from 'lib/api/common';

/**
 * type
 */
const INITIALIZE = 'menu/INITIALIZE';
const [MENU, MENU_SUCCESS, MENU_FAILURE] = createRequestActionTypes(
  'menu/MENU'
);
const CUR_MENU = 'menu/CUR_MENU';
export { MENU };

/**
 * action
 */
export const initializeMenu = createAction(INITIALIZE);
export const getMenu = createAction(MENU);
export const curMenu = createAction(CUR_MENU);

/**
 * saga
 */
const getMenuSaga = createRequestSaga(MENU, commonAPI.menuList);

export function* menuSaga() {
  yield takeLatest(MENU, getMenuSaga);
}

/**
 * api 로 받아온 메뉴 Map 으로 변환(subMenu 까지)
 * @param {Array || Map} primitiveMenu
 */
const makeMenuMap = primitiveMenu => {
  const menuMap = new Map();

  primitiveMenu.forEach(menu => {
    if (typeof menu.subMenu !== 'undefined') {
      const subMenu = makeMenuMap(menu.subMenu);
      menu.subMenu = subMenu;
    }
    const key =
      menu.menuUrl === null ? `${menu.menuSeq}_${menu.menuNm}` : menu.menuUrl;
    menuMap.set(key, menu);
  });
  return menuMap;
};

/**
 * adcode 모듈 store 초기값
 */
const initialState = {
  list: null,
  error: null,
  curMenu: '',
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
        list: makeMenuMap(payload.data),
      };
    },
    [MENU_FAILURE]: (state, { payload: errorMessage }) => {
      return { ...state, error: errorMessage, list: null };
    },
    [CUR_MENU]: (state, { payload }) => {
      return { ...state, curMenu: payload };
    },
  },
  initialState
);

export default menu;
