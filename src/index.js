import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, createStore } from 'redux';
import rootReducer, { rootSaga } from './modules';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import ScrollTop from './components/common/ScrollTop';
import Loading from './components/common/Loading';
import { tokenUse } from './lib/api/client';
import { ThemeProvider } from 'styled-components';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
export const persistor = persistStore(store);
// persistor.purge();

sagaMiddleware.run(rootSaga);

tokenUse();

const theme = {
    mainColor: '#54507b', // 메인 색상 (푸터, 텍스트호버색, ...)
    primaryBackgroundColor: '#fcfcff', // 메인 배경색
    secondaryBackgroundColor: '#dde3ea', // 서브 배경색
    primaryColor: '#fcfcff', // 메인 글자색(흰)
    secondaryColor: '#191c1e', // 서브 글자색(검)
    tertiaryColor: '#c9c5d0', // 세번째 글자색(회)
    PrimaryButtonBackgroundColor: '#fcfcff', // 기본 버튼색
    inputButtonBackgroundColor: '#54507b', // input 검색 버튼색
    likeButtonColor: '#f7e467', // 좋아요 버튼색
    clickedButtonBackgroundColor: '#54507b', // 선택된 버튼색
    hoverColor: '#54507b', // 호버색
    hoverBackgroundColor: '#dde3ea', // 호버 배경색
    shadowColor: '#cac4cf', // 그림자색
    outlineColor: '#cac4cf', // 테두리색
};

//  ${props => props.theme.};
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <ScrollTop />
            <PersistGate loading={<Loading />} persistor={persistor}>
                <ThemeProvider theme={theme}>
                    <App />
                </ThemeProvider>
            </PersistGate>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
