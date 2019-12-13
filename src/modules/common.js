import { createAction, handleActions } from 'redux-actions';
import { takeLatest, call, put } from 'redux-saga/effects';
import { makeOptionList } from 'lib/commonLib';
import * as commonAPI from 'lib/api/common';
import { usersSearch } from 'lib/api/member';

/**
 * type
 */
const PRODUCT_CODE_SUCCESS = 'common/PRODUCT_CODE_SUCCESS';
const EXTERNAL_CODE = 'common/EXTERNAL_CODE';
const EXTERNAL_CODE_SUCCESS = 'common/EXTERNAL_CODE_SUCCESS';
const MEMBERS_FILTER = 'common/MEMBERS_FILTER';
const MEMBERS_FILTER_SUCCESS = 'common/MEMBERS_FILTER_SUCCESS';

/**
 * action
 */
export const setProductCode = createAction(
  PRODUCT_CODE_SUCCESS,
  payload => payload
);
export const externalCode = createAction(EXTERNAL_CODE);
export const getMembersFilter = createAction(MEMBERS_FILTER);

/**
 * saga
 */

/**
 * 외부연동
 */
export function* externalCodeSaga() {
  yield takeLatest(EXTERNAL_CODE, function*(action) {
    try {
      const response = yield call(commonAPI.externalCode, action.payload);
      // 데이터 가공하기
      const { data } = response.data;

      const externalCodeList = [];

      for (let i = 0; i < data.length; i++) {
        const { CODE_ID, CODE_VAL, USE_YN } = data[i];

        if (USE_YN === 'Y') {
          externalCodeList.push({
            // label: i18next.t(CODE_VAL),
            label: CODE_VAL,
            value: CODE_ID,
          });
        }
      }

      yield put({
        type: EXTERNAL_CODE_SUCCESS,
        payload: { externalCodeList },
      });
    } catch (e) {
      console.log(e);
    }
  });
}

/**
 * 사용자관련 필터
 */
export function* memberFilterSaga() {
  yield takeLatest(MEMBERS_FILTER, function*(action) {
    try {
      const response = yield call(usersSearch, action.payload);

      let { agencyMenus, contactMenus, sindyMenus } = response.data.data;

      agencyMenus = makeOptionList(agencyMenus, 'CORP_NAME', 'USER_ID');
      sindyMenus = makeOptionList(sindyMenus, 'CORP_NAME', 'USER_ID');
      contactMenus = makeOptionList(contactMenus, 'CONTACT_NAME', 'CONTACT_NO');

      yield put({
        type: MEMBERS_FILTER_SUCCESS,
        payload: { agencyMenus, contactMenus, sindyMenus },
      });
    } catch (e) {
      console.log(e);
    }
  });
}

/**
 * common 모듈 store 초기값
 */
const initialState = {
  // 유형 구분
  platformCodeList: [],
  // 디스플레이
  productCodeList: new Map(),
  allProductCodeList: new Map(),
  //외부연동
  externalCodeList: [],
  // 광고주 대행사
  agencyMenus: [],
  // 담당자
  contactMenus: [],
  // 매체 신디사
  sindyMenus: [],
};

/**
 * reducer
 */
const common = handleActions(
  {
    [PRODUCT_CODE_SUCCESS]: (state, { payload }) => {
      const { platformCodeList, productCodeList, allProductCodeList } = payload;

      return {
        ...state,
        platformCodeList,
        productCodeList,
        allProductCodeList,
      };
    },
    [EXTERNAL_CODE_SUCCESS]: (state, { payload }) => {
      const { externalCodeList } = payload;

      return {
        ...state,
        externalCodeList,
      };
    },
    [MEMBERS_FILTER_SUCCESS]: (state, { payload }) => {
      const { agencyMenus, contactMenus, sindyMenus } = payload;

      return {
        ...state,
        agencyMenus,
        contactMenus,
        sindyMenus,
      };
    },
  },
  initialState
);

export default common;
