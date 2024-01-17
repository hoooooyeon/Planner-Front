import { put } from "redux-saga/effects";
import PromiseHolder from "./utils/PromiseHolder";
import { tokenRissueAction } from "../modules/authModule";

const tokenReissue = false;
const holoder = new PromiseHolder();

const requestInterceptor = async (config) => {
    if (tokenReissue && config.url != '/api/auth/token-reissue') {
        await holoder.holdPromise;
    }
}

export const responseErrorInterceptor = async (error) => {
    const url = error.config.url;
    if (error.response.status == 401 && url != '/api/auth/token-reissue') {
        put(tokenRissueAction);
    }
    else {
        alert('다시 로그인 해주세요.');
        window.history.pushState('/');
    }

    return Promise.reject(error);
}