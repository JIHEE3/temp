import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes
} from 'lib/createRequestSaga';
import * as adAPI from 'lib/api/ad';
import { takeLatest } from 'redux-saga/effects';

/**
 * type
 */
const [
  FETCH_ADCODE,
  FETCH_ADCODE_SUCCESS,
  FETCH_ADCODE_FAILURE
] = createRequestActionTypes('adcode/FETCH_ADCODE');
// const UNLOAD_ADCODE = 'adcode/UNLOAD_ADCODE'; // 포스트 페이지에서 벗어날 때 데이터 비우기
// loading 모듈에서 loading 정보 받아올때 해당 type 필요하므로 export
export { FETCH_ADCODE };

/**
 * action
 */
// export const fetchAdcode = createAction(FETCH_ADCODE, payload => payload);
export const fetchAdcode = createAction(
  FETCH_ADCODE,
  ({ cmd, tab_type, sdate, edate, adExchange_flag }) => ({
    cmd,
    tab_type,
    sdate,
    edate,
    adExchange_flag
  })
);
// export const unloadAdcode = createAction(UNLOAD_ADCODE);

/**
 * saga
 */
const readAdcodeSaga = createRequestSaga(FETCH_ADCODE, adAPI.adcodeList);
export function* adcodeSaga() {
  yield takeLatest(FETCH_ADCODE, readAdcodeSaga);
}

/**
 * adcode 모듈 store 초기값
 */
const initialState = {
  data: null,
  error: null
};

/**
 * reducer
 */
const adcode = handleActions(
  {
    [FETCH_ADCODE_SUCCESS]: (state, { payload }) => {
      return { ...state, data: payload };
    },
    [FETCH_ADCODE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error
    })
    // [UNLOAD_ADCODE]: () => initialState
  },
  initialState
);

export default adcode;
