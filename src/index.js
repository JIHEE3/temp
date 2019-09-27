import 'core-js/features/array/find';
import 'core-js/features/promise';
import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';
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
import { setUser } from 'modules/auth';
import { initializeLocale } from 'modules/locale';
// import { tempSetUser, check } from 'modules/user';
import { setLocale } from 'lib/api/common';

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
  .then(response => {
    store.dispatch(initializeLocale(i18n.language));
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
