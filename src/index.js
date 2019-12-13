import 'core-js/features/set/union';
import 'core-js/features/array/find';
import 'core-js/features/promise';
import 'core-js/features/map';
import 'core-js/features/string/pad-start';
import 'core-js/features/object/keys';
import 'react-app-polyfill/ie11';

// arirbnb ie
import 'airbnb-js-shims/target/es2015';
import 'airbnb-browser-shims/browser-only';

import React from 'react';
import ReactDOM from 'react-dom';
import i18next from 'i18next';
import './index.css';
import i18n from './i18n';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootReducer, { rootSaga } from 'modules';
import { setProductCode, externalCode, getMembersFilter } from 'modules/common';
import { setUser } from 'modules/auth';
import { getMenu } from 'modules/menu';
import { initializeLocale } from 'modules/locale';
// import { tempSetUser, check } from 'modules/user';
import { setLocale, productCode } from 'lib/api/common';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

function loadUser() {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return; // 로그인 상태가 아니라면 아무것도 안함

    store.dispatch(setUser(user));
    // store.dispatch(tempSetUser(user));
    // store.dispatch(check());
  } catch (e) {
    console.log('localStorage is not working');
  }
}

sagaMiddleware.run(rootSaga);
loadUser();

/**
 * locale 설정 후 화면 렌더링(서버에서 응답 받은 후 다음 응답 하도록)
 */
setLocale(i18n.language)
  .then(async response => {
    if (i18n.language === 'ko') {
      /**
       * 접속 국가별 moment locale import 변경
       */
      await import('moment/locale/ko');
    }
    store.dispatch(initializeLocale(i18n.language));
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) store.dispatch(getMenu());
    store.dispatch(externalCode());
    store.dispatch(getMembersFilter());
  })
  // 공통으로 쓰이는 상품 구분 코드
  .then(async () => {
    const response = await productCode();
    const { platMenus, prdtMenus } = response.data.data;

    const platformCodeList = platMenus.map(platFormCode => {
      const { CODE_ID, CODE_VAL } = platFormCode;
      return {
        label: i18next.t(CODE_VAL),
        value: CODE_ID,
      };
    });

    const productCodeList = new Map();
    const tempValueObj = {};
    const allProductCodeList = new Map();
    for (let code in prdtMenus) {
      if (prdtMenus.hasOwnProperty(code)) {
        const curPrdt = prdtMenus[code];
        const { advrtsPrdtCode: value, advrtsPrdtName: label, item } = curPrdt;
        const newItem = item.map(curData => {
          const { ADVRTS_TP_CODE: value, ADVRTS_TP_NM: label } = curData;
          const cur = {
            label,
            value,
          };
          if (typeof tempValueObj[value] === 'undefined') {
            tempValueObj[value] = 1;
            allProductCodeList.set(value, cur);
          }

          return cur;
        });
        productCodeList.set(value, {
          label,
          value,
          item: newItem,
        });
      }
    }

    store.dispatch(
      setProductCode({ platformCodeList, productCodeList, allProductCodeList })
    );
  })
  .catch(error => {
    console.log(error);
  })
  .finally(() => {
    // 언어 설정 서버 요청 완료 후 렌더링
    ReactDOM.render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>,
      document.getElementById('root')
    );

    serviceWorker.unregister();
  });
