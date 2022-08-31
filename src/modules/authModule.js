import { takeLatest } from 'redux-saga/effects';
import createSaga from '../lib/createSaga';
import * as authAPI from '../lib/api/authAPI';

// 액션 타입
const initializeType = 'auth/INITIALIZE';
const changeFieldType = 'auth/CHANGE_FIELD';

const loginType = "auth/LOGIN";
const loginSuccessType = "auth/LOGIN_SUCCESS";
const loginFailureType = "auth/LOGIN_FAILURE";

const registerType = "auth/REGISTRY";
const registerSuccessType = "auth/REGISTER_SUCCESS";
const registerFailureType = "auth/REGISTER_FAILURE";

// 액션함수
export const initialize = () => ({
    type: initializeType
});

export const changeField = ({ form, field, value }) => ({
    type: changeFieldType,
    form,
    field,
    value
});

export const loginAction = ({ email, password }) => ({
    type: loginType,
    email,
    password
});

export const registerAction = ({ email, password, username, nickname }) => ({
    type: registerType,
    email,
    password,
    username,
    nickname
});

export const loginSaga = createSaga(loginType, authAPI.login);
export const registerSaga = createSaga(registerType, authAPI.register);

export function* authSaga() {
    yield takeLatest(loginType, loginSaga);
    yield takeLatest(registerType, registerSaga);
};

const initialState = {
    login: {
        email: '',
        password: ''
    },
    register: {
        email: '',
        password: '',
        username: '',
        nickname: ''
    },
    account: null,
    token: '',
    authError: null
};

function authReducer(state = initialState, action) {
    switch (action.type) {
        case initializeType: {
            return { ...state, login: initialState.login, register: initialState.register }
        }
        case changeFieldType: {
            return { ...state, [action.form]: { ...state[action.form], [action.field]: action.value } }
        }
        case loginSuccessType: {
            return { ...state, account: action.payload.data, token: action.payload.token };
        }
        case loginFailureType: {
            return { ...state, authError: action.payload.message };
        }
        case registerSuccessType: {
            return { ...state };
        }
        case registerFailureType: {
            return { ...state, authError: action.payload.data.message }
        }
        default: {
            return state;
        }
    }
};

export default authReducer;