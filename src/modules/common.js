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
export const GET_CATEGORY = 'common/GET_CATEGORY';
const GET_CATEGORY_SUCCESS = 'common/GET_CATEGORY_SUCCESS';

/**
 * action
 */
export const setProductCode = createAction(
  PRODUCT_CODE_SUCCESS,
  payload => payload
);
export const externalCode = createAction(EXTERNAL_CODE);
export const getMembersFilter = createAction(MEMBERS_FILTER);
export const getCategory = createAction(GET_CATEGORY, payload => payload);

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
 * 카테고리 필터
 */
export function* getCategorySaga() {
  yield takeLatest(GET_CATEGORY, function*(action) {
    try {
      let code = null;
      if (typeof action.payload !== 'undefined') {
        code = action.payload.code;
      }
      const response = yield call(commonAPI.getCategory, { userTpCode: code });
      const { data } = response.data;
      let getList = null;

      if (code === null) {
        // 첫번째 리스트 받아오는 경우
        getList = new Map();
        for (let key in data) {
          if (data.hasOwnProperty(key)) {
            const { USER_TP_CODE: code, CODE_VAL: name, ADVER_CNT: cnt } = data[
              key
            ];
            getList.set(code, { code, name, cnt });
          }
        }
      } else {
        // 카테고리 코드별 list
        getList = {};
        for (let depth in data) {
          getList[depth] = new Map();

          if (data.hasOwnProperty(depth)) {
            const list = data[depth];
            let parentSeq = code;

            for (let i = 0; i < list.length; i++) {
              const {
                CTGR_SEQ: seq,
                HIRNK_CTGR_SEQ: hirnkSeq,
                CTGR_NM: name,
                ADVER_CNT: cnt,
              } = list[i];

              if (hirnkSeq !== null) {
                // 해당 정보의 부모 seq를 key 값으로
                parentSeq = hirnkSeq;
              }

              const listArr =
                typeof getList[depth].get(parentSeq) === 'undefined'
                  ? []
                  : getList[depth].get(parentSeq);

              listArr.push({ seq, hirnkSeq, name, cnt });
              getList[depth].set(parentSeq, listArr);
            }
          }
        }
      }

      yield put({
        type: GET_CATEGORY_SUCCESS,
        payload: { getList, code },
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
  // 카테고리
  categoryList: new Map(),
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
    [GET_CATEGORY_SUCCESS]: (state, { payload }) => {
      const { getList, code } = payload;
      let newCategoryList = state.categoryList;

      if (code !== null) {
        const category = newCategoryList.get(code);
        category['children'] = getList;
        newCategoryList.set(code, category);
      }

      return {
        ...state,
        categoryList: code === null ? getList : newCategoryList,
      };
    },
  },
  initialState
);

export default common;
